import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { getQuota } from '@/lib/quota';
import { AppHeader } from '@/components/AppHeader';
import { Workbench } from '@/components/Workbench';

export const dynamic = 'force-dynamic';

export default async function AppPage() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const quota = await getQuota(user.id);

  return (
    <main className="min-h-screen">
      <AppHeader quota={quota} email={user.email ?? undefined} />
      <Workbench />
    </main>
  );
}
