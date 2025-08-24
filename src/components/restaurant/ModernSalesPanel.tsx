import React, { useState } from "react";
import { ArrowLeft, Plus, Filter, Search, DollarSign, ShoppingCart, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { NewSaleForm } from "./forms/NewSaleForm";

export const ModernSalesPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activePeriod, setActivePeriod] = useState("today");
  const [activeTab, setActiveTab] = useState("transactions");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewSaleForm, setShowNewSaleForm] = useState(false);
  const { toast } = useToast();

  const handleBack = () => {
    setSearchParams({});
  };

  const handleAddSale = () => {
    setShowNewSaleForm(true);
  };

  const handleNewSaleSubmit = (saleData: any) => {
    console.log("New sale:", saleData);
    setShowNewSaleForm(false);
  };

  const handleFilter = () => {
    toast({
      title: "Filter",
      description: "Opening filter options...",
    });
  };

  if (showNewSaleForm) {
    return (
      <NewSaleForm 
        onBack={() => setShowNewSaleForm(false)}
        onSubmit={handleNewSaleSubmit}
      />
    );
  }

  const stats = [
    {
      title: "Today's Sales",
      value: "$2,450",
      change: "+12.5% from yesterday",
      icon: DollarSign,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Transactions",
      value: "48",
      change: "+8 from yesterday",
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Average Order",
      value: "$51.04",
      change: "+4.2% from yesterday",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Peak Hour",
      value: "2:00 PM",
      icon: Clock,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const periods = [
    { id: "today", label: "Today" },
    { id: "week", label: "This Week" },
    { id: "month", label: "This Month" },
    { id: "year", label: "This Year" }
  ];

  const tabs = [
    { id: "transactions", label: "Transactions" },
    { id: "customers", label: "Customers" },
    { id: "products", label: "Products" },
    { id: "payments", label: "Payments" }
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
            <h1 className="text-xl font-semibold text-gray-900">Sales Management</h1>
          </div>
          <Button onClick={handleAddSale} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            New Sale
          </Button>
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
                      <p className="text-xs text-green-600 mt-1">{stat.change}</p>
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
                  placeholder="Search transactions..."
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
            <p className="text-gray-500">Sales data will be displayed here based on the selected tab and period.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
