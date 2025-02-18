
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ResearchConfigurationPanel } from "./configuration/ResearchConfigurationPanel";
import { PatientContextPanel } from "./panels/PatientContextPanel";
import { QuickReferencePanel } from "./panels/QuickReferencePanel";
import { cn } from "@/lib/utils";

interface DeepResearchPanelProps {
  isOpen: boolean;
  onClose: () => void;
  patientId?: string;
}

export const DeepResearchPanel = ({ isOpen, onClose, patientId }: DeepResearchPanelProps) => {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-full sm:max-w-[95vw]">
        <SheetHeader>
          <SheetTitle>Deep Research Analysis</SheetTitle>
        </SheetHeader>
        <div className="grid grid-cols-12 gap-4 h-[calc(100vh-8rem)] overflow-hidden">
          <div className="col-span-3 overflow-y-auto border-r">
            <PatientContextPanel patientId={patientId} />
          </div>
          <div className="col-span-6 overflow-y-auto">
            <ResearchConfigurationPanel patientId={patientId} />
          </div>
          <div className="col-span-3 overflow-y-auto border-l">
            <QuickReferencePanel patientId={patientId} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
