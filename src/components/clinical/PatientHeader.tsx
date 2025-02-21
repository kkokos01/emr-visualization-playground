
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, History, Link2, User } from "lucide-react";
import { Link } from "react-router-dom";

interface PatientHeaderProps {
  id: string | undefined;
  patientName: string;
  patientDetails: string;
  currentDate: string;
}

export const PatientHeader = ({ id, patientName, patientDetails, currentDate }: PatientHeaderProps) => {
  return (
    <Card className="rounded-none border-x-0 border-t-0">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            to={`/patient/${id}`}
            className="flex items-center text-muted-foreground hover:text-primary"
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Back to Summary</span>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-muted rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h2 className="font-semibold">{patientName}</h2>
              <p className="text-sm text-muted-foreground">{patientDetails}</p>
            </div>
          </div>
          <span className="px-2 py-1 bg-muted rounded text-sm">
            Office Visit - {currentDate}
          </span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <History className="h-4 w-4 mr-2" />
            Past Notes
          </Button>
          <Button variant="outline" size="sm">
            <Link2 className="h-4 w-4 mr-2" />
            Link Template
          </Button>
        </div>
      </div>
    </Card>
  );
};
