
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, Clock, AlertCircle, Video, MapPin, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface PatientAppointment {
  id: string;
  date: Date;
  time: string;
  provider: string;
  type: string;
  location: "virtual" | "in-person";
  status: "scheduled" | "checked-in" | "completed";
  instructions?: string;
}

// Mock data for upcoming appointments
const upcomingAppointments: PatientAppointment[] = [
  {
    id: "1",
    date: new Date("2024-03-20"),
    time: "10:00 AM",
    provider: "Dr. Sarah Thompson",
    type: "Follow-up Visit",
    location: "in-person",
    status: "scheduled",
    instructions: "Please arrive 15 minutes early to complete paperwork."
  },
  {
    id: "2",
    date: new Date("2024-04-05"),
    time: "2:30 PM",
    provider: "Dr. James Wilson",
    type: "Lab Results Review",
    location: "virtual",
    status: "scheduled",
    instructions: "Click the link in your email to join the video call."
  }
];

// Mock data for recommended appointments
const recommendedAppointments = [
  {
    type: "Annual Physical",
    dueDate: "April 2024",
    priority: "high",
    reason: "Last visit was over 12 months ago"
  },
  {
    type: "Vaccination",
    dueDate: "May 2024",
    priority: "medium",
    reason: "Seasonal flu shot recommended"
  }
];

const PatientAppointments = () => {
  const [searchingAppointment, setSearchingAppointment] = useState(false);

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">My Appointments</h1>
          <Button onClick={() => setSearchingAppointment(true)} className="gap-2">
            <Plus className="w-4 h-4" />
            Schedule New Visit
          </Button>
        </div>

        {/* Upcoming Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start gap-4 p-4 bg-muted rounded-lg"
                >
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium">{appointment.type}</h3>
                      {appointment.location === "virtual" && (
                        <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          <Video className="w-3 h-3" />
                          Virtual Visit
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      with {appointment.provider}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        {appointment.time}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        {appointment.date.toLocaleDateString()}
                      </span>
                      {appointment.location === "in-person" && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          Main Clinic
                        </span>
                      )}
                    </div>
                    {appointment.instructions && (
                      <div className="mt-3 flex items-start gap-2 text-sm bg-amber-50 text-amber-700 p-2 rounded">
                        <AlertCircle className="w-4 h-4 mt-0.5" />
                        <p>{appointment.instructions}</p>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommended Appointments */}
        <Card>
          <CardHeader>
            <CardTitle>Recommended Health Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px] pr-4">
              <div className="space-y-4">
                {recommendedAppointments.map((rec, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between p-4 bg-muted rounded-lg"
                  >
                    <div>
                      <h3 className="font-medium mb-1">{rec.type}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Due: {rec.dueDate}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {rec.reason}
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSearchingAppointment(true)}
                      className="gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Schedule
                    </Button>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
            <Video className="w-5 h-5" />
            Join Virtual Visit
          </Button>
          <Button variant="outline" className="h-auto py-6 flex flex-col items-center gap-2">
            <Calendar className="w-5 h-5" />
            View Past Visits
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PatientAppointments;
