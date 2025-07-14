import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Clock, Star } from "lucide-react";

export const SalesReports = () => {
  // Mock data - replace with API calls
  const dailySalesData = [
    { day: "Mon", sales: 1240, orders: 18 },
    { day: "Tue", sales: 1890, orders: 25 },
    { day: "Wed", sales: 2100, orders: 31 },
    { day: "Thu", sales: 1650, orders: 22 },
    { day: "Fri", sales: 2450, orders: 35 },
    { day: "Sat", sales: 3200, orders: 48 },
    { day: "Sun", sales: 2800, orders: 42 },
  ];

  const hourlyData = [
    { hour: "6AM", sales: 120 },
    { hour: "8AM", sales: 340 },
    { hour: "10AM", sales: 180 },
    { hour: "12PM", sales: 520 },
    { hour: "2PM", sales: 380 },
    { hour: "4PM", sales: 210 },
    { hour: "6PM", sales: 680 },
    { hour: "8PM", sales: 590 },
    { hour: "10PM", sales: 290 },
  ];

  const topItems = [
    { name: "Grilled Chicken", quantity: 45, revenue: 675, percentage: 15.2 },
    { name: "Pasta Carbonara", quantity: 38, revenue: 570, percentage: 12.8 },
    { name: "Caesar Salad", quantity: 32, revenue: 384, percentage: 10.7 },
    { name: "Fish & Chips", quantity: 28, revenue: 420, percentage: 9.4 },
    { name: "Burger Deluxe", quantity: 25, revenue: 375, percentage: 8.3 },
  ];

  const pieData = topItems.map((item, index) => ({
    name: item.name,
    value: item.percentage,
    color: ["#4F46E5", "#7C3AED", "#EC4899", "#F59E0B", "#10B981"][index],
  }));

  const recentTransactions = [
    { id: "#001", time: "2:34 PM", items: "Chicken Burger + Fries", amount: 24.50, payment: "Card" },
    { id: "#002", time: "2:28 PM", items: "Pasta Alfredo", amount: 18.00, payment: "Cash" },
    { id: "#003", time: "2:15 PM", items: "Fish Tacos x2", amount: 32.00, payment: "Card" },
    { id: "#004", time: "2:08 PM", items: "Caesar Salad + Drink", amount: 16.50, payment: "Card" },
  ];

  return (
    <div className="space-y-6">
      {/* Sales Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <DollarSign className="h-5 w-5 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$2,847</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +12.5% vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Orders Count</CardTitle>
            <ShoppingCart className="h-5 w-5 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +8.2% vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <Star className="h-5 w-5 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$67.79</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
              +3.8% vs yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Peak Hour</CardTitle>
            <Clock className="h-5 w-5 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6-8 PM</div>
            <div className="text-xs text-muted-foreground">
              $680 revenue
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Sales Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Daily Sales Trend</CardTitle>
            <CardDescription>Sales performance over the last 7 days</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={dailySalesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip formatter={(value, name) => [`$${value}`, name === "sales" ? "Sales" : "Orders"]} />
                <Line type="monotone" dataKey="sales" stroke="#4F46E5" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Hourly Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Hourly Sales Today</CardTitle>
            <CardDescription>Sales distribution throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Sales"]} />
                <Bar dataKey="sales" fill="#7C3AED" radius={4} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Top Items and Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Selling Items */}
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Items</CardTitle>
            <CardDescription>Best performers today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topItems.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {item.quantity} sold • ${item.revenue}
                    </div>
                  </div>
                  <Badge variant="secondary">{item.percentage}%</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
            <CardDescription>Latest orders from today</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTransactions.map((transaction, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium text-sm">{transaction.id}</div>
                    <div className="text-xs text-muted-foreground">{transaction.time}</div>
                    <div className="text-sm">{transaction.items}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${transaction.amount}</div>
                    <Badge variant={transaction.payment === "Card" ? "default" : "secondary"} className="text-xs">
                      {transaction.payment}
                    </Badge>
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