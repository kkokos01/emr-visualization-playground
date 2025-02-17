
import { Link, useParams } from "react-router-dom";
import { 
  Activity, AlertCircle, Brain, Calendar, ChartBar, 
  FileText, Heart, LightbulbIcon, Pill, Plus, 
  Stethoscope, TestTube, TrendingDown, TrendingUp
} from "lucide-react";
import { PatientInfoCard } from "@/components/clinical/PatientInfoCard";
import { MetricCard } from "@/components/clinical/MetricCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PatientChart = () => {
  const { id } = useParams();

  const patientInfo = {
    name: "John Doe",
    details: "Male, 45 years • DOB: 1978-05-15 • MRN: 123456",
    alerts: [
      { type: "allergy", message: "Allergy: Penicillin", severity: "error" },
      { type: "condition", message: "Diabetic", severity: "warning" }
    ],
    actions: [
      {
        label: "New Note",
        icon: <FileText className="h-4 w-4 mr-2" />,
        onClick: () => {}
      },
      {
        label: "Schedule Visit",
        icon: <Calendar className="h-4 w-4 mr-2" />,
        onClick: () => {}
      }
    ]
  };

  const vitals = [
    { title: "Blood Pressure", value: "142/88 mmHg", trend: "up", trendColor: "text-red-600" },
    { title: "Heart Rate", value: "72 bpm" },
    { title: "Temperature", value: "98.6°F" },
    { title: "Weight", value: "185 lbs" }
  ];

  const labResults = [
    { 
      title: "HbA1c", 
      value: "7.2%", 
      trend: "up", 
      trendColor: "text-red-600",
      subtitle: "Target: <6.5% - Oct 15, 2023"
    },
    {
      title: "Creatinine",
      value: "1.1 mg/dL",
      trend: "down",
      trendColor: "text-green-600",
      subtitle: "Within range - Oct 15, 2023"
    }
  ];

  return (
    <div className="space-y-6">
      <PatientInfoCard {...patientInfo} />

      <Card className="p-6 bg-primary/10 border-primary/20">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
          <Brain className="h-5 w-5" />
          AI Clinical Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-primary/90">
            <LightbulbIcon className="h-4 w-4 text-primary" />
            <span>Due for annual diabetic eye exam</span>
          </div>
          <div className="flex items-center gap-2 text-primary/90">
            <LightbulbIcon className="h-4 w-4 text-primary" />
            <span>BP trending higher than usual</span>
          </div>
          <div className="flex items-center gap-2 text-primary/90">
            <LightbulbIcon className="h-4 w-4 text-primary" />
            <span>Consider HbA1c check (last: 3 months ago)</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="p-6" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Active Problems
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Type 2 Diabetes</span>
                  <span className="text-sm text-primary">Since 2020</span>
                </div>
                <p className="text-sm text-primary/70 mt-1">Last A1c: 7.2 (2 months ago)</p>
              </div>
              <div className="p-3 bg-muted rounded-lg border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Hypertension</span>
                  <span className="text-sm text-primary">Since 2019</span>
                </div>
                <p className="text-sm text-primary/70 mt-1">Target: &lt;140/90</p>
              </div>
            </div>
          </Card>

          <Card className="p-6" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Vitals
            </h3>
            <div className="space-y-4">
              {vitals.map((vital, index) => (
                <MetricCard key={index} icon={Activity} {...vital} />
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TestTube className="h-5 w-5 text-primary" />
              Recent Lab Results
            </h3>
            <div className="space-y-3">
              {labResults.map((lab, index) => (
                <MetricCard key={index} icon={TestTube} {...lab} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientChart;
