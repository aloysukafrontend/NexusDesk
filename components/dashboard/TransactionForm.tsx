'use client';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useWorkspaceStore } from '@/store/usedWorkspaceStore';

const formSchema = z.object({
  customerName: z.string().min(3, { message: 'Nama minimal 3 karakter' }),
  amount: z.number({ invalid_type_error: 'Harus angka' }).positive({ message: 'Harus lebih dari 0' }),
  status: z.enum(['Completed', 'Pending', 'Failed']),
});

type FormData = z.infer<typeof formSchema>;

export const TransactionForm = ({ onClose }: { onClose: () => void }) => {
  const addTransaction = useWorkspaceStore((state) => state.addTransaction);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: 'Pending' },
  });

  const onSubmit = (data: FormData) => {
    addTransaction({
      id: Date.now().toString(),
      ...data,
      date: new Date().toISOString().split('T')[0],
    });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
      <h3 className="font-semibold text-lg">Tambah Transaksi Baru</h3>
      <div>
        <label className="block text-sm font-medium mb-1">Nama Pelanggan</label>
        <input {...register('customerName')} className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600" />
        {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Jumlah (IDR)</label>
        <input type="number" {...register('amount', { valueAsNumber: true })} className="w-full p-2 border rounded-md dark:bg-slate-700 dark:border-slate-600" />
        {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>}
      </div>

      <div className="flex gap-2 pt-2">
        <button type="button" onClick={onClose} className="w-1/2 p-2 border rounded-md hover:bg-gray-100 dark:hover:bg-slate-700">Batal</button>
        <button type="submit" className="w-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">Simpan</button>
      </div>
    </form>
  );
};