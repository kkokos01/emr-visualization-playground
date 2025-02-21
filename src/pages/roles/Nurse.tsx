import { ArrowLeft, Calendar, ClipboardCheck, ClipboardList, Pill, Stethoscope, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TaskList } from "@/components/dashboard/TaskList";

const Nurse = () => {
  const metrics = [
    { label: "Active Patients", value: "8", icon: Users },
    { label: "Completed Tasks", value: "15", icon: ClipboardCheck },
    { label: "Pending Vitals", value: "3", icon: Stethoscope },
    { label: "Med Administration", value: "6", icon: Pill },
  ];

  const patientQueue = [
    { 
      type: "Vitals Check", 
      patient: "John Smith", 
      details: "Room 1", 
      time: "Current",
      priority: "high" as const,
      aiInsight: "Blood pressure trending high over last 3 visits"
    },
    { 
      type: "Check-in", 
      patient: "Lisa Anderson", 
      details: "Room 2", 
      time: "Next",
      priority: "medium" as const,
      followUp: true
    },
    { 
      type: "Pre-appointment", 
      patient: "Robert Taylor", 
      details: "Room 3", 
      time: "Upcoming",
      aiInsight: "Patient has difficulty with mobility, may need assistance"
    },
  ];

  const tasks = [
    { 
      type: "Medication", 
      patient: "Alice Cooper", 
      details: "Administer insulin", 
      time: "10:30 AM",
      priority: "high" as const,
      aiInsight: "Last reading was borderline high"
    },
    { 
      type: "Vitals Check", 
      patient: "Tom Wilson", 
      details: "Pre-appointment check", 
      time: "11:00 AM",
      priority: "medium" as const
    },
    { 
      type: "Lab Draw", 
      patient: "Sarah Johnson", 
      details: "Routine bloodwork", 
      time: "11:30 AM",
      priority: "low" as const,
      aiInsight: "Patient has history of difficult draws, right arm preferred"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Portal
        </Link>

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nurse Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Nurse Williams</p>
          </div>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-success" />
            <span className="text-sm text-muted-foreground">On Shift</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <MetricCard
              key={index}
              label={metric.label}
              value={metric.value}
              icon={metric.icon}
            />
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TaskList
            title="Patient Queue"
            icon={Users}
            tasks={patientQueue}
          />
          <TaskList
            title="Upcoming Tasks"
            icon={Calendar}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Nurse;
