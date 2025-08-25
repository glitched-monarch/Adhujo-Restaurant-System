
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Download, TrendingUp, DollarSign, Package, Users } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useSales } from "@/hooks/useSales";
import { useInventory } from "@/hooks/useInventory";
import { useExpenses } from "@/hooks/useExpenses";
import { useToast } from "@/hooks/use-toast";

export const ReportsOverview = () => {
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date()
  });
  const [reportType, setReportType] = useState("comprehensive");
  
  const { sales } = useSales();
  const { inventory } = useInventory();
  const { expenses } = useExpenses();
  const { toast } = useToast();

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
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
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Report Type</label>
                <Select value={reportType} onValueChange={setReportType}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="comprehensive">Comprehensive</SelectItem>
                    <SelectItem value="sales">Sales Only</SelectItem>
                    <SelectItem value="expenses">Expenses Only</SelectItem>
                    <SelectItem value="inventory">Inventory Only</SelectItem>
                  </SelectContent>
                </Select>
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

        {/* Expense Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {(() => {
                const expensesByCategory = filteredExpenses.reduce((acc, expense) => {
                  acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
                  return acc;
                }, {} as Record<string, number>);

                return Object.entries(expensesByCategory)
                  .sort(([,a], [,b]) => b - a)
                  .map(([category, amount]) => (
                    <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                      <p className="font-medium">{category}</p>
                      <p className="font-bold text-red-600">KSH {amount.toLocaleString()}</p>
                    </div>
                  ));
              })()}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
