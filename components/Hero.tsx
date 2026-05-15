'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { BeforeAfterDemo } from './BeforeAfterDemo';
import { StarBlack, StarSticker, HeartBubble, SafetyPin } from './Stickers';

export function Hero() {
  return (
    <section className="relative pt-16 pb-32 md:pt-20 md:pb-40 overflow-hidden">
      {/* floating sticker decorations */}
      <StarBlack className="hidden md:block absolute top-24 left-12 -rotate-12" size={28} />
      <StarSticker className="hidden md:block absolute top-40 right-16 rotate-12" size={36} />
      <SafetyPin className="hidden lg:block absolute top-32 left-1/4 -rotate-12" size={28} />
      <HeartBubble className="hidden md:flex absolute top-36 right-1/4 -rotate-6" count={1} />

      <div className="mx-auto max-w-6xl px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 sticker-label-white mb-8 rotate-[-2deg]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-candy animate-pulse" />
          built by a 17yo who hated rewriting notes
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-8xl leading-[0.95] tracking-tight text-balance"
        >
          <span className="ransom-anton inline-block -rotate-2">YOUR</span>{' '}
          <span className="ransom-hand text-candy-dark inline-block rotate-1 italic">ugly</span>{' '}
          <span className="ransom-bungee inline-block rotate-1">NOTES,</span>
          <br />
          <span className="ransom-serif italic inline-block -rotate-1">aesthetic</span>{' '}
          <span className="ransom-elite inline-block">in</span>{' '}
          <span className="ransom-anton inline-block rotate-2 underline-hand">20 seconds.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 max-w-2xl mx-auto font-elite text-base md:text-lg text-ink-soft text-pretty leading-relaxed"
        >
          snap a photo of your notebook → get clean digital notes + 30 flashcards.
          built for JEE, NEET, Class 11–12.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/app" className="btn-primary text-base px-8 py-4">
            <Camera size={18} /> try it free
            <ArrowRight size={16} className="opacity-70" />
          </Link>
          <a href="#how" className="btn-ghost text-sm">↓ see how it works</a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-5 font-elite text-[11px] uppercase tracking-[0.2em] text-ink-faint"
        >
          10 free conversions · no card · works on phone
        </motion.p>
      </div>

      <div className="mt-20 md:mt-28 px-6">
        <BeforeAfterDemo />
      </div>
    </section>
  );
}
