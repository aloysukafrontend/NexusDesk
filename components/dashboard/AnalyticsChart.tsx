'use client';

import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';
import { useWorkspaceStore } from '@/store/usedWorkspaceStore';
export const AnalyticsChart = () => {
  const transactions = useWorkspaceStore((state) => state.transactions);

  const chartData = transactions.map((t) => ({
    name: t.customerName.split(' ')[0],
    Amount: t.amount,
  }));

  return (
    <div className="p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm mb-6">
      <h3 className="font-semibold text-slate-800 dark:text-white mb-4">Grafik Nominal Transaksi</h3>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
            <YAxis stroke="#94a3b8" fontSize={12} />
            <Tooltip />
            <Bar dataKey="Amount" fill="#2563eb" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};