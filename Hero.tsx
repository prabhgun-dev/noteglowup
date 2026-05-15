'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Camera } from 'lucide-react';
import { BeforeAfterDemo } from './BeforeAfterDemo';

export function Hero() {
  return (
    <section className="relative pt-16 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 pill bg-paper-50 mb-6"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-coral-400 animate-pulse" />
          Made by a 17-year-old who hated rewriting notes
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-serif text-5xl md:text-7xl leading-[1.05] tracking-tight text-balance"
        >
          Your <span className="font-hand text-coral-400 italic">ugly notes</span>,
          <br />
          aesthetic in <span className="underline-hand">20 seconds.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-2xl mx-auto text-lg text-ink-soft text-pretty"
        >
          Snap a photo of your notebook. Get clean digital notes <em>and</em> 30 flashcards
          you can study right away. Built for JEE, NEET, and Class 11–12.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <Link href="/app" className="btn-primary text-base px-7 py-3.5">
            <Camera size={18} /> Try it free
            <ArrowRight size={16} className="opacity-70" />
          </Link>
          <a href="#how" className="btn-ghost text-base">See how it works</a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-4 text-xs text-ink-faint"
        >
          10 free conversions · no credit card · works on phone
        </motion.p>
      </div>

      <div className="mt-16 md:mt-24 px-6">
        <BeforeAfterDemo />
      </div>
    </section>
  );
}
