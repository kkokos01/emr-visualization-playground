import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { api } from '../lib/api';
import type { TokenResponse, ApiError, LoginRequest, RefreshTokenRequest, UserInfo as ApiUserInfo } from '../types/api';
import { oauth2Config } from '@/config/auth';
import {
  generateOAuth2State,
  extractAuthCode,
  createAuthorizationCodeRequest,
  buildAuthorizeUrl,
  validateOAuth2State
} from '@/lib/auth/oauth2';
import type { OAuth2State } from '@/types/auth/oauth2';

interface UserInfo {
  userId: string;
  role: string;
  name: string;
  permissions: string[];
}

/**
 * Maps API user info response to our internal UserInfo type
 */
function mapApiUserInfoToUserInfo(apiUserInfo: ApiUserInfo): UserInfo {
  return {
    userId: apiUserInfo.id,
    role: apiUserInfo.role,
    name: `${apiUserInfo.firstName} ${apiUserInfo.lastName}`,
    permissions: apiUserInfo.permissions,
  };
}

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  login: (username: string, password: string) => Promise<void>;
  loginWithOAuth2: () => Promise<void>;
  handleOAuth2Callback: (searchParams: string) => Promise<void>;
  logout: () => void;
  error: string | null;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [oauth2State, setOAuth2State] = useState<OAuth2State | null>(null);

  // Initialize auth state from storage
  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedRefreshToken = localStorage.getItem('refresh_token');
    const storedUserInfo = localStorage.getItem('user_info');

    if (storedToken) {
      setAccessToken(storedToken);
      api.setAccessToken(storedToken);
    }
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }
    if (storedUserInfo) {
      try {
        setUserInfo(JSON.parse(storedUserInfo));
      } catch (e) {
        console.error('Failed to parse stored user info');
      }
    }
  }, []);

  // Refresh token setup
  useEffect(() => {
    if (!refreshToken) return;

    const refreshTokenIfNeeded = async () => {
      try {
        const request: RefreshTokenRequest = {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        };
        const response = await api.refreshToken(request);
        setAccessToken(response.access_token);
        api.setAccessToken(response.access_token);
        if (response.refresh_token) {
          setRefreshToken(response.refresh_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        }
      } catch (err) {
        console.error('Failed to refresh token');
        logout();
      }
    };

    // Refresh 5 minutes before expiration
    const interval = setInterval(refreshTokenIfNeeded, 55 * 60 * 1000);
    return () => clearInterval(interval);
  }, [refreshToken]);

  const login = useCallback(async (username: string, password: string) => {
    try {
      setError(null);
      setIsLoading(true);

      const request: LoginRequest = {
        grant_type: 'password',
        username,
        password
      };

      const response = await api.loginWithPassword(username, password);
      setAccessToken(response.access_token);
      api.setAccessToken(response.access_token);

      if (response.refresh_token) {
        setRefreshToken(response.refresh_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }

      // Fetch user info after successful login
      try {
        const userInfoResponse = await api.getUserInfo();
        const mappedUserInfo = mapApiUserInfoToUserInfo(userInfoResponse);
        setUserInfo(mappedUserInfo);
        localStorage.setItem('user_info', JSON.stringify(userInfoResponse));
      } catch (userInfoErr) {
        console.error('Failed to fetch user info', userInfoErr);
      }
    } catch (err) {
      const apiError = err as ApiError;
      setError(apiError.message || 'Failed to login');
      setAccessToken(null);
      setRefreshToken(null);
      setUserInfo(null);
      api.clearAccessToken();
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setAccessToken(null);
    setRefreshToken(null);
    setUserInfo(null);
    setError(null);
    api.clearAccessToken();
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_info');
  }, []);

  const loginWithOAuth2 = useCallback(async () => {
    try {
      setError(null);
      setIsLoading(true);

      // Generate and store OAuth2 state
      const state = await generateOAuth2State();
      setOAuth2State(state);
      sessionStorage.setItem('oauth2_state', JSON.stringify(state));

      // Redirect to OpenEMR's authorization endpoint
      const authUrl = buildAuthorizeUrl(oauth2Config, state);
      window.location.href = authUrl;
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to initialize OAuth2 login');
      setIsLoading(false);
    }
  }, []);

  const handleOAuth2Callback = useCallback(async (searchParams: string) => {
    try {
      setError(null);
      setIsLoading(true);

      // Retrieve stored state
      const storedStateJson = sessionStorage.getItem('oauth2_state');
      if (!storedStateJson) {
        throw new Error('No OAuth2 state found');
      }
      const storedState = JSON.parse(storedStateJson) as OAuth2State;

      // Extract and validate the authorization code
      const code = extractAuthCode(searchParams, storedState);

      // Exchange code for tokens
      const tokenRequest = createAuthorizationCodeRequest(
        oauth2Config,
        code,
        storedState.pkce.codeVerifier
      );

      const response = await api.exchangeAuthorizationCode(tokenRequest);
      setAccessToken(response.access_token);
      api.setAccessToken(response.access_token);

      if (response.refresh_token) {
        setRefreshToken(response.refresh_token);
        localStorage.setItem('refresh_token', response.refresh_token);
      }

      // Clear OAuth2 state
      sessionStorage.removeItem('oauth2_state');
      setOAuth2State(null);

      // Fetch user info
      const userInfoResponse = await api.getUserInfo();
      const mappedUserInfo = mapApiUserInfoToUserInfo(userInfoResponse);
      setUserInfo(mappedUserInfo);
      localStorage.setItem('user_info', JSON.stringify(userInfoResponse));
    } catch (err) {
      const error = err as Error;
      setError(error.message || 'Failed to complete OAuth2 authentication');
      setAccessToken(null);
      setRefreshToken(null);
      setUserInfo(null);
      api.clearAccessToken();
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const value = {
    accessToken,
    isAuthenticated: !!accessToken,
    userInfo,
    login,
    loginWithOAuth2,
    handleOAuth2Callback,
    logout,
    error,
    isLoading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Optional: Initialize auth state from storage
export function initializeAuth() {
  const token = localStorage.getItem('auth_token');
  if (token) {
    api.setAccessToken(token);
    return token;
  }
  return null;
}
