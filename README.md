# Notesly (working name)

AI tool that turns ugly handwritten notes into aesthetic digital notes + auto-generated flashcards.

## Run locally

```bash
# 1. Install Node.js 20+ from https://nodejs.org (LTS)
# 2. Get an Anthropic API key from https://console.anthropic.com
# 3. Copy env file
cp .env.example .env.local
#    then paste your ANTHROPIC_API_KEY into .env.local

# 4. Install + run
npm install
npm run dev
# → http://localhost:3000
```

Supabase + Razorpay env vars are optional for v0 — the upload + AI conversion works with just the Anthropic key.


## The product in one sentence
Upload a phone photo of your notebook → get clean, formatted digital notes AND 20-50 Anki/Quizlet-ready flashcards in under 30 seconds.

## Why it works
- **Two magical transformations in one demo** — perfect for Reels/Shorts.
- **Studytok-native** — visual before/after is the marketing.
- **Indian student market** — Class 11-12, JEE/NEET aspirants, CUET, college students.

## Target user (v1)
- Class 11-12 students taking handwritten notes daily
- JEE/NEET aspirants drowning in PYQ notes
- College students who write but don't type notes
- Studygram creators looking for content + utility

## Pricing
- ₹399/mo (or ₹2,999/year)
- Free tier: 10 conversions/month
- ~95% gross margin at this price

## Key differentiators vs existing tools
- Quizlet AI: weak handwriting OCR, no aesthetic output, no Anki export
- GoodNotes: no AI, no flashcards
- Anki: no OCR, manual card creation
- Otter: lecture audio only, not handwritten

## North star metric
**Conversions completed per user per week** (proxy for retention + virality, since each conversion is shareable).

## Open questions
- [ ] Final brand name (Notesly / Scribely / Inkflow / other)
- [ ] India-first or global from day 1
- [ ] Free tier conversion cap (10 vs 5 vs unlimited-with-watermark)
- [ ] Mobile-first PWA vs native app

## Files in this directory
- [tech-stack.md](tech-stack.md) — APIs, libraries, infra
- [token-economics.md](token-economics.md) — cost-per-conversion math
- [roadmap.md](roadmap.md) — week-by-week build plan
- [marketing.md](marketing.md) — studytok / IG / YT strategy
