
import { useMemo } from 'react';
import { useInventory } from './useInventory';
import { InventoryItem } from '@/services/database';

export interface InventoryFilters {
  search: string;
  category: string;
  stockStatus: 'all' | 'low' | 'good' | 'out';
}

export const useFilteredInventory = (filters: InventoryFilters) => {
  const { inventory, loading, error, addInventoryItem, updateInventoryItem, deleteInventoryItem } = useInventory();

  const filteredItems = useMemo(() => {
    return inventory.filter((item: InventoryItem) => {
      // Search filter
      if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Category filter (based on item type)
      if (filters.category && filters.category !== 'all') {
        const itemCategory = getItemCategory(item.name);
        if (itemCategory !== filters.category) return false;
      }

      // Stock status filter
      if (filters.stockStatus !== 'all') {
        const stockLevel = getStockLevel(item);
        if (filters.stockStatus !== stockLevel) return false;
      }

      return true;
    });
  }, [inventory, filters]);

  const categories = useMemo(() => {
    const cats = inventory.map(item => getItemCategory(item.name));
    return [...new Set(cats)];
  }, [inventory]);

  const stockStats = useMemo(() => {
    const stats = inventory.reduce((acc, item) => {
      const level = getStockLevel(item);
      acc[level] = (acc[level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return {
      total: inventory.length,
      good: stats.good || 0,
      low: stats.low || 0,
      out: stats.out || 0
    };
  }, [inventory]);

  return {
    inventory: filteredItems,
    allInventory: inventory,
    categories,
    stockStats,
    loading,
    error,
    addInventoryItem,
    updateInventoryItem,
    deleteInventoryItem
  };
};

const getItemCategory = (itemName: string): string => {
  const name = itemName.toLowerCase();
  if (name.includes('chicken') || name.includes('beef') || name.includes('fish')) return 'Meat & Fish';
  if (name.includes('lettuce') || name.includes('tomato') || name.includes('potato')) return 'Vegetables';
  if (name.includes('oil') || name.includes('butter')) return 'Oils & Fats';
  if (name.includes('flour') || name.includes('sugar')) return 'Dry Goods';
  return 'Other';
};

const getStockLevel = (item: InventoryItem): 'good' | 'low' | 'out' => {
  if (item.quantity === 0) return 'out';
  if (item.quantity <= item.minStock) return 'low';
  return 'good';
};
