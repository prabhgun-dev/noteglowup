'use client';

import { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import type { ConvertResponse } from '@/lib/types';
import { Uploader } from '@/components/Uploader';
import { ResultView } from '@/components/ResultView';
import { AuthModal } from '@/components/AuthModal';
import { createClient } from '@/lib/supabase/client';

type Props = {
  initialAuthed: boolean;
};

export function Workbench({ initialAuthed }: Props) {
  const router = useRouter();
  const [result, setResult] = useState<ConvertResponse | null>(null);
  const [authed, setAuthed] = useState(initialAuthed);
  const [authOpen, setAuthOpen] = useState(false);
  const authResolveRef = useRef<((ok: boolean) => void) | null>(null);

  const requireAuth = useCallback(async (): Promise<boolean> => {
    if (authed) return true;
    // Double-check with Supabase in case session exists but state is stale
    const supabase = createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (session) {
      setAuthed(true);
      return true;
    }
    setAuthOpen(true);
    return new Promise<boolean>((resolve) => {
      authResolveRef.current = resolve;
    });
  }, [authed]);

  function handleAuthSuccess() {
    setAuthed(true);
    setAuthOpen(false);
    authResolveRef.current?.(true);
    authResolveRef.current = null;
    // Refresh server components (header quota badge etc.)
    router.refresh();
  }

  function handleAuthClose() {
    setAuthOpen(false);
    authResolveRef.current?.(false);
    authResolveRef.current = null;
  }

  return (
    <>
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
              <Uploader onResult={setResult} requireAuth={requireAuth} />
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

      <AuthModal open={authOpen} onClose={handleAuthClose} onSuccess={handleAuthSuccess} />
    </>
  );
}
