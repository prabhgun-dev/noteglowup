import { Camera, Wand2, Layers } from 'lucide-react';

const steps = [
  {
    n: '01',
    icon: Camera,
    title: 'Snap your notebook',
    body: 'Phone camera or drag-drop. Multi-page works. Yes, even your worst handwriting.',
  },
  {
    n: '02',
    icon: Wand2,
    title: 'AI does the boring part',
    body: 'Claude reads your notes, cleans them up, structures them, and writes flashcards in one pass.',
  },
  {
    n: '03',
    icon: Layers,
    title: 'Study or export',
    body: 'Flip through flashcards in-app. Export to Anki, Quizlet, or aesthetic PDF.',
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-2xl">
          <span className="pill">how it works</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight leading-[1.1]">
            Three taps. <span className="font-hand text-coral-400 italic">No setup.</span>
          </h2>
          <p className="mt-4 text-ink-soft text-lg max-w-xl">
            You already know how to take a photo. That's the whole UX.
          </p>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-6">
          {steps.map(({ n, icon: Icon, title, body }) => (
            <div key={n} className="paper-card p-7 hover:shadow-lift transition-shadow">
              <div className="flex items-start justify-between mb-6">
                <div className="h-11 w-11 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center">
                  <Icon size={20} />
                </div>
                <span className="font-serif text-3xl text-paper-300">{n}</span>
              </div>
              <h3 className="font-serif text-xl mb-2">{title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
