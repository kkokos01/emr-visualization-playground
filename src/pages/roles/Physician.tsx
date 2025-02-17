
import { ArrowLeft, Calendar, ClipboardList, Clock, MessageSquare, Stethoscope, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Physician = () => {
  const metrics = [
    { label: "Patients Today", value: "12", icon: Users },
    { label: "Pending Reviews", value: "5", icon: ClipboardList },
    { label: "Avg. Wait Time", value: "14m", icon: Clock },
    { label: "Unread Messages", value: "3", icon: MessageSquare },
  ];

  const upcomingAppointments = [
    { time: "10:00 AM", patient: "Sarah Johnson", type: "Follow-up", status: "Checked In" },
    { time: "10:30 AM", patient: "Michael Chen", type: "New Patient", status: "Scheduled" },
    { time: "11:00 AM", patient: "Emma Davis", type: "Lab Review", status: "Scheduled" },
  ];

  const tasks = [
    { title: "Review Lab Results", priority: "High", patient: "David Wilson", due: "Today" },
    { title: "Sign Prescription", priority: "Medium", patient: "Maria Garcia", due: "Today" },
    { title: "Complete Chart Notes", priority: "Low", patient: "James Brown", due: "Tomorrow" },
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

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => (
            <div
              key={index}
              className="card-gradient p-6 rounded-lg shadow-sm border border-muted"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-medium text-muted-foreground">
                  {metric.label}
                </h3>
                <metric.icon className="w-5 h-5 text-primary opacity-75" />
              </div>
              <p className="text-2xl font-semibold text-foreground">{metric.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upcoming Appointments */}
          <div className="glass p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Today's Schedule</h2>
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
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
          </div>

          {/* Tasks & Notifications */}
          <div className="glass p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Pending Tasks</h2>
              <ClipboardList className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              {tasks.map((task, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/50 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{task.title}</p>
                    <p className="text-sm text-muted-foreground">Patient: {task.patient}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">Due: {task.due}</p>
                    <p className="text-sm text-muted-foreground">Priority: {task.priority}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Physician;
