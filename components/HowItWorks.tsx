import { Camera, Wand2, Layers } from 'lucide-react';
import { Pushpin, StarBlack } from './Stickers';

const steps = [
  {
    n: '01',
    icon: Camera,
    title: 'snap your notebook',
    body: 'phone camera or drag-drop. multi-page works. yes — even your worst handwriting.',
    rotate: '-rotate-2',
  },
  {
    n: '02',
    icon: Wand2,
    title: 'AI does the boring part',
    body: 'Claude reads, cleans, structures, and writes flashcards in one pass.',
    rotate: 'rotate-1',
  },
  {
    n: '03',
    icon: Layers,
    title: 'study or export',
    body: 'flip flashcards in-app. export to Anki, Quizlet, or aesthetic PDF.',
    rotate: '-rotate-1',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32 relative">
      <StarBlack className="absolute top-12 right-12 -rotate-12 hidden md:block" size={24} />

      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="sticker-label rotate-[-2deg]">how it works</span>
          <h2 className="mt-6 text-4xl md:text-6xl tracking-tight leading-[1.05]">
            <span className="ransom-anton inline-block -rotate-1">three</span>{' '}
            <span className="ransom-serif italic">taps.</span>{' '}
            <span className="ransom-hand text-candy-dark inline-block rotate-2">no setup.</span>
          </h2>
          <p className="mt-4 font-elite text-ink-soft text-base">
            you already know how to take a photo. that's the whole UX.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-10 md:gap-6">
          {steps.map(({ n, icon: Icon, title, body, rotate }) => (
            <div key={n} className={`relative paper-card p-7 ${rotate} hover:rotate-0 transition-transform`}>
              <Pushpin className="absolute -top-3 left-1/2 -translate-x-1/2 z-10" />
              <div className="flex items-start justify-between mb-6 mt-2">
                <div className="h-11 w-11 rounded-md bg-ink text-cream flex items-center justify-center shadow-sticker">
                  <Icon size={20} />
                </div>
                <span className="font-bungee text-3xl text-ink/15">{n}</span>
              </div>
              <h3 className="font-bungee text-lg uppercase mb-2 tracking-wide">{title}</h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
