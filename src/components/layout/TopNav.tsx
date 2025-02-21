
import { MessageSquare, User } from "lucide-react";
import { PatientSearch } from "../shared/PatientSearch";
import { SidebarTrigger } from "@/components/ui/sidebar";

export const TopNav = () => {
  return (
    <div className="fixed top-0 left-0 right-0 border-b bg-white/95 backdrop-blur-md z-50 shadow-sm">
      <div className="flex h-16 items-center px-4 gap-4">
        <SidebarTrigger />
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
