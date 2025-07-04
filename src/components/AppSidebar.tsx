import { useState } from "react";
import { useSearchParams } from "react-router-dom";
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
  ShoppingCart, 
  Package, 
  Receipt, 
  BarChart3, 
  Users, 
  Settings, 
  LogOut,
  ChefHat,
  Calculator,
  TrendingUp,
  ShieldCheck
} from "lucide-react";

interface AppSidebarProps {
  userRole: "admin" | "manager" | "staff";
  onLogout: () => void;
}

export const AppSidebar = ({ userRole, onLogout }: AppSidebarProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state } = useSidebar();
  
  const activeTab = searchParams.get('tab') || 'sales';
  const isCollapsed = state === "collapsed";

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  const menuItems = [
    { 
      id: 'sales', 
      label: 'Sales', 
      icon: ShoppingCart, 
      description: 'Process sales and transactions',
      access: ['admin', 'manager', 'staff'] 
    },
    { 
      id: 'inventory', 
      label: 'Inventory', 
      icon: Package, 
      description: 'Manage stock and supplies',
      access: ['admin', 'manager', 'staff'] 
    },
    { 
      id: 'menu', 
      label: 'Menu', 
      icon: ChefHat, 
      description: 'Manage menu items and pricing',
      access: ['admin', 'manager'] 
    },
    { 
      id: 'expenses', 
      label: 'Expenses', 
      icon: Receipt, 
      description: 'Track business expenses',
      access: ['admin', 'manager'] 
    },
    { 
      id: 'financial', 
      label: 'Financial', 
      icon: Calculator, 
      description: 'Financial dashboard and KPIs',
      access: ['admin', 'manager'] 
    },
    { 
      id: 'reports', 
      label: 'Reports', 
      icon: BarChart3, 
      description: 'Advanced business reports',
      access: ['admin', 'manager'] 
    }
  ];

  const adminMenuItems = [
    { 
      id: 'users', 
      label: 'Users', 
      icon: Users, 
      description: 'Manage user accounts',
      access: ['admin'] 
    },
    { 
      id: 'logs', 
      label: 'Access Logs', 
      icon: ShieldCheck, 
      description: 'System access logs',
      access: ['admin'] 
    },
    { 
      id: 'settings', 
      label: 'Settings', 
      icon: Settings, 
      description: 'System configuration',
      access: ['admin'] 
    }
  ];

  const canAccess = (item: { access: string[] }) => {
    return item.access.includes(userRole);
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible="offcanvas">
      <SidebarHeader className="border-b p-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6 text-primary" />
            <span className="font-bold text-lg">Adhujo ERP</span>
          </div>
        )}
        {isCollapsed && (
          <div className="flex justify-center">
            <TrendingUp className="h-6 w-6 text-primary" />
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Operations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.filter(canAccess).map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    onClick={() => handleTabChange(item.id)}
                    isActive={activeTab === item.id}
                    className="w-full justify-start"
                  >
                    <item.icon className="h-4 w-4" />
                    {!isCollapsed && <span className="ml-2">{item.label}</span>}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {userRole === 'admin' && (
          <SidebarGroup>
            <SidebarGroupLabel>Administration</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {adminMenuItems.filter(canAccess).map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      onClick={() => handleTabChange(item.id)}
                      isActive={activeTab === item.id}
                      className="w-full justify-start"
                    >
                      <item.icon className="h-4 w-4" />
                      {!isCollapsed && <span className="ml-2">{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t p-4">
        <Button
          variant="ghost"
          onClick={onLogout}
          className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span className="ml-2">Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
