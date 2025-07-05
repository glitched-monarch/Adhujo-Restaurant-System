
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MenuFormDialog } from "./menu/MenuFormDialog";
import { MenuItemList } from "./menu/MenuItemList";

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

export const MenuManagementPanel = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleAddItem = () => {
    setSelectedItem(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const handleSubmit = (menuItem: MenuItem) => {
    if (selectedItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item => 
        item.id === selectedItem.id ? menuItem : item
      ));
    } else {
      // Add new item
      setMenuItems(prev => [...prev, menuItem]);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Menu Management</h2>
          <p className="text-gray-600">Manage your restaurant menu items, pricing, and availability</p>
        </div>
        <Button onClick={handleAddItem}>
          <Plus className="h-4 w-4 mr-2" />
          Add Menu Item
        </Button>
      </div>

      <MenuItemList
        menuItems={menuItems}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <MenuFormDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        selectedItem={selectedItem}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
