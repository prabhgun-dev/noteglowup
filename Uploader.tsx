'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Camera, Upload, X, Loader2 } from 'lucide-react';
import type { ConvertResponse } from '@/lib/types';

type Props = {
  onResult: (result: ConvertResponse) => void;
};

export function Uploader({ onResult }: Props) {
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

  const submit = async () => {
    if (files.length === 0) return;
    setBusy(true);
    setError(null);
    try {
      const fd = new FormData();
      files.forEach((f) => fd.append('images', f));
      const res = await fetch('/api/convert', { method: 'POST', body: fd });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || `Request failed (${res.status})`);
      }
      const data = (await res.json()) as ConvertResponse;
      onResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div
        {...getRootProps()}
        className={`paper-card p-10 md:p-14 text-center cursor-pointer transition-all ${
          isDragActive ? 'ring-2 ring-coral-300 scale-[1.01]' : 'hover:shadow-lift'
        }`}
      >
        <input {...getInputProps()} />
        <div className="mx-auto h-14 w-14 rounded-2xl bg-coral-100 text-coral-500 flex items-center justify-center mb-5">
          <Upload size={22} />
        </div>
        <h3 className="font-serif text-2xl md:text-3xl">
          Drop your <span className="font-hand text-coral-400">notes</span> here
        </h3>
        <p className="text-ink-soft mt-2 text-sm">
          Or tap to choose — up to 20 pages. JPG, PNG, HEIC.
        </p>
        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-mute">
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
              <div key={src} className="relative aspect-[3/4] rounded-xl overflow-hidden bg-paper-200 group">
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
                <span className="absolute bottom-1.5 left-1.5 text-[10px] px-1.5 py-0.5 rounded bg-cream/90 text-ink-soft">
                  pg {i + 1}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-ink-soft">
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
        <div className="mt-4 rounded-xl border border-coral-200 bg-coral-50 text-coral-500 px-4 py-3 text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
