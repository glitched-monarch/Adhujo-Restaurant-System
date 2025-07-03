
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DateRangeFilter, DateRange } from "@/components/common/DateRangeFilter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Receipt, ShoppingCart, Users } from "lucide-react";
import { isWithinInterval, format } from "date-fns";

interface FinancialData {
  sales: Array<{
    id: string;
    date: Date;
    amount: number;
    paymentMethod: string;
    items: number;
  }>;
  expenses: Array<{
    id: string;
    date: Date;
    amount: number;
    category: string;
    description: string;
  }>;
}

const mockFinancialData: FinancialData = {
  sales: [
    { id: "1", date: new Date("2024-01-05"), amount: 450.00, paymentMethod: "cash", items: 3 },
    { id: "2", date: new Date("2024-01-05"), amount: 280.50, paymentMethod: "card", items: 2 },
    { id: "3", date: new Date("2024-01-04"), amount: 350.00, paymentMethod: "digital", items: 4 },
    { id: "4", date: new Date("2024-01-04"), amount: 520.75, paymentMethod: "cash", items: 5 },
    { id: "5", date: new Date("2024-01-03"), amount: 190.25, paymentMethod: "card", items: 2 },
  ],
  expenses: [
    { id: "1", date: new Date("2024-01-05"), amount: 450.00, category: "Inventory", description: "Grocery supplies" },
    { id: "2", date: new Date("2024-01-05"), amount: 280.50, category: "Utilities", description: "Electricity bill" },
    { id: "3", date: new Date("2024-01-04"), amount: 150.00, category: "Maintenance", description: "Equipment repair" },
    { id: "4", date: new Date("2024-01-03"), amount: 200.00, category: "Marketing", description: "Social media ads" },
  ]
};

export const FinancialDashboard = () => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const filteredData = useMemo(() => {
    if (!dateRange) return mockFinancialData;
    
    return {
      sales: mockFinancialData.sales.filter(sale => 
        isWithinInterval(sale.date, { start: dateRange.from, end: dateRange.to })
      ),
      expenses: mockFinancialData.expenses.filter(expense => 
        isWithinInterval(expense.date, { start: dateRange.from, end: dateRange.to })
      )
    };
  }, [dateRange]);

  const financialSummary = useMemo(() => {
    const totalSales = filteredData.sales.reduce((sum, sale) => sum + sale.amount, 0);
    const totalExpenses = filteredData.expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const grossProfit = totalSales - totalExpenses;
    const profitMargin = totalSales > 0 ? (grossProfit / totalSales) * 100 : 0;
    
    return {
      totalSales,
      totalExpenses,
      grossProfit,
      profitMargin,
      transactionCount: filteredData.sales.length,
      averageTransaction: totalSales / (filteredData.sales.length || 1)
    };
  }, [filteredData]);

  const dailyData = useMemo(() => {
    const dailyMap = new Map<string, { sales: number; expenses: number; profit: number }>();
    
    filteredData.sales.forEach(sale => {
      const dateKey = format(sale.date, 'yyyy-MM-dd');
      const existing = dailyMap.get(dateKey) || { sales: 0, expenses: 0, profit: 0 };
      existing.sales += sale.amount;
      dailyMap.set(dateKey, existing);
    });
    
    filteredData.expenses.forEach(expense => {
      const dateKey = format(expense.date, 'yyyy-MM-dd');
      const existing = dailyMap.get(dateKey) || { sales: 0, expenses: 0, profit: 0 };
      existing.expenses += expense.amount;
      dailyMap.set(dateKey, existing);
    });
    
    return Array.from(dailyMap.entries()).map(([date, data]) => ({
      date,
      sales: data.sales,
      expenses: data.expenses,
      profit: data.sales - data.expenses
    })).sort((a, b) => a.date.localeCompare(b.date));
  }, [filteredData]);

  const paymentMethodData = useMemo(() => {
    const methodMap = new Map<string, number>();
    filteredData.sales.forEach(sale => {
      methodMap.set(sale.paymentMethod, (methodMap.get(sale.paymentMethod) || 0) + sale.amount);
    });
    
    return Array.from(methodMap.entries()).map(([method, amount]) => ({
      name: method.charAt(0).toUpperCase() + method.slice(1),
      value: amount
    }));
  }, [filteredData]);

  const expenseCategoryData = useMemo(() => {
    const categoryMap = new Map<string, number>();
    filteredData.expenses.forEach(expense => {
      categoryMap.set(expense.category, (categoryMap.get(expense.category) || 0) + expense.amount);
    });
    
    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      name: category,
      value: amount
    }));
  }, [filteredData]);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial Dashboard</h2>
        <p className="text-gray-600">TallyPrime-style comprehensive financial overview</p>
      </div>

      <DateRangeFilter onDateRangeChange={setDateRange} />

      {/* Key Performance Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialSummary.totalSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Revenue generated</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <Receipt className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialSummary.totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Business expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Gross Profit</CardTitle>
            {financialSummary.grossProfit >= 0 ? 
              <TrendingUp className="h-4 w-4 text-green-600" /> : 
              <TrendingDown className="h-4 w-4 text-red-600" />
            }
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${financialSummary.grossProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${financialSummary.grossProfit.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              {financialSummary.profitMargin.toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Transaction</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${financialSummary.averageTransaction.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">{financialSummary.transactionCount} transactions</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Daily Financial Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={dailyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="sales" fill="#8884d8" name="Sales" />
                    <Bar dataKey="expenses" fill="#82ca9d" name="Expenses" />
                    <Bar dataKey="profit" fill="#ffc658" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Financial Health Score</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Profitability</span>
                    <Badge variant={financialSummary.profitMargin > 20 ? "default" : 
                                 financialSummary.profitMargin > 10 ? "secondary" : "destructive"}>
                      {financialSummary.profitMargin.toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Sales Consistency</span>
                    <Badge variant="secondary">Good</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Expense Control</span>
                    <Badge variant={financialSummary.totalExpenses / financialSummary.totalSales < 0.7 ? "default" : "secondary"}>
                      {financialSummary.totalExpenses > 0 ? 
                        ((financialSummary.totalExpenses / financialSummary.totalSales) * 100).toFixed(1) + '%' : 
                        '0%'
                      }
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={paymentMethodData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {paymentMethodData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseCategoryData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      fill="#82ca9d"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseCategoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${Number(value).toFixed(2)}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sales Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Items</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.sales.slice(0, 5).map((sale) => (
                      <TableRow key={sale.id}>
                        <TableCell>{format(sale.date, 'MMM dd')}</TableCell>
                        <TableCell>${sale.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">{sale.paymentMethod}</Badge>
                        </TableCell>
                        <TableCell>{sale.items}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Expense Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Description</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.expenses.slice(0, 5).map((expense) => (
                      <TableRow key={expense.id}>
                        <TableCell>{format(expense.date, 'MMM dd')}</TableCell>
                        <TableCell>${expense.amount.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{expense.category}</Badge>
                        </TableCell>
                        <TableCell className="max-w-32 truncate">{expense.description}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete transaction history with filtering</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    ...filteredData.sales.map(sale => ({
                      id: sale.id,
                      date: sale.date,
                      type: 'Sale',
                      description: `${sale.items} items - ${sale.paymentMethod}`,
                      category: 'Revenue',
                      amount: sale.amount,
                      status: 'Completed'
                    })),
                    ...filteredData.expenses.map(expense => ({
                      id: expense.id,
                      date: expense.date,
                      type: 'Expense',
                      description: expense.description,
                      category: expense.category,
                      amount: -expense.amount,
                      status: 'Paid'
                    }))
                  ]
                  .sort((a, b) => b.date.getTime() - a.date.getTime())
                  .slice(0, 10)
                  .map((transaction) => (
                    <TableRow key={`${transaction.type}-${transaction.id}`}>
                      <TableCell>{format(transaction.date, 'MMM dd, yyyy')}</TableCell>
                      <TableCell>
                        <Badge variant={transaction.type === 'Sale' ? 'default' : 'secondary'}>
                          {transaction.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${Math.abs(transaction.amount).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{transaction.status}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
