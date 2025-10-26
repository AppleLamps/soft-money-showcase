import { Wallet, PiggyBank, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Account } from '@/data/mockData';

interface AccountCardProps {
  account: Account;
}

const iconMap = {
  wallet: Wallet,
  'piggy-bank': PiggyBank,
  'credit-card': CreditCard,
};

export const AccountCard = ({ account }: AccountCardProps) => {
  const Icon = iconMap[account.icon as keyof typeof iconMap] || Wallet;
  const isNegative = account.balance < 0;
  const displayBalance = Math.abs(account.balance);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-accent-foreground" />
          </div>
          <div className={`flex items-center gap-1 text-sm ${isNegative ? 'text-destructive' : 'text-success'}`}>
            {isNegative ? (
              <ArrowDownRight className="w-4 h-4" />
            ) : (
              <ArrowUpRight className="w-4 h-4" />
            )}
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{account.name}</p>
          <p className="text-2xl font-semibold text-foreground">
            ${displayBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-muted-foreground">
            •••• {account.lastFour}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
