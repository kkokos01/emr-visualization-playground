
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Bell, Calendar, ChartBar, ClipboardList, 
  FileText, MessageSquare, Users, AlertTriangle 
} from "lucide-react";

const Dashboard = () => {
  // Mock data - in real app, this would be fetched based on user role
  const notifications = [
    { id: 1, type: "task", message: "Lab results ready for review", time: "10 mins ago" },
    { id: 2, type: "message", message: "New message from Dr. Smith", time: "1 hour ago" },
    { id: 3, type: "alert", message: "Patient appointment reminder", time: "2 hours ago" },
  ];

  const quickStats = [
    { label: "Today's Patients", value: "12", icon: Users },
    { label: "Pending Tasks", value: "5", icon: ClipboardList },
    { label: "Unread Messages", value: "3", icon: MessageSquare },
    { label: "Upcoming Appointments", value: "8", icon: Calendar },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Dr. Thompson</h1>
          <p className="text-muted-foreground">Here's what's happening today</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className="h-5 w-5 text-primary" />
              <span className="text-2xl font-bold">{stat.value}</span>
            </div>
            <p className="text-muted-foreground">{stat.label}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Recent Activities
            </h2>
          </div>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div key={notification.id} className="flex items-start gap-4 p-3 bg-muted/50 rounded-lg">
                {notification.type === "task" && <ClipboardList className="h-5 w-5 text-primary" />}
                {notification.type === "message" && <MessageSquare className="h-5 w-5 text-primary" />}
                {notification.type === "alert" && <AlertTriangle className="h-5 w-5 text-warning" />}
                <div className="flex-1">
                  <p className="text-sm font-medium">{notification.message}</p>
                  <p className="text-xs text-muted-foreground">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <ChartBar className="h-5 w-5" />
              Performance Overview
            </h2>
          </div>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Patient Satisfaction</p>
                <p className="text-2xl font-bold">94%</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">Tasks Completed</p>
                <p className="text-2xl font-bold">28</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
