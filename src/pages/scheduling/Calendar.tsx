
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  User,
  Plus
} from "lucide-react";

const Calendar = () => {
  // Mock data
  const appointments = [
    {
      time: "9:00 AM",
      patient: "John Smith",
      type: "Follow-up",
      duration: "30min",
    },
    {
      time: "10:00 AM",
      patient: "Sarah Johnson",
      type: "New Patient",
      duration: "60min",
    },
    {
      time: "11:30 AM",
      patient: "Michael Brown",
      type: "Lab Review",
      duration: "30min",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground">Manage appointments and view calendar</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          New Appointment
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        <div className="space-y-6">
          <Card className="p-4">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-between">
                <Button variant="ghost" size="sm">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span className="font-medium">March 2024</span>
                <Button variant="ghost" size="sm">
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-7 text-xs leading-6 text-center text-muted-foreground">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>
              <div className="grid grid-cols-7 text-sm">
                {[...Array(31)].map((_, i) => (
                  <button
                    key={i}
                    className={`p-2 hover:bg-muted rounded-md ${
                      i + 1 === 15 ? "bg-primary text-primary-foreground" : ""
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <h3 className="font-medium mb-4">Upcoming Appointments</h3>
            <div className="space-y-4">
              {appointments.map((apt, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="h-8 w-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{apt.patient}</p>
                    <p className="text-sm text-muted-foreground">{apt.time} - {apt.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Today's Schedule</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Day
                </Button>
                <Button variant="outline" size="sm">
                  Week
                </Button>
                <Button variant="outline" size="sm">
                  Month
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {appointments.map((apt, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg"
                >
                  <div className="w-20 text-sm text-muted-foreground">
                    {apt.time}
                  </div>
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{apt.patient}</p>
                        <p className="text-sm text-muted-foreground">{apt.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      {apt.duration}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
