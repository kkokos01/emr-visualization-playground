import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateOAuth2State,
  validateOAuth2State,
  buildAuthorizeUrl,
  extractAuthCode,
  createTokenRequestHeaders
} from '../oauth2';
import type { OAuth2Config, OAuth2State } from '@/types/auth/oauth2';

describe('OAuth2 Utilities', () => {
  const mockConfig: OAuth2Config = {
    clientId: 'test-client',
    isPublicClient: true,
    authorizeEndpoint: 'https://openemr.example.com/oauth2/authorize',
    tokenEndpoint: 'https://openemr.example.com/oauth2/token',
    redirectUri: 'http://localhost:5173/callback',
    scopes: ['openid', 'launch/patient', 'patient/*.read']
  };

  let state: OAuth2State;

  beforeEach(async () => {
    // Generate fresh state for each test
    state = await generateOAuth2State();
  });

  describe('State Generation and Validation', () => {
    it('should generate valid OAuth2 state with PKCE', async () => {
      expect(state).toHaveProperty('pkce');
      expect(state.pkce).toHaveProperty('codeVerifier');
      expect(state.pkce).toHaveProperty('codeChallenge');
      expect(state.pkce.codeVerifier.length).toBeGreaterThanOrEqual(43);
      expect(state.pkce.codeVerifier.length).toBeLessThanOrEqual(128);
    });

    it('should generate valid state string', async () => {
      expect(state.state).toBeDefined();
      expect(typeof state.state).toBe('string');
      expect(state.state.length).toBeGreaterThan(0);
    });

    it('should include timestamp', async () => {
      expect(state.timestamp).toBeDefined();
      expect(typeof state.timestamp).toBe('number');
    });

    it('should validate fresh state', () => {
      const isValid = validateOAuth2State(state, state.state);
      expect(isValid).toBe(true);
    });

    it('should reject expired state', () => {
      const expiredState = {
        ...state,
        timestamp: Date.now() - (11 * 60 * 1000) // 11 minutes ago (beyond 10 min timeout)
      };
      const isValid = validateOAuth2State(expiredState, expiredState.state);
      expect(isValid).toBe(false);
    });

    it('should reject mismatched state', () => {
      const isValid = validateOAuth2State(state, 'wrong-state');
      expect(isValid).toBe(false);
    });
  });

  describe('Authorization URL Building', () => {
    it('should build valid authorize URL', () => {
      const url = buildAuthorizeUrl(mockConfig, state);
      const parsed = new URL(url);

      expect(parsed.origin + parsed.pathname).toBe(mockConfig.authorizeEndpoint);
      expect(parsed.searchParams.get('client_id')).toBe(mockConfig.clientId);
      expect(parsed.searchParams.get('redirect_uri')).toBe(mockConfig.redirectUri);
      expect(parsed.searchParams.get('response_type')).toBe('code');
      expect(parsed.searchParams.get('state')).toBe(state.state);
      expect(parsed.searchParams.get('code_challenge')).toBe(state.pkce.codeChallenge);
      expect(parsed.searchParams.get('code_challenge_method')).toBe('S256');
      expect(parsed.searchParams.get('scope')).toBe(mockConfig.scopes.join(' '));
    });
  });

  describe('Authorization Code Extraction', () => {
    it('should extract auth code from valid callback URL', () => {
      const code = 'test-auth-code';
      const callbackUrl = `http://localhost:5173/callback?code=${code}&state=${state.state}`;
      
      const extractedCode = extractAuthCode(callbackUrl, state);
      expect(extractedCode).toBe(code);
    });

    it('should throw on missing code', () => {
      const callbackUrl = `http://localhost:5173/callback?state=${state.state}`;
      
      expect(() => extractAuthCode(callbackUrl, state)).toThrow();
    });

    it('should throw on invalid state', () => {
      const callbackUrl = 'http://localhost:5173/callback?code=test-code&state=wrong-state';
      
      expect(() => extractAuthCode(callbackUrl, state)).toThrow();
    });
  });

  describe('Token Request Headers', () => {
    it('should create headers for public client', () => {
      const headers = createTokenRequestHeaders(mockConfig);
      
      expect(headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
      // Public client should not have Authorization header
      expect(headers.has('Authorization')).toBe(false);
    });

    it('should create headers for private client', () => {
      const privateConfig: OAuth2Config = {
        ...mockConfig,
        isPublicClient: false,
        clientSecret: 'test-secret'
      };
      
      const headers = createTokenRequestHeaders(privateConfig);
      
      expect(headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
      expect(headers.has('Authorization')).toBe(true);
      expect(headers.get('Authorization')).toMatch(/^Basic /);
    });

    it('should throw for private client without secret', () => {
      const invalidConfig: OAuth2Config = {
        ...mockConfig,
        isPublicClient: false
      };
      
      expect(() => createTokenRequestHeaders(invalidConfig)).toThrow();
    });
  });
});
