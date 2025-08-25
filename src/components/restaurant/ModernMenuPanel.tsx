
import React, { useState } from "react";
import { ArrowLeft, Plus, Filter, Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { NewMenuForm } from "./forms/NewMenuForm";
import { useFilteredMenuItems, MenuFilters } from "@/hooks/useFilteredMenuItems";
import { MenuItemsTab } from "./menu/MenuItemsTab";
import { CategoriesTab } from "./menu/CategoriesTab";
import { PricingTab } from "./menu/PricingTab";
import { AnalyticsTab } from "./menu/AnalyticsTab";

export const ModernMenuPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("items");
  const [showNewItemForm, setShowNewItemForm] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

  const [filters, setFilters] = useState<MenuFilters>({
    search: "",
    category: "all",
    availability: "all",
    priceRange: null
  });

  const {
    menuItems,
    categories,
    priceStats,
    loading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
  } = useFilteredMenuItems(filters);

  const handleBack = () => {
    setSearchParams({});
  };

  const handleAddItem = () => {
    setShowNewItemForm(true);
  };

  const handleNewItemSubmit = async (itemData: any) => {
    try {
      await addMenuItem(itemData);
      setShowNewItemForm(false);
      toast({
        title: "Success",
        description: "Menu item added successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add menu item",
      });
    }
  };

  const handleEditItem = (item: any) => {
    toast({
      title: "Edit Item",
      description: `Editing ${item.name}...`,
    });
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await deleteMenuItem(id);
      toast({
        title: "Success",
        description: "Menu item deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete menu item",
      });
    }
  };

  const handleFilterChange = (key: keyof MenuFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (showNewItemForm) {
    return (
      <NewMenuForm 
        onBack={() => setShowNewItemForm(false)}
        onSubmit={handleNewItemSubmit}
      />
    );
  }

  if (loading) {
    return <div>Loading menu items...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const tabs = [
    { id: "items", label: "Menu Items" },
    { id: "categories", label: "Categories" },
    { id: "pricing", label: "Pricing" },
    { id: "analytics", label: "Analytics" }
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
          <Button onClick={handleAddItem} className="bg-orange-600 hover:bg-orange-700">
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Items</p>
                  <p className="text-2xl font-bold text-gray-900">{menuItems.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Categories</p>
                  <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Price</p>
                  <p className="text-2xl font-bold text-gray-900">KSH {Math.round(priceStats.avg)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Available</p>
                  <p className="text-2xl font-bold text-green-600">
                    {menuItems.filter(item => item.availability).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
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
              <div className="flex gap-4 mb-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search menu items..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange('search', e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
              </div>

              {showFilters && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Select 
                    value={filters.category} 
                    onValueChange={(value) => handleFilterChange('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
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
                    value={filters.availability} 
                    onValueChange={(value) => handleFilterChange('availability', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Items</SelectItem>
                      <SelectItem value="available">Available Only</SelectItem>
                      <SelectItem value="unavailable">Unavailable Only</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          )}

          {/* Content */}
          <div className="p-6">
            {activeTab === "items" && (
              <MenuItemsTab
                menuItems={menuItems}
                onEdit={handleEditItem}
                onDelete={handleDeleteItem}
              />
            )}
            {activeTab === "categories" && (
              <CategoriesTab
                menuItems={menuItems}
                categories={categories}
              />
            )}
            {activeTab === "pricing" && (
              <PricingTab
                menuItems={menuItems}
                priceStats={priceStats}
              />
            )}
            {activeTab === "analytics" && (
              <AnalyticsTab
                menuItems={menuItems}
                categories={categories}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
