import { FileText, Brain, Download, Smartphone, Palette, Zap } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Handwriting that actually works',
    body: 'Even messy. Even cursive. Even Hinglish. Powered by Claude vision.',
  },
  {
    icon: FileText,
    title: 'Notes + flashcards in one shot',
    body: 'Most tools do one. We do both, from the same upload, in the same 20 seconds.',
  },
  {
    icon: Download,
    title: 'Export to anything',
    body: 'Anki .apkg, Quizlet CSV, aesthetic PDF. Your notes, your platform.',
  },
  {
    icon: Smartphone,
    title: 'Phone-first',
    body: 'Built to be used between classes. No app to install. Works on any phone.',
  },
  {
    icon: Palette,
    title: 'Looks like Pinterest, not Word',
    body: 'Soft palettes, real typography, no Comic Sans. Your notes deserve better.',
  },
  {
    icon: Zap,
    title: '20 seconds, end to end',
    body: 'Upload → notes → flashcards. Faster than rewriting one page by hand.',
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-paper-100/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="pill">features</span>
          <h2 className="mt-4 font-serif text-4xl md:text-5xl tracking-tight leading-[1.1]">
            Built for students, not <span className="font-hand text-coral-400 italic">PMs.</span>
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map(({ icon: Icon, title, body }) => (
            <div key={title} className="paper-card p-6 hover:-translate-y-1 transition-transform">
              <div className="h-10 w-10 rounded-xl bg-coral-100 text-coral-500 flex items-center justify-center mb-4">
                <Icon size={18} />
              </div>
              <h3 className="font-serif text-lg mb-1.5">{title}</h3>
              <p className="text-sm text-ink-soft leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
