import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { ChevronRight, Clock, Video, MapPin } from "lucide-react";
import { Appointment } from "@/types/appointments";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointmentType?: string;
  appointment?: Appointment;
}

const mockTimeSlots = [
  { time: "9:00 AM", available: true },
  { time: "9:30 AM", available: false },
  { time: "10:00 AM", available: true },
  { time: "10:30 AM", available: true },
  { time: "11:00 AM", available: false },
  { time: "11:30 AM", available: true },
  { time: "1:00 PM", available: true },
  { time: "1:30 PM", available: true },
  { time: "2:00 PM", available: false },
  { time: "2:30 PM", available: true },
  { time: "3:00 PM", available: true },
  { time: "3:30 PM", available: true },
];

export const AppointmentModal = ({ 
  open, 
  onOpenChange, 
  appointmentType,
  appointment 
}: AppointmentModalProps) => {
  const [step, setStep] = useState(1);
  const [selectedProvider, setSelectedProvider] = useState(appointment?.provider || "");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(appointment?.date);
  const [selectedTime, setSelectedTime] = useState(appointment?.time || "");
  const [visitType, setVisitType] = useState<"virtual" | "in-person">(
    appointment?.location || "in-person"
  );

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    onOpenChange(false);
    setStep(1);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-full sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>Schedule Appointment</SheetTitle>
        </SheetHeader>

        <div className="mt-6">
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label>Visit Type</Label>
                <Select
                  value={appointmentType || ""}
                  onValueChange={(value) => console.log(value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type of visit" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="annual">Annual Physical</SelectItem>
                    <SelectItem value="followup">Follow-up Visit</SelectItem>
                    <SelectItem value="urgent">Urgent Care</SelectItem>
                    <SelectItem value="vaccine">Vaccination</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Provider</Label>
                <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a provider" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dr-thompson">Dr. Sarah Thompson</SelectItem>
                    <SelectItem value="dr-wilson">Dr. James Wilson</SelectItem>
                    <SelectItem value="dr-davis">Dr. Emily Davis</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Visit Method</Label>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={visitType === "in-person" ? "default" : "outline"}
                    className="w-full justify-start gap-2"
                    onClick={() => setVisitType("in-person")}
                  >
                    <MapPin className="h-4 w-4" />
                    In-Person Visit
                  </Button>
                  <Button
                    variant={visitType === "virtual" ? "default" : "outline"}
                    className="w-full justify-start gap-2"
                    onClick={() => setVisitType("virtual")}
                  >
                    <Video className="h-4 w-4" />
                    Virtual Visit
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <Label>Select Date</Label>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border"
                disabled={(date) => date < new Date() || date.getDay() === 0 || date.getDay() === 6}
              />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <Label>Available Times</Label>
              <ScrollArea className="h-[300px]">
                <div className="grid grid-cols-2 gap-2">
                  {mockTimeSlots.map((slot) => (
                    <Button
                      key={slot.time}
                      variant={selectedTime === slot.time ? "default" : "outline"}
                      className={cn(
                        "w-full justify-start gap-2",
                        !slot.available && "opacity-50 cursor-not-allowed"
                      )}
                      disabled={!slot.available}
                      onClick={() => setSelectedTime(slot.time)}
                    >
                      <Clock className="h-4 w-4" />
                      {slot.time}
                    </Button>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-4">
              <div className="rounded-lg border p-4 space-y-3">
                <h3 className="font-medium">Appointment Summary</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="text-muted-foreground">Provider:</span> Dr. Sarah Thompson</p>
                  <p><span className="text-muted-foreground">Date:</span> {selectedDate?.toLocaleDateString()}</p>
                  <p><span className="text-muted-foreground">Time:</span> {selectedTime}</p>
                  <p><span className="text-muted-foreground">Visit Type:</span> {visitType === "virtual" ? "Virtual Visit" : "In-Person Visit"}</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Insurance on File</Label>
                <div className="rounded-lg border p-3 text-sm">
                  <p className="font-medium">Blue Cross Blue Shield</p>
                  <p className="text-muted-foreground">Policy #: XXXX-XXX-XXX</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Special Instructions</Label>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>• Please arrive 15 minutes before your appointment time</p>
                  <p>• Bring a list of current medications</p>
                  <p>• Wear a mask in the clinic</p>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 flex gap-2">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            <Button 
              className="flex-1 gap-2" 
              onClick={step === 4 ? handleSubmit : handleNext}
            >
              {step === 4 ? (
                "Confirm Appointment"
              ) : (
                <>
                  Next
                  <ChevronRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
