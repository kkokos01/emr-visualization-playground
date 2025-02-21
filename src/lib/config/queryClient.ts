/**
 * React Query client configuration
 * Centralizes all query-related settings and error handling
 */

import { QueryClient } from '@tanstack/react-query';
import { ApiError } from '@/types/api';

/**
 * Default configuration for React Query Client
 * Handles authentication errors and provides reasonable defaults for caching
 */
export const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: (failureCount, error) => {
        // Don't retry on auth errors
        if (error instanceof Error && 'status' in error) {
          const status = (error as ApiError).status;
          if (status === 401 || status === 403) return false;
        }
        return failureCount < 3;
      },
      staleTime: 5 * 60 * 1000, // Consider data stale after 5 minutes
      gcTime: 30 * 60 * 1000, // Garbage collection time
    },
  },
});
