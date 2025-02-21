
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface BodyMetricsPanelProps {
  bodyPart: string;
  timeOffset: number;
}

export const BodyMetricsPanel = ({ bodyPart, timeOffset }: BodyMetricsPanelProps) => {
  const getMetrics = () => {
    switch (bodyPart) {
      case 'head':
        return [
          { label: 'Cognitive Processing', value: '98ms' },
          { label: 'Memory Recall', value: '92%' },
          { label: 'Focus Duration', value: '45m' }
        ];
      case 'torso':
        return [
          { label: 'Lung Capacity', value: '4.5L' },
          { label: 'Resting Heart Rate', value: '68bpm' },
          { label: 'Core Strength', value: '75%' }
        ];
      case 'legs':
        return [
          { label: 'Balance Score', value: '88%' },
          { label: 'Muscle Mass', value: '32kg' },
          { label: 'Joint Flexibility', value: '82%' }
        ];
      default:
        return [];
    }
  };

  return (
    <Card className="border-[#D3E4FD]">
      <CardHeader className="pb-2">
        <h3 className="font-semibold text-lg text-slate-800">
          {bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} Details
        </h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {getMetrics().map((metric, index) => (
            <div key={index} className="p-3 bg-slate-50 rounded-lg">
              <div className="text-sm text-slate-600">{metric.label}</div>
              <div className="text-lg font-semibold text-slate-800">{metric.value}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
