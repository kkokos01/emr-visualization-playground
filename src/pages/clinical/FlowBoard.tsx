
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Activity,
  Clock,
  UserCheck,
  Syringe,
  Stethoscope,
  CircleDot,
  Search,
  RefreshCw
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

type PatientStatus = 
  | "scheduled"
  | "checked_in"
  | "in_exam"
  | "ready_for_injection"
  | "post_injection"
  | "ready_for_discharge"
  | "completed";

interface FlowPatient {
  id: string;
  name: string;
  appointmentTime: string;
  provider: string;
  room?: string;
  status: PatientStatus;
  waitTime: string;
  notes?: string;
}

const getStatusBadge = (status: PatientStatus) => {
  const statusConfig = {
    scheduled: { color: "bg-slate-100 text-slate-800", icon: Clock },
    checked_in: { color: "bg-blue-100 text-blue-800", icon: UserCheck },
    in_exam: { color: "bg-purple-100 text-purple-800", icon: Stethoscope },
    ready_for_injection: { color: "bg-amber-100 text-amber-800", icon: Syringe },
    post_injection: { color: "bg-green-100 text-green-800", icon: CircleDot },
    ready_for_discharge: { color: "bg-teal-100 text-teal-800", icon: Activity },
    completed: { color: "bg-gray-100 text-gray-800", icon: UserCheck }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Badge 
      variant="secondary" 
      className={`${config.color} gap-1 font-medium`}
    >
      <Icon className="w-3 h-3" />
      {status.split("_").map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(" ")}
    </Badge>
  );
};

export default function FlowBoard() {
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - would be replaced with real data from backend
  const patients: FlowPatient[] = [
    {
      id: "1",
      name: "John Smith",
      appointmentTime: "09:00 AM",
      provider: "Dr. Thompson",
      room: "Room 1",
      status: "in_exam",
      waitTime: "10m",
      notes: "Follow-up required"
    },
    {
      id: "2",
      name: "Sarah Johnson",
      appointmentTime: "09:15 AM",
      provider: "Dr. Wilson",
      room: "Room 2",
      status: "ready_for_injection",
      waitTime: "5m"
    },
    {
      id: "3",
      name: "Michael Brown",
      appointmentTime: "09:30 AM",
      provider: "Dr. Thompson",
      status: "checked_in",
      waitTime: "0m"
    }
  ];

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    patient.provider.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold">Flow Board</h1>
          <p className="text-muted-foreground">
            Track patient status and room assignments
          </p>
        </div>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search patients or providers..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Patient</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Room</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Wait Time</TableHead>
                <TableHead>Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPatients.map((patient) => (
                <TableRow key={patient.id}>
                  <TableCell className="font-medium">
                    {patient.appointmentTime}
                  </TableCell>
                  <TableCell>{patient.name}</TableCell>
                  <TableCell>{patient.provider}</TableCell>
                  <TableCell>{patient.room || "-"}</TableCell>
                  <TableCell>
                    {getStatusBadge(patient.status)}
                  </TableCell>
                  <TableCell>{patient.waitTime}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {patient.notes || "-"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
