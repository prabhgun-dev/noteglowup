import { createClient } from '@/lib/supabase/server';

export const FREE_LIMIT = 10;

export type QuotaStatus = {
  plan: 'free' | 'pro';
  used: number;
  limit: number | null; // null = unlimited
  remaining: number | null;
};

/** Returns the current month's usage and limit for the authenticated user. */
export async function getQuota(userId: string): Promise<QuotaStatus> {
  const supabase = createClient();

  const { data: profile } = await supabase
    .from('profiles')
    .select('plan')
    .eq('id', userId)
    .single();

  const plan = (profile?.plan ?? 'free') as 'free' | 'pro';

  const monthStart = new Date();
  monthStart.setUTCDate(1);
  monthStart.setUTCHours(0, 0, 0, 0);

  const { count } = await supabase
    .from('conversions')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', userId)
    .gte('created_at', monthStart.toISOString());

  const used = count ?? 0;
  if (plan === 'pro') {
    return { plan, used, limit: null, remaining: null };
  }
  return { plan, used, limit: FREE_LIMIT, remaining: Math.max(0, FREE_LIMIT - used) };
}
