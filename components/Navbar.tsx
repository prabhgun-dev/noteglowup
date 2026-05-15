import Link from 'next/link';
import { Logo } from './Logo';

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-paper/70 border-b border-paper-200/60">
      <nav className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <Link href="/" aria-label="Notesly home">
          <Logo />
        </Link>
        <div className="hidden md:flex items-center gap-1 text-sm text-ink-soft">
          <a href="#how" className="px-3 py-2 hover:text-ink">How it works</a>
          <a href="#features" className="px-3 py-2 hover:text-ink">Features</a>
          <a href="#pricing" className="px-3 py-2 hover:text-ink">Pricing</a>
        </div>
        <div className="flex items-center gap-2">
          <Link href="/login" className="btn-ghost text-sm">Sign in</Link>
          <Link href="/app" className="btn-primary text-sm">Try free</Link>
        </div>
      </nav>
    </header>
  );
}
