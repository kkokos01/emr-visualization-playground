
import { Card } from "@/components/ui/card";
import { 
  Users, Settings, Shield, Activity, 
  Building, Mail, Key, Database 
} from "lucide-react";
import { Link } from "react-router-dom";

const adminFeatures = [
  {
    title: "User Management",
    description: "Add, edit, and manage system users",
    icon: Users,
    url: "/admin/users",
    color: "text-blue-500"
  },
  {
    title: "Role & Permissions",
    description: "Configure user roles and access levels",
    icon: Shield,
    url: "/admin/roles",
    color: "text-purple-500"
  },
  {
    title: "Practice Settings",
    description: "Configure practice information and preferences",
    icon: Building,
    url: "/admin/settings",
    color: "text-emerald-500"
  },
  {
    title: "System Activity",
    description: "View system logs and user activity",
    icon: Activity,
    url: "/admin/activity",
    color: "text-orange-500"
  },
  {
    title: "Email Templates",
    description: "Customize system email notifications",
    icon: Mail,
    url: "/admin/email-templates",
    color: "text-pink-500"
  },
  {
    title: "API Keys",
    description: "Manage integration keys and tokens",
    icon: Key,
    url: "/admin/api-keys",
    color: "text-yellow-500"
  },
  {
    title: "Backup & Restore",
    description: "Manage system data and backups",
    icon: Database,
    url: "/admin/backup",
    color: "text-cyan-500"
  },
  {
    title: "System Settings",
    description: "Configure global system preferences",
    icon: Settings,
    url: "/admin/system",
    color: "text-red-500"
  }
];

export default function AdminDashboard() {
  return (
    <div className="container mx-auto p-6 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          System administration and configuration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {adminFeatures.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link key={feature.url} to={feature.url}>
              <Card className="p-6 hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className="mb-4">
                  <Icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
