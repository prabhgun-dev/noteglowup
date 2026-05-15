import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative h-8 w-8 rounded-md bg-ink flex items-center justify-center shadow-sticker rotate-[-4deg]">
        <span className="font-bungee text-cream text-sm leading-none">N</span>
        <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-accent-dot" />
      </div>
      <span className="font-bungee text-xl tracking-tight uppercase">notesly</span>
    </div>
  );
}
