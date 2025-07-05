
import { useState } from "react";
import { isWithinInterval } from "date-fns";
import { DateRange } from "@/components/common/DateRangeFilter";
import { SalesForm } from "./sales/SalesForm";
import { CurrentSale } from "./sales/CurrentSale";
import { SalesHistory } from "./sales/SalesHistory";

interface Accompaniment {
  id: string;
  name: string;
  price: number;
  required: boolean;
}

interface SaleItem {
  id: string;
  name: string;
  basePrice: number;
  vatAmount: number;
  totalPrice: number;
  quantity: number;
  accompaniments?: Accompaniment[];
}

interface Sale {
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

// Mock menu items with accompaniments
const mockMenuItems = [
  {
    id: "1",
    name: "Grilled Chicken",
    basePrice: 450,
    category: "Main Course",
    accompaniments: [
      { id: "acc1", name: "Rice", price: 80, required: true },
      { id: "acc2", name: "Ugali", price: 60, required: true },
      { id: "acc3", name: "Salad", price: 120, required: false },
      { id: "acc4", name: "Extra Sauce", price: 30, required: false }
    ]
  },
  {
    id: "2",
    name: "Fish Fillet",
    basePrice: 380,
    category: "Main Course",
    accompaniments: [
      { id: "acc1", name: "Rice", price: 80, required: true },
      { id: "acc2", name: "Ugali", price: 60, required: true },
      { id: "acc5", name: "Vegetables", price: 100, required: false }
    ]
  },
  {
    id: "3",
    name: "Beef Stew",
    basePrice: 520,
    category: "Main Course",
    accompaniments: [
      { id: "acc1", name: "Rice", price: 80, required: true },
      { id: "acc2", name: "Ugali", price: 60, required: true },
      { id: "acc6", name: "Chapati", price: 40, required: false }
    ]
  },
  {
    id: "4",
    name: "Soda",
    basePrice: 80,
    category: "Beverages",
    accompaniments: []
  }
];

export const SalesPanel = () => {
  const [currentSale, setCurrentSale] = useState<SaleItem[]>([]);
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | null>(null);

  const VAT_RATE = 0.16; // 16% VAT

  const calculateVAT = (basePrice: number) => {
    return basePrice * VAT_RATE;
  };

  const calculateTotalPrice = (basePrice: number) => {
    const vatAmount = calculateVAT(basePrice);
    return Math.round(basePrice + vatAmount); // Round to nearest shilling
  };

  const addItemToSale = (menuItem: typeof mockMenuItems[0], selectedAccompaniments: Accompaniment[]) => {
    const accompanimentTotal = selectedAccompaniments.reduce((sum, acc) => sum + acc.price, 0);
    const totalBasePrice = menuItem.basePrice + accompanimentTotal;
    const vatAmount = calculateVAT(totalBasePrice);
    const totalPrice = calculateTotalPrice(totalBasePrice);
    
    const newItem: SaleItem = {
      id: Date.now().toString(),
      name: menuItem.name,
      basePrice: totalBasePrice,
      vatAmount,
      totalPrice,
      quantity: 1,
      accompaniments: selectedAccompaniments
    };

    setCurrentSale([...currentSale, newItem]);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCurrentSale(currentSale.map(item => 
      item.id === id 
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ).filter(item => item.quantity > 0));
  };

  const completeSale = () => {
    if (currentSale.length === 0) return;

    const subtotal = currentSale.reduce((sum, item) => sum + (item.basePrice * item.quantity), 0);
    const vatTotal = currentSale.reduce((sum, item) => sum + (item.vatAmount * item.quantity), 0);
    const total = Math.round(subtotal + vatTotal); // Round to nearest shilling
    const paidAmount = parseFloat(amountPaid) || total;
    const change = Math.max(0, paidAmount - total);

    const newSale: Sale = {
      id: Date.now().toString(),
      items: [...currentSale],
      subtotal,
      vatTotal,
      total,
      paymentMethod,
      amountPaid: paidAmount,
      change,
      timestamp: new Date()
    };

    setSalesHistory([newSale, ...salesHistory]);
    setCurrentSale([]);
    setAmountPaid("");
    setPaymentMethod("cash");
    
    console.log("Sale completed:", newSale);
  };

  const filteredSalesHistory = salesHistory.filter(sale => {
    if (!dateRange) return true;
    return isWithinInterval(sale.timestamp, { start: dateRange.from, end: dateRange.to });
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Sales Management</h2>
        <p className="text-gray-600">Process sales and view transaction history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <SalesForm 
            mockMenuItems={mockMenuItems}
            onAddItem={addItemToSale}
            calculateTotalPrice={calculateTotalPrice}
          />
          
          <CurrentSale
            currentSale={currentSale}
            paymentMethod={paymentMethod}
            amountPaid={amountPaid}
            onUpdateQuantity={updateQuantity}
            onPaymentMethodChange={setPaymentMethod}
            onAmountPaidChange={setAmountPaid}
            onCompleteSale={completeSale}
          />
        </div>

        <SalesHistory
          salesHistory={salesHistory}
          filteredSalesHistory={filteredSalesHistory}
          onDateRangeChange={setDateRange}
        />
      </div>
    </div>
  );
};
