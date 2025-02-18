import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AppointmentModal } from "@/components/appointments/AppointmentModal";
import { DayView } from "@/components/calendar/DayView";
import { WeekView } from "@/components/calendar/WeekView";
import { MonthView } from "@/components/calendar/MonthView";
import { CalendarHeader } from "@/components/calendar/CalendarHeader";
import { cn } from "@/lib/utils";
import { Appointment } from "@/types/appointments";
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

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock data
  const appointments: Appointment[] = [
    {
      time: "9:00 AM",
      patient: "John Smith",
      patientName: "John Smith", // Added to match modal requirements
      type: "Follow-up",
      duration: "30min",
      status: "checked-in",
      noShowRisk: false,
      date: new Date(),
      insuranceStatus: "verified",
      balance: 50
    },
    {
      time: "10:00 AM",
      patient: "Sarah Johnson",
      patientName: "Sarah Johnson", // Added to match modal requirements
      type: "New Patient",
      duration: "60min",
      status: "scheduled",
      noShowRisk: true,
      date: new Date(),
      insuranceStatus: "pending",
      balance: 150
    },
    {
      time: "11:30 AM",
      patient: "Michael Brown",
      patientName: "Michael Brown", // Added to match modal requirements
      type: "Lab Review",
      duration: "30min",
      status: "scheduled",
      noShowRisk: false,
      date: new Date(),
      insuranceStatus: "expired",
      balance: 0
    },
  ];

  const handleAppointmentClick = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

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

  return (
    <div className="space-y-6">
      <CalendarHeader />

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

            {view === 'day' && (
              <DayView
                appointments={appointments}
                onAppointmentClick={handleAppointmentClick}
                getAppointmentTypeColor={getAppointmentTypeColor}
              />
            )}
            {view === 'week' && (
              <WeekView
                selectedDate={selectedDate}
                appointments={appointments}
                onAppointmentClick={handleAppointmentClick}
                getAppointmentTypeColor={getAppointmentTypeColor}
              />
            )}
            {view === 'month' && (
              <MonthView
                selectedDate={selectedDate}
                appointments={appointments}
                onAppointmentClick={handleAppointmentClick}
                getAppointmentTypeColor={getAppointmentTypeColor}
              />
            )}
          </div>
        </Card>
      </div>

      <AppointmentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        appointment={selectedAppointment}
      />
    </div>
  );
};

export default Calendar;
