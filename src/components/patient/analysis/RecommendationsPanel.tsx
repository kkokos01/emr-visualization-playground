
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Calendar, CheckCircle, ClipboardList } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecommendationsPanelProps {
  patientId: string;
}

export const RecommendationsPanel = ({ patientId }: RecommendationsPanelProps) => {
  const recommendations = {
    specialists: [
      {
        type: "Cardiologist",
        priority: "high",
        timeframe: "Within 2 weeks",
        reason: "Review blood pressure management"
      }
    ],
    timeline: [
      {
        date: "Next Week",
        action: "Blood pressure check at home",
        frequency: "Daily"
      },
      {
        date: "Within 2 Weeks",
        action: "Cardiologist appointment",
        frequency: "One time"
      },
      {
        date: "Next Month",
        action: "Follow-up with primary doctor",
        frequency: "One time"
      }
    ],
    warningSign

s: [
      "Chest pain or pressure",
      "Severe headache",
      "Shortness of breath",
      "Dizziness or confusion"
    ],
    nextSteps: [
      { task: "Schedule cardiologist appointment", completed: false },
      { task: "Start blood pressure log", completed: true },
      { task: "Review current medications", completed: false },
      { task: "Begin low-sodium diet plan", completed: false }
    ]
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h3 className="font-medium mb-4">Specialist Recommendations</h3>
        {recommendations.specialists.map((specialist, index) => (
          <div 
            key={index}
            className={cn(
              "p-4 rounded-lg",
              specialist.priority === "high" ? "bg-red-50" : "bg-muted"
            )}
          >
            <div className="flex items-start justify-between">
              <div>
                <h4 className="font-medium">{specialist.type}</h4>
                <p className="text-sm text-muted-foreground">{specialist.reason}</p>
                <p className="text-sm font-medium mt-2">{specialist.timeframe}</p>
              </div>
              {specialist.priority === "high" && (
                <AlertTriangle className="w-5 h-5 text-red-500" />
              )}
            </div>
            <Button className="w-full mt-3" size="sm">
              <Calendar className="w-4 h-4 mr-2" />
              Schedule Now
            </Button>
          </div>
        ))}
      </div>

      <div>
        <h3 className="font-medium mb-4">Timeline</h3>
        <div className="space-y-3">
          {recommendations.timeline.map((item, index) => (
            <div key={index} className="bg-muted p-3 rounded-lg">
              <p className="font-medium">{item.date}</p>
              <p className="text-sm text-muted-foreground">{item.action}</p>
              <p className="text-sm text-muted-foreground">Frequency: {item.frequency}</p>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Warning Signs to Watch</h3>
        <div className="bg-red-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-1" />
            <div>
              <p className="font-medium mb-2">Seek immediate medical attention if you experience:</p>
              <ul className="list-disc pl-5 space-y-1">
                {recommendations.warningSign.map((sign, index) => (
                  <li key={index} className="text-sm text-muted-foreground">{sign}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-medium mb-4">Next Steps Checklist</h3>
        <div className="space-y-2">
          {recommendations.nextSteps.map((step, index) => (
            <div 
              key={index}
              className={cn(
                "p-3 rounded-lg flex items-start gap-3",
                step.completed ? "bg-green-50" : "bg-muted"
              )}
            >
              {step.completed ? (
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
              ) : (
                <ClipboardList className="w-5 h-5 text-muted-foreground mt-0.5" />
              )}
              <span className={cn(
                "text-sm",
                step.completed && "line-through text-muted-foreground"
              )}>
                {step.task}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
