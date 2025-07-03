
import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Package,
  FileText,
  Users,
  Receipt,
  MenuSquare,
  ClipboardList,
  Settings,
  LogOut,
} from "lucide-react";

interface AppSidebarProps {
  userRole: "admin" | "manager" | "staff";
  onLogout: () => void;
}

export function AppSidebar({ userRole, onLogout }: AppSidebarProps) {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const canAccessUsers = userRole === "admin";
  const canAccessExpenses = userRole === "admin" || userRole === "manager";
  const canAccessReports = userRole === "admin" || userRole === "manager";
  const canAccessMenu = userRole === "admin" || userRole === "manager";
  const canAccessSettings = userRole === "admin";

  const mainMenuItems = [
    { title: "Sales", url: "/dashboard?tab=sales", icon: DollarSign, available: true },
    { title: "Inventory", url: "/dashboard?tab=inventory", icon: Package, available: true },
    { title: "Menu Management", url: "/dashboard?tab=menu", icon: MenuSquare, available: canAccessMenu },
    { title: "Expenses", url: "/dashboard?tab=expenses", icon: Receipt, available: canAccessExpenses },
    { title: "Reports & Analytics", url: "/dashboard?tab=reports", icon: FileText, available: canAccessReports },
  ];

  const systemMenuItems = [
    { title: "Users", url: "/dashboard?tab=users", icon: Users, available: canAccessUsers },
    { title: "Access Logs", url: "/dashboard?tab=logs", icon: ClipboardList, available: canAccessUsers },
    { title: "System Settings", url: "/dashboard?tab=settings", icon: Settings, available: canAccessSettings },
  ];

  const isActive = (url: string) => {
    const urlParams = new URLSearchParams(url.split('?')[1]);
    const currentParams = new URLSearchParams(location.search);
    return urlParams.get('tab') === currentParams.get('tab');
  };

  return (
    <Sidebar className={state === "collapsed" ? "w-14" : "w-64"}>
      <SidebarHeader className="p-4">
        {state !== "collapsed" && (
          <div>
            <h2 className="text-lg font-bold text-primary">Adhujo Restaurant</h2>
            <p className="text-sm text-muted-foreground">Role: {userRole}</p>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainMenuItems
                .filter(item => item.available)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>System</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemMenuItems
                .filter(item => item.available)
                .map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive(item.url)}>
                      <NavLink to={item.url}>
                        <item.icon className="h-4 w-4" />
                        {state !== "collapsed" && <span>{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <Button variant="outline" onClick={onLogout} className="w-full">
          <LogOut className="h-4 w-4" />
          {state !== "collapsed" && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
