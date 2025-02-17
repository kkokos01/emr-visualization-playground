
import { MessageSquare, User } from "lucide-react";
import { PatientSearch } from "../shared/PatientSearch";

export const TopNav = () => {
  return (
    <div className="border-b bg-white">
      <div className="flex h-16 items-center px-4 gap-4">
        <PatientSearch />
        <div className="ml-auto flex items-center gap-4">
          <button className="p-2 hover:bg-muted rounded-full relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          <button className="p-2 hover:bg-muted rounded-full">
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
