
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "@/services/database";

interface CategoriesTabProps {
  menuItems: MenuItem[];
  categories: string[];
}

export const CategoriesTab = ({ menuItems, categories }: CategoriesTabProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => {
        const categoryItems = menuItems.filter(item => item.category === category);
        const totalValue = categoryItems.reduce((sum, item) => sum + item.basePrice, 0);
        const avgPrice = categoryItems.length > 0 ? totalValue / categoryItems.length : 0;
        
        return (
          <Card key={category} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-2">{category}</h3>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">{categoryItems.length} items</p>
                <p className="text-lg font-bold text-green-600">Avg: KSH {avgPrice.toFixed(0)}</p>
                <div className="flex flex-wrap gap-1">
                  {categoryItems.slice(0, 3).map((item) => (
                    <Badge key={item.id} variant="secondary" className="text-xs">
                      {item.name}
                    </Badge>
                  ))}
                  {categoryItems.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{categoryItems.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
