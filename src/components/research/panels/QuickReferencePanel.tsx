
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, ClipboardList, History } from "lucide-react";

interface QuickReferencePanelProps {
  patientId?: string;
}

export const QuickReferencePanel = ({ patientId }: QuickReferencePanelProps) => {
  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <ClipboardList className="w-4 h-4" />
            Recent Orders
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>HbA1c - 3 days ago</li>
            <li>Lipid Panel - 1 week ago</li>
            <li>Chest X-Ray - 2 weeks ago</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <History className="w-4 h-4" />
            Previous Analyses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li>Diabetes Management Review - 1 month ago</li>
            <li>Cardiovascular Risk Assessment - 3 months ago</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Relevant Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-sm space-y-2">
            <li className="text-amber-600">Due for medication review</li>
            <li className="text-red-600">Elevated BP trend detected</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
