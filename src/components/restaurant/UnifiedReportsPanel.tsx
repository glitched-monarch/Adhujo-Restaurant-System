
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, DollarSign, Users, TrendingUp, Package, Award, Calculator } from "lucide-react";

// Import existing report components
import { SalesReports } from "./reports/SalesReports";
import { InventoryReports } from "./reports/InventoryReports";
import { PerformanceReports } from "./reports/PerformanceReports";
import { CustomerReports } from "./reports/CustomerReports";
import { FinancialReports } from "./reports/FinancialReports";
import { FinancialDashboard } from "./FinancialDashboard";

// Overview component with summary cards
const ReportsOverview = () => {
  const overviewCards = [
    {
      title: "Total Revenue",
      value: "$24,580",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
      description: "This month's revenue"
    },
    {
      title: "Total Orders",
      value: "1,247",
      change: "+8.2%",
      icon: BarChart3,
      color: "text-blue-600",
      description: "Orders processed"
    },
    {
      title: "Active Customers",
      value: "892",
      change: "+15.3%",
      icon: Users,
      color: "text-purple-600",
      description: "Regular customers"
    },
    {
      title: "Inventory Items",
      value: "245",
      change: "+3.1%",
      icon: Package,
      color: "text-orange-600",
      description: "Items in stock"
    },
    {
      title: "Performance Score",
      value: "94%",
      change: "+5.7%",
      icon: Award,
      color: "text-indigo-600",
      description: "Overall efficiency"
    },
    {
      title: "Profit Margin",
      value: "25.1%",
      change: "+2.3%",
      icon: Calculator,
      color: "text-emerald-600",
      description: "Net profit margin"
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Business Overview</h3>
        <p className="text-muted-foreground">Key performance indicators across all business areas</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {overviewCards.map((card, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-5 w-5 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{card.value}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                {card.change} vs last month
              </div>
              <p className="text-xs text-muted-foreground mt-1">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <div>
                <div className="font-medium">Generate Sales Report</div>
                <div className="text-sm text-muted-foreground">Export today's sales data</div>
              </div>
              <BarChart3 className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <div>
                <div className="font-medium">Check Inventory</div>
                <div className="text-sm text-muted-foreground">Review low stock items</div>
              </div>
              <Package className="h-5 w-5 text-orange-600" />
            </div>
            <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted cursor-pointer transition-colors">
              <div>
                <div className="font-medium">Financial Summary</div>
                <div className="text-sm text-muted-foreground">View profit & loss</div>
              </div>
              <DollarSign className="h-5 w-5 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center space-x-3 p-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Sales report generated</div>
                <div className="text-xs text-muted-foreground">2 minutes ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Inventory updated</div>
                <div className="text-xs text-muted-foreground">15 minutes ago</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <div className="text-sm font-medium">Performance metrics calculated</div>
                <div className="text-xs text-muted-foreground">1 hour ago</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export const UnifiedReportsPanel = () => {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Reports & Financials</h2>
        <p className="text-muted-foreground">Comprehensive business analytics and financial insights</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-auto p-1">
          <TabsTrigger 
            value="overview" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <TrendingUp className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger 
            value="sales" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <DollarSign className="h-4 w-4" />
            <span className="hidden sm:inline">Sales</span>
          </TabsTrigger>
          <TabsTrigger 
            value="inventory" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Package className="h-4 w-4" />
            <span className="hidden sm:inline">Inventory</span>
          </TabsTrigger>
          <TabsTrigger 
            value="performance" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Award className="h-4 w-4" />
            <span className="hidden sm:inline">Performance</span>
          </TabsTrigger>
          <TabsTrigger 
            value="customers" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Customers</span>
          </TabsTrigger>
          <TabsTrigger 
            value="financial" 
            className="flex items-center gap-2 py-3 data-[state=active]:bg-background data-[state=active]:text-foreground"
          >
            <Calculator className="h-4 w-4" />
            <span className="hidden sm:inline">Financial</span>
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="overview" className="space-y-6 m-0">
            <ReportsOverview />
          </TabsContent>

          <TabsContent value="sales" className="space-y-6 m-0">
            <SalesReports />
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6 m-0">
            <InventoryReports />
          </TabsContent>

          <TabsContent value="performance" className="space-y-6 m-0">
            <PerformanceReports />
          </TabsContent>

          <TabsContent value="customers" className="space-y-6 m-0">
            <CustomerReports />
          </TabsContent>

          <TabsContent value="financial" className="space-y-6 m-0">
            <FinancialDashboard />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};
