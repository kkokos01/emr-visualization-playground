
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EditableItem, commonMedications } from "../../types/patient-context";
import { Edit2, Plus } from "lucide-react";

interface MedicationsEditProps {
  items: EditableItem[];
  mode: "physician" | "patient";
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onToggleItem: (itemId: string) => void;
  onAddItem: (item: EditableItem) => void;
  onEditItem: (item: EditableItem) => void;
}

export const MedicationsEdit = ({
  items,
  mode,
  searchTerm,
  onSearchChange,
  onToggleItem,
  onAddItem,
  onEditItem,
}: MedicationsEditProps) => {
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search medications..."
          className="w-full px-3 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="mb-6">
        <h4 className="text-sm font-medium mb-2">Common Medications</h4>
        <div className="grid grid-cols-2 gap-2">
          {commonMedications
            .filter(med => !items.some(item => item.name === med.name))
            .map((med) => (
              <Button
                key={med.id}
                variant="outline"
                className="justify-start"
                onClick={() => onAddItem(med)}
              >
                <Plus className="w-4 h-4 mr-2" />
                {med.name}
                {med.commonName && mode === "patient" && (
                  <span className="text-muted-foreground ml-1">
                    ("{med.commonName}")
                  </span>
                )}
              </Button>
            ))}
        </div>
      </div>
      <div className="space-y-4">
        <h4 className="text-sm font-medium mb-2">Current Medications</h4>
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between space-x-4 p-2 border rounded-md">
            <div className="flex items-center space-x-2">
              <Checkbox
                id={`medication-${item.id}`}
                checked={item.included}
                onCheckedChange={() => onToggleItem(item.id)}
              />
              <label
                htmlFor={`medication-${item.id}`}
                className="text-sm font-medium leading-none"
              >
                {item.name}
                {item.commonName && mode === "patient" && (
                  <span className="text-muted-foreground ml-1">("{item.commonName}")</span>
                )}
              </label>
            </div>
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onEditItem(item)}
            >
              <Edit2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </>
  );
};
