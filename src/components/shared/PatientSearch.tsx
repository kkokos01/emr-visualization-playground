
import { Search } from "lucide-react";

export const PatientSearch = () => {
  return (
    <div className="flex-1 max-w-xl">
      <div className="relative">
        <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search patients..."
          className="w-full pl-8 pr-4 py-2 bg-muted rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
    </div>
  );
};
