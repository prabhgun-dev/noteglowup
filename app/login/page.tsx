'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Loader2, KeyRound } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { StarSticker, StarBlack, HeartBubble } from '@/components/Stickers';
import { createClient } from '@/lib/supabase/client';

type Stage = 'email' | 'code';

export default function LoginPage() {
  const router = useRouter();
  const [stage, setStage] = useState<Stage>('email');
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    router.push('/app');
    router.refresh();
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
          <AnimatePresence mode="wait">
            {stage === 'email' ? (
              <motion.div
                key="email"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-3xl md:text-4xl tracking-tight leading-[1.1]">
                  <span className="ransom-anton">welcome</span>{' '}
                  <span className="ransom-hand text-candy-dark">back ✨</span>
                </h1>
                <p className="mt-2 font-elite text-sm text-ink-soft">
                  enter your email — we&apos;ll send a 6-digit code.
                </p>

                <form onSubmit={sendCode} className="mt-7 space-y-3">
                  <label className="block">
                    <span className="font-elite text-[11px] uppercase tracking-wider text-ink-mute">
                      your email
                    </span>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@school.in"
                      className="mt-1.5 w-full px-4 py-3 rounded-full bg-cream border border-ink/15 font-sans text-sm focus:outline-none focus:ring-2 focus:ring-candy"
                    />
                  </label>
                  <button type="submit" disabled={busy} className="btn-primary w-full text-sm disabled:opacity-60">
                    {busy ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />}
                    send code
                    {!busy && <ArrowRight size={14} className="opacity-70" />}
                  </button>
                  {error && (
                    <p className="text-xs text-candy-dark mt-2 font-elite">{error}</p>
                  )}
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="code"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0 }}
              >
                <h1 className="text-3xl md:text-4xl tracking-tight leading-[1.1]">
                  <span className="ransom-anton">check</span>{' '}
                  <span className="ransom-hand text-candy-dark">your inbox 📬</span>
                </h1>
                <p className="mt-2 font-elite text-sm text-ink-soft">
                  we sent a 6-digit code to <strong className="font-bungee text-ink">{email}</strong>.
                </p>

                <form onSubmit={verifyCode} className="mt-7 space-y-3">
                  <label className="block">
                    <span className="font-elite text-[11px] uppercase tracking-wider text-ink-mute">
                      6-digit code
                    </span>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="\d{6}"
                      maxLength={6}
                      required
                      autoFocus
                      value={code}
                      onChange={(e) => setCode(e.target.value.replace(/\D/g, ''))}
                      placeholder="123456"
                      className="mt-1.5 w-full px-4 py-3 rounded-full bg-cream border border-ink/15 font-bungee text-2xl tracking-[0.4em] text-center focus:outline-none focus:ring-2 focus:ring-candy"
                    />
                  </label>
                  <button type="submit" disabled={busy || code.length !== 6} className="btn-primary w-full text-sm disabled:opacity-60">
                    {busy ? <Loader2 size={16} className="animate-spin" /> : <KeyRound size={16} />}
                    sign in
                  </button>
                  {error && (
                    <p className="text-xs text-candy-dark mt-2 font-elite">{error}</p>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setStage('email');
                      setCode('');
                      setError(null);
                    }}
                    className="block w-full text-center text-[11px] font-elite uppercase tracking-wider text-ink-mute hover:text-ink mt-3"
                  >
                    ← use a different email
                  </button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>

          <p className="mt-6 text-[11px] font-elite uppercase tracking-wider text-ink-faint text-center">
            10 free conversions / month · no card · cancel anytime
          </p>
        </motion.div>
      </div>
    </main>
  );
}
