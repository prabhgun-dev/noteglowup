'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function BeforeAfterDemo() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
        {/* BEFORE — messy notebook */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -top-3 -left-3 z-10 pill bg-paper-100">
            <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
            before
          </div>
          <div
            className="relative aspect-[4/5] rounded-2xl shadow-lift p-6 overflow-hidden"
            style={{
              background:
                'repeating-linear-gradient(transparent 0 31px, rgba(31,27,22,0.08) 31px 32px), linear-gradient(180deg, #F5EAD3 0%, #EDDFC0 100%)',
            }}
          >
            <div className="absolute left-10 top-0 bottom-0 w-px bg-coral-300/50" />
            <div className="font-hand text-ink-soft text-xl leading-[32px] tracking-tight space-y-0">
              <p className="-rotate-1">photosynthesis -</p>
              <p>plants make food using</p>
              <p className="rotate-[0.5deg]">sunlight ☀️ + H₂O + CO₂</p>
              <p>→ glucose + O₂</p>
              <p className="text-coral-500 -rotate-1">happens in CHLOROPLAST</p>
              <p>(green pigment = chlorophyll)</p>
              <p>2 stages:</p>
              <p className="pl-4 -rotate-[0.5deg]">1. light reaction</p>
              <p className="pl-4">2. dark reaction (calvin)</p>
              <p className="text-sage-500">v imp for boards!!!</p>
            </div>
            <div className="absolute -right-4 -bottom-4 h-24 w-24 rounded-full bg-coral-100/60 blur-2xl" />
          </div>
        </motion.div>

        {/* Arrow / sparkle in middle on desktop */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: [0, 12, 0] }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="h-14 w-14 rounded-full bg-ink text-cream flex items-center justify-center shadow-lift"
          >
            <Sparkles size={22} />
          </motion.div>
        </div>

        {/* AFTER — aesthetic notes */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <div className="absolute -top-3 -right-3 z-10 pill bg-sage-100 border-sage-200 text-sage-600">
            <span className="h-1.5 w-1.5 rounded-full bg-sage-400" />
            after
          </div>
          <div className="paper-card aspect-[4/5] p-7 overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-coral-300" />
              <span className="text-[10px] uppercase tracking-[0.2em] text-ink-faint">biology · ch 11</span>
            </div>
            <h3 className="font-serif text-2xl leading-tight mb-3">
              <span className="highlight">Photosynthesis</span>
            </h3>
            <p className="text-sm text-ink-soft leading-relaxed mb-4">
              Plants synthesize glucose from <span className="font-medium text-ink">CO₂ + H₂O</span> using sunlight,
              producing oxygen as a byproduct.
            </p>
            <div className="space-y-2 text-sm text-ink-soft">
              <div className="flex gap-2"><span className="text-coral-400">●</span> Occurs in <span className="font-medium text-ink">chloroplasts</span></div>
              <div className="flex gap-2"><span className="text-coral-400">●</span> Chlorophyll absorbs light</div>
              <div className="flex gap-2"><span className="text-coral-400">●</span> Two stages: light + Calvin cycle</div>
            </div>
            <div className="mt-5 pt-4 border-t border-paper-200">
              <p className="text-[10px] uppercase tracking-[0.2em] text-ink-faint mb-2">+ 32 flashcards</p>
              <div className="flex gap-1.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 flex-1 rounded-md bg-paper-100 border border-paper-300/60"
                  />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
