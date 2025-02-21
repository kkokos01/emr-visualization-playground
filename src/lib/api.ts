import {
  ERROR_MESSAGES
} from '../types/api/responses/common';

import type {
  TokenResponse,
  ApiError,
  OpenEMRPatient as Patient,
  OpenEMRAppointment,
  LoginRequest,
  RefreshTokenRequest,
  PaginatedResponse,
  SuccessResponse
} from '../types/api';

class OpenEMRApi {
  private static instance: OpenEMRApi;
  private baseUrl: string;
  private accessToken: string | null = null;

  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL;
    if (!this.baseUrl) {
      throw new Error('API URL not configured. Please check your environment variables.');
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
  }

  public clearAccessToken() {
    this.accessToken = null;
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
      throw new Error('Login failed');
    }

    const data: TokenResponse = await response.json();
    this.setAccessToken(data.access_token);
    return data;
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

  // Add more API methods as needed:
  // - getAppointments()
  // - createAppointment()
  // - updatePatient()
  // - etc.
}

// Export a singleton instance
export const api = OpenEMRApi.getInstance();

// Export types for use in other files
export type { TokenResponse, ApiError, Patient };
