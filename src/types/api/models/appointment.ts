/**
 * OpenEMR Appointment Model
 * Based on OpenEMR's appointment data structure
 * Reference: https://github.com/openemr/openemr/blob/master/src/Services/AppointmentService.php
 */

export interface OpenEMRAppointment {
  // Core appointment fields
  id: string;                     // UUID from OpenEMR
  pc_eid?: number;               // Event ID in OpenEMR
  pc_catid: number;              // Category ID
  pc_title?: string;             // Appointment title/description
  pc_duration: number;           // Duration in minutes
  
  // Timing
  pc_eventDate: string;          // YYYY-MM-DD
  pc_startTime: string;          // HH:mm:ss
  pc_endTime: string;            // HH:mm:ss
  pc_recurrtype?: number;        // Recurrence type (0 for none)
  pc_recurrspec?: string;        // Recurrence specification
  
  // Participants
  pc_pid: number;                // Patient ID
  pc_aid: number;                // Provider ID
  pc_facility?: number;          // Facility ID
  
  // Status and type
  pc_apptstatus: string;         // e.g., '-', '@', '>', '<', etc.
  pc_room?: string;              // Room number/name
  pc_billing_location?: number;  // Billing location ID
  
  // Additional OpenEMR specific fields
  pc_informant?: string;
  pc_hometext?: string;          // Comments
  pc_comments?: string;          // Additional comments
  
  // Timestamps
  pc_time: string;               // Creation timestamp
  pc_modified_time?: string;     // Last modification timestamp
  
  // Extended information that might come from related tables
  patient_name?: string;         // Computed/joined field
  provider_name?: string;        // Computed/joined field
  facility_name?: string;        // Computed/joined field
  status_color?: string;         // UI hint for status
  calendar_category_name?: string; // Category name
  calendar_category_color?: string; // Category color
}
