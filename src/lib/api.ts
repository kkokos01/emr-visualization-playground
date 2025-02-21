// Types for API responses
interface TokenResponse {
  token_type: string;
  access_token: string;
  expires_in: number;
  refresh_token?: string;
}

interface ApiError {
  message: string;
  status: number;
}

// Basic patient type - expand as needed
interface Patient {
  id: string;
  pid?: number;
  fname?: string;
  lname?: string;
  DOB?: string;
  // Add more fields as needed
}

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

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers: headers,
    });

    if (!response.ok) {
      const error: ApiError = {
        message: response.statusText,
        status: response.status,
      };
      throw error;
    }

    return response.json();
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
  public async getPatients(): Promise<Patient[]> {
    return this.request<Patient[]>('/api/patient');
  }

  public async getPatient(id: string): Promise<Patient> {
    return this.request<Patient>(`/api/patient/${id}`);
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
