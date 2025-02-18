
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Clock, User } from "lucide-react";
import { Appointment } from "@/types/appointments";

interface DayViewProps {
  appointments: Appointment[];
  onAppointmentClick: (appointment: Appointment) => void;
  getAppointmentTypeColor: (type: string) => string;
}

export const DayView = ({ appointments, onAppointmentClick, getAppointmentTypeColor }: DayViewProps) => {
  return (
    <div className="space-y-4">
      {appointments.map((apt, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-4 p-4 rounded-lg border-2 transition-colors cursor-pointer",
            getAppointmentTypeColor(apt.type),
            apt.status === "checked-in" && "border-green-500",
          )}
          onClick={() => onAppointmentClick(apt)}
        >
          <div className="w-20 text-sm text-muted-foreground">
            {apt.time}
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{apt.patient}</p>
                <p className="text-sm text-muted-foreground">{apt.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {apt.duration}
              </div>
              {apt.noShowRisk && (
                <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  <AlertCircle className="h-3 w-3" />
                  High no-show risk
                </div>
              )}
              {apt.status === "checked-in" && (
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <CheckCircle2 className="h-3 w-3" />
                  Checked in
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
