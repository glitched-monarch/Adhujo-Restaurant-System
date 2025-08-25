
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Minus, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useMenuItems } from "@/hooks/useMenuItems";

interface SaleItem {
  id: string;
  menuItemId: number;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

interface NewSaleFormProps {
  onBack: () => void;
  onSubmit: (sale: any) => void;
}

export const NewSaleForm = ({ onBack, onSubmit }: NewSaleFormProps) => {
  const { menuItems, loading } = useMenuItems();
  const [saleItems, setSaleItems] = useState<SaleItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [amountPaid, setAmountPaid] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");

  const addMenuItem = (menuItemId: number) => {
    const menuItem = menuItems.find(item => item.id === menuItemId);
    if (!menuItem) return;

    const existingItem = saleItems.find(item => item.menuItemId === menuItemId);
    
    if (existingItem) {
      setSaleItems(items => 
        items.map(item => 
          item.menuItemId === menuItemId 
            ? { ...item, quantity: item.quantity + 1, total: (item.quantity + 1) * item.price }
            : item
        )
      );
    } else {
      const newSaleItem: SaleItem = {
        id: Date.now().toString(),
        menuItemId: menuItem.id,
        name: menuItem.name,
        price: menuItem.basePrice,
        quantity: 1,
        total: menuItem.basePrice
      };
      setSaleItems(items => [...items, newSaleItem]);
    }
  };

  const updateQuantity = (id: string, delta: number) => {
    setSaleItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity, total: newQuantity * item.price };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  };

  const subtotal = saleItems.reduce((sum, item) => sum + item.total, 0);
  const vatAmount = subtotal * 0.16; // 16% VAT
  const total = subtotal + vatAmount;
  const paidAmount = parseFloat(amountPaid) || 0;
  const change = Math.max(0, paidAmount - total);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (saleItems.length === 0) {
      toast.error("Please add at least one item to the sale");
      return;
    }

    if (paidAmount < total) {
      toast.error("Amount paid must be at least the total amount");
      return;
    }

    const saleData = {
      items: saleItems,
      subtotal,
      vatAmount,
      total,
      paymentMethod,
      amountPaid: paidAmount,
      change,
      customerName,
      notes,
      timestamp: new Date()
    };

    onSubmit(saleData);
    toast.success("Sale completed successfully!");
    onBack();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p>Loading menu items...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h2 className="text-2xl font-bold">New Sale</h2>
            <p className="text-gray-600">Create a new sale transaction</p>
          </div>
        </div>
      </div>

      <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Menu Items */}
        <Card>
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => addMenuItem(item.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <p className="text-xs text-gray-500">{item.category}</p>
                      <p className="text-sm font-bold text-green-600">${item.basePrice}</p>
                    </div>
                    <Plus className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Current Sale */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Current Sale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="customerName">Customer Name (Optional)</Label>
                <Input
                  id="customerName"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter customer name"
                />
              </div>

              {/* Sale Items */}
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {saleItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">${item.price} each</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, -1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <span className="w-16 text-right font-medium">${item.total.toFixed(2)}</span>
                    </div>
                  </div>
                ))}
              </div>

              {saleItems.length === 0 && (
                <p className="text-center text-gray-500 py-8">No items added yet</p>
              )}

              {/* Totals */}
              {saleItems.length > 0 && (
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>VAT (16%):</span>
                    <span>${vatAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash">Cash</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="amountPaid">Amount Paid</Label>
                <Input
                  id="amountPaid"
                  type="number"
                  step="0.01"
                  min={total.toFixed(2)}
                  value={amountPaid}
                  onChange={(e) => setAmountPaid(e.target.value)}
                  placeholder="Enter amount paid"
                />
                {paidAmount > 0 && paidAmount >= total && (
                  <p className="text-sm text-green-600 mt-1">
                    Change: ${change.toFixed(2)}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="notes">Notes</Label>
                <Input
                  id="notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Additional notes"
                />
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
                <Button type="submit" className="flex items-center gap-2" disabled={saleItems.length === 0}>
                  <ShoppingCart className="h-4 w-4" />
                  Complete Sale
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
