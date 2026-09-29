import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Transaction {
  id: string;
  customerName: string;
  status: 'Completed' | 'Pending' | 'Failed';
  amount: number;
  date: string;
}

interface WorkspaceState {
  transactions: Transaction[];
  addTransaction: (item: Transaction) => void;
  deleteTransaction: (id: string) => void;
  updateStatus: (id: string, newStatus: 'Completed' | 'Pending' | 'Failed') => void;
}

export const useWorkspaceStore = create<WorkspaceState>()(
  persist(
    (set) => ({
      transactions: [
        { id: '1', customerName: 'Ahmad Dahlan', status: 'Completed', amount: 250000, date: '2026-09-25' },
        { id: '2', customerName: 'Budi Santoso', status: 'Pending', amount: 120000, date: '2026-09-26' },
        { id: '3', customerName: 'Citra Kirana', status: 'Completed', amount: 500000, date: '2026-09-27' },
        { id: '4', customerName: 'Dwi Prasetyo', status: 'Failed', amount: 75000, date: '2026-09-28' },
      ],
      addTransaction: (item) => set((state) => ({ transactions: [item, ...state.transactions] })),
      deleteTransaction: (id) => set((state) => ({ transactions: state.transactions.filter((t) => t.id !== id) })),
      updateStatus: (id, newStatus) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, status: newStatus } : t
          ),
        })),
    }),
    {
      name: 'nexusdesk-workspace-storage',
    }
  )
);