import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Activity, AlertCircle, Brain, Calendar, ChartBar, 
  ClipboardList, FileText, Heart, LightbulbIcon, 
  Pill, Plus, Stethoscope, TestTube, TrendingDown,
  TrendingUp, User 
} from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const PatientChartAlt = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-alt-white border-alt-primary/10" data-clickable="true">
        <div className="flex items-start justify-between">
          <div className="flex gap-4">
            <div className="h-16 w-16 bg-alt-sky rounded-full flex items-center justify-center">
              <User className="h-8 w-8 text-alt-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-alt-slate">John Doe</h1>
              <div className="flex gap-4 text-sm text-alt-slate/70">
                <span>Male, 45 years</span>
                <span>DOB: 1978-05-15</span>
                <span>MRN: 123456</span>
              </div>
              <div className="flex gap-2 mt-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-alt-error/10 text-alt-error">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Allergy: Penicillin
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-alt-warning/10 text-alt-warning">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  Diabetic
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link to={`/patient/${id}/chart`}>
              <Button className="bg-alt-primary hover:bg-alt-primary/90 text-alt-white">
                <FileText className="h-4 w-4 mr-2" />
                New Note
              </Button>
            </Link>
            <Button variant="outline" className="border-alt-primary/20 hover:bg-alt-primary/5">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Visit
            </Button>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-alt-sky border-alt-primary/10">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-alt-primary">
          <Brain className="h-5 w-5" />
          AI Clinical Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 text-alt-slate">
            <LightbulbIcon className="h-4 w-4 text-alt-accent" />
            <span>Due for annual diabetic eye exam</span>
          </div>
          <div className="flex items-center gap-2 text-alt-slate">
            <LightbulbIcon className="h-4 w-4 text-alt-accent" />
            <span>BP trending higher than usual</span>
          </div>
          <div className="flex items-center gap-2 text-alt-slate">
            <LightbulbIcon className="h-4 w-4 text-alt-accent" />
            <span>Consider HbA1c check (last: 3 months ago)</span>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <Card className="p-6 bg-alt-white border-alt-primary/10" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-alt-slate">
              <Heart className="h-5 w-5 text-alt-secondary" />
              Active Problems
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-alt-sky rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-alt-slate">Type 2 Diabetes</span>
                  <span className="text-sm text-alt-slate/70">Since 2020</span>
                </div>
                <p className="text-sm text-alt-slate/70 mt-1">Last A1c: 7.2 (2 months ago)</p>
              </div>
              <div className="p-3 bg-alt-sky rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-alt-slate">Hypertension</span>
                  <span className="text-sm text-alt-slate/70">Since 2019</span>
                </div>
                <p className="text-sm text-alt-slate/70 mt-1">Target: &lt;140/90</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-alt-white border-alt-primary/10" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-alt-slate">
              <Pill className="h-5 w-5 text-alt-secondary" />
              Active Medications
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-alt-sky rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-alt-slate">Metformin 500mg</span>
                  <span className="text-sm text-alt-slate/70">Twice daily</span>
                </div>
                <p className="text-sm text-alt-slate/70 mt-1">Last refill: Oct 15, 2023</p>
              </div>
              <div className="p-3 bg-alt-sky rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-alt-slate">Lisinopril 10mg</span>
                  <span className="text-sm text-alt-slate/70">Once daily</span>
                </div>
                <p className="text-sm text-alt-slate/70 mt-1">Last refill: Sep 30, 2023</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6 bg-alt-white border-alt-primary/10" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-alt-slate">
              <Activity className="h-5 w-5 text-alt-secondary" />
              Recent Vitals
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-alt-slate/70">Blood Pressure</span>
                <span className="font-medium text-alt-error">142/88 mmHg ↑</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-alt-slate/70">Heart Rate</span>
                <span className="font-medium text-alt-slate">72 bpm</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-alt-slate/70">Temperature</span>
                <span className="font-medium text-alt-slate">98.6°F</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-alt-slate/70">Weight</span>
                <span className="font-medium text-alt-slate">185 lbs</span>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-alt-white border-alt-primary/10" data-clickable="true">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-alt-slate">
              <TestTube className="h-5 w-5 text-alt-secondary" />
              Recent Lab Results
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-alt-sky rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-alt-slate">HbA1c</span>
                  <div className="flex items-center gap-2">
                    <span className="text-alt-error font-medium">7.2%</span>
                    <TrendingUp className="h-4 w-4 text-alt-error" />
                  </div>
                </div>
                <p className="text-sm text-alt-slate/70 mt-1">Target: &lt;6.5% - Oct 15, 2023</p>
              </div>
              <div className="p-3 bg-alt-sky rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-alt-slate">Creatinine</span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-alt-slate">1.1 mg/dL</span>
                    <TrendingDown className="h-4 w-4 text-alt-success" />
                  </div>
                </div>
                <p className="text-sm text-alt-slate/70 mt-1">Within range - Oct 15, 2023</p>
              </div>
              <div className="p-3 bg-alt-sky rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-alt-slate">Lipid Panel</span>
                  <span className="text-alt-warning font-medium">Pending</span>
                </div>
                <p className="text-sm text-alt-slate/70 mt-1">Ordered: Oct 20, 2023</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Card className="p-6 bg-alt-white border-alt-primary/10" data-clickable="true">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-alt-slate">
          <ChartBar className="h-5 w-5 text-alt-secondary" />
          Recent Activity
        </h3>
        <div className="space-y-3">
          <div className="p-3 bg-alt-sky rounded-lg flex items-center gap-4">
            <Calendar className="h-5 w-5 text-alt-secondary" />
            <div>
              <p className="font-medium text-alt-slate">Upcoming Visit: Dr. Thompson</p>
              <p className="text-sm text-alt-slate/70">Nov 15, 2023 at 2:30 PM - Annual Physical</p>
            </div>
          </div>
          <div className="p-3 bg-alt-sky rounded-lg flex items-center gap-4">
            <Stethoscope className="h-5 w-5 text-alt-secondary" />
            <div>
              <p className="font-medium text-alt-slate">Last Visit: Dr. Smith</p>
              <p className="text-sm text-alt-slate/70">Oct 1, 2023 - Diabetes Follow-up</p>
            </div>
          </div>
          <div className="p-3 bg-alt-sky rounded-lg flex items-center gap-4">
            <FileText className="h-5 w-5 text-alt-secondary" />
            <div>
              <p className="font-medium text-alt-slate">Lab Results Available</p>
              <p className="text-sm text-alt-slate/70">Comprehensive Metabolic Panel - Oct 5, 2023</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default PatientChartAlt;
