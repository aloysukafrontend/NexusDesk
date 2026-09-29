import { BannerGenerator } from '@/components/utility/BannerGenerator';

export default function UtilityPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Interactive Utility Tool</h2>
        <p className="text-sm text-slate-500">Buat banner dan kustomisasi visual secara instan.</p>
      </div>
      <BannerGenerator />
    </div>
  );
}