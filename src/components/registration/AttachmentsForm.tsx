
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export const AttachmentsForm = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <Card className="p-6 bg-[#F2FCE2] border-0 hover:shadow-md transition-all">
        <h3 className="font-semibold mb-4">ID Document</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload a valid government-issued photo ID
        </p>
        <Button variant="outline" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload ID
        </Button>
      </Card>

      <Card className="p-6 bg-[#FEC6A1] border-0 hover:shadow-md transition-all">
        <h3 className="font-semibold mb-4">Insurance Card (Front)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload the front of your insurance card
        </p>
        <Button variant="outline" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload Front
        </Button>
      </Card>

      <Card className="p-6 bg-[#D3E4FD] border-0 hover:shadow-md transition-all">
        <h3 className="font-semibold mb-4">Insurance Card (Back)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Upload the back of your insurance card
        </p>
        <Button variant="outline" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload Back
        </Button>
      </Card>
    </div>
  );
};
