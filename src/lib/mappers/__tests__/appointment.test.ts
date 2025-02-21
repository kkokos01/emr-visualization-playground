import { describe, test, expect } from 'vitest';
import { mapToUIAppointment } from '../appointment';
import type { OpenEMRAppointment } from '../../../types/api/models/appointment';

describe('Appointment Mapper', () => {
  // Test data
  const mockOpenEMRAppointment: OpenEMRAppointment = {
    id: 'appt123',
    pc_eid: 456,
    pc_catid: 1,
    pc_title: 'Annual Checkup',
    pc_duration: 30,
    pc_eventDate: '2025-03-15',
    pc_startTime: '09:00:00',
    pc_endTime: '09:30:00',
    pc_pid: 67890,
    pc_aid: 12345,
    pc_facility: 1,
    pc_room: '203B',
    pc_apptstatus: '@',
    pc_time: '2025-02-21 10:00:00',
    patient_name: 'John Smith',
    provider_name: 'Dr. Jane Doe',
    facility_name: 'Main Clinic',
    calendar_category_name: 'Regular Visit',
    calendar_category_color: '#4299E1'
  };

  test('maps basic appointment information correctly', () => {
    const uiAppointment = mapToUIAppointment(mockOpenEMRAppointment);

    expect(uiAppointment.id).toBe('appt123');
    expect(uiAppointment.details.title).toBe('Annual Checkup');
    expect(uiAppointment.timing.duration).toBe(30);
  });

  test('maps patient and provider information correctly', () => {
    const uiAppointment = mapToUIAppointment(mockOpenEMRAppointment);

    expect(uiAppointment.patient).toEqual({
      id: '67890',
      name: 'John Smith'
    });

    expect(uiAppointment.provider).toEqual({
      id: '12345',
      name: 'Dr. Jane Doe'
    });
  });

  test('handles appointment timing correctly', () => {
    const uiAppointment = mapToUIAppointment(mockOpenEMRAppointment);

    expect(uiAppointment.timing.startAt).toBeInstanceOf(Date);
    expect(uiAppointment.timing.endAt).toBeInstanceOf(Date);
    
    // Test time components separately to avoid timezone issues
    const startAt = uiAppointment.timing.startAt;
    expect(startAt.getFullYear()).toBe(2025);
    expect(startAt.getMonth()).toBe(2); // March is 2 (0-based)
    expect(startAt.getDate()).toBe(15);
    expect(startAt.getHours()).toBe(9);
    expect(startAt.getMinutes()).toBe(0);
    
    const endAt = uiAppointment.timing.endAt;
    expect(endAt.getFullYear()).toBe(2025);
    expect(endAt.getMonth()).toBe(2);
    expect(endAt.getDate()).toBe(15);
    expect(endAt.getHours()).toBe(9);
    expect(endAt.getMinutes()).toBe(30);
  });

  test('maps location information correctly', () => {
    const uiAppointment = mapToUIAppointment(mockOpenEMRAppointment);

    expect(uiAppointment.location).toEqual({
      facility: 'Main Clinic',
      room: '203B'
    });
  });

  test('maps status correctly', () => {
    const uiAppointment = mapToUIAppointment(mockOpenEMRAppointment);

    expect(uiAppointment.status).toEqual({
      code: 'checked-in',
      label: 'Checked In',
      color: '#48BB78'
    });
  });

  test('handles missing optional fields gracefully', () => {
    const minimalAppointment: OpenEMRAppointment = {
      id: 'appt123',
      pc_catid: 1,
      pc_duration: 30,
      pc_eventDate: '2025-03-15',
      pc_startTime: '09:00:00',
      pc_endTime: '09:30:00',
      pc_pid: 67890,
      pc_aid: 12345,
      pc_apptstatus: '-',
      pc_time: '2025-02-21 10:00:00'
    };

    const uiAppointment = mapToUIAppointment(minimalAppointment);

    expect(uiAppointment.patient.name).toBe('Unknown Patient');
    expect(uiAppointment.provider.name).toBe('Unknown Provider');
    expect(uiAppointment.location.facility).toBe('Main Facility');
    expect(uiAppointment.details.title).toBe('General Appointment');
  });

  test('handles different appointment statuses correctly', () => {
    const testStatus = (status: string, expectedCode: string) => {
      const appointment = {
        ...mockOpenEMRAppointment,
        pc_apptstatus: status
      };
      const uiAppointment = mapToUIAppointment(appointment);
      return uiAppointment.status.code;
    };

    expect(testStatus('-', 'scheduled')).toBe('scheduled');
    expect(testStatus('@', 'checked-in')).toBe('checked-in');
    expect(testStatus('>', 'in-progress')).toBe('in-progress');
    expect(testStatus('<', 'completed')).toBe('completed');
    expect(testStatus('x', 'cancelled')).toBe('cancelled');
  });
});
