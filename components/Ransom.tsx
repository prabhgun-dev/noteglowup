'use client';

import { cn } from '@/lib/utils';
import { useMemo } from 'react';

const FONT_CLASSES = [
  'ransom-serif',
  'ransom-bungee',
  'ransom-anton',
  'ransom-elite',
  'ransom-hand',
] as const;

const ROTATIONS = ['-rotate-2', '-rotate-1', 'rotate-0', 'rotate-1', 'rotate-2'] as const;

/**
 * Splits a string into chunks (words or characters) and renders each with a
 * different font + slight rotation, ransom-note style.
 *
 * Pass `seed` for deterministic ordering (avoids hydration mismatch).
 */
export function Ransom({
  text,
  chunkBy = 'word',
  seed = 7,
  className,
  inline = true,
}: {
  text: string;
  chunkBy?: 'word' | 'char';
  seed?: number;
  className?: string;
  inline?: boolean;
}) {
  const chunks = useMemo(() => {
    const parts = chunkBy === 'word' ? text.split(/(\s+)/) : Array.from(text);
    let s = seed;
    const rand = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return parts.map((part, i) => {
      if (/^\s+$/.test(part)) return { part, font: null, rotate: null, key: i };
      const font = FONT_CLASSES[Math.floor(rand() * FONT_CLASSES.length)];
      const rotate = ROTATIONS[Math.floor(rand() * ROTATIONS.length)];
      return { part, font, rotate, key: i };
    });
  }, [text, chunkBy, seed]);

  const Wrapper: any = inline ? 'span' : 'div';

  return (
    <Wrapper className={cn('inline-flex flex-wrap items-baseline gap-x-1', className)}>
      {chunks.map(({ part, font, rotate, key }) =>
        font ? (
          <span key={key} className={cn(font, rotate, 'inline-block')}>
            {part}
          </span>
        ) : (
          <span key={key}>{part}</span>
        ),
      )}
    </Wrapper>
  );
}
