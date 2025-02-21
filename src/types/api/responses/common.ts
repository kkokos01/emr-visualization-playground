/**
 * Common response types for OpenEMR API
 */

/**
 * Standard error response from the API
 */
export interface ApiError {
  message: string;
  status: number;
  code?: string;
  details?: Record<string, unknown>;
}

/**
 * Paginated response wrapper
 * Used when fetching lists of items
 */
export interface PaginatedResponse<T> {
  data: T[];
  meta: {
    totalCount: number;
    currentPage: number;
    perPage: number;
    totalPages: number;
  };
}

/**
 * Standard success response
 * Used for operations that return a single item
 */
export interface SuccessResponse<T> {
  data: T;
  meta?: {
    timestamp: string;
    version?: string;
  };
}

/**
 * API Error codes mapped to user-friendly messages
 */
export const ERROR_MESSAGES: Record<string, string> = {
  'AUTH001': 'Your session has expired. Please log in again.',
  'AUTH002': 'You do not have permission to access this resource.',
  'VALIDATION': 'Please check your input and try again.',
  'NOT_FOUND': 'The requested resource was not found.',
  'SERVER_ERROR': 'An unexpected error occurred. Please try again later.',
  'NETWORK_ERROR': 'Unable to connect to the server. Please check your connection.'
};
