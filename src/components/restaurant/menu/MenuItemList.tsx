
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Package } from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface Accompaniment {
  id: string;
  name: string;
  price: number;
  required: boolean;
}

interface MenuItem {
  id: number;
  name: string;
  basePrice: number;
  vatRate: number;
  totalPrice: number;
  category: string;
  availability: boolean;
  description: string;
  ingredients: Ingredient[];
  accompaniments: Accompaniment[];
}

interface MenuItemListProps {
  menuItems: MenuItem[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: number) => void;
}

export const MenuItemList = ({ menuItems, onEdit, onDelete }: MenuItemListProps) => {
  if (menuItems.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <div className="text-center py-8 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>No menu items yet. Add your first item to get started!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4">
      {menuItems.map((item) => (
        <Card key={item.id}>
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  {item.name}
                  {!item.availability && (
                    <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                      Unavailable
                    </span>
                  )}
                  <Badge variant="outline">{item.category}</Badge>
                </CardTitle>
                <CardDescription>
                  Subtotal: KSH {item.basePrice.toFixed(2)} • VAT: KSH {(item.basePrice * item.vatRate).toFixed(2)} • <strong>Total: KSH {item.totalPrice}</strong>
                </CardDescription>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" onClick={() => onDelete(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">{item.description}</p>
            
            {item.ingredients.length > 0 && (
              <div className="mb-3">
                <p className="text-sm font-medium mb-1">Ingredients:</p>
                <div className="flex flex-wrap gap-1">
                  {item.ingredients.map((ingredient) => (
                    <Badge key={ingredient.id} variant="secondary" className="text-xs">
                      {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {item.accompaniments.length > 0 && (
              <div>
                <p className="text-sm font-medium mb-1">Available Accompaniments:</p>
                <div className="flex flex-wrap gap-1">
                  {item.accompaniments.map((accompaniment) => (
                    <Badge key={accompaniment.id} variant={accompaniment.required ? "default" : "outline"} className="text-xs">
                      {accompaniment.name} (+KSH {accompaniment.price}) {accompaniment.required && "(Required)"}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
