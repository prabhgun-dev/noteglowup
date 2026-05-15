import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-paper-200/60 py-12 mt-12">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="text-sm text-ink-mute">
          Made in <span className="font-hand text-coral-400">Bharat</span> · for students who study weird hours
        </p>
        <div className="flex items-center gap-4 text-xs text-ink-mute">
          <Link href="/privacy" className="hover:text-ink">Privacy</Link>
          <Link href="/terms" className="hover:text-ink">Terms</Link>
          <a href="mailto:hi@notesly.app" className="hover:text-ink">Contact</a>
        </div>
      </div>
    </footer>
  );
}
