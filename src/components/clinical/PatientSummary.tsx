import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CircleDot, Plus, TrendingUp } from "lucide-react";

export const PatientSummary = () => {
  return (
    <ScrollArea className="h-full">
      <div className="space-y-4 pr-2">
        <Card className="p-4 bg-white shadow-sm border-muted">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Active Problems</h4>
            <Button variant="ghost" size="sm" className="h-7 text-xs">
              View All
            </Button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <CircleDot className="h-3 w-3 text-red-500" />
              <span className="flex-1">Type 2 Diabetes (since 2020)</span>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CircleDot className="h-3 w-3 text-orange-500" />
              <span className="flex-1">Hypertension (since 2019)</span>
              <Button variant="ghost" size="sm" className="h-6 px-2">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm border-muted">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Recent Labs</h4>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trends
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                View All
              </Button>
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>HbA1c</span>
                <span className="text-red-600">7.2%</span>
              </div>
              <div className="text-xs text-muted-foreground">3 months ago</div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>Creatinine</span>
                <span>1.1 mg/dL</span>
              </div>
              <div className="text-xs text-muted-foreground">1 month ago</div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium">
                <span>eGFR</span>
                <span>85 mL/min</span>
              </div>
              <div className="text-xs text-muted-foreground">1 month ago</div>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-white shadow-sm border-muted">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-medium">Current Medications</h4>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                <Plus className="h-3 w-3 mr-1" />
                New
              </Button>
              <Button variant="ghost" size="sm" className="h-7 text-xs">
                View All
              </Button>
            </div>
          </div>
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-muted rounded-md flex items-center justify-between group">
              <div>
                <div className="font-medium">Metformin</div>
                <div className="text-muted-foreground">500mg twice daily</div>
              </div>
              <Button variant="ghost" size="sm" className="h-6 px-2 opacity-0 group-hover:opacity-100">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
            <div className="p-2 bg-muted rounded-md flex items-center justify-between group">
              <div>
                <div className="font-medium">Lisinopril</div>
                <div className="text-muted-foreground">10mg daily</div>
              </div>
              <Button variant="ghost" size="sm" className="h-6 px-2 opacity-0 group-hover:opacity-100">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </ScrollArea>
  );
};
