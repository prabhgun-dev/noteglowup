'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, FileText, Layers, Printer, Check } from 'lucide-react';
import type { ConvertResponse } from '@/lib/types';

export function ExportMenu({ result }: { result: ConvertResponse }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  async function downloadExport(format: 'quizlet' | 'anki') {
    const res = await fetch(`/api/export/${format}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: result.title, flashcards: result.flashcards }),
    });
    if (!res.ok) return;
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    const cd = res.headers.get('content-disposition') ?? '';
    const m = cd.match(/filename="([^"]+)"/);
    a.download = m?.[1] || `${format}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    setDone(format);
    setTimeout(() => setDone(null), 1500);
  }

  function printPdf() {
    setOpen(false);
    setTimeout(() => window.print(), 100);
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn-ghost"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <Download size={16} /> Export
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 paper-card p-2 z-30 shadow-lift">
          <MenuItem
            icon={Layers}
            title="Quizlet"
            subtitle="tab-separated .txt"
            done={done === 'quizlet'}
            onClick={() => downloadExport('quizlet')}
          />
          <MenuItem
            icon={FileText}
            title="Anki"
            subtitle="import-ready .txt"
            done={done === 'anki'}
            onClick={() => downloadExport('anki')}
          />
          <MenuItem
            icon={Printer}
            title="PDF (notes only)"
            subtitle="opens browser print"
            onClick={printPdf}
          />
        </div>
      )}
    </div>
  );
}

function MenuItem({
  icon: Icon,
  title,
  subtitle,
  done,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  done?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-rose-light transition-colors text-left"
    >
      <div className="h-9 w-9 rounded-lg bg-genz text-ink flex items-center justify-center shrink-0 border border-ink/15">
        <Icon size={16} />
      </div>
      <div className="flex-1">
        <p className="font-bungee text-xs uppercase tracking-wider">{title}</p>
        <p className="font-elite text-[11px] text-ink-mute">{subtitle}</p>
      </div>
      {done && <Check size={16} className="text-candy-dark" />}
    </button>
  );
}
