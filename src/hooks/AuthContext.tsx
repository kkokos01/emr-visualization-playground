import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { api } from '../lib/api';
import type { TokenResponse, ApiError, LoginRequest, RefreshTokenRequest } from '../types/api';

interface UserInfo {
  userId: string;
  role: string;
  name: string;
  permissions: string[];
}

interface AuthContextType {
  accessToken: string | null;
  isAuthenticated: boolean;
  userInfo: UserInfo | null;
  login: (username: string, password: string) => Promise<void>;
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
        setUserInfo(userInfoResponse);
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

  const value = {
    accessToken,
    isAuthenticated: !!accessToken,
    userInfo,
    login,
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
