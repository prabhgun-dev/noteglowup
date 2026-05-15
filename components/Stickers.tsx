import { cn } from '@/lib/utils';

type StickerProps = { className?: string; size?: number };

/** Yellow star sticker (Gen-Z Yellow gradient) */
export function StarSticker({ className, size = 28 }: StickerProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={cn('drop-shadow-[0_2px_2px_rgba(0,0,0,0.18)]', className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="genz-star" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFEFA8" />
          <stop offset="50%" stopColor="#FCD757" />
          <stop offset="100%" stopColor="#E8BC3A" />
        </linearGradient>
      </defs>
      <path
        d="M16 2 L19.6 12 L30 12.5 L21.8 19.2 L24.8 30 L16 23.6 L7.2 30 L10.2 19.2 L2 12.5 L12.4 12 Z"
        fill="url(#genz-star)"
        stroke="#1A1212"
        strokeWidth="0.9"
      />
    </svg>
  );
}

/** Solid candy-pink star — for accent variety */
export function StarPink({ className, size = 22 }: StickerProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden>
      <path
        d="M16 2 L19.6 12 L30 12.5 L21.8 19.2 L24.8 30 L16 23.6 L7.2 30 L10.2 19.2 L2 12.5 L12.4 12 Z"
        fill="#F4ACB7"
        stroke="#1A1212"
        strokeWidth="0.8"
      />
    </svg>
  );
}

/** Solid dark star — high contrast variant */
export function StarBlack({ className, size = 22 }: StickerProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={className} aria-hidden>
      <path
        d="M16 2 L19.6 12 L30 12.5 L21.8 19.2 L24.8 30 L16 23.6 L7.2 30 L10.2 19.2 L2 12.5 L12.4 12 Z"
        fill="#1A1212"
      />
    </svg>
  );
}

/** Candy-pink IG-style heart notification bubble */
export function HeartBubble({ className, count = 1 }: { className?: string; count?: number }) {
  return (
    <div className={cn('relative inline-flex items-center gap-1.5 bg-candy text-ink rounded-full px-3 py-1 shadow-sticker border border-ink/15', className)}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 21s-7-4.5-9.5-9.2C.5 8 2.5 4 6 4c2 0 3.5 1.2 4 2.5C10.5 5.2 12 4 14 4c3.5 0 5.5 4 3.5 7.8C19 16.5 12 21 12 21z" />
      </svg>
      <span className="font-bungee text-xs">{count}</span>
    </div>
  );
}

/** Pushpin — candy pink head with highlight */
export function Pushpin({ className, size = 26 }: StickerProps) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className={cn('drop-shadow-[0_2px_3px_rgba(0,0,0,0.25)]', className)} aria-hidden>
      <defs>
        <radialGradient id="pin-pink" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FCE1E0" />
          <stop offset="55%" stopColor="#F4ACB7" />
          <stop offset="100%" stopColor="#9C4A55" />
        </radialGradient>
      </defs>
      <circle cx="16" cy="11" r="8" fill="url(#pin-pink)" stroke="#1A1212" strokeWidth="0.7" />
      <circle cx="13" cy="8" r="2.5" fill="rgba(255,255,255,0.65)" />
      <path d="M15 18 L17 18 L16.2 28 Z" fill="#1A1212" />
    </svg>
  );
}

/** Silver paperclip — neutral to balance the pinks */
export function Paperclip({ className, size = 32 }: StickerProps) {
  return (
    <svg viewBox="0 0 32 64" width={size} height={size * 2} className={cn('drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]', className)} aria-hidden>
      <path
        d="M22 4 C26 4 28 6 28 10 L28 48 C28 56 22 60 16 60 C10 60 4 56 4 48 L4 16 C4 10 8 6 12 6 C16 6 20 10 20 14 L20 46 C20 50 18 52 16 52 C14 52 12 50 12 46 L12 18"
        fill="none"
        stroke="#9B9B9B"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SafetyPin({ className, size = 36 }: StickerProps) {
  return (
    <svg viewBox="0 0 80 32" width={size * 2.5} height={size} className={cn('drop-shadow-[0_2px_2px_rgba(0,0,0,0.2)]', className)} aria-hidden>
      <path
        d="M10 16 Q 10 6, 20 6 L 65 6 Q 72 6, 72 12 Q 72 18, 65 18 L 22 18 Q 14 18, 14 12"
        fill="none"
        stroke="#B5B5B5"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="10" cy="16" r="6" fill="none" stroke="#B5B5B5" strokeWidth="2.5" />
    </svg>
  );
}

/** Yellow "to be continued" arrow sticker */
export function ToBeContinued({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 bg-genz text-ink px-4 py-1.5 font-elite text-[11px] uppercase tracking-wider',
        'relative shadow-sticker border border-ink/15',
        className,
      )}
      style={{ clipPath: 'polygon(0 0, calc(100% - 14px) 0, 100% 50%, calc(100% - 14px) 100%, 0 100%, 8px 50%)' }}
    >
      to be continued
    </div>
  );
}

export function CornerTape({ className, rotate = 45 }: { className?: string; rotate?: number }) {
  return (
    <div
      className={cn('absolute w-20 h-5 bg-candy/70 shadow-sm', className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <div className="absolute inset-y-0 left-0 w-1 bg-black/5" />
      <div className="absolute inset-y-0 right-0 w-1 bg-black/5" />
    </div>
  );
}

/** Rose-quartz colored "memories" ticket tab */
export function MemoryTicket({ className, label = 'memories' }: { className?: string; label?: string }) {
  return (
    <div className={cn('relative inline-block', className)}>
      <div
        className="px-4 py-1.5 bg-rose text-ink/80 font-elite text-[11px] uppercase tracking-[0.25em] border border-ink/15"
        style={{
          clipPath:
            'polygon(0 0, 100% 0, 100% 30%, 96% 50%, 100% 70%, 100% 100%, 0 100%, 0 70%, 4% 50%, 0 30%)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function Lightbulb({ className, size = 28 }: StickerProps) {
  return (
    <svg viewBox="0 0 32 40" width={size} height={size * 1.25} className={cn('drop-shadow-[0_2px_3px_rgba(0,0,0,0.2)]', className)} aria-hidden>
      <ellipse cx="16" cy="14" rx="10" ry="11" fill="#FCD757" stroke="#1A1212" strokeWidth="1" />
      <path d="M9 16 Q 16 22, 23 16" fill="none" stroke="#1A1212" strokeWidth="0.8" opacity="0.6" />
      <rect x="11" y="24" width="10" height="3" fill="#9B9B9B" />
      <rect x="12" y="27" width="8" height="3" fill="#7A7A7A" />
      <rect x="13" y="30" width="6" height="2" fill="#5C5C5C" />
      <circle cx="13" cy="11" r="2" fill="rgba(255,255,255,0.55)" />
    </svg>
  );
}

export function PolaroidFrame({
  children,
  caption,
  rotate = 0,
  className,
}: {
  children: React.ReactNode;
  caption?: string;
  rotate?: number;
  className?: string;
}) {
  return (
    <div
      className={cn('polaroid inline-block', className)}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
      {caption && (
        <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-base text-ink">
          {caption}
        </p>
      )}
    </div>
  );
}
