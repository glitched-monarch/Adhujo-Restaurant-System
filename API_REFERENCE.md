
# API Reference Guide

## Supabase Integration

The Adhujo Restaurant ERP system uses Supabase as its backend, providing real-time database operations, authentication, and file storage capabilities.

## Database Client Configuration

### Client Setup
```typescript
// src/integrations/supabase/client.ts
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://gyjacqpuwzmmwmspauot.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});
```

## Data Operations

### Sales Management

#### Create Sale
```typescript
const createSale = async (saleData: {
  customer_name?: string;
  phone_number?: number;
  payment_method: string;
  amount_paid: number;
  items: Array<{
    menu_item_id: number;
    quantity: number;
    unit_price: number;
  }>;
}) => {
  // Create sale record
  const { data: sale, error: saleError } = await supabase
    .from('sales')
    .insert({
      date: new Date().toISOString().split('T')[0],
      customer_name: saleData.customer_name,
      phone_number: saleData.phone_number,
      payment_method: saleData.payment_method,
      amount_paid: saleData.amount_paid,
      payment_date: new Date().toISOString(),
      performed_by: userId
    })
    .select()
    .single();

  if (saleError) throw saleError;

  // Create sale items
  const saleItems = saleData.items.map(item => ({
    sales_id: sale.id,
    menu_item_id: item.menu_item_id,
    quantity: item.quantity,
    unit_price: item.unit_price
  }));

  const { error: itemsError } = await supabase
    .from('sale_items')
    .insert(saleItems);

  if (itemsError) throw itemsError;

  return sale;
};
```

#### Fetch Sales Data
```typescript
const fetchSales = async (dateRange?: { from: Date; to: Date }) => {
  let query = supabase
    .from('sales')
    .select(`
      *,
      sale_items (
        *,
        menu_items (name, category)
      ),
      users (username)
    `)
    .order('payment_date', { ascending: false });

  if (dateRange) {
    query = query
      .gte('date', dateRange.from.toISOString().split('T')[0])
      .lte('date', dateRange.to.toISOString().split('T')[0]);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};
```

### Inventory Management

#### Update Inventory
```typescript
const updateInventory = async (ingredientId: number, updates: {
  quantity?: number;
  cost_per_unit?: number;
  expiry_date?: string;
}) => {
  const { data, error } = await supabase
    .from('ingredients')
    .update(updates)
    .eq('id', ingredientId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
```

#### Check Low Stock
```typescript
const getLowStockItems = async () => {
  const { data, error } = await supabase
    .from('ingredients')
    .select('*')
    .filter('quantity', 'lte', 'low_stock_threshold');

  if (error) throw error;
  return data;
};
```

### Menu Management

#### Create Menu Item
```typescript
const createMenuItem = async (itemData: {
  name: string;
  price: number;
  category?: string;
  description?: string;
  ingredients?: Array<{
    ingredient_id: number;
    quantity_used: number;
  }>;
}) => {
  // Create menu item
  const { data: menuItem, error: itemError } = await supabase
    .from('menu_items')
    .insert({
      name: itemData.name,
      price: itemData.price,
      category: itemData.category,
      description: itemData.description
    })
    .select()
    .single();

  if (itemError) throw itemError;

  // Link ingredients if provided
  if (itemData.ingredients?.length) {
    const ingredientLinks = itemData.ingredients.map(ing => ({
      menu_item_id: menuItem.id,
      ingredient_id: ing.ingredient_id,
      quantity_used: ing.quantity_used
    }));

    const { error: linkError } = await supabase
      .from('menu_ingredients')
      .insert(ingredientLinks);

    if (linkError) throw linkError;
  }

  return menuItem;
};
```

### Financial Reports

#### Profit & Loss Data
```typescript
const getProfitLossData = async (dateRange: { from: Date; to: Date }) => {
  // Get revenue data
  const { data: revenueData, error: revenueError } = await supabase
    .from('sales')
    .select('date, amount_paid')
    .gte('date', dateRange.from.toISOString().split('T')[0])
    .lte('date', dateRange.to.toISOString().split('T')[0]);

  if (revenueError) throw revenueError;

  // Get expense data
  const { data: expenseData, error: expenseError } = await supabase
    .from('reports_expenses')
    .select('entry_date, total')
    .gte('entry_date', dateRange.from.toISOString())
    .lte('entry_date', dateRange.to.toISOString());

  if (expenseError) throw expenseError;

  // Process and combine data
  const dailyData = processFinancialData(revenueData, expenseData);
  return dailyData;
};
```

#### Trial Balance
```typescript
const getTrialBalance = async () => {
  const { data, error } = await supabase.rpc('calculate_trial_balance');
  if (error) throw error;
  return data;
};
```

### User Management

#### Create User
```typescript
const createUser = async (userData: {
  username: string;
  password: string;
  role: 'admin' | 'manager' | 'staff';
}) => {
  const { data, error } = await supabase
    .from('users')
    .insert(userData)
    .select()
    .single();

  if (error) throw error;
  return data;
};
```

#### Update User Role
```typescript
const updateUserRole = async (userId: number, newRole: string) => {
  const { data, error } = await supabase
    .from('users')
    .update({ role: newRole })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};
```

### Access Logging

#### Log User Action
```typescript
const logUserAction = async (actionData: {
  user_id: number;
  action: string;
  parameters?: string;
  success: boolean;
}) => {
  const { error } = await supabase
    .from('access_logs')
    .insert({
      user_id: actionData.user_id,
      action: actionData.action,
      parameters: actionData.parameters,
      success: actionData.success,
      action_timestamp: new Date().toISOString()
    });

  if (error) throw error;
};
```

#### Fetch Access Logs
```typescript
const getAccessLogs = async (filters?: {
  userId?: number;
  dateRange?: { from: Date; to: Date };
  success?: boolean;
}) => {
  let query = supabase
    .from('access_logs')
    .select(`
      *,
      users (username)
    `)
    .order('action_timestamp', { ascending: false });

  if (filters?.userId) {
    query = query.eq('user_id', filters.userId);
  }

  if (filters?.dateRange) {
    query = query
      .gte('action_timestamp', filters.dateRange.from.toISOString())
      .lte('action_timestamp', filters.dateRange.to.toISOString());
  }

  if (filters?.success !== undefined) {
    query = query.eq('success', filters.success);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};
```

## React Query Integration

### Custom Hooks

#### Sales Hooks
```typescript
// Fetch sales data
export const useSales = (dateRange?: DateRange) => {
  return useQuery({
    queryKey: ['sales', dateRange],
    queryFn: () => fetchSales(dateRange),
    enabled: true
  });
};

// Create sale mutation
export const useCreateSale = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: createSale,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sales'] });
    }
  });
};
```

#### Inventory Hooks
```typescript
// Fetch inventory
export const useInventory = () => {
  return useQuery({
    queryKey: ['inventory'],
    queryFn: fetchInventory
  });
};

// Update inventory mutation
export const useUpdateInventory = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, updates }: { id: number; updates: any }) => 
      updateInventory(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['inventory'] });
    }
  });
};
```

### Error Handling

#### Global Error Handler
```typescript
const defaultQueryClientOptions = {
  queries: {
    retry: (failureCount: number, error: any) => {
      // Don't retry on 4xx errors
      if (error?.status >= 400 && error?.status < 500) {
        return false;
      }
      return failureCount < 3;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  },
  mutations: {
    onError: (error: any) => {
      console.error('Mutation error:', error);
      toast.error('An error occurred. Please try again.');
    }
  }
};
```

## Real-time Subscriptions

### Sales Updates
```typescript
const subscribeTo SalesUpdates = (onUpdate: (data: any) => void) => {
  const subscription = supabase
    .channel('sales-changes')
    .on('postgres_changes', 
      { event: '*', schema: 'public', table: 'sales' },
      onUpdate
    )
    .subscribe();

  return () => subscription.unsubscribe();
};
```

### Inventory Alerts
```typescript
const subscribeToInventoryAlerts = (onLowStock: (item: any) => void) => {
  const subscription = supabase
    .channel('inventory-updates')
    .on('postgres_changes',
      { 
        event: 'UPDATE', 
        schema: 'public', 
        table: 'ingredients',
        filter: 'quantity=lte.low_stock_threshold'
      },
      onLowStock
    )
    .subscribe();

  return () => subscription.unsubscribe();
};
```

## Authentication

### Login
```typescript
const login = async (username: string, password: string) => {
  // Custom login logic with users table
  const { data: user, error } = await supabase
    .from('users')
    .select('*')
    .eq('username', username)
    .eq('password', password) // In production, use proper password hashing
    .single();

  if (error || !user) {
    throw new Error('Invalid credentials');
  }

  // Store user session
  localStorage.setItem('user', JSON.stringify(user));
  return user;
};
```

### Logout
```typescript
const logout = () => {
  localStorage.removeItem('user');
  window.location.href = '/login';
};
```

## Error Handling Patterns

### Database Errors
```typescript
const handleDatabaseError = (error: any) => {
  if (error.code === '23505') {
    return 'This record already exists';
  }
  
  if (error.code === '23503') {
    return 'Cannot delete: record is referenced by other data';
  }
  
  return error.message || 'Database operation failed';
};
```

### Network Errors
```typescript
const handleNetworkError = (error: any) => {
  if (!navigator.onLine) {
    return 'No internet connection';
  }
  
  if (error.code === 'NETWORK_ERROR') {
    return 'Network error. Please check your connection.';
  }
  
  return 'An unexpected error occurred';
};
```

This API reference provides comprehensive guidance for interacting with the Supabase backend and managing data operations within the Adhujo Restaurant ERP system.
