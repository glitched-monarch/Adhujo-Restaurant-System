
import { useState, useMemo } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DateRangeFilter, DateRange } from "@/components/common/DateRangeFilter";
import { isWithinInterval, format } from "date-fns";
import { KPICards } from "./financial/KPICards";
import { FinancialCharts } from "./financial/FinancialCharts";
import { TransactionTables } from "./financial/TransactionTables";

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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Financial Dashboard</h2>
        <p className="text-gray-600">Comprehensive financial overview and metrics</p>
      </div>

      <DateRangeFilter onDateRangeChange={setDateRange} />

      <KPICards financialSummary={financialSummary} />

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <FinancialCharts
            dailyData={dailyData}
            paymentMethodData={paymentMethodData}
            expenseCategoryData={expenseCategoryData}
            financialSummary={financialSummary}
          />
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <FinancialCharts
              dailyData={[]}
              paymentMethodData={paymentMethodData}
              expenseCategoryData={expenseCategoryData}
              financialSummary={financialSummary}
            />
          </div>
        </TabsContent>

        <TabsContent value="breakdown" className="space-y-4">
          <TransactionTables filteredData={filteredData} />
        </TabsContent>

        <TabsContent value="transactions" className="space-y-4">
          <TransactionTables filteredData={filteredData} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
