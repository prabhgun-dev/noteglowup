import { NextResponse } from 'next/server';
import { marked } from 'marked';
import { z } from 'zod';

export const runtime = 'nodejs';

const Body = z.object({
  title: z.string().min(1),
  subject: z.string().optional(),
  notesMarkdown: z.string().min(1),
});

export async function POST(req: Request) {
  const json = await req.json().catch(() => null);
  const parsed = Body.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }
  const { title, subject, notesMarkdown } = parsed.data;

  marked.setOptions({ gfm: true, breaks: false });
  const bodyHtml = await marked.parse(notesMarkdown);

  const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${esc(title)} — Notesly</title>
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Patrick+Hand&family=Caveat:wght@400;700&family=Bungee&family=Anton&family=Special+Elite&display=swap" rel="stylesheet" />
<style>
${INLINE_CSS}
</style>
</head>
<body>
  <article class="page">
    <div class="grid-bg"></div>
    <div class="content">
      <h1 class="doc-title"><span>${esc(title)}</span></h1>
      ${subject ? `<p class="doc-subject"><span>${esc(subject.toLowerCase())}</span></p>` : ''}
      <div class="notes">${bodyHtml}</div>
    </div>
    <footer class="doc-footer">
      <span>made with notesly · noteglowup.vercel.app</span>
    </footer>
  </article>
  <div class="actions no-print">
    <button onclick="window.print()" class="btn">Print / Save as PDF</button>
    <p class="hint">Tip: in the print dialog choose <strong>Save as PDF</strong> for a clean searchable file.</p>
  </div>
</body>
</html>`;

  return new NextResponse(page, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Content-Disposition': `attachment; filename="${slug(title)}.html"`,
    },
  });
}

function esc(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40) || 'notesly';
}

const INLINE_CSS = `
* { box-sizing: border-box; }
html, body {
  margin: 0;
  padding: 0;
  background: #EDCDC2;
  font-family: 'Patrick Hand', 'Comic Sans MS', cursive;
  color: #1A1212;
}
.page {
  position: relative;
  background: #FFFBF2;
  max-width: 880px;
  margin: 40px auto;
  padding: 60px 70px 70px;
  border-radius: 18px;
  box-shadow: 0 1px 2px rgba(26,18,18,0.06), 0 24px 60px -20px rgba(26,18,18,0.25);
  border: 1px solid rgba(26,18,18,0.08);
  overflow: hidden;
}
.grid-bg {
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(to right, rgba(26,18,18,0.06) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(26,18,18,0.06) 1px, transparent 1px);
  background-size: 26px 26px;
  pointer-events: none;
}
.content { position: relative; z-index: 1; }

.doc-title { margin: 0 0 12px; line-height: 1.05; }
.doc-title span {
  display: inline-block;
  font-family: 'Patrick Hand', cursive;
  font-size: 56px;
  background: #C8DDB5;
  background-size: 100% 70%;
  background-repeat: no-repeat;
  background-position: 0 60%;
  padding: 0.05em 0.3em;
}
.doc-subject { margin: 0 0 36px; }
.doc-subject span {
  display: inline-block;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-style: italic;
  font-size: 28px;
  background: rgba(252,215,87,0.6);
  background-repeat: no-repeat;
  background-size: 100% 60%;
  background-position: 0 75%;
  padding: 0 0.3em;
}

.notes { font-family: 'Patrick Hand', 'Comic Sans MS', cursive; font-size: 19px; line-height: 1.65; }

.notes h2 {
  font-family: 'Patrick Hand', cursive;
  font-size: 26px;
  font-weight: 400;
  display: inline-block;
  background: #C8DDB5;
  background-size: 100% 75%;
  background-repeat: no-repeat;
  background-position: 0 70%;
  padding: 0.1em 0.5em;
  margin: 36px 0 14px;
  border-radius: 2px;
}
.notes h2:nth-of-type(2n) { background: #FCD757; background-size: 100% 75%; background-repeat: no-repeat; background-position: 0 70%; }
.notes h2:nth-of-type(3n) { background: #F4ACB7; background-size: 100% 75%; background-repeat: no-repeat; background-position: 0 70%; }
.notes h2:nth-of-type(4n) { background: #BCDDF0; background-size: 100% 75%; background-repeat: no-repeat; background-position: 0 70%; }

.notes h3 {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 30px;
  display: inline-block;
  background: rgba(244,172,183,0.6);
  background-size: 100% 65%;
  background-repeat: no-repeat;
  background-position: 0 80%;
  padding: 0 0.3em;
  margin: 24px 0 8px;
  line-height: 1.05;
}

.notes p { margin: 8px 0 14px; }

.notes strong {
  font-weight: 400;
  background: rgba(244,172,183,0.7);
  background-repeat: no-repeat;
  background-size: 100% 50%;
  background-position: 0 75%;
  padding: 0 0.15em;
}
.notes em {
  font-style: normal;
  background: rgba(188,221,240,0.6);
  background-repeat: no-repeat;
  background-size: 100% 50%;
  background-position: 0 75%;
  padding: 0 0.15em;
}
.notes code {
  background: #DCEACE;
  padding: 0.1em 0.45em;
  border-radius: 4px;
  font-family: 'Patrick Hand', cursive;
  font-size: 0.92em;
  border: 1px solid rgba(26,18,18,0.12);
}

.notes ul { list-style: none; padding-left: 0; margin: 8px 0 14px; }
.notes ul li { position: relative; padding-left: 24px; margin: 6px 0; }
.notes ul li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 11px;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #F4ACB7;
  box-shadow: 1px 1px 0 rgba(0,0,0,0.1);
}

.notes ol { counter-reset: item; list-style: none; padding-left: 0; margin: 12px 0; }
.notes ol li { counter-increment: item; position: relative; padding-left: 44px; margin: 10px 0; min-height: 34px; }
.notes ol li::before {
  content: counter(item);
  position: absolute;
  left: 0;
  top: -1px;
  width: 32px;
  height: 32px;
  background: #FCD757;
  border: 1.5px solid #1A1212;
  border-radius: 50%;
  font-family: 'Patrick Hand', cursive;
  font-size: 17px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 1px 1.5px 0 rgba(0,0,0,0.12);
}

.notes blockquote {
  background: #FFE89C;
  border: 2px dashed #1A1212;
  border-radius: 8px;
  padding: 14px 18px;
  margin: 22px 0;
  font-family: 'Patrick Hand', cursive;
  font-size: 18px;
  position: relative;
  transform: rotate(-0.6deg);
  box-shadow: 2px 3px 0 rgba(0,0,0,0.1);
}
.notes blockquote::before {
  content: '💡';
  position: absolute;
  top: -12px;
  left: 14px;
  font-size: 19px;
  background: #FFFBF2;
  padding: 0 5px;
}
.notes blockquote p { margin: 0; }

.notes hr { border: 0; border-top: 2px dashed rgba(26,18,18,0.25); margin: 28px 0; }

.notes table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  margin: 20px 0;
  font-size: 17px;
  border: 2px solid #1A1212;
  border-radius: 4px;
  overflow: hidden;
  box-shadow: 2px 3px 0 rgba(0,0,0,0.1);
  background: #FFFBF2;
}
.notes th {
  background: #C8DDB5;
  font-family: 'Patrick Hand', cursive;
  font-size: 16px;
  letter-spacing: 0.02em;
  padding: 10px 14px;
  text-align: left;
  border-bottom: 2px solid #1A1212;
}
.notes td {
  padding: 8px 14px;
  border-bottom: 1px solid rgba(26,18,18,0.12);
  font-family: 'Patrick Hand', cursive;
}
.notes tr:last-child td { border-bottom: none; }
.notes tr:nth-child(even) td { background: rgba(247,202,201,0.18); }

.notes a { color: #1A1212; background-image: linear-gradient(transparent 60%, #BCDDF0 60%); padding: 0 0.1em; }

.doc-footer {
  position: relative;
  z-index: 1;
  margin-top: 56px;
  padding-top: 14px;
  border-top: 1px dashed rgba(26,18,18,0.18);
  font-family: 'Special Elite', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(26,18,18,0.5);
  text-align: center;
}

.actions {
  text-align: center;
  margin: 24px auto 60px;
}
.btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 28px;
  border-radius: 999px;
  background: #FCD757;
  border: 1.5px solid #1A1212;
  font-family: 'Bungee', sans-serif;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  box-shadow: 1px 2px 0 rgba(0,0,0,0.12);
}
.btn:hover { transform: translateY(-1px); }
.hint {
  font-family: 'Special Elite', monospace;
  font-size: 12px;
  color: rgba(26,18,18,0.6);
  margin: 14px auto 0;
}

@media print {
  body { background: white; }
  .no-print { display: none !important; }
  .page {
    margin: 0;
    padding: 24px 30px;
    box-shadow: none;
    border: none;
    border-radius: 0;
    max-width: none;
  }
  .doc-footer { border-top: 1px dashed rgba(26,18,18,0.3); }
  @page { margin: 12mm; size: A4; }
}
`;
