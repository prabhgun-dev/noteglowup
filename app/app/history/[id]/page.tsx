import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { createClient } from '@/lib/supabase/server';
import { getQuota } from '@/lib/quota';
import { AppHeader } from '@/components/AppHeader';
import { ResultClient } from './ResultClient';

export const dynamic = 'force-dynamic';

export default async function HistoryDetail({ params }: { params: { id: string } }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  const { data: row } = await supabase
    .from('conversions')
    .select('id, title, subject, notes_markdown, flashcards')
    .eq('id', params.id)
    .single();

  if (!row) notFound();

  const quota = await getQuota(user.id);

  const result = {
    title: row.title as string,
    subject: row.subject as string | undefined,
    notesMarkdown: row.notes_markdown as string,
    flashcards: row.flashcards as { front: string; back: string }[],
  };

  return (
    <main className="min-h-screen">
      <AppHeader quota={quota} email={user.email ?? undefined} authed={true} />
      <div className="px-6 py-10 md:py-14">
        <div className="max-w-4xl mx-auto mb-6">
          <Link href="/app/history" className="btn-ghost">
            <ArrowLeft size={16} /> Back to history
          </Link>
        </div>
        <ResultClient result={result} />
      </div>
    </main>
  );
}
