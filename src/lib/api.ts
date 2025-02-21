import { ERROR_MESSAGES } from '../types/api/responses/common';
import { oauth2Config } from '@/config/auth';
import { createTokenRequestHeaders } from '@/lib/auth/oauth2';
import type {
  TokenResponse,
  ApiError,
  OpenEMRPatient as Patient,
  OpenEMRAppointment,
  LoginRequest,
  RefreshTokenRequest,
  PaginatedResponse,
  SuccessResponse,
  UserInfo
} from '../types/api';
import type { AuthorizationCodeRequest } from '@/types/auth/oauth2';

class OpenEMRApi {
  private static instance: OpenEMRApi;
  private baseUrl: string;
  private accessToken: string | null = null;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    if (!this.baseUrl) {
      throw new Error('API URL not configured. Please check your environment variables.');
    }

    // Initialize access token from storage
    const storedToken = localStorage.getItem('auth_token');
    if (storedToken) {
      this.accessToken = storedToken;
    }
  }

  public static getInstance(): OpenEMRApi {
    if (!OpenEMRApi.instance) {
      OpenEMRApi.instance = new OpenEMRApi();
    }
    return OpenEMRApi.instance;
  }

  public setAccessToken(token: string) {
    this.accessToken = token;
    localStorage.setItem('auth_token', token);
  }

  public clearAccessToken() {
    this.accessToken = null;
    localStorage.removeItem('auth_token');
  }

  /**
   * Exchange authorization code for tokens
   * @param request Authorization code request
   * @returns Token response
   */
  public async exchangeAuthorizationCode(request: AuthorizationCodeRequest): Promise<TokenResponse> {
    const headers = createTokenRequestHeaders(oauth2Config);
    const body = new URLSearchParams({
      ...request,
      client_id: oauth2Config.clientId,
      redirect_uri: oauth2Config.redirectUri
    });

    const response = await fetch(oauth2Config.tokenEndpoint, {
      method: 'POST',
      headers,
      body
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error_description || error.error || 'Failed to exchange authorization code');
    }

    return response.json();
  }



  /**
   * Enhanced request method with error handling and response type mapping
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const headers = new Headers({
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    });

    if (this.accessToken) {
      headers.set('Authorization', `Bearer ${this.accessToken}`);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: headers,
      });

      // Handle specific error cases
      if (!response.ok) {
        let errorData: ApiError;
        try {
          errorData = await response.json();
        } catch {
          // If error response isn't JSON, create a standard error
          errorData = {
            status: response.status,
            message: response.statusText || 'An unknown error occurred',
            code: `HTTP_${response.status}`
          };
        }

        // Handle specific status codes
        switch (response.status) {
          case 401:
            this.clearAccessToken(); // Clear invalid token
            errorData.code = 'AUTH001';
            break;
          case 403:
            errorData.code = 'AUTH002';
            break;
          case 404:
            errorData.code = 'NOT_FOUND';
            break;
          case 422:
            errorData.code = 'VALIDATION';
            break;
          case 500:
            errorData.code = 'SERVER_ERROR';
            break;
        }

        // Add user-friendly message if available
        if (errorData.code && ERROR_MESSAGES[errorData.code]) {
          errorData.message = ERROR_MESSAGES[errorData.code];
        }

        throw errorData;
      }

      return response.json();
    } catch (error) {
      // Handle network errors
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw {
          status: 0,
          code: 'NETWORK_ERROR',
          message: ERROR_MESSAGES.NETWORK_ERROR
        } as ApiError;
      }
      throw error;
    }
  }

  // Authentication
  public async loginWithPassword(
    username: string,
    password: string
  ): Promise<TokenResponse> {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'password');
    formData.append('username', username);
    formData.append('password', password);

    const response = await fetch(`${this.baseUrl}/oauth2/default/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw {
        message: error.error_description || 'Login failed',
        status: response.status,
        code: error.error || 'AUTH_ERROR'
      } as ApiError;
    }

    const data: TokenResponse = await response.json();
    this.setAccessToken(data.access_token);
    return data;
  }

  /**
   * Refresh the access token using a refresh token
   */
  public async refreshToken(request: RefreshTokenRequest): Promise<TokenResponse> {
    const formData = new URLSearchParams();
    formData.append('grant_type', 'refresh_token');
    formData.append('refresh_token', request.refresh_token);
    if (request.scope) {
      formData.append('scope', request.scope);
    }

    const response = await fetch(`${this.baseUrl}/oauth2/default/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json();
      throw {
        message: error.error_description || 'Failed to refresh token',
        status: response.status,
        code: error.error || 'AUTH_ERROR'
      } as ApiError;
    }

    const data: TokenResponse = await response.json();
    this.setAccessToken(data.access_token);
    return data;
  }

  /**
   * Get information about the currently authenticated user
   * @returns User information from OpenEMR
   */
  public async getUserInfo(): Promise<UserInfo> {
    return this.request<UserInfo>('/api/user/info');
  }

  // Patient endpoints
  /**
   * Get a paginated list of patients
   */
  public async getPatients(page = 1, perPage = 10): Promise<PaginatedResponse<Patient>> {
    return this.request<PaginatedResponse<Patient>>(
      `/api/patient?page=${page}&per_page=${perPage}`
    );
  }

  /**
   * Get a single patient by ID
   */
  public async getPatient(id: string): Promise<SuccessResponse<Patient>> {
    return this.request<SuccessResponse<Patient>>(`/api/patient/${id}`);
  }

  // Appointment endpoints
  /**
   * Get a paginated list of appointments
   * @param page Page number (1-based)
   * @param perPage Number of items per page
   * @param patientId Optional patient ID to filter appointments
   */
  public async getAppointments(
    page = 1,
    perPage = 10,
    patientId?: string
  ): Promise<PaginatedResponse<OpenEMRAppointment>> {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
      ...(patientId && { patient_id: patientId })
    });

    return this.request<PaginatedResponse<OpenEMRAppointment>>(
      `/api/appointment?${params.toString()}`
    );
  }

  /**
   * Get a single appointment by ID
   */
  public async getAppointment(id: string): Promise<SuccessResponse<OpenEMRAppointment>> {
    return this.request<SuccessResponse<OpenEMRAppointment>>(`/api/appointment/${id}`);
  }

  /**
   * Create a new appointment
   */
  public async createAppointment(
    appointment: Omit<OpenEMRAppointment, 'id' | 'created_at' | 'updated_at'>
  ): Promise<SuccessResponse<OpenEMRAppointment>> {
    return this.request<SuccessResponse<OpenEMRAppointment>>('/api/appointment', {
      method: 'POST',
      body: JSON.stringify(appointment)
    });
  }

  /**
   * Update an existing appointment
   */
  public async updateAppointment(
    id: string,
    appointment: Partial<OpenEMRAppointment>
  ): Promise<SuccessResponse<OpenEMRAppointment>> {
    return this.request<SuccessResponse<OpenEMRAppointment>>(`/api/appointment/${id}`, {
      method: 'PUT',
      body: JSON.stringify(appointment)
    });
  }

  /**
   * Delete an appointment
   */
  public async deleteAppointment(id: string): Promise<void> {
    await this.request<void>(`/api/appointment/${id}`, {
      method: 'DELETE'
    });
  }
  // - getAppointments()
  // - createAppointment()
  // - updatePatient()
  // - etc.
}

// Export a singleton instance
export const api = OpenEMRApi.getInstance();

// Export types for use in other files
export type { TokenResponse, ApiError, Patient };
