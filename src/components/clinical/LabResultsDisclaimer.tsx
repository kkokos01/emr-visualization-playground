
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export const LabResultsDisclaimer = () => {
  return (
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
  );
};
