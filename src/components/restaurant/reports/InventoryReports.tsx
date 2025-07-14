import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Package, AlertTriangle, TrendingDown, Truck, Clock, CheckCircle } from "lucide-react";

export const InventoryReports = () => {
  // Mock data - replace with API calls
  const inventorySummary = [
    { title: "Total Items", value: "245", status: "normal", icon: Package, color: "text-blue-600" },
    { title: "Low Stock", value: "8", status: "warning", icon: AlertTriangle, color: "text-orange-600" },
    { title: "Out of Stock", value: "3", status: "critical", icon: TrendingDown, color: "text-red-600" },
    { title: "Incoming Orders", value: "12", status: "normal", icon: Truck, color: "text-green-600" },
  ];

  const lowStockItems = [
    { name: "Chicken Breast", current: 15, minimum: 50, unit: "lbs", status: "critical" },
    { name: "Tomatoes", current: 8, minimum: 25, unit: "lbs", status: "warning" },
    { name: "Cheese (Mozzarella)", current: 12, minimum: 30, unit: "lbs", status: "warning" },
    { name: "Olive Oil", current: 2, minimum: 10, unit: "bottles", status: "critical" },
    { name: "Onions", current: 18, minimum: 40, unit: "lbs", status: "warning" },
  ];

  const categoryData = [
    { category: "Proteins", value: 35, color: "#4F46E5" },
    { category: "Vegetables", value: 28, color: "#7C3AED" },
    { category: "Dairy", value: 20, color: "#EC4899" },
    { category: "Grains", value: 12, color: "#F59E0B" },
    { category: "Beverages", value: 5, color: "#10B981" },
  ];

  const consumptionData = [
    { item: "Chicken", thisWeek: 45, lastWeek: 52 },
    { item: "Beef", thisWeek: 32, lastWeek: 28 },
    { item: "Fish", thisWeek: 24, lastWeek: 30 },
    { item: "Pasta", thisWeek: 38, lastWeek: 35 },
    { item: "Rice", thisWeek: 28, lastWeek: 32 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "critical": return "text-red-600 bg-red-50";
      case "warning": return "text-orange-600 bg-orange-50";
      default: return "text-green-600 bg-green-50";
    }
  };

  const getStockPercentage = (current: number, minimum: number) => {
    return Math.max(0, Math.min(100, (current / minimum) * 100));
  };

  return (
    <div className="space-y-6">
      {/* Inventory Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventorySummary.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className={`h-5 w-5 ${item.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              {item.status !== "normal" && (
                <Badge variant={item.status === "critical" ? "destructive" : "secondary"} className="text-xs mt-1">
                  {item.status === "critical" ? "Critical" : "Attention"}
                </Badge>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      {lowStockItems.filter(item => item.status === "critical").length > 0 && (
        <Alert className="border-red-200 bg-red-50">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            <strong>Critical Stock Alert:</strong> {lowStockItems.filter(item => item.status === "critical").length} items are critically low. 
            Immediate restocking required.
          </AlertDescription>
        </Alert>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory by Category</CardTitle>
            <CardDescription>Distribution of inventory across categories</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ category, value }) => `${category}: ${value}%`}
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Weekly Consumption Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Consumption Trends</CardTitle>
            <CardDescription>This week vs last week consumption</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={consumptionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="item" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="lastWeek" fill="#E5E7EB" name="Last Week" />
                <Bar dataKey="thisWeek" fill="#4F46E5" name="This Week" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Items */}
      <Card>
        <CardHeader>
          <CardTitle>Low Stock Items</CardTitle>
          <CardDescription>Items requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowStockItems.map((item, index) => (
              <div key={index} className={`p-4 rounded-lg border ${getStatusColor(item.status)}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">{item.name}</div>
                  <Badge variant={item.status === "critical" ? "destructive" : "secondary"}>
                    {item.status === "critical" ? "Critical" : "Low"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between mb-2 text-sm">
                  <span>Current: {item.current} {item.unit}</span>
                  <span>Minimum: {item.minimum} {item.unit}</span>
                </div>
                <Progress 
                  value={getStockPercentage(item.current, item.minimum)} 
                  className="h-2"
                />
                <div className="text-xs mt-1 text-muted-foreground">
                  {Math.round(getStockPercentage(item.current, item.minimum))}% of minimum stock level
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <Truck className="h-8 w-8 text-blue-600 mr-4" />
            <div>
              <div className="font-medium">Create Purchase Order</div>
              <div className="text-sm text-muted-foreground">Restock low inventory items</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <Clock className="h-8 w-8 text-purple-600 mr-4" />
            <div>
              <div className="font-medium">Set Reorder Points</div>
              <div className="text-sm text-muted-foreground">Adjust minimum stock levels</div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow cursor-pointer">
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-600 mr-4" />
            <div>
              <div className="font-medium">Physical Count</div>
              <div className="text-sm text-muted-foreground">Update inventory counts</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};