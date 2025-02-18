
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
  Activity, Search, UserCircle, 
  ShieldAlert, Database, Settings 
} from "lucide-react";

export default function SystemActivity() {
  const activities = [
    {
      id: 1,
      user: "Dr. Thompson",
      action: "Patient Record Access",
      type: "security",
      timestamp: "2024-02-20 10:30:45",
      details: "Accessed patient #12345"
    },
    {
      id: 2,
      user: "System",
      action: "Backup Completed",
      type: "system",
      timestamp: "2024-02-20 10:00:00",
      details: "Daily backup successful"
    },
    {
      id: 3,
      user: "Admin",
      action: "User Created",
      type: "user",
      timestamp: "2024-02-20 09:45:12",
      details: "Created new user account"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "security":
        return <ShieldAlert className="w-4 h-4 text-red-500" />;
      case "system":
        return <Settings className="w-4 h-4 text-blue-500" />;
      case "user":
        return <UserCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">System Activity</h1>
        <p className="text-muted-foreground">Monitor system events and user actions</p>
      </div>

      <Card className="p-4">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search activities..." className="pl-9" />
          </div>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell className="font-medium">
                  {activity.timestamp}
                </TableCell>
                <TableCell>{activity.user}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getActivityIcon(activity.type)}
                    {activity.action}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {activity.details}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
