# Build Roadmap

## Week 1: Core conversion working end-to-end
**Goal:** Photo in → notes + flashcards out, in a browser, for one user (you).

- [ ] Next.js app scaffolded, deployed to Vercel
- [ ] Supabase project: auth + storage bucket
- [ ] Upload UI: drag-drop or camera capture
- [ ] Sharp resize pipeline (1568px max edge)
- [ ] Anthropic API integration with Claude Haiku 4.5 vision
- [ ] Prompt engineered for: clean notes + structured flashcard JSON
- [ ] Display notes (rendered markdown) + flashcard view (Quizlet-style flip)
- [ ] Save conversion history per user in Supabase

**Demo-able milestone:** Upload notebook photo → see notes + flip through flashcards.

## Week 2: Export + polish + landing page
- [ ] Anki .apkg export (`genanki` in serverless function)
- [ ] Quizlet CSV export
- [ ] PDF export of notes (aesthetic template — Caveat font for "handwritten" feel)
- [ ] Landing page with hero demo video + waitlist
- [ ] Free tier limit (10 conversions/mo)
- [ ] Razorpay integration: ₹399/mo paid plan
- [ ] Basic analytics (Posthog or Plausible)

**Demo-able milestone:** Stranger on the internet can sign up, hit free limit, pay, and use it.

## Week 3: Content + soft launch
- [ ] Record 10 short demo videos (different note types: messy, neat, math, biology, history)
- [ ] Post 5 Reels/Shorts (varied hooks — see [marketing.md](marketing.md))
- [ ] Post in 3 Reddit communities (r/JEE, r/Indian_Academia, r/GetStudying)
- [ ] DM 50 studygram creators offering free Pro for honest review
- [ ] Telegram channel for free PYQ flashcard packs (lead magnet)
- [ ] Track: signups, conversion rate, retention day 7

## Week 4: Iterate based on real usage
- [ ] Fix top 3 user complaints (likely: messy handwriting accuracy, math equations, multi-page UX)
- [ ] Add the #1 most-requested feature
- [ ] Re-post best-performing content format
- [ ] First paying customers should exist by end of week 4

## Month 2: Scale what works
- Double down on highest-converting content format
- Affiliate program for studygram creators (30% recurring commission)
- One vertical-specific landing page (e.g., notesly.app/jee, /neet, /cuet)
- Reach out to school WhatsApp groups via creator partnerships

## Month 3: Decision point
- If MRR > ₹50k: keep building, hire a content creator
- If MRR < ₹20k: pivot the positioning, NOT the product (likely a messaging problem)
- If MRR < ₹5k: re-evaluate ICP entirely

## Things to NOT do in v1
- ❌ Mobile native app (PWA is enough)
- ❌ Multi-language UI (Hindi notes work; UI English is fine)
- ❌ Lecture audio recording (different feature, different product)
- ❌ Collaborative notes / sharing (post-PMF)
- ❌ Custom AI tutor chat on top of notes (post-PMF)
- ❌ Real-time class recording mode (different product)
