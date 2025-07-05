
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Receipt, TrendingUp, TrendingDown, ShoppingCart } from "lucide-react";

interface FinancialSummary {
  totalSales: number;
  totalExpenses: number;
  grossProfit: number;
  profitMargin: number;
  transactionCount: number;
  averageTransaction: number;
}

interface KPICardsProps {
  financialSummary: FinancialSummary;
}

export const KPICards = ({ financialSummary }: KPICardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">KSH {financialSummary.totalSales.toFixed(0)}</div>
          <p className="text-xs text-muted-foreground">Revenue generated</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <Receipt className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">KSH {financialSummary.totalExpenses.toFixed(0)}</div>
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
            KSH {financialSummary.grossProfit.toFixed(0)}
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
          <div className="text-2xl font-bold">KSH {financialSummary.averageTransaction.toFixed(0)}</div>
          <p className="text-xs text-muted-foreground">{financialSummary.transactionCount} transactions</p>
        </CardContent>
      </Card>
    </div>
  );
};
