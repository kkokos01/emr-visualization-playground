/**
 * Core model types shared across the API
 */

// Base interface for all API resources
export interface Resource {
  id: string;
  created_at?: string;
  updated_at?: string;
}

// Base interface for soft-deletable resources
export interface SoftDeletableResource extends Resource {
  deleted_at?: string | null;
  is_active: boolean;
}
