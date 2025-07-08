
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { MenuFormDialog } from "./menu/MenuFormDialog";
import { MenuItemList } from "./menu/MenuItemList";
import { useMenuItems } from "@/hooks/useMenuItems";
import { MenuItem } from "@/services/database";

export const MenuManagementPanel = () => {
  const { menuItems, loading, error, addMenuItem, updateMenuItem, deleteMenuItem } = useMenuItems();
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

  const handleDelete = async (id: number) => {
    try {
      await deleteMenuItem(id);
    } catch (error) {
      console.error('Failed to delete menu item:', error);
    }
  };

  const handleSubmit = async (menuItem: MenuItem) => {
    try {
      if (selectedItem) {
        // Update existing item
        await updateMenuItem(selectedItem.id, menuItem);
      } else {
        // Add new item
        await addMenuItem(menuItem);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Failed to save menu item:', error);
    }
  };

  if (loading) {
    return <div>Loading menu items...</div>;
  }

  if (error) {
    return <div>Error loading menu items: {error}</div>;
  }

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
