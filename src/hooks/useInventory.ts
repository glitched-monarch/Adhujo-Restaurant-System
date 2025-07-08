import { useState, useEffect } from 'react';
import { database, InventoryItem } from '@/services/database';

export const useInventory = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadInventory = async () => {
    try {
      setLoading(true);
      const items = await database.getInventoryItems();
      setInventory(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const addInventoryItem = async (item: Omit<InventoryItem, 'id'>) => {
    try {
      const newItem = await database.createInventoryItem(item);
      setInventory(prev => [...prev, newItem]);
      return newItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add inventory item');
      throw err;
    }
  };

  const updateInventoryItem = async (id: string, item: Partial<InventoryItem>) => {
    try {
      const updatedItem = await database.updateInventoryItem(id, item);
      setInventory(prev => prev.map(i => i.id === id ? updatedItem : i));
      return updatedItem;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update inventory item');
      throw err;
    }
  };

  const deleteInventoryItem = async (id: string) => {
    try {
      await database.deleteInventoryItem(id);
      setInventory(prev => prev.filter(i => i.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete inventory item');
      throw err;
    }
  };

  const updateQuantity = async (id: string, delta: number) => {
    const item = inventory.find(i => i.id === id);
    if (!item) return;
    
    const newQuantity = Math.max(0, item.quantity + delta);
    await updateInventoryItem(id, { quantity: newQuantity });
  };

  useEffect(() => {
    loadInventory();
  }, []);

  return {
    inventory,
    loading,
    error,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    updateQuantity,
    refreshInventory: loadInventory
  };
};