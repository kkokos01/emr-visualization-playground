
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
            Based on comprehensive analysis of patient data and current medical literature, this 54-year-old male with poorly controlled Type 2 Diabetes Mellitus (T2DM) and hypertension presents several areas requiring clinical attention. Recent trends suggest a deterioration in glycemic control despite current therapy, with cardiovascular risk factors becoming more prominent.
          </p>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="bg-amber-50 border-amber-200">
              <CardContent className="p-4">
                <AlertTriangle className="w-5 h-5 text-amber-500 mb-2" />
                <h3 className="font-medium mb-1">Diabetes Control</h3>
                <p className="text-sm text-muted-foreground">HbA1c trending upward despite therapy</p>
              </CardContent>
            </Card>
            <Card className="bg-red-50 border-red-200">
              <CardContent className="p-4">
                <XCircle className="w-5 h-5 text-red-500 mb-2" />
                <h3 className="font-medium mb-1">BP Control</h3>
                <p className="text-sm text-muted-foreground">Consistently elevated readings</p>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <CheckCircle className="w-5 h-5 text-green-500 mb-2" />
                <h3 className="font-medium mb-1">Medication Adherence</h3>
                <p className="text-sm text-muted-foreground">Good compliance verified</p>
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
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Diabetes Management</h2>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500" />
                    <h3 className="font-medium">Treatment Efficacy Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Current treatment regimen shows suboptimal glycemic control with HbA1c rising from 7.2% to 7.8% over 3 months{" "}
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "HbA1c Lab Results - Trend Analysis",
                        content: "Mar 1, 2024: 7.8%\nDec 15, 2023: 7.5%\nSep 15, 2023: 7.2%\n\nTrend Analysis: Progressive increase in HbA1c values over 6-month period despite maintained medication adherence...",
                        date: "March 1, 2024",
                        type: "Lab Report Series"
                      })}
                    >
                      [Ref 1]
                    </Button>
                    . Based on the ADA 2024 guidelines{" "}
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "ADA Guidelines 2024 - Glycemic Targets",
                        content: "The American Diabetes Association recommends an HbA1c target of <7% for most nonpregnant adults with diabetes. More stringent targets (6.5%) may be appropriate for some patients, while less stringent targets (<8%) may be appropriate for patients with limited life expectancy or where the harms of treatment outweigh the benefits...",
                        date: "January 2024",
                        type: "Clinical Guidelines"
                      })}
                    >
                      [Ref 2]
                    </Button>
                    , treatment intensification should be considered.
                  </p>
                  <div className="space-y-2 mb-4">
                    <h4 className="text-sm font-medium">Treatment Considerations:</h4>
                    <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-2">
                      <li>
                        Consider adding GLP-1 RA given demonstrated cardiovascular benefits{" "}
                        <Button 
                          variant="ghost" 
                          className="text-primary px-1 h-auto text-sm"
                          onClick={() => handleViewEvidence({
                            title: "PIONEER 6 Trial Results",
                            content: "The cardiovascular outcomes trial for oral semaglutide demonstrated significant reduction in major adverse cardiovascular events (MACE) in patients with type 2 diabetes at high cardiovascular risk...",
                            date: "June 2023",
                            type: "Clinical Trial"
                          })}
                        >
                          [Ref 3]
                        </Button>
                      </li>
                      <li>
                        Weekly administration may improve adherence compared to daily injections{" "}
                        <Button 
                          variant="ghost" 
                          className="text-primary px-1 h-auto text-sm"
                          onClick={() => handleViewEvidence({
                            title: "Medication Adherence Study",
                            content: "Meta-analysis of adherence patterns shows significantly higher adherence rates with once-weekly vs. daily injectable medications (87% vs 74%, p<0.001)...",
                            date: "September 2023",
                            type: "Research Study"
                          })}
                        >
                          [Ref 4]
                        </Button>
                      </li>
                    </ul>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="text-sm text-primary p-0 h-auto"
                    onClick={() => handleViewEvidence({
                      title: "Complete Diabetes Management Analysis",
                      content: "Comprehensive analysis of patient's diabetes management including medication history, adherence patterns, and treatment response...",
                      date: "March 15, 2024",
                      type: "Clinical Analysis"
                    })}
                  >
                    View Complete Evidence Chain
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Risk Stratification</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Patient's current risk profile indicates high cardiovascular risk based on:
              </p>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-2 mb-4">
                <li>Duration of T2DM &gt; 10 years</li>
                <li>Concurrent hypertension</li>
                <li>Age &gt; 50 years</li>
                <li>Male gender</li>
              </ul>
              <Button 
                variant="ghost" 
                className="text-sm text-primary p-0 h-auto"
                onClick={() => handleViewEvidence({
                  title: "Cardiovascular Risk Assessment",
                  content: "ASCVD Risk Score: 15.2%\nRisk Factors Analysis...",
                  date: "March 15, 2024",
                  type: "Risk Assessment"
                })}
              >
                View Risk Assessment Details
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
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
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Cardiovascular Risk Management</h2>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <h3 className="font-medium">Blood Pressure Analysis</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Blood pressure consistently elevated (&gt;140/90) in last 5 visits{" "}
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "Blood Pressure Readings - 6 Month Trend",
                        content: "Mar 10, 2024: 142/88 mmHg\nFeb 10, 2024: 144/92 mmHg\nJan 10, 2024: 146/90 mmHg\nDec 10, 2023: 140/88 mmHg\nNov 10, 2023: 145/92 mmHg",
                        date: "March 10, 2024",
                        type: "Vital Signs Record"
                      })}
                    >
                      [Ref 5]
                    </Button>
                    . Current evidence suggests increased cardiovascular risk in diabetic patients with uncontrolled hypertension{" "}
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "ACC/AHA Hypertension Guidelines",
                        content: "For patients with diabetes and hypertension, blood pressure targets should be <130/80 mmHg...",
                        date: "2023",
                        type: "Clinical Guidelines"
                      })}
                    >
                      [Ref 6]
                    </Button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Treatment Recommendations</h3>
              <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-2 mb-4">
                <li>
                  Consider adding amlodipine 5mg daily{" "}
                  <Button 
                    variant="ghost" 
                    className="text-primary px-1 h-auto text-sm"
                    onClick={() => handleViewEvidence({
                      title: "ACCOMPLISH Trial Results",
                      content: "The ACCOMPLISH trial demonstrated superior outcomes with ACE inhibitor/CCB combination compared to ACE inhibitor/diuretic combination...",
                      date: "Updated 2023",
                      type: "Clinical Trial"
                    })}
                  >
                    [Ref 7]
                  </Button>
                </li>
                <li>
                  Maintain current ACE inhibitor given proven cardiovascular protection in diabetic patients{" "}
                  <Button 
                    variant="ghost" 
                    className="text-primary px-1 h-auto text-sm"
                    onClick={() => handleViewEvidence({
                      title: "HOPE Study Long-term Follow-up",
                      content: "Long-term follow-up of the HOPE study confirms sustained cardiovascular benefit of ACE inhibitors in diabetic patients...",
                      date: "2022",
                      type: "Research Study"
                    })}
                  >
                    [Ref 8]
                  </Button>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>
      ),
    },
    "lifestyle-modifications": {
      title: "Lifestyle Modifications",
      icon: CheckCircle,
      iconColor: "text-green-500",
      content: (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Lifestyle Modifications</h2>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Dietary Recommendations</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Evidence supports Mediterranean diet pattern for cardiovascular risk reduction{" "}
                <Button 
                  variant="ghost" 
                  className="text-primary px-1 h-auto text-sm"
                  onClick={() => handleViewEvidence({
                    title: "PREDIMED Study Results",
                    content: "The PREDIMED study demonstrated significant cardiovascular risk reduction with Mediterranean diet...",
                    date: "2023",
                    type: "Clinical Trial"
                  })}
                >
                  [Ref 9]
                </Button>
              </p>
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
                  >
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Clinical Assessment
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
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full justify-start"
                      onClick={() => setActiveSection("lifestyle-modifications")}
                    >
                      <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                      Lifestyle Modifications
                    </Button>
                  </div>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start mb-1"
                  >
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Treatment Plan
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start mb-1"
                  >
                    <ChevronDown className="w-4 h-4 mr-2" />
                    Follow-up Recommendations
                  </Button>
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
