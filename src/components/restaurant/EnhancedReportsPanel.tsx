
import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DateRangeFilter, DateRange } from "@/components/common/DateRangeFilter";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { FileText, Download, TrendingUp, TrendingDown, Calculator, PieChart as PieChartIcon } from "lucide-react";
import { format, isWithinInterval } from "date-fns";

interface ReportData {
  profitLoss: {
    revenue: number;
    expenses: number;
    profit: number;
    period: string;
  }[];
  trialBalance: {
    account: string;
    debit: number;
    credit: number;
    balance: number;
  }[];
  cashFlow: {
    date: string;
    inflow: number;
    outflow: number;
    balance: number;
  }[];
  inventory: {
    item: string;
    opening: number;
    purchased: number;
    consumed: number;
    closing: number;
    value: number;
  }[];
}

const mockReportData: ReportData = {
  profitLoss: [
    { revenue: 5200, expenses: 3100, profit: 2100, period: "2024-01-01" },
    { revenue: 4800, expenses: 2900, profit: 1900, period: "2024-01-02" },
    { revenue: 6100, expenses: 3500, profit: 2600, period: "2024-01-03" },
    { revenue: 5500, expenses: 3200, profit: 2300, period: "2024-01-04" },
    { revenue: 5800, expenses: 3400, profit: 2400, period: "2024-01-05" },
  ],
  trialBalance: [
    { account: "Cash", debit: 15000, credit: 0, balance: 15000 },
    { account: "Sales Revenue", debit: 0, credit: 27400, balance: -27400 },
    { account: "Inventory", debit: 8500, credit: 0, balance: 8500 },
    { account: "Rent Expense", debit: 2500, credit: 0, balance: 2500 },
    { account: "Utilities Expense", debit: 800, credit: 0, balance: 800 },
    { account: "Food Cost", debit: 12000, credit: 0, balance: 12000 },
    { account: "Equipment", debit: 5000, credit: 0, balance: 5000 },
    { account: "Accounts Payable", debit: 0, credit: 3200, balance: -3200 },
  ],
  cashFlow: [
    { date: "2024-01-01", inflow: 5200, outflow: 3100, balance: 2100 },
    { date: "2024-01-02", inflow: 4800, outflow: 2900, balance: 4000 },
    { date: "2024-01-03", inflow: 6100, outflow: 3500, balance: 6600 },
    { date: "2024-01-04", inflow: 5500, outflow: 3200, balance: 8900 },
    { date: "2024-01-05", inflow: 5800, outflow: 3400, balance: 11300 },
  ],
  inventory: [
    { item: "Flour", opening: 100, purchased: 50, consumed: 75, closing: 75, value: 187.5 },
    { item: "Tomatoes", opening: 50, purchased: 30, consumed: 45, closing: 35, value: 105 },
    { item: "Cheese", opening: 25, purchased: 20, consumed: 30, closing: 15, value: 120 },
    { item: "Chicken", opening: 30, purchased: 25, consumed: 35, closing: 20, value: 240 },
    { item: "Rice", opening: 80, purchased: 40, consumed: 60, closing: 60, value: 120 },
  ]
};

export const EnhancedReportsPanel = () => {
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [reportType, setReportType] = useState<string>("overview");

  const filteredData = useMemo(() => {
    if (!dateRange) return mockReportData;
    // In a real app, you would filter based on date range
    return mockReportData;
  }, [dateRange]);

  const generateReport = (type: string) => {
    console.log(`Generating ${type} report...`);
    // In a real app, this would generate and download the report
  };

  const totals = useMemo(() => {
    const totalRevenue = filteredData.profitLoss.reduce((sum, item) => sum + item.revenue, 0);
    const totalExpenses = filteredData.profitLoss.reduce((sum, item) => sum + item.expenses, 0);
    const netProfit = totalRevenue - totalExpenses;
    const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
    
    return {
      totalRevenue,
      totalExpenses,
      netProfit,
      profitMargin
    };
  }, [filteredData]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Advanced Reports</h2>
          <p className="text-gray-600">TallyPrime-style comprehensive business reports</p>
        </div>
        <div className="flex gap-2">
          <Select value={reportType} onValueChange={setReportType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Report Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="overview">Overview</SelectItem>
              <SelectItem value="detailed">Detailed</SelectItem>
              <SelectItem value="summary">Summary</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => generateReport(reportType)} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <DateRangeFilter onDateRangeChange={setDateRange} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">${totals.totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Gross sales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">${totals.totalExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Operating costs</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <Calculator className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totals.netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${totals.netProfit.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">After expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Profit Margin</CardTitle>
            <PieChartIcon className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${totals.profitMargin >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {totals.profitMargin.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">Efficiency ratio</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="profit-loss" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profit-loss">P&L Statement</TabsTrigger>
          <TabsTrigger value="trial-balance">Trial Balance</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          <TabsTrigger value="inventory">Inventory Report</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="profit-loss" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Profit & Loss Statement
              </CardTitle>
              <CardDescription>Revenue and expense breakdown over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={filteredData.profitLoss}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="period" tickFormatter={(value) => format(new Date(value), 'MMM dd')} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
                    <Bar dataKey="expenses" fill="#ef4444" name="Expenses" />
                    <Bar dataKey="profit" fill="#3b82f6" name="Profit" />
                  </BarChart>
                </ResponsiveContainer>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Period</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Expenses</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Margin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.profitLoss.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(new Date(item.period), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="text-green-600 font-medium">${item.revenue.toFixed(2)}</TableCell>
                        <TableCell className="text-red-600 font-medium">${item.expenses.toFixed(2)}</TableCell>
                        <TableCell className={item.profit >= 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                          ${item.profit.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={item.profit >= 0 ? "default" : "destructive"}>
                            {((item.profit / item.revenue) * 100).toFixed(1)}%
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trial-balance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Trial Balance</CardTitle>
              <CardDescription>Account balances verification</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Account</TableHead>
                    <TableHead>Debit</TableHead>
                    <TableHead>Credit</TableHead>
                    <TableHead>Balance</TableHead>
                    <TableHead>Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.trialBalance.map((account, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{account.account}</TableCell>
                      <TableCell>{account.debit > 0 ? `$${account.debit.toFixed(2)}` : '-'}</TableCell>
                      <TableCell>{account.credit > 0 ? `$${account.credit.toFixed(2)}` : '-'}</TableCell>
                      <TableCell className={account.balance >= 0 ? 'text-green-600' : 'text-red-600'}>
                        ${Math.abs(account.balance).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={account.balance >= 0 ? "default" : "secondary"}>
                          {account.balance >= 0 ? 'Asset/Expense' : 'Liability/Revenue'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold border-t-2">
                    <TableCell>TOTALS</TableCell>
                    <TableCell>
                      ${filteredData.trialBalance.reduce((sum, acc) => sum + acc.debit, 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      ${filteredData.trialBalance.reduce((sum, acc) => sum + acc.credit, 0).toFixed(2)}
                    </TableCell>
                    <TableCell>-</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-flow" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Statement</CardTitle>
              <CardDescription>Money in and out of business</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredData.cashFlow}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(value) => format(new Date(value), 'MMM dd')} />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="inflow" stroke="#10b981" name="Inflow" strokeWidth={2} />
                    <Line type="monotone" dataKey="outflow" stroke="#ef4444" name="Outflow" strokeWidth={2} />
                    <Line type="monotone" dataKey="balance" stroke="#3b82f6" name="Balance" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Cash Inflow</TableHead>
                      <TableHead>Cash Outflow</TableHead>
                      <TableHead>Net Flow</TableHead>
                      <TableHead>Running Balance</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredData.cashFlow.map((flow, index) => (
                      <TableRow key={index}>
                        <TableCell>{format(new Date(flow.date), 'MMM dd, yyyy')}</TableCell>
                        <TableCell className="text-green-600">${flow.inflow.toFixed(2)}</TableCell>
                        <TableCell className="text-red-600">${flow.outflow.toFixed(2)}</TableCell>
                        <TableCell className={(flow.inflow - flow.outflow) >= 0 ? 'text-green-600' : 'text-red-600'}>
                          ${(flow.inflow - flow.outflow).toFixed(2)}
                        </TableCell>
                        <TableCell className="font-medium">${flow.balance.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inventory" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Valuation Report</CardTitle>
              <CardDescription>Stock movement and valuation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Opening Stock</TableHead>
                    <TableHead>Purchased</TableHead>
                    <TableHead>Consumed</TableHead>
                    <TableHead>Closing Stock</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredData.inventory.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-medium">{item.item}</TableCell>
                      <TableCell>{item.opening}</TableCell>
                      <TableCell className="text-blue-600">{item.purchased}</TableCell>
                      <TableCell className="text-orange-600">{item.consumed}</TableCell>
                      <TableCell className="font-medium">{item.closing}</TableCell>
                      <TableCell className="font-medium">${item.value.toFixed(2)}</TableCell>
                      <TableCell>
                        <Badge variant={item.closing < 20 ? "destructive" : item.closing < 50 ? "secondary" : "default"}>
                          {item.closing < 20 ? 'Low Stock' : item.closing < 50 ? 'Medium' : 'Good'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="font-bold border-t-2">
                    <TableCell>TOTALS</TableCell>
                    <TableCell>{filteredData.inventory.reduce((sum, item) => sum + item.opening, 0)}</TableCell>
                    <TableCell>{filteredData.inventory.reduce((sum, item) => sum + item.purchased, 0)}</TableCell>
                    <TableCell>{filteredData.inventory.reduce((sum, item) => sum + item.consumed, 0)}</TableCell>
                    <TableCell>{filteredData.inventory.reduce((sum, item) => sum + item.closing, 0)}</TableCell>
                    <TableCell>${filteredData.inventory.reduce((sum, item) => sum + item.value, 0).toFixed(2)}</TableCell>
                    <TableCell>-</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average Daily Revenue</span>
                    <span className="font-medium">${(totals.totalRevenue / 5).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Average Daily Expenses</span>
                    <span className="font-medium">${(totals.totalExpenses / 5).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Break-even Point</span>
                    <span className="font-medium">${(totals.totalExpenses).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Revenue Growth Rate</span>
                    <span className="font-medium text-green-600">+12.5%</span>
                  </div>
                </div>
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
                    <Badge variant={totals.profitMargin > 20 ? "default" : "secondary"}>
                      {totals.profitMargin > 20 ? 'Excellent' : 'Good'}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Cash Flow</span>
                    <Badge variant="default">Positive</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Expense Control</span>
                    <Badge variant="default">Well Managed</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Overall Score</span>
                    <Badge variant="default">85/100</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
