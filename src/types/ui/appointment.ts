/**
 * UI-specific appointment type that's optimized for frontend display
 * Simplifies the OpenEMR appointment type and adds computed fields
 */
export interface UIAppointment {
  /** Unique identifier */
  id: string;
  
  /** Patient information */
  patient: {
    id: string;
    name: string;
  };
  
  /** Provider information */
  provider: {
    id: string;
    name: string;
  };
  
  /** Appointment timing */
  timing: {
    /** Full date and time of appointment start */
    startAt: Date;
    /** Full date and time of appointment end */
    endAt: Date;
    /** Duration in minutes */
    duration: number;
  };
  
  /** Location details */
  location: {
    facility: string;
    room?: string;
  };
  
  /** User-friendly status with color coding */
  status: {
    code: 'scheduled' | 'checked-in' | 'in-progress' | 'completed' | 'cancelled';
    label: string;
    color: string;
  };
  
  /** Additional details */
  details: {
    title: string;
    category: string;
    notes?: string;
  };
}
