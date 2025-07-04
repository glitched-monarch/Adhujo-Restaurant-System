
# Adhujo Restaurant ERP System Documentation

## Overview

Adhujo Restaurant ERP is a comprehensive restaurant management system built with React, TypeScript, and Supabase. It provides TallyPrime-inspired accounting features along with modern restaurant operations management.

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **UI Framework**: Tailwind CSS with shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: Tanstack React Query
- **Backend**: Supabase (PostgreSQL database with real-time features)
- **Build Tool**: Vite
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Project Structure

```
src/
├── components/
│   ├── ui/                     # Reusable UI components (shadcn/ui)
│   ├── common/                 # Shared components
│   │   └── DateRangeFilter.tsx # Date filtering component
│   └── restaurant/             # Business-specific components
│       ├── SalesPanel.tsx      # Sales management interface
│       ├── InventoryPanel.tsx  # Inventory tracking
│       ├── MenuManagementPanel.tsx # Menu item management
│       ├── ExpensePanel.tsx    # Expense tracking
│       ├── FinancialDashboard.tsx # Financial KPIs and metrics
│       ├── EnhancedReportsPanel.tsx # TallyPrime-style reports
│       ├── UsersPanel.tsx      # User management
│       ├── AccessLogsPanel.tsx # System audit logs
│       └── SystemSettingsPanel.tsx # Configuration settings
├── pages/
│   ├── Index.tsx              # Landing page
│   ├── Login.tsx              # Authentication page
│   ├── Dashboard.tsx          # Main application dashboard
│   └── NotFound.tsx           # 404 error page
├── integrations/
│   └── supabase/              # Supabase configuration and types
└── hooks/                     # Custom React hooks
```

## Core Features

### 1. Sales Management
- Process customer orders and transactions
- Support for multiple payment methods
- Customer information tracking
- Real-time sales reporting

### 2. Inventory Management
- Track stock levels and ingredient quantities
- Low stock alerts and notifications
- Expiry date monitoring
- Cost management and valuation

### 3. Menu Management
- Create and manage menu items
- Pricing and category organization
- Ingredient linking for cost calculation
- Availability management

### 4. Financial Dashboard
- Real-time financial KPIs
- Revenue and expense tracking
- Profit margin analysis
- Cash flow monitoring

### 5. Enhanced Reports (TallyPrime-Style)
- Profit & Loss statements
- Trial Balance reports
- Cash Flow statements
- Inventory valuation reports
- Advanced analytics and insights

### 6. User Management
- Role-based access control (Admin, Manager, Staff)
- User account management
- Permission-based feature access

### 7. System Administration
- Access logs and audit trails
- System settings configuration
- Security monitoring

## Database Schema

### Core Tables

#### users
- Manages user accounts and authentication
- Fields: id, username, password, role

#### menu_items
- Stores restaurant menu items
- Fields: id, name, price, category, availability, description

#### ingredients
- Tracks inventory ingredients
- Fields: id, name, quantity, unit, cost_per_unit, low_stock_threshold, expiry_date, category_name

#### sales
- Records sales transactions
- Fields: id, date, amount_paid, customer_name, payment_method, payment_ref, phone_number

#### sale_items
- Links menu items to sales transactions
- Fields: id, sales_id, menu_item_id, quantity, unit_price

#### reports_expenses
- Tracks business expenses
- Fields: id, entry_date, entry_type, category, total, notes

#### access_logs
- System audit trail
- Fields: id, user_id, action, parameters, action_timestamp, success

### Junction Tables

#### menu_ingredients
- Links menu items to required ingredients
- Fields: id, menu_item_id, ingredient_id, quantity_used

## Component Architecture

### AppSidebar Component
Located in `src/components/AppSidebar.tsx`

**Purpose**: Main navigation sidebar with role-based menu items

**Key Features**:
- Collapsible sidebar with mini-mode
- Role-based access control
- Active route highlighting
- Responsive design

**Props**:
- `userRole`: "admin" | "manager" | "staff"
- `onLogout`: Logout handler function

**Menu Items**:
- **Operations**: Sales, Inventory, Menu, Expenses, Financial, Reports
- **Administration**: Users, Access Logs, Settings (Admin only)

### Dashboard Component
Located in `src/pages/Dashboard.tsx`

**Purpose**: Main application container with routing logic

**Key Features**:
- Tab-based navigation using URL search params
- Role-based access control for panels
- Responsive layout with sidebar integration

**Access Control**:
- All users: Sales, Inventory
- Manager/Admin: Menu, Expenses, Reports, Financial
- Admin only: Users, Logs, Settings

### Enhanced Reports Panel
Located in `src/components/restaurant/EnhancedReportsPanel.tsx`

**Purpose**: TallyPrime-inspired comprehensive business reporting

**Features**:
- **Profit & Loss Statement**: Revenue/expense breakdown with charts
- **Trial Balance**: Account balances verification
- **Cash Flow Statement**: Money flow tracking
- **Inventory Reports**: Stock valuation and movement
- **Analytics**: Performance metrics and health scores

**Key Components**:
- Date range filtering
- Interactive charts (Bar, Line)
- Export functionality
- Summary cards with KPIs
- Tabbed interface for different report types

### Access Logs Panel
Located in `src/components/restaurant/AccessLogsPanel.tsx`

**Purpose**: System audit and security monitoring

**Features**:
- Real-time activity logging
- Search and filter capabilities
- Success/failure tracking
- User action monitoring
- Date range filtering

## User Roles and Permissions

### Staff
- Access: Sales, Inventory
- Can process sales and view inventory
- Limited system access

### Manager
- Access: Sales, Inventory, Menu, Expenses, Reports, Financial
- Can manage menu items and expenses
- View financial reports and analytics
- Cannot manage users or system settings

### Admin
- Full system access
- User management capabilities
- System configuration
- Access logs monitoring
- All manager permissions

## State Management

### React Query Integration
- Centralized data fetching and caching
- Real-time data synchronization
- Error handling and retry logic
- Background updates

### URL State Management
- Tab navigation through search parameters
- Bookmark-able application states
- Browser history integration

## Styling and UI

### Tailwind CSS
- Utility-first CSS framework
- Responsive design system
- Custom color schemes
- Dark mode support (via next-themes)

### shadcn/ui Components
- Pre-built accessible components
- Consistent design language
- Form components with validation
- Data display components (tables, charts)

## Data Visualization

### Recharts Integration
- Interactive bar and line charts
- Responsive chart containers
- Custom tooltips and legends
- Financial data visualization

### Key Metrics Display
- KPI cards with trend indicators
- Progress indicators
- Status badges and alerts
- Real-time data updates

## Security Features

### Role-Based Access Control
- Component-level permission checks
- Route protection
- Feature-based access control

### Audit Logging
- User action tracking
- System access monitoring
- Failed login attempt logging
- Data modification trails

## Development Guidelines

### Code Organization
- Feature-based component organization
- Separation of concerns
- Reusable component library
- Type-safe development with TypeScript

### Best Practices
- Responsive design principles
- Accessibility considerations
- Performance optimization
- Error boundary implementation

## API Integration

### Supabase Integration
- Real-time database updates
- Row-level security policies
- Authentication management
- File storage capabilities

### Data Flow
1. User interactions trigger React Query mutations
2. Data is sent to Supabase backend
3. Real-time updates propagate to all clients
4. UI updates reflect changes immediately

## Deployment and Configuration

### Environment Setup
- Supabase project configuration
- Environment variables management
- Build optimization settings

### Production Considerations
- Database security policies
- Performance monitoring
- Error tracking and logging
- Backup and recovery procedures

## Troubleshooting

### Common Issues
- Authentication flow problems
- Data synchronization issues
- Permission-related errors
- UI rendering problems

### Debug Tools
- React Developer Tools
- Supabase dashboard monitoring
- Browser console logging
- Network request inspection

## Future Enhancements

### Planned Features
- Mobile responsive improvements
- Advanced reporting capabilities
- Integration with external services
- Multi-location support
- Automated backup systems

This documentation provides a comprehensive overview of the Adhujo Restaurant ERP system. For specific implementation details, refer to individual component files and their inline documentation.
