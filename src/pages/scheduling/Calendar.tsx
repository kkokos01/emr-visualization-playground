import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PatientSearch } from "@/components/shared/PatientSearch";
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight,
  Clock,
  User,
  Plus,
  Wand2,
  AlertCircle,
  CheckCircle2,
  Users,
  ArrowRightLeft,
  BadgeAlert
} from "lucide-react";
import { cn } from "@/lib/utils";
import { format, startOfWeek, addDays, startOfMonth, endOfMonth, isSameMonth } from "date-fns";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  // Mock data
  const appointments = [
    {
      time: "9:00 AM",
      patient: "John Smith",
      type: "Follow-up",
      duration: "30min",
      status: "checked-in",
      noShowRisk: false
    },
    {
      time: "10:00 AM",
      patient: "Sarah Johnson",
      type: "New Patient",
      duration: "60min",
      status: "scheduled",
      noShowRisk: true
    },
    {
      time: "11:30 AM",
      patient: "Michael Brown",
      type: "Lab Review",
      duration: "30min",
      status: "scheduled",
      noShowRisk: false
    },
  ];

  const getAppointmentTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "follow-up":
        return "bg-green-100 border-green-200 hover:bg-green-200";
      case "new patient":
        return "bg-blue-100 border-blue-200 hover:bg-blue-200";
      case "lab review":
        return "bg-purple-100 border-purple-200 hover:bg-purple-200";
      default:
        return "bg-gray-100";
    }
  };

  // Mock restrictions data (in real implementation, this would come from the patient's profile)
  const patientRestrictions = [
    {
      type: "provider",
      icon: "user",
      description: "Must see Dr. Brown (primary physician)"
    },
    {
      type: "time",
      icon: "clock",
      description: "Works 9-5, prefers telehealth during these hours"
    },
    {
      type: "access",
      icon: "wheelchair",
      description: "Needs accessible room"
    }
  ];

  const renderDayView = () => (
    <div className="space-y-4">
      {appointments.map((apt, index) => (
        <div
          key={index}
          className={cn(
            "flex items-center gap-4 p-4 rounded-lg border-2 transition-colors cursor-pointer",
            getAppointmentTypeColor(apt.type),
            apt.status === "checked-in" && "border-green-500",
          )}
        >
          <div className="w-20 text-sm text-muted-foreground">
            {apt.time}
          </div>
          <div className="flex-1 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{apt.patient}</p>
                <p className="text-sm text-muted-foreground">{apt.type}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                {apt.duration}
              </div>
              {apt.noShowRisk && (
                <div className="flex items-center gap-1 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
                  <AlertCircle className="h-3 w-3" />
                  High no-show risk
                </div>
              )}
              {apt.status === "checked-in" && (
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  <CheckCircle2 className="h-3 w-3" />
                  Checked in
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderWeekView = () => {
    const weekStart = startOfWeek(selectedDate);
    const weekDays = [...Array(7)].map((_, i) => addDays(weekStart, i));

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-4">
          {weekDays.map((day, i) => (
            <div key={i} className="text-center p-2 border-b font-medium">
              <div className="text-sm text-muted-foreground">{format(day, 'EEE')}</div>
              <div>{format(day, 'd')}</div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4 min-h-[600px]">
          {weekDays.map((day, i) => (
            <div key={i} className="border-r last:border-r-0">
              <div className="space-y-2 p-2">
                {appointments.map((apt, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-2 rounded-md text-xs",
                      getAppointmentTypeColor(apt.type)
                    )}
                  >
                    <div className="font-medium">{apt.time}</div>
                    <div>{apt.patient}</div>
                    <div className="text-muted-foreground">{apt.type}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = startOfMonth(selectedDate);
    const monthEnd = endOfMonth(selectedDate);
    const startDate = startOfWeek(monthStart);
    const days = [];
    let day = startDate;

    while (day <= monthEnd) {
      days.push(day);
      day = addDays(day, 1);
    }

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-7 gap-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div key={day} className="text-center p-2 font-medium text-sm">
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-4 min-h-[600px]">
          {days.map((day, i) => (
            <div
              key={i}
              className={cn(
                "border rounded-lg p-2 min-h-[120px]",
                !isSameMonth(day, selectedDate) && "bg-muted/50"
              )}
            >
              <div className="text-sm font-medium mb-2">{format(day, 'd')}</div>
              <div className="space-y-1">
                {appointments.map((apt, index) => (
                  <div
                    key={index}
                    className={cn(
                      "p-1 rounded text-xs truncate",
                      getAppointmentTypeColor(apt.type)
                    )}
                  >
                    {apt.time} - {apt.patient}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Schedule</h1>
          <p className="text-muted-foreground">Manage appointments and view calendar</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2">
            <Wand2 className="h-4 w-4" />
            Optimize Schedule
          </Button>
          <Sheet>
            <SheetTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Appointment
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Schedule New Appointment</SheetTitle>
              </SheetHeader>
              <div className="space-y-4 mt-6">
                <PatientSearch />

                {/* Patient Restrictions Section */}
                <div className="rounded-lg border bg-muted/50 p-4">
                  <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    Patient Scheduling Restrictions
                  </h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm p-2 bg-white rounded-md border">
                      <User className="h-4 w-4 text-primary" />
                      <span>Must see Dr. Brown (primary physician)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm p-2 bg-white rounded-md border">
                      <Clock className="h-4 w-4 text-orange-500" />
                      <span>Works 9-5, prefers telehealth during these hours</span>
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full mt-2 text-xs h-8 text-muted-foreground hover:text-foreground"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Restriction
                  </Button>
                </div>

                <Input type="datetime-local" />
                <select className="w-full p-2 rounded-md border">
                  <option>Follow-up (30min)</option>
                  <option>New Patient (60min)</option>
                  <option>Lab Review (30min)</option>
                </select>
                <textarea 
                  className="w-full p-2 rounded-md border min-h-[100px]"
                  placeholder="Notes..."
                />

                {/* AI Suggestions - Updated to consider restrictions */}
                <div className="p-4 bg-blue-50 rounded-md">
                  <h4 className="font-medium flex items-center gap-2">
                    <Wand2 className="h-4 w-4" />
                    AI Suggestions
                  </h4>
                  <ul className="mt-2 space-y-2 text-sm">
                    <li className="flex items-center gap-2">
                      <ArrowRightLeft className="h-4 w-4 text-blue-500" />
                      Dr. Brown has availability at 2:30 PM
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      Recommended: Telehealth appointment at 12:00 PM
                    </li>
                    <li className="flex items-center gap-2">
                      <AlertCircle className="h-4 w-4 text-blue-500" />
                      Patient prefers morning appointments based on history
                    </li>
                  </ul>
                </div>

                <Button className="w-full">Schedule Appointment</Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
        {/* Left Sidebar */}
        <div className="space-y-6">
          {/* Mini Calendar */}
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

          {/* Daily Overview */}
          <Card className="p-4">
            <h3 className="font-medium mb-4">Today's Overview</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  Total Appointments
                </span>
                <span className="font-medium">12</span>
              </div>
              <div className="flex items-center justify-between text-orange-600">
                <span className="flex items-center gap-2">
                  <BadgeAlert className="h-4 w-4" />
                  Predicted No-shows
                </span>
                <span className="font-medium">2</span>
              </div>
              <div className="flex items-center justify-between text-green-600">
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4" />
                  Checked-in
                </span>
                <span className="font-medium">5</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Calendar View */}
        <Card className="p-6">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {view === 'day' ? "Today's Schedule" : 
                 view === 'week' ? "Weekly Schedule" : "Monthly Schedule"}
              </h2>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className={cn(view === 'day' && "bg-primary/5")}
                  onClick={() => setView('day')}
                >
                  Day
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(view === 'week' && "bg-primary/5")}
                  onClick={() => setView('week')}
                >
                  Week
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className={cn(view === 'month' && "bg-primary/5")}
                  onClick={() => setView('month')}
                >
                  Month
                </Button>
              </div>
            </div>

            {view === 'day' && renderDayView()}
            {view === 'week' && renderWeekView()}
            {view === 'month' && renderMonthView()}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Calendar;
