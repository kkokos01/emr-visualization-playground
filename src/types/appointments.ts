
export interface Appointment {
  time: string;
  patient: string;
  type: string;
  duration: string;
  status: "scheduled" | "checked-in" | "completed";
  noShowRisk: boolean;
  date: Date;
  insuranceStatus?: "verified" | "pending" | "expired";
  balance?: number;
}
