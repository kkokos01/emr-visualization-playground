
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Pill, AlertCircle } from "lucide-react";

interface PatientContextPanelProps {
  patientId?: string;
}

export const PatientContextPanel = ({ patientId }: PatientContextPanelProps) => {
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
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
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Pill className="w-4 h-4" />
            Current Medications
          </CardTitle>
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
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <AlertCircle className="w-4 h-4" />
            Active Conditions
          </CardTitle>
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
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Activity className="w-4 h-4" />
            Recent Vitals
          </CardTitle>
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
