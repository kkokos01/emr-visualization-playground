
import { cn } from "@/lib/utils";

interface LabResult {
  value: number;
  unit: string;
  referenceRange: {
    low: number;
    high: number;
  };
  status: "normal" | "high" | "low" | "critical";
}

interface LabResultVisualProps {
  result: LabResult;
}

export const LabResultVisual = ({ result }: LabResultVisualProps) => {
  const { value, unit, referenceRange, status } = result;
  const { low, high } = referenceRange;

  // Calculate position percentage for the marker
  const range = high - low;
  const position = Math.max(0, Math.min(100, ((value - low) / range) * 100));

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium">
          Your Result: {value} {unit}
        </span>
        <span className="text-muted-foreground">
          Reference Range: {low}-{high} {unit}
        </span>
      </div>
      
      <div className="relative h-8">
        {/* Background gradient */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="h-full w-full bg-gradient-to-r from-orange-200 via-green-200 to-red-200" />
        </div>

        {/* Range markers */}
        <div className="absolute inset-0 flex items-center justify-between px-2 text-xs text-muted-foreground">
          <span>Low</span>
          <span>Normal</span>
          <span>High</span>
        </div>

        {/* Value marker */}
        <div
          className="absolute top-0 h-full"
          style={{ left: `${position}%` }}
        >
          <div className={cn(
            "h-8 w-0.5 bg-foreground",
            status === "normal" && "bg-green-600",
            status === "high" && "bg-red-600",
            status === "low" && "bg-orange-600",
            status === "critical" && "bg-red-800"
          )} />
          <div className={cn(
            "absolute -bottom-6 left-50 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium",
            status === "normal" && "bg-green-100 text-green-800",
            status === "high" && "bg-red-100 text-red-800",
            status === "low" && "bg-orange-100 text-orange-800",
            status === "critical" && "bg-red-100 text-red-900"
          )}>
            {value}
          </div>
        </div>
      </div>
    </div>
  );
};
