
import { ArrowLeft, Calendar, ChartBar, DollarSign, FileText, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { ScheduleList } from "@/components/dashboard/ScheduleList";
import { Card } from "@/components/ui/card";

const Admin = () => {
  const metrics = [
    { label: "Total Appointments", value: "45", icon: Calendar },
    { label: "Active Patients", value: "128", icon: Users },
    { label: "Daily Revenue", value: "$5,240", icon: DollarSign },
    { label: "Pending Claims", value: "23", icon: FileText },
  ];

  const appointments = [
    { time: "9:00 AM", patient: "John Smith", type: "Follow-up", status: "Confirmed" },
    { time: "10:30 AM", patient: "Sarah Johnson", type: "New Patient", status: "Pending" },
    { time: "11:45 AM", patient: "Michael Chen", type: "Consultation", status: "Arrived" },
  ];

  const reports = [
    { title: "Weekly Revenue", change: "+12%", value: "$28,550", trend: "up" },
    { title: "Patient Satisfaction", change: "+5%", value: "92%", trend: "up" },
    { title: "Appointment Rate", change: "-3%", value: "85%", trend: "down" },
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
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Practice Overview</p>
          </div>
          <div className="flex items-center gap-2">
            <ChartBar className="w-5 h-5 text-warning" />
            <span className="text-sm text-muted-foreground">Today's Summary</span>
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
          <Card className="p-6" data-clickable="true">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-foreground">Performance Metrics</h2>
              <ChartBar className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-4">
              {reports.map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-white/90 rounded-lg shadow-sm">
                  <div>
                    <p className="font-medium text-foreground">{report.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {report.change} from last week
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-primary">{report.value}</p>
                    <p className={`text-sm ${
                      report.trend === "up" ? "text-success" : "text-destructive"
                    }`}>
                      {report.trend === "up" ? "↑" : "↓"} {report.change}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Admin;
