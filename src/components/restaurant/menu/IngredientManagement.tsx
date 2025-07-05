
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, X } from "lucide-react";

interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
}

interface IngredientManagementProps {
  ingredients: Ingredient[];
  onIngredientsChange: (ingredients: Ingredient[]) => void;
}

export const IngredientManagement = ({ ingredients, onIngredientsChange }: IngredientManagementProps) => {
  const [newIngredient, setNewIngredient] = useState({ name: "", quantity: "", unit: "" });

  const addIngredient = () => {
    if (newIngredient.name && newIngredient.quantity && newIngredient.unit) {
      const ingredient: Ingredient = {
        id: Date.now().toString(),
        name: newIngredient.name,
        quantity: parseFloat(newIngredient.quantity),
        unit: newIngredient.unit
      };
      onIngredientsChange([...ingredients, ingredient]);
      setNewIngredient({ name: "", quantity: "", unit: "" });
    }
  };

  const removeIngredient = (id: string) => {
    onIngredientsChange(ingredients.filter(ing => ing.id !== id));
  };

  return (
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
  );
};
