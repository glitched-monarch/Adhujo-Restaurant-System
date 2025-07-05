
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { DateRangeFilter, DateRange } from "@/components/common/DateRangeFilter";
import { AccompanimentDialog } from "./AccompanimentDialog";
import { isWithinInterval } from "date-fns";

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
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [dateRange, setDateRange] = useState<DateRange | null>(null);
  const [isAccompanimentDialogOpen, setIsAccompanimentDialogOpen] = useState(false);
  const [pendingMenuItem, setPendingMenuItem] = useState<typeof mockMenuItems[0] | null>(null);

  const VAT_RATE = 0.16; // 16% VAT

  const calculateVAT = (basePrice: number) => {
    return basePrice * VAT_RATE;
  };

  const calculateTotalPrice = (basePrice: number) => {
    const vatAmount = calculateVAT(basePrice);
    return Math.round(basePrice + vatAmount); // Round to nearest shilling
  };

  const handleMenuItemSelect = () => {
    if (!selectedMenuItem) return;
    
    const menuItem = mockMenuItems.find(item => item.id === selectedMenuItem);
    if (!menuItem) return;

    // If the item has accompaniments, show the dialog
    if (menuItem.accompaniments.length > 0) {
      setPendingMenuItem(menuItem);
      setIsAccompanimentDialogOpen(true);
    } else {
      // Add item directly without accompaniments
      addItemToSale(menuItem, []);
    }
    
    setSelectedMenuItem("");
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

  const handleAccompanimentConfirm = (selectedAccompaniments: Accompaniment[]) => {
    if (pendingMenuItem) {
      addItemToSale(pendingMenuItem, selectedAccompaniments);
      setPendingMenuItem(null);
    }
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

  const currentSubtotal = currentSale.reduce((sum, item) => sum + (item.basePrice * item.quantity), 0);
  const currentVATTotal = currentSale.reduce((sum, item) => sum + (item.vatAmount * item.quantity), 0);
  const currentTotal = Math.round(currentSubtotal + currentVATTotal);

  const filteredSalesHistory = salesHistory.filter(sale => {
    if (!dateRange) return true;
    return isWithinInterval(sale.timestamp, { start: dateRange.from, end: dateRange.to });
  });

  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case "cash":
        return <Badge variant="secondary">Cash</Badge>;
      case "card":
        return <Badge variant="default">Card</Badge>;
      case "digital":
        return <Badge className="bg-green-100 text-green-800">Digital</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Sales Management</h2>
        <p className="text-gray-600">Process sales and view transaction history</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Current Sale */}
        <Card>
          <CardHeader>
            <CardTitle>New Sale</CardTitle>
            <CardDescription>Select menu items and process payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <Label htmlFor="menuItem">Select Menu Item</Label>
                <div className="flex gap-2">
                  <Select value={selectedMenuItem} onValueChange={setSelectedMenuItem}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Choose a menu item" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockMenuItems.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} - KSH {calculateTotalPrice(item.basePrice)} ({item.category})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button onClick={handleMenuItemSelect} disabled={!selectedMenuItem}>
                    Add Item
                  </Button>
                </div>
              </div>
            </div>

            {/* Current Sale Items */}
            {currentSale.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">Current Sale Items:</h4>
                {currentSale.map((item) => (
                  <div key={item.id} className="space-y-2 p-3 bg-gray-50 rounded">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <span className="font-medium">{item.name}</span>
                        <div className="text-sm text-gray-600">
                          Base: KSH {item.basePrice.toFixed(2)} • VAT: KSH {item.vatAmount.toFixed(2)} • Total: KSH {item.totalPrice}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    {item.accompaniments && item.accompaniments.length > 0 && (
                      <div className="text-sm">
                        <span className="text-gray-600">Accompaniments: </span>
                        {item.accompaniments.map((acc, index) => (
                          <span key={acc.id} className="text-blue-600">
                            {acc.name} (+KSH {acc.price})
                            {index < item.accompaniments!.length - 1 ? ", " : ""}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                <div className="border-t pt-4 space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>KSH {currentSubtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>VAT (16%):</span>
                    <span>KSH {currentVATTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>KSH {currentTotal}</span>
                  </div>
                </div>

                {/* Payment Section */}
                <div className="space-y-4 border-t pt-4">
                  <h4 className="font-medium">Payment Details:</h4>
                  <div>
                    <Label htmlFor="paymentMethod">Payment Method</Label>
                    <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="card">Credit/Debit Card</SelectItem>
                        <SelectItem value="digital">Digital Wallet</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {paymentMethod === "cash" && (
                    <div>
                      <Label htmlFor="amountPaid">Amount Paid (KSH)</Label>
                      <Input
                        id="amountPaid"
                        type="number"
                        step="1"
                        value={amountPaid}
                        onChange={(e) => setAmountPaid(e.target.value)}
                        placeholder={currentTotal.toString()}
                      />
                      {amountPaid && parseFloat(amountPaid) > currentTotal && (
                        <p className="text-sm text-muted-foreground mt-1">
                          Change: KSH {Math.round(parseFloat(amountPaid) - currentTotal)}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <Button onClick={completeSale} className="w-full">
                  Complete Sale
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Sales History */}
        <Card>
          <CardHeader>
            <CardTitle>Sales History</CardTitle>
            <CardDescription>Recent transaction history with date filtering</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <DateRangeFilter onDateRangeChange={setDateRange} />
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Time</TableHead>
                  <TableHead>Items</TableHead>
                  <TableHead>Payment</TableHead>
                  <TableHead>Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredSalesHistory.slice(0, 10).map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{sale.timestamp.toLocaleTimeString()}</TableCell>
                    <TableCell>{sale.items.length} items</TableCell>
                    <TableCell>{getPaymentMethodBadge(sale.paymentMethod)}</TableCell>
                    <TableCell>KSH {sale.total}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            
            {filteredSalesHistory.length === 0 && (
              <div className="text-center py-4 text-gray-500">
                No sales found for the selected date range.
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Accompaniment Selection Dialog */}
      {pendingMenuItem && (
        <AccompanimentDialog
          isOpen={isAccompanimentDialogOpen}
          onClose={() => {
            setIsAccompanimentDialogOpen(false);
            setPendingMenuItem(null);
          }}
          mainItem={pendingMenuItem}
          onConfirm={handleAccompanimentConfirm}
        />
      )}
    </div>
  );
};
