
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, TrendingUp, DollarSign, FileText, BarChart3, PieChart, Download, Filter } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { SalesReports } from "./SalesReports";
import { InventoryReports } from "./InventoryReports";
import { FinancialReports } from "./FinancialReports";
import { PerformanceReports } from "./PerformanceReports";

export const ReportsOverview = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [dateRange, setDateRange] = useState("today");

  const handleBack = () => {
    setSearchParams({});
  };

  const reportSummaryCards = [
    {
      title: "Total Revenue",
      value: "$12,458",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-600",
    },
    {
      title: "Orders Today",
      value: "148",
      change: "+8.2%",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Popular Items",
      value: "25",
      change: "+3.1%",
      icon: TrendingUp,
      color: "text-purple-600",
    },
    {
      title: "Avg Order Value",
      value: "$84.20",
      change: "+5.7%",
      icon: BarChart3,
      color: "text-orange-600",
    },
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
            <div>
              <h1 className="text-2xl font-bold text-foreground">Reports & Analytics</h1>
              <p className="text-muted-foreground">Comprehensive insights into your restaurant operations</p>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Button variant="outline" size="sm" className="h-10">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="h-10">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {reportSummaryCards.map((card, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                <card.icon className={`h-5 w-5 ${card.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{card.value}</div>
                <Badge variant="secondary" className="text-xs mt-1">
                  {card.change}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Reports Tabs */}
        <Tabs defaultValue="sales" className="w-full">
          <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
            <TabsTrigger value="sales" className="flex items-center gap-2 py-3">
              <DollarSign className="h-4 w-4" />
              <span className="hidden sm:inline">Sales</span>
            </TabsTrigger>
            <TabsTrigger value="inventory" className="flex items-center gap-2 py-3">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Inventory</span>
            </TabsTrigger>
            <TabsTrigger value="financial" className="flex items-center gap-2 py-3">
              <PieChart className="h-4 w-4" />
              <span className="hidden sm:inline">Financial</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="flex items-center gap-2 py-3">
              <TrendingUp className="h-4 w-4" />
              <span className="hidden sm:inline">Performance</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="sales" className="mt-6">
            <SalesReports />
          </TabsContent>
          <TabsContent value="inventory" className="mt-6">
            <InventoryReports />
          </TabsContent>
          <TabsContent value="financial" className="mt-6">
            <FinancialReports />
          </TabsContent>
          <TabsContent value="performance" className="mt-6">
            <PerformanceReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
