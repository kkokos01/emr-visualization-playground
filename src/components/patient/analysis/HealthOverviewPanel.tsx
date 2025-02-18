
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowDown, ArrowUp, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface HealthOverviewPanelProps {
  patientId: string;
  onSectionChange: (section: string) => void;
}

export const HealthOverviewPanel = ({ patientId, onSectionChange }: HealthOverviewPanelProps) => {
  const metrics = [
    {
      label: "Blood Pressure",
      value: "138/85",
      trend: "up",
      status: "warning",
      change: "+5 systolic",
      details: "Slightly elevated, monitoring needed"
    },
    {
      label: "Blood Sugar (A1C)",
      value: "7.2%",
      trend: "down",
      status: "success",
      change: "-0.3%",
      details: "Improving, continue current plan"
    },
    {
      label: "Cholesterol (LDL)",
      value: "128",
      trend: "up",
      status: "error",
      status: "error",
      change: "+15",
      details: "Above target, action required"
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Health Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {metrics.map((metric, index) => (
            <div 
              key={index}
              className={cn(
                "p-4 rounded-lg",
                metric.status === "success" && "bg-green-50",
                metric.status === "warning" && "bg-amber-50",
                metric.status === "error" && "bg-red-50"
              )}
            >
              <div className="flex items-start justify-between">
                <h3 className="font-medium">{metric.label}</h3>
                {metric.status === "success" && <CheckCircle className="w-5 h-5 text-green-500" />}
                {metric.status === "warning" && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                {metric.status === "error" && <XCircle className="w-5 h-5 text-red-500" />}
              </div>
              
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold">{metric.value}</span>
                <span className={cn(
                  "flex items-center text-sm",
                  metric.trend === "up" && "text-red-500",
                  metric.trend === "down" && "text-green-500"
                )}>
                  {metric.trend === "up" ? (
                    <ArrowUp className="w-4 h-4" />
                  ) : (
                    <ArrowDown className="w-4 h-4" />
                  )}
                  {metric.change}
                </span>
              </div>
              
              <p className="text-sm text-muted-foreground mt-2">{metric.details}</p>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="mt-2 w-full"
                onClick={() => onSectionChange(metric.label.toLowerCase())}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
