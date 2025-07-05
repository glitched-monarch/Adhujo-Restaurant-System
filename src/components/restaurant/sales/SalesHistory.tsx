
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { DateRangeFilter, DateRange } from "@/components/common/DateRangeFilter";

interface Sale {
  id: string;
  items: any[];
  subtotal: number;
  vatTotal: number;
  total: number;
  paymentMethod: string;
  amountPaid: number;
  change: number;
  timestamp: Date;
}

interface SalesHistoryProps {
  salesHistory: Sale[];
  filteredSalesHistory: Sale[];
  onDateRangeChange: (range: DateRange | null) => void;
}

export const SalesHistory = ({ salesHistory, filteredSalesHistory, onDateRangeChange }: SalesHistoryProps) => {
  const getPaymentMethodBadge = (method: string) => {
    switch (method) {
      case "cash":
        return <Badge variant="secondary">Cash</Badge>;
      case "card":
        return <Badge variant="default">Card</Badge>;
      case "digital":
        return <Badge className="bg-green-100 text-green-800">Digital</Badge>;
      default:
        return <Badge variant="outline">{method}</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sales History</CardTitle>
        <CardDescription>Recent transaction history with date filtering</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <DateRangeFilter onDateRangeChange={onDateRangeChange} />
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Time</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSalesHistory.slice(0, 10).map((sale) => (
              <TableRow key={sale.id}>
                <TableCell>{sale.timestamp.toLocaleTimeString()}</TableCell>
                <TableCell>{sale.items.length} items</TableCell>
                <TableCell>{getPaymentMethodBadge(sale.paymentMethod)}</TableCell>
                <TableCell>KSH {sale.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {filteredSalesHistory.length === 0 && (
          <div className="text-center py-4 text-gray-500">
            No sales found for the selected date range.
          </div>
        )}
      </CardContent>
    </Card>
  );
};
