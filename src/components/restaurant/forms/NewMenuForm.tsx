
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "sonner";

interface NewMenuFormProps {
  onBack: () => void;
  onSubmit: (item: any) => void;
}

export const NewMenuForm = ({ onBack, onSubmit }: NewMenuFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    basePrice: "",
    description: "",
    available: true,
    preparationTime: "",
    allergens: ""
  });

  const VAT_RATE = 0.16;

  const calculateTotalPrice = (basePrice: number) => {
    return Math.round(basePrice * (1 + VAT_RATE));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const basePrice = parseFloat(formData.basePrice);
    const itemData = {
      ...formData,
      basePrice,
      totalPrice: calculateTotalPrice(basePrice),
      vatRate: VAT_RATE
    };
    onSubmit(itemData);
    toast.success("Menu item added successfully!");
    onBack();
  };

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
            <h2 className="text-2xl font-bold">Add Menu Item</h2>
            <p className="text-gray-600">Add a new item to the menu</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Menu Item Details</CardTitle>
          </CardHeader>
          <CardContent>
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
                      <SelectItem value="appetizers">Appetizers</SelectItem>
                      <SelectItem value="main-course">Main Course</SelectItem>
                      <SelectItem value="desserts">Desserts</SelectItem>
                      <SelectItem value="beverages">Beverages</SelectItem>
                      <SelectItem value="sides">Sides</SelectItem>
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
                    <p className="font-medium">Total: KSH {calculateTotalPrice(parseFloat(formData.basePrice))}</p>
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

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="preparationTime">Preparation Time (minutes)</Label>
                  <Input
                    id="preparationTime"
                    type="number"
                    value={formData.preparationTime}
                    onChange={(e) => setFormData({ ...formData, preparationTime: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="allergens">Allergens</Label>
                  <Input
                    id="allergens"
                    value={formData.allergens}
                    onChange={(e) => setFormData({ ...formData, allergens: e.target.value })}
                    placeholder="e.g., Nuts, Dairy, Gluten"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={formData.available}
                  onCheckedChange={(checked) => setFormData({ ...formData, available: checked })}
                />
                <Label htmlFor="available">Available for order</Label>
              </div>

              <div className="flex gap-2">
                <Button type="button" variant="outline" onClick={onBack}>
                  Cancel
                </Button>
                <Button type="submit" className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Menu Item
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
