
import { 
  Calendar, ClipboardList, Stethoscope, Users, UserCog, 
  MessageSquare, UserPlus, DollarSign, Receipt, TestTube, 
  CircleUser, Heart, Brain, Sparkles, Activity, Settings
} from "lucide-react";
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
  SidebarSeparator,
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
      type: "separator"
    },
    {
      label: "Clinical",
      items: [
        { title: "Patients", icon: Users, url: "/patients" },
        { title: "Schedule", icon: Calendar, url: "/admin/appointments" },
        { title: "Flow Board", icon: Activity, url: "/clinical/flow-board" },
        { title: "Orders & Results", icon: TestTube, url: "/clinical/orders" },
        { title: "Deep Analysis", icon: Brain, url: "/clinical/analysis" },
        { title: "Tasks", icon: ClipboardList, url: "/tasks" },
        { title: "Messages", icon: MessageSquare, url: "/messages" },
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
    {
      type: "separator"
    },
    {
      label: "Patient Portal",
      items: [
        { title: "My Health", icon: Heart, url: "/roles/patient" },
        { 
          title: "Health Analysis", 
          icon: Brain, 
          url: "/patient/analysis/1",
          subItems: [
            { 
              title: "Second Opinion", 
              url: "/patient/1/second-opinion",
              icon: Stethoscope
            }
          ]
        },
        { title: "Test Results", icon: TestTube, url: "/patient/results" },
        { title: "My Messages", icon: MessageSquare, url: "/messages" },
        { title: "My Appointments", icon: Calendar, url: "/appointments" },
      ],
    },
    {
      label: "Beta / Experimental",
      items: [
        { 
          title: "Future You", 
          icon: Sparkles, 
          url: "/health-avatar",
          className: "text-[#8B5CF6] hover:text-[#7C3AED] hover:bg-[#F5F3FF]"
        },
      ],
    },
    {
      label: "Administration",
      items: [
        { 
          title: "Admin Dashboard", 
          icon: Settings, 
          url: "/admin",
          className: "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
        },
      ],
    },
  ];

  const renderMenuItem = (item: any) => (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild>
        <Link 
          to={item.url}
          className={cn(
            "text-foreground/70 hover:text-primary hover:bg-primary/5",
            location.pathname === item.url && "text-primary bg-primary/5",
            item.className
          )}
        >
          <item.icon className="w-5 h-5" />
          <span>{item.title}</span>
        </Link>
      </SidebarMenuButton>
      {item.subItems && (
        <div className="ml-6 mt-2 space-y-1">
          {item.subItems.map((subItem: any) => (
            <SidebarMenuItem key={subItem.title}>
              <SidebarMenuButton asChild>
                <Link 
                  to={subItem.url}
                  className={cn(
                    "text-sm text-foreground/70 hover:text-primary hover:bg-primary/5",
                    location.pathname === subItem.url && "text-primary bg-primary/5"
                  )}
                >
                  <subItem.icon className="w-4 h-4" />
                  <span>{subItem.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </div>
      )}
    </SidebarMenuItem>
  );

  return (
    <SidebarContainer className={cn(
      "bg-muted border-r border-border custom-sheet"
    )}>
      <SidebarContent>
        {menuItems.map((group, index) => {
          if ('type' in group && group.type === 'separator') {
            return (
              <div key={`separator-${index}`} className="px-2 py-3">
                <SidebarSeparator className="opacity-30" />
              </div>
            );
          }

          return (
            <SidebarGroup key={group.label}>
              <SidebarGroupLabel className="text-foreground/70">{group.label}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {('items' in group) && group.items.map(renderMenuItem)}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          );
        })}
      </SidebarContent>
    </SidebarContainer>
  );
};
