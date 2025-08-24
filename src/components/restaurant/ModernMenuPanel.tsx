
import React, { useState } from "react";
import { ArrowLeft, Plus, Filter, Search, Star, Eye, Utensils, DollarSign, Edit, Trash2, EyeIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const ModernMenuPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleBack = () => {
    setSearchParams({});
  };

  const handleAddItem = () => {
    toast({
      title: "Add Menu Item",
      description: "Opening add menu item form...",
    });
  };

  const handleViewItem = (itemName: string) => {
    toast({
      title: "View Item",
      description: `Viewing details for ${itemName}...`,
    });
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

  const stats = [
    {
      title: "Total Items",
      value: "45",
      icon: Star,
      color: "bg-purple-100 text-purple-600"
    },
    {
      title: "Active Items",
      value: "42",
      icon: Eye,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Categories",
      value: "8",
      icon: Utensils,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Avg Price",
      value: "$18.75",
      icon: DollarSign,
      color: "bg-orange-100 text-orange-600"
    }
  ];

  const categories = [
    { id: "all", label: "All (45)", active: true },
    { id: "pizza", label: "Pizza (12)" },
    { id: "seafood", label: "Seafood (8)" },
    { id: "salads", label: "Salads (6)" },
    { id: "beverages", label: "Beverages (15)" },
    { id: "desserts", label: "Desserts (4)" }
  ];

  const menuItems = [
    {
      name: "Classic Margherita Pizza",
      description: "Fresh mozzarella, tomato sauce, basil",
      price: "$18.99",
      category: "Pizza",
      cookTime: "15 min",
      calories: "850 cal",
      cost: "$7.50",
      margin: "61% margin",
      popular: true,
      image: "🍕"
    },
    {
      name: "Grilled Salmon",
      description: "Atlantic salmon with lemon herb seasoning",
      price: "$24.99",
      category: "Seafood",
      cookTime: "20 min",
      calories: "420 cal",
      cost: "$12",
      margin: "52% margin",
      popular: true,
      image: "🐟"
    },
    {
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with caesar dressing",
      price: "$12.99",
      category: "Salads",
      cookTime: "10 min",
      calories: "320 cal",
      cost: "$4.50",
      margin: "65% margin",
      popular: false,
      image: "🥗"
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
            <h1 className="text-xl font-semibold text-gray-900">Menu Management</h1>
          </div>
          <Button onClick={handleAddItem} className="bg-purple-600 hover:bg-purple-700">
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

        {/* Category Tabs */}
        <div className="bg-white rounded-lg border">
          <div className="border-b">
            <nav className="flex space-x-2 px-6 py-4 overflow-x-auto">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                    activeTab === category.id
                      ? "bg-gray-900 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  {category.label}
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

          {/* Menu Items */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item, index) => (
                <Card key={index} className="bg-white hover:shadow-md transition-shadow">
                  <CardContent className="p-0">
                    {item.popular && (
                      <Badge className="absolute top-4 left-4 z-10 bg-orange-500 text-white">
                        ⭐ Popular
                      </Badge>
                    )}
                    
                    {/* Image placeholder */}
                    <div className="h-48 bg-gray-200 rounded-t-lg flex items-center justify-center text-4xl">
                      {item.image}
                    </div>
                    
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-lg font-bold text-gray-900">{item.price}</p>
                      </div>
                      
                      <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          ⏱️ {item.cookTime}
                        </span>
                        <span>{item.calories}</span>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div>
                          <span className="text-gray-600">Cost: {item.cost}</span>
                          <span className="text-green-600 ml-2">{item.margin}</span>
                        </div>
                        <div className="flex gap-1">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleViewItem(item.name)}
                          >
                            <EyeIcon className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleEditItem(item.name)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleDeleteItem(item.name)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
