'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ConvertResponse } from '@/lib/types';
import { Uploader } from '@/components/Uploader';
import { ResultView } from '@/components/ResultView';

export function Workbench() {
  const [result, setResult] = useState<ConvertResponse | null>(null);

  return (
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
              <h1 className="text-4xl md:text-5xl tracking-tight leading-[1.1]">
                <span className="ransom-anton">upload</span>{' '}
                <span className="ransom-elite">your</span>{' '}
                <span className="ransom-hand text-candy-dark">notes ✨</span>
              </h1>
              <p className="mt-3 font-elite text-ink-soft">
                one photo or twenty. we&apos;ll handle the rest.
              </p>
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
  );
}
