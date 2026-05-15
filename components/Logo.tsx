import { cn } from '@/lib/utils';

export function Logo({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className="relative h-8 w-8 rounded-xl bg-ink flex items-center justify-center shadow-paper">
        <span className="font-serif text-cream text-lg leading-none">n</span>
        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-coral-300" />
      </div>
      <span className="font-serif text-xl tracking-tight">notesly</span>
    </div>
  );
}
