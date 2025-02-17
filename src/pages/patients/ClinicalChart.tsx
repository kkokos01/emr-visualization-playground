
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
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
} from "lucide-react";
import { Link, useParams } from "react-router-dom";

const ClinicalChart = () => {
  const { id } = useParams();
  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col">
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
        {/* Patient Data Sidebar */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="col-span-12 lg:hidden mb-4">
              Show Patient Data
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[400px] sm:w-[540px]">
            <div className="h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-4">Patient Data</h3>
              <div className="space-y-4 flex-1 overflow-y-auto">
                {/* Problem List */}
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Problem List</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <CircleDot className="h-3 w-3 text-red-500" />
                      <span>Type 2 Diabetes (since 2020)</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <CircleDot className="h-3 w-3 text-orange-500" />
                      <span>Hypertension (since 2019)</span>
                    </div>
                  </div>
                </Card>
                {/* Recent Labs */}
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Recent Labs</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>HbA1c</span>
                      <span className="text-red-600">7.2%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Creatinine</span>
                      <span>1.1 mg/dL</span>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Left Sidebar - Patient Data (Desktop) */}
        <div className="hidden lg:block col-span-3 h-full overflow-y-auto">
          <div className="space-y-4">
            <Card className="p-4">
              <h4 className="font-medium mb-2">Problem List</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <CircleDot className="h-3 w-3 text-red-500" />
                  <span>Type 2 Diabetes (since 2020)</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CircleDot className="h-3 w-3 text-orange-500" />
                  <span>Hypertension (since 2019)</span>
                </div>
              </div>
            </Card>
            <Card className="p-4">
              <h4 className="font-medium mb-2">Recent Labs</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>HbA1c</span>
                  <span className="text-red-600">7.2%</span>
                </div>
                <div className="flex justify-between">
                  <span>Creatinine</span>
                  <span>1.1 mg/dL</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Main Note Editor */}
        <div className="col-span-12 lg:col-span-6 h-full flex flex-col">
          <div className="space-y-4 flex-1 overflow-y-auto">
            <div className="flex items-center gap-2 mb-4">
              <Input
                placeholder="Note Title"
                className="text-lg font-semibold"
                defaultValue="Office Visit Note"
              />
              <Button variant="outline" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
            </div>

            {/* SOAP Note Sections */}
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Subjective</h3>
              <textarea
                className="w-full h-32 p-2 text-sm border rounded-md"
                placeholder="Enter patient's subjective information..."
              />
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Objective</h3>
              <textarea
                className="w-full h-32 p-2 text-sm border rounded-md"
                placeholder="Enter objective findings..."
              />
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Assessment</h3>
              <textarea
                className="w-full h-32 p-2 text-sm border rounded-md"
                placeholder="Enter assessment..."
              />
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Plan</h3>
              <textarea
                className="w-full h-32 p-2 text-sm border rounded-md"
                placeholder="Enter treatment plan..."
              />
              <div className="mt-4 flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Order
                </Button>
                <Button variant="outline" size="sm">
                  <TestTube className="h-4 w-4 mr-2" />
                  Order Labs
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Sidebar - AI Assistant */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" className="col-span-12 lg:hidden mb-4">
              Show AI Assistant
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[400px] sm:w-[540px]">
            <div className="h-full flex flex-col">
              <h3 className="text-lg font-semibold mb-4">AI Assistant</h3>
              <div className="space-y-4 flex-1 overflow-y-auto">
                <Card className="p-4 bg-blue-50">
                  <div className="flex items-center gap-2 text-blue-700 mb-2">
                    <Brain className="h-5 w-5" />
                    <h4 className="font-medium">AI Generated Draft</h4>
                  </div>
                  <p className="text-sm text-blue-600 mb-4">
                    Based on the current visit data, here's a suggested note:
                  </p>
                  <div className="bg-white p-3 rounded-md text-sm">
                    <p>Patient presents for follow-up of diabetes and hypertension...</p>
                  </div>
                  <Button className="w-full mt-3" variant="outline">
                    <StickyNote className="h-4 w-4 mr-2" />
                    Insert to Note
                  </Button>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">Smart Suggestions</h4>
                  <div className="space-y-2">
                    <div className="text-sm p-2 bg-muted rounded-md">
                      Consider ordering HbA1c test (last result: 3 months ago)
                    </div>
                    <div className="text-sm p-2 bg-muted rounded-md">
                      BP has been trending higher than usual
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Right Sidebar - AI Assistant (Desktop) */}
        <div className="hidden lg:block col-span-3 h-full overflow-y-auto">
          <div className="space-y-4">
            <Card className="p-4 bg-blue-50">
              <div className="flex items-center gap-2 text-blue-700 mb-2">
                <Brain className="h-5 w-5" />
                <h4 className="font-medium">AI Generated Draft</h4>
              </div>
              <p className="text-sm text-blue-600 mb-4">
                Based on the current visit data, here's a suggested note:
              </p>
              <div className="bg-white p-3 rounded-md text-sm">
                <p>Patient presents for follow-up of diabetes and hypertension...</p>
              </div>
              <Button className="w-full mt-3" variant="outline">
                <StickyNote className="h-4 w-4 mr-2" />
                Insert to Note
              </Button>
            </Card>
            <Card className="p-4">
              <h4 className="font-medium mb-2">Smart Suggestions</h4>
              <div className="space-y-2">
                <div className="text-sm p-2 bg-muted rounded-md">
                  Consider ordering HbA1c test (last result: 3 months ago)
                </div>
                <div className="text-sm p-2 bg-muted rounded-md">
                  BP has been trending higher than usual
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer Toolbar */}
      <Card className="rounded-none border-x-0 border-b-0 mt-auto">
        <div className="p-4 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Last auto-saved: 2 mins ago
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <XCircle className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button>
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
