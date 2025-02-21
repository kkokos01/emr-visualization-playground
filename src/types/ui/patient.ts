/**
 * UI-specific patient type that's optimized for frontend display
 * This type is simpler than the OpenEMR patient type and includes
 * computed fields that are useful for the UI
 */
export interface UIPatient {
  /** Unique identifier from OpenEMR */
  id: string;
  
  /** Patient's full name (computed from fname + lname) */
  fullName: string;
  
  /** Formatted date of birth (as a JavaScript Date object) */
  dateOfBirth: Date;
  
  /** Computed age based on date of birth */
  age: number;
  
  /** Contact information combined for easy display */
  contactInfo: {
    email?: string;
    phone?: string;
    address?: string;
  };
  
  /** Status with a user-friendly label */
  status: 'Active' | 'Inactive' | 'Deceased';
  
  /** Quick reference for medical alerts */
  alerts: {
    allergies: string[];
    medications: string[];
    conditions: string[];
  };
}
