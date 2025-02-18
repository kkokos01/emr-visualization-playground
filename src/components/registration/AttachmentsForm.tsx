
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";

export const AttachmentsForm = () => {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6">
        <div className="space-y-4">
          <div>
            <Label>ID Document</Label>
            <div className="mt-2">
              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload ID Document
              </Button>
            </div>
          </div>

          <div>
            <Label>Insurance Card (Front)</Label>
            <div className="mt-2">
              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Insurance Card Front
              </Button>
            </div>
          </div>

          <div>
            <Label>Insurance Card (Back)</Label>
            <div className="mt-2">
              <Button variant="outline" className="w-full">
                <Upload className="w-4 h-4 mr-2" />
                Upload Insurance Card Back
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
