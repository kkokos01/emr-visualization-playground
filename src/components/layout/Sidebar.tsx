
import { Calendar, ClipboardList, Stethoscope, Users, UserCog } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar as SidebarContainer,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
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
      ],
    },
    {
      label: "Clinical",
      items: [
        { title: "Patients", icon: Users, url: "/patients" },
        { title: "Schedule", icon: Calendar, url: "/appointments" },
        { title: "Tasks", icon: ClipboardList, url: "/tasks" },
        { title: "Chart", icon: Stethoscope, url: "/patient/1" },
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
