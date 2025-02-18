import { Button } from "@/components/ui/button";
import { Plus, Wand2 } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { PatientSearch } from "@/components/shared/PatientSearch";
import { Input } from "@/components/ui/input";
import { AlertCircle, Clock, User } from "lucide-react";

export const CalendarHeader = () => {
  return (
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
                    <Clock className="h-4 w-4 text-blue-500" />
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
  );
};
