
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ChartBar,
  ClipboardList,
  MessageSquare,
  Stethoscope,
  Users,
} from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<string | null>(null);

  const metrics = [
    { label: "Total Patients", value: "1,234", icon: Users, path: "/patients" },
    { label: "Appointments Today", value: "28", icon: Calendar, path: "/appointments" },
    { label: "Pending Labs", value: "15", icon: ClipboardList, path: "/labs" },
    { label: "New Messages", value: "7", icon: MessageSquare, path: "/messages" },
  ];

  const roles = [
    {
      title: "Physician",
      description: "Access patient records, write notes, and manage care plans",
      icon: Stethoscope,
      color: "bg-primary",
      path: "/physician",
    },
    {
      title: "Nurse",
      description: "Record vitals, manage patient intake, and handle orders",
      icon: ClipboardList,
      color: "bg-success",
      path: "/nurse",
    },
    {
      title: "Admin",
      description: "Schedule appointments and manage practice operations",
      icon: ChartBar,
      color: "bg-warning",
      path: "/admin",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">
            Practice Management Portal
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Select your role to access personalized features and workflows designed
            for your specific needs.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {metrics.map((metric, index) => (
            <button
              key={index}
              onClick={() => navigate(metric.path)}
              className="text-left w-full"
            >
              <div className="card-gradient p-6 rounded-lg shadow-sm border border-gray-100 transition-all hover:shadow-md hover:scale-[1.02]">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    {metric.label}
                  </h3>
                  <metric.icon className="w-5 h-5 text-primary opacity-75" />
                </div>
                <p className="text-2xl font-semibold">{metric.value}</p>
              </div>
            </button>
          ))}
        </div>

        {/* Role Selection */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {roles.map((role, index) => (
            <button
              key={index}
              onClick={() => {
                setSelectedRole(role.title);
                navigate(role.path);
              }}
              className={`glass group p-6 text-left transition-all duration-200 hover:scale-[1.02] ${
                selectedRole === role.title
                  ? "ring-2 ring-primary ring-offset-2"
                  : ""
              }`}
            >
              <div
                className={`${role.color} text-white p-3 rounded-lg inline-block mb-4`}
              >
                <role.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{role.title}</h3>
              <p className="text-muted-foreground text-sm">
                {role.description}
              </p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
