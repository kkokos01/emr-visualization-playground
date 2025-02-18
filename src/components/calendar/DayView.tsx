
import { Appointment } from "@/types/appointments";
import { AppointmentItem } from "@/components/appointments/AppointmentItem";

interface DayViewProps {
  appointments: Appointment[];
}

export const DayView = ({ appointments }: DayViewProps) => {
  return (
    <div className="space-y-4">
      {appointments.map((appointment, index) => (
        <AppointmentItem
          key={index}
          appointment={appointment}
        />
      ))}
    </div>
  );
};
