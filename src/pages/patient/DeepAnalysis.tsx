
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeepResearchPanel } from "@/components/research/DeepResearchPanel";
import { AlertTriangle, ArrowLeft, BookOpen, Brain, Search } from "lucide-react";
import { useParams, Link } from "react-router-dom";

export default function DeepAnalysis() {
  const { id } = useParams();
  const [showResearchPanel, setShowResearchPanel] = useState(false);

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <Link
        to={`/patient/${id}/analysis`}
        className="inline-flex items-center text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Health Analysis
      </Link>

      {/* Disclaimer Card */}
      <Card className="border-l-4 border-l-amber-500">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-1" />
            <div>
              <h3 className="font-medium text-amber-800 mb-2">Important Notice About This Research Tool</h3>
              <p className="text-muted-foreground text-sm">
                This tool is designed to help you explore and understand complex medical conditions, but it is not a substitute for professional medical advice. Always consult with healthcare providers about your specific situation. The information provided should be used to facilitate discussions with medical professionals, not to self-diagnose or self-treat.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Deep Health Analysis Research</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-slate-600">
            This research tool helps you explore complex health situations by gathering comprehensive information from reliable medical sources. Use this to:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <Brain className="w-5 h-5 text-blue-600 mb-2" />
              <h3 className="font-medium mb-2">Understand Complex Conditions</h3>
              <p className="text-sm text-slate-600">Explore detailed medical information from trusted sources in easy-to-understand language.</p>
            </Card>

            <Card className="p-4 bg-green-50 border-green-200">
              <Search className="w-5 h-5 text-green-600 mb-2" />
              <h3 className="font-medium mb-2">Find Treatment Options</h3>
              <p className="text-sm text-slate-600">Discover potential treatment approaches and specialists who focus on your condition.</p>
            </Card>

            <Card className="p-4 bg-purple-50 border-purple-200">
              <BookOpen className="w-5 h-5 text-purple-600 mb-2" />
              <h3 className="font-medium mb-2">Prepare for Appointments</h3>
              <p className="text-sm text-slate-600">Get organized with questions to ask and information to share with your healthcare team.</p>
            </Card>
          </div>

          <div className="mt-6">
            <Button 
              size="lg"
              className="w-full md:w-auto"
              onClick={() => setShowResearchPanel(true)}
            >
              <Search className="w-4 h-4 mr-2" />
              Begin Deep Research Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      <DeepResearchPanel
        isOpen={showResearchPanel}
        onClose={() => setShowResearchPanel(false)}
        patientId={id}
      />
    </div>
  );
}
