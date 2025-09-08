
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, Download, TrendingUp, DollarSign, Package, Users, ArrowLeft, TrendingDown, AlertTriangle } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useSales } from "@/hooks/useSales";
import { useInventory } from "@/hooks/useInventory";
import { useExpenses } from "@/hooks/useExpenses";
import { useToast } from "@/hooks/use-toast";
import { useSearchParams } from "react-router-dom";

export const ReportsOverview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  
  const { sales } = useSales();
  const { inventory } = useInventory();
  const { expenses } = useExpenses();
  const { toast } = useToast();

  const handleBack = () => {
    setSearchParams({});
  };

  // Filter data by date range
  const filteredSales = sales.filter(sale => {
    const saleDate = new Date(sale.timestamp);
    return saleDate >= dateRange.from && saleDate <= dateRange.to;
  });

  const filteredExpenses = expenses.filter(expense => {
    return expense.date >= dateRange.from && expense.date <= dateRange.to;
  });

  // Calculate metrics
  const totalRevenue = filteredSales.reduce((sum, sale) => sum + sale.total, 0);
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const netProfit = totalRevenue - totalExpenses;
  const totalInventoryValue = inventory.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock).length;

  const handleExport = () => {
    const reportData = {
      dateRange: `${format(dateRange.from, 'PPP')} - ${format(dateRange.to, 'PPP')}`,
      totalRevenue,
      totalExpenses,
      netProfit,
      totalInventoryValue,
      lowStockItems,
      salesCount: filteredSales.length,
      expensesCount: filteredExpenses.length,
      inventoryItems: inventory.length
    };

    const csvContent = "data:text/csv;charset=utf-8," + 
      "Metric,Value\n" +
      Object.entries(reportData).map(([key, value]) => `${key},${value}`).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `report_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "Report exported successfully",
    });
  };

  const stats = [
    {
      title: "Total Revenue",
      value: `KSH ${totalRevenue.toLocaleString()}`,
      change: "+12.5% from last period",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Total Expenses",
      value: `KSH ${totalExpenses.toLocaleString()}`,
      change: "+8.2% from last period",
      icon: TrendingUp,
      color: "text-red-600"
    },
    {
      title: "Net Profit",
      value: `KSH ${netProfit.toLocaleString()}`,
      change: netProfit >= 0 ? "+15.3% from last period" : "-5.1% from last period",
      icon: DollarSign,
      color: netProfit >= 0 ? "text-green-600" : "text-red-600"
    },
    {
      title: "Inventory Value",
      value: `KSH ${totalInventoryValue.toLocaleString()}`,
      change: `${lowStockItems} items low stock`,
      icon: Package,
      color: "text-blue-600"
    }
  ];

  // Demo expense breakdown data
  const expenseBreakdown = [
    { category: "Food & Ingredients", amount: 45000, percentage: 35, trend: "+5%" },
    { category: "Staff Salaries", amount: 38000, percentage: 30, trend: "+2%" },
    { category: "Utilities", amount: 15200, percentage: 12, trend: "-3%" },
    { category: "Rent", amount: 20000, percentage: 15, trend: "0%" },
    { category: "Equipment", amount: 8500, percentage: 7, trend: "+12%" },
    { category: "Marketing", amount: 3300, percentage: 3, trend: "+8%" }
  ];

  const salesAnalytics = {
    totalOrders: filteredSales.length,
    averageOrderValue: filteredSales.length > 0 ? totalRevenue / filteredSales.length : 0,
    peakHours: "12:00 PM - 2:00 PM",
    popularPaymentMethod: "Cash",
    customerSatisfaction: 4.2,
    repeatCustomers: 65
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={handleBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          </div>
          <Button onClick={handleExport}>
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex gap-4 items-end">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-64 justify-start text-left font-normal",
                        !dateRange && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="range"
                      selected={{ from: dateRange.from, to: dateRange.to }}
                      onSelect={(range) => {
                        if (range?.from && range?.to) {
                          setDateRange({ from: range.from, to: range.to });
                        }
                      }}
                      numberOfMonths={2}
                      className="p-3 pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <stat.icon className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="profit-loss">P&L Statement</TabsTrigger>
            <TabsTrigger value="sales">Sales Reports</TabsTrigger>
            <TabsTrigger value="inventory">Inventory Reports</TabsTrigger>
            <TabsTrigger value="expenses">Expense Reports</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Sales Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">{filteredSales.length}</p>
                    <p className="text-sm text-gray-600">Total Sales</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-blue-600">
                      KSH {filteredSales.length > 0 ? Math.round(totalRevenue / filteredSales.length).toLocaleString() : 0}
                    </p>
                    <p className="text-sm text-gray-600">Average Sale</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-600">
                      {filteredSales.reduce((sum, sale) => sum + sale.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0)}
                    </p>
                    <p className="text-sm text-gray-600">Items Sold</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Top Selling Items */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(() => {
                    const itemSales = filteredSales.reduce((acc, sale) => {
                      sale.items.forEach(item => {
                        if (!acc[item.name]) {
                          acc[item.name] = { quantity: 0, revenue: 0 };
                        }
                        acc[item.name].quantity += item.quantity;
                        acc[item.name].revenue += item.totalPrice * item.quantity;
                      });
                      return acc;
                    }, {} as Record<string, { quantity: number; revenue: number }>);

                    return Object.entries(itemSales)
                      .sort(([,a], [,b]) => b.quantity - a.quantity)
                      .slice(0, 5)
                      .map(([name, data]) => (
                        <div key={name} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div>
                            <p className="font-medium">{name}</p>
                            <p className="text-sm text-gray-600">{data.quantity} units sold</p>
                          </div>
                          <p className="font-bold text-green-600">KSH {data.revenue.toLocaleString()}</p>
                        </div>
                      ));
                  })()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profit-loss" className="space-y-6">
            {/* P&L Statement */}
            <Card>
              <CardHeader>
                <CardTitle>Profit & Loss Statement</CardTitle>
                <p className="text-sm text-gray-600">
                  {format(dateRange.from, 'MMM dd, yyyy')} - {format(dateRange.to, 'MMM dd, yyyy')}
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Revenue Section */}
                  <div>
                    <h3 className="font-semibold text-lg text-green-700 mb-3">Revenue</h3>
                    <div className="space-y-2 ml-4">
                      <div className="flex justify-between">
                        <span>Food Sales</span>
                        <span className="font-medium">KSH {Math.round(totalRevenue * 0.85).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Beverage Sales</span>
                        <span className="font-medium">KSH {Math.round(totalRevenue * 0.15).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-green-700">
                        <span>Total Revenue</span>
                        <span>KSH {totalRevenue.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Cost of Goods Sold */}
                  <div>
                    <h3 className="font-semibold text-lg text-orange-700 mb-3">Cost of Goods Sold</h3>
                    <div className="space-y-2 ml-4">
                      <div className="flex justify-between">
                        <span>Food Costs</span>
                        <span className="font-medium">KSH {Math.round(totalRevenue * 0.32).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Beverage Costs</span>
                        <span className="font-medium">KSH {Math.round(totalRevenue * 0.08).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-orange-700">
                        <span>Total COGS</span>
                        <span>KSH {Math.round(totalRevenue * 0.40).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Gross Profit */}
                  <div className="bg-blue-50 p-4 rounded">
                    <div className="flex justify-between font-bold text-blue-700 text-lg">
                      <span>Gross Profit</span>
                      <span>KSH {Math.round(totalRevenue * 0.60).toLocaleString()}</span>
                    </div>
                    <p className="text-sm text-blue-600">Gross Margin: 60%</p>
                  </div>

                  {/* Operating Expenses */}
                  <div>
                    <h3 className="font-semibold text-lg text-red-700 mb-3">Operating Expenses</h3>
                    <div className="space-y-2 ml-4">
                      <div className="flex justify-between">
                        <span>Staff Salaries</span>
                        <span className="font-medium">KSH 38,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rent</span>
                        <span className="font-medium">KSH 20,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Utilities</span>
                        <span className="font-medium">KSH 15,200</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Equipment & Maintenance</span>
                        <span className="font-medium">KSH 8,500</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Marketing</span>
                        <span className="font-medium">KSH 3,300</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Other Expenses</span>
                        <span className="font-medium">KSH {Math.max(0, totalExpenses - 85000).toLocaleString()}</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-bold text-red-700">
                        <span>Total Operating Expenses</span>
                        <span>KSH {totalExpenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  {/* Net Profit */}
                  <div className={`p-4 rounded ${netProfit >= 0 ? 'bg-green-50' : 'bg-red-50'}`}>
                    <div className={`flex justify-between font-bold text-xl ${netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                      <span>Net Profit</span>
                      <span>KSH {netProfit.toLocaleString()}</span>
                    </div>
                    <p className={`text-sm ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      Net Margin: {totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0}%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sales" className="space-y-6">
            {/* Comprehensive Sales Reports */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Total Sales</span>
                      <span className="font-bold">{filteredSales.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Revenue</span>
                      <span className="font-bold text-green-600">KSH {totalRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Order Value</span>
                      <span className="font-bold">KSH {filteredSales.length > 0 ? Math.round(totalRevenue / filteredSales.length).toLocaleString() : 0}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Daily Average</span>
                      <span className="font-bold">KSH {Math.round(totalRevenue / 30).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Best Day</span>
                      <span className="font-bold text-green-600">KSH 15,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth Rate</span>
                      <span className="font-bold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Hours</span>
                      <span className="font-bold">12:00 - 14:00</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sales by Category</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Main Dishes</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div className="bg-blue-600 h-3 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <span className="text-sm font-medium">45%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Beverages</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div className="bg-green-600 h-3 rounded-full" style={{ width: '25%' }}></div>
                        </div>
                        <span className="text-sm font-medium">25%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Appetizers</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div className="bg-yellow-600 h-3 rounded-full" style={{ width: '20%' }}></div>
                        </div>
                        <span className="text-sm font-medium">20%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Desserts</span>
                      <div className="flex items-center gap-2">
                        <div className="w-32 bg-gray-200 rounded-full h-3">
                          <div className="bg-purple-600 h-3 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <span className="text-sm font-medium">10%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods and Customer Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Cash</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-green-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                        </div>
                        <span className="text-sm">65%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>M-Pesa</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <span className="text-sm">30%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Card</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
                        </div>
                        <span className="text-sm">5%</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Customer Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Unique Customers</span>
                      <span className="font-bold">287</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Repeat Customers</span>
                      <span className="font-bold text-green-600">65%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Customer Satisfaction</span>
                      <span className="font-bold text-green-600">4.2/5</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Visit Frequency</span>
                      <span className="font-bold">2.3 times/month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Selling Items */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {(() => {
                    const itemSales = filteredSales.reduce((acc, sale) => {
                      sale.items.forEach(item => {
                        if (!acc[item.name]) {
                          acc[item.name] = { quantity: 0, revenue: 0 };
                        }
                        acc[item.name].quantity += item.quantity;
                        acc[item.name].revenue += item.totalPrice * item.quantity;
                      });
                      return acc;
                    }, {} as Record<string, { quantity: number; revenue: number }>);

                    return Object.entries(itemSales)
                      .sort(([,a], [,b]) => b.quantity - a.quantity)
                      .slice(0, 10)
                      .map(([name, data], index) => (
                        <div key={name} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                          <div className="flex items-center gap-3">
                            <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </span>
                            <div>
                              <p className="font-medium">{name}</p>
                              <p className="text-sm text-gray-600">{data.quantity} units sold</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-green-600">KSH {data.revenue.toLocaleString()}</p>
                            <p className="text-sm text-gray-500">KSH {Math.round(data.revenue / data.quantity).toLocaleString()}/unit</p>
                          </div>
                        </div>
                      ));
                  })()}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            {/* Inventory Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Items</span>
                      <span className="font-bold">{inventory.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total Value</span>
                      <span className="font-bold text-blue-600">KSH {totalInventoryValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Low Stock Items</span>
                      <span className="font-bold text-yellow-600">{lowStockItems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Out of Stock</span>
                      <span className="font-bold text-red-600">{inventory.filter(item => item.quantity === 0).length}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Stock Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Good Stock</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-3">
                          <div className="bg-green-600 h-3 rounded-full" style={{ 
                            width: `${inventory.length > 0 ? Math.round(((inventory.length - lowStockItems) / inventory.length) * 100) : 0}%` 
                          }}></div>
                        </div>
                        <span className="text-sm">{inventory.length - lowStockItems}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Low Stock</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-3">
                          <div className="bg-yellow-600 h-3 rounded-full" style={{ 
                            width: `${inventory.length > 0 ? Math.round((lowStockItems / inventory.length) * 100) : 0}%` 
                          }}></div>
                        </div>
                        <span className="text-sm">{lowStockItems}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Turnover Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Fast Moving</span>
                      <span className="font-bold text-green-600">42%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Medium Moving</span>
                      <span className="font-bold text-yellow-600">38%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Slow Moving</span>
                      <span className="font-bold text-red-600">20%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Category Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Inventory by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded">
                    <Package className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-blue-600">24</p>
                    <p className="text-sm text-blue-800">Meat & Fish</p>
                    <p className="text-xs text-blue-600">KSH {Math.round(totalInventoryValue * 0.35).toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded">
                    <Package className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-green-600">18</p>
                    <p className="text-sm text-green-800">Vegetables</p>
                    <p className="text-xs text-green-600">KSH {Math.round(totalInventoryValue * 0.25).toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded">
                    <Package className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-yellow-600">15</p>
                    <p className="text-sm text-yellow-800">Dry Goods</p>
                    <p className="text-xs text-yellow-600">KSH {Math.round(totalInventoryValue * 0.20).toLocaleString()}</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded">
                    <Package className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-2xl font-bold text-purple-600">12</p>
                    <p className="text-sm text-purple-800">Other</p>
                    <p className="text-xs text-purple-600">KSH {Math.round(totalInventoryValue * 0.20).toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-600" />
                  Low Stock Alert
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {inventory.filter(item => item.quantity <= item.minStock).slice(0, 8).map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-gray-600">Current: {item.quantity} {item.unit} | Min: {item.minStock} {item.unit}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-yellow-700">Reorder</p>
                        <p className="text-sm text-yellow-600">Suggested: {item.minStock * 3}</p>
                      </div>
                    </div>
                  ))}
                  {inventory.filter(item => item.quantity <= item.minStock).length === 0 && (
                    <p className="text-center text-gray-500 py-4">All items are well stocked!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Expense Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {expenseBreakdown.map((expense, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                        <div>
                          <p className="font-medium">{expense.category}</p>
                          <p className="text-sm text-gray-600">{expense.percentage}% of total</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-red-600">KSH {expense.amount.toLocaleString()}</p>
                          <p className={`text-sm ${expense.trend.startsWith('+') ? 'text-red-500' : expense.trend.startsWith('-') ? 'text-green-500' : 'text-gray-500'}`}>
                            {expense.trend}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expense Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>This Month</span>
                      <span className="font-bold text-red-600">KSH {totalExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Month</span>
                      <span className="font-bold">KSH 118,450</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Monthly</span>
                      <span className="font-bold">KSH 125,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Variance</span>
                      <span className="font-bold text-green-600">-5.4%</span>
                    </div>
                    <div className="mt-4 p-3 bg-yellow-50 rounded">
                      <p className="text-sm text-yellow-800">
                        <AlertTriangle className="h-4 w-4 inline mr-1" />
                        Food costs are 8% above budget this month
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Orders</span>
                      <span className="font-bold">{salesAnalytics.totalOrders}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Avg Order Value</span>
                      <span className="font-bold">KSH {Math.round(salesAnalytics.averageOrderValue).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Peak Hours</span>
                      <span className="font-bold">{salesAnalytics.peakHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Repeat Customers</span>
                      <span className="font-bold text-green-600">{salesAnalytics.repeatCustomers}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Revenue Growth</span>
                      <span className="font-bold text-green-600">+12.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Profit Margin</span>
                      <span className="font-bold">{totalRevenue > 0 ? Math.round((netProfit / totalRevenue) * 100) : 0}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost Control</span>
                      <span className="font-bold text-yellow-600">Fair</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Efficiency Score</span>
                      <span className="font-bold text-green-600">85/100</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Inventory Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Total Items</span>
                      <span className="font-bold">{inventory.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Low Stock Items</span>
                      <span className="font-bold text-yellow-600">{lowStockItems}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Inventory Value</span>
                      <span className="font-bold">KSH {totalInventoryValue.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Turnover Rate</span>
                      <span className="font-bold text-green-600">Good</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded border-l-4 border-blue-400">
                    <p className="text-sm text-blue-800">
                      <TrendingUp className="h-4 w-4 inline mr-1" />
                      Consider promoting high-margin items during peak hours to increase profitability.
                    </p>
                  </div>
                  <div className="p-3 bg-yellow-50 rounded border-l-4 border-yellow-400">
                    <p className="text-sm text-yellow-800">
                      <AlertTriangle className="h-4 w-4 inline mr-1" />
                      Food costs are above average. Review supplier contracts and portion sizes.
                    </p>
                  </div>
                  <div className="p-3 bg-green-50 rounded border-l-4 border-green-400">
                    <p className="text-sm text-green-800">
                      <TrendingUp className="h-4 w-4 inline mr-1" />
                      Strong repeat customer rate. Consider implementing a loyalty program.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
