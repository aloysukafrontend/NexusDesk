'use client';

import { useState } from 'react';
import { StatCards } from '@/components/dashboard/StatCards';
import { AnalyticsChart } from '@/components/dashboard/AnalyticsChart';
import { TransactionTable } from '@/components/dashboard/TransactionTable';
import { TransactionForm } from '@/components/dashboard/TransactionForm';
import { Plus } from 'lucide-react';

export default function DashboardPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Analytics Dashboard</h2>
          <p className="text-sm text-slate-500">Pantau performa dan riwayat transaksi bisnis kamu.</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition"
        >
          <Plus size={18} /> Tambah Transaksi
        </button>
      </div>

      <StatCards />
      <AnalyticsChart />
      <TransactionTable />

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="w-full max-w-md">
            <TransactionForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}