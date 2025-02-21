import { OAuth2Config, OPENEMR_SCOPES } from '@/types/auth/oauth2';

/**
 * Default OpenEMR OAuth2 configuration
 * This should be customized based on your OpenEMR installation
 */
export const oauth2Config: OAuth2Config = {
  clientId: import.meta.env.VITE_OPENEMR_CLIENT_ID,
  authorizeEndpoint: `${import.meta.env.VITE_OPENEMR_URL}/oauth2/default/authorize`,
  tokenEndpoint: `${import.meta.env.VITE_OPENEMR_URL}/oauth2/default/token`,
  redirectUri: `${import.meta.env.VITE_APP_URL}/oauth/callback`,
  postLogoutRedirectUri: `${import.meta.env.VITE_APP_URL}/login`,
  scopes: [
    // Required scopes
    OPENEMR_SCOPES.OPENID,
    OPENEMR_SCOPES.OFFLINE_ACCESS,
    OPENEMR_SCOPES.API_OEMR,
    
    // Application-specific scopes
    OPENEMR_SCOPES.USER_PATIENT_READ,
    OPENEMR_SCOPES.USER_PATIENT_WRITE,
    OPENEMR_SCOPES.USER_APPOINTMENT_READ,
    OPENEMR_SCOPES.USER_APPOINTMENT_WRITE,
  ]
};
