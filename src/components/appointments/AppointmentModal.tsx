
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  AlertCircle,
  Calendar as CalendarIcon,
  CheckCircle2,
  Clock,
  CreditCard,
  FileText,
  Plus,
  Printer,
  ShieldCheck,
  User
} from "lucide-react";
import { format } from "date-fns";

interface AppointmentModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment?: {
    patientName: string;
    date: Date;
    type: string;
    status: "scheduled" | "checked-in" | "completed";
    insuranceStatus?: "verified" | "pending" | "expired";
    balance?: number;
  };
}

export const AppointmentModal = ({
  open,
  onOpenChange,
  appointment
}: AppointmentModalProps) => {
  const [activeTab, setActiveTab] = useState("check-in");
  const [followUpDate, setFollowUpDate] = useState<Date>();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Appointment Details
          </DialogTitle>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="check-in">Check In</TabsTrigger>
            <TabsTrigger value="check-out">Check Out</TabsTrigger>
          </TabsList>

          <TabsContent value="check-in" className="mt-4">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column - Patient Info */}
              <div className="space-y-6">
                <div className="p-6 bg-muted/30 rounded-lg border-2 border-muted">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {appointment?.patientName}
                      </h3>
                      <div className="text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {appointment?.date && format(appointment.date, "PPp")}
                        </div>
                        <div className="mt-1">{appointment?.type}</div>
                      </div>
                    </div>
                    <div className="px-2 py-1 rounded text-sm bg-primary/10 text-primary">
                      {appointment?.status}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="Update phone if changed"
                        className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg border-2 border-muted">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Required Forms
                  </h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="consent" />
                      <label
                        htmlFor="consent"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Consent Form
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="hipaa" />
                      <label
                        htmlFor="hipaa"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        HIPAA Agreement
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Insurance & Payment */}
              <div className="space-y-6">
                <div className="p-6 bg-muted/30 rounded-lg border-2 border-muted">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold flex items-center gap-2">
                      <ShieldCheck className="h-4 w-4" />
                      Insurance Status
                    </h3>
                    <Button variant="outline" size="sm">
                      Run Eligibility Check
                    </Button>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm">
                    {appointment?.insuranceStatus === "verified" ? (
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertCircle className="h-4 w-4 text-orange-500" />
                    )}
                    {appointment?.insuranceStatus || "pending"}
                  </div>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg border-2 border-muted">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    Payment Details
                  </h3>
                  
                  {appointment?.balance && appointment.balance > 0 ? (
                    <div className="space-y-4">
                      <div className="text-sm">
                        Outstanding Balance: ${appointment.balance.toFixed(2)}
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="copay" />
                          <label
                            htmlFor="copay"
                            className="text-sm font-medium leading-none"
                          >
                            Copay Collected
                          </label>
                        </div>
                        <Input
                          type="number"
                          placeholder="Payment amount"
                          className="bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="text-sm text-muted-foreground">
                      No outstanding balance
                    </div>
                  )}
                </div>

                <Button className="w-full">Mark as Checked In</Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="check-out" className="mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-6">
                <div className="p-6 bg-muted/30 rounded-lg border-2 border-muted">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4" />
                    Schedule Follow-up
                  </h3>
                  <div className="space-y-4">
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {followUpDate ? (
                            format(followUpDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={followUpDate}
                          onSelect={setFollowUpDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <Button className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Schedule Appointment
                    </Button>
                  </div>
                </div>

                <div className="p-6 bg-muted/30 rounded-lg border-2 border-muted">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Printer className="h-4 w-4" />
                    Print Documents
                  </h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Visit Summary
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Prescriptions
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Lab Orders
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 bg-muted/30 rounded-lg border-2 border-muted">
                  <h3 className="font-semibold mb-4">Visit Notes</h3>
                  <textarea
                    className="w-full h-32 p-3 rounded-md bg-white border-2 border-input/50 shadow-[inset_0_1px_3px_0_rgb(0,0,0,0.08)] focus:border-primary resize-none"
                    placeholder="Add any notes about the visit..."
                  />
                </div>

                <Button className="w-full">Complete Visit</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
