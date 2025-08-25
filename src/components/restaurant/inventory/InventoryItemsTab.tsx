
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Edit, Trash2 } from "lucide-react";
import { InventoryItem } from "@/services/database";

interface InventoryItemsTabProps {
  inventory: InventoryItem[];
  onEdit: (item: InventoryItem) => void;
  onDelete: (id: string) => void;
}

export const InventoryItemsTab = ({ inventory, onEdit, onDelete }: InventoryItemsTabProps) => {
  const getStatusColor = (item: InventoryItem) => {
    if (item.quantity === 0) return "bg-red-100 text-red-800";
    if (item.quantity <= item.minStock) return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getStatus = (item: InventoryItem) => {
    if (item.quantity === 0) return "Out of Stock";
    if (item.quantity <= item.minStock) return "Low Stock";
    return "In Stock";
  };

  const getStockLevel = (item: InventoryItem) => {
    return Math.min(100, (item.quantity / (item.minStock * 2)) * 100);
  };

  return (
    <div className="space-y-6">
      {inventory.map((item) => (
        <div key={item.id} className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600">Cost: KSH {item.cost} per {item.unit}</p>
            </div>
            <div className="flex gap-2">
              <Badge className={getStatusColor(item)}>
                {getStatus(item)}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm text-gray-600 mb-1">Current Stock</p>
              <p className="text-xl font-bold text-gray-900">{item.quantity} {item.unit}</p>
              <Progress value={getStockLevel(item)} className="mt-2" />
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Minimum Stock</p>
              <p className="text-xl font-bold text-gray-900">{item.minStock} {item.unit}</p>
              <p className="text-sm text-gray-500">Total Value: KSH {(item.cost * item.quantity).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Expiry Date</p>
              <p className="text-xl font-bold text-gray-900">
                {item.expiryDate ? item.expiryDate.toLocaleDateString() : 'N/A'}
              </p>
              {item.expiryDate && (
                <p className="text-sm text-gray-500">
                  {Math.ceil((item.expiryDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))} days left
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
      
      {inventory.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No items found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};
