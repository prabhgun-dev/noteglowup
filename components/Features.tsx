import { FileText, Brain, Download, Smartphone, Palette, Zap } from 'lucide-react';
import { StarSticker, StarBlack, MemoryTicket } from './Stickers';

const features = [
  { icon: Brain, title: 'handwriting that works', body: 'even messy. even cursive. even Hinglish.', rotate: '-rotate-1' },
  { icon: FileText, title: 'notes + cards in one shot', body: 'most tools do one. we do both, same upload, same 20 sec.', rotate: 'rotate-1' },
  { icon: Download, title: 'export to anything', body: 'Anki .apkg, Quizlet CSV, aesthetic PDF. your notes, your platform.', rotate: '-rotate-2' },
  { icon: Smartphone, title: 'phone-first', body: 'built to use between classes. no app to install.', rotate: 'rotate-2' },
  { icon: Palette, title: 'looks like Pinterest, not Word', body: 'real typography. no Comic Sans. your notes deserve better.', rotate: '-rotate-1' },
  { icon: Zap, title: '20 sec end-to-end', body: 'upload → notes → flashcards. faster than rewriting one page.', rotate: 'rotate-1' },
];

export function Features() {
  return (
    <section id="features" className="py-24 md:py-32 bg-rose/30 relative">
      <StarSticker className="absolute top-16 left-12 -rotate-12 hidden md:block" size={28} />
      <StarBlack className="absolute bottom-20 right-16 rotate-12 hidden md:block" size={22} />

      <div className="mx-auto max-w-6xl px-6">
        <div className="text-center max-w-2xl mx-auto">
          <MemoryTicket />
          <h2 className="mt-4 text-4xl md:text-6xl tracking-tight leading-[1.05]">
            <span className="ransom-anton inline-block -rotate-1">built for</span>{' '}
            <span className="ransom-serif italic">students,</span>{' '}
            <span className="ransom-hand text-candy-dark rotate-2 inline-block">not PMs.</span>
          </h2>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, body, rotate }) => (
            <div key={title} className={`paper-card p-6 ${rotate} hover:rotate-0 hover:-translate-y-1 transition-all`}>
              <div className="h-10 w-10 rounded-md bg-ink text-cream flex items-center justify-center mb-4 shadow-sticker">
                <Icon size={18} />
              </div>
              <h3 className="font-bungee text-base uppercase mb-1.5 tracking-wide">{title}</h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
