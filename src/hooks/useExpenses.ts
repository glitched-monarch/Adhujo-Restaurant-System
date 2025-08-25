
import { useState, useEffect } from 'react';
import { expenseService, Expense, ExpenseCategory } from '@/services/expenseService';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [expensesData, categoriesData] = await Promise.all([
        expenseService.getExpenses(),
        expenseService.getCategories()
      ]);
      setExpenses(expensesData);
      setCategories(categoriesData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load expenses');
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    try {
      const newExpense = await expenseService.createExpense(expense);
      setExpenses(prev => [newExpense, ...prev]);
      return newExpense;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add expense');
      throw err;
    }
  };

  const updateExpense = async (id: string, expense: Partial<Expense>) => {
    try {
      const updatedExpense = await expenseService.updateExpense(id, expense);
      setExpenses(prev => prev.map(e => e.id === id ? updatedExpense : e));
      return updatedExpense;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update expense');
      throw err;
    }
  };

  const deleteExpense = async (id: string) => {
    try {
      await expenseService.deleteExpense(id);
      setExpenses(prev => prev.filter(e => e.id !== id));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete expense');
      throw err;
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return {
    expenses,
    categories,
    loading,
    error,
    addExpense,
    updateExpense,
    deleteExpense,
    refreshExpenses: loadData
  };
};
