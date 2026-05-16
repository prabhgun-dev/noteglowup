import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { StarSticker, StarPink, Lightbulb, MemoryTicket } from './Stickers';

export function NotesView({ markdown, title, subject }: { markdown: string; title: string; subject?: string }) {
  return (
    <article className="paper-card relative p-8 md:p-14 overflow-hidden">
      {/* Decorative stickers */}
      <StarSticker className="absolute top-6 right-8 -rotate-12" size={28} />
      <StarPink className="absolute bottom-12 right-6 rotate-12 hidden md:block" size={20} />
      <Lightbulb className="absolute bottom-6 left-6 -rotate-6 hidden md:block" size={26} />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {subject && <MemoryTicket label={subject.toLowerCase()} />}
      </div>

      <h1 className="font-hand text-5xl md:text-6xl leading-[1.05] mb-3 text-ink">
        {title}
      </h1>
      <div className="h-1.5 w-32 bg-genz rounded-full mb-8" />

      <div className="prose-notes relative z-10">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>

      <style>{`
        .prose-notes { color: #2E2222; line-height: 1.7; font-size: 16px; }

        /* H2 — sage highlighter strip, alternating colors */
        .prose-notes h2 {
          font-family: var(--font-bungee);
          font-size: 1.05rem;
          text-transform: uppercase;
          letter-spacing: 0.04em;
          color: #1A1212;
          display: inline-block;
          background: linear-gradient(120deg, #C8DDB5 0%, #C8DDB5 100%);
          background-size: 100% 78%;
          background-repeat: no-repeat;
          background-position: 0 center;
          padding: 0.25em 0.7em;
          margin: 2.2rem 0 1rem 0;
          border-radius: 3px;
          box-shadow: 1px 1px 0 rgba(0,0,0,0.06);
        }
        .prose-notes h2:nth-of-type(2n) {
          background: linear-gradient(120deg, #FCD757 0%, #FCD757 100%);
          background-size: 100% 78%;
          background-repeat: no-repeat;
          background-position: 0 center;
        }
        .prose-notes h2:nth-of-type(3n) {
          background: linear-gradient(120deg, #F4ACB7 0%, #F4ACB7 100%);
          background-size: 100% 78%;
          background-repeat: no-repeat;
          background-position: 0 center;
        }
        .prose-notes h2:nth-of-type(4n) {
          background: linear-gradient(120deg, #BCDDF0 0%, #BCDDF0 100%);
          background-size: 100% 78%;
          background-repeat: no-repeat;
          background-position: 0 center;
        }

        /* H3 — yellow highlighter, smaller */
        .prose-notes h3 {
          font-family: var(--font-anton);
          font-size: 1.05rem;
          text-transform: uppercase;
          letter-spacing: 0.02em;
          color: #1A1212;
          display: inline-block;
          background: linear-gradient(120deg, rgba(252,215,87,0.85) 0%, rgba(252,215,87,0.85) 100%);
          background-size: 100% 70%;
          background-repeat: no-repeat;
          background-position: 0 center;
          padding: 0.15em 0.55em;
          margin: 1.3rem 0 0.6rem 0;
          border-radius: 2px;
        }

        /* Paragraphs */
        .prose-notes p {
          margin: 0.5rem 0 0.7rem 0;
          font-family: var(--font-fraunces);
          font-size: 16.5px;
        }

        /* Bold — candy pink marker highlight */
        .prose-notes strong {
          color: #1A1212;
          font-weight: 600;
          background: linear-gradient(120deg, rgba(244,172,183,0.7) 0%, rgba(244,172,183,0.7) 100%);
          background-repeat: no-repeat;
          background-size: 100% 38%;
          background-position: 0 85%;
          padding: 0 0.12em;
        }

        /* Italic — sky blue subtle highlight */
        .prose-notes em {
          font-style: italic;
          color: #1A1212;
          background: linear-gradient(120deg, rgba(188,221,240,0.55) 0%, rgba(188,221,240,0.55) 100%);
          background-repeat: no-repeat;
          background-size: 100% 38%;
          background-position: 0 85%;
          padding: 0 0.12em;
        }

        /* Inline code — pastel pink box, definition style */
        .prose-notes code {
          background: #FCE1E0;
          color: #1A1212;
          padding: 0.12em 0.45em;
          border-radius: 4px;
          font-family: var(--font-elite);
          font-size: 0.85em;
          border: 1px solid rgba(26,18,18,0.08);
        }

        /* Lists — pink bullet dots */
        .prose-notes ul {
          list-style: none;
          padding-left: 0;
          margin: 0.6rem 0;
        }
        .prose-notes ul li {
          position: relative;
          padding-left: 1.4rem;
          margin: 0.4rem 0;
          font-family: var(--font-fraunces);
          font-size: 16px;
        }
        .prose-notes ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0.7rem;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #F4ACB7;
          box-shadow: 1px 1px 0 rgba(0,0,0,0.08);
        }

        /* Numbered lists — bold yellow circle markers */
        .prose-notes ol {
          counter-reset: item;
          list-style: none;
          padding-left: 0;
          margin: 0.7rem 0;
        }
        .prose-notes ol li {
          counter-increment: item;
          position: relative;
          padding-left: 2.4rem;
          margin: 0.6rem 0;
          font-family: var(--font-fraunces);
          font-size: 16px;
          min-height: 1.8rem;
        }
        .prose-notes ol li::before {
          content: counter(item);
          position: absolute;
          left: 0;
          top: 0;
          width: 1.8rem;
          height: 1.8rem;
          background: #FCD757;
          border: 1.5px solid #1A1212;
          border-radius: 50%;
          font-family: var(--font-bungee);
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1212;
          box-shadow: 1px 1px 0 rgba(0,0,0,0.12);
        }

        /* Blockquote — sticky note callout */
        .prose-notes blockquote {
          background: #FFE89C;
          border: 2px dashed #1A1212;
          border-radius: 8px;
          padding: 0.9rem 1.1rem;
          margin: 1.3rem 0;
          font-family: var(--font-elite);
          font-size: 0.95rem;
          color: #1A1212;
          position: relative;
          transform: rotate(-0.5deg);
          box-shadow: 2px 3px 0 rgba(0,0,0,0.08);
        }
        .prose-notes blockquote::before {
          content: '💡';
          position: absolute;
          top: -0.6rem;
          left: 0.8rem;
          font-size: 1.1rem;
          background: #FFFBF2;
          padding: 0 0.3rem;
        }
        .prose-notes blockquote p {
          margin: 0;
          font-family: var(--font-elite);
        }

        /* Horizontal rule — pastel divider */
        .prose-notes hr {
          border: 0;
          height: 4px;
          background: linear-gradient(90deg, #F4ACB7 0%, #FCD757 33%, #C8DDB5 66%, #BCDDF0 100%);
          border-radius: 2px;
          margin: 1.8rem 0;
          opacity: 0.7;
        }

        /* Tables — clean with rose header */
        .prose-notes table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 1.2rem 0;
          font-size: 0.95em;
          border: 1.5px solid #1A1212;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 2px 3px 0 rgba(0,0,0,0.08);
        }
        .prose-notes th {
          background: #C8DDB5;
          font-family: var(--font-bungee);
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          padding: 0.6rem 0.85rem;
          text-align: left;
          border-bottom: 1.5px solid #1A1212;
          color: #1A1212;
        }
        .prose-notes td {
          padding: 0.55rem 0.85rem;
          border-bottom: 1px solid rgba(26,18,18,0.10);
          font-family: var(--font-fraunces);
          font-size: 14.5px;
        }
        .prose-notes tr:last-child td {
          border-bottom: none;
        }
        .prose-notes tr:nth-child(even) td {
          background: rgba(247,202,201,0.18);
        }

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
