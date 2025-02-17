import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, AlertCircle, Calendar, ClipboardList, 
  FileText, Heart, Pills, User 
} from "lucide-react";

const PatientChart = () => {
  return (
    <div className="space-y-6">
      <Card className="p-6">
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
                  Allergy: Penicillin
                </span>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                  Diabetic
                </span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button variant="outline" size="sm">
              <FileText className="h-4 w-4 mr-2" />
              New Note
            </Button>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="summary" className="space-y-4">
        <TabsList>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="problems">Problems</TabsTrigger>
          <TabsTrigger value="medications">Medications</TabsTrigger>
          <TabsTrigger value="vitals">Vitals</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Recent Vitals
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Blood Pressure</span>
                  <span className="font-medium">120/80 mmHg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Heart Rate</span>
                  <span className="font-medium">72 bpm</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Temperature</span>
                  <span className="font-medium">98.6°F</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 text-primary" />
                Alerts
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-red-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Due for flu vaccine</span>
                </div>
                <div className="flex items-center gap-2 text-yellow-600">
                  <AlertCircle className="h-4 w-4" />
                  <span>Lab results pending review</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Heart className="h-5 w-5 text-primary" />
                Current Problems
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Type 2 Diabetes</span>
                  <span className="text-sm text-muted-foreground">Diagnosed: 2020</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Hypertension</span>
                  <span className="text-sm text-muted-foreground">Diagnosed: 2019</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Pills className="h-5 w-5 text-primary" />
                Active Medications
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span>Metformin 500mg</span>
                  <span className="text-sm text-muted-foreground">Twice daily</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Lisinopril 10mg</span>
                  <span className="text-sm text-muted-foreground">Once daily</span>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="problems">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Problem List</h3>
                <Button variant="outline" size="sm">
                  <ClipboardList className="h-4 w-4 mr-2" />
                  Add Problem
                </Button>
              </div>
              {/* Problem list content would go here */}
            </div>
          </Card>
        </TabsContent>

        {/* Other tab contents would follow the same pattern */}
      </Tabs>
    </div>
  );
};

export default PatientChart;
