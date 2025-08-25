
export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: Date;
  paymentMethod: string;
  receipt?: string;
  addedBy: string;
  approvalStatus: 'pending' | 'approved' | 'rejected';
}

export interface ExpenseCategory {
  id: string;
  name: string;
  budget: number;
  color: string;
}

class ExpenseService {
  private getStorageKey(type: string): string {
    return `restaurant_${type}`;
  }

  private async getStorageData<T>(key: string): Promise<T[]> {
    const data = localStorage.getItem(this.getStorageKey(key));
    return data ? JSON.parse(data) : [];
  }

  private async setStorageData<T>(key: string, data: T[]): Promise<void> {
    localStorage.setItem(this.getStorageKey(key), JSON.stringify(data));
  }

  // Expense operations
  async getExpenses(): Promise<Expense[]> {
    const expenses = await this.getStorageData<any>('expenses');
    return expenses.map(expense => ({
      ...expense,
      date: new Date(expense.date)
    }));
  }

  async createExpense(expense: Omit<Expense, 'id'>): Promise<Expense> {
    const expenses = await this.getExpenses();
    const newExpense: Expense = {
      ...expense,
      id: Date.now().toString()
    };
    expenses.push(newExpense);
    await this.setStorageData('expenses', expenses);
    return newExpense;
  }

  async updateExpense(id: string, expense: Partial<Expense>): Promise<Expense> {
    const expenses = await this.getExpenses();
    const index = expenses.findIndex(e => e.id === id);
    if (index === -1) throw new Error('Expense not found');
    
    expenses[index] = { ...expenses[index], ...expense };
    await this.setStorageData('expenses', expenses);
    return expenses[index];
  }

  async deleteExpense(id: string): Promise<void> {
    const expenses = await this.getExpenses();
    const filteredExpenses = expenses.filter(e => e.id !== id);
    await this.setStorageData('expenses', filteredExpenses);
  }

  // Category operations
  async getCategories(): Promise<ExpenseCategory[]> {
    return this.getStorageData<ExpenseCategory>('expense_categories');
  }

  async createCategory(category: Omit<ExpenseCategory, 'id'>): Promise<ExpenseCategory> {
    const categories = await this.getCategories();
    const newCategory: ExpenseCategory = {
      ...category,
      id: Date.now().toString()
    };
    categories.push(newCategory);
    await this.setStorageData('expense_categories', categories);
    return newCategory;
  }
}

export const expenseService = new ExpenseService();

// Initialize default categories
export const initializeExpenseCategories = async () => {
  const categories = await expenseService.getCategories();
  if (categories.length === 0) {
    const defaultCategories = [
      { name: 'Food & Ingredients', budget: 50000, color: '#10B981' },
      { name: 'Staff Salaries', budget: 80000, color: '#3B82F6' },
      { name: 'Utilities', budget: 15000, color: '#F59E0B' },
      { name: 'Equipment', budget: 10000, color: '#8B5CF6' },
      { name: 'Marketing', budget: 8000, color: '#EF4444' },
      { name: 'Rent', budget: 25000, color: '#6B7280' },
      { name: 'Maintenance', budget: 5000, color: '#F97316' }
    ];

    for (const category of defaultCategories) {
      await expenseService.createCategory(category);
    }
  }
};
