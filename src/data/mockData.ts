export interface Account {
  id: string;
  name: string;
  type: 'checking' | 'savings' | 'credit';
  balance: number;
  lastFour: string;
  icon: string;
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  category: string;
  status: 'completed' | 'pending';
  accountId: string;
}

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'due' | 'overdue';
  category: string;
}

export const mockAccounts: Account[] = [
  {
    id: '1',
    name: 'Primary Checking',
    type: 'checking',
    balance: 4532.82,
    lastFour: '4892',
    icon: 'wallet',
  },
  {
    id: '2',
    name: 'Savings Account',
    type: 'savings',
    balance: 12847.50,
    lastFour: '7234',
    icon: 'piggy-bank',
  },
  {
    id: '3',
    name: 'Credit Card',
    type: 'credit',
    balance: -1243.16,
    lastFour: '8901',
    icon: 'credit-card',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2025-10-25',
    description: 'Grocery Store',
    amount: -127.45,
    category: 'Food & Dining',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '2',
    date: '2025-10-25',
    description: 'Salary Deposit',
    amount: 3500.00,
    category: 'Income',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '3',
    date: '2025-10-24',
    description: 'Electric Company',
    amount: -89.23,
    category: 'Utilities',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '4',
    date: '2025-10-24',
    description: 'Online Shopping',
    amount: -234.99,
    category: 'Shopping',
    status: 'completed',
    accountId: '3',
  },
  {
    id: '5',
    date: '2025-10-23',
    description: 'Gas Station',
    amount: -52.10,
    category: 'Transportation',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '6',
    date: '2025-10-23',
    description: 'Restaurant',
    amount: -68.50,
    category: 'Food & Dining',
    status: 'completed',
    accountId: '3',
  },
  {
    id: '7',
    date: '2025-10-22',
    description: 'Gym Membership',
    amount: -49.99,
    category: 'Health & Fitness',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '8',
    date: '2025-10-22',
    description: 'Transfer to Savings',
    amount: -500.00,
    category: 'Transfer',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '9',
    date: '2025-10-21',
    description: 'Coffee Shop',
    amount: -12.75,
    category: 'Food & Dining',
    status: 'pending',
    accountId: '1',
  },
  {
    id: '10',
    date: '2025-10-21',
    description: 'Streaming Service',
    amount: -14.99,
    category: 'Entertainment',
    status: 'completed',
    accountId: '3',
  },
];

export const mockBills: Bill[] = [
  {
    id: '1',
    name: 'Rent Payment',
    amount: 1850.00,
    dueDate: '2025-11-01',
    status: 'due',
    category: 'Housing',
  },
  {
    id: '2',
    name: 'Internet Service',
    amount: 79.99,
    dueDate: '2025-11-05',
    status: 'due',
    category: 'Utilities',
  },
  {
    id: '3',
    name: 'Car Insurance',
    amount: 142.50,
    dueDate: '2025-10-28',
    status: 'paid',
    category: 'Insurance',
  },
  {
    id: '4',
    name: 'Phone Bill',
    amount: 65.00,
    dueDate: '2025-11-10',
    status: 'due',
    category: 'Utilities',
  },
  {
    id: '5',
    name: 'Gym Membership',
    amount: 49.99,
    dueDate: '2025-10-30',
    status: 'due',
    category: 'Health',
  },
];

export const spendingByCategory = [
  { name: 'Food & Dining', value: 542 },
  { name: 'Shopping', value: 789 },
  { name: 'Transportation', value: 312 },
  { name: 'Utilities', value: 456 },
  { name: 'Entertainment', value: 234 },
  { name: 'Health & Fitness', value: 189 },
  { name: 'Other', value: 278 },
];

export const monthlySpending = [
  { month: 'Jun', amount: 2341 },
  { month: 'Jul', amount: 2789 },
  { month: 'Aug', amount: 2456 },
  { month: 'Sep', amount: 2912 },
  { month: 'Oct', amount: 2800 },
];
