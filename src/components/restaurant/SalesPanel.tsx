
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
import { isWithinInterval } from "date-fns";

interface SaleItem {
  id: string;
  name: string;
  basePrice: number;
  vatAmount: number;
  totalPrice: number;
  quantity: number;
  accompaniments?: Array<{
    name: string;
    price: number;
  }>;
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

export const SalesPanel = () => {
  const [currentSale, setCurrentSale] = useState<SaleItem[]>([]);
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemBasePrice, setItemBasePrice] = useState("");
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

  const addItemToSale = () => {
    if (!itemName || !itemBasePrice) return;
    
    const basePrice = parseFloat(itemBasePrice);
    const vatAmount = calculateVAT(basePrice);
    const totalPrice = calculateTotalPrice(basePrice);
    
    const newItem: SaleItem = {
      id: Date.now().toString(),
      name: itemName,
      basePrice,
      vatAmount,
      totalPrice,
      quantity: 1
    };

    setCurrentSale([...currentSale, newItem]);
    setItemName("");
    setItemBasePrice("");
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
            <CardDescription>Add items and process payment</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder="Enter item name"
                />
              </div>
              <div>
                <Label htmlFor="itemBasePrice">Base Price (KSH)</Label>
                <Input
                  id="itemBasePrice"
                  type="number"
                  step="0.01"
                  value={itemBasePrice}
                  onChange={(e) => setItemBasePrice(e.target.value)}
                  placeholder="0.00"
                />
                {itemBasePrice && (
                  <div className="text-xs text-gray-600 mt-1">
                    Total: KSH {calculateTotalPrice(parseFloat(itemBasePrice))} (incl. VAT)
                  </div>
                )}
              </div>
            </div>
            <Button onClick={addItemToSale} className="w-full">
              Add Item
            </Button>

            {/* Current Sale Items */}
            {currentSale.length > 0 && (
              <div className="space-y-4">
                <h4 className="font-medium">Current Sale Items:</h4>
                {currentSale.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div>
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
    </div>
  );
};
