import { Wallet, PiggyBank, CreditCard, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Account } from '@/data/mockData';
import { formatCurrency } from '@/lib/utils';

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
    <Card className="hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer group border-2 hover:border-gray-300">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-5">
          <div className="w-14 h-14 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-sm">
            <Icon className="w-7 h-7 text-foreground" />
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${isNegative
              ? 'bg-destructive/10 text-destructive'
              : 'bg-success/10 text-success'
            }`}>
            {isNegative ? (
              <ArrowDownRight className="w-3.5 h-3.5" />
            ) : (
              <ArrowUpRight className="w-3.5 h-3.5" />
            )}
          </div>
        </div>

        <div className="space-y-2">
          <p className="text-sm text-muted-foreground font-medium">{account.name}</p>
          <p className="text-3xl font-bold text-foreground tracking-tight">
            {formatCurrency(displayBalance)}
          </p>
          <p className="text-xs text-muted-foreground font-mono tracking-wider">
            •••• {account.lastFour}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
