
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import { MenuItem } from "@/services/database";

interface MenuItemsTabProps {
  menuItems: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
}

export const MenuItemsTab = ({ menuItems, onEdit, onDelete }: MenuItemsTabProps) => {
  const getStatusColor = (availability: boolean) => {
    return availability ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800";
  };

  return (
    <div className="space-y-6">
      {menuItems.map((item) => (
        <div key={item.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">{item.category}</p>
              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(item.availability)}>
                {item.availability ? 'Available' : 'Unavailable'}
              </Badge>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onEdit(item)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onDelete(item.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Base Price</p>
              <p className="text-xl font-bold text-gray-900">KSH {item.basePrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Price (inc. VAT)</p>
              <p className="text-xl font-bold text-gray-900">KSH {item.totalPrice}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">VAT Rate</p>
              <p className="text-xl font-bold text-gray-900">{(item.vatRate * 100)}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Ingredients</p>
              <p className="text-xl font-bold text-gray-900">{item.ingredients.length}</p>
            </div>
          </div>

          {item.ingredients.length > 0 && (
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-700 mb-2">Required Ingredients:</p>
              <div className="flex flex-wrap gap-2">
                {item.ingredients.map((ingredient) => (
                  <Badge key={ingredient.id} variant="secondary" className="text-xs">
                    {ingredient.name} ({ingredient.quantity}{ingredient.unit})
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
