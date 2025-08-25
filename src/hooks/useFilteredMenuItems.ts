
import { useMemo } from 'react';
import { useMenuItems } from './useMenuItems';
import { MenuItem } from '@/services/database';

export interface MenuFilters {
  search: string;
  category: string;
  availability: 'all' | 'available' | 'unavailable';
  priceRange: { min: number; max: number } | null;
}

export const useFilteredMenuItems = (filters: MenuFilters) => {
  const { menuItems, loading, error, addMenuItem, updateMenuItem, deleteMenuItem } = useMenuItems();

  const filteredItems = useMemo(() => {
    return menuItems.filter((item: MenuItem) => {
      // Search filter
      if (filters.search && !item.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !item.description.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }

      // Category filter
      if (filters.category && filters.category !== 'all' && item.category !== filters.category) {
        return false;
      }

      // Availability filter
      if (filters.availability !== 'all') {
        const isAvailable = item.availability;
        if (filters.availability === 'available' && !isAvailable) return false;
        if (filters.availability === 'unavailable' && isAvailable) return false;
      }

      // Price range filter
      if (filters.priceRange) {
        const price = item.basePrice;
        if (price < filters.priceRange.min || price > filters.priceRange.max) {
          return false;
        }
      }

      return true;
    });
  }, [menuItems, filters]);

  const categories = useMemo(() => {
    const cats = [...new Set(menuItems.map(item => item.category))];
    return cats.filter(Boolean);
  }, [menuItems]);

  const priceStats = useMemo(() => {
    if (menuItems.length === 0) return { min: 0, max: 1000, avg: 0 };
    
    const prices = menuItems.map(item => item.basePrice);
    return {
      min: Math.min(...prices),
      max: Math.max(...prices),
      avg: prices.reduce((sum, price) => sum + price, 0) / prices.length
    };
  }, [menuItems]);

  return {
    menuItems: filteredItems,
    allMenuItems: menuItems,
    categories,
    priceStats,
    loading,
    error,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
  };
};
