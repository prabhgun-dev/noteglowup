import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { StarSticker, StarPink, Lightbulb, HeartBubble } from './Stickers';

export function NotesView({ markdown, title, subject }: { markdown: string; title: string; subject?: string }) {
  return (
    <article className="relative bg-cream rounded-2xl border border-ink/10 shadow-paper overflow-hidden">
      {/* Grid paper background */}
      <div className="absolute inset-0 grid-paper pointer-events-none" />

      {/* Decorative doodles scattered like in iPad notes */}
      <Lightbulb className="absolute top-8 left-6 -rotate-12 hidden md:block z-10" size={32} />
      <StarSticker className="absolute top-10 right-10 rotate-12 z-10" size={30} />
      <HeartBubble className="absolute bottom-10 right-8 -rotate-6 hidden md:block z-10" count={1} />
      <StarPink className="absolute bottom-16 left-10 rotate-12 hidden md:block z-10" size={22} />

      <div className="relative z-20 px-8 md:px-16 py-12 md:py-16">
        {/* Title block — big handwritten with sage highlighter strip */}
        <div className="mb-6">
          <h1 className="inline-block">
            <span
              className="font-print text-4xl md:text-6xl leading-[1.1] text-ink"
              style={{
                background: 'linear-gradient(120deg, rgba(200,221,181,0.85) 0%, rgba(200,221,181,0.85) 100%)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 70%',
                backgroundPosition: '0 60%',
                padding: '0.1em 0.3em',
              }}
            >
              {title}
            </span>
          </h1>
        </div>

        {subject && (
          <p
            className="font-hand text-2xl md:text-3xl italic text-ink-soft mb-8 inline-block"
            style={{
              background: 'linear-gradient(120deg, rgba(252,215,87,0.6) 0%, rgba(252,215,87,0.6) 100%)',
              backgroundRepeat: 'no-repeat',
              backgroundSize: '100% 60%',
              backgroundPosition: '0 75%',
              padding: '0 0.3em',
            }}
          >
            {subject.toLowerCase()}
          </p>
        )}

        <div className="prose-notes">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>

      <style>{`
        /* Grid paper — soft graph-paper lines */
        .grid-paper {
          background-image:
            linear-gradient(to right, rgba(26,18,18,0.06) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(26,18,18,0.06) 1px, transparent 1px);
          background-size: 26px 26px;
        }

        .prose-notes {
          color: #1A1212;
          font-family: var(--font-patrick);
          font-size: 19px;
          line-height: 1.65;
        }

        /* H2 — handwritten print on sage highlighter strip, alternating colors */
        .prose-notes h2 {
          font-family: var(--font-print);
          font-size: 1.55rem;
          font-weight: 400;
          letter-spacing: 0.01em;
          color: #1A1212;
          display: inline-block;
          background: linear-gradient(120deg, #C8DDB5 0%, #C8DDB5 100%);
          background-size: 100% 75%;
          background-repeat: no-repeat;
          background-position: 0 70%;
          padding: 0.1em 0.5em;
          margin: 2.2rem 0 0.9rem 0;
        }
        .prose-notes h2:nth-of-type(2n) {
          background: linear-gradient(120deg, #FCD757 0%, #FCD757 100%);
          background-size: 100% 75%;
          background-repeat: no-repeat;
          background-position: 0 70%;
        }
        .prose-notes h2:nth-of-type(3n) {
          background: linear-gradient(120deg, #F4ACB7 0%, #F4ACB7 100%);
          background-size: 100% 75%;
          background-repeat: no-repeat;
          background-position: 0 70%;
        }
        .prose-notes h2:nth-of-type(4n) {
          background: linear-gradient(120deg, #BCDDF0 0%, #BCDDF0 100%);
          background-size: 100% 75%;
          background-repeat: no-repeat;
          background-position: 0 70%;
        }

        /* H3 — cursive script with peach highlighter */
        .prose-notes h3 {
          font-family: var(--font-caveat);
          font-weight: 700;
          font-size: 2rem;
          letter-spacing: 0;
          color: #1A1212;
          display: inline-block;
          background: linear-gradient(120deg, rgba(244,172,183,0.6) 0%, rgba(244,172,183,0.6) 100%);
          background-size: 100% 65%;
          background-repeat: no-repeat;
          background-position: 0 80%;
          padding: 0 0.3em;
          margin: 1.5rem 0 0.5rem 0;
          line-height: 1.05;
        }

        /* Paragraphs */
        .prose-notes p {
          margin: 0.5rem 0 0.85rem 0;
          font-family: var(--font-patrick);
          font-size: 19px;
        }

        /* Bold — candy pink marker highlight on key terms */
        .prose-notes strong {
          color: #1A1212;
          font-weight: 400;
          background: linear-gradient(120deg, rgba(244,172,183,0.7) 0%, rgba(244,172,183,0.7) 100%);
          background-repeat: no-repeat;
          background-size: 100% 50%;
          background-position: 0 75%;
          padding: 0 0.15em;
        }

        /* Italic — sky blue underline highlight */
        .prose-notes em {
          font-style: normal;
          color: #1A1212;
          background: linear-gradient(120deg, rgba(188,221,240,0.6) 0%, rgba(188,221,240,0.6) 100%);
          background-repeat: no-repeat;
          background-size: 100% 50%;
          background-position: 0 75%;
          padding: 0 0.15em;
        }

        /* Inline code — sage green pill, definition style */
        .prose-notes code {
          background: #DCEACE;
          color: #1A1212;
          padding: 0.1em 0.45em;
          border-radius: 4px;
          font-family: var(--font-patrick);
          font-size: 0.9em;
          border: 1px solid rgba(26,18,18,0.12);
        }

        /* Bullet lists */
        .prose-notes ul {
          list-style: none;
          padding-left: 0;
          margin: 0.5rem 0 0.85rem 0;
        }
        .prose-notes ul li {
          position: relative;
          padding-left: 1.5rem;
          margin: 0.35rem 0;
          font-family: var(--font-patrick);
          font-size: 19px;
        }
        .prose-notes ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.7rem;
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #F4ACB7;
          box-shadow: 1px 1px 0 rgba(0,0,0,0.1);
        }

        /* Numbered lists — yellow circles like the reference */
        .prose-notes ol {
          counter-reset: item;
          list-style: none;
          padding-left: 0;
          margin: 0.7rem 0;
        }
        .prose-notes ol li {
          counter-increment: item;
          position: relative;
          padding-left: 2.6rem;
          margin: 0.6rem 0;
          font-family: var(--font-patrick);
          font-size: 19px;
          min-height: 2rem;
        }
        .prose-notes ol li::before {
          content: counter(item);
          position: absolute;
          left: 0;
          top: -0.05rem;
          width: 2rem;
          height: 2rem;
          background: #FCD757;
          border: 1.5px solid #1A1212;
          border-radius: 50%;
          font-family: var(--font-print);
          font-size: 1.05rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1212;
          box-shadow: 1px 1.5px 0 rgba(0,0,0,0.12);
        }

        /* Blockquote — hand-drawn sticky callout */
        .prose-notes blockquote {
          background: #FFE89C;
          border: 2px dashed #1A1212;
          border-radius: 6px;
          padding: 0.9rem 1.1rem;
          margin: 1.3rem 0;
          font-family: var(--font-patrick);
          font-size: 18px;
          color: #1A1212;
          position: relative;
          transform: rotate(-0.6deg);
          box-shadow: 2px 3px 0 rgba(0,0,0,0.1);
        }
        .prose-notes blockquote::before {
          content: '💡';
          position: absolute;
          top: -0.7rem;
          left: 0.8rem;
          font-size: 1.2rem;
          background: #FFFBF2;
          padding: 0 0.3rem;
        }
        .prose-notes blockquote p {
          margin: 0;
        }

        /* Dashed divider like the reference */
        .prose-notes hr {
          border: 0;
          border-top: 2px dashed rgba(26,18,18,0.25);
          margin: 1.6rem 0;
        }

        /* Tables — hand-drawn feel */
        .prose-notes table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 1.2rem 0;
          font-size: 17px;
          border: 2px solid #1A1212;
          border-radius: 4px;
          overflow: hidden;
          box-shadow: 2px 3px 0 rgba(0,0,0,0.1);
          background: #FFFBF2;
        }
        .prose-notes th {
          background: #C8DDB5;
          font-family: var(--font-print);
          font-size: 1rem;
          letter-spacing: 0.02em;
          padding: 0.55rem 0.85rem;
          text-align: left;
          border-bottom: 2px solid #1A1212;
          color: #1A1212;
        }
        .prose-notes td {
          padding: 0.5rem 0.85rem;
          border-bottom: 1px solid rgba(26,18,18,0.12);
          font-family: var(--font-patrick);
          font-size: 17px;
        }
        .prose-notes tr:last-child td { border-bottom: none; }
        .prose-notes tr:nth-child(even) td { background: rgba(247,202,201,0.18); }

        /* Links */
        .prose-notes a {
          color: #1A1212;
          background-image: linear-gradient(transparent 60%, #BCDDF0 60%);
          padding: 0 0.1em;
        }
      `}</style>
    </article>
  );
}
