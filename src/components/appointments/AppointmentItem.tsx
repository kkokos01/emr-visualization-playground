
import { useState } from "react";
import { cn } from "@/lib/utils";
import { AlertCircle, CheckCircle2, Clock, User } from "lucide-react";
import { Appointment } from "@/types/appointments";
import { AppointmentModal } from "./AppointmentModal";

interface AppointmentItemProps {
  appointment: Appointment;
  variant?: "compact" | "default";
  className?: string;
}

export const AppointmentItem = ({ 
  appointment, 
  variant = "default",
  className 
}: AppointmentItemProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getAppointmentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "follow-up":
        return "bg-green-100 border-green-200 hover:bg-green-200";
      case "new patient":
        return "bg-blue-100 border-blue-200 hover:bg-blue-200";
      case "lab review":
        return "bg-purple-100 border-purple-200 hover:bg-purple-200";
      default:
        return "bg-gray-100";
    }
  };

  if (variant === "compact") {
    return (
      <>
        <div
          className={cn(
            "p-2 rounded-md text-sm cursor-pointer",
            getAppointmentTypeColor(appointment.type),
            className
          )}
          onClick={() => setIsModalOpen(true)}
        >
          <div className="font-medium">{appointment.time}</div>
          <div>{appointment.patientName}</div>
          <div className="text-muted-foreground">{appointment.type}</div>
        </div>
        <AppointmentModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          appointment={appointment}
        />
      </>
    );
  }

  return (
    <>
      <div
        className={cn(
          "flex items-center gap-4 p-4 rounded-lg border-2 transition-colors cursor-pointer",
          getAppointmentTypeColor(appointment.type),
          appointment.status === "checked-in" && "border-green-500",
          className
        )}
        onClick={() => setIsModalOpen(true)}
      >
        <div className="w-20 text-sm text-muted-foreground">
          {appointment.time}
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{appointment.patientName}</p>
              <p className="text-sm text-muted-foreground">{appointment.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {appointment.duration}
            </div>
            {appointment.noShowRisk && (
              <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                <AlertCircle className="h-3 w-3" />
                High no-show risk
              </div>
            )}
            {appointment.status === "checked-in" && (
              <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                <CheckCircle2 className="h-3 w-3" />
                Checked in
              </div>
            )}
          </div>
        </div>
      </div>
      <AppointmentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        appointment={appointment}
      />
    </>
  );
};
