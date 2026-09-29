'use client';

import { useWorkspaceStore } from '@/store/usedWorkspaceStore';
import { DollarSign, ShoppingBag, CheckCircle2, AlertCircle } from 'lucide-react';

export const StatCards = () => {
  const transactions = useWorkspaceStore((state) => state.transactions);

  const totalRevenue = transactions
    .filter((t) => t.status === 'Completed')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalSuccess = transactions.filter((t) => t.status === 'Completed').length;
  const totalPending = transactions.filter((t) => t.status === 'Pending').length;

  const stats = [
    { title: 'Total Pendapatan', value: `Rp ${totalRevenue.toLocaleString('id-ID')}`, icon: DollarSign, color: 'text-green-500' },
    { title: 'Total Transaksi', value: transactions.length, icon: ShoppingBag, color: 'text-blue-500' },
    { title: 'Transaksi Sukses', value: totalSuccess, icon: CheckCircle2, color: 'text-emerald-500' },
    { title: 'Pending', value: totalPending, icon: AlertCircle, color: 'text-amber-500' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</span>
              <Icon className={stat.color} size={20} />
            </div>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">{stat.value}</p>
          </div>
        );
      })}
    </div>
  );
};