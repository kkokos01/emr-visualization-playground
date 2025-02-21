
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const InsuranceForm = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="insuranceProvider">Insurance Provider</Label>
          <Input id="insuranceProvider" placeholder="Enter insurance provider" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="policyNumber">Policy Number</Label>
          <Input id="policyNumber" placeholder="Enter policy number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="groupNumber">Group Number</Label>
          <Input id="groupNumber" placeholder="Enter group number" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="policyHolder">Policy Holder</Label>
          <Input id="policyHolder" placeholder="Enter policy holder name" />
        </div>
      </div>
    </div>
  );
};
