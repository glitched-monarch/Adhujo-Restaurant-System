
import React, { useState } from "react";
import { ArrowLeft, Plus, Filter, Search, DollarSign, Calendar, TrendingUp, FileText, Download } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const ModernExpensePanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePeriod, setActivePeriod] = useState("month");
  const [activeTab, setActiveTab] = useState("expenses");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleBack = () => {
    setSearchParams({});
  };

  const handleAddExpense = () => {
    toast({
      title: "Add Expense",
      description: "Opening add expense form...",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export",
      description: "Exporting expense data...",
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter",
      description: "Opening filter options...",
    });
  };

  const stats = [
    {
      title: "Total Expenses",
      value: "$9,700",
      change: "+12.5% from last month",
      icon: DollarSign,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Pending Approvals",
      value: "3",
      icon: Calendar,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "This Month",
      value: "$8,450",
      change: "-5.2% from last month",
      icon: TrendingUp,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Average Daily",
      value: "$281",
      icon: FileText,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const periods = [
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "quarter", label: "This Quarter" },
    { id: "year", label: "This Year" }
  ];

  const tabs = [
    { id: "expenses", label: "Expenses" },
    { id: "categories", label: "Categories" },
    { id: "reports", label: "Reports" },
    { id: "budget", label: "Budget" }
  ];

  const expenseCategories = [
    {
      category: "Food & Ingredients",
      amount: "$4,250",
      percentage: 35,
      color: "bg-green-500"
    },
    {
      category: "Staff",
      amount: "$5,200",
      percentage: 43,
      color: "bg-blue-500"
    },
    {
      category: "Utilities",
      amount: "$1,350",
      percentage: 11,
      color: "bg-yellow-500"
    },
    {
      category: "Equipment",
      amount: "$800",
      percentage: 7,
      color: "bg-purple-500"
    },
    {
      category: "Marketing",
      amount: "$500",
      percentage: 4,
      color: "bg-pink-500"
    }
  ];

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
        {/* Period Tabs */}
        <div className="flex gap-2">
          {periods.map((period) => (
            <button
              key={period.id}
              onClick={() => setActivePeriod(period.id)}
              className={`px-4 py-2 rounded-lg font-medium text-sm ${
                activePeriod === period.id
                  ? "bg-gray-900 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100 border"
              }`}
            >
              {period.label}
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    {stat.change && (
                      <p className={`text-xs mt-1 ${
                        stat.change.includes('+') ? 'text-red-600' : 'text-green-600'
                      }`}>
                        {stat.change}
                      </p>
                    )}
                  </div>
                  <div className={`p-3 rounded-full ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Expense Categories */}
        <Card className="bg-white">
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Expense Categories</h2>
            <div className="space-y-4">
              {expenseCategories.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">{item.category}</span>
                      <div className="text-right">
                        <span className="font-bold text-gray-900">{item.amount}</span>
                        <span className="text-sm text-gray-500 ml-2">{item.percentage}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`${item.color} h-2 rounded-full`}
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

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

          {/* Search and Filter */}
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
              <Button variant="outline" onClick={handleFilter}>
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="p-6">
            <p className="text-gray-500">Expense details will be displayed here based on the selected tab and filters.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
