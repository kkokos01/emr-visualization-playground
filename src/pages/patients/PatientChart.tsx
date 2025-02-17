import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Activity, AlertCircle, Brain, Calendar, ChartBar, 
  ClipboardList, FileText, Heart, LightbulbIcon, 
  Pill, Plus, Stethoscope, TestTube, TrendingDown,
  TrendingUp, User, Image 
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PatientChart = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Card className="p-6" data-clickable="true">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">John Doe</h1>
              <div className="flex gap-4 text-sm text-muted-foreground">
                <span>Male, 45 years</span>
                <span>DOB: 1978-05-15</span>
                <span>MRN: 123456</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Allergy: Penicillin
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Diabetic
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/patient/${id}/chart`}>
              <Button variant="outline" size="sm">
                <FileText className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </Link>
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Visit
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-primary/5 border-primary/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-primary">
          <Brain className="h-5 w-5" />
          AI Clinical Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-blue-600">
            <LightbulbIcon className="h-4 w-4" />
            <span>Due for annual diabetic eye exam</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <LightbulbIcon className="h-4 w-4" />
            <span>BP trending higher than usual</span>
          </div>
          <div className="flex items-center gap-2 text-blue-600">
            <LightbulbIcon className="h-4 w-4" />
            <span>Consider HbA1c check (last: 3 months ago)</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="p-6" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-primary" />
              Active Problems
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Type 2 Diabetes</span>
                  <span className="text-sm text-primary">Since 2020</span>
                </div>
                <p className="text-sm text-primary/70 mt-1">Last A1c: 7.2 (2 months ago)</p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Hypertension</span>
                  <span className="text-sm text-primary">Since 2019</span>
                </div>
                <p className="text-sm text-primary/70 mt-1">Target: &lt;140/90</p>
              </div>
            </div>
          </Card>

          <Card className="p-6" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Pill className="h-5 w-5 text-primary" />
              Active Medications
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Metformin 500mg</span>
                  <span className="text-sm text-primary">Twice daily</span>
                </div>
                <p className="text-sm text-primary/70 mt-1">Last refill: Oct 15, 2023</p>
              </div>
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-foreground">Lisinopril 10mg</span>
                  <span className="text-sm text-primary">Once daily</span>
                </div>
                <p className="text-sm text-primary/70 mt-1">Last refill: Sep 30, 2023</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-primary" />
              Recent Vitals
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Blood Pressure</span>
                <span className="font-medium text-red-600">142/88 mmHg ↑</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Heart Rate</span>
                <span className="font-medium">72 bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Temperature</span>
                <span className="font-medium">98.6°F</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Weight</span>
                <span className="font-medium">185 lbs</span>
              </div>
            </div>
          </Card>

          <Card className="p-6" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <TestTube className="h-5 w-5 text-primary" />
              Recent Lab Results
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">HbA1c</span>
                  <div className="flex items-center gap-2">
                    <span className="text-red-600 font-medium">7.2%</span>
                    <TrendingUp className="h-4 w-4 text-red-600" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Target: &lt;6.5% - Oct 15, 2023</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Creatinine</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">1.1 mg/dL</span>
                    <TrendingDown className="h-4 w-4 text-green-600" />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Within range - Oct 15, 2023</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Lipid Panel</span>
                  <span className="text-orange-500 font-medium">Pending</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">Ordered: Oct 20, 2023</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6" data-clickable="true">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <ChartBar className="h-5 w-5 text-primary" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-muted rounded-lg flex items-center gap-4">
            <Calendar className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Upcoming Visit: Dr. Thompson</p>
              <p className="text-sm text-muted-foreground">Nov 15, 2023 at 2:30 PM - Annual Physical</p>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg flex items-center gap-4">
            <Stethoscope className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Last Visit: Dr. Smith</p>
              <p className="text-sm text-muted-foreground">Oct 1, 2023 - Diabetes Follow-up</p>
            </div>
          </div>
          <div className="p-3 bg-muted rounded-lg flex items-center gap-4">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <p className="font-medium">Lab Results Available</p>
              <p className="text-sm text-muted-foreground">Comprehensive Metabolic Panel - Oct 5, 2023</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatientChart;
