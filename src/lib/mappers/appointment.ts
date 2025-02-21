import type { OpenEMRAppointment } from '../../types/api/models/appointment';
import type { UIAppointment } from '../../types/ui/appointment';

/**
 * Maps appointment status to user-friendly format with colors
 */
const STATUS_MAP: Record<string, UIAppointment['status']> = {
  '-': {
    code: 'scheduled',
    label: 'Scheduled',
    color: '#4299E1' // blue
  },
  '@': {
    code: 'checked-in',
    label: 'Checked In',
    color: '#48BB78' // green
  },
  '>': {
    code: 'in-progress',
    label: 'In Progress',
    color: '#ECC94B' // yellow
  },
  '<': {
    code: 'completed',
    label: 'Completed',
    color: '#38A169' // green
  },
  'x': {
    code: 'cancelled',
    label: 'Cancelled',
    color: '#E53E3E' // red
  }
};

/**
 * Creates a Date object from OpenEMR date and time strings
 * @param date YYYY-MM-DD format
 * @param time HH:mm:ss format
 */
function createDateTime(date: string, time: string): Date {
  return new Date(`${date}T${time}`);
}

/**
 * Maps an OpenEMR appointment to our UI-friendly format
 * @param appointment The raw appointment data from OpenEMR
 * @returns A formatted appointment object for the UI
 */
export function mapToUIAppointment(appointment: OpenEMRAppointment): UIAppointment {
  const startAt = createDateTime(appointment.pc_eventDate, appointment.pc_startTime);
  const endAt = createDateTime(appointment.pc_eventDate, appointment.pc_endTime);
  
  return {
    id: appointment.id,
    
    patient: {
      id: appointment.pc_pid.toString(),
      name: appointment.patient_name || 'Unknown Patient'
    },
    
    provider: {
      id: appointment.pc_aid.toString(),
      name: appointment.provider_name || 'Unknown Provider'
    },
    
    timing: {
      startAt,
      endAt,
      duration: appointment.pc_duration
    },
    
    location: {
      facility: appointment.facility_name || 'Main Facility',
      room: appointment.pc_room
    },
    
    status: STATUS_MAP[appointment.pc_apptstatus] || STATUS_MAP['-'],
    
    details: {
      title: appointment.pc_title || 'General Appointment',
      category: appointment.calendar_category_name || 'General',
      notes: appointment.pc_hometext || appointment.pc_comments
    }
  };
}

/**
 * Maps multiple OpenEMR appointments to UI format
 * @param appointments Array of OpenEMR appointments
 * @returns Array of UI-formatted appointments
 */
export function mapToUIAppointments(appointments: OpenEMRAppointment[]): UIAppointment[] {
  return appointments.map(mapToUIAppointment);
}
