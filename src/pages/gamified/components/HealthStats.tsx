
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Wind, Activity, Brain, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface SubMetric {
  label: string;
  value: number;
  description: string;
}

interface HealthMetric {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  subMetrics: SubMetric[];
}

const HealthMeter = ({ value }: { value: number }) => (
  <div className="relative w-48 h-48">
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="text-3xl font-bold text-slate-800">{value}</div>
      <div className="text-lg text-slate-600 mt-1 ml-1">/100</div>
    </div>
    <svg className="w-full h-full transform -rotate-90">
      <circle
        cx="96"
        cy="96"
        r="80"
        fill="none"
        stroke="#e5e7eb"
        strokeWidth="12"
      />
      <circle
        cx="96"
        cy="96"
        r="80"
        fill="none"
        stroke="#8B5CF6"
        strokeWidth="12"
        strokeDasharray={`${(value / 100) * 502} 502`}
        className="transition-all duration-1000 ease-out"
      />
    </svg>
  </div>
);

const MetricCard = ({ metric, timeOffset }: { metric: HealthMetric; timeOffset: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const adjustedValue = Math.max(0, Math.min(100, metric.value + timeOffset * 2));

  return (
    <Card className="border-[#D3E4FD]">
      <CardContent className="pt-6">
        <div className="space-y-2">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <div className="flex items-center gap-2">
              {metric.icon}
              <span className="font-medium text-slate-700">{metric.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium" style={{ color: metric.color }}>
                {adjustedValue}/100
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-slate-400" />
              ) : (
                <ChevronDown className="w-4 h-4 text-slate-400" />
              )}
            </div>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full transition-all duration-500"
              style={{ 
                width: `${adjustedValue}%`,
                backgroundColor: metric.color
              }}
            />
          </div>
          
          {isExpanded && (
            <div className="mt-4 space-y-3 pt-3 border-t">
              {metric.subMetrics.map((subMetric, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">{subMetric.label}</span>
                    <span className="text-slate-700 font-medium">{subMetric.value}/100</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-slate-400"
                      style={{ width: `${subMetric.value}%` }}
                    />
                  </div>
                  <p className="text-xs text-slate-500">{subMetric.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

interface HealthStatsProps {
  timeOffset: number;
}

export const HealthStats = ({ timeOffset }: HealthStatsProps) => {
  const metrics: HealthMetric[] = [
    {
      label: "Cardiovascular Health",
      value: 75,
      icon: <Heart className="w-4 h-4 text-red-500" />,
      color: "#ef4444",
      subMetrics: [
        { label: "Blood Pressure", value: 82, description: "Systolic/Diastolic readings within optimal range" },
        { label: "Resting Heart Rate", value: 78, description: "Slightly elevated, room for improvement" },
        { label: "Cholesterol Levels", value: 65, description: "LDL levels could be better managed" }
      ]
    },
    {
      label: "Respiratory Endurance",
      value: 82,
      icon: <Wind className="w-4 h-4 text-blue-500" />,
      color: "#3b82f6",
      subMetrics: [
        { label: "Lung Capacity", value: 85, description: "Excellent vital capacity measurements" },
        { label: "VO2 Max", value: 79, description: "Good oxygen utilization during exercise" },
        { label: "Recovery Rate", value: 82, description: "Quick return to baseline after exertion" }
      ]
    },
    {
      label: "Physical Strength",
      value: 68,
      icon: <Activity className="w-4 h-4 text-green-500" />,
      color: "#22c55e",
      subMetrics: [
        { label: "Muscle Mass", value: 72, description: "Good lean muscle composition" },
        { label: "Core Strength", value: 65, description: "Room for improvement in stability" },
        { label: "Bone Density", value: 67, description: "Within healthy range for age" }
      ]
    },
    {
      label: "Cognitive Function",
      value: 88,
      icon: <Brain className="w-4 h-4 text-purple-500" />,
      color: "#8b5cf6",
      subMetrics: [
        { label: "Memory", value: 92, description: "Excellent recall and retention" },
        { label: "Processing Speed", value: 85, description: "Quick response to cognitive tasks" },
        { label: "Problem Solving", value: 87, description: "Strong analytical capabilities" }
      ]
    }
  ];

  // Calculate overall health score
  const overallScore = Math.round(
    metrics.reduce((acc, metric) => acc + metric.value, 0) / metrics.length
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-center">
        <HealthMeter value={overallScore} />
      </div>
      
      <div className="space-y-4">
        {metrics.map((metric, index) => (
          <MetricCard 
            key={index}
            metric={metric}
            timeOffset={timeOffset}
          />
        ))}
      </div>
    </div>
  );
};
