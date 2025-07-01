
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DollarSign, TrendingUp, TrendingDown, Calendar, Target } from "lucide-react";
import { ExpensePredictionPanel } from "./ExpensePredictionPanel";

interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  addedBy: string;
}

export const ExpensePanel = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {
      id: "1",
      description: "Grocery supplies",
      amount: 450.00,
      category: "Inventory",
      date: new Date("2024-01-05"),
      addedBy: "manager1"
    },
    {
      id: "2",
      description: "Utility bills",
      amount: 280.50,
      category: "Utilities",
      date: new Date("2024-01-05"),
      addedBy: "admin"
    },
    {
      id: "3",
      description: "Equipment maintenance",
      amount: 150.00,
      category: "Maintenance",
      date: new Date("2024-01-04"),
      addedBy: "manager1"
    }
  ]);

  const [newExpense, setNewExpense] = useState({
    description: "",
    amount: "",
    category: "Inventory"
  });

  // Mock sales data for CRM-style dashboard
  const todaysSales = 1650.00;
  const todaysExpenses = expenses
    .filter(expense => expense.date.toDateString() === new Date().toDateString())
    .reduce((sum, expense) => sum + expense.amount, 0);
  const todaysRevenue = todaysSales;
  const todaysProfit = todaysRevenue - todaysExpenses;

  const addExpense = () => {
    if (!newExpense.description || !newExpense.amount) return;

    const expense: Expense = {
      id: Date.now().toString(),
      description: newExpense.description,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: new Date(),
      addedBy: "current_user"
    };

    setExpenses([expense, ...expenses]);
    setNewExpense({ description: "", amount: "", category: "Inventory" });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Inventory": return "bg-blue-100 text-blue-800";
      case "Utilities": return "bg-yellow-100 text-yellow-800";
      case "Maintenance": return "bg-red-100 text-red-800";
      case "Marketing": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* CRM-Style Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Sales</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${todaysSales.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total sales today</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${todaysRevenue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Gross revenue</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${todaysExpenses.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Total expenses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Profit</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${todaysProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ${todaysProfit.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">Net profit</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="actual" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="actual" className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Actual Expenses
          </TabsTrigger>
          <TabsTrigger value="predictions" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Expense Predictions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="actual" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Add New Expense */}
            <Card>
              <CardHeader>
                <CardTitle>Log New Expense</CardTitle>
                <CardDescription>Record business expenses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input
                    id="description"
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                    placeholder="Enter expense description"
                  />
                </div>
                <div>
                  <Label htmlFor="amount">Amount</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select value={newExpense.category} onValueChange={(value) => setNewExpense({ ...newExpense, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Inventory">Inventory</SelectItem>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Maintenance">Maintenance</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button onClick={addExpense} className="w-full">
                  Add Expense
                </Button>
              </CardContent>
            </Card>

            {/* Expense Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Expense Summary</CardTitle>
                <CardDescription>Recent expense breakdown</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-sm">
                    <div className="flex justify-between mb-2">
                      <span>Today's Total:</span>
                      <span className="font-semibold">${todaysExpenses.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>This Week:</span>
                      <span className="font-semibold">${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Daily:</span>
                      <span className="font-semibold">${(expenses.reduce((sum, exp) => sum + exp.amount, 0) / 7).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Expense History */}
          <Card>
            <CardHeader>
              <CardTitle>Expense History</CardTitle>
              <CardDescription>Recent expense records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Added By</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenses.map((expense) => (
                    <TableRow key={expense.id}>
                      <TableCell>{expense.date.toLocaleDateString()}</TableCell>
                      <TableCell className="font-medium">{expense.description}</TableCell>
                      <TableCell>
                        <Badge className={getCategoryColor(expense.category)}>
                          {expense.category}
                        </Badge>
                      </TableCell>
                      <TableCell>${expense.amount.toFixed(2)}</TableCell>
                      <TableCell>{expense.addedBy}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions">
          <ExpensePredictionPanel />
        </TabsContent>
      </Tabs>
    </div>
  );
};
