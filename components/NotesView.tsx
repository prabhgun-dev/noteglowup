import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Patrick_Hand, Caveat } from 'next/font/google';
import { StarSticker, StarPink, Lightbulb, HeartBubble, Pushpin } from './Stickers';

// Direct font load — guarantees Patrick Hand and Caveat are bundled with this component
const handwriting = Patrick_Hand({ subsets: ['latin'], weight: '400' });
const cursive = Caveat({ subsets: ['latin'], weight: ['400', '700'] });

export function NotesView({ markdown, title, subject }: { markdown: string; title: string; subject?: string }) {
  return (
    <article className={`relative bg-cream rounded-2xl border border-ink/10 shadow-paper overflow-hidden ${handwriting.className}`}>
      {/* Dotted notebook paper background */}
      <div className="absolute inset-0 dot-paper pointer-events-none" />

      {/* Scattered doodles */}
      <Lightbulb className="absolute top-10 left-8 -rotate-12 hidden md:block z-10" size={36} />
      <StarSticker className="absolute top-12 right-12 rotate-12 z-10" size={34} />
      <Pushpin className="absolute top-1/3 right-6 -rotate-6 hidden lg:block z-10" size={28} />
      <HeartBubble className="absolute bottom-14 right-10 -rotate-6 hidden md:block z-10" count={1} />
      <StarPink className="absolute bottom-20 left-12 rotate-12 hidden md:block z-10" size={26} />

      <div className="relative z-20 px-8 md:px-16 lg:px-24 py-14 md:py-20">
        {/* Title block — huge marker title on sage strip */}
        <header className="mb-12 md:mb-16">
          <h1 className="inline-block">
            <span
              className={`${handwriting.className} text-5xl md:text-7xl lg:text-8xl leading-[1.02] text-ink`}
              style={{
                background: 'linear-gradient(120deg, rgba(200,221,181,0.85) 0%, rgba(200,221,181,0.85) 100%)',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100% 68%',
                backgroundPosition: '0 62%',
                padding: '0.08em 0.35em',
                letterSpacing: '0.005em',
              }}
            >
              {title}
            </span>
          </h1>
          {subject && (
            <p className="mt-5">
              <span
                className={`${cursive.className} text-3xl md:text-4xl italic text-ink-soft inline-block`}
                style={{
                  background: 'linear-gradient(120deg, rgba(252,215,87,0.65) 0%, rgba(252,215,87,0.65) 100%)',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100% 55%',
                  backgroundPosition: '0 78%',
                  padding: '0 0.32em',
                  fontWeight: 700,
                  transform: 'rotate(-1.2deg)',
                  transformOrigin: 'left center',
                }}
              >
                {subject.toLowerCase()}
              </span>
            </p>
          )}
        </header>

        <div className="prose-notes">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>

      <style>{`
        /* Dotted notebook paper */
        .dot-paper {
          background-image: radial-gradient(rgba(26,18,18,0.13) 1px, transparent 1.2px);
          background-size: 22px 22px;
        }

        .prose-notes {
          color: #1A1212;
          font-size: 19px;
          line-height: 1.7;
        }

        /* MAGAZINE 2-COLUMN FLOW (desktop) */
        @media (min-width: 900px) {
          .prose-notes {
            column-count: 2;
            column-gap: 56px;
            column-rule: 1px dashed rgba(26,18,18,0.12);
          }
        }

        /* Full-width breakers — these span both columns */
        .prose-notes h2,
        .prose-notes hr,
        .prose-notes table,
        .prose-notes blockquote {
          column-span: all;
          -webkit-column-span: all;
        }

        /* Keep sub-blocks intact across column breaks */
        .prose-notes h3,
        .prose-notes ul,
        .prose-notes ol,
        .prose-notes p {
          break-inside: avoid;
          page-break-inside: avoid;
        }

        /* H2 — handwritten print on rotating colored highlighter strips */
        .prose-notes h2 {
          font-family: ${handwriting.style.fontFamily};
          font-size: 32px;
          font-weight: 400;
          letter-spacing: 0.01em;
          color: #1A1212;
          display: inline-block;
          background: #C8DDB5;
          background-size: 100% 72%;
          background-repeat: no-repeat;
          background-position: 0 68%;
          padding: 0.1em 0.55em;
          margin: 56px 0 22px 0;
          border-radius: 3px;
          transform: rotate(-0.5deg);
          transform-origin: left center;
        }
        .prose-notes h2:nth-of-type(2n) {
          background: #FCD757;
          background-size: 100% 72%;
          background-repeat: no-repeat;
          background-position: 0 68%;
          transform: rotate(0.4deg);
        }
        .prose-notes h2:nth-of-type(3n) {
          background: #F4ACB7;
          background-size: 100% 72%;
          background-repeat: no-repeat;
          background-position: 0 68%;
          transform: rotate(-0.7deg);
        }
        .prose-notes h2:nth-of-type(4n) {
          background: #BCDDF0;
          background-size: 100% 72%;
          background-repeat: no-repeat;
          background-position: 0 68%;
          transform: rotate(0.6deg);
        }

        /* H3 — big cursive script with peach highlighter */
        .prose-notes h3 {
          font-family: ${cursive.style.fontFamily};
          font-weight: 700;
          font-size: 36px;
          letter-spacing: 0;
          color: #1A1212;
          display: inline-block;
          background: linear-gradient(120deg, rgba(244,172,183,0.55) 0%, rgba(244,172,183,0.55) 100%);
          background-size: 100% 60%;
          background-repeat: no-repeat;
          background-position: 0 80%;
          padding: 0 0.32em;
          margin: 24px 0 8px 0;
          line-height: 1.0;
        }

        /* Paragraphs — generous spacing */
        .prose-notes p {
          margin: 6px 0 14px 0;
          font-size: 19px;
        }

        /* Bold — candy pink marker swipe */
        .prose-notes strong {
          color: #1A1212;
          font-weight: 400;
          background: linear-gradient(120deg, rgba(244,172,183,0.7) 0%, rgba(244,172,183,0.7) 100%);
          background-repeat: no-repeat;
          background-size: 100% 50%;
          background-position: 0 75%;
          padding: 0 0.15em;
        }

        /* Italic — sky blue */
        .prose-notes em {
          font-style: normal;
          color: #1A1212;
          background: linear-gradient(120deg, rgba(188,221,240,0.6) 0%, rgba(188,221,240,0.6) 100%);
          background-repeat: no-repeat;
          background-size: 100% 50%;
          background-position: 0 75%;
          padding: 0 0.15em;
        }

        /* Inline code — sage pill */
        .prose-notes code {
          background: #DCEACE;
          color: #1A1212;
          padding: 0.1em 0.5em;
          border-radius: 5px;
          font-family: ${handwriting.style.fontFamily};
          font-size: 0.92em;
          border: 1px solid rgba(26,18,18,0.12);
        }

        /* Bullet lists */
        .prose-notes ul {
          list-style: none;
          padding-left: 0;
          margin: 8px 0 18px 0;
        }
        .prose-notes ul li {
          position: relative;
          padding-left: 22px;
          margin: 6px 0;
          font-size: 19px;
        }
        .prose-notes ul li::before {
          content: '';
          position: absolute;
          left: 0;
          top: 11px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #F4ACB7;
          box-shadow: 1px 1px 0 rgba(0,0,0,0.1);
        }

        /* Numbered lists — yellow circles */
        .prose-notes ol {
          counter-reset: item;
          list-style: none;
          padding-left: 0;
          margin: 12px 0 18px 0;
        }
        .prose-notes ol li {
          counter-increment: item;
          position: relative;
          padding-left: 44px;
          margin: 10px 0;
          font-size: 19px;
          min-height: 36px;
        }
        .prose-notes ol li::before {
          content: counter(item);
          position: absolute;
          left: 0;
          top: -1px;
          width: 32px;
          height: 32px;
          background: #FCD757;
          border: 1.5px solid #1A1212;
          border-radius: 50%;
          font-family: ${handwriting.style.fontFamily};
          font-size: 17px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #1A1212;
          box-shadow: 1px 2px 0 rgba(0,0,0,0.12);
        }

        /* Blockquote — sticky note callout, FULL-WIDTH break */
        .prose-notes blockquote {
          background: #FFE89C;
          border: 2px dashed #1A1212;
          border-radius: 10px;
          padding: 18px 22px;
          margin: 28px 0;
          font-family: ${handwriting.style.fontFamily};
          font-size: 19px;
          color: #1A1212;
          position: relative;
          transform: rotate(-0.4deg);
          box-shadow: 2px 4px 0 rgba(0,0,0,0.1);
        }
        .prose-notes blockquote::before {
          content: '💡';
          position: absolute;
          top: -14px;
          left: 16px;
          font-size: 22px;
          background: #FFFBF2;
          padding: 0 6px;
        }
        .prose-notes blockquote p { margin: 0; }

        /* Dashed divider */
        .prose-notes hr {
          border: 0;
          border-top: 2px dashed rgba(26,18,18,0.28);
          margin: 36px 0 28px 0;
        }

        /* Tables — hand-drawn full-width */
        .prose-notes table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 24px 0;
          font-size: 17px;
          border: 2px solid #1A1212;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 2px 4px 0 rgba(0,0,0,0.1);
          background: #FFFBF2;
        }
        .prose-notes th {
          background: #C8DDB5;
          font-family: ${handwriting.style.fontFamily};
          font-size: 17px;
          letter-spacing: 0.02em;
          padding: 12px 16px;
          text-align: left;
          border-bottom: 2px solid #1A1212;
          color: #1A1212;
        }
        .prose-notes td {
          padding: 10px 16px;
          border-bottom: 1px solid rgba(26,18,18,0.12);
          font-family: ${handwriting.style.fontFamily};
        }
        .prose-notes tr:last-child td { border-bottom: none; }
        .prose-notes tr:nth-child(even) td { background: rgba(247,202,201,0.18); }

        .prose-notes a {
          color: #1A1212;
          background-image: linear-gradient(transparent 60%, #BCDDF0 60%);
          padding: 0 0.1em;
        }
      `}</style>
    </article>
  );
}
