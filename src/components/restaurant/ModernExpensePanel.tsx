
import React, { useState } from "react";
import { ArrowLeft, Plus, Filter, Search, DollarSign, Calendar, TrendingUp, FileText, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useExpenses } from "@/hooks/useExpenses";
import { ExpenseForm } from "./expense/ExpenseForm";
import { ExpenseList } from "./expense/ExpenseList";

export const ModernExpensePanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePeriod, setActivePeriod] = useState("month");
  const [activeTab, setActiveTab] = useState("expenses");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [showAddForm, setShowAddForm] = useState(false);
  const { toast } = useToast();
  
  const { expenses, categories, loading } = useExpenses();

  const handleBack = () => {
    setSearchParams({});
  };

  const handleAddExpense = () => {
    setShowAddForm(true);
  };

  const handleExport = () => {
    const csvContent = "data:text/csv;charset=utf-8," + 
      "Date,Description,Category,Amount,Payment Method,Status\n" +
      expenses.map(expense => 
        `${expense.date.toLocaleDateString()},"${expense.description}","${expense.category}",${expense.amount},"${expense.paymentMethod}","${expense.approvalStatus}"`
      ).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "expenses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Export Complete",
      description: "Expenses data exported successfully",
    });
  };

  // Filter expenses based on search and category
  const filteredExpenses = expenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || expense.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Calculate stats
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const pendingExpenses = filteredExpenses.filter(e => e.approvalStatus === 'pending').length;
  const thisMonthExpenses = filteredExpenses.filter(e => {
    const expenseMonth = e.date.getMonth();
    const currentMonth = new Date().getMonth();
    return expenseMonth === currentMonth;
  }).reduce((sum, expense) => sum + expense.amount, 0);

  const stats = [
    {
      title: "Total Expenses",
      value: `KSH ${totalExpenses.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Pending Approvals",
      value: pendingExpenses.toString(),
      icon: Calendar,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "This Month",
      value: `KSH ${thisMonthExpenses.toLocaleString()}`,
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Average Daily",
      value: `KSH ${Math.round(thisMonthExpenses / 30).toLocaleString()}`,
      icon: FileText,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const tabs = [
    { id: "expenses", label: "Expenses" },
    { id: "categories", label: "Categories" },
    { id: "reports", label: "Reports" },
    { id: "budget", label: "Budget" }
  ];

  const renderCategoriesContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => {
        const categoryExpenses = filteredExpenses.filter(e => e.category === category.name);
        const totalSpent = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
        const percentage = category.budget > 0 ? (totalSpent / category.budget) * 100 : 0;
        
        return (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Budget: KSH {category.budget.toLocaleString()}</p>
                <p className="text-lg font-bold" style={{ color: category.color }}>
                  KSH {totalSpent.toLocaleString()}
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full"
                    style={{ 
                      width: `${Math.min(100, percentage)}%`,
                      backgroundColor: category.color 
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500">{percentage.toFixed(1)}% of budget used</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setShowAddForm(false)}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Expenses
          </Button>
          <ExpenseForm onSuccess={() => setShowAddForm(false)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBack}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">Expense Management</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button onClick={handleAddExpense} className="bg-red-600 hover:bg-red-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Expense
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg border">
          <div className="border-b">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Search and Filter - Show for expenses and reports tabs */}
          {(activeTab === "expenses" || activeTab === "reports") && (
            <div className="p-6 border-b bg-gray-50">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search expenses..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {activeTab === "expenses" && (
              <ExpenseList expenses={filteredExpenses} />
            )}
            
            {activeTab === "categories" && renderCategoriesContent()}
            
            {activeTab === "reports" && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold">Expense Reports</h3>
                <ExpenseList expenses={filteredExpenses} />
              </div>
            )}
            
            {activeTab === "budget" && (
              <div className="text-center py-8">
                <p className="text-gray-500">Budget management functionality coming soon.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
