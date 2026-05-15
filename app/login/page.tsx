'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, Lock, UserPlus, LogIn } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { StarSticker, StarBlack, HeartBubble } from '@/components/Stickers';
import { createClient } from '@/lib/supabase/client';

type Mode = 'signup' | 'signin';

export default function LoginPage() {
  const router = useRouter();
  const search = useSearchParams();
  const initialMode = (search.get('mode') as Mode) === 'signin' ? 'signin' : 'signup';

  const [mode, setMode] = useState<Mode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    router.push('/app');
    router.refresh();
  }

  function switchMode(next: Mode) {
    setMode(next);
    setError(null);
    setConfirm('');
  }

  return (
    <main className="min-h-screen flex flex-col">
      <header className="px-6 h-16 flex items-center">
        <Link href="/">
          <Logo />
        </Link>
      </header>

      <div className="flex-1 flex items-center justify-center px-6 pb-16 relative">
        <StarSticker className="hidden md:block absolute top-16 left-24 -rotate-12" size={28} />
        <StarBlack className="hidden md:block absolute bottom-24 right-16 rotate-12" size={22} />
        <HeartBubble className="hidden md:flex absolute top-24 right-1/4 -rotate-6" count={1} />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="paper-card w-full max-w-md p-8 md:p-10 -rotate-1"
        >
          <div className="flex items-center gap-1 p-1 rounded-full bg-rose/40 border border-ink/15 mb-7">
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
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <h1 className="text-3xl md:text-4xl tracking-tight leading-[1.1]">
                {mode === 'signup' ? (
                  <>
                    <span className="ransom-anton">join</span>{' '}
                    <span className="ransom-hand text-candy-dark">notesly ✨</span>
                  </>
                ) : (
                  <>
                    <span className="ransom-anton">welcome</span>{' '}
                    <span className="ransom-hand text-candy-dark">back ✨</span>
                  </>
                )}
              </h1>
              <p className="mt-2 font-elite text-sm text-ink-soft">
                {mode === 'signup'
                  ? 'email + password. takes 5 seconds.'
                  : 'email + password — get back to studying.'}
              </p>

              <form onSubmit={handleSubmit} className="mt-7 space-y-3">
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
                  {mode === 'signup' ? 'create account' : 'sign in'}
                </button>
                {error && <p className="text-xs text-candy-dark font-elite mt-2">{error}</p>}
              </form>
            </motion.div>
          </AnimatePresence>

          <p className="mt-6 text-[11px] font-elite uppercase tracking-wider text-ink-faint text-center">
            10 free conversions / month · no card · cancel anytime
          </p>
        </motion.div>
      </div>
    </main>
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
