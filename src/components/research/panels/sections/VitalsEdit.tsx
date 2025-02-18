
import { Checkbox } from "@/components/ui/checkbox";
import { EditableItem } from "../../types/patient-context";

interface VitalsEditProps {
  items: EditableItem[];
  onToggleItem: (itemId: string) => void;
  onUpdateVital: (itemId: string, newValue: string) => void;
}

export const VitalsEdit = ({
  items,
  onToggleItem,
  onUpdateVital,
}: VitalsEditProps) => {
  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium mb-2">Current Vitals</h4>
      {items.map((item) => (
        <div key={item.id} className="flex items-center space-x-4 p-2 border rounded-md">
          <div className="flex items-center space-x-2 flex-1">
            <Checkbox
              id={`vital-${item.id}`}
              checked={item.included}
              onCheckedChange={() => onToggleItem(item.id)}
            />
            <div className="flex-1">
              <label
                htmlFor={`vital-value-${item.id}`}
                className="text-sm font-medium mb-1 block"
              >
                {item.commonName || item.name.split(":")[0]}
              </label>
              <input
                id={`vital-value-${item.id}`}
                type="text"
                className="w-full px-3 py-2 border rounded-md"
                value={item.name.split(":")[1]?.trim() || ""}
                onChange={(e) => onUpdateVital(item.id, `${item.name.split(":")[0]}: ${e.target.value}`)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
