# Database Abstraction Layer

This directory contains the abstraction layer that makes it easy to switch between different data storage backends.

## Architecture

The system uses a clean separation between:
- **Components**: UI components that use hooks
- **Hooks**: Custom hooks that manage state and call database services
- **Services**: Database abstraction layer with interfaces
- **Utils**: Pure business logic functions

## Files

### `database.ts`
Contains the `DatabaseService` interface and implementations:
- `LocalStorageDatabase`: Stores data in browser localStorage
- Future implementations could include `SupabaseDatabase`, `SQLiteDatabase`, etc.

### Current Implementation
- Uses localStorage for persistence
- Provides async API for consistency with future server-based implementations
- Easy to test and develop with

## Switching Backends

To switch from localStorage to another backend:

1. Create a new class implementing `DatabaseService`
2. Update the export in `database.ts`:
   ```typescript
   export const database: DatabaseService = new YourNewDatabase();
   ```

## Example Backend Implementations

### Supabase Implementation
```typescript
class SupabaseDatabase implements DatabaseService {
  async getMenuItems(): Promise<MenuItem[]> {
    const { data, error } = await supabase.from('menu_items').select('*');
    if (error) throw error;
    return data || [];
  }
  // ... other methods
}
```

### API-based Implementation
```typescript
class ApiDatabase implements DatabaseService {
  async getMenuItems(): Promise<MenuItem[]> {
    const response = await fetch('/api/menu-items');
    return response.json();
  }
  // ... other methods
}
```

### SQLite Implementation (for Electron apps)
```typescript
class SQLiteDatabase implements DatabaseService {
  async getMenuItems(): Promise<MenuItem[]> {
    return this.db.all('SELECT * FROM menu_items');
  }
  // ... other methods
}
```

## Benefits

1. **Easy Testing**: Can mock the database service for unit tests
2. **Flexible Deployment**: Same code works with different storage backends
3. **Clean Architecture**: Business logic separated from data access
4. **Type Safety**: Full TypeScript support with consistent interfaces
5. **Easy Migration**: Gradual migration path from local to server storage
