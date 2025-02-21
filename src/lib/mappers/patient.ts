import type { OpenEMRPatient } from '../../types/api/models/patient';
import type { UIPatient } from '../../types/ui/patient';

/**
 * Calculates age from a date of birth string
 * @param dob Date of birth in YYYY-MM-DD format
 * @returns Calculated age in years
 */
function calculateAge(dob: string): number {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

/**
 * Formats an address from OpenEMR patient fields
 */
function formatAddress(patient: OpenEMRPatient): string {
  const parts = [
    patient.street,
    patient.city,
    patient.state,
    patient.postal_code,
    patient.country_code
  ].filter(Boolean);
  
  return parts.join(', ');
}

/**
 * Maps an OpenEMR patient to our UI-friendly format
 * @param patient The raw patient data from OpenEMR
 * @returns A formatted patient object for the UI
 */
export function mapToUIPatient(patient: OpenEMRPatient): UIPatient {
  return {
    id: patient.id,
    fullName: `${patient.fname} ${patient.mname ? patient.mname + ' ' : ''}${patient.lname}`,
    dateOfBirth: new Date(patient.DOB),
    age: calculateAge(patient.DOB),
    
    contactInfo: {
      email: patient.email,
      phone: patient.phone_cell || patient.phone_home || patient.phone_work,
      address: formatAddress(patient)
    },
    
    status: patient.status === 'deceased' ? 'Deceased' :
            patient.status === 'inactive' ? 'Inactive' : 'Active',
    
    alerts: {
      allergies: patient.allergies || [],
      medications: patient.medications || [],
      conditions: patient.problems || []
    }
  };
}

/**
 * Maps multiple OpenEMR patients to UI format
 * @param patients Array of OpenEMR patients
 * @returns Array of UI-formatted patients
 */
export function mapToUIPatients(patients: OpenEMRPatient[]): UIPatient[] {
  return patients.map(mapToUIPatient);
}
