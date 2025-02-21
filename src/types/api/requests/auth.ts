/**
 * Authentication request types for OpenEMR API
 */

export interface LoginRequest {
  grant_type: 'password';
  username: string;
  password: string;
  scope?: string;
}

export interface RefreshTokenRequest {
  grant_type: 'refresh_token';
  refresh_token: string;
  scope?: string;
}
