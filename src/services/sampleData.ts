
import { MenuItem, InventoryItem, Sale, SaleItem } from './database';

export const sampleMenuItems: Omit<MenuItem, 'id'>[] = [
  {
    name: "Grilled Chicken Breast",
    basePrice: 850,
    vatRate: 0.16,
    totalPrice: 986,
    category: "Main Course",
    availability: true,
    description: "Tender grilled chicken breast with herbs and spices",
    ingredients: [
      { id: "1", name: "Chicken Breast", quantity: 300, unit: "g" },
      { id: "2", name: "Olive Oil", quantity: 15, unit: "ml" },
      { id: "3", name: "Mixed Herbs", quantity: 5, unit: "g" }
    ],
    accompaniments: [
      { id: "1", name: "Rice", price: 150, required: false },
      { id: "2", name: "Vegetables", price: 100, required: false }
    ]
  },
  {
    name: "Beef Burger",
    basePrice: 650,
    vatRate: 0.16,
    totalPrice: 754,
    category: "Fast Food",
    availability: true,
    description: "Juicy beef patty with fresh lettuce and tomato",
    ingredients: [
      { id: "4", name: "Ground Beef", quantity: 200, unit: "g" },
      { id: "5", name: "Burger Bun", quantity: 1, unit: "piece" },
      { id: "6", name: "Lettuce", quantity: 50, unit: "g" },
      { id: "7", name: "Tomato", quantity: 80, unit: "g" }
    ],
    accompaniments: [
      { id: "3", name: "French Fries", price: 200, required: false },
      { id: "4", name: "Cheese", price: 80, required: false }
    ]
  },
  {
    name: "Caesar Salad",
    basePrice: 450,
    vatRate: 0.16,
    totalPrice: 522,
    category: "Appetizer",
    availability: true,
    description: "Fresh romaine lettuce with Caesar dressing and croutons",
    ingredients: [
      { id: "6", name: "Lettuce", quantity: 150, unit: "g" },
      { id: "8", name: "Caesar Dressing", quantity: 30, unit: "ml" },
      { id: "9", name: "Croutons", quantity: 25, unit: "g" },
      { id: "10", name: "Parmesan Cheese", quantity: 20, unit: "g" }
    ],
    accompaniments: []
  },
  {
    name: "Chocolate Cake",
    basePrice: 350,
    vatRate: 0.16,
    totalPrice: 406,
    category: "Dessert",
    availability: true,
    description: "Rich chocolate cake with vanilla frosting",
    ingredients: [
      { id: "11", name: "Flour", quantity: 100, unit: "g" },
      { id: "12", name: "Cocoa Powder", quantity: 30, unit: "g" },
      { id: "13", name: "Sugar", quantity: 80, unit: "g" },
      { id: "14", name: "Butter", quantity: 50, unit: "g" }
    ],
    accompaniments: [
      { id: "5", name: "Ice Cream", price: 120, required: false }
    ]
  },
  {
    name: "Fish and Chips",
    basePrice: 750,
    vatRate: 0.16,
    totalPrice: 870,
    category: "Main Course",
    availability: true,
    description: "Battered fish fillet with crispy chips",
    ingredients: [
      { id: "15", name: "White Fish", quantity: 250, unit: "g" },
      { id: "16", name: "Potatoes", quantity: 300, unit: "g" },
      { id: "17", name: "Flour", quantity: 50, unit: "g" },
      { id: "2", name: "Olive Oil", quantity: 100, unit: "ml" }
    ],
    accompaniments: [
      { id: "6", name: "Tartar Sauce", price: 50, required: false },
      { id: "7", name: "Mushy Peas", price: 80, required: false }
    ]
  }
];

export const sampleInventoryItems: Omit<InventoryItem, 'id'>[] = [
  {
    name: "Chicken Breast",
    quantity: 50,
    unit: "kg",
    minStock: 20,
    cost: 650,
    expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  },
  {
    name: "Ground Beef",
    quantity: 30,
    unit: "kg",
    minStock: 15,
    cost: 800,
    expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
  },
  {
    name: "White Fish",
    quantity: 25,
    unit: "kg",
    minStock: 10,
    cost: 900,
    expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  },
  {
    name: "Lettuce",
    quantity: 15,
    unit: "kg",
    minStock: 5,
    cost: 150,
    expiryDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000)
  },
  {
    name: "Tomatoes",
    quantity: 20,
    unit: "kg",
    minStock: 8,
    cost: 200,
    expiryDate: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000)
  },
  {
    name: "Potatoes",
    quantity: 40,
    unit: "kg",
    minStock: 15,
    cost: 120,
    expiryDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
  },
  {
    name: "Olive Oil",
    quantity: 8,
    unit: "L",
    minStock: 3,
    cost: 850,
    expiryDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
  },
  {
    name: "Flour",
    quantity: 25,
    unit: "kg",
    minStock: 10,
    cost: 180,
    expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
  },
  {
    name: "Sugar",
    quantity: 12,
    unit: "kg",
    minStock: 5,
    cost: 220,
    expiryDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
  },
  {
    name: "Butter",
    quantity: 6,
    unit: "kg",
    minStock: 2,
    cost: 750,
    expiryDate: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000)
  }
];

// Generate sample sales data for the last 30 days
export const generateSampleSales = (): Omit<Sale, 'id'>[] => {
  const sales: Omit<Sale, 'id'>[] = [];
  const now = new Date();
  
  for (let i = 0; i < 30; i++) {
    const saleDate = new Date(now.getTime() - (i * 24 * 60 * 60 * 1000));
    const numSales = Math.floor(Math.random() * 8) + 3; // 3-10 sales per day
    
    for (let j = 0; j < numSales; j++) {
      const items: SaleItem[] = [];
      const numItems = Math.floor(Math.random() * 3) + 1; // 1-3 items per sale
      
      let subtotal = 0;
      
      for (let k = 0; k < numItems; k++) {
        const menuItem = sampleMenuItems[Math.floor(Math.random() * sampleMenuItems.length)];
        const quantity = Math.floor(Math.random() * 2) + 1; // 1-2 quantity
        const basePrice = menuItem.basePrice;
        const vatAmount = basePrice * menuItem.vatRate;
        const totalPrice = basePrice + vatAmount;
        
        const saleItem: SaleItem = {
          id: `${Date.now()}_${k}`,
          name: menuItem.name,
          basePrice,
          vatAmount,
          totalPrice,
          quantity,
          accompaniments: Math.random() > 0.7 ? menuItem.accompaniments.slice(0, 1) : []
        };
        
        items.push(saleItem);
        subtotal += totalPrice * quantity;
        
        // Add accompaniment cost if any
        saleItem.accompaniments?.forEach(acc => {
          subtotal += acc.price * quantity;
        });
      }
      
      const vatTotal = subtotal * 0.16;
      const total = subtotal + vatTotal;
      
      const paymentMethods = ['cash', 'mpesa', 'card'];
      const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
      
      const sale: Omit<Sale, 'id'> = {
        items,
        subtotal,
        vatTotal,
        total,
        paymentMethod,
        amountPaid: total + Math.floor(Math.random() * 100), // Sometimes overpaid
        change: Math.max(0, Math.floor(Math.random() * 100)),
        timestamp: new Date(saleDate.getTime() + Math.random() * 24 * 60 * 60 * 1000)
      };
      
      sales.push(sale);
    }
  }
  
  return sales;
};

export const initializeSampleData = async () => {
  const { database } = await import('./database');
  
  // Check if data already exists
  const existingMenuItems = await database.getMenuItems();
  const existingInventory = await database.getInventoryItems();
  const existingSales = await database.getSales();
  
  // Add sample menu items if none exist
  if (existingMenuItems.length === 0) {
    for (const item of sampleMenuItems) {
      await database.createMenuItem(item);
    }
    console.log('Sample menu items added');
  }
  
  // Add sample inventory if none exists
  if (existingInventory.length === 0) {
    for (const item of sampleInventoryItems) {
      await database.createInventoryItem(item);
    }
    console.log('Sample inventory items added');
  }
  
  // Add sample sales if none exist
  if (existingSales.length === 0) {
    const sampleSales = generateSampleSales();
    for (const sale of sampleSales) {
      await database.createSale(sale);
    }
    console.log('Sample sales data added');
  }
};
