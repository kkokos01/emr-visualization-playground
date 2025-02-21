import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { LabResultsDisclaimer } from "@/components/clinical/LabResultsDisclaimer";
import { LabResultsSummary } from "@/components/clinical/LabResultsSummary";
import { LabResultCard } from "@/components/clinical/LabResultCard";

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
        <LabResultsDisclaimer />
        <LabResultsSummary 
          abnormalResults={abnormalResults}
          isExpanded={summaryExpanded}
          onToggle={() => setSummaryExpanded(!summaryExpanded)}
        />
      </div>

      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {mockResults.map(result => (
            <LabResultCard
              key={result.id}
              result={result}
              isExpanded={expandedResults.includes(result.id)}
              onToggle={() => toggleResult(result.id)}
            />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default LabResults;
