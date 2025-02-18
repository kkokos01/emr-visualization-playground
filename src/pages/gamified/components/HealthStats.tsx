
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Heart, Wind, Activity, Brain } from "lucide-react";

interface StatBarProps {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

const StatBar = ({ label, value, icon, color }: StatBarProps) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {icon}
        <span className="font-medium text-slate-700">{label}</span>
      </div>
      <span className="text-sm font-medium" style={{ color }}>
        {value}/100
      </span>
    </div>
    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
      <div 
        className="h-full rounded-full transition-all duration-500"
        style={{ 
          width: `${value}%`,
          backgroundColor: color
        }}
      />
    </div>
  </div>
);

interface HealthStatsProps {
  timeOffset: number;
}

export const HealthStats = ({ timeOffset }: HealthStatsProps) => {
  // Simulate different values based on time offset
  const getAdjustedValue = (baseValue: number) => {
    const adjustment = timeOffset * 2; // 2 points per year
    return Math.max(0, Math.min(100, baseValue + adjustment));
  };

  return (
    <Card className="border-[#D3E4FD]">
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg text-slate-800">Health Metrics</h3>
      </CardHeader>
      <CardContent className="space-y-4">
        <StatBar 
          label="Cardiovascular Health" 
          value={getAdjustedValue(75)}
          icon={<Heart className="w-4 h-4 text-red-500" />}
          color="#ef4444"
        />
        <StatBar 
          label="Respiratory Endurance" 
          value={getAdjustedValue(82)}
          icon={<Wind className="w-4 h-4 text-blue-500" />}
          color="#3b82f6"
        />
        <StatBar 
          label="Physical Strength" 
          value={getAdjustedValue(68)}
          icon={<Activity className="w-4 h-4 text-green-500" />}
          color="#22c55e"
        />
        <StatBar 
          label="Cognitive Function" 
          value={getAdjustedValue(88)}
          icon={<Brain className="w-4 h-4 text-purple-500" />}
          color="#8b5cf6"
        />
      </CardContent>
    </Card>
  );
};
