
import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, ChevronDown, ChevronUp, AlertCircle, ArrowRight, Brain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface TestResult {
  id: string;
  name: string;
  category: string;
  date: Date;
  status: "normal" | "high" | "low" | "critical";
  summary: string;
  requiresReview: boolean;
}

// Mock data for demonstration
const testResults: TestResult[] = [
  {
    id: "1",
    name: "Comprehensive Metabolic Panel",
    category: "Blood Work",
    date: new Date(2024, 2, 15),
    status: "normal",
    summary: "All values within normal range",
    requiresReview: false,
  },
  {
    id: "2",
    name: "Hemoglobin A1c",
    category: "Diabetes",
    date: new Date(2024, 2, 15),
    status: "high",
    summary: "Slightly elevated, follow-up recommended",
    requiresReview: true,
  },
  {
    id: "3",
    name: "Lipid Panel",
    category: "Cardiovascular",
    date: new Date(2024, 2, 15),
    status: "normal",
    summary: "Cholesterol levels normal",
    requiresReview: false,
  },
  {
    id: "4",
    name: "Thyroid Function",
    category: "Endocrine",
    date: new Date(2024, 2, 14),
    status: "low",
    summary: "TSH levels below range",
    requiresReview: true,
  },
];

const categories = Array.from(new Set(testResults.map(test => test.category)));

const TestResults = () => {
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(categories);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Test Results</h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setExpandedCategories(
              expandedCategories.length === categories.length ? [] : categories
            )}>
              {expandedCategories.length === categories.length ? "Collapse All" : "Expand All"}
            </Button>
            <Button 
              variant="outline"
              className="border-primary/30 hover:border-primary"
              onClick={() => navigate('/patient/1/second-opinion')}
            >
              <Brain className="w-4 h-4 mr-2 text-primary" />
              Research Results
            </Button>
          </div>
        </div>

        <Card className="bg-sky-50 border-sky-200">
          <CardContent className="p-6">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-sky-600 mt-1" />
              <div>
                <h3 className="text-lg font-medium text-sky-900">Results Overview</h3>
                <p className="text-sky-800 mt-1">
                  {testResults.filter(t => t.requiresReview).length} result(s) need your review. 
                  These items are marked for discussion with your healthcare provider.
                  <Button 
                    variant="link" 
                    className="text-primary px-0 py-0 h-auto ml-1"
                    onClick={() => navigate('/patient/1/second-opinion')}
                  >
                    Need help understanding your results?
                  </Button>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            {categories.map(category => (
              <Card key={category}>
                <CardHeader className="p-4">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleCategory(category)}
                  >
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <Button variant="ghost" size="sm">
                      {expandedCategories.includes(category) ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </CardHeader>
                {expandedCategories.includes(category) && (
                  <CardContent className="p-4 pt-0">
                    <div className="space-y-3">
                      {testResults
                        .filter(test => test.category === category)
                        .map(test => (
                          <div
                            key={test.id}
                            onClick={() => navigate(`/patient/1/results`)}
                            className={cn(
                              "p-4 rounded-lg border transition-colors cursor-pointer",
                              "hover:border-primary/50 hover:bg-primary/5",
                              test.requiresReview ? "bg-amber-50/50 border-amber-200" : "bg-white"
                            )}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2">
                                  <h3 className="font-medium">{test.name}</h3>
                                  {test.requiresReview && (
                                    <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                                      Review Recommended
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {test.summary}
                                </p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                  <Calendar className="w-4 h-4" />
                                  {test.date.toLocaleDateString()}
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default TestResults;
