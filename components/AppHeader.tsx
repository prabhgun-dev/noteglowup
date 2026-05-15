import Link from 'next/link';
import { LogOut, History } from 'lucide-react';
import { Logo } from './Logo';
import { signOut } from '@/app/app/actions';
import type { QuotaStatus } from '@/lib/quota';

export function AppHeader({
  quota,
  email,
  authed,
}: {
  quota: QuotaStatus | null;
  email?: string;
  authed: boolean;
}) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-dogwood/80 border-b border-ink/10 no-print">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Notesly home">
          <Logo />
        </Link>

        <div className="flex items-center gap-2">
          {authed ? (
            <>
              <Link href="/app/history" className="btn-ghost text-xs">
                <History size={14} />
                <span className="hidden sm:inline">History</span>
              </Link>
              {quota && <QuotaBadge quota={quota} />}
              <form action={signOut}>
                <button type="submit" className="btn-ghost text-xs" title={email}>
                  <LogOut size={14} />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              </form>
            </>
          ) : (
            <span className="pill">10 free / month · no card</span>
          )}
        </div>
      </div>
    </header>
  );
}

function QuotaBadge({ quota }: { quota: QuotaStatus }) {
  if (quota.plan === 'pro') {
    return <span className="sticker-label-yellow">pro · unlimited</span>;
  }
  const low = (quota.remaining ?? 0) <= 2;
  return (
    <span className={low ? 'sticker-label-candy' : 'pill'}>
      {quota.remaining} / {quota.limit} free left
    </span>
  );
}
