
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

interface FinancialSummary {
  totalSales: number;
  totalExpenses: number;
  grossProfit: number;
  profitMargin: number;
  transactionCount: number;
  averageTransaction: number;
}

interface DailyData {
  date: string;
  sales: number;
  expenses: number;
  profit: number;
}

interface ChartData {
  name: string;
  value: number;
}

interface FinancialChartsProps {
  dailyData: DailyData[];
  paymentMethodData: ChartData[];
  expenseCategoryData: ChartData[];
  financialSummary: FinancialSummary;
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1'];

export const FinancialCharts = ({ 
  dailyData, 
  paymentMethodData, 
  expenseCategoryData, 
  financialSummary 
}: FinancialChartsProps) => {
  return (
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
              <Tooltip formatter={(value) => [`KSH ${Number(value).toFixed(0)}`, 'Amount']} />
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
              <Tooltip formatter={(value) => [`KSH ${Number(value).toFixed(0)}`, 'Amount']} />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};
