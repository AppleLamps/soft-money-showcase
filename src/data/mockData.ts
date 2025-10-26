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
    balance: 45328.82,
    lastFour: '4892',
    icon: 'wallet',
  },
  {
    id: '2',
    name: 'Savings Account',
    type: 'savings',
    balance: 128475.50,
    lastFour: '7234',
    icon: 'piggy-bank',
  },
  {
    id: '3',
    name: 'Credit Card',
    type: 'credit',
    balance: -2843.16,
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
    amount: 5250.00,
    category: 'Income',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '3',
    date: '2025-10-24',
    description: 'Electric Company',
    amount: -189.23,
    category: 'Utilities',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '4',
    date: '2025-10-24',
    description: 'Online Shopping - Amazon',
    amount: -234.99,
    category: 'Shopping',
    status: 'completed',
    accountId: '3',
  },
  {
    id: '5',
    date: '2025-10-23',
    description: 'Gas Station',
    amount: -62.10,
    category: 'Transportation',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '6',
    date: '2025-10-23',
    description: 'Restaurant - The Steakhouse',
    amount: -168.50,
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
    amount: -2000.00,
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
    description: 'Streaming Service - Netflix',
    amount: -14.99,
    category: 'Entertainment',
    status: 'completed',
    accountId: '3',
  },
  {
    id: '11',
    date: '2025-10-20',
    description: 'Freelance Project Payment',
    amount: 1500.00,
    category: 'Income',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '12',
    date: '2025-10-19',
    description: 'Home Depot',
    amount: -342.87,
    category: 'Shopping',
    status: 'completed',
    accountId: '3',
  },
  {
    id: '13',
    date: '2025-10-18',
    description: 'Insurance Premium',
    amount: -285.00,
    category: 'Insurance',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '14',
    date: '2025-10-17',
    description: 'Pharmacy',
    amount: -45.23,
    category: 'Health & Fitness',
    status: 'completed',
    accountId: '1',
  },
  {
    id: '15',
    date: '2025-10-16',
    description: 'Uber Ride',
    amount: -28.50,
    category: 'Transportation',
    status: 'completed',
    accountId: '3',
  },
];

export const mockBills: Bill[] = [
  {
    id: '1',
    name: 'Rent Payment',
    amount: 2850.00,
    dueDate: '2025-11-01',
    status: 'due',
    category: 'Housing',
  },
  {
    id: '2',
    name: 'Internet Service',
    amount: 89.99,
    dueDate: '2025-11-05',
    status: 'due',
    category: 'Utilities',
  },
  {
    id: '3',
    name: 'Car Insurance',
    amount: 242.50,
    dueDate: '2025-10-28',
    status: 'paid',
    category: 'Insurance',
  },
  {
    id: '4',
    name: 'Phone Bill',
    amount: 85.00,
    dueDate: '2025-11-10',
    status: 'due',
    category: 'Utilities',
  },
  {
    id: '5',
    name: 'Gym Membership',
    amount: 79.99,
    dueDate: '2025-10-30',
    status: 'due',
    category: 'Health',
  },
];

export const spendingByCategory = [
  { name: 'Food & Dining', value: 1842 },
  { name: 'Shopping', value: 2589 },
  { name: 'Transportation', value: 912 },
  { name: 'Utilities', value: 1256 },
  { name: 'Entertainment', value: 734 },
  { name: 'Health & Fitness', value: 589 },
  { name: 'Other', value: 978 },
];

export const monthlySpending = [
  { month: 'Jun', amount: 8341 },
  { month: 'Jul', amount: 9789 },
  { month: 'Aug', amount: 7456 },
  { month: 'Sep', amount: 10912 },
  { month: 'Oct', amount: 8900 },
];
