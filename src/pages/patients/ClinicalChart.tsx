import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Mic, Plus, Save, TestTube, XCircle, Search, Pill } from "lucide-react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { PatientHeader } from "@/components/clinical/PatientHeader";
import { SOAPSection } from "@/components/clinical/SOAPSection";
import { PatientSummary } from "@/components/clinical/PatientSummary";
import { AIRecommendations } from "@/components/clinical/AIRecommendations";

const ClinicalChart = () => {
  const { id } = useParams();
  const [planText, setPlanText] = useState("");
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-gray-50">
      <PatientHeader 
        id={id}
        patientName="John Doe"
        patientDetails="Male, 45y (DOB: 05/15/1978) • MRN: 123456"
        currentDate={currentDate}
      />

      <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
        <div className="hidden lg:block col-span-3 h-full overflow-y-auto">
          <PatientSummary />
        </div>

        <div className="col-span-12 lg:col-span-6 h-full flex flex-col">
          <div className="space-y-4 flex-1 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Note Title"
                className="text-lg font-semibold bg-white border-2 border-primary/20 focus-visible:border-primary/40"
                defaultValue="Office Visit Note"
              />
              <Button variant="outline" size="icon" className="bg-white hover:bg-primary/5">
                <Mic className="h-4 w-4" />
              </Button>
            </div>

            <SOAPSection
              title="Subjective"
              placeholder="Enter patient's subjective information..."
            />
            <SOAPSection
              title="Objective"
              placeholder="Enter objective findings..."
            />
            <SOAPSection
              title="Assessment"
              placeholder="Enter assessment..."
            />
            <SOAPSection
              title="Plan"
              value={planText}
              onChange={setPlanText}
              placeholder="Enter treatment plan..."
            />

            <div className="mt-4 flex items-center gap-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm" className="bg-secondary hover:bg-secondary/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Order
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add Order</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-muted-foreground" />
                      <Input placeholder="Search medications, labs, or imaging..." />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Common Orders</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm" className="justify-start">
                          <TestTube className="h-4 w-4 mr-2" />
                          Diabetic Panel
                        </Button>
                        <Button variant="outline" size="sm" className="justify-start">
                          <Pill className="h-4 w-4 mr-2" />
                          Metformin
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="secondary" size="sm" className="bg-secondary hover:bg-secondary/90">
                    <TestTube className="h-4 w-4 mr-2" />
                    Order Labs
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Order Labs</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <Input placeholder="Search labs..." />
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium">Common Lab Panels</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <TestTube className="h-4 w-4 mr-2" />
                          Comprehensive Metabolic Panel
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <TestTube className="h-4 w-4 mr-2" />
                          HbA1c
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <TestTube className="h-4 w-4 mr-2" />
                          Lipid Panel
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <div className="hidden lg:block col-span-3 h-full overflow-y-auto">
          <AIRecommendations planText={planText} />
        </div>
      </div>

      <div className="p-4 flex items-center justify-between border-t bg-white shadow-md">
        <div className="text-sm text-muted-foreground">
          Last auto-saved: 2 mins ago
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white hover:bg-destructive/5 hover:text-destructive">
            <XCircle className="h-4 w-4 mr-2" />
            Cancel
          </Button>
          <Button className="bg-primary hover:bg-primary/90">
            <Save className="h-4 w-4 mr-2" />
            Save & Sign Note
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClinicalChart;
