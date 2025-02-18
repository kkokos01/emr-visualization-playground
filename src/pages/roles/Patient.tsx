import { ArrowLeft, Calendar, CircleUser, ClipboardList, Heart, TestTube, MessageSquare, FileText, ChevronRight, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Patient = () => {
  const metrics = [
    { label: "Upcoming Appointments", value: "2", icon: Calendar },
    { label: "New Messages", value: "3", icon: MessageSquare },
    { label: "Pending Results", value: "4", icon: TestTube },
    { label: "Active Prescriptions", value: "6", icon: FileText },
  ];

  const upcomingAppointments = [
    {
      date: "Mar 15, 2024",
      time: "10:00 AM",
      provider: "Dr. Thompson",
      type: "Follow-up",
      location: "Main Clinic"
    },
    {
      date: "Mar 22, 2024",
      time: "2:30 PM",
      provider: "Dr. Wilson",
      type: "Lab Review",
      location: "Virtual Visit"
    }
  ];

  const recentResults = [
    {
      date: "Mar 10, 2024",
      test: "Complete Blood Count",
      status: "Ready for Review",
      urgent: false
    },
    {
      date: "Mar 8, 2024",
      test: "Lipid Panel",
      status: "Reviewed",
      urgent: false
    }
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
            <h1 className="text-3xl font-bold text-foreground">Patient Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, John Smith</p>
          </div>
          <div className="flex items-center gap-2">
            <CircleUser className="w-5 h-5 text-primary" />
            <span className="text-sm text-muted-foreground">My Health Portal</span>
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
          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Schedule Appointment</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center gap-2">
                  <MessageSquare className="w-5 h-5" />
                  <span>Message Provider</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 px-6 flex flex-col items-center gap-2">
                  <TestTube className="w-5 h-5" />
                  <span>View Test Results</span>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-auto py-4 px-6 flex flex-col items-center gap-2 border-primary/30 hover:border-primary"
                  onClick={() => window.location.href = '/patient/1/second-opinion'}
                >
                  <Brain className="w-5 h-5 text-primary" />
                  <span>Get a Second Opinion</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Upcoming Appointments
                <Button variant="outline" size="sm">View Calendar</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingAppointments.map((apt, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{apt.provider}</p>
                      <p className="text-sm text-muted-foreground">{apt.type}</p>
                      <p className="text-sm text-muted-foreground">{apt.location}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{apt.date}</p>
                      <p className="text-sm text-muted-foreground">{apt.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Results */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Test Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentResults.map((result, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{result.test}</p>
                      <p className="text-sm text-muted-foreground">{result.date}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{result.status}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Health Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Health Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Vital Signs</p>
                    <Heart className="w-4 h-4 text-primary" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Blood Pressure</p>
                      <p className="font-medium">120/80</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Heart Rate</p>
                      <p className="font-medium">72 bpm</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="font-medium">Medications</p>
                    <FileText className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground">6 Active Prescriptions</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Patient;
