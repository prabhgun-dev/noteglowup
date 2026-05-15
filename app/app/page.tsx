import { createClient } from '@/lib/supabase/server';
import { getQuota, type QuotaStatus } from '@/lib/quota';
import { AppHeader } from '@/components/AppHeader';
import { Workbench } from '@/components/Workbench';

export const dynamic = 'force-dynamic';

export default async function AppPage() {
  let user = null;
  let quota: QuotaStatus | null = null;

  try {
    const supabase = createClient();
    const { data } = await supabase.auth.getUser();
    user = data.user;
    if (user) {
      quota = await getQuota(user.id);
    }
  } catch {
    // Supabase not configured yet — render as anon
  }

  return (
    <main className="min-h-screen">
      <AppHeader quota={quota} email={user?.email ?? undefined} authed={!!user} />
      <Workbench initialAuthed={!!user} />
    </main>
  );
}
