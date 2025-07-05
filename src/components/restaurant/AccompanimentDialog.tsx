
import { useState, useEffect } from "react";
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

  // Reset selections when dialog opens with a new item
  useEffect(() => {
    if (isOpen) {
      // Auto-select required accompaniments
      const requiredIds = mainItem.accompaniments
        .filter(acc => acc.required)
        .map(acc => acc.id);
      setSelectedAccompaniments(requiredIds);
    }
  }, [isOpen, mainItem]);

  const handleAccompanimentToggle = (accompanimentId: string, isRequired: boolean) => {
    if (isRequired) {
      // Required accompaniments can be toggled between options but at least one must be selected
      const requiredAccompaniments = mainItem.accompaniments.filter(acc => acc.required);
      const otherRequiredSelected = selectedAccompaniments.filter(id => 
        id !== accompanimentId && requiredAccompaniments.some(acc => acc.id === id)
      );
      
      if (selectedAccompaniments.includes(accompanimentId)) {
        // Only allow deselection if other required items are selected
        if (otherRequiredSelected.length > 0) {
          setSelectedAccompaniments(prev => prev.filter(id => id !== accompanimentId));
        }
      } else {
        setSelectedAccompaniments(prev => [...prev, accompanimentId]);
      }
    } else {
      // Optional accompaniments can be freely toggled
      setSelectedAccompaniments(prev => 
        prev.includes(accompanimentId)
          ? prev.filter(id => id !== accompanimentId)
          : [...prev, accompanimentId]
      );
    }
  };

  const handleConfirm = () => {
    const selected = mainItem.accompaniments.filter(acc => 
      selectedAccompaniments.includes(acc.id)
    );
    onConfirm(selected);
    setSelectedAccompaniments([]);
    onClose();
  };

  const handleCancel = () => {
    setSelectedAccompaniments([]);
    onClose();
  };

  const requiredAccompaniments = mainItem.accompaniments.filter(acc => acc.required);
  const optionalAccompaniments = mainItem.accompaniments.filter(acc => !acc.required);
  const hasRequiredSelected = requiredAccompaniments.length === 0 || 
    requiredAccompaniments.some(acc => selectedAccompaniments.includes(acc.id));

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
              <h4 className="font-medium text-red-700 mb-3">
                Required Accompaniments 
                <span className="text-sm font-normal text-gray-600 ml-2">
                  (Choose at least one)
                </span>
              </h4>
              <div className="space-y-2">
                {requiredAccompaniments.map((accompaniment) => (
                  <div key={accompaniment.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={accompaniment.id}
                      checked={selectedAccompaniments.includes(accompaniment.id)}
                      onCheckedChange={() => handleAccompanimentToggle(accompaniment.id, true)}
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
                      onCheckedChange={() => handleAccompanimentToggle(accompaniment.id, false)}
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
          <Button variant="outline" onClick={handleCancel} className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm} 
            disabled={!hasRequiredSelected}
            className="flex-1"
          >
            Confirm Selection
          </Button>
        </div>

        {!hasRequiredSelected && requiredAccompaniments.length > 0 && (
          <p className="text-sm text-red-600 text-center">
            Please select at least one required accompaniment
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};
