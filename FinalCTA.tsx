import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export function FinalCTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative paper-card p-10 md:p-16 text-center overflow-hidden">
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-coral-100 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-sage-100 blur-3xl" />
          <div className="relative">
            <h2 className="font-serif text-4xl md:text-5xl leading-tight tracking-tight">
              Stop rewriting. <span className="font-hand text-coral-400 italic">Start studying.</span>
            </h2>
            <p className="mt-4 text-ink-soft max-w-md mx-auto">
              10 free conversions. No card. Takes 20 seconds to know if it works for you.
            </p>
            <Link href="/app" className="btn-primary mt-8 text-base px-7 py-3.5">
              Try Notesly free <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
