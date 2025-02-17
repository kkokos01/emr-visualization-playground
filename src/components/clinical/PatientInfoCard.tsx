
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, AlertCircle } from "lucide-react";

interface PatientInfoCardProps {
  name: string;
  details: string;
  alerts?: Array<{
    type: string;
    message: string;
    severity: "warning" | "error";
  }>;
  actions?: Array<{
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
  }>;
}

export const PatientInfoCard = ({ name, details, alerts = [], actions = [] }: PatientInfoCardProps) => {
  return (
    <Card className="p-6" data-clickable="true">
      <div className="flex items-start justify-between">
        <div className="flex gap-4">
          <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
            <User className="h-8 w-8 text-muted-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{name}</h1>
            <div className="flex gap-4 text-sm text-muted-foreground">
              {details}
            </div>
            {alerts.length > 0 && (
              <div className="flex gap-2 mt-2">
                {alerts.map((alert, index) => (
                  <span 
                    key={index}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${alert.severity === 'error' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}
                  >
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {alert.message}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
        {actions.length > 0 && (
          <div className="flex gap-2">
            {actions.map((action, index) => (
              <Button 
                key={index}
                onClick={action.onClick}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        )}
      </div>
    </Card>
  );
};
