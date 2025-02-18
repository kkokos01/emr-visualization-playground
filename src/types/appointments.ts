
export interface Appointment {
  time: string;
  patient: string;
  patientName: string; // Now required
  type: string;
  duration: string;
  status: "scheduled" | "checked-in" | "completed";
  noShowRisk: boolean;
  date: Date;
  insuranceStatus?: "verified" | "pending" | "expired";
  balance?: number;
}
