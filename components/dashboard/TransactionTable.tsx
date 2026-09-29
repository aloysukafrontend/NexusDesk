'use client';

import { useState } from 'react';
import { useWorkspaceStore, Transaction } from '@/store/usedWorkspaceStore';
import { Trash2, Search } from 'lucide-react';

export const TransactionTable = () => {
  const { transactions, deleteTransaction, updateStatus } = useWorkspaceStore();
  const [search, setSearch] = useState('');

  const filtered = transactions.filter((t) =>
    t.customerName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm p-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <h3 className="font-semibold text-slate-800 dark:text-white text-lg">Riwayat Transaksi</h3>
        <div className="relative">
          <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-xl text-sm dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600 dark:text-slate-300">
          <thead className="bg-slate-50 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 font-medium">
            <tr>
              <th className="p-3">Pelanggan</th>
              <th className="p-3">Status (Klik untuk ubah)</th>
              <th className="p-3">Jumlah</th>
              <th className="p-3">Tanggal</th>
              <th className="p-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center p-4 text-slate-400">
                  Data tidak ditemukan.
                </td>
              </tr>
            ) : (
              filtered.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/30">
                  <td className="p-3 font-medium text-slate-800 dark:text-white">{item.customerName}</td>
                  
                  {/* Dropdown untuk mengubah status secara live */}
                  <td className="p-3">
                    <select
                      value={item.status}
                      onChange={(e) =>
                        updateStatus(
                          item.id,
                          e.target.value as Transaction['status']
                        )
                      }
                      className={`px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer border-none focus:ring-2 focus:ring-blue-500 ${
                        item.status === 'Completed'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : item.status === 'Pending'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                          : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                      }`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Failed">Failed</option>
                    </select>
                  </td>

                  <td className="p-3">Rp {item.amount.toLocaleString('id-ID')}</td>
                  <td className="p-3">{item.date}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => deleteTransaction(item.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};