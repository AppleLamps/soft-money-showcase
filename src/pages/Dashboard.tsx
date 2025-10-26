import { AccountCard } from '@/components/AccountCard';
import { mockAccounts, mockTransactions } from '@/data/mockData';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { formatCurrency } from '@/lib/utils';

const Dashboard = () => {
  const totalBalance = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const recentTransactions = mockTransactions.slice(0, 5);

  // Calculate spending and income for this month
  const thisMonthTransactions = mockTransactions.filter(t => {
    const transactionDate = new Date(t.date);
    const now = new Date();
    return transactionDate.getMonth() === now.getMonth() &&
      transactionDate.getFullYear() === now.getFullYear();
  });
  const monthlySpending = thisMonthTransactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const monthlyIncome = thisMonthTransactions
    .filter(t => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Dashboard</h2>
        <p className="text-muted-foreground">Your financial overview at a glance</p>
      </div>

      {/* Total Balance */}
      <Card className="bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
        <CardContent className="p-8">
          <p className="text-sm text-muted-foreground font-medium mb-3 uppercase tracking-wide">Total Balance</p>
          <p className="text-5xl font-extrabold mb-6 text-foreground tracking-tight">
            {formatCurrency(totalBalance)}
          </p>
          <div className="flex gap-3">
            <Link to="/transfer">
              <Button
                variant="default"
                size="default"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-md hover:shadow-lg transition-all"
              >
                Transfer Money
              </Button>
            </Link>
            <Link to="/bills">
              <Button
                variant="outline"
                size="default"
                className="border-2 font-medium hover:bg-secondary transition-all"
              >
                Pay Bills
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-destructive/60 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground font-medium">Spent This Month</p>
              <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-destructive" />
              </div>
            </div>
            <p className="text-4xl font-extrabold text-foreground mb-2 tracking-tight">
              {formatCurrency(monthlySpending)}
            </p>
            <p className="text-sm text-muted-foreground">
              From {thisMonthTransactions.filter(t => t.amount < 0).length} transactions
            </p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-success/60 shadow-md hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-muted-foreground font-medium">Earned This Month</p>
              <div className="w-10 h-10 rounded-full bg-success/10 flex items-center justify-center">
                <ArrowDownRight className="w-5 h-5 text-success" />
              </div>
            </div>
            <p className="text-4xl font-extrabold text-success mb-2 tracking-tight">
              {formatCurrency(monthlyIncome)}
            </p>
            <p className="text-sm text-muted-foreground">
              From {thisMonthTransactions.filter(t => t.amount > 0).length} deposits
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Accounts Grid */}
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Your Accounts</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>

      {/* Recent Transactions */}
      <Card className="shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-4">
          <CardTitle className="text-xl font-bold">Recent Transactions</CardTitle>
          <Link to="/transactions">
            <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80 font-medium hover:bg-primary/5">
              View All →
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            {recentTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between py-4 px-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer border-b border-border last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${transaction.amount > 0
                      ? 'bg-success/15 ring-2 ring-success/20'
                      : 'bg-gray-100 ring-2 ring-gray-200'
                    }`}>
                    {transaction.amount > 0 ? (
                      <ArrowDownRight className="w-6 h-6 text-success" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6 text-foreground" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-base">{transaction.description}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{transaction.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-bold text-lg ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                    {transaction.amount > 0 ? '+' : '-'}{formatCurrency(Math.abs(transaction.amount))}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {new Date(transaction.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
