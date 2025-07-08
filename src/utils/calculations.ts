// Business logic utilities - separated from components for easy testing and reuse

export const VAT_RATE = 0.16; // 16% VAT

export const calculateVAT = (basePrice: number): number => {
  return basePrice * VAT_RATE;
};

export const calculateTotalPrice = (basePrice: number): number => {
  const vatAmount = calculateVAT(basePrice);
  return Math.round(basePrice + vatAmount); // Round to nearest shilling
};

export const calculateSaleSubtotal = (items: { basePrice: number; quantity: number }[]): number => {
  return items.reduce((sum, item) => sum + (item.basePrice * item.quantity), 0);
};

export const calculateSaleVATTotal = (items: { vatAmount: number; quantity: number }[]): number => {
  return items.reduce((sum, item) => sum + (item.vatAmount * item.quantity), 0);
};

export const calculateSaleTotal = (subtotal: number, vatTotal: number): number => {
  return Math.round(subtotal + vatTotal);
};

export const calculateChange = (amountPaid: number, total: number): number => {
  return Math.max(0, amountPaid - total);
};

// Inventory utilities
export const getExpiryStatus = (expiryDate?: Date): 'expired' | 'expiring-soon' | 'expiring-week' | 'fresh' | null => {
  if (!expiryDate) return null;
  
  const today = new Date();
  const timeDiff = expiryDate.getTime() - today.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  
  if (daysDiff < 0) return "expired";
  if (daysDiff <= 3) return "expiring-soon";
  if (daysDiff <= 7) return "expiring-week";
  return "fresh";
};

export const isLowStock = (quantity: number, minStock: number): boolean => {
  return quantity <= minStock;
};

export const calculateInventoryValue = (items: { quantity: number; cost: number }[]): number => {
  return items.reduce((sum, item) => sum + (item.quantity * item.cost), 0);
};