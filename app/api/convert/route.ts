import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { z } from 'zod';
import { getOpenAI, CONVERSION_SYSTEM_PROMPT } from '@/lib/llm';
import { createClient } from '@/lib/supabase/server';
import { getQuota } from '@/lib/quota';
import type { ConvertResponse } from '@/lib/types';

export const runtime = 'nodejs';
export const maxDuration = 60;

const ResultSchema = z.object({
  title: z.string().min(1).max(120),
  subject: z.string().optional(),
  notesMarkdown: z.string().min(1),
  flashcards: z
    .array(z.object({ front: z.string().min(1), back: z.string().min(1) }))
    .min(1)
    .max(60),
});

async function fileToResizedBase64(file: File) {
  const buf = Buffer.from(await file.arrayBuffer());
  const resized = await sharp(buf)
    .rotate()
    .resize({ width: 1568, height: 1568, fit: 'inside', withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer();
  return resized.toString('base64');
}

export async function POST(req: Request) {
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Please sign in to convert notes' }, { status: 401 });
    }

    const quota = await getQuota(user.id);
    if (quota.plan === 'free' && quota.remaining !== null && quota.remaining <= 0) {
      return NextResponse.json(
        {
          error: 'free_limit_reached',
          message: `You've used all ${quota.limit} free conversions this month. Upgrade for unlimited.`,
        },
        { status: 402 },
      );
    }

    const form = await req.formData();
    const files = form.getAll('images').filter((f): f is File => f instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: 'No images uploaded' }, { status: 400 });
    }
    if (files.length > 20) {
      return NextResponse.json({ error: 'Max 20 pages per upload' }, { status: 400 });
    }

    const imageMessages = await Promise.all(
      files.map(async (file) => ({
        type: 'image_url' as const,
        image_url: {
          url: `data:image/jpeg;base64,${await fileToResizedBase64(file)}`,
          detail: 'high' as const,
        },
      })),
    );

    const openai = getOpenAI();
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      max_tokens: 4096,
      response_format: { type: 'json_object' },
      messages: [
        { role: 'system', content: CONVERSION_SYSTEM_PROMPT },
        {
          role: 'user',
          content: [
            ...imageMessages,
            {
              type: 'text',
              text: 'Convert these notebook pages. Return only the JSON object specified.',
            },
          ],
        },
      ],
    });

    const raw = completion.choices[0]?.message?.content;
    if (!raw) {
      return NextResponse.json({ error: 'Model returned no text' }, { status: 502 });
    }

    let parsed: unknown;
    try {
      parsed = JSON.parse(raw);
    } catch {
      return NextResponse.json({ error: 'Model returned invalid JSON' }, { status: 502 });
    }

    const validated = ResultSchema.safeParse(parsed);
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Model output failed validation', details: validated.error.flatten() },
        { status: 502 },
      );
    }

    const result: ConvertResponse = validated.data;

    await supabase.from('conversions').insert({
      user_id: user.id,
      title: result.title,
      subject: result.subject,
      notes_markdown: result.notesMarkdown,
      flashcards: result.flashcards,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error('[convert] error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
