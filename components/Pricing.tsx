import Link from 'next/link';
import { Check } from 'lucide-react';
import { HeartBubble, MemoryTicket, StarSticker } from './Stickers';

const tiers = [
  {
    name: 'free',
    price: '₹0',
    cadence: 'forever',
    blurb: 'for trying it out before exams.',
    cta: { label: 'start free', href: '/app' },
    accent: false,
    rotate: '-rotate-1',
    features: [
      '10 conversions / month',
      'all export formats',
      'flashcard study mode',
      'watermarked PDFs',
    ],
  },
  {
    name: 'pro',
    price: '₹399',
    cadence: 'per month',
    blurb: 'for students who study every day.',
    cta: { label: 'get pro', href: '/app?upgrade=1' },
    accent: true,
    rotate: 'rotate-1',
    features: [
      'unlimited conversions',
      'priority processing',
      'no watermark · custom themes',
      'multi-page (up to 20)',
      'cancel anytime',
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32 relative">
      <StarSticker className="absolute top-20 right-16 rotate-12 hidden md:block" size={28} />

      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <MemoryTicket />
          <h2 className="mt-4 text-4xl md:text-6xl tracking-tight leading-[1.05]">
            <span className="ransom-anton inline-block -rotate-1">less than</span>{' '}
            <span className="ransom-hand text-accent-red inline-block rotate-2">one</span>{' '}
            <span className="ransom-serif italic">tuition class.</span>
          </h2>
          <p className="mt-4 font-elite text-ink-soft">pay yearly: ₹2,999 — that's 2 months free.</p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative paper-card p-8 ${t.rotate} hover:rotate-0 transition-transform ${
                t.accent ? 'bg-ink text-cream border-ink' : ''
              }`}
            >
              {t.accent && (
                <HeartBubble className="absolute -top-3 -right-3 rotate-12 z-10" count={1} />
              )}
              <h3 className="font-bungee text-2xl uppercase tracking-wide">{t.name}</h3>
              <p className={`font-elite text-xs mt-1 ${t.accent ? 'text-cream/70' : 'text-ink-mute'}`}>
                {t.blurb}
              </p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-bungee text-5xl tracking-tight">{t.price}</span>
                <span className={`font-elite text-xs ${t.accent ? 'text-cream/60' : 'text-ink-mute'}`}>
                  / {t.cadence}
                </span>
              </div>
              <Link
                href={t.cta.href}
                className={
                  t.accent
                    ? 'mt-6 inline-flex items-center justify-center w-full px-6 py-3 rounded-full bg-cream text-ink font-bungee text-xs uppercase tracking-wider hover:bg-paper-100 transition-colors'
                    : 'mt-6 btn-primary w-full'
                }
              >
                {t.cta.label}
              </Link>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li
                    key={f}
                    className={`flex items-start gap-2 font-sans text-sm ${
                      t.accent ? 'text-cream/90' : 'text-ink-soft'
                    }`}
                  >
                    <Check size={16} className={t.accent ? 'text-cream mt-0.5' : 'text-ink mt-0.5'} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
