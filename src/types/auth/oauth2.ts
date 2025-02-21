/**
 * OpenEMR OAuth2 Types
 * Based on OpenEMR's OIDC-compliant authorization system
 * @see https://github.com/openemr/openemr/blob/master/API_README.md
 */

/**
 * OAuth2 configuration for OpenEMR
 * Includes both public and private client settings
 */
export interface OAuth2Config {
  clientId: string;
  clientSecret?: string; // Required for private clients
  isPublicClient: boolean;
  authorizeEndpoint: string;
  tokenEndpoint: string;
  redirectUri: string;
  postLogoutRedirectUri?: string;
  scopes: string[];
}

/**
 * Token response from OpenEMR OAuth2 server
 * @see https://github.com/openemr/openemr/blob/master/API_README.md
 */
export interface TokenResponse {
  access_token: string;
  refresh_token?: string;
  id_token?: string;
  token_type: 'Bearer';
  expires_in: number;
  scope?: string;
}

/**
 * Base token request parameters
 */
export interface BaseTokenRequest {
  grant_type: 'authorization_code' | 'refresh_token';
  client_id: string;
  redirect_uri: string;
}

/**
 * Authorization code token request
 */
export interface AuthorizationCodeRequest extends BaseTokenRequest {
  grant_type: 'authorization_code';
  code: string;
  code_verifier: string;
}

/**
 * Refresh token request
 */
export interface RefreshTokenRequest extends BaseTokenRequest {
  grant_type: 'refresh_token';
  refresh_token: string;
}

/**
 * PKCE (Proof Key for Code Exchange) parameters
 * Required for public clients and recommended for private clients
 */
export interface PKCEParams {
  codeVerifier: string;
  codeChallenge: string;
  codeChallengeMethod: 'S256';
}

/**
 * OAuth2 state for maintaining flow security
 */
export interface OAuth2State {
  pkce: PKCEParams;
  state: string;
  nonce: string;
  timestamp: number; // For state expiration
}

/**
 * Available OpenEMR OAuth2 scopes
 * @see https://github.com/openemr/openemr/blob/master/API_README.md#scopes
 */
export const OPENEMR_SCOPES = {
  // Mandatory scopes
  OPENID: 'openid',
  OFFLINE_ACCESS: 'offline_access',
  FHIR_USER: 'fhirUser',
  LAUNCH: 'launch',
  LAUNCH_PATIENT: 'launch/patient',
  
  // API access scopes
  API_OEMR: 'api:oemr',
  API_FHIR: 'api:fhir',
  API_PORT: 'api:port',
  
  // User-specific scopes
  USER_PATIENT_READ: 'user/patient.read',
  USER_PATIENT_WRITE: 'user/patient.write',
  USER_APPOINTMENT_READ: 'user/appointment.read',
  USER_APPOINTMENT_WRITE: 'user/appointment.write',
  USER_ENCOUNTER_READ: 'user/encounter.read',
  USER_ENCOUNTER_WRITE: 'user/encounter.write',
  
  // Patient-specific scopes
  PATIENT_READ: 'patient/Patient.read',
  PATIENT_WRITE: 'patient/Patient.write',
  PATIENT_ENCOUNTER_READ: 'patient/Encounter.read',
} as const;

/**
 * OpenEMR OAuth2 endpoints configuration
 */
export interface OAuth2Endpoints {
  authorize: string;
  token: string;
  userInfo: string;
  logout: string;
  metadata?: string; // FHIR metadata endpoint
}

/**
 * Error response from OpenEMR OAuth2 server
 */
export interface OAuth2Error {
  error: string;
  error_description?: string;
  state?: string;
}
