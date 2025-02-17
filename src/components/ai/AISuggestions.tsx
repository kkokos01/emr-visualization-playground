
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, LightbulbIcon, Plus, TrendingUp } from "lucide-react";

export const AISuggestions = () => {
  return (
    <Card className="container max-w-7xl mx-auto px-4 py-4">
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
        <div className="flex items-center gap-2 text-primary mb-3">
          <LightbulbIcon className="h-4 w-4" />
          <span className="text-sm font-medium">AI Suggestions</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white hover:bg-white/90 text-primary/80"
          >
            🔍 Analyze upcoming appointments
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white hover:bg-white/90 text-primary/80"
          >
            📊 Generate daily summary
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-white hover:bg-white/90 text-primary/80"
          >
            ⚡ Optimize schedule
          </Button>
        </div>
      </div>
    </Card>
  );
};
