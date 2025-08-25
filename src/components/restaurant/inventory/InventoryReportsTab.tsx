
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { InventoryItem } from "@/services/database";
import { TrendingUp, TrendingDown, AlertTriangle, Package } from "lucide-react";

interface InventoryReportsTabProps {
  inventory: InventoryItem[];
}

export const InventoryReportsTab = ({ inventory }: InventoryReportsTabProps) => {
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock);
  const expiredItems = inventory.filter(item => 
    item.expiryDate && new Date(item.expiryDate) < new Date()
  );
  const expiringSoonItems = inventory.filter(item => {
    if (!item.expiryDate) return false;
    const daysDiff = Math.ceil((new Date(item.expiryDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff <= 7 && daysDiff > 0;
  });

  const categoryBreakdown = inventory.reduce((acc, item) => {
    const category = getItemCategory(item.name);
    if (!acc[category]) {
      acc[category] = { count: 0, value: 0 };
    }
    acc[category].count += 1;
    acc[category].value += item.quantity * item.cost;
    return acc;
  }, {} as Record<string, { count: number; value: number }>);

  const stats = [
    {
      title: "Total Inventory Value",
      value: `KSH ${totalValue.toLocaleString()}`,
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Low Stock Items",
      value: lowStockItems.length.toString(),
      icon: AlertTriangle,
      color: "text-yellow-600"
    },
    {
      title: "Expired Items",
      value: expiredItems.length.toString(),
      icon: TrendingDown,
      color: "text-red-600"
    },
    {
      title: "Expiring Soon",
      value: expiringSoonItems.length.toString(),
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
                <stat.icon className="h-8 w-8 text-gray-400" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Category Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Object.entries(categoryBreakdown)
              .sort(([,a], [,b]) => b.value - a.value)
              .map(([category, data]) => {
                const percentage = totalValue > 0 ? (data.value / totalValue) * 100 : 0;
                return (
                  <div key={category}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">{category}</span>
                      <div className="text-right">
                        <span className="font-bold">KSH {data.value.toLocaleString()}</span>
                        <span className="text-sm text-gray-500 ml-2">({data.count} items)</span>
                      </div>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Alert Items */}
      {(lowStockItems.length > 0 || expiredItems.length > 0 || expiringSoonItems.length > 0) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {lowStockItems.length > 0 && (
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="text-yellow-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Low Stock
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {lowStockItems.slice(0, 5).map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-sm">{item.name}</span>
                      <Badge variant="outline" className="text-yellow-800">
                        {item.quantity} {item.unit}
                      </Badge>
                    </div>
                  ))}
                  {lowStockItems.length > 5 && (
                    <p className="text-xs text-gray-500">+{lowStockItems.length - 5} more</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {expiredItems.length > 0 && (
            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="text-red-800 flex items-center gap-2">
                  <TrendingDown className="h-5 w-5" />
                  Expired Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {expiredItems.slice(0, 5).map(item => (
                    <div key={item.id} className="flex justify-between">
                      <span className="text-sm">{item.name}</span>
                      <Badge variant="destructive">
                        Expired
                      </Badge>
                    </div>
                  ))}
                  {expiredItems.length > 5 && (
                    <p className="text-xs text-gray-500">+{expiredItems.length - 5} more</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {expiringSoonItems.length > 0 && (
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800 flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Expiring Soon
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {expiringSoonItems.slice(0, 5).map(item => {
                    const daysLeft = Math.ceil((new Date(item.expiryDate!).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    return (
                      <div key={item.id} className="flex justify-between">
                        <span className="text-sm">{item.name}</span>
                        <Badge className="bg-orange-100 text-orange-800">
                          {daysLeft}d left
                        </Badge>
                      </div>
                    );
                  })}
                  {expiringSoonItems.length > 5 && (
                    <p className="text-xs text-gray-500">+{expiringSoonItems.length - 5} more</p>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}
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
