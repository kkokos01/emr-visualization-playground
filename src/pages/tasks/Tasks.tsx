import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CheckCircle2, 
  Clock, 
  Plus, 
  AlertCircle,
  Filter,
  ClipboardList
} from "lucide-react";

const Tasks = () => {
  const tasks = [
    {
      id: 1,
      title: "Review Lab Results",
      patient: "Sarah Johnson",
      priority: "High",
      due: "Today",
      type: "Clinical",
      status: "pending"
    },
    {
      id: 2,
      title: "Complete Progress Notes",
      patient: "Michael Brown",
      priority: "Medium",
      due: "Tomorrow",
      type: "Documentation",
      status: "pending"
    },
    {
      id: 3,
      title: "Follow-up Call",
      patient: "Emily Wilson",
      priority: "Low",
      due: "Mar 20",
      type: "Administrative",
      status: "completed"
    },
  ];

  const stats = [
    { label: "Total Tasks", value: "12" },
    { label: "Due Today", value: "5" },
    { label: "Overdue", value: "2" },
    { label: "Completed", value: "8" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Tasks</h1>
          <p className="text-muted-foreground">Manage and track your tasks</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Task
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="p-4" data-clickable="true">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6" data-clickable="true">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Task List
          </h2>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>

        <div className="space-y-4">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-lg border ${
                task.status === "completed" ? "bg-muted" : "bg-background"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className={`rounded-full ${
                      task.status === "completed" ? "text-primary" : ""
                    }`}
                  >
                    {task.status === "completed" ? (
                      <CheckCircle2 className="h-5 w-5" />
                    ) : (
                      <div className="h-5 w-5 rounded-full border-2" />
                    )}
                  </Button>
                  <div>
                    <h3 className={`font-medium ${
                      task.status === "completed" ? "line-through text-muted-foreground" : ""
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Patient: {task.patient}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {task.type}
                      </span>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        task.priority === "High" 
                          ? "bg-red-100 text-red-800"
                          : task.priority === "Medium"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  {task.priority === "High" && (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  )}
                  <Clock className="h-4 w-4" />
                  <span>Due: {task.due}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Tasks;
