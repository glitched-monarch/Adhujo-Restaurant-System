import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  ShoppingCart, 
  Package, 
  ChefHat, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle, 
  Users, 
  FileText, 
  Settings,
  UserCheck,
  LogOut,
  History,
  CreditCard,
  BarChart3
} from "lucide-react";

interface TouchDashboardProps {
  userRole: "admin" | "manager" | "staff";
}

export const TouchDashboard = ({ userRole }: TouchDashboardProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  const handleCardClick = (tab: string) => {
    setSearchParams({ tab });
  };

  const stats = [
    { title: "Today's Sales", value: "KSH 12,450", change: "+12%", icon: DollarSign, color: "text-green-600" },
    { title: "Orders", value: "89", change: "+5%", icon: ShoppingCart, color: "text-blue-600" },
    { title: "Revenue", value: "KSH 45,230", change: "+8%", icon: TrendingUp, color: "text-purple-600" },
    { title: "Active Items", value: "127", change: "0%", icon: ChefHat, color: "text-orange-600" }
  ];

  const recentSales = [
    { id: "1", customer: "John Doe", amount: "KSH 450", time: "2 min ago", items: "Grilled Chicken, Salad" },
    { id: "2", customer: "Jane Smith", amount: "KSH 320", time: "5 min ago", items: "Pasta, Drink" },
    { id: "3", customer: "Mike Johnson", amount: "KSH 280", time: "8 min ago", items: "Burger, Fries" },
  ];

  const lowStockItems = [
    { name: "Tomatoes", current: "5 kg", minimum: "10 kg", status: "critical" },
    { name: "Chicken Breast", current: "15 kg", minimum: "20 kg", status: "low" },
    { name: "Olive Oil", current: "3 bottles", minimum: "5 bottles", status: "low" }
  ];

  const activeStaff = [
    { id: "1", name: "Alice Johnson", role: "Chef", avatar: "", status: "active", shift: "Morning" },
    { id: "2", name: "Bob Smith", role: "Waiter", avatar: "", status: "active", shift: "Morning" },
    { id: "3", name: "Carol Davis", role: "Manager", avatar: "", status: "break", shift: "Morning" },
    { id: "4", name: "David Wilson", role: "Chef", avatar: "", status: "active", shift: "Morning" }
  ];

  const quickActions = [
    { 
      title: "New Sale", 
      description: "Process a new order", 
      icon: ShoppingCart, 
      color: "bg-green-100 text-green-700 hover:bg-green-200",
      tab: "sales"
    },
    { 
      title: "Inventory", 
      description: "Manage stock levels", 
      icon: Package, 
      color: "bg-blue-100 text-blue-700 hover:bg-blue-200",
      tab: "inventory"
    },
    { 
      title: "Menu Items", 
      description: "Update menu", 
      icon: ChefHat, 
      color: "bg-orange-100 text-orange-700 hover:bg-orange-200",
      tab: "menu",
      roles: ["admin", "manager"]
    },
    { 
      title: "Reports", 
      description: "View analytics", 
      icon: BarChart3, 
      color: "bg-purple-100 text-purple-700 hover:bg-purple-200",
      tab: "reports",
      roles: ["admin", "manager"]
    }
  ];

  const adminActions = [
    { 
      title: "User Management", 
      description: "Manage staff accounts", 
      icon: Users, 
      color: "bg-indigo-100 text-indigo-700 hover:bg-indigo-200",
      tab: "users"
    },
    { 
      title: "Access Logs", 
      description: "System activity", 
      icon: History, 
      color: "bg-gray-100 text-gray-700 hover:bg-gray-200",
      tab: "logs"
    },
    { 
      title: "Expenses", 
      description: "Track expenses", 
      icon: CreditCard, 
      color: "bg-red-100 text-red-700 hover:bg-red-200",
      tab: "expenses"
    },
    { 
      title: "Settings", 
      description: "System configuration", 
      icon: Settings, 
      color: "bg-slate-100 text-slate-700 hover:bg-slate-200",
      tab: "settings"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Restaurant Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm text-gray-600">Logged in as</p>
            <p className="font-medium capitalize">{userRole}</p>
          </div>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-600">
                <span className="text-green-600">{stat.change}</span> from yesterday
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and operations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickActions
                .filter(action => !action.roles || action.roles.includes(userRole))
                .map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`h-24 flex flex-col items-center justify-center space-y-2 ${action.color}`}
                  onClick={() => handleCardClick(action.tab)}
                >
                  <action.icon className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-75">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Staff Active */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Staff Active
            </CardTitle>
            <CardDescription>Currently at work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activeStaff.map((staff) => (
                <div key={staff.id} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={staff.avatar} />
                      <AvatarFallback>{staff.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">{staff.name}</p>
                      <p className="text-xs text-gray-500">{staff.role}</p>
                    </div>
                  </div>
                  <Badge 
                    variant={staff.status === 'active' ? 'default' : 'secondary'}
                    className="text-xs"
                  >
                    {staff.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>Latest transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentSales.map((sale) => (
                <div key={sale.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{sale.customer}</p>
                    <p className="text-xs text-gray-500">{sale.items}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{sale.amount}</p>
                    <p className="text-xs text-gray-500">{sale.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Low Stock Alert */}
        <Card className="border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-800">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
            <CardDescription>Items running low</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{item.name}</p>
                    <p className="text-xs text-gray-500">Min: {item.minimum}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{item.current}</p>
                    <Badge 
                      variant={item.status === 'critical' ? 'destructive' : 'secondary'}
                      className="text-xs"
                    >
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Actions */}
      {userRole === "admin" && (
        <Card>
          <CardHeader>
            <CardTitle>Administrative Functions</CardTitle>
            <CardDescription>System management and configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {adminActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className={`h-24 flex flex-col items-center justify-center space-y-2 ${action.color}`}
                  onClick={() => handleCardClick(action.tab)}
                >
                  <action.icon className="h-8 w-8" />
                  <div className="text-center">
                    <div className="font-medium">{action.title}</div>
                    <div className="text-xs opacity-75">{action.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
