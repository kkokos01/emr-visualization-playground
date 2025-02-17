
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Brain, AlertCircle, CheckCircle2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Appointment {
  time: string;
  patient: string;
  type: string;
  status: string;
  noShowRisk?: boolean;
  aiInsight?: string;
  isCheckedIn?: boolean;
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
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{appointment.patient}</p>
                {appointment.noShowRisk && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle className="h-4 w-4 text-warning hover:text-warning/80" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>High risk of no-show based on history</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {appointment.aiInsight && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Brain className="h-4 w-4 text-primary hover:text-primary/80" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{appointment.aiInsight}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {appointment.isCheckedIn && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    <CheckCircle2 className="h-3 w-3" />
                    Checked In
                  </span>
                )}
              </div>
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
