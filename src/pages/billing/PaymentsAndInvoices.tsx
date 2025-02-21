
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  CreditCard, Receipt, DollarSign, FileText, Search, 
  Printer, ChevronRight, AlertCircle, Clock, CheckCircle2,
  PhoneCall, Mail, ArrowUpRight, ChevronsUpDown
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface PatientBalance {
  id: string;
  name: string;
  totalBalance: number;
  lastPaymentDate?: Date;
  lastPaymentAmount?: number;
  invoices: Invoice[];
  riskLevel: "low" | "medium" | "high";
  paymentHistory: PaymentHistory;
  collectionStatus: "current" | "overdue" | "collections" | "payment_plan";
  aiInsights?: string[];
  nextSteps?: string[];
}

interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: "outstanding" | "paid" | "partial";
  description: string;
  remainingBalance: number;
  dueDate: Date;
  agingDays: number;
}

interface PaymentHistory {
  totalPaid: number;
  averagePaymentTime: number;
  paymentFrequency: "regular" | "irregular";
  lastThreeMonths: number;
}

const PaymentsAndInvoices = () => {
  const patients: PatientBalance[] = [
    {
      id: "PAT001",
      name: "John Smith",
      totalBalance: 450.00,
      lastPaymentDate: new Date(2024, 1, 15),
      lastPaymentAmount: 200.00,
      riskLevel: "medium",
      collectionStatus: "overdue",
      paymentHistory: {
        totalPaid: 800.00,
        averagePaymentTime: 45,
        paymentFrequency: "irregular",
        lastThreeMonths: 200.00
      },
      aiInsights: [
        "Payment pattern shows increasing delays",
        "High likelihood of responding to payment plan offer",
        "Previous success with email reminders"
      ],
      nextSteps: [
        "Offer 3-month payment plan",
        "Send follow-up email",
        "Schedule courtesy call"
      ],
      invoices: [
        {
          id: "INV001",
          date: new Date(2024, 1, 10),
          amount: 250.00,
          status: "outstanding",
          description: "Office visit + Lab work",
          remainingBalance: 250.00,
          dueDate: new Date(2024, 2, 10),
          agingDays: 32
        },
        {
          id: "INV002",
          date: new Date(2024, 1, 1),
          amount: 200.00,
          status: "outstanding",
          description: "Physical Therapy Session",
          remainingBalance: 200.00,
          dueDate: new Date(2024, 2, 1),
          agingDays: 41
        }
      ]
    },
    {
      id: "PAT002",
      name: "Sarah Johnson",
      totalBalance: 175.50,
      lastPaymentDate: new Date(2024, 1, 14),
      lastPaymentAmount: 125.00,
      riskLevel: "low",
      collectionStatus: "current",
      paymentHistory: {
        totalPaid: 1200.00,
        averagePaymentTime: 15,
        paymentFrequency: "regular",
        lastThreeMonths: 450.00
      },
      aiInsights: [
        "Consistent payment history",
        "Usually pays within 15 days",
        "Prefers electronic statements"
      ],
      nextSteps: [
        "Send regular statement",
        "Offer autopay enrollment"
      ],
      invoices: [
        {
          id: "INV003",
          date: new Date(2024, 1, 14),
          amount: 175.50,
          status: "outstanding",
          description: "Follow-up consultation",
          remainingBalance: 175.50,
          dueDate: new Date(2024, 2, 14),
          agingDays: 28
        }
      ]
    }
  ];

  const getRiskBadge = (risk: PatientBalance["riskLevel"]) => {
    const styles = {
      low: "bg-green-100 text-green-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800"
    };
    return <Badge variant="secondary" className={styles[risk]}>{risk} risk</Badge>;
  };

  const getStatusBadge = (status: PatientBalance["collectionStatus"]) => {
    const styles = {
      current: "bg-green-100 text-green-800",
      overdue: "bg-yellow-100 text-yellow-800",
      collections: "bg-red-100 text-red-800",
      payment_plan: "bg-blue-100 text-blue-800"
    };
    const labels = {
      current: "Current",
      overdue: "Overdue",
      collections: "Collections",
      payment_plan: "Payment Plan"
    };
    return <Badge variant="secondary" className={styles[status]}>{labels[status]}</Badge>;
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Accounts Receivable</h1>
          <p className="text-muted-foreground">Manage patient balances and collections</p>
        </div>
        <div className="flex gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total AR</p>
            <p className="text-2xl font-bold">$12,450.00</p>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>Aging Risk</span>
                <span className="text-yellow-600">Medium</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Collection Rate</p>
            <p className="text-2xl font-bold">87%</p>
            <div className="mt-2">
              <div className="flex justify-between text-sm mb-1">
                <span>30-day Trend</span>
                <span className="text-green-600">+2.5%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Patient Balances
                <div className="relative w-48">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Search patients..." />
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="h-[600px]">
                {patients.map((patient) => (
                  <div
                    key={patient.id}
                    className="flex items-center justify-between p-4 border-b hover:bg-muted cursor-pointer"
                  >
                    <div className="space-y-1">
                      <p className="font-medium">{patient.name}</p>
                      <div className="flex items-center gap-2 text-sm">
                        {getRiskBadge(patient.riskLevel)}
                        {getStatusBadge(patient.collectionStatus)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Last payment: ${patient.lastPaymentAmount?.toFixed(2)} on {patient.lastPaymentDate?.toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <p className="font-medium">${patient.totalBalance.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">
                          {patient.invoices.length} invoice(s)
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>John Smith's Account</CardTitle>
                  <div className="flex gap-2 mt-2">
                    {getRiskBadge("medium")}
                    {getStatusBadge("overdue")}
                    <Badge variant="outline" className="gap-1">
                      <Clock className="w-3 h-3" />
                      45 day avg. payment
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Printer className="w-4 h-4" />
                    Print Statement
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="gap-2">
                        <DollarSign className="w-4 h-4" />
                        Record Payment
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Process Payment</DialogTitle>
                      </DialogHeader>
                      <div className="grid gap-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="text-sm font-medium mb-2 block">Payment Method</label>
                            <div className="flex gap-2">
                              <Button variant="outline" className="flex-1 gap-2">
                                <CreditCard className="w-4 h-4" />
                                Card
                              </Button>
                              <Button variant="outline" className="flex-1 gap-2">
                                <DollarSign className="w-4 h-4" />
                                Cash
                              </Button>
                              <Button variant="outline" className="flex-1 gap-2">
                                <FileText className="w-4 h-4" />
                                Check
                              </Button>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium mb-2 block">Amount</label>
                            <Input type="number" placeholder="0.00" />
                          </div>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium mb-2 block">Reference / Check Number</label>
                          <Input placeholder="Enter reference or check number" />
                        </div>

                        <div>
                          <label className="text-sm font-medium mb-2 block">Notes</label>
                          <Input placeholder="Add payment notes" />
                        </div>

                        <div className="flex justify-end gap-2">
                          <Button variant="outline">Cancel</Button>
                          <Button>Process Payment</Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Collection Insights</h3>
                  <div className="space-y-4">
                    {patients[0].aiInsights?.map((insight, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-blue-500 mt-1" />
                        <p className="text-sm">{insight}</p>
                      </div>
                    ))}
                  </div>
                </Card>
                <Card className="p-4">
                  <h3 className="font-medium mb-4">Recommended Actions</h3>
                  <div className="space-y-4">
                    {patients[0].nextSteps?.map((step, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {index === 0 && <PhoneCall className="w-4 h-4 text-green-500" />}
                          {index === 1 && <Mail className="w-4 h-4 text-blue-500" />}
                          {index === 2 && <Clock className="w-4 h-4 text-yellow-500" />}
                          <p className="text-sm">{step}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Take Action
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>

              <Tabs defaultValue="outstanding">
                <TabsList>
                  <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
                  <TabsTrigger value="paid">Payment History</TabsTrigger>
                </TabsList>
                <TabsContent value="outstanding">
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-4">
                      {patients[0].invoices.map((invoice) => (
                        <Card key={invoice.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{invoice.description}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <p className="text-sm text-muted-foreground">
                                    Invoice date: {invoice.date.toLocaleDateString()}
                                  </p>
                                  <Badge variant="outline" className="gap-1">
                                    <Clock className="w-3 h-3" />
                                    {invoice.agingDays} days
                                  </Badge>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${invoice.amount.toFixed(2)}</p>
                                <p className="text-sm text-muted-foreground">
                                  Balance: ${invoice.remainingBalance.toFixed(2)}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                </TabsContent>
                <TabsContent value="paid">
                  <Card>
                    <CardContent className="p-4">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Total Paid (Last 12 months)</p>
                            <p className="text-2xl font-bold">${patients[0].paymentHistory.totalPaid.toFixed(2)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Average Payment Time</p>
                            <p className="text-2xl font-bold">{patients[0].paymentHistory.averagePaymentTime} days</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-2">Payment Consistency</h4>
                          <Progress 
                            value={patients[0].paymentHistory.paymentFrequency === "regular" ? 90 : 60} 
                            className="h-2" 
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentsAndInvoices;
