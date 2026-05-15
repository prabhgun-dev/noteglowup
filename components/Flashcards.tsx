'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, RotateCcw, Shuffle } from 'lucide-react';
import type { Flashcard } from '@/lib/types';

export function Flashcards({ cards: initial }: { cards: Flashcard[] }) {
  const [cards, setCards] = useState(initial);
  const [i, setI] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const next = () => {
    setFlipped(false);
    setI((p) => (p + 1) % cards.length);
  };
  const prev = () => {
    setFlipped(false);
    setI((p) => (p - 1 + cards.length) % cards.length);
  };
  const shuffle = () => {
    setCards((prev) => [...prev].sort(() => Math.random() - 0.5));
    setI(0);
    setFlipped(false);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') {
        e.preventDefault();
        setFlipped((f) => !f);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards.length]);

  const card = cards[i];

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-ink-mute">
          Card <span className="font-medium text-ink">{i + 1}</span> of {cards.length}
        </span>
        <div className="flex items-center gap-1">
          <button onClick={shuffle} className="btn-ghost text-xs py-2 px-3" aria-label="Shuffle">
            <Shuffle size={14} /> Shuffle
          </button>
          <button onClick={() => { setI(0); setFlipped(false); }} className="btn-ghost text-xs py-2 px-3" aria-label="Restart">
            <RotateCcw size={14} /> Restart
          </button>
        </div>
      </div>

      <div className="relative perspective-1000" style={{ perspective: '1200px' }}>
        <motion.div
          onClick={() => setFlipped((f) => !f)}
          className="cursor-pointer relative w-full aspect-[3/2] select-none"
          style={{ transformStyle: 'preserve-3d' }}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
          <Face front>
            <p className="text-xs uppercase tracking-[0.2em] text-ink-faint mb-3">question</p>
            <p className="font-serif text-2xl md:text-3xl leading-snug text-balance">{card.front}</p>
          </Face>
          <Face>
            <p className="text-xs uppercase tracking-[0.2em] text-candy-dark mb-3">answer</p>
            <p className="font-serif text-xl md:text-2xl leading-snug text-balance">{card.back}</p>
          </Face>
        </motion.div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <button onClick={prev} className="btn-ghost">
          <ChevronLeft size={18} /> Prev
        </button>
        <p className="text-xs text-ink-faint">tap card or press space to flip</p>
        <button onClick={next} className="btn-primary">
          Next <ChevronRight size={18} />
        </button>
      </div>

      <AnimatePresence>
        {cards.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 h-1.5 rounded-full bg-rose-light overflow-hidden"
          >
            <motion.div
              className="h-full bg-candy"
              animate={{ width: `${((i + 1) / cards.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Face({ children, front }: { children: React.ReactNode; front?: boolean }) {
  return (
    <div
      className={`absolute inset-0 paper-card p-8 md:p-12 flex flex-col items-center justify-center text-center ${
        front ? '' : 'bg-rose-light'
      }`}
      style={{ backfaceVisibility: 'hidden', transform: front ? 'rotateY(0deg)' : 'rotateY(180deg)' }}
    >
      {children}
    </div>
  );
}
