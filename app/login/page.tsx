'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { StarSticker, StarBlack, HeartBubble } from '@/components/Stickers';
import { createClient } from '@/lib/supabase/client';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
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
    setSent(true);
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
          <h1 className="text-3xl md:text-4xl tracking-tight leading-[1.1]">
            <span className="ransom-anton">welcome</span>{' '}
            <span className="ransom-hand text-candy-dark">back ✨</span>
          </h1>
          <p className="mt-2 font-elite text-sm text-ink-soft">
            we&apos;ll email you a magic link. no passwords ever.
          </p>

          {!sent ? (
            <form onSubmit={submit} className="mt-7 space-y-3">
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
                send magic link
                {!busy && <ArrowRight size={14} className="opacity-70" />}
              </button>
              {error && (
                <p className="text-xs text-candy-dark mt-2 font-elite">{error}</p>
              )}
            </form>
          ) : (
            <div className="mt-7 paper-card p-6 bg-rose-light border-candy/40">
              <div className="flex items-center gap-2 mb-1">
                <Check size={18} className="text-ink" />
                <span className="font-bungee text-sm uppercase tracking-wide">check your inbox</span>
              </div>
              <p className="font-elite text-sm text-ink-soft">
                we sent a link to <strong className="font-bungee text-ink">{email}</strong>. click it to sign in.
              </p>
            </div>
          )}

          <p className="mt-6 text-[11px] font-elite uppercase tracking-wider text-ink-faint text-center">
            10 free conversions / month · no card · cancel anytime
          </p>
        </motion.div>
      </div>
    </main>
  );
}
