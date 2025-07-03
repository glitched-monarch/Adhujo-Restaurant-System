
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Package } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

export const MenuManagementPanel = () => {
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: "Burger", price: 12.50, category: "Main Course", availability: true, description: "Beef burger with fries" },
    { id: 2, name: "Pizza", price: 15.00, category: "Main Course", availability: true, description: "Margherita pizza" },
    { id: 3, name: "Salad", price: 8.50, category: "Appetizer", availability: false, description: "Fresh garden salad" },
  ]);

  const [selectedItem, setSelectedItem] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    availability: true,
    description: "",
  });

  const categories = ["Appetizer", "Main Course", "Dessert", "Beverage"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItem) {
      // Update existing item
      setMenuItems(prev => prev.map(item => 
        item.id === selectedItem.id 
          ? { ...item, ...formData, price: parseFloat(formData.price) }
          : item
      ));
    } else {
      // Add new item
      const newItem = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price),
      };
      setMenuItems(prev => [...prev, newItem]);
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      category: "",
      availability: true,
      description: "",
    });
    setSelectedItem(null);
    setIsDialogOpen(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setFormData({
      name: item.name,
      price: item.price.toString(),
      category: item.category,
      availability: item.availability,
      description: item.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setMenuItems(prev => prev.filter(item => item.id !== id));
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
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>{selectedItem ? "Edit Menu Item" : "Add New Menu Item"}</DialogTitle>
              <DialogDescription>
                {selectedItem ? "Update the menu item details" : "Enter the details for the new menu item"}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
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
        {menuItems.map((item) => (
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
                  </CardTitle>
                  <CardDescription>{item.category} • ${item.price.toFixed(2)}</CardDescription>
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
              <p className="text-sm text-gray-600">{item.description}</p>
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <Package className="h-4 w-4" />
                <span>Ingredients: Not configured</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
