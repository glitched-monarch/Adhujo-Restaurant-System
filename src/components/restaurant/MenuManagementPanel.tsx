
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Package, X } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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

export const MenuManagementPanel = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    basePrice: "",
    category: "",
    availability: true,
    description: "",
  });

  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "", unit: "" });
  
  const [accompaniments, setAccompaniments] = useState<Accompaniment[]>([]);
  const [newAccompaniment, setNewAccompaniment] = useState({ name: "", price: "", required: false });

  const categories = ["Snacks", "Main Course", "Beverages", "Accompaniments"];
  const VAT_RATE = 0.16; // 16% VAT

  const calculatePriceWithVAT = (basePrice: number) => {
    const vatAmount = basePrice * VAT_RATE;
    const totalPrice = basePrice + vatAmount;
    return Math.round(totalPrice); // Round to nearest shilling
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const basePrice = parseFloat(formData.basePrice);
    const totalPrice = calculatePriceWithVAT(basePrice);
    
    if (selectedItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { 
              ...item, 
              ...formData, 
              basePrice,
              totalPrice,
              vatRate: VAT_RATE,
              ingredients: [...ingredients],
              accompaniments: [...accompaniments]
            }
          : item
      ));
    } else {
      // Add new item
      const newItem: MenuItem = {
        id: Date.now(),
        ...formData,
        basePrice,
        totalPrice,
        vatRate: VAT_RATE,
        ingredients: [...ingredients],
        accompaniments: [...accompaniments]
      };
      setMenuItems(prev => [...prev, newItem]);
    }
    resetForm();
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
    setNewIngredient({ name: "", quantity: "", unit: "" });
    setNewAccompaniment({ name: "", price: "", required: false });
    setSelectedItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      basePrice: item.basePrice.toString(),
      category: item.category,
      availability: item.availability,
      description: item.description,
    });
    setIngredients([...item.ingredients]);
    setAccompaniments([...item.accompaniments]);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
  };

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.quantity && newIngredient.unit) {
      const ingredient: Ingredient = {
        id: Date.now().toString(),
        name: newIngredient.name,
        quantity: parseFloat(newIngredient.quantity),
        unit: newIngredient.unit
      };
      setIngredients(prev => [...prev, ingredient]);
      setNewIngredient({ name: "", quantity: "", unit: "" });
    }
  };

  const removeIngredient = (id: string) => {
    setIngredients(prev => prev.filter(ing => ing.id !== id));
  };

  const addAccompaniment = () => {
    if (newAccompaniment.name && newAccompaniment.price) {
      const accompaniment: Accompaniment = {
        id: Date.now().toString(),
        name: newAccompaniment.name,
        price: parseFloat(newAccompaniment.price),
        required: newAccompaniment.required
      };
      setAccompaniments(prev => [...prev, accompaniment]);
      setNewAccompaniment({ name: "", price: "", required: false });
    }
  };

  const removeAccompaniment = (id: string) => {
    setAccompaniments(prev => prev.filter(acc => acc.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Menu Management</h2>
          <p className="text-gray-600">Manage your restaurant menu items, pricing, and availability</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => resetForm()}>
              <Plus className="h-4 w-4 mr-2" />
              Add Menu Item
            </Button>
          </DialogTrigger>
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

              {/* Ingredients Section */}
              <div className="space-y-4">
                <h4 className="font-medium">Required Ingredients</h4>
                <div className="grid grid-cols-4 gap-2">
                  <Input
                    placeholder="Ingredient name"
                    value={newIngredient.name}
                    onChange={(e) => setNewIngredient({ ...newIngredient, name: e.target.value })}
                  />
                  <Input
                    placeholder="Quantity"
                    type="number"
                    value={newIngredient.quantity}
                    onChange={(e) => setNewIngredient({ ...newIngredient, quantity: e.target.value })}
                  />
                  <Select value={newIngredient.unit} onValueChange={(value) => setNewIngredient({ ...newIngredient, unit: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="g">g</SelectItem>
                      <SelectItem value="l">l</SelectItem>
                      <SelectItem value="ml">ml</SelectItem>
                      <SelectItem value="pieces">pieces</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="button" onClick={addIngredient} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient) => (
                    <Badge key={ingredient.id} variant="secondary" className="flex items-center gap-1">
                      {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                      <X className="h-3 w-3 cursor-pointer" onClick={() => removeIngredient(ingredient.id)} />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Accompaniments Section (for Main Course items) */}
              {formData.category === "Main Course" && (
                <div className="space-y-4">
                  <h4 className="font-medium">Accompaniments</h4>
                  <div className="grid grid-cols-4 gap-2">
                    <Input
                      placeholder="Accompaniment name"
                      value={newAccompaniment.name}
                      onChange={(e) => setNewAccompaniment({ ...newAccompaniment, name: e.target.value })}
                    />
                    <Input
                      placeholder="Extra price"
                      type="number"
                      value={newAccompaniment.price}
                      onChange={(e) => setNewAccompaniment({ ...newAccompaniment, price: e.target.value })}
                    />
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="required"
                        checked={newAccompaniment.required}
                        onCheckedChange={(checked) => setNewAccompaniment({ ...newAccompaniment, required: Boolean(checked) })}
                      />
                      <Label htmlFor="required" className="text-sm">Required</Label>
                    </div>
                    <Button type="button" onClick={addAccompaniment} size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {accompaniments.map((accompaniment) => (
                      <Badge key={accompaniment.id} variant={accompaniment.required ? "default" : "outline"} className="flex items-center gap-1">
                        {accompaniment.name} (+KSH {accompaniment.price}) {accompaniment.required && "(Required)"}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => removeAccompaniment(accompaniment.id)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {selectedItem ? "Update" : "Add"} Item
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4">
        {menuItems.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8 text-gray-500">
                <Package className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No menu items yet. Add your first item to get started!</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          menuItems.map((item) => (
            <Card key={item.id}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {item.name}
                      {!item.availability && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                          Unavailable
                        </span>
                      )}
                      <Badge variant="outline">{item.category}</Badge>
                    </CardTitle>
                    <CardDescription>
                      Subtotal: KSH {item.basePrice.toFixed(2)} • VAT: KSH {(item.basePrice * item.vatRate).toFixed(2)} • <strong>Total: KSH {item.totalPrice}</strong>
                    </CardDescription>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleEdit(item)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-3">{item.description}</p>
                
                {item.ingredients.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium mb-1">Ingredients:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.ingredients.map((ingredient) => (
                        <Badge key={ingredient.id} variant="secondary" className="text-xs">
                          {ingredient.name} ({ingredient.quantity} {ingredient.unit})
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {item.accompaniments.length > 0 && (
                  <div>
                    <p className="text-sm font-medium mb-1">Available Accompaniments:</p>
                    <div className="flex flex-wrap gap-1">
                      {item.accompaniments.map((accompaniment) => (
                        <Badge key={accompaniment.id} variant={accompaniment.required ? "default" : "outline"} className="text-xs">
                          {accompaniment.name} (+KSH {accompaniment.price}) {accompaniment.required && "(Required)"}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
