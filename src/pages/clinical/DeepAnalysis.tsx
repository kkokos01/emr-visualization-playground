
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
    "clinical-context": {
      title: "Clinical Context",
      icon: FileText,
      iconColor: "text-blue-500",
      content: (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Clinical Context</h2>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Patient Profile</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Background</h4>
                  <p className="text-sm text-muted-foreground">
                    54-year-old male with 10-year history of T2DM, diagnosed with hypertension in 2019. Family history significant for premature CAD (father, MI at 52)
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "Family History Assessment",
                        content: "Detailed family history analysis reveals significant cardiovascular risk factors...",
                        date: "March 1, 2024",
                        type: "Clinical Assessment"
                      })}
                    >
                      [Ref 10]
                    </Button>
                  </p>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Current Medications</h4>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                    <li>Metformin 1000mg BID</li>
                    <li>Lisinopril 20mg daily</li>
                    <li>Atorvastatin 40mg daily</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Recent Clinical Events</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Emergency Department Visit (Jan 2024)</p>
                  <p className="text-sm text-muted-foreground">Presented with elevated BP (162/95)
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "ED Visit Report",
                        content: "Patient presented with symptoms of...",
                        date: "January 15, 2024",
                        type: "Clinical Note"
                      })}
                    >
                      [Ref 11]
                    </Button>
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Cardiology Consultation (Feb 2024)</p>
                  <p className="text-sm text-muted-foreground">Stress test showed moderate ischemic changes
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "Cardiology Consultation",
                        content: "Exercise stress test demonstrates...",
                        date: "February 10, 2024",
                        type: "Specialist Report"
                      })}
                    >
                      [Ref 12]
                    </Button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ),
    },
    "diagnostic-findings": {
      title: "Diagnostic Findings",
      icon: FileText,
      iconColor: "text-purple-500",
      content: (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Diagnostic Findings</h2>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Laboratory Results</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Glycemic Control</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>HbA1c</span>
                      <span className="text-red-500">7.8%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Fasting Glucose</span>
                      <span className="text-red-500">165 mg/dL</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-primary px-0 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "Glycemic Control Analysis",
                        content: "Trending analysis of glycemic markers shows...",
                        date: "March 1, 2024",
                        type: "Lab Analysis"
                      })}
                    >
                      View Trend Analysis →
                    </Button>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium mb-2">Lipid Panel</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Total Cholesterol</span>
                      <span>198 mg/dL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>LDL</span>
                      <span className="text-amber-500">128 mg/dL</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>HDL</span>
                      <span className="text-red-500">38 mg/dL</span>
                    </div>
                    <Button 
                      variant="ghost" 
                      className="text-primary px-0 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "Lipid Panel Analysis",
                        content: "Current lipid profile indicates increased cardiovascular risk...",
                        date: "March 1, 2024",
                        type: "Lab Analysis"
                      })}
                    >
                      View Detailed Analysis →
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Imaging Studies</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Cardiac Stress Test (Feb 2024)</p>
                  <p className="text-sm text-muted-foreground">
                    Exercise stress test demonstrates moderate ischemic changes in the inferolateral leads
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "Stress Test Report",
                        content: "Exercise tolerance test performed using Bruce protocol...",
                        date: "February 10, 2024",
                        type: "Imaging Report"
                      })}
                    >
                      [View Report]
                    </Button>
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Carotid Ultrasound (Jan 2024)</p>
                  <p className="text-sm text-muted-foreground">
                    Mild bilateral carotid stenosis noted
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "Carotid Ultrasound Report",
                        content: "Bilateral carotid ultrasound demonstrates...",
                        date: "January 20, 2024",
                        type: "Imaging Report"
                      })}
                    >
                      [View Report]
                    </Button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ),
    },
    "treatment-plan": {
      title: "Treatment Plan",
      icon: FileText,
      iconColor: "text-green-500",
      content: (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Treatment Plan</h2>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Medication Adjustments</h3>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <h4 className="text-sm font-medium mb-2">Antidiabetic Therapy</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Recommend addition of GLP-1 RA (semaglutide) based on:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1 mb-2">
                    <li>Suboptimal glycemic control</li>
                    <li>Presence of cardiovascular risk factors</li>
                    <li>Evidence of cardiovascular benefit
                      <Button 
                        variant="ghost" 
                        className="text-primary px-1 h-auto text-sm"
                        onClick={() => handleViewEvidence({
                          title: "PIONEER 6 Trial Results",
                          content: "Cardiovascular outcomes with oral semaglutide...",
                          date: "2023",
                          type: "Clinical Trial"
                        })}
                      >
                        [Ref 13]
                      </Button>
                    </li>
                  </ul>
                </div>
                
                <div className="p-3 border rounded-md">
                  <h4 className="text-sm font-medium mb-2">Antihypertensive Therapy</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Add amlodipine 5mg daily based on:
                  </p>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                    <li>Persistent BP elevation despite ACE inhibitor</li>
                    <li>Evidence supporting CCB addition
                      <Button 
                        variant="ghost" 
                        className="text-primary px-1 h-auto text-sm"
                        onClick={() => handleViewEvidence({
                          title: "ACCOMPLISH Trial",
                          content: "Benazepril plus amlodipine versus benazepril plus hydrochlorothiazide...",
                          date: "2023",
                          type: "Clinical Trial"
                        })}
                      >
                        [Ref 14]
                      </Button>
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Monitoring Plan</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Short-term Monitoring</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 mt-2">
                    <li>Weekly BP measurements</li>
                    <li>Monthly fasting glucose monitoring</li>
                    <li>HbA1c in 3 months</li>
                  </ul>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">Follow-up Schedule</p>
                  <ul className="text-sm text-muted-foreground list-disc pl-4 mt-2">
                    <li>PCP follow-up in 2 weeks</li>
                    <li>Cardiology follow-up in 1 month</li>
                    <li>Diabetes education session scheduled</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      ),
    },
    "literature-review": {
      title: "Literature Review",
      icon: FileText,
      iconColor: "text-indigo-500",
      content: (
        <section className="space-y-6">
          <h2 className="text-xl font-semibold">Literature Review</h2>
          
          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Recent Guidelines</h3>
              <div className="space-y-4">
                <div className="p-3 border rounded-md">
                  <h4 className="text-sm font-medium">ADA 2024 Guidelines</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Updated recommendations for cardiovascular risk management in T2DM
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "ADA 2024 Guidelines",
                        content: "Standards of Medical Care in Diabetes—2024...",
                        date: "2024",
                        type: "Clinical Guidelines"
                      })}
                    >
                      [View Guidelines]
                    </Button>
                  </p>
                </div>
                
                <div className="p-3 border rounded-md">
                  <h4 className="text-sm font-medium">ACC/AHA Hypertension Guidelines</h4>
                  <p className="text-sm text-muted-foreground mt-2">
                    Guidelines for management of hypertension in patients with diabetes
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "ACC/AHA Guidelines",
                        content: "Guideline for the Prevention, Detection, Evaluation, and Management of High Blood Pressure...",
                        date: "2023",
                        type: "Clinical Guidelines"
                      })}
                    >
                      [View Guidelines]
                    </Button>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <h3 className="font-medium mb-3">Key Clinical Trials</h3>
              <div className="space-y-3">
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">PIONEER 6 Trial (2019)</p>
                  <p className="text-sm text-muted-foreground">
                    Cardiovascular outcomes with oral semaglutide
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "PIONEER 6 Trial",
                        content: "Cardiovascular outcomes with oral semaglutide in patients with type 2 diabetes...",
                        date: "2019",
                        type: "Clinical Trial"
                      })}
                    >
                      [View Trial]
                    </Button>
                  </p>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <p className="text-sm font-medium">ACCOMPLISH Trial (2008)</p>
                  <p className="text-sm text-muted-foreground">
                    Comparison of combination therapies in hypertension
                    <Button 
                      variant="ghost" 
                      className="text-primary px-1 h-auto text-sm"
                      onClick={() => handleViewEvidence({
                        title: "ACCOMPLISH Trial",
                        content: "Benazepril plus amlodipine or hydrochlorothiazide for hypertension...",
                        date: "2008",
                        type: "Clinical Trial"
                      })}
                    >
                      [View Trial]
                    </Button>
                  </p>
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
                <div className="p-2 space-y-1">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("executive-summary")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Executive Summary
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("clinical-context")}
                  >
                    <FileText className="w-4 h-4 mr-2 text-blue-500" />
                    Clinical Context
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("diagnostic-findings")}
                  >
                    <FileText className="w-4 h-4 mr-2 text-purple-500" />
                    Diagnostic Findings
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
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("treatment-plan")}
                  >
                    <FileText className="w-4 h-4 mr-2 text-green-500" />
                    Treatment Plan
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start"
                    onClick={() => setActiveSection("literature-review")}
                  >
                    <FileText className="w-4 h-4 mr-2 text-indigo-500" />
                    Literature Review
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
