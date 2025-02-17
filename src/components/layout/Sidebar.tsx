
import { Calendar, ClipboardList, Stethoscope, Users } from "lucide-react";
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
      label: "Clinical",
      items: [
        { title: "Patients", icon: Users, url: "/patients" },
        { title: "Schedule", icon: Calendar, url: "/appointments" },
        { title: "Tasks", icon: ClipboardList, url: "/tasks" },
        { title: "Chart", icon: Stethoscope, url: "/patient/1" }, // Changed from /chart to /patient/1 as a default
      ],
    },
  ];

  return (
    <SidebarContainer>
      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link 
                        to={item.url}
                        className={location.pathname === item.url ? "text-primary" : ""}
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
