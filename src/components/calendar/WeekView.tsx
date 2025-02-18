
import { format, startOfWeek, addDays } from "date-fns";
import { Appointment } from "@/types/appointments";
import { AppointmentItem } from "@/components/appointments/AppointmentItem";

interface WeekViewProps {
  selectedDate: Date;
  appointments: Appointment[];
}

export const WeekView = ({ selectedDate, appointments }: WeekViewProps) => {
  const weekStart = startOfWeek(selectedDate);
  const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i));

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-4">
        {weekDays.map((day, i) => (
          <div key={i} className="text-center p-2 border-b font-medium">
            <div className="text-sm text-muted-foreground">{format(day, 'EEE')}</div>
            <div>{format(day, 'd')}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4 min-h-[600px]">
        {weekDays.map((day, i) => (
          <div key={i} className="border-r last:border-r-0">
            <div className="space-y-2 p-2">
              {appointments.map((appointment, index) => (
                <AppointmentItem
                  key={index}
                  appointment={appointment}
                  variant="compact"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
