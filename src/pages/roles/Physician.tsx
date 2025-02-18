
import { ArrowLeft, Calendar, ClipboardList, Clock, MessageSquare, Stethoscope, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { TaskList } from "@/components/dashboard/TaskList";
import { ScheduleList } from "@/components/dashboard/ScheduleList";

const Physician = () => {
  const metrics = [
    { label: "Patients Today", value: "12", icon: Users },
    { label: "Pending Reviews", value: "5", icon: ClipboardList },
    { label: "Avg. Wait Time", value: "14m", icon: Clock },
    { label: "Unread Messages", value: "3", icon: MessageSquare },
  ];

  const appointments = [
    { 
      time: "10:00 AM", 
      patient: "Sarah Johnson", 
      patientName: "Sarah Johnson", // Added required field
      type: "Follow-up", 
      status: "checked-in",
      duration: "30min", // Added required field
      date: new Date(), // Added required field
      noShowRisk: false // Added required field
    },
    { 
      time: "10:30 AM", 
      patient: "Michael Chen", 
      patientName: "Michael Chen", // Added required field
      type: "New Patient", 
      status: "scheduled",
      duration: "45min", // Added required field
      date: new Date(), // Added required field
      noShowRisk: false // Added required field
    },
    { 
      time: "11:00 AM", 
      patient: "Emma Davis", 
      patientName: "Emma Davis", // Added required field
      type: "Lab Review", 
      status: "scheduled",
      duration: "30min", // Added required field
      date: new Date(), // Added required field
      noShowRisk: false // Added required field
    },
  ];

  const tasks = [
    { 
      type: "Review Lab Results", 
      patient: "David Wilson", 
      details: "CBC Results", 
      time: "Today",
      priority: "high" as const,
      aiInsight: "Hemoglobin levels show significant change from last test",
      followUp: true
    },
    { 
      type: "Sign Prescription", 
      patient: "Maria Garcia", 
      details: "Renewal", 
      time: "Today",
      priority: "medium" as const,
      aiInsight: "Patient due for medication review next month"
    },
    { 
      type: "Complete Chart Notes", 
      patient: "James Brown", 
      details: "Follow-up", 
      time: "Tomorrow",
      priority: "low" as const
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
            <h1 className="text-3xl font-bold text-foreground">Physician Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, Dr. Thompson</p>
          </div>
          <div className="flex items-center gap-2">
            <Stethoscope className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">On Duty</span>
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
          <ScheduleList
            title="Today's Schedule"
            icon={Calendar}
            appointments={appointments}
          />
          <TaskList
            title="Pending Tasks"
            icon={ClipboardList}
            tasks={tasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Physician;
