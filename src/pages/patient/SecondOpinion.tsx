import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { DeepResearchPanel } from "@/components/research/DeepResearchPanel";
import { AlertTriangle, ArrowLeft, BookOpen, Brain, Search, Heart, FlaskConical, Pill, Activity, FileText } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export default function SecondOpinion() {
  const { id } = useParams();
  const [showResearchPanel, setShowResearchPanel] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <Link
        to={`/patient/${id}/analysis`}
        className="inline-flex items-center text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Health Analysis
      </Link>

      {/* Overview Header */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Comprehensive Health Assessment</h1>
          <p className="text-slate-600">
            Your personalized health analysis with detailed insights and recommendations.
          </p>
        </div>
        <Card className="border-l-4 border-l-amber-500">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-500 mt-1" />
              <div>
                <h3 className="font-medium text-amber-800 mb-2">Important Notice</h3>
                <p className="text-muted-foreground text-sm">
                  This assessment is based on your health data and medical research. Always consult healthcare professionals for medical decisions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabbed Interface */}
      <Card>
        <CardContent className="p-6">
          <Tabs defaultValue="overview" className="space-y-6" onValueChange={setActiveTab}>
            <TabsList className="w-full justify-start gap-2 bg-transparent p-0">
              <TabsTrigger value="overview" className="data-[state=active]:bg-transparent">
                <FileText className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="vitals" className="data-[state=active]:bg-transparent">
                <Heart className="w-4 h-4 mr-2" />
                Vitals
              </TabsTrigger>
              <TabsTrigger value="labs" className="data-[state=active]:bg-transparent">
                <FlaskConical className="w-4 h-4 mr-2" />
                Lab Results
              </TabsTrigger>
              <TabsTrigger value="medications" className="data-[state=active]:bg-transparent">
                <Pill className="w-4 h-4 mr-2" />
                Medications
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="data-[state=active]:bg-transparent">
                <Activity className="w-4 h-4 mr-2" />
                Lifestyle
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold mb-4">Quick Summary</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 border border-green-100 rounded-lg">
                      <h3 className="font-medium text-green-800 mb-2">Positive Indicators</h3>
                      <ul className="space-y-2 text-green-700">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Blood pressure within normal range
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                          Regular exercise routine maintained
                        </li>
                      </ul>
                    </div>

                    <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                      <h3 className="font-medium text-amber-800 mb-2">Areas for Attention</h3>
                      <ul className="space-y-2 text-amber-700">
                        <li className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                          Vitamin D levels slightly below optimal
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h2 className="text-xl font-semibold mb-4">Recommended Actions</h2>
                  <div className="grid gap-4">
                    <TooltipProvider>
                      <Card className="p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-blue-50 rounded-md">
                            <Brain className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <h3 className="font-medium hover:text-blue-600">Schedule Follow-up</h3>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">Based on your recent lab results</p>
                              </TooltipContent>
                            </Tooltip>
                            <p className="text-sm text-slate-600 mt-1">
                              Discuss vitamin D supplementation with your physician
                            </p>
                          </div>
                        </div>
                      </Card>

                      <Card className="p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-purple-50 rounded-md">
                            <BookOpen className="w-5 h-5 text-purple-500" />
                          </div>
                          <div>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <h3 className="font-medium hover:text-purple-600">Deep Research Available</h3>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p className="text-sm">Access detailed medical research and analysis</p>
                              </TooltipContent>
                            </Tooltip>
                            <p className="text-sm text-slate-600 mt-1">
                              Explore research on optimal vitamin D levels
                            </p>
                          </div>
                        </div>
                      </Card>
                    </TooltipProvider>
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-center border-t pt-6">
                <Button 
                  variant="outline"
                  onClick={() => setShowResearchPanel(true)}
                >
                  <Search className="w-4 h-4 mr-2" />
                  View Detailed Research
                </Button>

                <Button>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Professional Report
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              {/* Vitals content will go here */}
              <div className="text-slate-600">Vitals content coming soon...</div>
            </TabsContent>

            <TabsContent value="labs" className="space-y-4">
              {/* Labs content will go here */}
              <div className="text-slate-600">Lab results content coming soon...</div>
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              {/* Medications content will go here */}
              <div className="text-slate-600">Medications content coming soon...</div>
            </TabsContent>

            <TabsContent value="lifestyle" className="space-y-4">
              {/* Lifestyle content will go here */}
              <div className="text-slate-600">Lifestyle content coming soon...</div>
            </TabsContent>
          </Tabs>
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
