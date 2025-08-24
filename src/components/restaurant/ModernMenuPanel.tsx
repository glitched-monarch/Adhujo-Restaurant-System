import React, { useState } from "react";
import { ArrowLeft, Plus, Filter, Search, ChefHat, Clock, Star, DollarSign, Edit, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { NewMenuForm } from "./forms/NewMenuForm";

export const ModernMenuPanel = () => {
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
    console.log("New menu item:", itemData);
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
      <NewMenuForm 
        onBack={() => setShowNewItemForm(false)}
        onSubmit={handleNewItemSubmit}
      />
    );
  }

  const stats = [
    {
      title: "Total Items",
      value: "127",
      icon: ChefHat,
      color: "bg-orange-100 text-orange-600"
    },
    {
      title: "Active Items",
      value: "115",
      icon: Star,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Avg. Prep Time",
      value: "18 min",
      icon: Clock,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Avg. Price",
      value: "$24.50",
      icon: DollarSign,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const tabs = [
    { id: "items", label: "Menu Items" },
    { id: "categories", label: "Categories" },
    { id: "pricing", label: "Pricing" },
    { id: "analytics", label: "Analytics" }
  ];

  const menuItems = [
    {
      name: "Grilled Salmon",
      category: "Main Course",
      price: "$28.99",
      prepTime: "25 min",
      status: "active",
      orders: 45,
      rating: 4.8,
      description: "Fresh Atlantic salmon with herbs and lemon"
    },
    {
      name: "Caesar Salad",
      category: "Appetizer",
      price: "$12.99",
      prepTime: "10 min",
      status: "active",
      orders: 32,
      rating: 4.5,
      description: "Crisp romaine lettuce with parmesan and croutons"
    },
    {
      name: "Chocolate Cake",
      category: "Dessert",
      price: "$8.99",
      prepTime: "5 min",
      status: "unavailable",
      orders: 28,
      rating: 4.9,
      description: "Rich chocolate cake with vanilla ice cream"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-800";
      case "unavailable": return "bg-red-100 text-red-800";
      case "seasonal": return "bg-yellow-100 text-yellow-800";
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
            <h1 className="text-xl font-semibold text-gray-900">Menu Management</h1>
          </div>
          <Button onClick={handleAddItem} className="bg-orange-600 hover:bg-orange-700">
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
                  placeholder="Search menu items..."
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
              {menuItems.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.category}</p>
                      <p className="text-sm text-gray-500 mt-1">{item.description}</p>
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
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Price</p>
                      <p className="text-xl font-bold text-gray-900">{item.price}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Prep Time</p>
                      <p className="text-xl font-bold text-gray-900">{item.prepTime}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Orders Today</p>
                      <p className="text-xl font-bold text-gray-900">{item.orders}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Rating</p>
                      <p className="text-xl font-bold text-gray-900">{item.rating}/5</p>
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
