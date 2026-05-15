import Link from 'next/link';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="border-t border-ink/10 py-12 mt-12">
      <div className="mx-auto max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <Logo />
        <p className="font-elite text-xs uppercase tracking-wider text-ink-mute">
          made in <span className="font-hand normal-case text-candy-dark text-base">bharat</span> · for students who study weird hours
        </p>
        <div className="flex items-center gap-4 font-elite text-[11px] uppercase tracking-wider text-ink-mute">
          <Link href="/privacy" className="hover:text-ink">privacy</Link>
          <Link href="/terms" className="hover:text-ink">terms</Link>
          <a href="mailto:hi@notesly.app" className="hover:text-ink">contact</a>
        </div>
      </div>
    </footer>
  );
}
