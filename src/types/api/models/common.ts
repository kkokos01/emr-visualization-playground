/**
 * Common types shared across the API
 */

export interface ApiError {
  message: string;
  status: number;
  code?: string;
  detail?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  limit: number;
  offset: number;
}
