
import { LucideIcon } from "lucide-react";

interface Task {
  type: string;
  patient: string;
  details: string;
  time: string;
}

interface TaskListProps {
  title: string;
  icon: LucideIcon;
  tasks: Task[];
}

export const TaskList = ({ title, icon: Icon, tasks }: TaskListProps) => {
  return (
    <div className="glass p-6" data-clickable="true">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-foreground">{title}</h2>
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="space-y-4">
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-white/90 rounded-lg shadow-sm">
            <div>
              <p className="font-medium text-foreground">{task.type}</p>
              <p className="text-sm text-muted-foreground">Patient: {task.patient}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-primary">{task.time}</p>
              <p className="text-sm text-muted-foreground">{task.details}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
