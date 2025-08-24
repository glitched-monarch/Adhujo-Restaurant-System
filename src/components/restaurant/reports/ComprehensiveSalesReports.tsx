
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Clock, Star, Calendar, Download, Filter } from "lucide-react";
import { DateRangeFilter, DateRange } from "@/components/common/DateRangeFilter";

export const ComprehensiveSalesReports = () => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [periodFilter, setPeriodFilter] = useState("today");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data - replace with API calls
  const salesData = {
    today: {
      dailySales: [
        { day: "Mon", sales: 1240, orders: 18, avgOrder: 68.89 },
        { day: "Tue", sales: 1890, orders: 25, avgOrder: 75.60 },
        { day: "Wed", sales: 2100, orders: 31, avgOrder: 67.74 },
        { day: "Thu", sales: 1650, orders: 22, avgOrder: 75.00 },
        { day: "Fri", sales: 2450, orders: 35, avgOrder: 70.00 },
        { day: "Sat", sales: 3200, orders: 48, avgOrder: 66.67 },
        { day: "Sun", sales: 2800, orders: 42, avgOrder: 66.67 },
      ],
      hourlySales: [
        { hour: "6AM", sales: 120, orders: 2 },
        { hour: "8AM", sales: 340, orders: 5 },
        { hour: "10AM", sales: 180, orders: 3 },
        { hour: "12PM", sales: 520, orders: 8 },
        { hour: "2PM", sales: 380, orders: 6 },
        { hour: "4PM", sales: 210, orders: 3 },
        { hour: "6PM", sales: 680, orders: 10 },
        { hour: "8PM", sales: 590, orders: 9 },
        { hour: "10PM", sales: 290, orders: 4 },
      ],
      paymentMethods: [
        { name: "Cash", value: 45, amount: 1800 },
        { name: "Card", value: 35, amount: 1400 },
        { name: "M-Pesa", value: 20, amount: 800 },
      ],
      categories: [
        { name: "Main Courses", sales: 2850, orders: 45, percentage: 57 },
        { name: "Beverages", sales: 850, orders: 28, percentage: 17 },
        { name: "Appetizers", sales: 650, orders: 18, percentage: 13 },
        { name: "Desserts", value: 650, orders: 15, percentage: 13 },
      ]
    }
  };

  const topItems = [
    { name: "Grilled Chicken", quantity: 45, revenue: 675, percentage: 15.2, trend: "up" },
    { name: "Pasta Carbonara", quantity: 38, revenue: 570, percentage: 12.8, trend: "up" },
    { name: "Caesar Salad", quantity: 32, revenue: 384, percentage: 10.7, trend: "down" },
    { name: "Fish & Chips", quantity: 28, revenue: 420, percentage: 9.4, trend: "up" },
    { name: "Burger Deluxe", quantity: 25, revenue: 375, percentage: 8.3, trend: "stable" },
  ];

  const recentTransactions = [
    { id: "#001", time: "2:34 PM", items: "Chicken Burger + Fries", amount: 24.50, payment: "Card", status: "Completed" },
    { id: "#002", time: "2:28 PM", items: "Pasta Alfredo", amount: 18.00, payment: "Cash", status: "Completed" },
    { id: "#003", time: "2:15 PM", items: "Fish Tacos x2", amount: 32.00, payment: "M-Pesa", status: "Completed" },
    { id: "#004", time: "2:08 PM", items: "Caesar Salad + Drink", amount: 16.50, payment: "Card", status: "Refunded" },
  ];

  const summaryStats = {
    totalRevenue: 15330,
    totalOrders: 156,
    averageOrder: 98.27,
    peakHour: "6-8 PM",
    topCategory: "Main Courses",
    growthRate: 12.5
  };

  const handleExport = () => {
    console.log("Exporting sales report...");
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-green-600" />;
      case "down": return <TrendingDown className="h-3 w-3 text-red-600" />;
      default: return <div className="h-3 w-3 rounded-full bg-gray-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-wrap gap-4 items-center">
          <Select value={periodFilter} onValueChange={setPeriodFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="main">Main Courses</SelectItem>
              <SelectItem value="beverages">Beverages</SelectItem>
              <SelectItem value="appetizers">Appetizers</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            More Filters
          </Button>
          <Button variant="outline" size="sm" onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {periodFilter === "custom" && (
        <DateRangeFilter onDateRangeChange={setDateRange} />
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summaryStats.totalRevenue.toLocaleString()}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +{summaryStats.growthRate}% vs last period
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.totalOrders}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +8.2% vs last period
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Star className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${summaryStats.averageOrder.toFixed(2)}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +3.8% vs last period
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <Clock className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{summaryStats.peakHour}</div>
            <div className="text-xs text-muted-foreground">
              Highest sales volume
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Category</CardTitle>
            <BarChart3 className="h-5 w-5 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{summaryStats.topCategory}</div>
            <div className="text-xs text-muted-foreground">
              57% of total sales
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
            <TrendingUp className="h-5 w-5 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{summaryStats.growthRate}%</div>
            <div className="text-xs text-muted-foreground">
              Month over month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trend</CardTitle>
            <CardDescription>Revenue and order count over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData.today.dailySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === "sales" ? `$${value}` : `${value} orders`,
                  name === "sales" ? "Revenue" : "Orders"
                ]} />
                <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={3} />
                <Line type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Sales Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Distribution</CardTitle>
            <CardDescription>Sales performance throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesData.today.hourlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value, name) => [
                  name === "sales" ? `$${value}` : `${value} orders`,
                  name === "sales" ? "Revenue" : "Orders"
                ]} />
                <Bar dataKey="sales" fill="#7C3AED" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>Best performers with trend indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-lg text-muted-foreground">#{index + 1}</span>
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.quantity} sold • ${item.revenue}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {getTrendIcon(item.trend)}
                    <Badge variant="secondary">{item.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest sales activity</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium">{transaction.id}</TableCell>
                    <TableCell>{transaction.time}</TableCell>
                    <TableCell>${transaction.amount}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{transaction.payment}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={transaction.status === "Completed" ? "default" : "destructive"}>
                        {transaction.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods & Categories */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Distribution of payment types</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={salesData.today.paymentMethods}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                >
                  {salesData.today.paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={["#4F46E5", "#10B981", "#F59E0B"][index]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value, name) => [`${value}%`, name]} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Category Performance</CardTitle>
            <CardDescription>Sales by menu category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {salesData.today.categories.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{category.name}</span>
                    <span className="font-medium">${category.sales}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
