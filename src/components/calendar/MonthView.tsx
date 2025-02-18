
import { format, startOfMonth, endOfMonth, startOfWeek, addDays, isSameMonth } from "date-fns";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appointments";

interface MonthViewProps {
  selectedDate: Date;
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  getAppointmentTypeColor: (type: string) => string;
}

export const MonthView = ({ 
  selectedDate, 
  appointments, 
  onAppointmentClick, 
  getAppointmentTypeColor 
}: MonthViewProps) => {
  const monthStart = startOfMonth(selectedDate);
  const monthEnd = endOfMonth(selectedDate);
  const startDate = startOfWeek(monthStart);
  const days = [];
  let day = startDate;

  while (day <= monthEnd) {
    days.push(day);
    day = addDays(day, 1);
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-7 gap-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="text-center p-2 font-medium text-sm">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-4 min-h-[600px]">
        {days.map((day, i) => (
          <div
            key={i}
            className={cn(
              "border rounded-lg p-2 min-h-[120px]",
              !isSameMonth(day, selectedDate) && "bg-muted/50"
            )}
          >
            <div className="text-sm font-medium mb-2">{format(day, 'd')}</div>
            <div className="space-y-1">
              {appointments.map((apt, index) => (
                <div
                  key={index}
                  className={cn(
                    "p-1 rounded text-xs truncate cursor-pointer",
                    getAppointmentTypeColor(apt.type)
                  )}
                  onClick={() => onAppointmentClick(apt)}
                >
                  {apt.time} - {apt.patient}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
