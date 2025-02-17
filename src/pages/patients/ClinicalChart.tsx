import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertCircle,
  Brain,
  ChevronLeft,
  CircleDot,
  FileText,
  History,
  Link2,
  Mic,
  Plus,
  Save,
  StickyNote,
  TestTube,
  User,
  XCircle,
  Search,
  Pill,
  Lightbulb,
  Book,
  TrendingUp,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";

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
      {/* Header with Patient Context */}
      <Card className="rounded-none border-x-0 border-t-0">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to={`/patient/${id}`}
              className="flex items-center text-muted-foreground hover:text-primary"
            >
              <ChevronLeft className="h-5 w-5" />
              <span>Back to Summary</span>
            </Link>
            <Separator orientation="vertical" className="h-6" />
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
                <User className="h-5 w-5 text-muted-foreground" />
              </div>
              <div>
                <h2 className="font-semibold">John Doe</h2>
                <p className="text-sm text-muted-foreground">
                  Male, 45y (DOB: 05/15/1978) • MRN: 123456
                </p>
              </div>
            </div>
            <span className="px-2 py-1 bg-muted rounded text-sm">
              Office Visit - {currentDate}
            </span>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <History className="h-4 w-4 mr-2" />
              Past Notes
            </Button>
            <Button variant="outline" size="sm">
              <Link2 className="h-4 w-4 mr-2" />
              Link Template
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Content Area */}
      <div className="flex-1 grid grid-cols-12 gap-4 p-4 overflow-hidden">
        {/* Left Sidebar - Patient Data */}
        <div className="hidden lg:block col-span-3 h-full overflow-y-auto">
          <ScrollArea className="h-full">
            <div className="space-y-4 pr-2">
              {/* Problems Section */}
              <Card className="p-4 bg-white shadow-sm border-muted">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Active Problems</h4>
                  <Button variant="ghost" size="sm" className="h-7 text-xs">
                    View All
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CircleDot className="h-3 w-3 text-red-500" />
                    <span className="flex-1">Type 2 Diabetes (since 2020)</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CircleDot className="h-3 w-3 text-orange-500" />
                    <span className="flex-1">Hypertension (since 2019)</span>
                    <Button variant="ghost" size="sm" className="h-6 px-2">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Labs Section */}
              <Card className="p-4 bg-white shadow-sm border-muted">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Recent Labs</h4>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trends
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View All
                    </Button>
                  </div>
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>HbA1c</span>
                      <span className="text-red-600">7.2%</span>
                    </div>
                    <div className="text-xs text-muted-foreground">3 months ago</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>Creatinine</span>
                      <span>1.1 mg/dL</span>
                    </div>
                    <div className="text-xs text-muted-foreground">1 month ago</div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm font-medium">
                      <span>eGFR</span>
                      <span>85 mL/min</span>
                    </div>
                    <div className="text-xs text-muted-foreground">1 month ago</div>
                  </div>
                </div>
              </Card>

              {/* Medications Section */}
              <Card className="p-4 bg-white shadow-sm border-muted">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Current Medications</h4>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      <Plus className="h-3 w-3 mr-1" />
                      New
                    </Button>
                    <Button variant="ghost" size="sm" className="h-7 text-xs">
                      View All
                    </Button>
                  </div>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-muted rounded-md flex items-center justify-between group">
                    <div>
                      <div className="font-medium">Metformin</div>
                      <div className="text-muted-foreground">500mg twice daily</div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-2 opacity-0 group-hover:opacity-100">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <div className="p-2 bg-muted rounded-md flex items-center justify-between group">
                    <div>
                      <div className="font-medium">Lisinopril</div>
                      <div className="text-muted-foreground">10mg daily</div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 px-2 opacity-0 group-hover:opacity-100">
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollArea>
        </div>

        {/* Main Note Editor */}
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

            {/* SOAP Note Sections */}
            <Card className="p-4 bg-white shadow-md border-2 border-primary/20">
              <h3 className="font-semibold mb-2 text-foreground">Subjective</h3>
              <textarea
                className="w-full h-32 p-2 text-sm rounded-md border-2 border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 text-foreground"
                placeholder="Enter patient's subjective information..."
              />
            </Card>

            <Card className="p-4 bg-white shadow-md border-2 border-primary/20">
              <h3 className="font-semibold mb-2 text-foreground">Objective</h3>
              <textarea
                className="w-full h-32 p-2 text-sm rounded-md border-2 border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 text-foreground"
                placeholder="Enter objective findings..."
              />
            </Card>

            <Card className="p-4 bg-white shadow-md border-2 border-primary/20">
              <h3 className="font-semibold mb-2 text-foreground">Assessment</h3>
              <textarea
                className="w-full h-32 p-2 text-sm rounded-md border-2 border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 text-foreground"
                placeholder="Enter assessment..."
              />
            </Card>

            <Card className="p-4 bg-white shadow-md border-2 border-primary/20">
              <h3 className="font-semibold mb-2 text-foreground">Plan</h3>
              <textarea
                className="w-full h-32 p-2 text-sm rounded-md border-2 border-primary/20 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 text-foreground"
                placeholder="Enter treatment plan..."
                value={planText}
                onChange={(e) => setPlanText(e.target.value)}
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
            </Card>
          </div>
        </div>

        {/* Right Sidebar - AI Assistant */}
        <div className="hidden lg:block col-span-3 h-full overflow-y-auto">
          <div className="space-y-4">
            <Card className="p-4 bg-blue-50">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Brain className="h-5 w-5" />
                <h4 className="font-medium">AI Generated Draft</h4>
              </div>
              <p className="text-sm text-blue-600 mb-4">
                Based on the visit data and patient history:
              </p>
              <div className="bg-white p-3 rounded-md text-sm space-y-2">
                <p><strong>S:</strong> Patient presents for routine follow-up of diabetes and hypertension. Reports good medication compliance. No new symptoms.</p>
                <p><strong>O:</strong> BP 138/82, HR 72, Weight 185 lbs</p>
                <p><strong>A:</strong> 1. Type 2 Diabetes - Fair control
                   2. Hypertension - Well controlled</p>
                <p><strong>P:</strong> 1. Continue current medications
                   2. Order HbA1c and CMP
                   3. Follow up in 3 months</p>
              </div>
              <Button className="w-full mt-3" variant="outline">
                <StickyNote className="h-4 w-4 mr-2" />
                Insert to Note
              </Button>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-amber-500" />
                <h4 className="font-medium">Smart Suggestions</h4>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-4 w-4 text-red-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">HbA1c Overdue</p>
                      <p className="text-xs text-muted-foreground">Last result was 3 months ago. Consider ordering new test.</p>
                      <Button size="sm" variant="outline" className="mt-2">
                        <Plus className="h-3 w-3 mr-1" />
                        Add to Orders
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-muted rounded-md">
                  <div className="flex items-start gap-2">
                    <TrendingUp className="h-4 w-4 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">BP Trending Up</p>
                      <p className="text-xs text-muted-foreground">Last 3 readings show upward trend. Consider adjustment.</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-3">
                <Book className="h-5 w-5 text-indigo-500" />
                <h4 className="font-medium">Clinical Guidelines</h4>
              </div>
              <div className="space-y-2">
                <div className="p-3 border rounded-md">
                  <h5 className="text-sm font-medium mb-1">Type 2 Diabetes Management</h5>
                  <p className="text-xs text-muted-foreground mb-2">ADA Guidelines 2024</p>
                  <Button size="sm" variant="outline" className="w-full">View Guidelines</Button>
                </div>
                <div className="p-3 border rounded-md">
                  <h5 className="text-sm font-medium mb-1">Hypertension Treatment</h5>
                  <p className="text-xs text-muted-foreground mb-2">JNC 8 Guidelines</p>
                  <Button size="sm" variant="outline" className="w-full">View Guidelines</Button>
                </div>
              </div>
            </Card>

            {planText.toLowerCase().includes('metformin') && (
              <Card className="p-4 bg-green-50 border-green-200">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-green-600" />
                  <h4 className="font-medium text-green-700">Suggested Order</h4>
                </div>
                <p className="text-sm text-green-600 mb-3">
                  Based on your plan, would you like to order:
                </p>
                <div className="bg-white p-3 rounded-md border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">Metformin 500mg</p>
                      <p className="text-xs text-muted-foreground">Take 1 tablet twice daily</p>
                    </div>
                    <Button size="sm" variant="outline" className="shrink-0">
                      <Plus className="h-3 w-3 mr-1" />
                      Add
                    </Button>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Footer Toolbar */}
      <Card className="rounded-none border-x-0 border-b-0 mt-auto bg-white shadow-md">
        <div className="p-4 flex items-center justify-between">
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
      </Card>
    </div>
  );
};

export default ClinicalChart;
