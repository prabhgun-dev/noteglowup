'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import type { ConvertResponse } from '@/lib/types';
import { Logo } from '@/components/Logo';
import { Uploader } from '@/components/Uploader';
import { ResultView } from '@/components/ResultView';

export default function AppPage() {
  const [result, setResult] = useState<ConvertResponse | null>(null);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/70 border-b border-paper-200/60">
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          <Link href="/" aria-label="Notesly home">
            <Logo />
          </Link>
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <span className="pill">10 / 10 free left</span>
          </div>
        </div>
      </header>

      <div className="px-6 py-12 md:py-20">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-10 max-w-2xl mx-auto">
                <h1 className="font-serif text-4xl md:text-5xl tracking-tight leading-[1.1]">
                  Upload your <span className="font-hand text-coral-400 italic">notes</span>
                </h1>
                <p className="mt-3 text-ink-soft">One photo or twenty. We'll handle the rest.</p>
              </div>
              <Uploader onResult={setResult} />
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <ResultView result={result} onReset={() => setResult(null)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
