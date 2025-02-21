import { OAuth2Config, PKCEParams, OAuth2State, AuthorizationCodeRequest, RefreshTokenRequest, OAuth2Error } from '@/types/auth/oauth2';

// Constants
const STATE_TIMEOUT_MS = 10 * 60 * 1000; // 10 minutes
const MIN_CODE_VERIFIER_LENGTH = 43;
const MAX_CODE_VERIFIER_LENGTH = 128;

/**
 * Generates a cryptographically secure random string
 * @param length Length of the random string
 * @returns Random string of specified length
 */
function generateRandomString(length: number): string {
  // We need more bytes to account for base64 encoding (4 chars per 3 bytes)
  const bytesNeeded = Math.ceil(length * 0.75);
  const array = new Uint8Array(bytesNeeded);
  crypto.getRandomValues(array);
  return base64URLEncode(array).slice(0, length);
}

/**
 * Generates a cryptographically secure random string for PKCE verifier
 * @param length Length of the random string (43-128 chars per spec)
 * @returns Random string of specified length
 */
function generatePKCEVerifier(length: number = MIN_CODE_VERIFIER_LENGTH): string {
  if (length < MIN_CODE_VERIFIER_LENGTH || length > MAX_CODE_VERIFIER_LENGTH) {
    throw new Error(`Code verifier length must be between ${MIN_CODE_VERIFIER_LENGTH} and ${MAX_CODE_VERIFIER_LENGTH}`);
  }
  return generateRandomString(length);
}

/**
 * Generates a SHA-256 hash of the input string
 * @param input String to hash
 * @returns Base64URL-encoded hash
 */
async function sha256(input: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return base64URLEncode(new Uint8Array(hash));
}

/**
 * Encodes a buffer as base64URL
 * @param buffer Buffer to encode
 * @returns Base64URL-encoded string
 */
function base64URLEncode(buffer: Uint8Array): string {
  const base64 = btoa(String.fromCharCode(...buffer));
  return base64
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

/**
 * Generates PKCE parameters for OAuth2 authorization code flow
 * @returns PKCE parameters including verifier and challenge
 */
export async function generatePKCE(): Promise<PKCEParams> {
  const codeVerifier = generatePKCEVerifier();
  const codeChallenge = await sha256(codeVerifier);
  
  return {
    codeVerifier,
    codeChallenge,
    codeChallengeMethod: 'S256'
  };
}

/**
 * Generates OAuth2 state parameters including PKCE
 * @returns OAuth2 state parameters
 */
export async function generateOAuth2State(): Promise<OAuth2State> {
  return {
    pkce: await generatePKCE(),
    state: generateRandomString(32),
    nonce: generateRandomString(32),
    timestamp: Date.now()
  };
}

/**
 * Builds the authorization URL for OpenEMR OAuth2
 * @param config OAuth2 configuration
 * @param state OAuth2 state parameters
 * @returns Authorization URL
 */
export function buildAuthorizeUrl(config: OAuth2Config, state: OAuth2State): string {
  // Validate required scopes
  if (!config.scopes.includes('openid')) {
    throw new Error("'openid' scope is required");
  }

  const params = new URLSearchParams({
    client_id: config.clientId,
    response_type: 'code',
    redirect_uri: config.redirectUri,
    scope: config.scopes.join(' '),
    state: state.state,
    nonce: state.nonce,
    code_challenge: state.pkce.codeChallenge,
    code_challenge_method: state.pkce.codeChallengeMethod,
  });

  return `${config.authorizeEndpoint}?${params.toString()}`;
}

/**
 * Creates headers for token requests based on client type
 * @param config OAuth2 configuration
 * @returns Headers for token request
 */
export function createTokenRequestHeaders(config: OAuth2Config): Headers {
  const headers = new Headers({
    'Content-Type': 'application/x-www-form-urlencoded',
  });

  if (!config.isPublicClient) {
    if (!config.clientSecret) {
      throw new Error('Client secret is required for private clients');
    }
    const credentials = btoa(`${config.clientId}:${config.clientSecret}`);
    headers.set('Authorization', `Basic ${credentials}`);
  }

  return headers;
}

/**
 * Validates the OAuth2 state returned from the authorization server
 * @param savedState Previously saved state
 * @param returnedState State returned from server
 * @returns true if state is valid and not expired
 */
export function validateOAuth2State(savedState: OAuth2State, returnedState: string): boolean {
  // Check if state has expired
  if (Date.now() - savedState.timestamp > STATE_TIMEOUT_MS) {
    return false;
  }

  // Validate state matches
  return savedState.state === returnedState;
}

/**
 * Creates an authorization code token request
 * @param config OAuth2 configuration
 * @param code Authorization code
 * @param verifier PKCE verifier
 * @returns Token request parameters
 */
export function createAuthorizationCodeRequest(
  config: OAuth2Config,
  code: string,
  verifier: string
): AuthorizationCodeRequest {
  return {
    grant_type: 'authorization_code',
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    code,
    code_verifier: verifier
  };
}

/**
 * Creates a refresh token request
 * @param config OAuth2 configuration
 * @param refreshToken Refresh token
 * @returns Refresh token request parameters
 */
export function createRefreshTokenRequest(
  config: OAuth2Config,
  refreshToken: string
): RefreshTokenRequest {
  return {
    grant_type: 'refresh_token',
    client_id: config.clientId,
    redirect_uri: config.redirectUri,
    refresh_token: refreshToken
  };
}

/**
 * Extracts and validates the authorization code from the callback URL
 * @param url Callback URL
 * @param expectedState Expected state value
 * @returns Authorization code
 * @throws Error if code is missing or state is invalid
 */
export function extractAuthCode(url: string, expectedState: OAuth2State): string {
  const params = new URLSearchParams(new URL(url).search);
  
  // Check for errors
  const error = params.get('error');
  const errorDescription = params.get('error_description');
  if (error) {
    throw new Error(`Authorization failed: ${error}${errorDescription ? `: ${errorDescription}` : ''}`);
  }

  // Validate state
  const returnedState = params.get('state');
  if (!returnedState || !validateOAuth2State(expectedState, returnedState)) {
    throw new Error('Invalid authorization state');
  }

  // Extract code
  const code = params.get('code');
  if (!code) {
    throw new Error('No authorization code received');
  }

  return code;
}
