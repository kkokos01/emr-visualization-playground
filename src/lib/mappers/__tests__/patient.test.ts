import { describe, test, expect } from 'vitest';
import { mapToUIPatient } from '../patient';
import type { OpenEMRPatient } from '../../../types/api/models/patient';

describe('Patient Mapper', () => {
  // Test data
  const mockOpenEMRPatient: OpenEMRPatient = {
    id: '12345',
    pid: 67890,
    fname: 'John',
    mname: 'Quincy',
    lname: 'Smith',
    DOB: '1980-05-15',
    email: 'john.smith@email.com',
    phone_cell: '555-0123',
    phone_home: '555-4567',
    street: '123 Main St',
    city: 'Springfield',
    state: 'IL',
    postal_code: '62701',
    country_code: 'USA',
    status: 'active',
    allergies: ['Penicillin'],
    medications: ['Aspirin'],
    problems: ['Hypertension']
  };

  test('maps basic patient information correctly', () => {
    const uiPatient = mapToUIPatient(mockOpenEMRPatient);

    expect(uiPatient.id).toBe('12345');
    expect(uiPatient.fullName).toBe('John Quincy Smith');
    expect(uiPatient.dateOfBirth).toBeInstanceOf(Date);
    expect(uiPatient.dateOfBirth.toISOString().split('T')[0]).toBe('1980-05-15');
  });

  test('calculates age correctly', () => {
    const uiPatient = mapToUIPatient(mockOpenEMRPatient);
    let expectedAge = new Date().getFullYear() - 1980;
    
    // Account for birthday not yet occurred this year
    const birthDate = new Date('1980-05-15');
    const today = new Date();
    if (
      today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
      expectedAge--;
    }

    expect(uiPatient.age).toBe(expectedAge);
  });

  test('formats contact information correctly', () => {
    const uiPatient = mapToUIPatient(mockOpenEMRPatient);

    expect(uiPatient.contactInfo).toEqual({
      email: 'john.smith@email.com',
      phone: '555-0123', // Should prefer cell phone
      address: '123 Main St, Springfield, IL, 62701, USA'
    });
  });

  test('handles missing middle name correctly', () => {
    const patientNoMiddleName = {
      ...mockOpenEMRPatient,
      mname: undefined
    };
    const uiPatient = mapToUIPatient(patientNoMiddleName);
    expect(uiPatient.fullName).toBe('John Smith');
  });

  test('handles patient status correctly', () => {
    // Test active status
    expect(mapToUIPatient(mockOpenEMRPatient).status).toBe('Active');

    // Test inactive status
    const inactivePatient: OpenEMRPatient = { 
      ...mockOpenEMRPatient, 
      status: 'inactive' as const 
    };
    expect(mapToUIPatient(inactivePatient).status).toBe('Inactive');

    // Test deceased status
    const deceasedPatient: OpenEMRPatient = { 
      ...mockOpenEMRPatient, 
      status: 'deceased' as const 
    };
    expect(mapToUIPatient(deceasedPatient).status).toBe('Deceased');
  });

  test('handles medical alerts correctly', () => {
    const uiPatient = mapToUIPatient(mockOpenEMRPatient);

    expect(uiPatient.alerts).toEqual({
      allergies: ['Penicillin'],
      medications: ['Aspirin'],
      conditions: ['Hypertension']
    });
  });

  test('handles missing optional fields gracefully', () => {
    const minimalPatient: OpenEMRPatient = {
      id: '12345',
      fname: 'John',
      lname: 'Smith',
      DOB: '1980-05-15',
      pid: 67890
    };

    const uiPatient = mapToUIPatient(minimalPatient);

    expect(uiPatient.contactInfo).toEqual({
      email: undefined,
      phone: undefined,
      address: ''
    });
    expect(uiPatient.alerts).toEqual({
      allergies: [],
      medications: [],
      conditions: []
    });
  });
});
