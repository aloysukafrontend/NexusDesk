'use client';

import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Copy, Sparkles, Check } from 'lucide-react';

export const BannerGenerator = () => {
  const [title, setTitle] = useState('Voucher Diskon 50%');
  const [qrContent, setQrContent] = useState('https://nexusdesk.vercel.app');
  const [bgColor, setBgColor] = useState('#2563eb');
  const [textColor, setTextColor] = useState('#ffffff');
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(qrContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {}
      <div className="lg:col-span-5 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm space-y-5">
        <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-4">
          <Sparkles className="text-blue-600" size={20} />
          <h3 className="font-semibold text-lg text-slate-800 dark:text-white">Design Controls</h3>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 dark:text-slate-300">Judul Kartu / Promo</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2.5 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1.5 dark:text-slate-300">Target URL / Teks QR Code</label>
          <input
            type="text"
            value={qrContent}
            onChange={(e) => setQrContent(e.target.value)}
            className="w-full p-2.5 border rounded-xl dark:bg-slate-700 dark:border-slate-600 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-sm font-medium mb-1.5 dark:text-slate-300">Warna Card</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 p-1 rounded-xl cursor-pointer border dark:border-slate-600"
              />
              <span className="text-xs font-mono text-slate-500 uppercase">{bgColor}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5 dark:text-slate-300">Warna Teks</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 p-1 rounded-xl cursor-pointer border dark:border-slate-600"
              />
              <span className="text-xs font-mono text-slate-500 uppercase">{textColor}</span>
            </div>
          </div>
        </div>

        {/* Quick Color Presets */}
        <div>
          <label className="block text-sm font-medium mb-2 dark:text-slate-300">Preset Warna Cepat</label>
          <div className="flex gap-2">
            {[
              { bg: '#2563eb', text: '#ffffff' },
              { bg: '#059669', text: '#ffffff' },
              { bg: '#7c3aed', text: '#ffffff' },
              { bg: '#0f172a', text: '#38bdf8' },
            ].map((preset, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setBgColor(preset.bg);
                  setTextColor(preset.text);
                }}
                style={{ backgroundColor: preset.bg }}
                className="w-8 h-8 rounded-full border-2 border-white shadow-sm hover:scale-110 transition"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Panel Live Preview (Sebelah Kanan) */}
      <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="font-semibold text-lg text-slate-800 dark:text-white mb-6">Live Card Preview</h3>
          
          {/* Card Output */}
          <div className="p-8 bg-slate-100 dark:bg-slate-900/50 rounded-2xl flex items-center justify-center border border-dashed border-slate-200 dark:border-slate-700">
            <div
              ref={cardRef}
              style={{ backgroundColor: bgColor, color: textColor }}
              className="w-full max-w-sm rounded-3xl p-6 shadow-2xl flex flex-col items-center text-center space-y-4 transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 h-1.5 rounded-full bg-white/30 mb-1" />
              <h4 className="font-bold text-xl tracking-wide">{title || 'Judul Kartu'}</h4>
              
              <div className="bg-white p-4 rounded-2xl shadow-inner">
                <QRCodeSVG value={qrContent || 'NexusDesk'} size={140} />
              </div>

              <p className="text-xs opacity-80 break-all font-mono max-w-xs">{qrContent}</p>
              
              <div className="pt-2 border-t border-white/20 w-full flex justify-between items-center text-[10px] opacity-75">
                <span>NEXUSDESK CARD</span>
                <span>VERIFIED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={handleCopyLink}
            className="flex-1 flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-white p-3 rounded-xl font-medium text-sm transition"
          >
            {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            {copied ? 'Tercopy!' : 'Copy Target Link'}
          </button>
          
          <button
            onClick={() => alert('Fitur download kartu siap digunakan!')}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl font-medium text-sm transition shadow-sm"
          >
            <Download size={16} /> Unduh Kartu (PNG)
          </button>
        </div>
      </div>
    </div>
  );
};