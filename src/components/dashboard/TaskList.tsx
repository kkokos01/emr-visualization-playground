
import { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Brain, AlertCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface Task {
  type: string;
  patient: string;
  details: string;
  time: string;
  aiInsight?: string;
  followUp?: boolean;
  priority?: "high" | "medium" | "low";
}

interface TaskListProps {
  title: string;
  icon: LucideIcon;
  tasks: Task[];
}

export const TaskList = ({ title, icon: Icon, tasks }: TaskListProps) => {
  return (
    <Card className="p-6" data-clickable="true">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div 
            key={index} 
            className="flex items-center justify-between p-4 bg-white rounded-lg border border-border hover:border-primary/20 hover:shadow-sm transition-all duration-200"
          >
            <div>
              <div className="flex items-center gap-2">
                <p className="font-medium text-foreground">{task.type}</p>
                {task.priority && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    task.priority === "high" ? "bg-red-100 text-red-700" :
                    task.priority === "medium" ? "bg-orange-100 text-orange-700" :
                    "bg-blue-100 text-blue-700"
                  }`}>
                    {task.priority}
                  </span>
                )}
                {task.aiInsight && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Brain className="h-4 w-4 text-primary hover:text-primary/80" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{task.aiInsight}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                {task.followUp && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <AlertCircle className="h-4 w-4 text-warning hover:text-warning/80" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Follow-up required</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
              <p className="text-sm text-muted-foreground">Patient: {task.patient}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-primary">{task.time}</p>
              <p className="text-sm text-muted-foreground">{task.details}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
