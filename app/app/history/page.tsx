import Link from 'next/link';
import { redirect } from 'next/navigation';
import { ArrowLeft, FileText } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { getQuota } from '@/lib/quota';
import { AppHeader } from '@/components/AppHeader';
import { StarSticker, StarBlack } from '@/components/Stickers';

export const dynamic = 'force-dynamic';

export default async function HistoryPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const quota = await getQuota(user.id);

  const { data: conversions } = await supabase
    .from('conversions')
    .select('id, title, subject, created_at, flashcards')
    .order('created_at', { ascending: false })
    .limit(50);

  return (
    <main className="min-h-screen">
      <AppHeader quota={quota} email={user.email ?? undefined} authed={true} />

      <div className="mx-auto max-w-4xl px-6 py-12 md:py-16 relative">
        <StarSticker className="hidden md:block absolute top-8 right-8 rotate-12" size={26} />
        <StarBlack className="hidden md:block absolute top-32 left-4 -rotate-12" size={20} />

        <Link href="/app" className="btn-ghost mb-6">
          <ArrowLeft size={16} /> Back to upload
        </Link>

        <h1 className="text-4xl md:text-5xl tracking-tight leading-[1.1] mb-2">
          <span className="ransom-anton">your</span>{' '}
          <span className="ransom-hand text-candy-dark">notes 📚</span>
        </h1>
        <p className="font-elite text-sm text-ink-soft mb-10">
          everything you&apos;ve converted, newest first.
        </p>

        {!conversions || conversions.length === 0 ? (
          <div className="paper-card p-10 text-center -rotate-1">
            <p className="font-elite text-ink-soft text-sm mb-4">
              no conversions yet. upload your first notebook page.
            </p>
            <Link href="/app" className="btn-primary text-sm">
              Upload notes
            </Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 gap-5">
            {conversions.map((c, i) => {
              const rotate = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2'][i % 4];
              const cards = (c.flashcards as { front: string; back: string }[]) ?? [];
              return (
                <Link
                  key={c.id}
                  href={`/app/history/${c.id}`}
                  className={`paper-card p-5 ${rotate} hover:rotate-0 hover:-translate-y-1 transition-all`}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-9 w-9 rounded-lg bg-genz text-ink flex items-center justify-center border border-ink/15">
                      <FileText size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      {c.subject && (
                        <span className="font-elite text-[10px] uppercase tracking-[0.2em] text-ink-faint block">
                          {c.subject}
                        </span>
                      )}
                    </div>
                  </div>
                  <h3 className="font-bungee text-base uppercase tracking-wide line-clamp-2">
                    {c.title}
                  </h3>
                  <div className="mt-4 flex items-center justify-between font-elite text-[11px] uppercase tracking-wider text-ink-mute">
                    <span>{cards.length} cards</span>
                    <span>{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}
