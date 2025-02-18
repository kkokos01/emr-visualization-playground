
import { useState } from "react";
import { PatientAnalysisHeader } from "@/components/patient/analysis/PatientAnalysisHeader";
import { HealthOverviewPanel } from "@/components/patient/analysis/HealthOverviewPanel";
import { AnalysisAccordion } from "@/components/patient/analysis/AnalysisAccordion";
import { RecommendationsPanel } from "@/components/patient/analysis/RecommendationsPanel";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

const PatientAnalysis = () => {
  const [activeSection, setActiveSection] = useState<string>("overview");

  const patientData = {
    name: "John Smith",
    mrn: "123456",
    dateOfAnalysis: "2024-03-15",
    lastUpdated: "2024-03-15T14:30:00",
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <PatientAnalysisHeader 
        patient={patientData}
        onPrint={() => console.log("Printing...")}
        onExport={() => console.log("Exporting...")}
        onShare={() => console.log("Sharing...")}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2 space-y-6">
          <HealthOverviewPanel 
            patientId={patientData.mrn}
            onSectionChange={setActiveSection}
          />
          
          <AnalysisAccordion 
            patientId={patientData.mrn}
            activeSection={activeSection}
          />
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-8">
            <ScrollArea className="h-[calc(100vh-12rem)]">
              <RecommendationsPanel patientId={patientData.mrn} />
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PatientAnalysis;
