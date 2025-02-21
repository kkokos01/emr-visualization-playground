
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Building, MapPin, Phone, Globe, Clock } from "lucide-react";

export default function PracticeSettings() {
  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Practice Settings</h1>
        <p className="text-muted-foreground">Configure your practice information</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
          <TabsTrigger value="hours">Business Hours</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card className="p-6">
            <div className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <Label>Practice Name</Label>
                <Input placeholder="Enter practice name" />
              </div>
              <div className="space-y-2">
                <Label>Phone Number</Label>
                <Input placeholder="Enter phone number" />
              </div>
              <div className="space-y-2">
                <Label>Website</Label>
                <Input placeholder="Enter website URL" />
              </div>
              <div className="space-y-2">
                <Label>Tax ID</Label>
                <Input placeholder="Enter tax ID" />
              </div>
              <Button>Save Changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card className="p-6">
            <div className="space-y-4 max-w-xl">
              <div className="space-y-2">
                <Label>Street Address</Label>
                <Input placeholder="Enter street address" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <Input placeholder="Enter city" />
                </div>
                <div className="space-y-2">
                  <Label>State</Label>
                  <Input placeholder="Enter state" />
                </div>
              </div>
              <Button>Update Location</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
