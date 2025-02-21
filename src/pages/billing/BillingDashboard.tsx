import { FileText, DollarSign, AlertCircle, CheckCircle, Calendar, Receipt } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface ClaimEntry {
  id: string;
  patient: string;
  dateOfService: Date;
  provider: string;
  amount: number;
  status: "to_bill" | "pending" | "rejected" | "paid";
  insuranceInfo?: string;
  rejectionReason?: string;
}

const BillingDashboard = () => {
  const navigate = useNavigate();
  
  const claims: ClaimEntry[] = [
    {
      id: "CLM001",
      patient: "John Smith",
      dateOfService: new Date(2024, 1, 15),
      provider: "Dr. Thompson",
      amount: 250.00,
      status: "to_bill",
      insuranceInfo: "Blue Cross PPO"
    },
    {
      id: "CLM002",
      patient: "Sarah Johnson",
      dateOfService: new Date(2024, 1, 14),
      provider: "Dr. Wilson",
      amount: 175.00,
      status: "pending",
      insuranceInfo: "Aetna HMO"
    },
    {
      id: "CLM003",
      patient: "Michael Brown",
      dateOfService: new Date(2024, 1, 10),
      provider: "Dr. Thompson",
      amount: 325.00,
      status: "rejected",
      insuranceInfo: "Medicare",
      rejectionReason: "Invalid procedure code"
    },
  ];

  const getStatusIcon = (status: ClaimEntry["status"]) => {
    switch (status) {
      case "to_bill":
        return <FileText className="w-4 h-4 text-blue-500" />;
      case "pending":
        return <Calendar className="w-4 h-4 text-yellow-500" />;
      case "rejected":
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case "paid":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
    }
  };

  const handleClaimClick = (claimId: string) => {
    navigate(`/billing/claim/${claimId}`);
  };

  const ClaimsList = ({ claims, status }: { claims: ClaimEntry[], status: ClaimEntry["status"] }) => (
    <ScrollArea className="h-[600px] w-full rounded-md border">
      <div className="p-4 space-y-4">
        {claims.filter(claim => claim.status === status).map((claim) => (
          <Card 
            key={claim.id} 
            className="p-4 transition-colors hover:bg-muted"
            onClick={() => handleClaimClick(claim.id)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {getStatusIcon(claim.status)}
                <div>
                  <h3 className="font-medium">{claim.patient}</h3>
                  <p className="text-sm text-muted-foreground">
                    {claim.dateOfService.toLocaleDateString()} - {claim.provider}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${claim.amount.toFixed(2)}</p>
                <p className="text-sm text-muted-foreground">{claim.insuranceInfo}</p>
              </div>
            </div>
            {claim.rejectionReason && (
              <p className="mt-2 text-sm text-red-500">{claim.rejectionReason}</p>
            )}
          </Card>
        ))}
      </div>
    </ScrollArea>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Billing Dashboard</h1>
          <p className="text-muted-foreground">Manage claims and patient balances</p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline"
            className="gap-2"
            onClick={() => navigate('/billing/payments')}
          >
            <Receipt className="w-4 h-4" />
            Payments & Invoices
          </Button>
          <div className="flex gap-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
              <p className="text-2xl font-bold">$12,450.00</p>
            </Card>
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Today's Claims</p>
              <p className="text-2xl font-bold">8</p>
            </Card>
          </div>
        </div>
      </div>

      <Tabs defaultValue="to_bill" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="to_bill" className="flex gap-2">
            <FileText className="w-4 h-4" />
            To Be Billed
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex gap-2">
            <Calendar className="w-4 h-4" />
            Pending Claims
          </TabsTrigger>
          <TabsTrigger value="rejected" className="flex gap-2">
            <AlertCircle className="w-4 h-4" />
            Rejected/Denied
          </TabsTrigger>
          <TabsTrigger value="paid" className="flex gap-2">
            <DollarSign className="w-4 h-4" />
            Patient Balances
          </TabsTrigger>
        </TabsList>
        <TabsContent value="to_bill">
          <ClaimsList claims={claims} status="to_bill" />
        </TabsContent>
        <TabsContent value="pending">
          <ClaimsList claims={claims} status="pending" />
        </TabsContent>
        <TabsContent value="rejected">
          <ClaimsList claims={claims} status="rejected" />
        </TabsContent>
        <TabsContent value="paid">
          <ClaimsList claims={claims} status="paid" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default BillingDashboard;
