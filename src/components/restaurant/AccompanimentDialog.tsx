
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";

interface Accompaniment {
  id: string;
  name: string;
  price: number;
  required: boolean;
}

interface AccompanimentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  mainItem: {
    name: string;
    accompaniments: Accompaniment[];
  };
  onConfirm: (selectedAccompaniments: Accompaniment[]) => void;
}

export const AccompanimentDialog = ({ isOpen, onClose, mainItem, onConfirm }: AccompanimentDialogProps) => {
  const [selectedAccompaniments, setSelectedAccompaniments] = useState<string[]>([]);

  const handleAccompanimentToggle = (accompanimentId: string) => {
    setSelectedAccompaniments(prev => 
      prev.includes(accompanimentId)
        ? prev.filter(id => id !== accompanimentId)
        : [...prev, accompanimentId]
    );
  };

  const handleConfirm = () => {
    const selected = mainItem.accompaniments.filter(acc => 
      selectedAccompaniments.includes(acc.id)
    );
    onConfirm(selected);
    setSelectedAccompaniments([]);
    onClose();
  };

  const requiredAccompaniments = mainItem.accompaniments.filter(acc => acc.required);
  const optionalAccompaniments = mainItem.accompaniments.filter(acc => !acc.required);
  const allRequiredSelected = requiredAccompaniments.every(acc => 
    selectedAccompaniments.includes(acc.id)
  );

  const totalExtraPrice = selectedAccompaniments.reduce((sum, accId) => {
    const acc = mainItem.accompaniments.find(a => a.id === accId);
    return sum + (acc?.price || 0);
  }, 0);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Accompaniments</DialogTitle>
          <DialogDescription>
            Choose accompaniments for {mainItem.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {requiredAccompaniments.length > 0 && (
            <div>
              <h4 className="font-medium text-red-700 mb-3">Required Accompaniments</h4>
              <div className="space-y-2">
                {requiredAccompaniments.map((accompaniment) => (
                  <div key={accompaniment.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={accompaniment.id}
                      checked={selectedAccompaniments.includes(accompaniment.id)}
                      onCheckedChange={() => handleAccompanimentToggle(accompaniment.id)}
                    />
                    <label
                      htmlFor={accompaniment.id}
                      className="flex-1 flex justify-between items-center cursor-pointer"
                    >
                      <span>{accompaniment.name}</span>
                      <Badge variant="destructive" className="text-xs">
                        +KSH {accompaniment.price}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {optionalAccompaniments.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-700 mb-3">Optional Accompaniments</h4>
              <div className="space-y-2">
                {optionalAccompaniments.map((accompaniment) => (
                  <div key={accompaniment.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={accompaniment.id}
                      checked={selectedAccompaniments.includes(accompaniment.id)}
                      onCheckedChange={() => handleAccompanimentToggle(accompaniment.id)}
                    />
                    <label
                      htmlFor={accompaniment.id}
                      className="flex-1 flex justify-between items-center cursor-pointer"
                    >
                      <span>{accompaniment.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        +KSH {accompaniment.price}
                      </Badge>
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {totalExtraPrice > 0 && (
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between font-medium">
                <span>Extra charges:</span>
                <span>KSH {totalExtraPrice}</span>
              </div>
            </div>
          )}
        </div>

        <div className="flex space-x-2">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!allRequiredSelected}
            className="flex-1"
          >
            Confirm Selection
          </Button>
        </div>

        {!allRequiredSelected && requiredAccompaniments.length > 0 && (
          <p className="text-sm text-red-600 text-center">
            Please select all required accompaniments
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};
