'use client';

import { useEffect, useRef, useState } from 'react';
import { Download, FileText, Layers, FileDown, Check, Loader2 } from 'lucide-react';
import type { ConvertResponse } from '@/lib/types';

type Props = {
  result: ConvertResponse;
  prepareForPdf?: () => Promise<void>;
};

type Format = 'quizlet' | 'anki' | 'pdf';

export function ExportMenu({ result, prepareForPdf }: Props) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState<Format | null>(null);
  const [done, setDone] = useState<Format | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  async function downloadServerExport(format: 'quizlet' | 'anki') {
    setBusy(format);
    try {
      const res = await fetch(`/api/export/${format}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: result.title, flashcards: result.flashcards }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      const blob = await res.blob();
      triggerDownload(blob, fileName(res, `${format}.txt`));
      setDone(format);
    } catch (err) {
      console.error('[export]', err);
      alert(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setBusy(null);
      setTimeout(() => setDone(null), 1500);
    }
  }

  async function downloadPdf() {
    setOpen(false);
    setBusy('pdf');
    try {
      // Switch to notes tab if we're on cards
      if (prepareForPdf) await prepareForPdf();

      // Pre-load every font the NotesView uses, then wait a render tick.
      // html2canvas can't render a font that hasn't been requested + loaded yet.
      if (typeof document !== 'undefined' && document.fonts) {
        await Promise.all([
          document.fonts.load('400 19px "Patrick Hand"'),
          document.fonts.load('400 32px "Caveat"'),
          document.fonts.load('700 32px "Caveat"'),
          document.fonts.load('400 24px "Bungee"'),
          document.fonts.load('400 24px "Anton"'),
          document.fonts.load('400 14px "Special Elite"'),
          document.fonts.ready,
        ]);
      }
      // Extra settle time for layout / images
      await new Promise((r) => setTimeout(r, 400));

      const target = document.getElementById('pdf-target');
      if (!target) throw new Error('Notes content not found');

      const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
        import('html2canvas'),
        import('jspdf'),
      ]);

      const canvas = await html2canvas(target, {
        scale: 2,
        backgroundColor: '#FFFBF2',
        useCORS: true,
        logging: false,
        windowWidth: target.scrollWidth,
        windowHeight: target.scrollHeight,
      });

      const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' });
      const pageWidthMm = pdf.internal.pageSize.getWidth(); // 210
      const pageHeightMm = pdf.internal.pageSize.getHeight(); // 297

      // No PDF margins — the notes card has its own internal padding
      const pxPerMm = canvas.width / pageWidthMm;
      const pageHeightPx = Math.floor(pageHeightMm * pxPerMm);

      // Slice the tall canvas into clean page-sized chunks (no overlap)
      let yOffset = 0;
      let pageNum = 0;
      while (yOffset < canvas.height) {
        const sliceHeightPx = Math.min(pageHeightPx, canvas.height - yOffset);

        const sliceCanvas = document.createElement('canvas');
        sliceCanvas.width = canvas.width;
        sliceCanvas.height = sliceHeightPx;
        const ctx = sliceCanvas.getContext('2d');
        if (!ctx) throw new Error('Canvas context unavailable');
        ctx.fillStyle = '#FFFBF2';
        ctx.fillRect(0, 0, sliceCanvas.width, sliceCanvas.height);
        ctx.drawImage(canvas, 0, -yOffset);

        const sliceData = sliceCanvas.toDataURL('image/jpeg', 0.92);
        const sliceHeightMm = sliceHeightPx / pxPerMm;

        if (pageNum > 0) pdf.addPage();
        pdf.addImage(sliceData, 'JPEG', 0, 0, pageWidthMm, sliceHeightMm);

        yOffset += pageHeightPx;
        pageNum++;
      }

      pdf.save(`${slug(result.title)}.pdf`);
      setDone('pdf');
    } catch (err) {
      console.error('[pdf]', err);
      alert(err instanceof Error ? err.message : 'PDF export failed');
    } finally {
      setBusy(null);
      setTimeout(() => setDone(null), 1500);
    }
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
        <div className="absolute right-0 mt-2 w-72 paper-card p-2 z-30 shadow-lift">
          <MenuItem
            icon={FileDown}
            title="PDF"
            subtitle="aesthetic notes, A4 multi-page"
            busy={busy === 'pdf'}
            done={done === 'pdf'}
            onClick={downloadPdf}
          />
          <MenuItem
            icon={Layers}
            title="Quizlet"
            subtitle="tab-separated .txt"
            busy={busy === 'quizlet'}
            done={done === 'quizlet'}
            onClick={() => downloadServerExport('quizlet')}
          />
          <MenuItem
            icon={FileText}
            title="Anki"
            subtitle="import-ready .txt"
            busy={busy === 'anki'}
            done={done === 'anki'}
            onClick={() => downloadServerExport('anki')}
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
  busy,
  done,
  onClick,
}: {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  subtitle: string;
  busy?: boolean;
  done?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      disabled={busy}
      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-rose-light disabled:opacity-60 disabled:hover:bg-transparent transition-colors text-left"
    >
      <div className="h-9 w-9 rounded-lg bg-genz text-ink flex items-center justify-center shrink-0 border border-ink/15">
        {busy ? <Loader2 size={16} className="animate-spin" /> : <Icon size={16} />}
      </div>
      <div className="flex-1">
        <p className="font-bungee text-xs uppercase tracking-wider">{title}</p>
        <p className="font-elite text-[11px] text-ink-mute">{subtitle}</p>
      </div>
      {done && <Check size={16} className="text-candy-dark" />}
    </button>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'notesly';
}

function fileName(res: Response, fallback: string) {
  const cd = res.headers.get('content-disposition') ?? '';
  const m = cd.match(/filename="([^"]+)"/);
  return m?.[1] || fallback;
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
