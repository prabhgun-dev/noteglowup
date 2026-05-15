'use client';

import { motion } from 'framer-motion';
import { Pushpin, Paperclip, StarSticker, StarBlack, ToBeContinued } from './Stickers';

export function BeforeAfterDemo() {
  return (
    <div className="relative mx-auto w-full max-w-5xl">
      {/* scattered stickers around the frame */}
      <StarSticker className="absolute -top-6 left-4 z-30 rotate-12" size={32} />
      <StarBlack className="absolute -top-2 right-1/3 z-30 -rotate-12" size={20} />
      <Paperclip className="absolute -top-8 right-10 z-30 rotate-12" size={28} />
      <StarSticker className="absolute bottom-4 -left-2 z-30 -rotate-12" size={26} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
        {/* BEFORE — messy notebook polaroid */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -3 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <Pushpin className="absolute -top-4 left-1/2 -translate-x-1/2 z-20" />
          <div className="polaroid relative">
            <span className="sticker-label absolute -top-2 -left-3 z-10 rotate-[-8deg]">before</span>
            <div
              className="aspect-[4/5] overflow-hidden p-5"
              style={{
                background:
                  'repeating-linear-gradient(transparent 0 28px, rgba(14,14,14,0.10) 28px 29px), linear-gradient(180deg, #F5EAD3 0%, #EDDFC0 100%)',
              }}
            >
              <div className="absolute left-9 top-3 bottom-10 w-px bg-accent-red/40" />
              <div className="font-hand text-ink-soft text-xl leading-[29px] tracking-tight space-y-0 pl-3">
                <p className="-rotate-1">photosynthesis -</p>
                <p>plants make food using</p>
                <p className="rotate-[0.5deg]">sunlight + H₂O + CO₂</p>
                <p>→ glucose + O₂</p>
                <p className="text-accent-red -rotate-1">happens in CHLOROPLAST</p>
                <p>(green pigment = chlorophyll)</p>
                <p>2 stages:</p>
                <p className="pl-4 -rotate-[0.5deg]">1. light reaction</p>
                <p className="pl-4">2. dark reaction (calvin)</p>
                <p className="text-ink">v imp for boards!!!</p>
              </div>
            </div>
            <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-base text-ink/70">
              my actual notes 😭
            </p>
          </div>
        </motion.div>

        {/* center sticker badge */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: -6 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative"
          >
            <div className="bg-ink text-cream font-bungee text-xs uppercase tracking-widest px-4 py-2 shadow-sticker rounded-sm">
              20 sec ✨
            </div>
          </motion.div>
        </div>

        {/* AFTER — aesthetic polaroid */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 2 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative"
        >
          <Pushpin className="absolute -top-4 left-1/2 -translate-x-1/2 z-20" />
          <div className="polaroid relative">
            <span className="sticker-label-white absolute -top-2 -right-3 z-10 rotate-[6deg]">after</span>
            <div className="bg-cream aspect-[4/5] p-7 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-elite text-[10px] uppercase tracking-[0.25em] text-ink-faint">biology · ch 11</span>
              </div>
              <h3 className="font-serif text-2xl leading-tight mb-3">
                <span className="highlight">Photosynthesis</span>
              </h3>
              <p className="font-sans text-sm text-ink-soft leading-relaxed mb-4">
                Plants synthesize glucose from <strong className="text-ink">CO₂ + H₂O</strong> using sunlight,
                producing oxygen as a byproduct.
              </p>
              <div className="space-y-2 font-sans text-sm text-ink-soft">
                <div className="flex gap-2"><span className="text-ink">●</span> Occurs in <strong>chloroplasts</strong></div>
                <div className="flex gap-2"><span className="text-ink">●</span> Chlorophyll absorbs light</div>
                <div className="flex gap-2"><span className="text-ink">●</span> Light + Calvin cycle stages</div>
              </div>
              <div className="mt-5 pt-4 border-t border-dashed border-ink/15">
                <p className="font-elite text-[10px] uppercase tracking-[0.25em] text-ink-faint mb-2">+ 32 flashcards</p>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-8 flex-1 rounded-sm bg-paper-200 border border-ink/10" />
                  ))}
                </div>
              </div>
            </div>
            <p className="absolute bottom-2 left-0 right-0 text-center font-hand text-base text-ink/70">
              now THIS is studying ✨
            </p>
          </div>
        </motion.div>
      </div>

      <ToBeContinued className="absolute -bottom-8 left-1/2 -translate-x-1/2 -rotate-3" />
    </div>
  );
}
