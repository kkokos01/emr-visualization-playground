
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
  Database, Download, Upload, 
  Calendar, CheckCircle, Clock 
} from "lucide-react";

export default function BackupRestore() {
  const backups = [
    {
      id: "1",
      type: "Automated",
      date: "2024-02-20 00:00:00",
      size: "2.5 GB",
      status: "completed"
    },
    {
      id: "2",
      type: "Manual",
      date: "2024-02-19 15:30:00",
      size: "2.5 GB",
      status: "completed"
    },
    {
      id: "3",
      type: "Automated",
      date: "2024-02-19 00:00:00",
      size: "2.4 GB",
      status: "completed"
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Backup & Restore</h1>
        <p className="text-muted-foreground">
          Manage system backups and data recovery
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Create Backup</h2>
          <p className="text-muted-foreground mb-4">
            Create a new backup of your system data
          </p>
          <Button className="gap-2">
            <Database className="w-4 h-4" />
            Create Manual Backup
          </Button>
        </Card>

        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Restore System</h2>
          <p className="text-muted-foreground mb-4">
            Restore system from a previous backup
          </p>
          <div className="space-x-4">
            <Button variant="outline" className="gap-2">
              <Upload className="w-4 h-4" />
              Upload Backup
            </Button>
            <Button variant="outline" className="gap-2">
              <Calendar className="w-4 h-4" />
              Select Date
            </Button>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Backup History</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date & Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {backups.map((backup) => (
              <TableRow key={backup.id}>
                <TableCell className="font-medium">
                  {backup.date}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="gap-1">
                    <Clock className="w-3 h-3" />
                    {backup.type}
                  </Badge>
                </TableCell>
                <TableCell>{backup.size}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-100 text-green-800 gap-1">
                    <CheckCircle className="w-3 h-3" />
                    {backup.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
