export interface Appointment {
  time: string;
  patient: string;
  patientName: string;
  type: string;
  duration: string;
  status: "scheduled" | "checked-in" | "completed";
  noShowRisk: boolean;
  date: Date;
  insuranceStatus?: "verified" | "pending" | "expired";
  balance?: number;
  aiInsight?: string;
  provider?: string;
  location?: "virtual" | "in-person";
  waitlistEntry?: {
    requestedDate: Date;
    preferredTimeRange: string;
    urgency: "low" | "medium" | "high";
    notes?: string;
  };
}
