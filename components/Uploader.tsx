'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import type { ConvertResponse } from '@/lib/types';
import { resizeImage } from '@/lib/resizeImage';

type Props = {
  onResult: (result: ConvertResponse) => void;
  /** Return true if signed in (or just signed in); false if user cancelled. */
  requireAuth?: () => Promise<boolean>;
};

export function Uploader({ onResult, requireAuth }: Props) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback((accepted: File[]) => {
    setError(null);
    setFiles((prev) => [...prev, ...accepted].slice(0, 20));
    setPreviews((prev) => [
      ...prev,
      ...accepted.map((f) => URL.createObjectURL(f)),
    ].slice(0, 20));
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp', '.heic'] },
    maxFiles: 20,
  });

  const removeAt = (i: number) => {
    setFiles((prev) => prev.filter((_, idx) => idx !== i));
    setPreviews((prev) => prev.filter((_, idx) => idx !== i));
  };

  async function runConversion() {
    setBusy(true);
    setError(null);
    try {
      // Resize each image in the browser to keep total payload under Vercel's 4.5MB limit
      const resized = await Promise.all(files.map((f) => resizeImage(f)));
      const fd = new FormData();
      resized.forEach((f) => fd.append('images', f));
      const res = await fetch('/api/convert', { method: 'POST', body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        if (res.status === 401 && requireAuth) {
          // session expired between auth check and submit — retry
          const ok = await requireAuth();
          if (ok) {
            setBusy(false);
            return runConversion();
          }
          throw new Error('Sign in to continue');
        }
        throw new Error(j.error || j.message || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as ConvertResponse;
      onResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  }

  async function submit() {
    if (files.length === 0) return;
    if (requireAuth) {
      const ok = await requireAuth();
      if (!ok) return;
    }
    await runConversion();
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        {...getRootProps()}
        className={`paper-card p-10 md:p-14 text-center cursor-pointer transition-all ${
          isDragActive ? 'ring-2 ring-candy scale-[1.01]' : 'hover:shadow-lift'
        }`}
      >
        <input {...getInputProps()} />
        <div className="mx-auto h-14 w-14 rounded-2xl bg-genz text-ink flex items-center justify-center mb-5 border border-ink/15">
          <Upload size={22} />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl">
          Drop your <span className="font-hand text-candy-dark">notes</span> here
        </h3>
        <p className="text-ink-soft mt-2 text-sm font-elite">
          Or tap to choose — up to 20 pages. JPG, PNG, HEIC.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-mute font-elite uppercase tracking-wider">
          <Camera size={14} /> Phone camera works too
        </div>
      </div>

      {previews.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6"
        >
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {previews.map((src, i) => (
              <div key={src} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-rose-light group border border-ink/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`page ${i + 1}`} className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeAt(i)}
                  className="absolute top-1.5 right-1.5 h-6 w-6 rounded-full bg-ink/80 text-cream flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                  aria-label="Remove page"
                >
                  <X size={12} />
                </button>
                <span className="absolute bottom-1.5 left-1.5 text-[10px] px-1.5 py-0.5 rounded bg-cream/90 text-ink-soft font-elite uppercase">
                  pg {i + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-ink-soft font-elite">
              {files.length} {files.length === 1 ? 'page' : 'pages'} ready
            </p>
            <button onClick={submit} disabled={busy} className="btn-primary disabled:opacity-60">
              {busy ? (
                <>
                  <Loader2 size={16} className="animate-spin" /> Converting…
                </>
              ) : (
                <>Convert to notes + flashcards</>
              )}
            </button>
          </div>
        </motion.div>
      )}

      {error && (
        <div className="mt-4 rounded-xl border border-candy-dark/40 bg-rose-light text-ink-soft px-4 py-3 text-sm font-elite">
          {error}
        </div>
      )}
    </div>
  );
}
