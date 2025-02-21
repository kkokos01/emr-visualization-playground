
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Share2, Printer, Download } from "lucide-react";

export const HealthAnalysisHeader = () => {
  return (
    <Card className="bg-[#F5FAFD] border-[#D3E4FD]">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-3xl font-bold text-[#0A6EBD]">
              Your Health Analysis
            </CardTitle>
            <p className="text-slate-700 mt-3 text-lg">
              Review your health trends and discover opportunities for deeper understanding.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="hover:bg-slate-50">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-slate-50">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" className="hover:bg-slate-50">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};
