import React, { useState } from "react";
import { ArrowLeft, Plus, Filter, Search, ShoppingCart, Receipt, Clock, DollarSign, Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export const ModernSalesPanel = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState("orders");
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleBack = () => {
    setSearchParams({});
  };

  const handleNewOrder = () => {
    toast({
      title: "New Order",
      description: "Opening new order form...",
    });
  };

  const handleCompleteOrder = (orderId: string) => {
    toast({
      title: "Order Completed",
      description: `Order ${orderId} has been marked as completed.`,
    });
  };

  const handleCancelOrder = (orderId: string) => {
    toast({
      title: "Order Cancelled",
      description: `Order ${orderId} has been cancelled.`,
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
      title: "Today's Revenue",
      value: "$4,750",
      icon: DollarSign,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "Total Orders",
      value: "142",
      icon: ShoppingCart,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Pending Orders",
      value: "7",
      icon: Clock,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Avg Order Value",
      value: "$33.45",
      icon: Receipt,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const tabs = [
    { id: "orders", label: "Orders" },
    { id: "transactions", label: "Transactions" },
    { id: "tables", label: "Tables" }
  ];

  const orders = [
    {
      id: "ORD-001",
      table: "Table 5",
      customer: "John Doe",
      amount: "$45.99",
      items: "3 items",
      status: "pending",
      time: "2 mins ago"
    },
    {
      id: "ORD-002",
      table: "Table 2",
      customer: "Jane Smith",
      amount: "$32.50",
      items: "2 items",
      status: "completed",
      time: "15 mins ago"
    },
    {
      id: "ORD-003",
      table: "Counter",
      customer: "Mike Johnson",
      amount: "$12.99",
      items: "1 items",
      status: "preparing",
      time: "5 mins ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800";
      case "completed": return "bg-green-100 text-green-800";
      case "preparing": return "bg-blue-100 text-blue-800";
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
            <h1 className="text-xl font-semibold text-gray-900">Sales Management</h1>
          </div>
          <Button onClick={handleNewOrder} className="bg-green-600 hover:bg-green-700">
            <Plus className="h-4 w-4 mr-2" />
            New Order
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
                  placeholder="Search orders, customers, or table numbers..."
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
            <div className="space-y-4">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900">{order.id}</h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{order.table} • {order.customer}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{order.amount}</p>
                    <p className="text-sm text-gray-600">{order.items}</p>
                    <div className="flex gap-2 mt-2">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => handleCompleteOrder(order.id)}
                      >
                        <Check className="h-3 w-3" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => handleCancelOrder(order.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
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
