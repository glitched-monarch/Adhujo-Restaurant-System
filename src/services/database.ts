// Database abstraction layer - easily replaceable with local storage or other backends

export interface MenuItem {
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

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

export interface Accompaniment {
  id: string;
  name: string;
  price: number;
  required: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minStock: number;
  cost: number;
  expiryDate?: Date;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  subtotal: number;
  vatTotal: number;
  total: number;
  paymentMethod: string;
  amountPaid: number;
  change: number;
  timestamp: Date;
}

export interface SaleItem {
  id: string;
  name: string;
  basePrice: number;
  vatAmount: number;
  totalPrice: number;
  quantity: number;
  accompaniments?: Accompaniment[];
}

// Abstract database interface - can be implemented for different storage backends
export interface DatabaseService {
  // Menu operations
  getMenuItems(): Promise<MenuItem[]>;
  createMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem>;
  updateMenuItem(id: number, item: Partial<MenuItem>): Promise<MenuItem>;
  deleteMenuItem(id: number): Promise<void>;

  // Inventory operations
  getInventoryItems(): Promise<InventoryItem[]>;
  createInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem>;
  updateInventoryItem(id: string, item: Partial<InventoryItem>): Promise<InventoryItem>;
  deleteInventoryItem(id: string): Promise<void>;

  // Sales operations
  getSales(): Promise<Sale[]>;
  createSale(sale: Omit<Sale, 'id'>): Promise<Sale>;
  getSalesByDateRange(startDate: Date, endDate: Date): Promise<Sale[]>;
}

// Local storage implementation - easily replaceable with server-based or Supabase
class LocalStorageDatabase implements DatabaseService {
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

  // Menu operations
  async getMenuItems(): Promise<MenuItem[]> {
    return this.getStorageData<MenuItem>('menu_items');
  }

  async createMenuItem(item: Omit<MenuItem, 'id'>): Promise<MenuItem> {
    const items = await this.getMenuItems();
    const newItem: MenuItem = {
      ...item,
      id: Date.now()
    };
    items.push(newItem);
    await this.setStorageData('menu_items', items);
    return newItem;
  }

  async updateMenuItem(id: number, item: Partial<MenuItem>): Promise<MenuItem> {
    const items = await this.getMenuItems();
    const index = items.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Menu item not found');
    
    items[index] = { ...items[index], ...item };
    await this.setStorageData('menu_items', items);
    return items[index];
  }

  async deleteMenuItem(id: number): Promise<void> {
    const items = await this.getMenuItems();
    const filteredItems = items.filter(i => i.id !== id);
    await this.setStorageData('menu_items', filteredItems);
  }

  // Inventory operations
  async getInventoryItems(): Promise<InventoryItem[]> {
    const items = await this.getStorageData<any>('inventory_items');
    return items.map(item => ({
      ...item,
      expiryDate: item.expiryDate ? new Date(item.expiryDate) : undefined
    }));
  }

  async createInventoryItem(item: Omit<InventoryItem, 'id'>): Promise<InventoryItem> {
    const items = await this.getInventoryItems();
    const newItem: InventoryItem = {
      ...item,
      id: Date.now().toString()
    };
    items.push(newItem);
    await this.setStorageData('inventory_items', items);
    return newItem;
  }

  async updateInventoryItem(id: string, item: Partial<InventoryItem>): Promise<InventoryItem> {
    const items = await this.getInventoryItems();
    const index = items.findIndex(i => i.id === id);
    if (index === -1) throw new Error('Inventory item not found');
    
    items[index] = { ...items[index], ...item };
    await this.setStorageData('inventory_items', items);
    return items[index];
  }

  async deleteInventoryItem(id: string): Promise<void> {
    const items = await this.getInventoryItems();
    const filteredItems = items.filter(i => i.id !== id);
    await this.setStorageData('inventory_items', filteredItems);
  }

  // Sales operations
  async getSales(): Promise<Sale[]> {
    const sales = await this.getStorageData<any>('sales');
    return sales.map(sale => ({
      ...sale,
      timestamp: new Date(sale.timestamp)
    }));
  }

  async createSale(sale: Omit<Sale, 'id'>): Promise<Sale> {
    const sales = await this.getSales();
    const newSale: Sale = {
      ...sale,
      id: Date.now().toString()
    };
    sales.push(newSale);
    await this.setStorageData('sales', sales);
    return newSale;
  }

  async getSalesByDateRange(startDate: Date, endDate: Date): Promise<Sale[]> {
    const sales = await this.getSales();
    return sales.filter(sale => 
      sale.timestamp >= startDate && sale.timestamp <= endDate
    );
  }
}

// Export singleton instance - can easily be swapped with different implementations
export const database: DatabaseService = new LocalStorageDatabase();

// Future implementations could include:
// export const database: DatabaseService = new SupabaseDatabase();
// export const database: DatabaseService = new SQLiteDatabase();
// export const database: DatabaseService = new ApiDatabase();