import { useState } from 'react';
import { mockBills } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Bills = () => {
  const [bills, setBills] = useState(mockBills);

  const handleMarkAsPaid = (billId: string) => {
    setBills(bills.map(bill => 
      bill.id === billId ? { ...bill, status: 'paid' as const } : bill
    ));
    toast.success('Bill marked as paid');
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case 'due':
        return <Clock className="w-5 h-5 text-muted-foreground" />;
      case 'overdue':
        return <AlertCircle className="w-5 h-5 text-destructive" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'paid':
        return 'secondary';
      case 'overdue':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  const dueBills = bills.filter(bill => bill.status === 'due');
  const paidBills = bills.filter(bill => bill.status === 'paid');
  const totalDue = dueBills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Bills & Payments</h2>
        <p className="text-muted-foreground">Manage your upcoming bills and payments</p>
      </div>

      {/* Summary Card */}
      <Card className="bg-gradient-to-br from-foreground to-foreground/90 text-background border-0 shadow-lg">
        <CardContent className="p-6">
          <p className="text-sm opacity-90 mb-2">Total Due</p>
          <p className="text-4xl font-bold mb-1">
            ${totalDue.toFixed(2)}
          </p>
          <p className="text-sm opacity-80">{dueBills.length} bills pending</p>
        </CardContent>
      </Card>

      {/* Upcoming Bills */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Upcoming Bills</h3>
        <div className="space-y-3">
          {dueBills.map((bill) => (
            <Card key={bill.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-accent-foreground" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{bill.name}</h4>
                        <Badge variant={getStatusBadgeVariant(bill.status)} className="text-xs">
                          {bill.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{bill.category}</p>
                      <div className="flex items-center gap-4 text-sm">
                        <span className="text-muted-foreground">
                          Due: {new Date(bill.dueDate).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className="text-2xl font-semibold mb-3 text-foreground">
                      ${bill.amount.toFixed(2)}
                    </p>
                    <Button 
                      size="sm" 
                      onClick={() => handleMarkAsPaid(bill.id)}
                      className="whitespace-nowrap"
                    >
                      Mark as Paid
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          
          {dueBills.length === 0 && (
            <Card>
              <CardContent className="p-12 text-center">
                <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-3" />
                <p className="text-muted-foreground">No upcoming bills</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Paid Bills */}
      {paidBills.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Recently Paid</h3>
          <div className="space-y-3">
            {paidBills.map((bill) => (
              <Card key={bill.id} className="opacity-60">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                        {getStatusIcon(bill.status)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold text-foreground">{bill.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {bill.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{bill.category}</p>
                      </div>
                    </div>
                    <p className="text-xl font-semibold text-foreground">
                      ${bill.amount.toFixed(2)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bills;
