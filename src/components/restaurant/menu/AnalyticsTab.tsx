
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { MenuItem } from "@/services/database";

interface AnalyticsTabProps {
  menuItems: MenuItem[];
  categories: string[];
}

export const AnalyticsTab = ({ menuItems, categories }: AnalyticsTabProps) => {
  const categoryData = categories.map(category => {
    const items = menuItems.filter(item => item.category === category);
    return {
      category,
      count: items.length,
      avgPrice: items.reduce((sum, item) => sum + item.basePrice, 0) / items.length || 0,
      totalValue: items.reduce((sum, item) => sum + item.basePrice, 0)
    };
  });

  const availabilityData = [
    {
      name: 'Available',
      value: menuItems.filter(item => item.availability).length,
      color: '#10B981'
    },
    {
      name: 'Unavailable',
      value: menuItems.filter(item => !item.availability).length,
      color: '#EF4444'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Total Items</p>
            <p className="text-2xl font-bold">{menuItems.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Categories</p>
            <p className="text-2xl font-bold">{categories.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Available Items</p>
            <p className="text-2xl font-bold text-green-600">
              {menuItems.filter(item => item.availability).length}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Avg Item Price</p>
            <p className="text-2xl font-bold">
              KSH {Math.round(menuItems.reduce((sum, item) => sum + item.basePrice, 0) / menuItems.length || 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Items by Category</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip formatter={(value, name) => [value, name === 'count' ? 'Items' : name]} />
                <Bar dataKey="count" fill="#3B82F6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Availability Pie Chart */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Item Availability</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={availabilityData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {availabilityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Category Analysis */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Category Analysis</h3>
          <div className="space-y-4">
            {categoryData.map((category, index) => (
              <div key={index} className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium">{category.category}</h4>
                  <p className="text-sm text-gray-500">{category.count} items</p>
                </div>
                <div className="text-right">
                  <p className="font-bold">KSH {category.avgPrice.toFixed(0)}</p>
                  <p className="text-sm text-gray-500">Average Price</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
