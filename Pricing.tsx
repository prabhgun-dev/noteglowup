import Link from 'next/link';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Free',
    price: '₹0',
    cadence: 'forever',
    blurb: 'For trying it out before exams.',
    cta: { label: 'Start free', href: '/app' },
    accent: false,
    features: [
      '10 conversions per month',
      'All export formats',
      'Flashcard study mode',
      'Watermarked PDF exports',
    ],
  },
  {
    name: 'Pro',
    price: '₹399',
    cadence: 'per month',
    blurb: 'For students who study every day.',
    cta: { label: 'Get Pro', href: '/app?upgrade=1' },
    accent: true,
    features: [
      'Unlimited conversions',
      'Priority processing',
      'No watermark · custom themes',
      'Multi-page uploads (up to 20)',
      'Cancel anytime',
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="pill">pricing</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight leading-[1.1]">
            Less than <span className="font-hand text-coral-400 italic">one tuition class.</span>
          </h2>
          <p className="mt-4 text-ink-soft">Pay yearly: ₹2,999 — that's two months free.</p>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5 max-w-3xl mx-auto">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={
                t.accent
                  ? 'relative paper-card p-8 ring-2 ring-ink/90 bg-ink text-cream'
                  : 'paper-card p-8'
              }
            >
              {t.accent && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 pill bg-coral-300 text-ink border-coral-300">
                  Most popular
                </div>
              )}
              <h3 className="font-serif text-2xl">{t.name}</h3>
              <p className={`text-sm mt-1 ${t.accent ? 'text-cream/70' : 'text-ink-soft'}`}>{t.blurb}</p>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="font-serif text-5xl tracking-tight">{t.price}</span>
                <span className={`text-sm ${t.accent ? 'text-cream/60' : 'text-ink-mute'}`}>/ {t.cadence}</span>
              </div>
              <Link
                href={t.cta.href}
                className={
                  t.accent
                    ? 'mt-6 inline-flex items-center justify-center w-full px-6 py-3 rounded-full bg-cream text-ink font-medium text-sm hover:bg-paper-100 transition-colors'
                    : 'mt-6 btn-primary w-full'
                }
              >
                {t.cta.label}
              </Link>
              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className={`flex items-start gap-2 text-sm ${t.accent ? 'text-cream/90' : 'text-ink-soft'}`}>
                    <Check size={16} className={t.accent ? 'text-coral-200 mt-0.5' : 'text-sage-500 mt-0.5'} />
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
