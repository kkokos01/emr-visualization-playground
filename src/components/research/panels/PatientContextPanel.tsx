
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Pill, AlertCircle, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

interface PatientContextPanelProps {
  patientId?: string;
  mode?: "physician" | "patient";
}

export const PatientContextPanel = ({ patientId, mode = "physician" }: PatientContextPanelProps) => {
  const handleEdit = (section: string) => {
    console.log(`Editing ${section}`);
    // Add your edit logic here
  };

  const EditButton = ({ section }: { section: string }) => {
    if (mode === "physician") {
      return (
        <Button variant="ghost" size="sm" onClick={() => handleEdit(section)}>
          <Edit2 className="w-4 h-4" />
        </Button>
      );
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Edit2 className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Research Modification</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to modify information for research purposes only. This will not change your actual medical records. These modifications are for exploring "what-if" scenarios and should be discussed with your healthcare provider before making any real changes to your treatment.
              
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleEdit(section)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p>John Doe</p>
            <p className="text-muted-foreground">45 years old • Male</p>
            <p className="text-muted-foreground">MRN: 123456</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Pill className="w-4 h-4" />
            Current Medications
          </CardTitle>
          <EditButton section="medications" />
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>Metformin 500mg BID</li>
            <li>Lisinopril 10mg Daily</li>
            <li>Atorvastatin 40mg Daily</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Active Conditions
          </CardTitle>
          <EditButton section="conditions" />
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>Type 2 Diabetes</li>
            <li>Hypertension</li>
            <li>Hyperlipidemia</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Recent Vitals
          </CardTitle>
          <EditButton section="vitals" />
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p>BP: 138/82 mmHg</p>
            <p>HR: 72 bpm</p>
            <p>Temp: 98.6°F</p>
            <p>SpO2: 98%</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
