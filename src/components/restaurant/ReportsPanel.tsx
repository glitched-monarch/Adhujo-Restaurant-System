
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, DollarSign, Package, TrendingUp, TrendingDown, FileText } from "lucide-react";

export const ReportsPanel = () => {
  // Mock data for demonstration
  const dailySales = [
    { date: "2024-01-01", sales: 1250.00, orders: 45 },
    { date: "2024-01-02", sales: 1380.50, orders: 52 },
    { date: "2024-01-03", sales: 1100.75, orders: 38 },
    { date: "2024-01-04", sales: 1520.25, orders: 58 },
    { date: "2024-01-05", sales: 1650.00, orders: 62 },
  ];

  const topItems = [
    { name: "Margherita Pizza", sold: 125, revenue: 1875.00 },
    { name: "Caesar Salad", sold: 98, revenue: 1176.00 },
    { name: "Chicken Burger", sold: 87, revenue: 1305.00 },
    { name: "Pasta Carbonara", sold: 76, revenue: 1140.00 },
    { name: "Fish & Chips", sold: 65, revenue: 975.00 },
  ];

  // Financial statement mock data
  const balanceSheetData = {
    assets: {
      current: {
        cash: 15000,
        inventory: 8500,
        accountsReceivable: 2500,
      },
      fixed: {
        equipment: 45000,
        furniture: 12000,
        buildingImprovements: 25000,
      }
    },
    liabilities: {
      current: {
        accountsPayable: 3500,
        shortTermDebt: 5000,
        accruedExpenses: 2000,
      },
      longTerm: {
        longTermDebt: 35000,
        equipmentLoans: 15000,
      }
    },
    equity: {
      ownerEquity: 40000,
      retainedEarnings: 7500,
    }
  };

  const incomeStatementData = {
    revenue: {
      foodSales: 125000,
      beverageSales: 35000,
      otherRevenue: 2500,
    },
    expenses: {
      costOfGoodsSold: 65000,
      labor: 45000,
      rent: 12000,
      utilities: 8500,
      marketing: 3500,
      insurance: 2400,
      depreciation: 4200,
      otherExpenses: 3800,
    }
  };

  const cashFlowData = {
    operating: {
      netIncome: 17600,
      depreciation: 4200,
      accountsReceivableChange: -1500,
      inventoryChange: -800,
      accountsPayableChange: 1200,
    },
    investing: {
      equipmentPurchases: -8000,
      furniturePurchases: -2500,
    },
    financing: {
      loanProceeds: 0,
      loanPayments: -3600,
      ownerDrawings: -2000,
    }
  };

  const totalRevenue = dailySales.reduce((sum, day) => sum + day.sales, 0);
  const totalOrders = dailySales.reduce((sum, day) => sum + day.orders, 0);
  const averageOrderValue = totalRevenue / totalOrders;

  const calculateTotal = (obj: Record<string, any>): number => {
    return Object.values(obj).reduce((sum: number, value: unknown) => {
      if (typeof value === 'number') return sum + value;
      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        return sum + calculateTotal(value as Record<string, any>);
      }
      return sum;
    }, 0);
  };

  const totalAssets = calculateTotal(balanceSheetData.assets);
  const totalLiabilities = calculateTotal(balanceSheetData.liabilities);
  const totalEquity = calculateTotal(balanceSheetData.equity);

  const totalRevenues = calculateTotal(incomeStatementData.revenue);
  const totalExpenses = calculateTotal(incomeStatementData.expenses);
  const netIncome = totalRevenues - totalExpenses;

  const operatingCashFlow = calculateTotal(cashFlowData.operating);
  const investingCashFlow = calculateTotal(cashFlowData.investing);
  const financingCashFlow = calculateTotal(cashFlowData.financing);
  const netCashFlow = operatingCashFlow + investingCashFlow + financingCashFlow;

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Last 5 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Last 5 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${averageOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Income</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${netIncome.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="balance-sheet">Balance Sheet</TabsTrigger>
          <TabsTrigger value="income-statement">Income Statement</TabsTrigger>
          <TabsTrigger value="cash-flow">Cash Flow</TabsTrigger>
          <TabsTrigger value="export">Export</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Daily Sales Report */}
            <Card>
              <CardHeader>
                <CardTitle>Daily Sales Report</CardTitle>
                <CardDescription>Sales performance by day</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {dailySales.map((day) => (
                      <TableRow key={day.date}>
                        <TableCell>{new Date(day.date).toLocaleDateString()}</TableCell>
                        <TableCell>{day.orders}</TableCell>
                        <TableCell>${day.sales.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Top Selling Items */}
            <Card>
              <CardHeader>
                <CardTitle>Top Selling Items</CardTitle>
                <CardDescription>Best performing menu items</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Sold</TableHead>
                      <TableHead>Revenue</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {topItems.map((item) => (
                      <TableRow key={item.name}>
                        <TableCell className="font-medium">{item.name}</TableCell>
                        <TableCell>{item.sold}</TableCell>
                        <TableCell>${item.revenue.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="balance-sheet">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Balance Sheet
              </CardTitle>
              <CardDescription>Statement of financial position as of current date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Assets */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Assets</h3>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Current Assets</h4>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Cash</TableCell>
                          <TableCell className="text-right">${balanceSheetData.assets.current.cash.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Inventory</TableCell>
                          <TableCell className="text-right">${balanceSheetData.assets.current.inventory.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Accounts Receivable</TableCell>
                          <TableCell className="text-right">${balanceSheetData.assets.current.accountsReceivable.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow className="border-t-2">
                          <TableCell className="font-medium">Total Current Assets</TableCell>
                          <TableCell className="text-right font-medium">${calculateTotal(balanceSheetData.assets.current).toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Fixed Assets</h4>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Equipment</TableCell>
                          <TableCell className="text-right">${balanceSheetData.assets.fixed.equipment.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Furniture</TableCell>
                          <TableCell className="text-right">${balanceSheetData.assets.fixed.furniture.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Building Improvements</TableCell>
                          <TableCell className="text-right">${balanceSheetData.assets.fixed.buildingImprovements.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow className="border-t-2">
                          <TableCell className="font-medium">Total Fixed Assets</TableCell>
                          <TableCell className="text-right font-medium">${calculateTotal(balanceSheetData.assets.fixed).toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="border-t-2 pt-2">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-bold text-lg">TOTAL ASSETS</TableCell>
                          <TableCell className="text-right font-bold text-lg">${totalAssets.toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* Liabilities & Equity */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Liabilities & Equity</h3>
                  
                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Current Liabilities</h4>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Accounts Payable</TableCell>
                          <TableCell className="text-right">${balanceSheetData.liabilities.current.accountsPayable.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Short-term Debt</TableCell>
                          <TableCell className="text-right">${balanceSheetData.liabilities.current.shortTermDebt.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Accrued Expenses</TableCell>
                          <TableCell className="text-right">${balanceSheetData.liabilities.current.accruedExpenses.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow className="border-t-2">
                          <TableCell className="font-medium">Total Current Liabilities</TableCell>
                          <TableCell className="text-right font-medium">${calculateTotal(balanceSheetData.liabilities.current).toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Long-term Liabilities</h4>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Long-term Debt</TableCell>
                          <TableCell className="text-right">${balanceSheetData.liabilities.longTerm.longTermDebt.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Equipment Loans</TableCell>
                          <TableCell className="text-right">${balanceSheetData.liabilities.longTerm.equipmentLoans.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow className="border-t-2">
                          <TableCell className="font-medium">Total Long-term Liabilities</TableCell>
                          <TableCell className="text-right font-medium">${calculateTotal(balanceSheetData.liabilities.longTerm).toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-muted-foreground mb-2">Equity</h4>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell>Owner's Equity</TableCell>
                          <TableCell className="text-right">${balanceSheetData.equity.ownerEquity.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Retained Earnings</TableCell>
                          <TableCell className="text-right">${balanceSheetData.equity.retainedEarnings.toLocaleString()}</TableCell>
                        </TableRow>
                        <TableRow className="border-t-2">
                          <TableCell className="font-medium">Total Equity</TableCell>
                          <TableCell className="text-right font-medium">${totalEquity.toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>

                  <div className="border-t-2 pt-2">
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-bold text-lg">TOTAL LIABILITIES & EQUITY</TableCell>
                          <TableCell className="text-right font-bold text-lg">${(totalLiabilities + totalEquity).toLocaleString()}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="income-statement">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Income Statement
              </CardTitle>
              <CardDescription>Statement of operations for the current period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl">
                <Table>
                  <TableBody>
                    <TableRow className="border-b-2">
                      <TableCell className="font-bold text-lg" colSpan={2}>REVENUE</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Food Sales</TableCell>
                      <TableCell className="text-right">${incomeStatementData.revenue.foodSales.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Beverage Sales</TableCell>
                      <TableCell className="text-right">${incomeStatementData.revenue.beverageSales.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Other Revenue</TableCell>
                      <TableCell className="text-right">${incomeStatementData.revenue.otherRevenue.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Total Revenue</TableCell>
                      <TableCell className="text-right font-bold">${totalRevenues.toLocaleString()}</TableCell>
                    </TableRow>
                    
                    <TableRow className="border-b-2 border-t-4">
                      <TableCell className="font-bold text-lg" colSpan={2}>EXPENSES</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Cost of Goods Sold</TableCell>
                      <TableCell className="text-right">${incomeStatementData.expenses.costOfGoodsSold.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Labor</TableCell>
                      <TableCell className="text-right">${incomeStatementData.expenses.labor.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Rent</TableCell>
                      <TableCell className="text-right">${incomeStatementData.expenses.rent.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Utilities</TableCell>
                      <TableCell className="text-right">${incomeStatementData.expenses.utilities.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Marketing</TableCell>
                      <TableCell className="text-right">${incomeStatementData.expenses.marketing.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Insurance</TableCell>
                      <TableCell className="text-right">${incomeStatementData.expenses.insurance.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Depreciation</TableCell>
                      <TableCell className="text-right">${incomeStatementData.expenses.depreciation.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Other Expenses</TableCell>
                      <TableCell className="text-right">${incomeStatementData.expenses.otherExpenses.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Total Expenses</TableCell>
                      <TableCell className="text-right font-bold">${totalExpenses.toLocaleString()}</TableCell>
                    </TableRow>
                    
                    <TableRow className="border-t-4">
                      <TableCell className="font-bold text-lg">NET INCOME</TableCell>
                      <TableCell className={`text-right font-bold text-lg ${netIncome >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${netIncome.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cash-flow">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5" />
                Cash Flow Statement
              </CardTitle>
              <CardDescription>Statement of cash flows for the current period</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="max-w-2xl">
                <Table>
                  <TableBody>
                    <TableRow className="border-b-2">
                      <TableCell className="font-bold text-lg" colSpan={2}>OPERATING ACTIVITIES</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Net Income</TableCell>
                      <TableCell className="text-right">${cashFlowData.operating.netIncome.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Depreciation</TableCell>
                      <TableCell className="text-right">${cashFlowData.operating.depreciation.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Change in Accounts Receivable</TableCell>
                      <TableCell className="text-right">${cashFlowData.operating.accountsReceivableChange.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Change in Inventory</TableCell>
                      <TableCell className="text-right">${cashFlowData.operating.inventoryChange.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Change in Accounts Payable</TableCell>
                      <TableCell className="text-right">${cashFlowData.operating.accountsPayableChange.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Net Cash from Operating Activities</TableCell>
                      <TableCell className={`text-right font-bold ${operatingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${operatingCashFlow.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="border-b-2 border-t-4">
                      <TableCell className="font-bold text-lg" colSpan={2}>INVESTING ACTIVITIES</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Equipment Purchases</TableCell>
                      <TableCell className="text-right">${cashFlowData.investing.equipmentPurchases.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Furniture Purchases</TableCell>
                      <TableCell className="text-right">${cashFlowData.investing.furniturePurchases.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Net Cash from Investing Activities</TableCell>
                      <TableCell className={`text-right font-bold ${investingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${investingCashFlow.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="border-b-2 border-t-4">
                      <TableCell className="font-bold text-lg" colSpan={2}>FINANCING ACTIVITIES</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Loan Proceeds</TableCell>
                      <TableCell className="text-right">${cashFlowData.financing.loanProceeds.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Loan Payments</TableCell>
                      <TableCell className="text-right">${cashFlowData.financing.loanPayments.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Owner Drawings</TableCell>
                      <TableCell className="text-right">${cashFlowData.financing.ownerDrawings.toLocaleString()}</TableCell>
                    </TableRow>
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Net Cash from Financing Activities</TableCell>
                      <TableCell className={`text-right font-bold ${financingCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${financingCashFlow.toLocaleString()}
                      </TableCell>
                    </TableRow>
                    
                    <TableRow className="border-t-4">
                      <TableCell className="font-bold text-lg">NET CHANGE IN CASH</TableCell>
                      <TableCell className={`text-right font-bold text-lg ${netCashFlow >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        ${netCashFlow.toLocaleString()}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="export">
          <Card>
            <CardHeader>
              <CardTitle>Export Reports</CardTitle>
              <CardDescription>Generate and download financial reports</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="startDate">Start Date</Label>
                  <Input id="startDate" type="date" />
                </div>
                <div>
                  <Label htmlFor="endDate">End Date</Label>
                  <Input id="endDate" type="date" />
                </div>
                <div className="flex items-end">
                  <Button className="w-full">Generate Reports</Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline">Export Balance Sheet PDF</Button>
                <Button variant="outline">Export Income Statement PDF</Button>
                <Button variant="outline">Export Cash Flow PDF</Button>
                <Button variant="outline">Export Sales CSV</Button>
                <Button variant="outline">Export Inventory CSV</Button>
                <Button variant="outline">Export Full Financial Package</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
