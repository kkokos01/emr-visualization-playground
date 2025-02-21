/**
 * OpenEMR Patient Model
 * Based on OpenEMR's patient data structure
 * Reference: https://github.com/openemr/openemr/blob/master/src/RestControllers/PatientRestController.php
 */

export interface OpenEMRPatient {
  // Required fields
  id: string;               // UUID from OpenEMR
  pid: number;             // Patient ID number
  pubpid?: string;         // Public/External Patient ID
  
  // Basic Demographics
  title?: string;          // Mr., Mrs., etc.
  fname: string;           // First name
  mname?: string;         // Middle name
  lname: string;          // Last name
  DOB: string;            // Date of Birth (YYYY-MM-DD)
  sex?: string;           // M/F/O
  gender_identity?: string;
  sexual_orientation?: string;
  
  // Contact Information
  email?: string;
  phone_home?: string;
  phone_cell?: string;
  phone_work?: string;
  
  // Address
  street?: string;
  postal_code?: string;
  city?: string;
  state?: string;
  country_code?: string;
  
  // Administrative
  status?: 'active' | 'inactive' | 'deceased';
  create_date?: string;    // ISO date string
  date_modified?: string;  // ISO date string
  
  // Insurance
  insurance_provider?: string;
  insurance_type?: 'primary' | 'secondary' | 'tertiary';
  policy_number?: string;
  
  // Medical
  allergies?: string[];
  medications?: string[];
  problems?: string[];     // Current problems/conditions
  
  // Additional fields can be added as needed
}
