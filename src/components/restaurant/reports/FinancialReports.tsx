import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, CreditCard, Banknote, Percent, Calculator } from "lucide-react";

export const FinancialReports = () => {
  // Mock data - replace with API calls
  const financialSummary = [
    { title: "Total Revenue", value: "$24,580", change: "+12.5%", trend: "up", icon: DollarSign },
    { title: "Total Expenses", value: "$18,420", change: "+8.2%", trend: "up", icon: Calculator },
    { title: "Net Profit", value: "$6,160", change: "+22.8%", trend: "up", icon: TrendingUp },
    { title: "Profit Margin", value: "25.1%", change: "+2.3%", trend: "up", icon: Percent },
  ];

  const monthlyData = [
    { month: "Jan", revenue: 22000, expenses: 16500, profit: 5500 },
    { month: "Feb", revenue: 24000, expenses: 17200, profit: 6800 },
    { month: "Mar", revenue: 26500, expenses: 18900, profit: 7600 },
    { month: "Apr", revenue: 23800, expenses: 17800, profit: 6000 },
    { month: "May", revenue: 28200, expenses: 19500, profit: 8700 },
    { month: "Jun", revenue: 24580, expenses: 18420, profit: 6160 },
  ];

  const expenseBreakdown = [
    { category: "Food Costs", amount: 8200, percentage: 44.5, color: "#4F46E5" },
    { category: "Labor", amount: 5500, percentage: 29.9, color: "#7C3AED" },
    { category: "Rent", amount: 2800, percentage: 15.2, color: "#EC4899" },
    { category: "Utilities", amount: 1200, percentage: 6.5, color: "#F59E0B" },
    { category: "Other", amount: 720, percentage: 3.9, color: "#10B981" },
  ];

  const paymentMethods = [
    { method: "Credit Card", amount: 15650, percentage: 63.7, transactions: 142 },
    { method: "Cash", amount: 6830, percentage: 27.8, transactions: 68 },
    { method: "Debit Card", amount: 1680, percentage: 6.8, transactions: 22 },
    { method: "Mobile Pay", amount: 420, percentage: 1.7, transactions: 8 },
  ];

  const dailyProfitLoss = [
    { date: "Mon", revenue: 3200, expenses: 2400, profit: 800 },
    { date: "Tue", revenue: 3800, expenses: 2850, profit: 950 },
    { date: "Wed", revenue: 4200, expenses: 3100, profit: 1100 },
    { date: "Thu", revenue: 3600, expenses: 2700, profit: 900 },
    { date: "Fri", revenue: 4800, expenses: 3520, profit: 1280 },
    { date: "Sat", revenue: 5200, expenses: 3800, profit: 1400 },
    { date: "Sun", revenue: 4780, expenses: 3450, profit: 1330 },
  ];

  return (
    <div className="space-y-6">
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {financialSummary.map((item, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
              <item.icon className="h-5 w-5 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{item.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {item.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-600" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-600" />
                )}
                {item.change} vs last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Revenue & Profit Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Financial Trend</CardTitle>
            <CardDescription>Revenue, expenses, and profit over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
                <Line type="monotone" dataKey="revenue" stroke="#4F46E5" strokeWidth={2} name="Revenue" />
                <Line type="monotone" dataKey="expenses" stroke="#EF4444" strokeWidth={2} name="Expenses" />
                <Line type="monotone" dataKey="profit" stroke="#10B981" strokeWidth={2} name="Profit" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
            <CardDescription>Where your money is being spent</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expenseBreakdown}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="amount"
                  label={({ category, percentage }) => `${category}: ${percentage}%`}
                >
                  {expenseBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Daily Profit & Loss */}
      <Card>
        <CardHeader>
          <CardTitle>Daily Profit & Loss</CardTitle>
          <CardDescription>Daily financial performance this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={dailyProfitLoss}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              <Bar dataKey="revenue" fill="#4F46E5" name="Revenue" />
              <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
              <Bar dataKey="profit" fill="#10B981" name="Profit" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Payment Methods & Expense Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Revenue breakdown by payment type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {paymentMethods.map((payment, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {payment.method === "Credit Card" && <CreditCard className="h-5 w-5 text-blue-600" />}
                    {payment.method === "Cash" && <Banknote className="h-5 w-5 text-green-600" />}
                    {payment.method === "Debit Card" && <CreditCard className="h-5 w-5 text-purple-600" />}
                    {payment.method === "Mobile Pay" && <CreditCard className="h-5 w-5 text-orange-600" />}
                    <div>
                      <div className="font-medium">{payment.method}</div>
                      <div className="text-sm text-muted-foreground">{payment.transactions} transactions</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold">${payment.amount.toLocaleString()}</div>
                    <Badge variant="secondary">{payment.percentage}%</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Expense Details */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Categories</CardTitle>
            <CardDescription>Detailed expense breakdown</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead className="text-right">%</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseBreakdown.map((expense, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{expense.category}</TableCell>
                    <TableCell className="text-right">${expense.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{expense.percentage}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};