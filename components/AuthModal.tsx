'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Lock, X, UserPlus, LogIn } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { StarSticker, HeartBubble } from './Stickers';

type Mode = 'signup' | 'signin';

export function AuthModal({
  open,
  onClose,
  onSuccess,
}: {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [mode, setMode] = useState<Mode>('signup');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setError(null);
      setConfirm('');
    }
  }, [open]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (mode === 'signup') {
      if (password.length < 6) {
        setError('password must be at least 6 characters');
        return;
      }
      if (password !== confirm) {
        setError("passwords don't match");
        return;
      }
    }

    setBusy(true);
    const supabase = createClient();
    const { error: err } =
      mode === 'signup'
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

    if (err) {
      setBusy(false);
      setError(err.message);
      return;
    }
    setBusy(false);
    onSuccess();
  }

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setConfirm('');
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

            <div className="flex items-center gap-1 p-1 rounded-full bg-rose/40 border border-ink/15 mb-6">
              <TabBtn active={mode === 'signup'} onClick={() => switchMode('signup')}>
                <UserPlus size={14} /> create account
              </TabBtn>
              <TabBtn active={mode === 'signin'} onClick={() => switchMode('signin')}>
                <LogIn size={14} /> sign in
              </TabBtn>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={mode}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
              >
                <h2 className="text-2xl md:text-3xl tracking-tight leading-[1.1]">
                  {mode === 'signup' ? (
                    <>
                      <span className="ransom-anton">one</span>{' '}
                      <span className="ransom-elite">more</span>{' '}
                      <span className="ransom-hand text-candy-dark">step ✨</span>
                    </>
                  ) : (
                    <>
                      <span className="ransom-anton">welcome</span>{' '}
                      <span className="ransom-hand text-candy-dark">back ✨</span>
                    </>
                  )}
                </h2>
                <p className="mt-2 font-elite text-sm text-ink-soft">
                  {mode === 'signup'
                    ? 'save your conversions — takes 5 seconds.'
                    : 'sign in to keep your notes safe.'}
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-3">
                  <input
                    type="email"
                    required
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@school.in"
                    className="w-full px-4 py-3 rounded-full bg-cream border border-ink/15 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-candy"
                  />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password (6+ chars)"
                    className="w-full px-4 py-3 rounded-full bg-cream border border-ink/15 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-candy"
                  />
                  {mode === 'signup' && (
                    <input
                      type="password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      placeholder="confirm password"
                      className="w-full px-4 py-3 rounded-full bg-cream border border-ink/15 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-candy"
                    />
                  )}
                  <button type="submit" disabled={busy} className="btn-primary w-full text-sm disabled:opacity-60">
                    {busy ? <Loader2 size={16} className="animate-spin" /> : <Lock size={16} />}
                    {mode === 'signup' ? 'create & continue' : 'sign in & continue'}
                  </button>
                  {error && <p className="text-xs text-candy-dark font-elite">{error}</p>}
                </form>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function TabBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-elite uppercase tracking-wider transition-colors ${
        active ? 'bg-ink text-cream' : 'text-ink-soft hover:text-ink'
      }`}
    >
      {children}
    </button>
  );
}
