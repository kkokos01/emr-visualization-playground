import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp, AlertCircle, Info, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { LabResultVisual } from "@/components/clinical/LabResultVisual";
import { cn } from "@/lib/utils";

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

const mockResults: LabResult[] = [
  {
    id: "1",
    name: "Hemoglobin A1c",
    category: "Diabetes",
    value: 7.2,
    unit: "%",
    referenceRange: {
      low: 4.0,
      high: 5.6,
    },
    date: new Date(2024, 2, 15),
    status: "high",
    description: "HbA1c measures your average blood sugar level over the past 2-3 months. It's one of the main tests used to diagnose and monitor diabetes.",
    interpretation: "Your HbA1c is elevated at 7.2%, which is above the normal range. This suggests that your average blood sugar levels have been higher than desired over the past few months.",
  },
  {
    id: "2",
    name: "Total Cholesterol",
    category: "Lipids",
    value: 180,
    unit: "mg/dL",
    referenceRange: {
      low: 125,
      high: 200,
    },
    date: new Date(2024, 2, 15),
    status: "normal",
    description: "Total cholesterol is a measure of all the cholesterol in your blood. It's used to assess your risk of heart disease.",
    interpretation: "Your total cholesterol is within the normal range, indicating good control of blood lipids.",
  },
  {
    id: "3",
    name: "Creatinine",
    category: "Kidney Function",
    value: 1.8,
    unit: "mg/dL",
    referenceRange: {
      low: 0.7,
      high: 1.3,
    },
    date: new Date(2024, 2, 15),
    status: "high",
    description: "Creatinine is a waste product that your kidneys filter from your blood. Higher levels can indicate that your kidneys aren't working as well as they should.",
    interpretation: "Your creatinine is elevated, which may indicate reduced kidney function. This should be discussed with your healthcare provider.",
  },
];

const LabResults = () => {
  const [expandedResults, setExpandedResults] = useState<string[]>([]);
  const [summaryExpanded, setSummaryExpanded] = useState(true);

  const toggleAll = () => {
    if (expandedResults.length === mockResults.length && summaryExpanded) {
      setExpandedResults([]);
      setSummaryExpanded(false);
    } else {
      setExpandedResults(mockResults.map(result => result.id));
      setSummaryExpanded(true);
    }
  };

  const toggleResult = (id: string) => {
    setExpandedResults(prev =>
      prev.includes(id)
        ? prev.filter(resultId => resultId !== id)
        : [...prev, id]
    );
  };

  const abnormalResults = mockResults.filter(result => result.status !== "normal");

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-4">
        <Button
          variant="outline"
          onClick={toggleAll}
          className="gap-2"
        >
          {expandedResults.length === mockResults.length && summaryExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              Collapse All Results
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              Expand All Results
            </>
          )}
        </Button>
      </div>

      <div className="mb-8 space-y-4">
        <h1 className="text-3xl font-bold">Your Lab Results</h1>
        
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-amber-800 mb-2">
              <AlertTriangle className="w-5 h-5" />
              <span className="font-medium">Important Notice</span>
            </div>
            <p className="text-muted-foreground text-sm">
              These results and their interpretations are for informational purposes only and do not constitute a medical diagnosis. 
              Always discuss your results with your healthcare provider during your next visit.
            </p>
          </CardContent>
        </Card>

        <Card className="bg-sky-50 border-sky-200">
          <CardContent className="p-6">
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

              {summaryExpanded && (
                <>
                  <div className="pl-8">
                    <div className="bg-white rounded-lg p-4">
                      <h4 className="font-medium text-sky-900 mb-2">Key Points for Discussion</h4>
                      <ul className="list-disc list-inside space-y-2 text-sky-800">
                        <li>What lifestyle changes could help improve my elevated results?</li>
                        <li>Should we adjust any medications based on these results?</li>
                        <li>When should we retest to monitor these values?</li>
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {mockResults.map(result => (
            <Card
              key={result.id}
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
                    onClick={() => toggleResult(result.id)}
                    className="gap-2"
                  >
                    {expandedResults.includes(result.id) ? (
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

              {expandedResults.includes(result.id) && (
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
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LabResults;
