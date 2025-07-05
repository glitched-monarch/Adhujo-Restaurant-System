
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AccompanimentDialog } from "../AccompanimentDialog";

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

interface SalesFormProps {
  mockMenuItems: Array<{
    id: string;
    name: string;
    basePrice: number;
    category: string;
    accompaniments: Accompaniment[];
  }>;
  onAddItem: (menuItem: any, selectedAccompaniments: Accompaniment[]) => void;
  calculateTotalPrice: (basePrice: number) => number;
}

export const SalesForm = ({ mockMenuItems, onAddItem, calculateTotalPrice }: SalesFormProps) => {
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const [isAccompanimentDialogOpen, setIsAccompanimentDialogOpen] = useState(false);
  const [pendingMenuItem, setPendingMenuItem] = useState<typeof mockMenuItems[0] | null>(null);

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
      onAddItem(menuItem, []);
    }
    
    setSelectedMenuItem("");
  };

  const handleAccompanimentConfirm = (selectedAccompaniments: Accompaniment[]) => {
    if (pendingMenuItem) {
      onAddItem(pendingMenuItem, selectedAccompaniments);
      setPendingMenuItem(null);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>New Sale</CardTitle>
          <CardDescription>Select menu items and process payment</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>

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
    </>
  );
};
