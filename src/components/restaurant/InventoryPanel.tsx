
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Minus, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface InventoryItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  minStock: number;
  cost: number;
  expiryDate?: Date;
}

export const InventoryPanel = () => {
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { id: "1", name: "Flour", quantity: 50, unit: "kg", minStock: 10, cost: 2.5, expiryDate: new Date("2024-02-15") },
    { id: "2", name: "Tomatoes", quantity: 25, unit: "kg", minStock: 5, cost: 3.0, expiryDate: new Date("2024-01-08") },
    { id: "3", name: "Cheese", quantity: 15, unit: "kg", minStock: 3, cost: 8.0, expiryDate: new Date("2024-01-12") },
    { id: "4", name: "Chicken", quantity: 8, unit: "kg", minStock: 5, cost: 12.0, expiryDate: new Date("2024-01-07") },
    { id: "5", name: "Lettuce", quantity: 2, unit: "kg", minStock: 3, cost: 2.0, expiryDate: new Date("2024-01-06") },
  ]);

  const [newItem, setNewItem] = useState({
    name: "",
    quantity: "",
    unit: "",
    minStock: "",
    cost: "",
    expiryDate: ""
  });

  const addInventoryItem = () => {
    if (!newItem.name || !newItem.quantity || !newItem.unit) return;

    const item: InventoryItem = {
      id: Date.now().toString(),
      name: newItem.name,
      quantity: parseFloat(newItem.quantity),
      unit: newItem.unit,
      minStock: parseFloat(newItem.minStock) || 0,
      cost: parseFloat(newItem.cost) || 0,
      expiryDate: newItem.expiryDate ? new Date(newItem.expiryDate) : undefined
    };

    setInventory([...inventory, item]);
    setNewItem({ name: "", quantity: "", unit: "", minStock: "", cost: "", expiryDate: "" });
  };

  const updateQuantity = (id: string, delta: number) => {
    setInventory(inventory.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(0, item.quantity + delta) }
        : item
    ));
  };

  const lowStockItems = inventory.filter(item => item.quantity <= item.minStock);
  
  const getExpiryStatus = (expiryDate?: Date) => {
    if (!expiryDate) return null;
    
    const today = new Date();
    const timeDiff = expiryDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (daysDiff < 0) return "expired";
    if (daysDiff <= 3) return "expiring-soon";
    if (daysDiff <= 7) return "expiring-week";
    return "fresh";
  };

  const getExpiryBadge = (expiryDate?: Date) => {
    if (!expiryDate) return null;
    
    const status = getExpiryStatus(expiryDate);
    const daysDiff = Math.ceil((expiryDate.getTime() - new Date().getTime()) / (1000 * 3600 * 24));
    
    switch (status) {
      case "expired":
        return <Badge variant="destructive">Expired</Badge>;
      case "expiring-soon":
        return <Badge className="bg-red-100 text-red-800">Expires in {daysDiff} days</Badge>;
      case "expiring-week":
        return <Badge className="bg-yellow-100 text-yellow-800">Expires in {daysDiff} days</Badge>;
      default:
        return <Badge variant="secondary">Fresh</Badge>;
    }
  };

  const expiredItems = inventory.filter(item => getExpiryStatus(item.expiryDate) === "expired");
  const expiringSoonItems = inventory.filter(item => getExpiryStatus(item.expiryDate) === "expiring-soon");

  return (
    <div className="space-y-6">
      {/* Critical Alerts */}
      {(expiredItems.length > 0 || expiringSoonItems.length > 0) && (
        <Card className="border-red-200 bg-red-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-800">
              <AlertTriangle className="h-5 w-5" />
              Critical Expiry Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expiredItems.map(item => (
                <div key={item.id} className="text-red-800 font-semibold">
                  ⚠️ {item.name}: EXPIRED on {item.expiryDate?.toLocaleDateString()}
                </div>
              ))}
              {expiringSoonItems.map(item => (
                <div key={item.id} className="text-red-700">
                  🔸 {item.name}: Expires {item.expiryDate?.toLocaleDateString()}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Low Stock Alert */}
      {lowStockItems.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="h-5 w-5" />
              Low Stock Alert
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {lowStockItems.map(item => (
                <div key={item.id} className="text-yellow-800">
                  {item.name}: {item.quantity} {item.unit} (Min: {item.minStock})
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Add New Item */}
        <Card>
          <CardHeader>
            <CardTitle>Add Inventory Item</CardTitle>
            <CardDescription>Add new ingredients to inventory</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                placeholder="Enter item name"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={newItem.quantity}
                  onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Input
                  id="unit"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  placeholder="kg, pieces, etc."
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="minStock">Min Stock</Label>
                <Input
                  id="minStock"
                  type="number"
                  value={newItem.minStock}
                  onChange={(e) => setNewItem({ ...newItem, minStock: e.target.value })}
                  placeholder="0"
                />
              </div>
              <div>
                <Label htmlFor="cost">Cost per Unit</Label>
                <Input
                  id="cost"
                  type="number"
                  step="0.01"
                  value={newItem.cost}
                  onChange={(e) => setNewItem({ ...newItem, cost: e.target.value })}
                  placeholder="0.00"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="expiryDate">Expiry Date (Optional)</Label>
              <Input
                id="expiryDate"
                type="date"
                value={newItem.expiryDate}
                onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
              />
            </div>
            <Button onClick={addInventoryItem} className="w-full">
              Add Item
            </Button>
          </CardContent>
        </Card>

        {/* Inventory Summary */}
        <Card>
          <CardHeader>
            <CardTitle>Inventory Summary</CardTitle>
            <CardDescription>Current stock levels and alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>Total Items: {inventory.length}</div>
                <div>Low Stock Items: {lowStockItems.length}</div>
                <div>Expired Items: {expiredItems.length}</div>
                <div>Expiring Soon: {expiringSoonItems.length}</div>
                <div className="col-span-2">Total Value: ${inventory.reduce((sum, item) => sum + (item.quantity * item.cost), 0).toFixed(2)}</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Unit</TableHead>
                <TableHead>Min Stock</TableHead>
                <TableHead>Cost/Unit</TableHead>
                <TableHead>Total Value</TableHead>
                <TableHead>Expiry Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {inventory.map((item) => {
                const isLowStock = item.quantity <= item.minStock;
                const expiryStatus = getExpiryStatus(item.expiryDate);
                const isExpired = expiryStatus === "expired";
                const isExpiringSoon = expiryStatus === "expiring-soon";
                
                return (
                  <TableRow 
                    key={item.id} 
                    className={`${isLowStock ? "bg-yellow-50" : ""} ${isExpired ? "bg-red-50" : ""} ${isExpiringSoon ? "bg-orange-50" : ""}`}
                  >
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell>{item.minStock}</TableCell>
                    <TableCell>${item.cost.toFixed(2)}</TableCell>
                    <TableCell>${(item.quantity * item.cost).toFixed(2)}</TableCell>
                    <TableCell>{getExpiryBadge(item.expiryDate)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
