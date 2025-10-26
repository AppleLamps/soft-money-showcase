import { useState } from 'react';
import { mockAccounts } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ArrowRight, CheckCircle2, AlertCircle, Wallet, PiggyBank, CreditCard, ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';
import { formatCurrency, cn } from '@/lib/utils';

const iconMap = {
  'wallet': Wallet,
  'piggy-bank': PiggyBank,
  'credit-card': CreditCard,
};

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
    <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
      {/* Page Header */}
      <div className="space-y-2">
        <h2 className="text-4xl font-extrabold text-foreground tracking-tight">Transfer Money</h2>
        <p className="text-base text-muted-foreground">Move money securely between your accounts</p>
      </div>

      {/* Transfer Form Card */}
      <Card className="shadow-lg border-2 border-border">
        <CardHeader className="pb-6 border-b border-border bg-gradient-to-br from-gray-50 to-white">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-md">
              <ArrowRight className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <CardTitle className="text-2xl font-bold">New Transfer</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Complete the form below to transfer funds</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-8 pb-8 px-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* From Account Section */}
            <div className="space-y-3">
              <Label htmlFor="from-account" className="text-base font-semibold text-foreground flex items-center gap-2">
                <ArrowUpRight className="w-4 h-4 text-destructive" />
                From Account
              </Label>
              <Select value={fromAccount} onValueChange={setFromAccount}>
                <SelectTrigger
                  id="from-account"
                  className="h-14 text-base border-2 hover:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
                >
                  <SelectValue placeholder="Select source account" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccounts.filter(acc => acc.balance > 0).map(account => {
                    const Icon = iconMap[account.icon as keyof typeof iconMap] || Wallet;
                    return (
                      <SelectItem key={account.id} value={account.id} className="py-3">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            account.gradient
                          )}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{account.name}</div>
                            <div className="text-sm text-muted-foreground">{formatCurrency(account.balance)}</div>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* From Account Preview Card */}
              {fromAccountData && (
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shadow-md",
                          fromAccountData.gradient
                        )}>
                          {(() => {
                            const Icon = iconMap[fromAccountData.icon as keyof typeof iconMap] || Wallet;
                            return <Icon className="w-6 h-6 text-white" />;
                          })()}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{fromAccountData.name}</p>
                          <p className="text-sm text-muted-foreground">{fromAccountData.accountNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Available Balance</p>
                        <p className="text-xl font-bold text-foreground">{formatCurrency(fromAccountData.balance)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Transfer Direction Indicator */}
            <div className="flex justify-center py-2">
              <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <ArrowRight className="w-7 h-7 text-primary-foreground" />
              </div>
            </div>

            {/* To Account Section */}
            <div className="space-y-3">
              <Label htmlFor="to-account" className="text-base font-semibold text-foreground flex items-center gap-2">
                <ArrowDownRight className="w-4 h-4 text-green-600" />
                To Account
              </Label>
              <Select value={toAccount} onValueChange={setToAccount}>
                <SelectTrigger
                  id="to-account"
                  className="h-14 text-base border-2 hover:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
                >
                  <SelectValue placeholder="Select destination account" />
                </SelectTrigger>
                <SelectContent>
                  {mockAccounts.filter(acc => acc.id !== fromAccount).map(account => {
                    const Icon = iconMap[account.icon as keyof typeof iconMap] || Wallet;
                    return (
                      <SelectItem key={account.id} value={account.id} className="py-3">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-lg flex items-center justify-center",
                            account.gradient
                          )}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-semibold">{account.name}</div>
                            <div className="text-sm text-muted-foreground">{formatCurrency(Math.abs(account.balance))}</div>
                          </div>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>

              {/* To Account Preview Card */}
              {toAccountData && (
                <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-transparent shadow-sm">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center shadow-md",
                          toAccountData.gradient
                        )}>
                          {(() => {
                            const Icon = iconMap[toAccountData.icon as keyof typeof iconMap] || Wallet;
                            return <Icon className="w-6 h-6 text-white" />;
                          })()}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{toAccountData.name}</p>
                          <p className="text-sm text-muted-foreground">{toAccountData.accountNumber}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">Current Balance</p>
                        <p className="text-xl font-bold text-foreground">{formatCurrency(Math.abs(toAccountData.balance))}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Amount Input */}
            <div className="space-y-3">
              <Label htmlFor="amount" className="text-base font-semibold text-foreground">
                Transfer Amount
              </Label>
              <div className="relative">
                <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl font-bold text-muted-foreground">$</span>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="0.00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-12 h-16 text-2xl font-bold border-2 hover:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
                />
              </div>
              {fromAccountData && amount && parseFloat(amount) > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Remaining balance:</span>
                  <span className={cn(
                    "font-semibold",
                    fromAccountData.balance - parseFloat(amount) < 0
                      ? "text-destructive"
                      : "text-green-600"
                  )}>
                    {formatCurrency(fromAccountData.balance - parseFloat(amount))}
                  </span>
                </div>
              )}
            </div>

            {/* Note Field */}
            <div className="space-y-3">
              <Label htmlFor="note" className="text-base font-semibold text-foreground">
                Note <span className="text-sm font-normal text-muted-foreground">(Optional)</span>
              </Label>
              <Input
                id="note"
                placeholder="Add a note for this transfer..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="h-12 text-base border-2 hover:border-primary transition-colors focus:ring-2 focus:ring-primary/20"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              Continue to Review
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                <AlertCircle className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <DialogTitle className="text-2xl">Confirm Transfer</DialogTitle>
                <DialogDescription className="text-base mt-1">
                  Please review the details carefully
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-4 py-6">
            {/* Transfer Summary Card */}
            <Card className="border-2 border-border bg-gradient-to-br from-gray-50 to-white">
              <CardContent className="p-5 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">From Account</span>
                  <span className="font-semibold text-foreground">{fromAccountData?.name}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">To Account</span>
                  <span className="font-semibold text-foreground">{toAccountData?.name}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-border">
                  <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide">Transfer Amount</span>
                  <span className="font-bold text-2xl text-primary">{formatCurrency(parseFloat(amount || '0'))}</span>
                </div>
                {note && (
                  <div className="pt-2">
                    <span className="text-sm font-medium text-muted-foreground uppercase tracking-wide block mb-2">Note</span>
                    <p className="text-sm text-foreground bg-gray-100 p-3 rounded-lg">{note}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              onClick={() => setShowConfirmation(false)}
              className="flex-1 h-12 font-semibold"
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirm}
              className="flex-1 h-12 font-semibold shadow-lg hover:shadow-xl transition-all"
            >
              <CheckCircle2 className="mr-2 w-5 h-5" />
              Confirm Transfer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="max-w-md">
          <div className="text-center py-8">
            <div className="relative inline-block mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl animate-bounce">
                <CheckCircle2 className="w-10 h-10 text-white" />
              </div>
              <div className="absolute inset-0 w-20 h-20 bg-green-500 rounded-full animate-ping opacity-20 mx-auto"></div>
            </div>
            <h3 className="text-3xl font-extrabold mb-3 text-foreground">Transfer Successful!</h3>
            <p className="text-lg text-muted-foreground mb-6">Your transfer has been completed successfully</p>

            {/* Success Summary */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-white">
              <CardContent className="p-5">
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Amount Transferred</span>
                    <span className="font-bold text-xl text-green-600">{formatCurrency(parseFloat(amount || '0'))}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-green-200">
                    <span className="text-muted-foreground">From</span>
                    <span className="font-semibold">{fromAccountData?.name}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">To</span>
                    <span className="font-semibold">{toAccountData?.name}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Transfer;
