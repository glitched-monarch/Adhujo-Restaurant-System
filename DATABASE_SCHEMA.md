
# Database Schema Documentation

## Overview

The Adhujo Restaurant ERP system uses Supabase (PostgreSQL) as its backend database. The schema is designed to handle restaurant operations, financial tracking, and user management with proper relational integrity.

## Entity Relationship Overview

```
users ─┐
       ├─→ sales ─→ sale_items ─→ menu_items
       ├─→ reports_expenses           │
       └─→ access_logs                ├─→ menu_ingredients
                                      │         │
ingredients ←─────────────────────────┘         │
     ↑                                         │
     └─────────────────────────────────────────┘
```

## Table Definitions

### users
**Purpose**: Store user accounts and authentication information

| Column   | Type         | Constraints | Description |
|----------|-------------|-------------|-------------|
| id       | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique user identifier |
| username | VARCHAR     | NOT NULL, UNIQUE | User login name |
| password | VARCHAR     | NOT NULL | Encrypted password |
| role     | VARCHAR     | NOT NULL | User role (admin/manager/staff) |

**Relationships**: 
- One-to-many with sales (performed_by)
- One-to-many with reports_expenses (performed_by)
- One-to-many with access_logs (user_id)

### menu_items
**Purpose**: Store restaurant menu items and pricing

| Column      | Type         | Constraints | Description |
|------------|-------------|-------------|-------------|
| id         | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique menu item identifier |
| name       | VARCHAR     | NOT NULL | Item name |
| price      | DECIMAL(10,2) | NOT NULL | Item price |
| category   | VARCHAR     | NULL | Item category (appetizer, main, etc.) |
| availability | BOOLEAN   | DEFAULT true | Item availability status |
| description | TEXT       | NULL | Item description |
| parameters | TEXT       | NULL | Additional item parameters |

**Relationships**:
- One-to-many with sale_items
- One-to-many with menu_ingredients

### ingredients
**Purpose**: Track inventory ingredients and supplies

| Column              | Type         | Constraints | Description |
|-------------------|-------------|-------------|-------------|
| id                | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique ingredient identifier |
| name              | VARCHAR     | NOT NULL | Ingredient name |
| quantity          | DECIMAL(10,3) | NOT NULL | Current stock quantity |
| unit              | VARCHAR     | NOT NULL | Unit of measurement (kg, liters, pieces) |
| cost_per_unit     | DECIMAL(10,2) | NOT NULL | Cost per unit |
| low_stock_threshold | DECIMAL(10,3) | NOT NULL | Low stock alert threshold |
| expiry_date       | DATE        | NULL | Expiration date |
| category_name     | VARCHAR     | NULL | Ingredient category |

**Relationships**:
- One-to-many with menu_ingredients

### sales
**Purpose**: Record sales transactions

| Column           | Type         | Constraints | Description |
|-----------------|-------------|-------------|-------------|
| id              | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique sale identifier |
| date            | DATE        | NOT NULL | Sale date |
| amount_paid     | DECIMAL(10,2) | NOT NULL | Total amount paid |
| customer_name   | VARCHAR     | NULL | Customer name |
| phone_number    | BIGINT      | NULL | Customer phone |
| payment_method  | VARCHAR     | NOT NULL | Payment method |
| payment_ref     | VARCHAR     | NULL | Payment reference |
| payment_date    | TIMESTAMP   | NOT NULL | Payment timestamp |
| performed_by    | INTEGER     | FOREIGN KEY → users.id | User who processed sale |
| action_timestamp | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| parameters      | TEXT        | NULL | Additional sale parameters |
| subtotal        | DECIMAL(10,2) | NULL | Sale subtotal |
| tax_amount      | DECIMAL(10,2) | NULL | Tax amount |
| total_amount    | DECIMAL(10,2) | NULL | Final total amount |
| status          | VARCHAR     | DEFAULT 'completed' | Sale status |

**Relationships**:
- Many-to-one with users (performed_by)
- One-to-many with sale_items

### sale_items
**Purpose**: Link menu items to sales transactions (line items)

| Column        | Type         | Constraints | Description |
|--------------|-------------|-------------|-------------|
| id           | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique sale item identifier |
| sales_id     | INTEGER     | FOREIGN KEY → sales.id | Associated sale |
| menu_item_id | INTEGER     | FOREIGN KEY → menu_items.id | Menu item sold |
| quantity     | INTEGER     | NOT NULL | Quantity sold |
| unit_price   | DECIMAL(10,2) | NOT NULL | Price per unit at time of sale |
| category     | VARCHAR     | NULL | Item category at time of sale |
| parameters   | TEXT        | NULL | Item-specific parameters |

**Relationships**:
- Many-to-one with sales
- Many-to-one with menu_items

### menu_ingredients
**Purpose**: Junction table linking menu items to required ingredients

| Column         | Type         | Constraints | Description |
|---------------|-------------|-------------|-------------|
| id            | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique link identifier |
| menu_item_id  | INTEGER     | FOREIGN KEY → menu_items.id | Menu item |
| ingredient_id | INTEGER     | FOREIGN KEY → ingredients.id | Required ingredient |
| quantity_used | DECIMAL(10,3) | NOT NULL | Quantity of ingredient used |

**Unique Constraint**: (menu_item_id, ingredient_id)

**Relationships**:
- Many-to-one with menu_items
- Many-to-one with ingredients

### reports_expenses
**Purpose**: Track business expenses and costs

| Column           | Type         | Constraints | Description |
|-----------------|-------------|-------------|-------------|
| id              | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique expense identifier |
| entry_date      | TIMESTAMP   | NOT NULL | Expense date |
| entry_type      | VARCHAR     | NOT NULL | Type of expense |
| category        | VARCHAR     | NULL | Expense category |
| total           | DECIMAL(10,2) | NULL | Expense amount |
| notes           | TEXT        | NULL | Expense notes |
| performed_by    | INTEGER     | FOREIGN KEY → users.id | User who recorded expense |
| action_timestamp | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP | Record creation time |
| report_type     | VARCHAR     | NULL | Report classification |
| parameters      | TEXT        | NULL | Additional parameters |

**Relationships**:
- Many-to-one with users (performed_by)

### access_logs
**Purpose**: System audit trail and security monitoring

| Column           | Type         | Constraints | Description |
|-----------------|-------------|-------------|-------------|
| id              | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique log identifier |
| user_id         | INTEGER     | FOREIGN KEY → users.id | User who performed action |
| action          | VARCHAR     | NOT NULL | Action performed |
| parameters      | TEXT        | NULL | Action parameters |
| action_timestamp | TIMESTAMP  | DEFAULT CURRENT_TIMESTAMP | When action occurred |
| success         | BOOLEAN     | NOT NULL | Whether action succeeded |

**Relationships**:
- Many-to-one with users

## Additional Tables (From Migration)

### system_settings
**Purpose**: Store system configuration and settings

| Column        | Type         | Constraints | Description |
|--------------|-------------|-------------|-------------|
| id           | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique setting identifier |
| setting_key  | VARCHAR(100) | UNIQUE NOT NULL | Setting identifier |
| setting_value | TEXT        | NOT NULL | Setting value |
| description  | TEXT        | NULL | Setting description |
| updated_at   | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP | Last update time |

**Default Data**:
- VAT percentage setting (16%)

### sale_refunds
**Purpose**: Track refunds and returns

| Column           | Type         | Constraints | Description |
|-----------------|-------------|-------------|-------------|
| id              | INTEGER     | PRIMARY KEY, AUTO INCREMENT | Unique refund identifier |
| original_sale_id | INTEGER    | FOREIGN KEY → sales.id | Original sale being refunded |
| refund_amount   | DECIMAL(10,2) | NOT NULL | Amount refunded |
| reason          | TEXT        | NULL | Refund reason |
| refunded_by     | INTEGER     | FOREIGN KEY → users.id | User who processed refund |
| refund_date     | TIMESTAMP   | DEFAULT CURRENT_TIMESTAMP | Refund timestamp |

## Indexes

Performance optimization indexes:

```sql
-- Menu items indexes
CREATE INDEX idx_menu_items_category ON menu_items(category);
CREATE INDEX idx_menu_items_availability ON menu_items(availability);

-- Access logs indexes
CREATE INDEX idx_access_logs_user_timestamp ON access_logs(user_id, action_timestamp);

-- Sales indexes
CREATE INDEX idx_sales_status ON sales(status);
```

## Data Types and Constraints

### Decimal Precision
- **Monetary values**: DECIMAL(10,2) - supports up to $99,999,999.99
- **Quantities**: DECIMAL(10,3) - supports precise measurements

### Timestamp Handling
- **action_timestamp**: Auto-populated on record creation
- **updated_at**: Manual update required
- **Timezone**: All timestamps in UTC

### Foreign Key Relationships
- **Cascading Deletes**: Applied where appropriate (menu_ingredients)
- **Null Handling**: Most foreign keys allow NULL for flexibility

## Business Rules

### Data Integrity
1. **Menu Items**: Must have positive prices
2. **Ingredients**: Quantities cannot be negative
3. **Sales**: Must have valid payment methods
4. **Users**: Usernames must be unique

### Audit Trail
- All user actions logged in access_logs
- Timestamps preserved for all transactions
- Success/failure tracking for operations

### Financial Controls
- Subtotal and tax calculations stored separately
- Refund tracking maintains original sale references
- Expense categorization for reporting

## Query Patterns

### Common Joins
```sql
-- Sales with items
SELECT s.*, si.*, mi.name 
FROM sales s
JOIN sale_items si ON s.id = si.sales_id
JOIN menu_items mi ON si.menu_item_id = mi.id;

-- Menu items with ingredients
SELECT mi.name, i.name as ingredient, ming.quantity_used
FROM menu_items mi
JOIN menu_ingredients ming ON mi.id = ming.menu_item_id
JOIN ingredients i ON ming.ingredient_id = i.id;
```

### Reporting Queries
```sql
-- Daily sales summary
SELECT DATE(date) as sale_date, SUM(amount_paid) as daily_total
FROM sales
GROUP BY DATE(date)
ORDER BY sale_date DESC;

-- Low stock ingredients
SELECT name, quantity, low_stock_threshold
FROM ingredients
WHERE quantity <= low_stock_threshold;
```

This schema supports comprehensive restaurant management while maintaining data integrity and providing audit capabilities for business operations.
