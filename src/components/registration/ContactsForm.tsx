
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export const ContactsForm = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="emergencyName">Emergency Contact Name</Label>
          <Input id="emergencyName" placeholder="Enter emergency contact name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyRelation">Relationship</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select relationship" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="spouse">Spouse</SelectItem>
              <SelectItem value="parent">Parent</SelectItem>
              <SelectItem value="child">Child</SelectItem>
              <SelectItem value="sibling">Sibling</SelectItem>
              <SelectItem value="friend">Friend</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
          <Input id="emergencyPhone" type="tel" placeholder="Enter emergency contact phone" />
        </div>
      </div>
    </div>
  );
};
