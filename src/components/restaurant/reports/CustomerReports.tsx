import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Users, UserPlus, Star, Heart, Phone, Clock } from "lucide-react";

export const CustomerReports = () => {
  // Mock data - replace with API calls
  const customerMetrics = [
    { title: "Total Customers", value: "1,247", change: "+15.3%", icon: Users, color: "text-blue-600" },
    { title: "New Customers", value: "42", change: "+8.7%", icon: UserPlus, color: "text-green-600" },
    { title: "Avg Rating", value: "4.6", change: "+0.2", icon: Star, color: "text-yellow-600" },
    { title: "Repeat Rate", value: "68%", change: "+5.1%", icon: Heart, color: "text-purple-600" },
  ];

  const customerGrowth = [
    { month: "Jan", total: 1050, new: 85, returning: 965 },
    { month: "Feb", total: 1120, new: 92, returning: 1028 },
    { month: "Mar", total: 1185, new: 78, returning: 1107 },
    { month: "Apr", total: 1098, new: 65, returning: 1033 },
    { month: "May", total: 1203, new: 88, returning: 1115 },
    { month: "Jun", total: 1247, new: 89, returning: 1158 },
  ];

  const peakHours = [
    { hour: "11AM", customers: 24 },
    { hour: "12PM", customers: 45 },
    { hour: "1PM", customers: 52 },
    { hour: "2PM", customers: 38 },
    { hour: "6PM", customers: 67 },
    { hour: "7PM", customers: 78 },
    { hour: "8PM", customers: 65 },
    { hour: "9PM", customers: 42 },
  ];

  const topCustomers = [
    { name: "Sarah Johnson", visits: 28, spent: 2840, lastVisit: "Today", phone: "+1-555-0123" },
    { name: "Michael Chen", visits: 24, spent: 2380, lastVisit: "Yesterday", phone: "+1-555-0124" },
    { name: "Emma Wilson", visits: 22, spent: 2156, lastVisit: "2 days ago", phone: "+1-555-0125" },
    { name: "David Garcia", visits: 20, spent: 1980, lastVisit: "3 days ago", phone: "+1-555-0126" },
    { name: "Lisa Anderson", visits: 18, spent: 1850, lastVisit: "1 week ago", phone: "+1-555-0127" },
  ];

  const customerFeedback = [
    { category: "Service", rating: 4.7, reviews: 156 },
    { category: "Food Quality", rating: 4.6, reviews: 189 },
    { category: "Ambiance", rating: 4.4, reviews: 142 },
    { category: "Value", rating: 4.3, reviews: 134 },
    { category: "Cleanliness", rating: 4.8, reviews: 167 },
  ];

  const orderFrequency = [
    { segment: "Daily", customers: 45, percentage: 15.2 },
    { segment: "Weekly", customers: 128, percentage: 43.2 },
    { segment: "Monthly", customers: 98, percentage: 33.1 },
    { segment: "Occasional", customers: 25, percentage: 8.5 },
  ];

  return (
    <div className="space-y-6">
      {/* Customer Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {customerMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="text-xs text-muted-foreground">
                {metric.change} vs last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Growth */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New vs returning customers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={customerGrowth}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="new" fill="#4F46E5" name="New Customers" />
                <Bar dataKey="returning" fill="#10B981" name="Returning Customers" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Peak Customer Hours */}
        <Card>
          <CardHeader>
            <CardTitle>Peak Customer Hours</CardTitle>
            <CardDescription>Customer traffic throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={peakHours}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="customers" stroke="#7C3AED" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Customer Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Customers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Customers</CardTitle>
            <CardDescription>Most valuable customers this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{customer.name}</div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Phone className="h-3 w-3 mr-1" />
                      {customer.phone}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Last visit: {customer.lastVisit}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${customer.spent}</div>
                    <div className="text-sm text-muted-foreground">{customer.visits} visits</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Customer Feedback */}
        <Card>
          <CardHeader>
            <CardTitle>Customer Feedback</CardTitle>
            <CardDescription>Average ratings by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {customerFeedback.map((feedback, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="font-medium">{feedback.category}</div>
                    <div className="text-sm text-muted-foreground">{feedback.reviews} reviews</div>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="font-bold">{feedback.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Customer Segmentation */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Frequency Segmentation</CardTitle>
          <CardDescription>How often customers visit your restaurant</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {orderFrequency.map((segment, index) => (
              <div key={index} className="p-4 border rounded-lg text-center">
                <div className="text-2xl font-bold text-foreground">{segment.customers}</div>
                <div className="text-sm font-medium">{segment.segment} Visitors</div>
                <Badge variant="secondary" className="mt-2">
                  {segment.percentage}%
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Customer Insights Table */}
      <Card>
        <CardHeader>
          <CardTitle>Customer Insights Summary</CardTitle>
          <CardDescription>Detailed customer analytics</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Metric</TableHead>
                <TableHead>This Month</TableHead>
                <TableHead>Last Month</TableHead>
                <TableHead>Change</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Average Order Value</TableCell>
                <TableCell>$67.80</TableCell>
                <TableCell>$64.20</TableCell>
                <TableCell className="text-green-600">+5.6%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Customer Retention Rate</TableCell>
                <TableCell>68%</TableCell>
                <TableCell>65%</TableCell>
                <TableCell className="text-green-600">+3.0%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Average Visit Frequency</TableCell>
                <TableCell>2.3 times/week</TableCell>
                <TableCell>2.1 times/week</TableCell>
                <TableCell className="text-green-600">+9.5%</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Customer Satisfaction</TableCell>
                <TableCell>4.6/5</TableCell>
                <TableCell>4.4/5</TableCell>
                <TableCell className="text-green-600">+4.5%</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};