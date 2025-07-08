
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IngredientManagement } from "./IngredientManagement";
import { AccompanimentManagement } from "./AccompanimentManagement";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface Accompaniment {
  id: string;
  name: string;
  price: number;
  required: boolean;
}

interface MenuItem {
  id: number;
  name: string;
  basePrice: number;
  vatRate: number;
  totalPrice: number;
  category: string;
  availability: boolean;
  description: string;
  ingredients: Ingredient[];
  accompaniments: Accompaniment[];
}

interface MenuFormDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: MenuItem | null;
  onSubmit: (item: MenuItem) => void;
}

export const MenuFormDialog = ({ isOpen, onClose, selectedItem, onSubmit }: MenuFormDialogProps) => {
  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    category: "",
    availability: true,
    description: "",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [accompaniments, setAccompaniments] = useState<Accompaniment[]>([]);

  const categories = ["Snacks", "Main Course", "Beverages", "Accompaniments"];
  const VAT_RATE = 0.16; // 16% VAT

  const calculatePriceWithVAT = (basePrice: number) => {
    const vatAmount = basePrice * VAT_RATE;
    const totalPrice = basePrice + vatAmount;
    return Math.round(totalPrice); // Round to nearest shilling
  };

  const resetForm = () => {
    setFormData({
      name: "",
      basePrice: "",
      category: "",
      availability: true,
      description: "",
    });
    setIngredients([]);
    setAccompaniments([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const basePrice = parseFloat(formData.basePrice);
    const totalPrice = calculatePriceWithVAT(basePrice);
    
    const menuItem: MenuItem = {
      id: selectedItem?.id || Date.now(),
      ...formData,
      basePrice,
      totalPrice,
      vatRate: VAT_RATE,
      ingredients: [...ingredients],
      accompaniments: [...accompaniments]
    };

    onSubmit(menuItem);
    resetForm();
    onClose();
  };

  // Initialize form when dialog opens with existing item
  React.useEffect(() => {
    if (isOpen && selectedItem) {
      setFormData({
        name: selectedItem.name,
        basePrice: selectedItem.basePrice.toString(),
        category: selectedItem.category,
        availability: selectedItem.availability,
        description: selectedItem.description,
      });
      setIngredients([...selectedItem.ingredients]);
      setAccompaniments([...selectedItem.accompaniments]);
    } else if (isOpen && !selectedItem) {
      resetForm();
    }
  }, [isOpen, selectedItem]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{selectedItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
          <DialogDescription>
            {selectedItem ? "Update the menu item details" : "Enter the details for the new menu item"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Item Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="basePrice">Base Price (KSH)</Label>
            <Input
              id="basePrice"
              type="number"
              step="0.01"
              value={formData.basePrice}
              onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
              required
            />
            {formData.basePrice && (
              <div className="text-sm text-gray-600 mt-1">
                <p>Subtotal: KSH {parseFloat(formData.basePrice).toFixed(2)}</p>
                <p>VAT (16%): KSH {(parseFloat(formData.basePrice) * VAT_RATE).toFixed(2)}</p>
                <p className="font-medium">Total: KSH {calculatePriceWithVAT(parseFloat(formData.basePrice))}</p>
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="availability"
              checked={formData.availability}
              onCheckedChange={(checked) => setFormData({ ...formData, availability: checked })}
            />
            <Label htmlFor="availability">Available</Label>
          </div>

          <IngredientManagement
            ingredients={ingredients}
            onIngredientsChange={setIngredients}
          />

          {formData.category === "Main Course" && (
            <AccompanimentManagement
              accompaniments={accompaniments}
              onAccompanimentsChange={setAccompaniments}
            />
          )}

          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => {
              resetForm();
              onClose();
            }}>
              Cancel
            </Button>
            <Button type="submit">
              {selectedItem ? "Update" : "Add"} Item
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
