
import { format, startOfWeek, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appointments";

interface WeekViewProps {
  selectedDate: Date;
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  getAppointmentTypeColor: (type: string) => string;
}

export const WeekView = ({ 
  selectedDate, 
  appointments, 
  onAppointmentClick, 
  getAppointmentTypeColor 
}: WeekViewProps) => {
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
              {appointments.map((apt, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-2 rounded-md text-xs cursor-pointer",
                    getAppointmentTypeColor(apt.type)
                  )}
                  onClick={() => onAppointmentClick(apt)}
                >
                  <div className="font-medium">{apt.time}</div>
                  <div>{apt.patient}</div>
                  <div className="text-muted-foreground">{apt.type}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
