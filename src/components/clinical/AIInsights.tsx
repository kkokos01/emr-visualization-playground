
import { Brain, LightbulbIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

interface InsightItem {
  message: string;
}

interface AIInsightsProps {
  insights: InsightItem[];
}

export const AIInsights = ({ insights }: AIInsightsProps) => {
  return (
    <Card className="p-6 bg-primary/10 border-primary/20">
      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
        <Brain className="h-5 w-5" />
        AI Clinical Insights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {insights.map((insight, index) => (
          <div key={index} className="flex items-center gap-2 text-primary/90">
            <LightbulbIcon className="h-4 w-4 text-primary" />
            <span>{insight.message}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};
