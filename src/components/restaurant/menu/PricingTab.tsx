
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MenuItem } from "@/services/database";

interface PricingTabProps {
  menuItems: MenuItem[];
  priceStats: {
    min: number;
    max: number;
    avg: number;
  };
}

export const PricingTab = ({ menuItems, priceStats }: PricingTabProps) => {
  const priceRanges = [
    { label: "Under KSH 300", min: 0, max: 300 },
    { label: "KSH 300 - 500", min: 300, max: 500 },
    { label: "KSH 500 - 700", min: 500, max: 700 },
    { label: "KSH 700 - 1000", min: 700, max: 1000 },
    { label: "Over KSH 1000", min: 1000, max: Infinity }
  ];

  return (
    <div className="space-y-6">
      {/* Price Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Lowest Price</p>
            <p className="text-2xl font-bold">KSH {priceStats.min}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Average Price</p>
            <p className="text-2xl font-bold">KSH {priceStats.avg.toFixed(0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-sm text-gray-600">Highest Price</p>
            <p className="text-2xl font-bold">KSH {priceStats.max}</p>
          </CardContent>
        </Card>
      </div>

      {/* Price Range Analysis */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Price Range Distribution</h3>
          <div className="space-y-4">
            {priceRanges.map((range, index) => {
              const itemsInRange = menuItems.filter(item => 
                item.basePrice >= range.min && item.basePrice < range.max
              );
              const percentage = (itemsInRange.length / menuItems.length) * 100;

              return (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium">{range.label}</span>
                      <span className="text-sm text-gray-500">{itemsInRange.length} items</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Items by Price */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Items by Price (Highest to Lowest)</h3>
          <div className="space-y-2">
            {[...menuItems]
              .sort((a, b) => b.basePrice - a.basePrice)
              .map((item) => (
                <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <div>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">KSH {item.basePrice}</p>
                    <p className="text-sm text-gray-500">+VAT: KSH {item.totalPrice}</p>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
