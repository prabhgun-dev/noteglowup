# Tech Stack

## Required API keys (3 total for MVP)

### 1. Anthropic API
- **What it does:** Vision + OCR + structuring + flashcard generation in one call
- **Model:** Claude Haiku 4.5 (cheap, fast, vision-capable, great structured output)
- **Sign up:** console.anthropic.com
- **Fallback if needed:** OpenAI GPT-4o or Gemini 2.0 Flash
- **Notes:** Use prompt caching for the system prompt (drops input cost ~80%)

### 2. Supabase
- **What it does:** Auth + Postgres + file storage (one project, three keys)
- **Keys needed:** project URL, anon key, service role key
- **Sign up:** supabase.com
- **Free tier:** generous — won't pay until real traction

### 3. Razorpay (India) or Stripe (global)
- **What it does:** Payments + subscriptions
- **For India:** Razorpay — supports UPI, cards, wallets, recurring
- **For global:** Stripe (note: Indian recurring on Stripe is limited)
- **Sign up:** razorpay.com (needs business KYC — sole prop works)

## Optional / later
- **Mathpix** — only if heavy STEM/math equations (JEE/NEET notes). ~$0.005/image. Skip for v1.
- **Resend / Postmark** — transactional email. Free tier on Resend.
- **Cloudflare R2 / AWS S3** — only if outgrow Supabase storage.

## No API key needed
- **Anki export** → `genanki` Python library (free)
- **PDF export** → Puppeteer or react-pdf
- **Aesthetic rendering** → CSS + Google Fonts (Caveat, Patrick Hand, etc.)
- **Quizlet export** → generate CSV

## Recommended stack
- **Frontend:** Next.js 14+ (App Router) on Vercel free tier
- **Backend:** Next.js API routes (one repo, no separate server)
- **DB + Auth + Storage:** Supabase
- **AI:** Anthropic Claude Haiku 4.5 (vision)
- **Payments:** Razorpay
- **Anki export:** `genanki` in a Python serverless function (or Node equivalent)
- **Image preprocessing:** Sharp (resize to 1568px before sending to API)

## Architecture sketch
```
User photo upload
    ↓
Supabase Storage (raw image)
    ↓
Next.js API route: /api/convert
    ↓ (Sharp: resize to 1568px)
Anthropic Claude (vision call)
    ↓ returns structured JSON
        {
          notes: "markdown formatted",
          flashcards: [{front, back}, ...]
        }
    ↓
Render in browser (notes view + flashcard view)
    ↓
Export options: PDF / Anki .apkg / Quizlet CSV
```

## Key implementation notes
- **Resize images before sending** — phone photos are 4032×3024, send 1568px max edge. Same OCR quality, 60%+ fewer tokens.
- **Cache system prompt** with Anthropic prompt caching (`cache_control: ephemeral`).
- **Return structured JSON** — use Anthropic's tool use / structured output for the flashcard schema.
- **Process pages in parallel** for multi-page uploads (not sequentially).
