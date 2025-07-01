
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, DollarSign, TrendingUp, AlertTriangle } from "lucide-react";

interface ExpensePrediction {
  id: string;
  category: string;
  subcategory: string;
  description: string;
  predictedAmount: number;
  actualAmount?: number;
  period: string;
  dateCreated: Date;
  notes?: string;
  variance?: number;
}

export const ExpensePredictionPanel = () => {
  const [predictions, setPredictions] = useState<ExpensePrediction[]>([
    {
      id: "1",
      category: "Inventory",
      subcategory: "Food Supplies",
      description: "Monthly food inventory purchase",
      predictedAmount: 15000,
      actualAmount: 14200,
      period: "2024-01",
      dateCreated: new Date("2024-01-01"),
      notes: "Based on last 3 months average",
      variance: 800
    },
    {
      id: "2",
      category: "Utilities",
      subcategory: "Electricity",
      description: "Monthly electricity bill",
      predictedAmount: 1200,
      actualAmount: 1350,
      period: "2024-01",
      dateCreated: new Date("2024-01-01"),
      variance: -150
    },
    {
      id: "3",
      category: "Taxes",
      subcategory: "Sales Tax",
      description: "Monthly sales tax payment",
      predictedAmount: 2800,
      period: "2024-02",
      dateCreated: new Date("2024-02-01"),
      notes: "Estimated based on projected sales"
    }
  ]);

  const [newPrediction, setNewPrediction] = useState({
    category: "Inventory",
    subcategory: "",
    description: "",
    predictedAmount: "",
    period: "",
    notes: ""
  });

  const categories = {
    "Inventory": ["Food Supplies", "Beverages", "Disposables", "Cleaning Supplies"],
    "Utilities": ["Electricity", "Gas", "Water", "Internet", "Phone"],
    "Taxes": ["Sales Tax", "Income Tax", "Property Tax", "Payroll Tax"],
    "Labor": ["Wages", "Benefits", "Training", "Uniforms"],
    "Marketing": ["Advertising", "Promotions", "Social Media", "Print Materials"],
    "Maintenance": ["Equipment Repair", "Facility Maintenance", "Software Updates"],
    "Insurance": ["General Liability", "Property Insurance", "Workers Comp"],
    "Professional Services": ["Accounting", "Legal", "Consulting"]
  };

  const addPrediction = () => {
    if (!newPrediction.category || !newPrediction.subcategory || !newPrediction.description || !newPrediction.predictedAmount || !newPrediction.period) {
      return;
    }

    const prediction: ExpensePrediction = {
      id: Date.now().toString(),
      category: newPrediction.category,
      subcategory: newPrediction.subcategory,
      description: newPrediction.description,
      predictedAmount: parseFloat(newPrediction.predictedAmount),
      period: newPrediction.period,
      dateCreated: new Date(),
      notes: newPrediction.notes
    };

    setPredictions([prediction, ...predictions]);
    setNewPrediction({
      category: "Inventory",
      subcategory: "",
      description: "",
      predictedAmount: "",
      period: "",
      notes: ""
    });
  };

  const totalPredicted = predictions
    .filter(p => p.period === "2024-02")
    .reduce((sum, p) => sum + p.predictedAmount, 0);

  const totalActual = predictions
    .filter(p => p.period === "2024-01" && p.actualAmount)
    .reduce((sum, p) => sum + (p.actualAmount || 0), 0);

  const totalVariance = predictions
    .filter(p => p.variance !== undefined)
    .reduce((sum, p) => sum + (p.variance || 0), 0);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Inventory": return "bg-blue-100 text-blue-800";
      case "Utilities": return "bg-yellow-100 text-yellow-800";
      case "Taxes": return "bg-red-100 text-red-800";
      case "Labor": return "bg-green-100 text-green-800";
      case "Marketing": return "bg-purple-100 text-purple-800";
      case "Maintenance": return "bg-orange-100 text-orange-800";
      case "Insurance": return "bg-indigo-100 text-indigo-800";
      case "Professional Services": return "bg-pink-100 text-pink-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getVarianceColor = (variance?: number) => {
    if (variance === undefined) return "text-gray-500";
    return variance >= 0 ? "text-green-600" : "text-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Month Predicted</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalPredicted.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">February 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Month Actual</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalActual.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">January 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Variance</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getVarianceColor(totalVariance)}`}>
              ${Math.abs(totalVariance).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {totalVariance >= 0 ? "Under budget" : "Over budget"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Predictions Made</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{predictions.length}</div>
            <p className="text-xs text-muted-foreground">Total predictions</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Prediction */}
        <Card>
          <CardHeader>
            <CardTitle>Create Expense Prediction</CardTitle>
            <CardDescription>Predict future expenses by category (Admin Only)</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={newPrediction.category} onValueChange={(value) => {
                  setNewPrediction({ ...newPrediction, category: value, subcategory: "" });
                }}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(categories).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subcategory">Subcategory</Label>
                <Select 
                  value={newPrediction.subcategory} 
                  onValueChange={(value) => setNewPrediction({ ...newPrediction, subcategory: value })}
                  disabled={!newPrediction.category}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select subcategory" />
                  </SelectTrigger>
                  <SelectContent>
                    {newPrediction.category && categories[newPrediction.category as keyof typeof categories]?.map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                value={newPrediction.description}
                onChange={(e) => setNewPrediction({ ...newPrediction, description: e.target.value })}
                placeholder="Enter expense description"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="amount">Predicted Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={newPrediction.predictedAmount}
                  onChange={(e) => setNewPrediction({ ...newPrediction, predictedAmount: e.target.value })}
                  placeholder="0.00"
                />
              </div>
              <div>
                <Label htmlFor="period">Period (YYYY-MM)</Label>
                <Input
                  id="period"
                  type="month"
                  value={newPrediction.period}
                  onChange={(e) => setNewPrediction({ ...newPrediction, period: e.target.value })}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={newPrediction.notes}
                onChange={(e) => setNewPrediction({ ...newPrediction, notes: e.target.value })}
                placeholder="Additional notes or assumptions"
                rows={3}
              />
            </div>

            <Button onClick={addPrediction} className="w-full">
              Create Prediction
            </Button>
          </CardContent>
        </Card>

        {/* Category Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
            <CardDescription>Current month expense predictions by category</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.keys(categories).map((category) => {
                const categoryTotal = predictions
                  .filter(p => p.category === category && p.period === "2024-02")
                  .reduce((sum, p) => sum + p.predictedAmount, 0);
                
                if (categoryTotal === 0) return null;

                return (
                  <div key={category} className="flex justify-between items-center p-3 border rounded">
                    <div>
                      <Badge className={getCategoryColor(category)}>
                        {category}
                      </Badge>
                    </div>
                    <div className="font-semibold">
                      ${categoryTotal.toLocaleString()}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Predictions History */}
      <Card>
        <CardHeader>
          <CardTitle>Expense Predictions History</CardTitle>
          <CardDescription>All expense predictions with actual vs predicted comparison</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Period</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Subcategory</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Predicted</TableHead>
                <TableHead>Actual</TableHead>
                <TableHead>Variance</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {predictions.map((prediction) => (
                <TableRow key={prediction.id}>
                  <TableCell>{prediction.period}</TableCell>
                  <TableCell>
                    <Badge className={getCategoryColor(prediction.category)}>
                      {prediction.category}
                    </Badge>
                  </TableCell>
                  <TableCell>{prediction.subcategory}</TableCell>
                  <TableCell className="max-w-xs truncate" title={prediction.description}>
                    {prediction.description}
                  </TableCell>
                  <TableCell>${prediction.predictedAmount.toLocaleString()}</TableCell>
                  <TableCell>
                    {prediction.actualAmount ? `$${prediction.actualAmount.toLocaleString()}` : "-"}
                  </TableCell>
                  <TableCell className={getVarianceColor(prediction.variance)}>
                    {prediction.variance !== undefined 
                      ? `${prediction.variance >= 0 ? '+' : ''}$${Math.abs(prediction.variance).toLocaleString()}`
                      : "-"
                    }
                  </TableCell>
                  <TableCell>
                    {prediction.actualAmount ? (
                      <Badge variant={prediction.variance && prediction.variance >= 0 ? "default" : "destructive"}>
                        {prediction.variance && prediction.variance >= 0 ? "Under Budget" : "Over Budget"}
                      </Badge>
                    ) : (
                      <Badge variant="outline">Pending</Badge>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
