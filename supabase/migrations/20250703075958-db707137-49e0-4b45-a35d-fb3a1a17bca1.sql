
-- Create menu items table with proper structure
CREATE TABLE IF NOT EXISTS public.menu_items (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  category VARCHAR(100),
  availability BOOLEAN DEFAULT true,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create menu_ingredients junction table for linking menu items to ingredients
CREATE TABLE IF NOT EXISTS public.menu_ingredients (
  id SERIAL PRIMARY KEY,
  menu_item_id INTEGER REFERENCES public.menu_items(id) ON DELETE CASCADE,
  ingredient_id INTEGER REFERENCES public.ingredients(id) ON DELETE CASCADE,
  quantity_used DECIMAL(10,3) NOT NULL,
  UNIQUE(menu_item_id, ingredient_id)
);

-- Create access_logs table for tracking user actions
CREATE TABLE IF NOT EXISTS public.access_logs (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES public.users(id),
  action VARCHAR(255) NOT NULL,
  parameters TEXT,
  action_timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  success BOOLEAN NOT NULL
);

-- Create system_settings table for tax and discount configurations
CREATE TABLE IF NOT EXISTS public.system_settings (
  id SERIAL PRIMARY KEY,
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default VAT setting
INSERT INTO public.system_settings (setting_key, setting_value, description) 
VALUES ('vat_percentage', '16', 'VAT percentage applied to all sales')
ON CONFLICT (setting_key) DO NOTHING;

-- Update sales table to include subtotal and tax information
ALTER TABLE public.sales 
ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS total_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'completed';

-- Create sale_refunds table for tracking refunds
CREATE TABLE IF NOT EXISTS public.sale_refunds (
  id SERIAL PRIMARY KEY,
  original_sale_id INTEGER REFERENCES public.sales(id),
  refund_amount DECIMAL(10,2) NOT NULL,
  reason TEXT,
  refunded_by INTEGER REFERENCES public.users(id),
  refund_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON public.menu_items(category);
CREATE INDEX IF NOT EXISTS idx_menu_items_availability ON public.menu_items(availability);
CREATE INDEX IF NOT EXISTS idx_access_logs_user_timestamp ON public.access_logs(user_id, action_timestamp);
CREATE INDEX IF NOT EXISTS idx_sales_status ON public.sales(status);
