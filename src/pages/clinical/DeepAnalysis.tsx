
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Brain, Download, Share2, Printer, FileText, ChevronDown, ArrowRight, XCircle, CheckCircle, AlertTriangle } from "lucide-react";
import { useState } from "react";
import { CitationExplorer } from "@/components/clinical/CitationExplorer";

const DeepAnalysis = () => {
  const [activeSection, setActiveSection] = useState("executive-summary");
  const [isCitationExplorerOpen, setIsCitationExplorerOpen] = useState(false);
  const [selectedSource, setSelectedSource] = useState<{
    title: string;
    content: string;
    date: string;
    type: string;
  } | undefined>();

  const handleViewEvidence = (source: typeof selectedSource) => {
    setSelectedSource(source);
    setIsCitationExplorerOpen(true);
  };

  const sections = {
    "executive-summary": {
      title: "Executive Summary",
      content: (
        <section>
          <h2 className="text-xl font-semibold mb-4">Executive Summary</h2>
          <p className="text-muted-foreground mb-4">
            Comprehensive analysis of patient data reveals several key areas requiring immediate attention,
            particularly regarding diabetes management and cardiovascular risk factors. Recent lab results
            and vital signs trends suggest opportunities for treatment optimization.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 mb-2" />
                <h3 className="font-medium mb-1">Diabetes Control</h3>
                <p className="text-sm text-muted-foreground">Suboptimal A1C trending</p>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <XCircle className="w-5 h-5 text-red-500 mb-2" />
                <h3 className="font-medium mb-1">BP Control</h3>
                <p className="text-sm text-muted-foreground">Elevated, requiring adjustment</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <h3 className="font-medium mb-1">Medication Adherence</h3>
                <p className="text-sm text-muted-foreground">Good compliance noted</p>
              </CardContent>
            </Card>
          </div>
        </section>
      ),
    },
    "diabetes-management": {
      title: "Diabetes Management",
      icon: AlertTriangle,
      iconColor: "text-amber-500",
      content: (
        <section>
          <h2 className="text-xl font-semibold mb-4">Diabetes Management</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h3 className="font-medium">Treatment Efficacy Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    HbA1c has shown an upward trend over the past 3 months, rising from 7.2% to 7.8%.
                    This suggests a need for treatment intensification.
                  </p>
                  <Button 
                    variant="ghost" 
                    className="text-sm text-primary p-0 h-auto"
                    onClick={() => handleViewEvidence({
                      title: "HbA1c Lab Results",
                      content: "Patient's HbA1c levels show consistent elevation...",
                      date: "March 1, 2024",
                      type: "Lab Report"
                    })}
                  >
                    View Evidence Chain
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ),
    },
    "cardiovascular-risk": {
      title: "Cardiovascular Risk",
      icon: XCircle,
      iconColor: "text-red-500",
      content: (
        <section>
          <h2 className="text-xl font-semibold mb-4">Cardiovascular Risk</h2>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <h3 className="font-medium">Blood Pressure Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">
                    Blood pressure readings consistently above target range (&gt;140/90) in last 5 visits.
                    Consider medication adjustment based on current regimen efficacy.
                  </p>
                  <Button 
                    variant="ghost" 
                    className="text-sm text-primary p-0 h-auto"
                    onClick={() => handleViewEvidence({
                      title: "Blood Pressure Readings",
                      content: "Longitudinal analysis of blood pressure measurements...",
                      date: "March 10, 2024",
                      type: "Clinical Notes"
                    })}
                  >
                    View Evidence Chain
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ),
    },
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Deep Analysis Report</h1>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <p>John Doe • MRN: 123456</p>
            <span>•</span>
            <p>Generated on March 15, 2024 at 2:30 PM</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Printer className="w-4 h-4 mr-2" />
            Print
          </Button>
          <Button size="sm">
            <FileText className="w-4 h-4 mr-2" />
            Add to Chart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Navigation</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="p-2">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start mb-1"
                    onClick={() => setActiveSection("executive-summary")}
                  >
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Executive Summary
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start mb-1"
                    onClick={() => setActiveSection("key-findings")}
                  >
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Key Findings
                  </Button>
                  <div className="pl-6 space-y-1">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setActiveSection("diabetes-management")}
                    >
                      <AlertTriangle className="w-3 h-3 mr-2 text-amber-500" />
                      Diabetes Management
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setActiveSection("cardiovascular-risk")}
                    >
                      <XCircle className="w-3 h-3 mr-2 text-red-500" />
                      Cardiovascular Risk
                    </Button>
                  </div>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-6">
          <Card>
            <CardContent className="p-6">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                {sections[activeSection as keyof typeof sections]?.content}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Evidence Viewer</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[calc(100vh-16rem)]">
                <div className="p-4">
                  <Tabs defaultValue="sources">
                    <TabsList className="w-full">
                      <TabsTrigger value="sources" className="flex-1">Sources</TabsTrigger>
                      <TabsTrigger value="timeline" className="flex-1">Timeline</TabsTrigger>
                    </TabsList>
                    <TabsContent value="sources">
                      <div className="space-y-4">
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Lab Results</h4>
                            <p className="text-sm text-muted-foreground">
                              HbA1c Test - March 1, 2024
                              <br />
                              Result: 7.8%
                            </p>
                          </CardContent>
                        </Card>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-2">Vital Signs</h4>
                            <p className="text-sm text-muted-foreground">
                              BP Reading - March 10, 2024
                              <br />
                              Result: 142/88 mmHg
                            </p>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                    <TabsContent value="timeline">
                      <div className="space-y-4">
                        <div className="text-sm">
                          <div className="flex gap-2 mb-2">
                            <div className="w-24 text-muted-foreground">Mar 15</div>
                            <div>Deep Analysis Generated</div>
                          </div>
                          <div className="flex gap-2 mb-2">
                            <div className="w-24 text-muted-foreground">Mar 10</div>
                            <div>Office Visit - BP Check</div>
                          </div>
                          <div className="flex gap-2 mb-2">
                            <div className="w-24 text-muted-foreground">Mar 1</div>
                            <div>Lab Results Received</div>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      <CitationExplorer 
        isOpen={isCitationExplorerOpen}
        onClose={() => setIsCitationExplorerOpen(false)}
        sourceDocument={selectedSource}
      />
    </div>
  );
};

export default DeepAnalysis;
