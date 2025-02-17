
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, LightbulbIcon, Plus, TrendingUp } from "lucide-react";

export const AISuggestions = () => {
  return (
    <Card className="container max-w-7xl mx-auto px-4 py-4">
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex items-center gap-2 text-primary/70 mb-3">
          <LightbulbIcon className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">AI Suggestions</span>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-muted hover:bg-muted/90 text-muted-foreground"
          >
            🔍 Analyze upcoming appointments
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-muted hover:bg-muted/90 text-muted-foreground"
          >
            📊 Generate daily summary
          </Button>
          <Button 
            variant="secondary" 
            size="sm" 
            className="bg-muted hover:bg-muted/90 text-muted-foreground"
          >
            ⚡ Optimize schedule
          </Button>
        </div>
      </div>
    </Card>
  );
};
