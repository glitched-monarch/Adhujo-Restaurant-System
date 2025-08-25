
import { useMemo } from 'react';
import { useSales } from './useSales';
import { Sale } from '@/services/database';

export interface SalesFilters {
  dateRange: { start: Date; end: Date } | null;
  paymentMethod: string;
  search: string;
}

export const useFilteredSales = (filters: SalesFilters) => {
  const { sales, loading, error, addSale } = useSales();

  const filteredSales = useMemo(() => {
    return sales.filter((sale: Sale) => {
      // Date range filter
      if (filters.dateRange) {
        const saleDate = new Date(sale.timestamp);
        if (saleDate < filters.dateRange.start || saleDate > filters.dateRange.end) {
          return false;
        }
      }

      // Payment method filter
      if (filters.paymentMethod && filters.paymentMethod !== 'all' && sale.paymentMethod !== filters.paymentMethod) {
        return false;
      }

      // Search filter (search in items)
      if (filters.search) {
        const searchTerm = filters.search.toLowerCase();
        const hasMatchingItem = sale.items.some(item => 
          item.name.toLowerCase().includes(searchTerm)
        );
        if (!hasMatchingItem) return false;
      }

      return true;
    });
  }, [sales, filters]);

  const salesStats = useMemo(() => {
    const stats = {
      totalSales: 0,
      totalRevenue: 0,
      totalVAT: 0,
      averageOrderValue: 0,
      paymentMethods: {} as Record<string, number>,
      topItems: {} as Record<string, { quantity: number; revenue: number }>
    };

    filteredSales.forEach(sale => {
      stats.totalSales += 1;
      stats.totalRevenue += sale.total;
      stats.totalVAT += sale.vatTotal;

      // Payment methods
      stats.paymentMethods[sale.paymentMethod] = (stats.paymentMethods[sale.paymentMethod] || 0) + 1;

      // Top items
      sale.items.forEach(item => {
        if (!stats.topItems[item.name]) {
          stats.topItems[item.name] = { quantity: 0, revenue: 0 };
        }
        stats.topItems[item.name].quantity += item.quantity;
        stats.topItems[item.name].revenue += item.totalPrice * item.quantity;
      });
    });

    stats.averageOrderValue = stats.totalSales > 0 ? stats.totalRevenue / stats.totalSales : 0;

    return stats;
  }, [filteredSales]);

  return {
    sales: filteredSales,
    allSales: sales,
    salesStats,
    loading,
    error,
    addSale
  };
};
