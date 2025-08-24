import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import {
  ShoppingCart,
  Package,
  Receipt,
  BarChart3,
  Users,
  Settings,
  ChefHat,
  Calendar,
  User,
  LogOut
} from "lucide-react";

interface TouchDashboardProps {
  userRole: "admin" | "manager" | "staff";
}

export const TouchDashboard = ({ userRole }: TouchDashboardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSectionClick = (section: string) => {
    setSearchParams({ tab: section });
  };

  const handleLogout = () => {
    window.location.href = "/login";
  };

  // Get current date and time
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  const timeStr = now.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  // Quick stats (mock data)
  const quickStats = [
    {
      title: "Today's Sales",
      value: "$4,750",
      icon: ShoppingCart,
      color: "bg-green-500",
      textColor: "text-white"
    },
    {
      title: "Orders",
      value: "142",
      icon: Receipt,
      color: "bg-blue-500",
      textColor: "text-white"
    },
    {
      title: "Active Tables",
      value: "8",
      icon: User,
      color: "bg-purple-500",
      textColor: "text-white"
    },
    {
      title: "Staff Online",
      value: "12",
      icon: Users,
      color: "bg-red-500",
      textColor: "text-white"
    }
  ];

  // Main sections
  const mainSections = [
    {
      id: 'sales',
      title: 'Sales',
      description: 'Process orders and manage transactions',
      detail: '24 orders today',
      icon: ShoppingCart,
      color: 'bg-green-500',
      access: ['admin', 'manager', 'staff']
    },
    {
      id: 'inventory',
      title: 'Inventory',
      description: 'Track stock levels and ingredients',
      detail: '15 low stock items',
      icon: Package,
      color: 'bg-blue-500',
      access: ['admin', 'manager', 'staff']
    },
    {
      id: 'menu',
      title: 'Menu',
      description: 'Manage dishes and pricing',
      detail: '45 active items',
      icon: ChefHat,
      color: 'bg-purple-500',
      access: ['admin', 'manager']
    },
    {
      id: 'users',
      title: 'Users',
      description: 'Staff and customer management',
      detail: '12 active staff',
      icon: Users,
      color: 'bg-orange-500',
      access: ['admin']
    },
    {
      id: 'expenses',
      title: 'Expenses',
      description: 'Track costs and expenditures',
      detail: '$2,450 this week',
      icon: Receipt,
      color: 'bg-pink-500',
      access: ['admin', 'manager']
    },
    {
      id: 'reports',
      title: 'Reports',
      description: 'Analytics and insights',
      detail: 'View analytics',
      icon: BarChart3,
      color: 'bg-indigo-500',
      access: ['admin', 'manager']
    }
  ];

  const canAccess = (section: { access: string[] }) => {
    return section.access.includes(userRole);
  };

  const accessibleSections = mainSections.filter(canAccess);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold text-foreground">Adhujo Restaurant</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-green-600 font-medium">Online</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="text-red-600 border-red-200 hover:bg-red-50"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-foreground mb-1">Welcome back!</h2>
          <p className="text-sm text-muted-foreground">
            {dateStr} • {timeStr}
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {quickStats.map((stat, index) => (
          <Card key={index} className={`${stat.color} border-0 shadow-md`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className={`text-sm ${stat.textColor} opacity-90`}>{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.textColor}`}>{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.textColor} opacity-80`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accessibleSections.map((section) => (
          <Card 
            key={section.id}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-white"
            onClick={() => handleSectionClick(section.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 ${section.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-foreground mb-1">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{section.description}</p>
                  <p className="text-sm text-muted-foreground font-medium">{section.detail}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Admin Settings (if admin) */}
      {userRole === 'admin' && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-foreground mb-4">Administration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-white"
              onClick={() => handleSectionClick('logs')}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Access Logs</h3>
                    <p className="text-sm text-muted-foreground mb-2">System access logs</p>
                    <p className="text-sm text-muted-foreground font-medium">Monitor activity</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card 
              className="hover:shadow-lg transition-all duration-200 cursor-pointer border-0 bg-white"
              onClick={() => handleSectionClick('settings')}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Settings className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-foreground mb-1">Settings</h3>
                    <p className="text-sm text-muted-foreground mb-2">System configuration</p>
                    <p className="text-sm text-muted-foreground font-medium">Configure system</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};
