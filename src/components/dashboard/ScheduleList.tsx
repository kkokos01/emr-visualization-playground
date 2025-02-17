
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface Appointment {
  time: string;
  patient: string;
  type: string;
  status: string;
}

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
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200"
          >
            <div>
              <p className="font-medium text-foreground">{appointment.patient}</p>
              <p className="text-sm text-muted-foreground">{appointment.type}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-primary">{appointment.time}</p>
              <p className="text-sm text-muted-foreground">{appointment.status}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
