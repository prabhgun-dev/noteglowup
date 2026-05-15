import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { StarBlack, StarSticker, ToBeContinued } from './Stickers';

export function FinalCTA() {
  return (
    <section className="py-24 relative">
      <div className="mx-auto max-w-4xl px-6">
        <div className="relative paper-card p-10 md:p-16 text-center overflow-hidden -rotate-1">
          <StarSticker className="absolute top-6 left-6 -rotate-12" size={32} />
          <StarBlack className="absolute top-8 right-8 rotate-12" size={26} />
          <StarBlack className="absolute bottom-8 left-12 rotate-12" size={20} />
          <StarSticker className="absolute bottom-6 right-10 -rotate-6" size={28} />

          <h2 className="text-4xl md:text-6xl leading-tight tracking-tight">
            <span className="ransom-anton inline-block -rotate-1">stop</span>{' '}
            <span className="ransom-serif italic">rewriting.</span>
            <br />
            <span className="ransom-hand text-accent-red inline-block rotate-2">start studying.</span>
          </h2>
          <p className="mt-5 font-elite text-ink-soft max-w-md mx-auto text-sm">
            10 free conversions. no card. takes 20 seconds to know if it works for you.
          </p>
          <Link href="/app" className="btn-primary mt-8 text-base px-8 py-4">
            try notesly free <ArrowRight size={16} />
          </Link>
        </div>
        <div className="mt-12 flex justify-center">
          <ToBeContinued className="-rotate-2" />
        </div>
      </div>
    </section>
  );
}
