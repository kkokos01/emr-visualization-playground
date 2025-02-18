
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CreditCard, Receipt, DollarSign, FileText, Search, Printer, ChevronRight, ChevronsUpDown } from "lucide-react";

interface PatientBalance {
  id: string;
  name: string;
  totalBalance: number;
  lastPaymentDate?: Date;
  invoices: Invoice[];
}

interface Invoice {
  id: string;
  date: Date;
  amount: number;
  status: "outstanding" | "paid" | "partial";
  description: string;
  remainingBalance: number;
}

const PaymentsAndInvoices = () => {
  const patients: PatientBalance[] = [
    {
      id: "PAT001",
      name: "John Smith",
      totalBalance: 450.00,
      lastPaymentDate: new Date(2024, 1, 15),
      invoices: [
        {
          id: "INV001",
          date: new Date(2024, 1, 10),
          amount: 250.00,
          status: "outstanding",
          description: "Office visit + Lab work",
          remainingBalance: 250.00
        },
        {
          id: "INV002",
          date: new Date(2024, 1, 1),
          amount: 200.00,
          status: "outstanding",
          description: "Physical Therapy Session",
          remainingBalance: 200.00
        }
      ]
    },
    {
      id: "PAT002",
      name: "Sarah Johnson",
      totalBalance: 175.50,
      lastPaymentDate: new Date(2024, 1, 14),
      invoices: [
        {
          id: "INV003",
          date: new Date(2024, 1, 14),
          amount: 175.50,
          status: "outstanding",
          description: "Follow-up consultation",
          remainingBalance: 175.50
        }
      ]
    }
  ];

  const PaymentDialog = () => (
    <Dialog>
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
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Payments & Invoices</h1>
          <p className="text-muted-foreground">Manage patient payments and invoices</p>
        </div>
        <div className="flex gap-4">
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Total Outstanding</p>
            <p className="text-2xl font-bold">$12,450.00</p>
          </Card>
          <Card className="p-4">
            <p className="text-sm text-muted-foreground">Today's Payments</p>
            <p className="text-2xl font-bold">$1,250.00</p>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Patient List */}
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
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Last payment: {patient.lastPaymentDate?.toLocaleDateString()}
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

        {/* Invoice Details */}
        <div className="col-span-12 lg:col-span-8">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>John Smith's Invoices</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2">
                    <Printer className="w-4 h-4" />
                    Print Statement
                  </Button>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <DollarSign className="w-4 h-4" />
                      Record Payment
                    </Button>
                  </DialogTrigger>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="outstanding">
                <TabsList>
                  <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
                  <TabsTrigger value="paid">Paid</TabsTrigger>
                </TabsList>
                <TabsContent value="outstanding">
                  <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                      {patients[0].invoices.map((invoice) => (
                        <Card key={invoice.id}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{invoice.description}</p>
                                <p className="text-sm text-muted-foreground">
                                  {invoice.date.toLocaleDateString()}
                                </p>
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
                  <div className="p-4 text-center text-muted-foreground">
                    No paid invoices to display
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      <PaymentDialog />
    </div>
  );
};

export default PaymentsAndInvoices;
