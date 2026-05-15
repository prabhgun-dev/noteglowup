import { NextResponse } from 'next/server';
import sharp from 'sharp';
import { z } from 'zod';
import { getAnthropic, CONVERSION_SYSTEM_PROMPT } from '@/lib/anthropic';
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
    const form = await req.formData();
    const files = form.getAll('images').filter((f): f is File => f instanceof File);

    if (files.length === 0) {
      return NextResponse.json({ error: 'No images uploaded' }, { status: 400 });
    }
    if (files.length > 20) {
      return NextResponse.json({ error: 'Max 20 pages per upload' }, { status: 400 });
    }

    const imageParts = await Promise.all(
      files.map(async (file) => ({
        type: 'image' as const,
        source: {
          type: 'base64' as const,
          media_type: 'image/jpeg' as const,
          data: await fileToResizedBase64(file),
        },
      })),
    );

    const anthropic = getAnthropic();
    const message = await anthropic.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 4096,
      system: [
        {
          type: 'text',
          text: CONVERSION_SYSTEM_PROMPT,
          cache_control: { type: 'ephemeral' },
        },
      ],
      messages: [
        {
          role: 'user',
          content: [
            ...imageParts,
            {
              type: 'text',
              text: 'Convert these notebook pages. Return only the JSON object specified.',
            },
          ],
        },
      ],
    });

    const textBlock = message.content.find((b) => b.type === 'text');
    if (!textBlock || textBlock.type !== 'text') {
      return NextResponse.json({ error: 'Model returned no text' }, { status: 502 });
    }

    let raw = textBlock.text.trim();
    if (raw.startsWith('```')) {
      raw = raw.replace(/^```(?:json)?\s*/i, '').replace(/```\s*$/, '').trim();
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
    return NextResponse.json(result);
  } catch (err) {
    console.error('[convert] error', err);
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
