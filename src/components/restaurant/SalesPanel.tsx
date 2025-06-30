
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Minus } from "lucide-react";

interface SaleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface Sale {
  id: string;
  items: SaleItem[];
  total: number;
  timestamp: Date;
}

export const SalesPanel = () => {
  const [currentSale, setCurrentSale] = useState<SaleItem[]>([]);
  const [salesHistory, setSalesHistory] = useState<Sale[]>([]);
  const [itemName, setItemName] = useState("");
  const [itemPrice, setItemPrice] = useState("");

  const addItemToSale = () => {
    if (!itemName || !itemPrice) return;
    
    const newItem: SaleItem = {
      id: Date.now().toString(),
      name: itemName,
      price: parseFloat(itemPrice),
      quantity: 1
    };

    setCurrentSale([...currentSale, newItem]);
    setItemName("");
    setItemPrice("");
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

    const total = currentSale.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const newSale: Sale = {
      id: Date.now().toString(),
      items: [...currentSale],
      total,
      timestamp: new Date()
    };

    setSalesHistory([newSale, ...salesHistory]);
    setCurrentSale([]);
    
    // Here you would also update inventory
    console.log("Sale completed:", newSale);
  };

  const currentTotal = currentSale.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Current Sale */}
      <Card>
        <CardHeader>
          <CardTitle>New Sale</CardTitle>
          <CardDescription>Add items to the current sale</CardDescription>
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
              <Label htmlFor="itemPrice">Price</Label>
              <Input
                id="itemPrice"
                type="number"
                step="0.01"
                value={itemPrice}
                onChange={(e) => setItemPrice(e.target.value)}
                placeholder="0.00"
              />
            </div>
          </div>
          <Button onClick={addItemToSale} className="w-full">
            Add Item
          </Button>

          {/* Current Sale Items */}
          {currentSale.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Current Sale Items:</h4>
              {currentSale.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <span>{item.name} - ${item.price}</span>
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
              <div className="text-right font-bold">
                Total: ${currentTotal.toFixed(2)}
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
          <CardTitle>Recent Sales</CardTitle>
          <CardDescription>Recent transaction history</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Time</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {salesHistory.slice(0, 10).map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{sale.timestamp.toLocaleTimeString()}</TableCell>
                  <TableCell>{sale.items.length} items</TableCell>
                  <TableCell>${sale.total.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
