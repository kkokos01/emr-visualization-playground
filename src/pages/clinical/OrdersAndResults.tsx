
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar as CalendarIcon, ClipboardList, Search, TestTube, CheckCircle2, Phone, Filter, AlertCircle } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface Order {
  id: string;
  patientName: string;
  type: "Lab" | "Imaging" | "Procedure";
  status: "pending" | "completed" | "cancelled";
  orderedBy: string;
  orderedDate: Date;
  dueDate?: Date;
  priority: "routine" | "stat" | "urgent";
  description: string;
  results?: string;
  actionRequired?: boolean;
}

const OrdersAndResults = () => {
  const [date, setDate] = useState<Date>();

  const orders: Order[] = [
    {
      id: "ORD001",
      patientName: "John Smith",
      type: "Lab",
      status: "pending",
      orderedBy: "Dr. Thompson",
      orderedDate: new Date(2024, 2, 15),
      dueDate: new Date(2024, 2, 16),
      priority: "routine",
      description: "Complete Blood Count (CBC)",
    },
    {
      id: "ORD002",
      patientName: "Sarah Johnson",
      type: "Imaging",
      status: "completed",
      orderedBy: "Dr. Wilson",
      orderedDate: new Date(2024, 2, 14),
      priority: "stat",
      description: "Chest X-Ray",
      results: "Normal findings, no acute disease",
      actionRequired: true,
    },
    {
      id: "ORD003",
      patientName: "Michael Brown",
      type: "Lab",
      status: "pending",
      orderedBy: "Dr. Thompson",
      orderedDate: new Date(2024, 2, 15),
      dueDate: new Date(2024, 2, 17),
      priority: "urgent",
      description: "Comprehensive Metabolic Panel",
    },
  ];

  const OrderCard = ({ order }: { order: Order }) => (
    <Card className="mb-4">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-medium">{order.patientName}</h3>
              <span className={cn(
                "px-2 py-1 rounded-full text-xs font-medium",
                order.priority === "stat" ? "bg-red-100 text-red-800" :
                order.priority === "urgent" ? "bg-orange-100 text-orange-800" :
                "bg-blue-100 text-blue-800"
              )}>
                {order.priority.toUpperCase()}
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-2">{order.description}</p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span>Ordered by: {order.orderedBy}</span>
              <span>Date: {format(order.orderedDate, "MMM d, yyyy")}</span>
              {order.dueDate && (
                <span>Due: {format(order.dueDate, "MMM d, yyyy")}</span>
              )}
            </div>
          </div>
          <div className="flex items-start gap-2">
            {order.status === "completed" ? (
              <>
                <Button variant="outline" size="sm" className="gap-2">
                  <Phone className="w-4 h-4" />
                  Contact Patient
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <CheckCircle2 className="w-4 h-4 text-success" />
                  View Results
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" size="sm" className="gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  Mark Complete
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Follow Up
                </Button>
              </>
            )}
          </div>
        </div>
        {order.results && (
          <div className="mt-4 p-3 bg-muted rounded-md">
            <p className="text-sm">{order.results}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Orders & Results</h1>
          <p className="text-muted-foreground">Manage and track patient orders and results</p>
        </div>
        <Button className="gap-2">
          <ClipboardList className="w-4 h-4" />
          New Order
        </Button>
      </div>

      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-3 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Search Patient</label>
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input className="pl-8" placeholder="Patient name..." />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : "Pick a date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Status</label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-orange-500" />
                    Pending
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Completed
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    STAT Orders
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">Quick Stats</h3>
                <Filter className="w-4 h-4 text-muted-foreground" />
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Pending Orders</span>
                  <span className="font-medium">12</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Today's Results</span>
                  <span className="font-medium">5</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">STAT Orders</span>
                  <span className="font-medium text-red-600">3</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="col-span-12 lg:col-span-9">
          <Card>
            <CardHeader>
              <Tabs defaultValue="all">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="results">Recent Results</TabsTrigger>
                  </TabsList>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" className="gap-2">
                      <TestTube className="w-4 h-4" />
                      Lab Orders
                    </Button>
                    <Button variant="outline" size="sm" className="gap-2">
                      <ClipboardList className="w-4 h-4" />
                      Other Orders
                    </Button>
                  </div>
                </div>
              </Tabs>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[600px] pr-4">
                {orders.map((order) => (
                  <OrderCard key={order.id} order={order} />
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OrdersAndResults;
