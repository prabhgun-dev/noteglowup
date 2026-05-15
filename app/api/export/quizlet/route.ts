import { NextResponse } from 'next/server';
import { z } from 'zod';

export const runtime = 'nodejs';

const Body = z.object({
  title: z.string().default('notesly'),
  flashcards: z
    .array(z.object({ front: z.string(), back: z.string() }))
    .min(1),
});

function escapeField(s: string) {
  // tab-separated, strip any tabs/newlines from content
  return s.replace(/\t/g, '  ').replace(/\r?\n/g, ' ').trim();
}

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
  const { title, flashcards } = parsed.data;

  const lines = flashcards.map((c) => `${escapeField(c.front)}\t${escapeField(c.back)}`);
  const csv = lines.join('\n');

  const filename = `${slug(title)}-quizlet.txt`;
  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/tab-separated-values; charset=utf-8',
      'Content-Disposition': `attachment; filename="${filename}"`,
    },
  });
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'notesly';
}
