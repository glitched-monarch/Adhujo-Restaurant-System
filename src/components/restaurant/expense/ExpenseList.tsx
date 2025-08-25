
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Edit, Trash2, Eye } from "lucide-react";
import { Expense } from "@/services/expenseService";

interface ExpenseListProps {
  expenses: Expense[];
  onEdit?: (expense: Expense) => void;
  onDelete?: (id: string) => void;
  onView?: (expense: Expense) => void;
}

export const ExpenseList = ({ expenses, onEdit, onDelete, onView }: ExpenseListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      'Food & Ingredients': 'bg-green-100 text-green-800',
      'Staff Salaries': 'bg-blue-100 text-blue-800',
      'Utilities': 'bg-yellow-100 text-yellow-800',
      'Equipment': 'bg-purple-100 text-purple-800',
      'Marketing': 'bg-pink-100 text-pink-800',
      'Rent': 'bg-gray-100 text-gray-800',
      'Maintenance': 'bg-orange-100 text-orange-800'
    };
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.date.toLocaleDateString()}</TableCell>
              <TableCell className="font-medium">{expense.description}</TableCell>
              <TableCell>
                <Badge className={getCategoryColor(expense.category)}>
                  {expense.category}
                </Badge>
              </TableCell>
              <TableCell>KSH {expense.amount.toLocaleString()}</TableCell>
              <TableCell className="capitalize">{expense.paymentMethod}</TableCell>
              <TableCell>
                <Badge className={getStatusColor(expense.approvalStatus)}>
                  {expense.approvalStatus}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => onView?.(expense)}>
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onEdit?.(expense)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline" onClick={() => onDelete?.(expense.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      {expenses.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No expenses found.</p>
        </div>
      )}
    </div>
  );
};
