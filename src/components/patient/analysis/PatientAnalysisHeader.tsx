
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, Printer, Share2, Shield } from "lucide-react";
import { format } from "date-fns";

interface PatientAnalysisHeaderProps {
  patient: {
    name: string;
    mrn: string;
    dateOfAnalysis: string;
    lastUpdated: string;
  };
  onPrint: () => void;
  onExport: () => void;
  onShare: () => void;
}

export const PatientAnalysisHeader = ({ 
  patient,
  onPrint,
  onExport,
  onShare
}: PatientAnalysisHeaderProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
              <Shield className="w-4 h-4" />
              <span>MRN: {patient.mrn}</span>
              <span>•</span>
              <span>Analysis Date: {format(new Date(patient.dateOfAnalysis), "MMMM d, yyyy")}</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Last Updated: {format(new Date(patient.lastUpdated), "h:mm a")}
            </p>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={onPrint}>
              <Printer className="w-4 h-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={onExport}>
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="default" size="sm" onClick={onShare}>
              <Share2 className="w-4 h-4 mr-2" />
              Share with Doctor
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
