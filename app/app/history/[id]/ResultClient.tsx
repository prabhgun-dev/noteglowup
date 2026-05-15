'use client';

import { useRouter } from 'next/navigation';
import { ResultView } from '@/components/ResultView';
import type { ConvertResponse } from '@/lib/types';

export function ResultClient({ result }: { result: ConvertResponse }) {
  const router = useRouter();
  return <ResultView result={result} onReset={() => router.push('/app/history')} />;
}
