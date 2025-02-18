
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
import { Shield, Plus, Lock } from "lucide-react";

export default function Roles() {
  const roles = [
    {
      name: "Administrator",
      users: 3,
      permissions: ["all"],
      description: "Full system access"
    },
    {
      name: "Physician",
      users: 8,
      permissions: ["clinical", "patients", "orders"],
      description: "Clinical and patient management"
    },
    {
      name: "Nurse",
      users: 12,
      permissions: ["clinical_limited", "patients"],
      description: "Limited clinical access"
    },
    {
      name: "Front Desk",
      users: 5,
      permissions: ["appointments", "billing"],
      description: "Scheduling and billing"
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Roles & Permissions</h1>
          <p className="text-muted-foreground">Manage user roles and access control</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Create Role
        </Button>
      </div>

      <Card className="p-6">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.name}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Shield className="w-4 h-4 text-purple-500" />
                  {role.name}
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{role.users} users</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-1">
                    {role.permissions.map((perm) => (
                      <Badge key={perm} variant="outline" className="gap-1">
                        <Lock className="w-3 h-3" />
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {role.description}
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm">Edit</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
