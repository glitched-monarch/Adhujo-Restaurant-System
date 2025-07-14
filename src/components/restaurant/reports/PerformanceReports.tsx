import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, RadialBarChart, RadialBar } from "recharts";
import { Target, Clock, TrendingUp, Users, ChefHat, Award, AlertCircle, CheckCircle } from "lucide-react";

export const PerformanceReports = () => {
  // Mock data - replace with API calls
  const kpiMetrics = [
    { title: "Order Accuracy", value: "97.8%", target: "95%", status: "excellent", icon: CheckCircle },
    { title: "Avg Service Time", value: "12 min", target: "15 min", status: "good", icon: Clock },
    { title: "Table Turnover", value: "3.2x", target: "3.0x", status: "good", icon: Users },
    { title: "Food Cost %", value: "28.5%", target: "30%", status: "excellent", icon: ChefHat },
  ];

  const serviceTimeData = [
    { day: "Mon", avgTime: 14, orders: 45 },
    { day: "Tue", avgTime: 13, orders: 52 },
    { day: "Wed", avgTime: 12, orders: 48 },
    { day: "Thu", avgTime: 15, orders: 41 },
    { day: "Fri", avgTime: 11, orders: 67 },
    { day: "Sat", avgTime: 10, orders: 78 },
    { day: "Sun", avgTime: 12, orders: 65 },
  ];

  const staffPerformance = [
    { name: "Maria Santos", role: "Head Chef", efficiency: 95, orders: 124, rating: 4.8 },
    { name: "John Smith", role: "Server", efficiency: 92, orders: 89, rating: 4.7 },
    { name: "Elena Rodriguez", role: "Cook", efficiency: 88, orders: 98, rating: 4.6 },
    { name: "David Kim", role: "Server", efficiency: 85, orders: 76, rating: 4.5 },
    { name: "Sarah Wilson", role: "Bartender", efficiency: 90, orders: 45, rating: 4.7 },
  ];

  const operationalMetrics = [
    { metric: "Kitchen Efficiency", current: 88, target: 85, color: "#10B981" },
    { metric: "Staff Productivity", current: 92, target: 90, color: "#4F46E5" },
    { metric: "Customer Satisfaction", current: 94, target: 90, color: "#7C3AED" },
    { metric: "Cost Control", current: 78, target: 80, color: "#F59E0B" },
  ];

  const dailyTargets = [
    { metric: "Sales Target", achieved: 2840, target: 3000, percentage: 94.7 },
    { metric: "Order Count", achieved: 42, target: 45, percentage: 93.3 },
    { metric: "Customer Rating", achieved: 4.6, target: 4.5, percentage: 102.2 },
    { metric: "Food Waste %", achieved: 2.1, target: 3.0, percentage: 130.0 },
  ];

  const qualityMetrics = [
    { issue: "Order Errors", count: 3, percentage: 2.1, trend: "down" },
    { issue: "Complaints", count: 1, percentage: 0.7, trend: "down" },
    { issue: "Returns", count: 2, percentage: 1.4, trend: "stable" },
    { issue: "Late Orders", count: 5, percentage: 3.5, trend: "up" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600 bg-green-50";
      case "good": return "text-blue-600 bg-blue-50";
      case "warning": return "text-orange-600 bg-orange-50";
      default: return "text-red-600 bg-red-50";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return CheckCircle;
      case "good": return CheckCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiMetrics.map((kpi, index) => {
          const StatusIcon = getStatusIcon(kpi.status);
          return (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                <StatusIcon className={`h-5 w-5 ${kpi.status === "excellent" || kpi.status === "good" ? "text-green-600" : "text-orange-600"}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <div className="text-xs text-muted-foreground">
                  Target: {kpi.target}
                </div>
                <Badge variant={kpi.status === "excellent" ? "default" : "secondary"} className="text-xs mt-1">
                  {kpi.status === "excellent" ? "Excellent" : "Good"}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Performance Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Service Time Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Service Time Performance</CardTitle>
            <CardDescription>Average service time and order volume</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={serviceTimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Line yAxisId="left" type="monotone" dataKey="avgTime" stroke="#4F46E5" strokeWidth={2} name="Avg Time (min)" />
                <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#10B981" strokeWidth={2} name="Orders" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Operational Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Operational Metrics</CardTitle>
            <CardDescription>Performance vs targets</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {operationalMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{metric.metric}</span>
                    <span>{metric.current}% (Target: {metric.target}%)</span>
                  </div>
                  <Progress value={metric.current} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Staff Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Staff Performance</CardTitle>
          <CardDescription>Individual team member performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Efficiency</TableHead>
                <TableHead>Orders Handled</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staffPerformance.map((staff, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{staff.name}</TableCell>
                  <TableCell>{staff.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Progress value={staff.efficiency} className="w-20 h-2" />
                      <span className="text-sm">{staff.efficiency}%</span>
                    </div>
                  </TableCell>
                  <TableCell>{staff.orders}</TableCell>
                  <TableCell>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 text-yellow-500 mr-1" />
                      {staff.rating}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={staff.efficiency >= 90 ? "default" : "secondary"}>
                      {staff.efficiency >= 90 ? "Excellent" : "Good"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Daily Targets & Quality Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Daily Targets */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Targets</CardTitle>
            <CardDescription>Progress towards daily goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dailyTargets.map((target, index) => (
                <div key={index} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">{target.metric}</span>
                    <Badge variant={target.percentage >= 100 ? "default" : "secondary"}>
                      {target.percentage.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2">
                    {target.metric === "Customer Rating" 
                      ? `${target.achieved} / ${target.target}`
                      : target.metric === "Food Waste %"
                      ? `${target.achieved}% / ${target.target}%`
                      : `${target.achieved} / ${target.target}`
                    }
                  </div>
                  <Progress 
                    value={Math.min(target.percentage, 100)} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quality Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Quality Metrics</CardTitle>
            <CardDescription>Service quality indicators</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {qualityMetrics.map((quality, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{quality.issue}</div>
                    <div className="text-sm text-muted-foreground">
                      {quality.count} incidents ({quality.percentage}% of orders)
                    </div>
                  </div>
                  <div className="flex items-center">
                    {quality.trend === "down" && <TrendingUp className="h-4 w-4 text-green-600 rotate-180 mr-1" />}
                    {quality.trend === "up" && <TrendingUp className="h-4 w-4 text-red-600 mr-1" />}
                    {quality.trend === "stable" && <div className="w-4 h-0.5 bg-gray-400 mr-1" />}
                    <Badge variant={quality.trend === "down" ? "default" : quality.trend === "up" ? "destructive" : "secondary"}>
                      {quality.trend}
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