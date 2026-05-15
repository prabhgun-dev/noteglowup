# Token Economics

## Token counts per conversion

| Input type | Tokens |
|---|---|
| 1 page typed text (~250 words) | ~350 |
| 1 phone photo (resized 1568px) — Claude | ~1,500 |
| 1 phone photo — GPT-4o (high detail) | ~1,100 |
| 1 phone photo — Gemini Flash | ~260 |
| Prompt template (instructions) | ~300 |
| Output: structured notes + 20 flashcards | ~1,000 |

## Total per conversion (input + output)

| Scenario | Input | Output | Total |
|---|---|---|---|
| 1 typed page → notes + cards | ~650 | ~1,000 | ~1,650 |
| 1 handwritten photo → notes + cards | ~1,800 | ~1,000 | ~2,800 |
| 5-page handwritten upload | ~7,800 | ~4,000 | ~11,800 |
| 5-page typed input | ~1,500 | ~4,000 | ~5,500 |

**Key insight:** image inputs cost ~3-5x more input tokens than typed text, but total cost is only ~30-50% higher because output dominates cost.

## Approximate cost per conversion (Claude Haiku 4.5)

> Verify current pricing at anthropic.com/pricing — pricing changes.

| Scenario | USD | INR |
|---|---|---|
| 1 typed page | ~$0.005 | ~₹0.40 |
| 1 handwritten photo | ~$0.007 | ~₹0.55 |
| 5-page handwritten upload | ~$0.03 | ~₹2.50 |

## Margin math at ₹399/mo

| User type | Conversions/mo | Cost | Margin |
|---|---|---|---|
| Light (avg) | 30 photos | ~₹16 | 96% |
| Medium | 100 photos | ~₹55 | 86% |
| Heavy | 200 photos | ~₹110 | 72% |
| Power user | 500 photos | ~₹275 | 31% |

## Cost optimization levers
1. **Resize images to 1568px** before sending → 40% fewer input tokens
2. **Prompt caching** on system prompt → ~80% reduction on input cost after first call
3. **Haiku 4.5 not Sonnet** → 5x cheaper, identical quality for OCR/structuring
4. **Cap free tier at 10 conversions/mo** — anyone using more is a paid user anyway
5. **Switch to Gemini Flash if margins tighten** — vision tokens 5x cheaper than Claude, but JSON output is weaker
6. **Soft-cap paid tier at 200/mo** OR offer ₹799/mo "unlimited" tier for power users

## When to consider switching models
- Quality complaints on messy handwriting → upgrade to Sonnet for ₹0.05/conversion (still 90% margin)
- Cost crunch at scale → Gemini Flash for ₹0.10 total
- Math/STEM-specific tier → add Mathpix preprocessing layer for ₹0.40/equation
