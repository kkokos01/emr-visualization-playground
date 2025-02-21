import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { FileText, Send, CreditCard, AlertCircle, Plus, CheckCircle2, ClipboardList, DollarSign, User, ShieldCheck } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";

const ClaimDetail = () => {
  const { id } = useParams();

  const claimData = {
    patientName: "John Smith",
    dateOfService: new Date(2024, 1, 15),
    provider: "Dr. Thompson",
    amount: 250.00,
    status: "to_bill" as const,
    insuranceInfo: "Blue Cross PPO",
    memberId: "BCB123456789",
    diagnosisCodes: [
      { code: "E11.9", description: "Type 2 diabetes mellitus without complications" },
      { code: "I10", description: "Essential (primary) hypertension" },
    ],
    procedureCodes: [
      { code: "99214", description: "Office visit, established patient (25 minutes)", amount: 150.00 },
      { code: "85027", description: "Complete blood count (CBC)", amount: 100.00 },
    ],
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Claim Detail</h1>
          <p className="text-muted-foreground">Review and submit claim information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <CreditCard className="w-4 h-4" />
            Mark as Bill to Patient
          </Button>
          <Button className="gap-2">
            <Send className="w-4 h-4" />
            Submit Claim
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-8 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Patient & Insurance Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium mb-2">Patient Details</h3>
                  <p className="text-sm">{claimData.patientName}</p>
                  <p className="text-sm text-muted-foreground">DOB: 05/15/1965</p>
                  <p className="text-sm text-muted-foreground">MRN: 123456</p>
                </div>
                <div>
                  <h3 className="font-medium mb-2">Insurance Details</h3>
                  <p className="text-sm">{claimData.insuranceInfo}</p>
                  <p className="text-sm text-muted-foreground">Member ID: {claimData.memberId}</p>
                  <div className="flex items-center gap-2 mt-1 text-sm text-green-600">
                    <ShieldCheck className="w-4 h-4" />
                    Coverage Verified
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="w-5 h-5" />
                Coding & Charges
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="diagnoses">
                <TabsList>
                  <TabsTrigger value="diagnoses">Diagnosis Codes</TabsTrigger>
                  <TabsTrigger value="procedures">Procedure Codes</TabsTrigger>
                </TabsList>
                <TabsContent value="diagnoses">
                  <div className="space-y-4">
                    {claimData.diagnosisCodes.map((code, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{code.code}</p>
                          <p className="text-sm text-muted-foreground">{code.description}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">Add Diagnosis Code</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Diagnosis Code</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Input placeholder="Search ICD-10 codes..." />
                          <ScrollArea className="h-[300px]">
                            {/* Code search results would go here */}
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TabsContent>
                <TabsContent value="procedures">
                  <div className="space-y-4">
                    {claimData.procedureCodes.map((code, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <p className="font-medium">{code.code}</p>
                          <p className="text-sm text-muted-foreground">{code.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${code.amount.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" className="w-full">Add Procedure Code</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add Procedure Code</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <Input placeholder="Search CPT codes..." />
                          <ScrollArea className="h-[300px]">
                            {/* Code search results would go here */}
                          </ScrollArea>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Encounter Documentation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <div className="space-y-4">
                  <h3 className="font-medium">Office Visit Note - {claimData.dateOfService.toLocaleDateString()}</h3>
                  <p className="text-sm">
                    Patient presents for routine follow-up of type 2 diabetes and hypertension. 
                    Blood pressure is well-controlled on current medication regimen. 
                    A1C results reviewed, showing good glycemic control...
                  </p>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-4 space-y-6">
          <Card className="bg-primary/5 border-primary/20">
            <CardHeader>
              <CardTitle className="text-primary flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                AI Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="font-medium text-sm">Potential Issues</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-primary/20">
                    <AlertCircle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Missing Modifier</p>
                      <p className="text-xs text-muted-foreground">
                        Consider adding modifier -25 to CPT 99214 due to additional blood work performed.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-primary/20">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Documentation Support</p>
                      <p className="text-xs text-muted-foreground">
                        Visit documentation adequately supports level 4 E/M code (99214).
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium text-sm">Recommendations</h3>
                <div className="space-y-2">
                  <div className="flex items-start gap-2 p-2 bg-white rounded-lg border border-primary/20">
                    <DollarSign className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Expected Reimbursement</p>
                      <p className="text-xs text-muted-foreground">
                        Based on the payer's fee schedule, expected reimbursement is $185.50.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClaimDetail;
