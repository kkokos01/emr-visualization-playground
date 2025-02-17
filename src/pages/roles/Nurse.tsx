import { ArrowLeft, Calendar, ClipboardCheck, ClipboardList, Pill, Stethoscope, Users } from "lucide-react";
import { Link } from "react-router-dom";

const Nurse = () => {
  const metrics = [
    { label: "Active Patients", value: "8", icon: Users },
    { label: "Completed Tasks", value: "15", icon: ClipboardCheck },
    { label: "Pending Vitals", value: "3", icon: Stethoscope },
    { label: "Med Administration", value: "6", icon: Pill },
  ];

  const patientQueue = [
    { time: "Current", name: "John Smith", room: "Room 1", status: "Vitals Needed" },
    { time: "Next", name: "Lisa Anderson", room: "Room 2", status: "Waiting" },
    { time: "Upcoming", name: "Robert Taylor", room: "Room 3", status: "Scheduled" },
  ];

  const tasks = [
    { type: "Medication", patient: "Alice Cooper", details: "Administer insulin", time: "10:30 AM" },
    { type: "Vitals Check", patient: "Tom Wilson", details: "Pre-appointment check", time: "11:00 AM" },
    { type: "Lab Draw", patient: "Sarah Johnson", details: "Routine bloodwork", time: "11:30 AM" },
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
            <div
              key={index}
              className="card-gradient p-6 rounded-lg shadow-sm border border-muted"
              data-clickable="true"
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
          <div className="glass p-6" data-clickable="true">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Patient Queue</h2>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              {patientQueue.map((patient, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/90 rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium text-foreground">{patient.name}</p>
                    <p className="text-sm text-muted-foreground">{patient.room}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{patient.time}</p>
                    <p className="text-sm text-muted-foreground">{patient.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass p-6" data-clickable="true">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Upcoming Tasks</h2>
              <Calendar className="w-5 h-5 text-primary" />
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
        </div>
      </div>
    </div>
  );
};

export default Nurse;
