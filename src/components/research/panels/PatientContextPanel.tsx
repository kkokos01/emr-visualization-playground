
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Pill, AlertCircle, Edit2, ChevronDown, ChevronUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";
import { EditableItem } from "../types/patient-context";
import { EditDialog } from "./EditDialog";

interface PatientContextPanelProps {
  patientId?: string;
  mode?: "physician" | "patient";
}

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

  const addItem = (section: string, item: EditableItem) => {
    switch (section) {
      case "medications":
        setMedications(prev => [...prev, { ...item, included: true }]);
        break;
      case "conditions":
        setConditions(prev => [...prev, { ...item, included: true }]);
        break;
    }
  };

  const updateVital = (itemId: string, newValue: string) => {
    setVitals(prev => prev.map(vital => 
      vital.id === itemId ? { ...vital, name: newValue } : vital
    ));
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

      {editSection && (
        <EditDialog
          section={editSection}
          items={
            editSection === "medications" ? medications :
            editSection === "conditions" ? conditions :
            vitals
          }
          mode={mode}
          onClose={() => setEditSection(null)}
          onToggleItem={toggleItem}
          onAddItem={addItem}
          onUpdateVital={updateVital}
        />
      )}
    </div>
  );
};
