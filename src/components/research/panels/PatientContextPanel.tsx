import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Pill, AlertCircle, Edit2, ChevronDown, ChevronUp, X, Check, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";

interface PatientContextPanelProps {
  patientId?: string;
  mode?: "physician" | "patient";
}

interface EditableItem {
  id: string;
  name: string;
  commonName?: string;
  included: boolean;
}

const commonConditions = [
  { id: "common1", name: "Asthma", included: false },
  { id: "common2", name: "Sleep Apnea", included: false },
  { id: "common3", name: "Gastric Reflux", commonName: "GERD", included: false },
  { id: "common4", name: "Depression", included: false },
  { id: "common5", name: "Anxiety", included: false },
];

export const PatientContextPanel = ({ patientId, mode = "physician" }: PatientContextPanelProps) => {
  const [editSection, setEditSection] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<string[]>(["demographics", "medications", "conditions", "vitals"]);
  
  const [medications, setMedications] = useState<EditableItem[]>([
    { id: "1", name: "Metformin 500mg BID", commonName: "Glucophage", included: true },
    { id: "2", name: "Lisinopril 10mg Daily", commonName: "Prinivil", included: true },
    { id: "3", name: "Atorvastatin 40mg Daily", commonName: "Lipitor", included: true }
  ]);

  const [conditions, setConditions] = useState<EditableItem[]>([
    { id: "1", name: "Type 2 Diabetes", included: true },
    { id: "2", name: "High Blood Pressure", commonName: "Hypertension", included: true },
    { id: "3", name: "High Cholesterol", commonName: "Hyperlipidemia", included: true }
  ]);

  const [vitals, setVitals] = useState<EditableItem[]>([
    { id: "1", name: "BP: 138/82 mmHg", commonName: "Blood Pressure", included: true },
    { id: "2", name: "HR: 72 bpm", commonName: "Heart Rate", included: true },
    { id: "3", name: "Temp: 98.6°F", included: true },
    { id: "4", name: "SpO2: 98%", commonName: "Blood Oxygen", included: true }
  ]);

  const handleEdit = (section: string) => {
    setEditSection(section);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const toggleItem = (section: string, itemId: string) => {
    const updateItems = (items: EditableItem[]) =>
      items.map(item =>
        item.id === itemId ? { ...item, included: !item.included } : item
      );

    switch (section) {
      case "medications":
        setMedications(updateItems(medications));
        break;
      case "conditions":
        setConditions(updateItems(conditions));
        break;
      case "vitals":
        setVitals(updateItems(vitals));
        break;
    }
  };

  const EditDialog = ({ section, items, onClose }: { section: string, items: EditableItem[], onClose: () => void }) => {
    const [searchTerm, setSearchTerm] = useState("");
    
    const addCondition = (condition: EditableItem) => {
      if (section === "conditions") {
        setConditions(prev => [...prev, { ...condition, included: true }]);
      }
    };

    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit {section}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {section === "conditions" && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Search conditions..."
                    className="w-full px-3 py-2 border rounded-md"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="mb-6">
                  <h4 className="text-sm font-medium mb-2">Common Conditions</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {commonConditions
                      .filter(condition => !items.some(item => item.name === condition.name))
                      .map((condition) => (
                        <Button
                          key={condition.id}
                          variant="outline"
                          className="justify-start"
                          onClick={() => addCondition(condition)}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          {condition.name}
                          {condition.commonName && mode === "patient" && (
                            <span className="text-muted-foreground ml-1">
                              ("{condition.commonName}")
                            </span>
                          )}
                        </Button>
                      ))}
                  </div>
                </div>
              </>
            )}
            <div className="space-y-4">
              <h4 className="text-sm font-medium mb-2">
                {section === "conditions" ? "Current Conditions" : "Current Items"}
              </h4>
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${section}-${item.id}`}
                    checked={item.included}
                    onCheckedChange={() => toggleItem(section, item.id)}
                  />
                  <label
                    htmlFor={`${section}-${item.id}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name}
                    {item.commonName && mode === "patient" && (
                      <span className="text-muted-foreground ml-1">("{item.commonName}")</span>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button onClick={onClose}>Done</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  };

  const EditButton = ({ section }: { section: string }) => {
    if (mode === "physician") {
      return (
        <Button variant="ghost" size="sm" onClick={() => handleEdit(section)}>
          <Edit2 className="w-4 h-4" />
        </Button>
      );
    }

    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="sm">
            <Edit2 className="w-4 h-4" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Research Modification</AlertDialogTitle>
            <AlertDialogDescription>
              You are about to modify information for research purposes only. This will not change your actual medical records. These modifications are for exploring "what-if" scenarios and should be discussed with your healthcare provider before making any real changes to your treatment.
              
              Are you sure you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleEdit(section)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  const renderSection = (title: string, items: EditableItem[], section: string) => {
    const isExpanded = expandedSections.includes(section);

    return (
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {section === "medications" && <Pill className="w-4 h-4" />}
            {section === "conditions" && <AlertCircle className="w-4 h-4" />}
            {section === "vitals" && <Activity className="w-4 h-4" />}
            <span className="flex items-center gap-2 cursor-pointer" onClick={() => toggleSection(section)}>
              {title}
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </span>
          </CardTitle>
          <EditButton section={section} />
        </CardHeader>
        {isExpanded && (
          <CardContent>
            <ul className="text-sm space-y-2">
              {items.filter(item => item.included).map((item) => (
                <li key={item.id} className="flex items-center justify-between">
                  <span>
                    {item.name}
                    {item.commonName && mode === "patient" && (
                      <span className="text-muted-foreground ml-1">("{item.commonName}")</span>
                    )}
                  </span>
                  {!item.included && <X className="w-4 h-4 text-destructive" />}
                </li>
              ))}
            </ul>
          </CardContent>
        )}
      </Card>
    );
  };

  return (
    <div className="space-y-4 p-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Demographics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm space-y-2">
            <p>John Doe</p>
            <p className="text-muted-foreground">45 years old • Male</p>
            <p className="text-muted-foreground">MRN: 123456</p>
          </div>
        </CardContent>
      </Card>

      {renderSection("Current Medications", medications, "medications")}
      {renderSection("Active Conditions", conditions, "conditions")}
      {renderSection("Recent Vitals", vitals, "vitals")}

      {editSection === "medications" && (
        <EditDialog 
          section="medications" 
          items={medications} 
          onClose={() => setEditSection(null)} 
        />
      )}
      {editSection === "conditions" && (
        <EditDialog 
          section="conditions" 
          items={conditions} 
          onClose={() => setEditSection(null)} 
        />
      )}
      {editSection === "vitals" && (
        <EditDialog 
          section="vitals" 
          items={vitals} 
          onClose={() => setEditSection(null)} 
        />
      )}
    </div>
  );
};
