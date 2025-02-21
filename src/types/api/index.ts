/**
 * Main export file for API types
 * This provides a centralized place to import all API-related types
 */

// Response types (these contain the API response structure definitions)
export * from './responses/common';
export * from './responses/auth';

// Core model types
export * from './models/common';
export * from './models/patient';
export * from './models/appointment';
export * from './models/user';

// Request types
export * from './requests/auth';

