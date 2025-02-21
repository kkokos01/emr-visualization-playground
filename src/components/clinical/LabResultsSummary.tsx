
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface LabResult {
  id: string;
  name: string;
  value: number;
  unit: string;
  status: "normal" | "high" | "low" | "critical";
  interpretation: string;
}

interface LabResultsSummaryProps {
  abnormalResults: LabResult[];
  isExpanded: boolean;
  onToggle: () => void;
}

export const LabResultsSummary = ({ abnormalResults, isExpanded, onToggle }: LabResultsSummaryProps) => {
  return (
    <Card className="bg-sky-50 border-sky-200">
      <CardHeader className="p-6 pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl text-sky-900">Results Summary</CardTitle>
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
      </CardHeader>
      <CardContent className="p-6 pt-4">
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <Info className="w-5 h-5 text-sky-600 mt-1 shrink-0" />
            <div>
              <h3 className="text-lg font-medium text-sky-900 mb-2">Areas Needing Attention</h3>
              <div className="space-y-2">
                {abnormalResults.map(result => (
                  <div 
                    key={result.id}
                    className={cn(
                      "p-3 rounded-md",
                      result.status === "high" && "bg-red-50 text-red-800",
                      result.status === "low" && "bg-orange-50 text-orange-800",
                      result.status === "critical" && "bg-red-100 text-red-900"
                    )}
                  >
                    <p className="font-medium">
                      {result.name}: {result.value} {result.unit}
                    </p>
                    <p className="text-sm mt-1">
                      {result.interpretation}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {isExpanded && (
            <>
              <div className="pl-8">
                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-sky-900 mb-2">Narrative Summary</h4>
                    <p className="text-sky-800">
                      Your recent lab results show {abnormalResults.length} value{abnormalResults.length !== 1 ? 's' : ''} outside 
                      the normal range. The most significant findings are related to 
                      {abnormalResults.map((result, index) => (
                        <span key={result.id}>
                          {index === 0 ? ' ' : index === abnormalResults.length - 1 ? ' and ' : ', '}
                          {result.name.toLowerCase()}
                        </span>
                      ))}.
                      These results suggest that adjustments to your current treatment plan may be needed.
                    </p>
                  </div>
                  <div className="bg-white rounded-lg p-4">
                    <h4 className="font-medium text-sky-900 mb-2">Key Points for Discussion</h4>
                    <ul className="list-disc list-inside space-y-2 text-sky-800">
                      <li>What lifestyle changes could help improve my elevated results?</li>
                      <li>Should we adjust any medications based on these results?</li>
                      <li>When should we retest to monitor these values?</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
