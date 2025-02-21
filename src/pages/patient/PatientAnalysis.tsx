
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { HealthAnalysisHeader } from "@/components/patient/HealthAnalysisHeader";
import { HealthTrendsSection } from "@/components/patient/HealthTrendsSection";
import { SecondOpinionCTA } from "@/components/patient/SecondOpinionCTA";

export default function PatientAnalysis() {
  const { id } = useParams();

  if (!id) return null;

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <HealthAnalysisHeader />

      <Card className="border-[#D3E4FD]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-slate-800">Recent Health Trends</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <HealthTrendsSection />

          <div className="bg-[#F5F3FF] p-4 rounded-lg border border-[#8B5CF6]/20">
            <p className="text-sm text-slate-600">
              This is a basic overview of your recent health changes. For a more comprehensive understanding of your health patterns and expert insights, consider our Second Opinion analysis.
            </p>
          </div>
        </CardContent>
      </Card>

      <SecondOpinionCTA patientId={id} />
    </div>
  );
}
