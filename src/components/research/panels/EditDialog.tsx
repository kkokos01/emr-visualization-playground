
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { EditableItem } from "../types/patient-context";
import { MedicationsEdit } from "./sections/MedicationsEdit";
import { ConditionsEdit } from "./sections/ConditionsEdit";
import { VitalsEdit } from "./sections/VitalsEdit";
import { useState } from "react";

interface EditDialogProps {
  section: string;
  items: EditableItem[];
  mode: "physician" | "patient";
  onClose: () => void;
  onToggleItem: (section: string, itemId: string) => void;
  onAddItem?: (section: string, item: EditableItem) => void;
  onUpdateVital?: (itemId: string, newValue: string) => void;
}

export const EditDialog = ({
  section,
  items,
  mode,
  onClose,
  onToggleItem,
  onAddItem,
  onUpdateVital,
}: EditDialogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [editingItem, setEditingItem] = useState<EditableItem | null>(null);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit {section}</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          {section === "medications" && (
            <MedicationsEdit
              items={items}
              mode={mode}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onToggleItem={(itemId) => onToggleItem(section, itemId)}
              onAddItem={(item) => onAddItem?.(section, item)}
              onEditItem={setEditingItem}
            />
          )}
          {section === "conditions" && (
            <ConditionsEdit
              items={items}
              mode={mode}
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              onToggleItem={(itemId) => onToggleItem(section, itemId)}
              onAddItem={(item) => onAddItem?.(section, item)}
            />
          )}
          {section === "vitals" && (
            <VitalsEdit
              items={items}
              onToggleItem={(itemId) => onToggleItem(section, itemId)}
              onUpdateVital={onUpdateVital!}
            />
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Done</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
