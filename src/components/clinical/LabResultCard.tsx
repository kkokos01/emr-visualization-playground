
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { LabResultVisual } from "./LabResultVisual";

interface LabResult {
  id: string;
  name: string;
  category: string;
  value: number;
  unit: string;
  referenceRange: {
    low: number;
    high: number;
  };
  date: Date;
  status: "normal" | "high" | "low" | "critical";
  description: string;
  interpretation: string;
}

interface LabResultCardProps {
  result: LabResult;
  isExpanded: boolean;
  onToggle: () => void;
}

export const LabResultCard = ({ result, isExpanded, onToggle }: LabResultCardProps) => {
  return (
    <Card
      className={cn(
        "border-l-4",
        result.status === "normal" && "border-l-green-500",
        result.status === "high" && "border-l-red-500",
        result.status === "low" && "border-l-orange-500",
        result.status === "critical" && "border-l-red-700"
      )}
    >
      <CardHeader className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg flex items-center gap-2">
              {result.name}
              {result.status !== "normal" && (
                <AlertCircle className={cn(
                  "w-4 h-4",
                  result.status === "high" && "text-red-500",
                  result.status === "low" && "text-orange-500",
                  result.status === "critical" && "text-red-700"
                )} />
              )}
            </CardTitle>
            <div className="text-sm text-muted-foreground mt-1">
              {result.category} • {result.date.toLocaleDateString()}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="gap-2"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Less
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                More
              </>
            )}
          </Button>
        </div>
        
        <div className="mt-4">
          <LabResultVisual result={result} />
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="px-4 pb-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">What is this test?</h4>
              <p className="text-muted-foreground">{result.description}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">What do your results mean?</h4>
              <p className="text-muted-foreground">{result.interpretation}</p>
            </div>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
