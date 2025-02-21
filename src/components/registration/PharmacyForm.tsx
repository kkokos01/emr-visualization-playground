
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const PharmacyForm = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="pharmacyName">Preferred Pharmacy</Label>
          <Input id="pharmacyName" placeholder="Enter pharmacy name" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pharmacyPhone">Pharmacy Phone</Label>
          <Input id="pharmacyPhone" type="tel" placeholder="Enter pharmacy phone" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pharmacyAddress">Pharmacy Address</Label>
          <Input id="pharmacyAddress" placeholder="Enter pharmacy address" />
        </div>
      </div>
    </div>
  );
};
