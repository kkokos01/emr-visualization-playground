
import { useState } from "react";
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
import { Key, Plus, Copy, Trash2 } from "lucide-react";

export default function ApiKeys() {
  const [keys] = useState([
    {
      name: "EHR Integration",
      key: "pk_test_123...789",
      created: "2024-02-01",
      lastUsed: "2024-02-20",
      status: "active"
    },
    {
      name: "Lab Results API",
      key: "pk_test_456...012",
      created: "2024-01-15",
      lastUsed: "2024-02-19",
      status: "active"
    }
  ]);

  return (
    <div className="container mx-auto p-6 max-w-7xl space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">API Keys</h1>
          <p className="text-muted-foreground">
            Manage integration keys and access tokens
          </p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" />
          Generate New Key
        </Button>
      </div>

      <Card className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>API Key</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Last Used</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {keys.map((key) => (
              <TableRow key={key.name}>
                <TableCell className="font-medium flex items-center gap-2">
                  <Key className="w-4 h-4 text-yellow-500" />
                  {key.name}
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {key.key}
                </TableCell>
                <TableCell>{key.created}</TableCell>
                <TableCell>{key.lastUsed}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    {key.status}
                  </Badge>
                </TableCell>
                <TableCell className="space-x-2">
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Copy className="w-4 h-4" />
                    Copy
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2 text-destructive">
                    <Trash2 className="w-4 h-4" />
                    Revoke
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
