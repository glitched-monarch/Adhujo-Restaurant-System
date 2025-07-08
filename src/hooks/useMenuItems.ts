import { useState, useEffect } from 'react';
import { database, MenuItem } from '@/services/database';

export const useMenuItems = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMenuItems = async () => {
    try {
      setLoading(true);
      const items = await database.getMenuItems();
      setMenuItems(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load menu items');
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = async (item: Omit<MenuItem, 'id'>) => {
    try {
      const newItem = await database.createMenuItem(item);
      setMenuItems(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add menu item');
      throw err;
    }
  };

  const updateMenuItem = async (id: number, item: Partial<MenuItem>) => {
    try {
      const updatedItem = await database.updateMenuItem(id, item);
      setMenuItems(prev => prev.map(i => i.id === id ? updatedItem : i));
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update menu item');
      throw err;
    }
  };

  const deleteMenuItem = async (id: number) => {
    try {
      await database.deleteMenuItem(id);
      setMenuItems(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete menu item');
      throw err;
    }
  };

  useEffect(() => {
    loadMenuItems();
  }, []);

  return {
    menuItems,
    loading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    refreshMenuItems: loadMenuItems
  };
};