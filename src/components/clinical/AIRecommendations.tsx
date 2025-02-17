import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, Brain, Lightbulb, Plus, StickyNote, TrendingUp, Book } from "lucide-react";

interface AIRecommendationsProps {
  planText: string;
}

export const AIRecommendations = ({ planText }: AIRecommendationsProps) => {
  return (
    <div className="space-y-4">
      <Card className="p-4 bg-blue-50">
        <div className="flex items-center gap-2 text-blue-700 mb-2">
          <Brain className="h-5 w-5" />
          <h4 className="font-medium">AI Generated Draft</h4>
        </div>
        <p className="text-sm text-blue-600 mb-4">
          Based on the visit data and patient history:
        </p>
        <div className="bg-white p-3 rounded-md text-sm space-y-2">
          <p><strong>S:</strong> Patient presents for routine follow-up of diabetes and hypertension. Reports good medication compliance. No new symptoms.</p>
          <p><strong>O:</strong> BP 138/82, HR 72, Weight 185 lbs</p>
          <p><strong>A:</strong> 1. Type 2 Diabetes - Fair control
             2. Hypertension - Well controlled</p>
          <p><strong>P:</strong> 1. Continue current medications
             2. Order HbA1c and CMP
             3. Follow up in 3 months</p>
        </div>
        <Button className="w-full mt-3" variant="outline">
          <StickyNote className="h-4 w-4 mr-2" />
          Insert to Note
        </Button>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Lightbulb className="h-5 w-5 text-amber-500" />
          <h4 className="font-medium">Smart Suggestions</h4>
        </div>
        <div className="space-y-2">
          <div className="p-3 bg-muted rounded-md">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">HbA1c Overdue</p>
                <p className="text-xs text-muted-foreground">Last result was 3 months ago. Consider ordering new test.</p>
                <Button size="sm" variant="outline" className="mt-2">
                  <Plus className="h-3 w-3 mr-1" />
                  Add to Orders
                </Button>
              </div>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-md">
            <div className="flex items-start gap-2">
              <TrendingUp className="h-4 w-4 text-orange-500 mt-0.5" />
              <div>
                <p className="text-sm font-medium">BP Trending Up</p>
                <p className="text-xs text-muted-foreground">Last 3 readings show upward trend. Consider adjustment.</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Book className="h-5 w-5 text-indigo-500" />
          <h4 className="font-medium">Clinical Guidelines</h4>
        </div>
        <div className="space-y-2">
          <div className="p-3 border rounded-md">
            <h5 className="text-sm font-medium mb-1">Type 2 Diabetes Management</h5>
            <p className="text-xs text-muted-foreground mb-2">ADA Guidelines 2024</p>
            <Button size="sm" variant="outline" className="w-full">View Guidelines</Button>
          </div>
          <div className="p-3 border rounded-md">
            <h5 className="text-sm font-medium mb-1">Hypertension Treatment</h5>
            <p className="text-xs text-muted-foreground mb-2">JNC 8 Guidelines</p>
            <Button size="sm" variant="outline" className="w-full">View Guidelines</Button>
          </div>
        </div>
      </Card>

      {planText.toLowerCase().includes('metformin') && (
        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-2 mb-2">
            <Lightbulb className="h-5 w-5 text-green-600" />
            <h4 className="font-medium text-green-700">Suggested Order</h4>
          </div>
          <p className="text-sm text-green-600 mb-3">
            Based on your plan, would you like to order:
          </p>
          <div className="bg-white p-3 rounded-md border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Metformin 500mg</p>
                <p className="text-xs text-muted-foreground">Take 1 tablet twice daily</p>
              </div>
              <Button size="sm" variant="outline" className="shrink-0">
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
