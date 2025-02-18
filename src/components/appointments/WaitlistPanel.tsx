
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  Clock, 
  Calendar,
  UserPlus,
  AlertCircle,
  Calendar as CalendarIcon,
  Phone
} from "lucide-react";

interface WaitlistEntry {
  id: string;
  patientName: string;
  requestedDate: Date;
  preferredTimeRange: string;
  contactNumber: string;
  urgency: "low" | "medium" | "high";
  notes?: string;
  dateAdded: Date;
}

export function WaitlistPanel() {
  const [waitlist] = useState<WaitlistEntry[]>([
    {
      id: "1",
      patientName: "Sarah Johnson",
      requestedDate: new Date("2024-03-01"),
      preferredTimeRange: "Morning",
      contactNumber: "(555) 123-4567",
      urgency: "high",
      notes: "Needs follow-up within 2 weeks",
      dateAdded: new Date("2024-02-15")
    },
    {
      id: "2",
      patientName: "Michael Brown",
      requestedDate: new Date("2024-03-05"),
      preferredTimeRange: "Afternoon",
      contactNumber: "(555) 987-6543",
      urgency: "medium",
      dateAdded: new Date("2024-02-16")
    }
  ]);

  const getUrgencyBadge = (urgency: WaitlistEntry["urgency"]) => {
    const styles = {
      low: "bg-blue-100 text-blue-800",
      medium: "bg-yellow-100 text-yellow-800",
      high: "bg-red-100 text-red-800"
    };

    return (
      <Badge variant="secondary" className={styles[urgency]}>
        {urgency.charAt(0).toUpperCase() + urgency.slice(1)} Priority
      </Badge>
    );
  };

  return (
    <Card className="p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Waitlist</h2>
          <p className="text-sm text-muted-foreground">
            Patients waiting for available appointments
          </p>
        </div>
        <Button className="gap-2">
          <UserPlus className="w-4 h-4" />
          Add to Waitlist
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Requested Date</TableHead>
            <TableHead>Preferred Time</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {waitlist.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell className="font-medium">
                {entry.patientName}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-muted-foreground" />
                  {entry.requestedDate.toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  {entry.preferredTimeRange}
                </div>
              </TableCell>
              <TableCell>
                {getUrgencyBadge(entry.urgency)}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  {entry.contactNumber}
                </div>
              </TableCell>
              <TableCell>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="gap-2"
                  >
                    <Calendar className="w-4 h-4" />
                    Schedule
                  </Button>
                  {entry.notes && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      title={entry.notes}
                    >
                      <AlertCircle className="w-4 h-4" />
                      Notes
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}
