import { useState } from 'react';
import { mockTransactions, mockAccounts } from '@/data/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, ArrowUpRight, ArrowDownRight, ArrowUpDown } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { formatCurrency } from '@/lib/utils';

type SortOption = 'date-desc' | 'date-asc' | 'amount-desc' | 'amount-asc';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAccount, setFilterAccount] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [sortBy, setSortBy] = useState<SortOption>('date-desc');

  const categories = Array.from(new Set(mockTransactions.map(t => t.category)));

  let filteredTransactions = mockTransactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAccount = filterAccount === 'all' || transaction.accountId === filterAccount;
    const matchesCategory = filterCategory === 'all' || transaction.category === filterCategory;
    return matchesSearch && matchesAccount && matchesCategory;
  });

  // Sort transactions
  filteredTransactions = [...filteredTransactions].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'date-asc':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'amount-desc':
        return Math.abs(b.amount) - Math.abs(a.amount);
      case 'amount-asc':
        return Math.abs(a.amount) - Math.abs(b.amount);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Transactions</h2>
        <p className="text-muted-foreground">View and filter your transaction history</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={filterAccount} onValueChange={setFilterAccount}>
              <SelectTrigger>
                <SelectValue placeholder="All Accounts" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Accounts</SelectItem>
                {mockAccounts.map(account => (
                  <SelectItem key={account.id} value={account.id}>
                    {account.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date-desc">Newest First</SelectItem>
                <SelectItem value="date-asc">Oldest First</SelectItem>
                <SelectItem value="amount-desc">Highest Amount</SelectItem>
                <SelectItem value="amount-asc">Lowest Amount</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Transactions List */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => {
              const account = mockAccounts.find(a => a.id === transaction.accountId);
              return (
                <div key={transaction.id} className="flex items-center justify-between py-4 border-b border-border last:border-0 hover:bg-accent/50 transition-colors rounded-lg px-2 -mx-2">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                      transaction.amount > 0 ? 'bg-success/10' : 'bg-muted'
                    }`}>
                      {transaction.amount > 0 ? (
                        <ArrowDownRight className="w-6 h-6 text-success" />
                      ) : (
                        <ArrowUpRight className="w-6 h-6 text-muted-foreground" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-foreground truncate">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <p className="text-sm text-muted-foreground">{transaction.category}</p>
                        <span className="text-muted-foreground">•</span>
                        <p className="text-sm text-muted-foreground">{account?.name}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0 ml-4">
                    <p className={`font-semibold text-lg whitespace-nowrap ${transaction.amount > 0 ? 'text-success' : 'text-foreground'}`}>
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                    </p>
                    <div className="flex items-center gap-2 justify-end mt-1">
                      <p className="text-sm text-muted-foreground whitespace-nowrap">
                        {new Date(transaction.date).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </p>
                      <Badge variant={transaction.status === 'completed' ? 'secondary' : 'outline'} className="text-xs">
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredTransactions.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No transactions found</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Transactions;
