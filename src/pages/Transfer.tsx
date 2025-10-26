import { useState } from 'react';
import { mockAccounts } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency } from '@/lib/utils';

const Transfer = () => {
  const [fromAccount, setFromAccount] = useState('');
  const [toAccount, setToAccount] = useState('');
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fromAccount || !toAccount || !amount) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (fromAccount === toAccount) {
      toast.error('Cannot transfer to the same account');
      return;
    }
    const fromAccountData = mockAccounts.find(acc => acc.id === fromAccount);
    const transferAmount = parseFloat(amount);
    if (transferAmount <= 0) {
      toast.error('Transfer amount must be greater than zero');
      return;
    }
    if (fromAccountData && fromAccountData.balance < transferAmount) {
      toast.error('Insufficient funds in source account');
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    setShowConfirmation(false);
    setShowSuccess(true);
    
    // Reset form after success
    setTimeout(() => {
      setShowSuccess(false);
      setFromAccount('');
      setToAccount('');
      setAmount('');
      setNote('');
    }, 2000);
  };

  const fromAccountData = mockAccounts.find(acc => acc.id === fromAccount);
  const toAccountData = mockAccounts.find(acc => acc.id === toAccount);

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Transfer Money</h2>
        <p className="text-muted-foreground">Move money between your accounts</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Transfer</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="from-account">From Account</Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger id="from-account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccounts.filter(acc => acc.balance > 0).map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(account.balance)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {fromAccountData && (
                <p className="text-sm text-muted-foreground mt-1">
                  Available: {formatCurrency(fromAccountData.balance)}
                </p>
              )}
            </div>

            <div className="flex justify-center">
              <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                <ArrowRight className="w-5 h-5 text-accent-foreground" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="to-account">To Account</Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger id="to-account">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccounts.filter(acc => acc.id !== fromAccount).map(account => (
                    <SelectItem key={account.id} value={account.id}>
                      {account.name} - {formatCurrency(Math.abs(account.balance))}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount</Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-7"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Note (Optional)</Label>
              <Input
                id="note"
                placeholder="Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Transfer</DialogTitle>
            <DialogDescription>
              Please review the transfer details before confirming
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">From:</span>
              <span className="font-medium">{fromAccountData?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">To:</span>
              <span className="font-medium">{toAccountData?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Amount:</span>
              <span className="font-semibold text-lg">{formatCurrency(parseFloat(amount || '0'))}</span>
            </div>
            {note && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Note:</span>
                <span className="font-medium">{note}</span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirm}>
              Confirm Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent>
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">Transfer Successful!</h3>
            <p className="text-muted-foreground">Your transfer has been completed</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transfer;
