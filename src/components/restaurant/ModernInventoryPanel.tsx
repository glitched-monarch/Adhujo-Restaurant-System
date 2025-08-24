import React, { useState } from "react";
import { ArrowLeft, Plus, Filter, Search, Package, AlertTriangle, TrendingDown, TrendingUp, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { NewInventoryForm } from "./forms/NewInventoryForm";

export const ModernInventoryPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("items");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const { toast } = useToast();

  const handleBack = () => {
    setSearchParams({});
  };

  const handleAddItem = () => {
    setShowNewItemForm(true);
  };

  const handleNewItemSubmit = (itemData: any) => {
    console.log("New inventory item:", itemData);
    setShowNewItemForm(false);
  };

  const handleEditItem = (itemName: string) => {
    toast({
      title: "Edit Item",
      description: `Editing ${itemName}...`,
    });
  };

  const handleDeleteItem = (itemName: string) => {
    toast({
      title: "Delete Item",
      description: `Are you sure you want to delete ${itemName}?`,
    });
  };

  const handleFilter = () => {
    toast({
      title: "Filter",
      description: "Opening filter options...",
    });
  };

  if (showNewItemForm) {
    return (
      <NewInventoryForm 
        onBack={() => setShowNewItemForm(false)}
        onSubmit={handleNewItemSubmit}
      />
    );
  }

  const stats = [
    {
      title: "Total Items",
      value: "245",
      icon: Package,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Low Stock Items",
      value: "15",
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Out of Stock",
      value: "3",
      icon: TrendingDown,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Total Value",
      value: "$12,450",
      icon: TrendingUp,
      color: "bg-green-100 text-green-600"
    }
  ];

  const tabs = [
    { id: "items", label: "Items" },
    { id: "categories", label: "Categories" },
    { id: "suppliers", label: "Suppliers" },
    { id: "reports", label: "Reports" }
  ];

  const items = [
    {
      name: "Chicken Breast",
      category: "Meat",
      supplier: "Fresh Foods Co.",
      currentStock: "25 kg",
      costPerUnit: "$8.99",
      total: "$224.75",
      lastRestocked: "2024-01-10",
      minStock: "50 kg",
      status: "low",
      stockLevel: 50
    },
    {
      name: "Tomatoes",
      category: "Vegetables",
      supplier: "Farm Fresh",
      currentStock: "80 kg",
      costPerUnit: "$3.50",
      total: "$280.00",
      lastRestocked: "2024-01-12",
      minStock: "30 kg",
      status: "good",
      stockLevel: 90
    },
    {
      name: "Olive Oil",
      category: "Oils",
      supplier: "Gourmet Supplies",
      currentStock: "5 bottles",
      costPerUnit: "$12.99",
      total: "$64.95",
      lastRestocked: "2024-01-08",
      minStock: "20 bottles",
      status: "critical",
      stockLevel: 25
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "good": return "bg-green-100 text-green-800";
      case "low": return "bg-yellow-100 text-yellow-800";
      case "critical": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

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
            <h1 className="text-xl font-semibold text-gray-900">Inventory Management</h1>
          </div>
          <Button onClick={handleAddItem} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
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

          {/* Search and Filter */}
          <div className="p-6 border-b bg-gray-50">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search inventory items..."
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

          {/* Content */}
          <div className="p-6">
            <div className="space-y-6">
              {items.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category} • {item.supplier}</p>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getStatusColor(item.status)}>
                        {item.status}
                      </Badge>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleEditItem(item.name)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteItem(item.name)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Current Stock</p>
                      <p className="text-xl font-bold text-gray-900">{item.currentStock}</p>
                      <Progress value={item.stockLevel} className="mt-2" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Cost per Unit</p>
                      <p className="text-xl font-bold text-gray-900">{item.costPerUnit}</p>
                      <p className="text-sm text-gray-500">Total: {item.total}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Last Restocked</p>
                      <p className="text-xl font-bold text-gray-900">{item.lastRestocked}</p>
                      <p className="text-sm text-gray-500">Min: {item.minStock}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
