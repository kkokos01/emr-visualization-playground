
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { EditableItem, commonConditions } from "../../types/patient-context";
import { Plus } from "lucide-react";

interface ConditionsEditProps {
  items: EditableItem[];
  mode: "physician" | "patient";
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onToggleItem: (itemId: string) => void;
  onAddItem: (item: EditableItem) => void;
}

export const ConditionsEdit = ({
  items,
  mode,
  searchTerm,
  onSearchChange,
  onToggleItem,
  onAddItem,
}: ConditionsEditProps) => {
  return (
    <>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search conditions..."
          className="w-full px-3 py-2 border rounded-md"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
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
                onClick={() => onAddItem(condition)}
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
      <div className="space-y-4">
        <h4 className="text-sm font-medium mb-2">Current Conditions</h4>
        {items.map((item) => (
          <div key={item.id} className="flex items-center space-x-2">
            <Checkbox
              id={`condition-${item.id}`}
              checked={item.included}
              onCheckedChange={() => onToggleItem(item.id)}
            />
            <label
              htmlFor={`condition-${item.id}`}
              className="text-sm font-medium leading-none"
            >
              {item.name}
              {item.commonName && mode === "patient" && (
                <span className="text-muted-foreground ml-1">("{item.commonName}")</span>
              )}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};
