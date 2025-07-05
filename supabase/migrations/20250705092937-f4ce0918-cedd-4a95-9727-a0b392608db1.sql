
-- Clear existing ingredients
DELETE FROM public.menu_ingredients;
DELETE FROM public.ingredients;

-- Update the menu_items table to include proper structure with availability and description
ALTER TABLE public.menu_items 
ADD COLUMN IF NOT EXISTS availability BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS description TEXT,
ADD COLUMN IF NOT EXISTS created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

-- Update sales table to include subtotal and tax information (from previous migration)
ALTER TABLE public.sales 
ADD COLUMN IF NOT EXISTS subtotal DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS tax_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS total_amount DECIMAL(10,2),
ADD COLUMN IF NOT EXISTS status VARCHAR(50) DEFAULT 'completed';

-- Update users table to include phone number and ID number
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS phone_number VARCHAR(20),
ADD COLUMN IF NOT EXISTS id_number VARCHAR(50);

-- Create system_settings table for VAT and other configurations
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
