
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";

interface Sale {
  id: string;
  date: Date;
  amount: number;
  paymentMethod: string;
  items: number;
}

interface Expense {
  id: string;
  date: Date;
  amount: number;
  category: string;
  description: string;
}

interface FilteredData {
  sales: Sale[];
  expenses: Expense[];
}

interface TransactionTablesProps {
  filteredData: FilteredData;
}

export const TransactionTables = ({ filteredData }: TransactionTablesProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Sales Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Items</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.sales.slice(0, 5).map((sale) => (
                  <TableRow key={sale.id}>
                    <TableCell>{format(sale.date, 'MMM dd')}</TableCell>
                    <TableCell>KSH {sale.amount.toFixed(0)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{sale.paymentMethod}</Badge>
                    </TableCell>
                    <TableCell>{sale.items}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Expense Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.expenses.slice(0, 5).map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{format(expense.date, 'MMM dd')}</TableCell>
                    <TableCell>KSH {expense.amount.toFixed(0)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{expense.category}</Badge>
                    </TableCell>
                    <TableCell className="max-w-32 truncate">{expense.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Transactions</CardTitle>
          <CardDescription>Complete transaction history with filtering</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ...filteredData.sales.map(sale => ({
                  id: sale.id,
                  date: sale.date,
                  type: 'Sale',
                  description: `${sale.items} items - ${sale.paymentMethod}`,
                  category: 'Revenue',
                  amount: sale.amount,
                  status: 'Completed'
                })),
                ...filteredData.expenses.map(expense => ({
                  id: expense.id,
                  date: expense.date,
                  type: 'Expense',
                  description: expense.description,
                  category: expense.category,
                  amount: -expense.amount,
                  status: 'Paid'
                }))
              ]
              .sort((a, b) => b.date.getTime() - a.date.getTime())
              .slice(0, 10)
              .map((transaction) => (
                <TableRow key={`${transaction.type}-${transaction.id}`}>
                  <TableCell>{format(transaction.date, 'MMM dd, yyyy')}</TableCell>
                  <TableCell>
                    <Badge variant={transaction.type === 'Sale' ? 'default' : 'secondary'}>
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell className={transaction.amount >= 0 ? 'text-green-600' : 'text-red-600'}>
                    KSH {Math.abs(transaction.amount).toFixed(0)}
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{transaction.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};
