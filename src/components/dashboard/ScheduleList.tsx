
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Brain, AlertCircle, CheckCircle2 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AppointmentItem } from "@/components/appointments/AppointmentItem";
import { Appointment } from "@/types/appointments";

interface ScheduleListProps {
  title: string;
  icon: LucideIcon;
  appointments: Appointment[];
}

export const ScheduleList = ({ title, icon: Icon, appointments }: ScheduleListProps) => {
  return (
    <Card className="p-6" data-clickable="true">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="space-y-4">
        {appointments.map((appointment, index) => (
          <AppointmentItem
            key={index}
            appointment={appointment}
            variant="compact"
          />
        ))}
      </div>
    </Card>
  );
};
