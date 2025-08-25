
import React, { useState } from "react";
import { ArrowLeft, Plus, Search, Package, AlertTriangle, TrendingDown, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { useFilteredInventory, InventoryFilters } from "@/hooks/useFilteredInventory";
import { NewInventoryForm } from "./forms/NewInventoryForm";
import { InventoryItemsTab } from "./inventory/InventoryItemsTab";
import { InventoryReportsTab } from "./inventory/InventoryReportsTab";

export const ModernInventoryPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("items");
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const { toast } = useToast();

  const [filters, setFilters] = useState<InventoryFilters>({
    search: "",
    category: "all",
    stockStatus: "all"
  });

  const {
    inventory,
    allInventory,
    categories,
    stockStats,
    loading,
    error,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
  } = useFilteredInventory(filters);

  const handleBack = () => {
    setSearchParams({});
  };

  const handleAddItem = () => {
    setShowNewItemForm(true);
  };

  const handleNewItemSubmit = async (itemData: any) => {
    try {
      await addInventoryItem(itemData);
      setShowNewItemForm(false);
      toast({
        title: "Success",
        description: "Inventory item added successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add inventory item",
        variant: "destructive"
      });
    }
  };

  const handleEditItem = (item: any) => {
    toast({
      title: "Edit Item",
      description: `Editing ${item.name}...`,
    });
  };

  const handleDeleteItem = async (id: string) => {
    try {
      await deleteInventoryItem(id);
      toast({
        title: "Success",
        description: "Item deleted successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete item",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Loading inventory...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div>Error loading inventory: {error}</div>
      </div>
    );
  }

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
      value: stockStats.total.toString(),
      icon: Package,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Low Stock Items",
      value: stockStats.low.toString(),
      icon: AlertTriangle,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Out of Stock",
      value: stockStats.out.toString(),
      icon: TrendingDown,
      color: "bg-red-100 text-red-600"
    },
    {
      title: "Good Stock",
      value: stockStats.good.toString(),
      icon: TrendingUp,
      color: "bg-green-100 text-green-600"
    }
  ];

  const tabs = [
    { id: "items", label: "Items" },
    { id: "categories", label: "Categories" },
    { id: "reports", label: "Reports" }
  ];

  const renderCategoriesContent = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category, index) => {
        const categoryItems = allInventory.filter(item => {
          const itemCategory = getItemCategory(item.name);
          return itemCategory === category;
        });
        const totalValue = categoryItems.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
        
        return (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{category}</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{categoryItems.length} items</p>
                <p className="text-lg font-bold text-green-600">KSH {totalValue.toLocaleString()}</p>
                <div className="flex flex-wrap gap-1">
                  {categoryItems.slice(0, 3).map((item, idx) => (
                    <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.name}
                    </span>
                  ))}
                  {categoryItems.length > 3 && (
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">
                      +{categoryItems.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

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

          {/* Search and Filter - Only show for items tab */}
          {activeTab === "items" && (
            <div className="p-6 border-b bg-gray-50">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search inventory items..."
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                    className="pl-10"
                  />
                </div>
                <Select 
                  value={filters.category} 
                  onValueChange={(value) => setFilters({ ...filters, category: value })}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select 
                  value={filters.stockStatus} 
                  onValueChange={(value) => setFilters({ ...filters, stockStatus: value as any })}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by stock" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stock</SelectItem>
                    <SelectItem value="good">Good Stock</SelectItem>
                    <SelectItem value="low">Low Stock</SelectItem>
                    <SelectItem value="out">Out of Stock</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {activeTab === "items" && (
              <InventoryItemsTab 
                inventory={inventory}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            )}
            
            {activeTab === "categories" && renderCategoriesContent()}
            
            {activeTab === "reports" && (
              <InventoryReportsTab inventory={allInventory} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const getItemCategory = (itemName: string): string => {
  const name = itemName.toLowerCase();
  if (name.includes('chicken') || name.includes('beef') || name.includes('fish')) return 'Meat & Fish';
  if (name.includes('lettuce') || name.includes('tomato') || name.includes('potato')) return 'Vegetables';  
  if (name.includes('oil') || name.includes('butter')) return 'Oils & Fats';
  if (name.includes('flour') || name.includes('sugar')) return 'Dry Goods';
  return 'Other';
};
