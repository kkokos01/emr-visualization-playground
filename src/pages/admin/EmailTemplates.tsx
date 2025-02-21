
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
import { Mail, Plus, Edit, Copy } from "lucide-react";

export default function EmailTemplates() {
  const templates = [
    {
      name: "Appointment Reminder",
      subject: "Upcoming Appointment Reminder",
      type: "automated",
      lastModified: "2024-02-15"
    },
    {
      name: "Welcome Email",
      subject: "Welcome to Our Practice",
      type: "onboarding",
      lastModified: "2024-02-10"
    },
    {
      name: "Password Reset",
      subject: "Password Reset Request",
      type: "system",
      lastModified: "2024-02-01"
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Email Templates</h1>
          <p className="text-muted-foreground">
            Manage system email notifications
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          New Template
        </Button>
      </div>

      <Card className="p-4">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Template Name</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Last Modified</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {templates.map((template) => (
                <TableRow key={template.name}>
                  <TableCell className="font-medium flex items-center gap-2">
                    <Mail className="w-4 h-4 text-pink-500" />
                    {template.name}
                  </TableCell>
                  <TableCell>{template.subject}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {template.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {template.lastModified}
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Edit className="w-4 h-4" />
                      Edit
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Copy className="w-4 h-4" />
                      Duplicate
                    </Button>
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
