
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Brain, Calendar, Search } from "lucide-react";

interface ResearchConfigurationPanelProps {
  patientId?: string;
  mode?: "physician" | "patient";
}

export const ResearchConfigurationPanel = ({ patientId, mode = "physician" }: ResearchConfigurationPanelProps) => {
  return (
    <div className="space-y-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Analysis Configuration</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label>Analysis Scope</Label>
            <RadioGroup defaultValue="comprehensive">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comprehensive" id="comprehensive" />
                <Label htmlFor="comprehensive">Comprehensive Analysis</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="focused" id="focused" />
                <Label htmlFor="focused">Focused on Current Condition</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="specific" id="specific" />
                <Label htmlFor="specific">Specific Time Period</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-4">
            <Label>History Depth</Label>
            <div className="px-2">
              <Slider defaultValue={[5]} max={10} step={1} />
              <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                <span>1 year</span>
                <span>5 years</span>
                <span>10 years</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Priority Areas</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" className="justify-start">
                <Calendar className="w-4 h-4 mr-2" />
                Recent Changes
              </Button>
              <Button variant="outline" className="justify-start">
                <Search className="w-4 h-4 mr-2" />
                Similar Cases
              </Button>
              <Button variant="outline" className="justify-start">
                <Brain className="w-4 h-4 mr-2" />
                Treatment Patterns
              </Button>
            </div>
          </div>

          <Button className="w-full mt-6">
            Start Deep Analysis
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
