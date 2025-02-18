
import { Calendar, ClipboardList, Stethoscope, Users, UserCog, MessageSquare, UserPlus, DollarSign, Receipt, TestTube, CircleUser, Heart, FileText } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export const Sidebar = () => {
  const location = useLocation();
  
  const menuItems = [
    {
      label: "Role Views (Demo)",
      items: [
        { title: "Physician View", icon: UserCog, url: "/roles/physician" },
        { title: "Nurse View", icon: UserCog, url: "/roles/nurse" },
        { title: "Admin View", icon: UserCog, url: "/roles/admin" },
        { title: "Patient View", icon: CircleUser, url: "/roles/patient" },
      ],
    },
    {
      label: "Clinical",
      items: [
        { title: "Patients", icon: Users, url: "/patients" },
        { title: "Schedule", icon: Calendar, url: "/appointments" },
        { title: "Orders & Results", icon: TestTube, url: "/clinical/orders" },
        { title: "Tasks", icon: ClipboardList, url: "/tasks" },
        { title: "Messages", icon: MessageSquare, url: "/messages" },
      ],
    },
    {
      label: "Patient Portal",
      items: [
        { title: "My Health", icon: Heart, url: "/roles/patient" },
        { title: "Test Results", icon: TestTube, url: "/patient/1/results" },
        { title: "My Records", icon: FileText, url: "/patient/1/records" },
        { title: "My Messages", icon: MessageSquare, url: "/messages" },
        { title: "My Appointments", icon: Calendar, url: "/appointments" },
      ],
    },
    {
      label: "Patient Management",
      items: [
        { title: "New Patient", icon: UserPlus, url: "/patient/register" },
        { title: "Clinical Chart", icon: Stethoscope, url: "/patient/1/chart" },
        { title: "Billing Dashboard", icon: DollarSign, url: "/billing" },
        { title: "Payments & Invoices", icon: Receipt, url: "/billing/payments" },
      ],
    },
  ];

  return (
    <SidebarContainer className="bg-muted border-r border-border">
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel className="text-foreground/70">{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.url}
                        className={cn(
                          "text-foreground/70 hover:text-primary hover:bg-primary/5",
                          location.pathname === item.url && "text-primary bg-primary/5"
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </SidebarContainer>
  );
};
