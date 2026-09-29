export interface Transaction {
    id: string;
    customerName: string;
    status: 'completed' | 'pending' | 'failed';
    amount: number;
    date: string;
}