
# Component Reference Guide

## Core Components

### AppSidebar (`src/components/AppSidebar.tsx`)

**Description**: Main navigation sidebar with collapsible functionality and role-based access control.

**Props**:
```typescript
interface AppSidebarProps {
  userRole: "admin" | "manager" | "staff";
  onLogout: () => void;
}
```

**Features**:
- Collapsible sidebar (full-width ↔ mini-mode)
- Role-based menu filtering
- Active tab highlighting
- Responsive design with icons

**Usage**:
```tsx
<AppSidebar 
  userRole="admin" 
  onLogout={() => window.location.href = "/login"} 
/>
```

### Dashboard (`src/pages/Dashboard.tsx`)

**Description**: Main application container managing tab navigation and panel rendering.

**Key Functions**:
- `renderActivePanel()`: Renders appropriate panel based on active tab
- `getPageTitle()`: Returns page title for current tab
- Role-based access control for each panel

**Navigation Logic**:
```typescript
const activeTab = searchParams.get('tab') || 'sales';
```

## Restaurant Management Components

### SalesPanel (`src/components/restaurant/SalesPanel.tsx`)

**Purpose**: Handle customer transactions and sales processing
**Access**: All user roles
**Features**: Order processing, payment methods, customer management

### InventoryPanel (`src/components/restaurant/InventoryPanel.tsx`)

**Purpose**: Track and manage restaurant inventory
**Access**: All user roles
**Features**: Stock levels, expiry tracking, cost management

### MenuManagementPanel (`src/components/restaurant/MenuManagementPanel.tsx`)

**Purpose**: Manage menu items and pricing
**Access**: Manager, Admin
**Features**: Item creation, pricing, categorization, availability

### ExpensePanel (`src/components/restaurant/ExpensePanel.tsx`)

**Purpose**: Track business expenses and costs
**Access**: Manager, Admin
**Features**: Expense recording, categorization, reporting

### FinancialDashboard (`src/components/restaurant/FinancialDashboard.tsx`)

**Purpose**: Display financial KPIs and metrics
**Access**: Manager, Admin
**Features**: Revenue tracking, profit analysis, financial health

### EnhancedReportsPanel (`src/components/restaurant/EnhancedReportsPanel.tsx`)

**Purpose**: TallyPrime-style comprehensive business reports
**Access**: Manager, Admin

**Key Features**:
- **Profit & Loss Statement**: Revenue and expense breakdown
- **Trial Balance**: Account balance verification
- **Cash Flow Statement**: Money flow tracking
- **Inventory Reports**: Stock valuation and movement
- **Analytics**: Performance metrics

**Data Structure**:
```typescript
interface ReportData {
  profitLoss: {
    revenue: number;
    expenses: number;
    profit: number;
    period: string;
  }[];
  trialBalance: {
    account: string;
    debit: number;
    credit: number;
    balance: number;
  }[];
  cashFlow: {
    date: string;
    inflow: number;
    outflow: number;
    balance: number;
  }[];
  inventory: {
    item: string;
    opening: number;
    purchased: number;
    consumed: number;
    closing: number;
    value: number;
  }[];
}
```

**Chart Components**:
- Bar charts for P&L visualization
- Line charts for cash flow trends
- Responsive containers with tooltips

### UsersPanel (`src/components/restaurant/UsersPanel.tsx`)

**Purpose**: Manage user accounts and roles
**Access**: Admin only
**Features**: User creation, role assignment, account management

### AccessLogsPanel (`src/components/restaurant/AccessLogsPanel.tsx`)

**Purpose**: System audit and security monitoring
**Access**: Admin only

**Features**:
- Real-time activity logging
- Search and filter functionality
- Success/failure tracking
- Date range filtering

**Log Structure**:
```typescript
interface AccessLog {
  id: number;
  user: string;
  action: string;
  parameters: string;
  timestamp: string;
  success: boolean;
}
```

**Filter Options**:
- Search by user or action
- Filter by success/failure status
- Date range filtering

### SystemSettingsPanel (`src/components/restaurant/SystemSettingsPanel.tsx`)

**Purpose**: System configuration and settings
**Access**: Admin only
**Features**: Tax settings, system preferences, configuration management

## Common Components

### DateRangeFilter (`src/components/common/DateRangeFilter.tsx`)

**Purpose**: Reusable date range selection component
**Usage**: Reports, analytics, and data filtering

**Props**:
```typescript
interface DateRangeFilterProps {
  onDateRangeChange: (range: DateRange | null) => void;
}

interface DateRange {
  from: Date;
  to: Date;
}
```

## UI Components (shadcn/ui)

### Core UI Components
Located in `src/components/ui/`

**Key Components**:
- `Button`: Primary actions and navigation
- `Card`: Content containers with headers
- `Table`: Data display with sorting
- `Tabs`: Tabbed interfaces
- `Select`: Dropdown selections
- `Input`: Form inputs with validation
- `Badge`: Status indicators
- `Sidebar`: Navigation container

### Form Components
- `Form`: Form wrapper with validation
- `Label`: Accessible form labels
- `Checkbox`: Boolean inputs
- `RadioGroup`: Single selection groups
- `Textarea`: Multi-line text inputs

### Data Display
- `Table`: Structured data display
- `Card`: Content grouping
- `Badge`: Status and category indicators
- `Progress`: Loading and completion states

### Navigation
- `Sidebar`: Main navigation container
- `SidebarTrigger`: Collapse/expand controls
- `Tabs`: Sectioned content navigation

## Styling Patterns

### Layout Classes
```css
/* Responsive containers */
.grid.grid-cols-1.md:grid-cols-2.lg:grid-cols-4

/* Spacing utilities */
.space-y-4, .space-x-2, .gap-4

/* Flexbox layouts */
.flex.items-center.justify-between
```

### Color Schemes
```css
/* Status colors */
.text-green-600   /* Success/positive */
.text-red-600     /* Error/negative */
.text-blue-600    /* Information */
.text-gray-600    /* Secondary text */

/* Background variants */
.bg-green-50      /* Light success background */
.bg-red-50        /* Light error background */
```

### Interactive States
```css
/* Hover effects */
.hover:bg-gray-100
.hover:text-primary

/* Focus states */
.focus:ring-2.focus:ring-primary

/* Active states */
.bg-muted.text-primary (for active navigation)
```

## Component Patterns

### Role-Based Rendering
```typescript
const canAccess = (item: { access: string[] }) => {
  return item.access.includes(userRole);
};

// Usage in render
{menuItems.filter(canAccess).map((item) => (
  <MenuItem key={item.id} {...item} />
))}
```

### Conditional Panel Rendering
```typescript
const renderActivePanel = () => {
  switch (activeTab) {
    case 'sales':
      return <SalesPanel />;
    case 'inventory':
      return <InventoryPanel />;
    case 'menu':
      return canAccessMenu ? <MenuManagementPanel /> : <AccessDenied />;
    default:
      return <SalesPanel />;
  }
};
```

### Data Filtering Patterns
```typescript
const filteredData = useMemo(() => {
  return data.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDateRange = !dateRange || isWithinInterval(
      new Date(item.date),
      { start: dateRange.from, end: dateRange.to }
    );
    return matchesSearch && matchesDateRange;
  });
}, [data, searchTerm, dateRange]);
```

This reference guide provides detailed information about each component's purpose, props, and usage patterns within the Adhujo Restaurant ERP system.
