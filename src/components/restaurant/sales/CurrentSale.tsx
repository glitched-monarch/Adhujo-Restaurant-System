
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Minus } from "lucide-react";

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

interface CurrentSaleProps {
  currentSale: SaleItem[];
  paymentMethod: string;
  amountPaid: string;
  onUpdateQuantity: (id: string, delta: number) => void;
  onPaymentMethodChange: (method: string) => void;
  onAmountPaidChange: (amount: string) => void;
  onCompleteSale: () => void;
}

export const CurrentSale = ({
  currentSale,
  paymentMethod,
  amountPaid,
  onUpdateQuantity,
  onPaymentMethodChange,
  onAmountPaidChange,
  onCompleteSale
}: CurrentSaleProps) => {
  const currentSubtotal = currentSale.reduce((sum, item) => sum + (item.basePrice * item.quantity), 0);
  const currentVATTotal = currentSale.reduce((sum, item) => sum + (item.vatAmount * item.quantity), 0);
  const currentTotal = Math.round(currentSubtotal + currentVATTotal);

  if (currentSale.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Sale Items</CardTitle>
        <CardDescription>Review and complete your sale</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {currentSale.map((item) => (
          <div key={item.id} className="space-y-2 p-3 bg-gray-50 rounded">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <span className="font-medium">{item.name}</span>
                <div className="text-sm text-gray-600">
                  Base: KSH {item.basePrice.toFixed(2)} • VAT: KSH {item.vatAmount.toFixed(2)} • Total: KSH {item.totalPrice}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(item.id, -1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-8 text-center">{item.quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onUpdateQuantity(item.id, 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>
            {item.accompaniments && item.accompaniments.length > 0 && (
              <div className="text-sm">
                <span className="text-gray-600">Accompaniments: </span>
                {item.accompaniments.map((acc, index) => (
                  <span key={acc.id} className="text-blue-600">
                    {acc.name} (+KSH {acc.price})
                    {index < item.accompaniments!.length - 1 ? ", " : ""}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
        
        <div className="border-t pt-4 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>KSH {currentSubtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>VAT (16%):</span>
            <span>KSH {currentVATTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg">
            <span>Total:</span>
            <span>KSH {currentTotal}</span>
          </div>
        </div>

        {/* Payment Section */}
        <div className="space-y-4 border-t pt-4">
          <h4 className="font-medium">Payment Details:</h4>
          <div>
            <Label htmlFor="paymentMethod">Payment Method</Label>
            <Select value={paymentMethod} onValueChange={onPaymentMethodChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select payment method" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cash">Cash</SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="digital">Digital Wallet</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {paymentMethod === "cash" && (
            <div>
              <Label htmlFor="amountPaid">Amount Paid (KSH)</Label>
              <Input
                id="amountPaid"
                type="number"
                step="1"
                value={amountPaid}
                onChange={(e) => onAmountPaidChange(e.target.value)}
                placeholder={currentTotal.toString()}
              />
              {amountPaid && parseFloat(amountPaid) > currentTotal && (
                <p className="text-sm text-muted-foreground mt-1">
                  Change: KSH {Math.round(parseFloat(amountPaid) - currentTotal)}
                </p>
              )}
            </div>
          )}
        </div>

        <Button onClick={onCompleteSale} className="w-full">
          Complete Sale
        </Button>
      </CardContent>
    </Card>
  );
};
