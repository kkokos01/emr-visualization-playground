import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, ArrowLeft, BookOpen, Brain, Search, Heart, FlaskConical, Pill, Activity, FileText, ChevronDown } from "lucide-react";
import { useParams, Link } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function SecondOpinion() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [showDetailedResearch, setShowDetailedResearch] = useState(false);

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <Link
        to={`/patient/${id}/analysis`}
        className="inline-flex items-center text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Health Analysis
      </Link>

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

              {showDetailedResearch && (
                <div className="mt-6 space-y-6 bg-slate-50 p-6 rounded-lg border">
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-slate-900">Detailed Research Report</h3>
                    
                    <section className="space-y-3">
                      <h4 className="font-medium text-slate-800">Key Findings</h4>
                      <p className="text-slate-700">Based on comprehensive analysis of your medical history, test results, and current health status, we've identified several important patterns and recommendations.</p>
                      
                      <div className="grid gap-4 mt-4">
                        <div className="bg-white p-4 rounded-lg border">
                          <h5 className="font-medium text-slate-800 mb-2">Vitamin D Levels</h5>
                          <p className="text-slate-600 text-sm">Current level: 25 ng/mL (Optimal range: 30-50 ng/mL)</p>
                          <p className="text-slate-600 text-sm mt-2">Research indicates that maintaining optimal vitamin D levels can improve immune function and bone health. Consider discussing supplementation with your healthcare provider.</p>
                        </div>
                        
                        <div className="bg-white p-4 rounded-lg border">
                          <h5 className="font-medium text-slate-800 mb-2">Blood Pressure Trends</h5>
                          <p className="text-slate-600 text-sm">Latest reading: 128/82 mmHg</p>
                          <p className="text-slate-600 text-sm mt-2">Your blood pressure has shown improvement over the past 3 months, likely due to lifestyle modifications. Continuing current management strategies is recommended.</p>
                        </div>
                      </div>
                    </section>

                    <section className="space-y-3 mt-6">
                      <h4 className="font-medium text-slate-800">Research-Backed Recommendations</h4>
                      <ul className="space-y-3">
                        <li className="flex gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <p className="text-slate-700">Consider vitamin D supplementation of 2000-4000 IU daily, with regular monitoring</p>
                        </li>
                        <li className="flex gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <p className="text-slate-700">Maintain current exercise routine of 150 minutes per week</p>
                        </li>
                        <li className="flex gap-2">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                          <p className="text-slate-700">Schedule follow-up blood work in 3 months to reassess vitamin D levels</p>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              )}

              <div className="flex justify-between items-center border-t pt-6">
                <Button 
                  variant="outline"
                  onClick={() => setShowDetailedResearch(!showDetailedResearch)}
                  className="gap-2"
                >
                  <Search className="w-4 h-4" />
                  {showDetailedResearch ? "Hide Detailed Research" : "View Detailed Research"}
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform",
                    showDetailedResearch && "transform rotate-180"
                  )} />
                </Button>

                <Button disabled>
                  <FileText className="w-4 h-4 mr-2" />
                  Generate Professional Report
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="vitals" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <h3 className="font-medium mb-3">Blood Pressure Trends</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Latest Reading</span>
                      <span className="font-medium text-green-600">128/82 mmHg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>3-Month Average</span>
                      <span className="font-medium">130/84 mmHg</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Target Range</span>
                      <span className="text-muted-foreground">120-130/70-80 mmHg</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-3">Heart Rate</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Resting Rate</span>
                      <span className="font-medium">72 bpm</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>During Exercise</span>
                      <span className="font-medium">135-150 bpm</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="labs" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <h3 className="font-medium mb-3">Recent Lab Results</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>Vitamin D</span>
                        <span className="text-amber-600">25 ng/mL</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Reference range: 30-50 ng/mL</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>HbA1c</span>
                        <span className="text-green-600">5.6%</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Reference range: 4.0-5.7%</p>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm font-medium">
                        <span>Cholesterol (Total)</span>
                        <span>195 mg/dL</span>
                      </div>
                      <p className="text-xs text-muted-foreground">Reference range: <200 mg/dL</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-3">Trending Values</h3>
                  <div className="space-y-3">
                    <div className="text-sm">
                      <p className="text-muted-foreground mb-1">Vitamin D Levels (Last 3 Tests)</p>
                      <div className="flex items-center gap-2">
                        <span className="text-amber-600">25 ng/mL</span>
                        <span className="text-muted-foreground">→</span>
                        <span>28 ng/mL</span>
                        <span className="text-muted-foreground">→</span>
                        <span>27 ng/mL</span>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="medications" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <h3 className="font-medium mb-3">Current Medications</h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="font-medium text-sm">Metformin</div>
                      <div className="text-sm text-muted-foreground">500mg twice daily</div>
                      <div className="text-xs text-muted-foreground mt-1">Last renewed: 1 month ago</div>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-md">
                      <div className="font-medium text-sm">Lisinopril</div>
                      <div className="text-sm text-muted-foreground">10mg daily</div>
                      <div className="text-xs text-muted-foreground mt-1">Last renewed: 2 months ago</div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-3">Medication Changes</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Metformin</span>
                      <span className="text-blue-600">Dose increased</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Changed from 250mg to 500mg twice daily (2 months ago)</p>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="lifestyle" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="p-4">
                  <h3 className="font-medium mb-3">Physical Activity</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Weekly Exercise</span>
                      <span className="font-medium text-green-600">150 minutes</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Activity Type</span>
                      <span>Walking, Swimming</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Steps per Day</span>
                      <span>8,500 (avg)</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-4">
                  <h3 className="font-medium mb-3">Sleep & Stress</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Average Sleep</span>
                      <span>7.2 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Sleep Quality</span>
                      <span className="text-amber-600">Moderate</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Stress Level</span>
                      <span>Low-Medium</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
