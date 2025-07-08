import { useState, useEffect } from 'react';
import { database, Sale } from '@/services/database';

export const useSales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadSales = async () => {
    try {
      setLoading(true);
      const salesData = await database.getSales();
      setSales(salesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sales');
    } finally {
      setLoading(false);
    }
  };

  const addSale = async (sale: Omit<Sale, 'id'>) => {
    try {
      const newSale = await database.createSale(sale);
      setSales(prev => [newSale, ...prev]);
      return newSale;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add sale');
      throw err;
    }
  };

  const getSalesByDateRange = async (startDate: Date, endDate: Date) => {
    try {
      const salesData = await database.getSalesByDateRange(startDate, endDate);
      return salesData;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to filter sales');
      throw err;
    }
  };

  useEffect(() => {
    loadSales();
  }, []);

  return {
    sales,
    loading,
    error,
    addSale,
    getSalesByDateRange,
    refreshSales: loadSales
  };
};