
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, X } from "lucide-react";

interface Accompaniment {
  id: string;
  name: string;
  price: number;
  required: boolean;
}

interface AccompanimentManagementProps {
  accompaniments: Accompaniment[];
  onAccompanimentsChange: (accompaniments: Accompaniment[]) => void;
}

export const AccompanimentManagement = ({ accompaniments, onAccompanimentsChange }: AccompanimentManagementProps) => {
  const [newAccompaniment, setNewAccompaniment] = useState({ name: "", price: "", required: false });

  const addAccompaniment = () => {
    if (newAccompaniment.name && newAccompaniment.price) {
      const accompaniment: Accompaniment = {
        id: Date.now().toString(),
        name: newAccompaniment.name,
        price: parseFloat(newAccompaniment.price),
        required: newAccompaniment.required
      };
      onAccompanimentsChange([...accompaniments, accompaniment]);
      setNewAccompaniment({ name: "", price: "", required: false });
    }
  };

  const removeAccompaniment = (id: string) => {
    onAccompanimentsChange(accompaniments.filter(acc => acc.id !== id));
  };

  return (
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
  );
};
