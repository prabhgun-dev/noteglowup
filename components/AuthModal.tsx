'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Loader2, KeyRound, X } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { StarSticker, HeartBubble } from './Stickers';

type Stage = 'email' | 'code';

export function AuthModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [stage, setStage] = useState<Stage>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset stage whenever the modal opens fresh
  useEffect(() => {
    if (open) {
      setStage('email');
      setCode('');
      setError(null);
    }
  }, [open]);

  // ESC to close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function sendCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` },
    });
    setBusy(false);
    if (err) {
      setError(err.message);
      return;
    }
    setStage('code');
  }

  async function verifyCode(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const supabase = createClient();
    const { error: err } = await supabase.auth.verifyOtp({
      email,
      token: code.trim(),
      type: 'email',
    });
    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    setBusy(false);
    onSuccess();
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 8, rotate: -2 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotate: -1 }}
            exit={{ scale: 0.95, opacity: 0, y: 8 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="paper-card relative w-full max-w-md p-8 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 h-8 w-8 rounded-full bg-cream border border-ink/15 flex items-center justify-center text-ink-soft hover:text-ink hover:bg-rose-light transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>

            <StarSticker className="absolute -top-4 -left-4 -rotate-12" size={32} />
            <HeartBubble className="absolute -top-3 -right-2 rotate-12" count={1} />

            <AnimatePresence mode="wait">
              {stage === 'email' ? (
                <motion.div
                  key="email"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-3xl tracking-tight leading-[1.1]">
                    <span className="ransom-anton">one</span>{' '}
                    <span className="ransom-elite">more</span>{' '}
                    <span className="ransom-hand text-candy-dark">step ✨</span>
                  </h2>
                  <p className="mt-2 font-elite text-sm text-ink-soft">
                    sign in with email — we&apos;ll save your conversions so you don&apos;t lose them.
                  </p>

                  <form onSubmit={sendCode} className="mt-6 space-y-3">
                    <input
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@school.in"
                      className="w-full px-4 py-3 rounded-full bg-cream border border-ink/15 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-candy"
                    />
                    <button
                      type="submit"
                      disabled={busy}
                      className="btn-primary w-full text-sm disabled:opacity-60"
                    >
                      {busy ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                      send code
                      {!busy && <ArrowRight size={14} className="opacity-70" />}
                    </button>
                    {error && (
                      <p className="text-xs text-candy-dark font-elite">{error}</p>
                    )}
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="code"
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <h2 className="text-3xl tracking-tight leading-[1.1]">
                    <span className="ransom-anton">check</span>{' '}
                    <span className="ransom-hand text-candy-dark">inbox 📬</span>
                  </h2>
                  <p className="mt-2 font-elite text-sm text-ink-soft">
                    code sent to <strong className="font-bungee text-ink">{email}</strong>
                  </p>

                  <form onSubmit={verifyCode} className="mt-6 space-y-3">
                    <input
                      type="text"
                      inputMode="numeric"
                      maxLength={10}
                      required
                      autoFocus
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="12345678"
                      className="w-full px-4 py-3 rounded-full bg-cream border border-ink/15 font-bungee text-2xl tracking-[0.3em] text-center focus:outline-none focus:ring-2 focus:ring-candy"
                    />
                    <button
                      type="submit"
                      disabled={busy || code.length < 6}
                      className="btn-primary w-full text-sm disabled:opacity-60"
                    >
                      {busy ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                      sign in & continue
                    </button>
                    {error && <p className="text-xs text-candy-dark font-elite">{error}</p>}
                    <button
                      type="button"
                      onClick={() => {
                        setStage('email');
                        setCode('');
                        setError(null);
                      }}
                      className="block w-full text-center text-[11px] font-elite uppercase tracking-wider text-ink-mute hover:text-ink mt-2"
                    >
                      ← different email
                    </button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
