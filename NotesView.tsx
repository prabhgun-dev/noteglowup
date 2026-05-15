import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export function NotesView({ markdown, title, subject }: { markdown: string; title: string; subject?: string }) {
  return (
    <article className="paper-card p-8 md:p-12">
      <div className="flex items-center gap-2 mb-3">
        <span className="h-2 w-2 rounded-full bg-coral-300" />
        {subject && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink-faint">{subject}</span>
        )}
      </div>
      <h1 className="font-serif text-3xl md:text-4xl tracking-tight leading-tight mb-6">
        <span className="highlight">{title}</span>
      </h1>
      <div className="prose-notes">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
      </div>
      <style>{`
        .prose-notes { color: #3A332B; line-height: 1.7; font-size: 16px; }
        .prose-notes h1, .prose-notes h2, .prose-notes h3 { font-family: var(--font-fraunces); color: #1F1B16; letter-spacing: -0.01em; }
        .prose-notes h1 { font-size: 1.875rem; margin-top: 2rem; margin-bottom: 0.75rem; }
        .prose-notes h2 { font-size: 1.5rem; margin-top: 1.75rem; margin-bottom: 0.6rem; }
        .prose-notes h3 { font-size: 1.2rem; margin-top: 1.25rem; margin-bottom: 0.4rem; }
        .prose-notes p { margin: 0.6rem 0; }
        .prose-notes ul { list-style: none; padding-left: 0; margin: 0.6rem 0; }
        .prose-notes ul li { position: relative; padding-left: 1.25rem; margin: 0.35rem 0; }
        .prose-notes ul li::before { content: ''; position: absolute; left: 0; top: 0.65rem; width: 6px; height: 6px; border-radius: 50%; background: #E69478; }
        .prose-notes ol { padding-left: 1.25rem; margin: 0.6rem 0; }
        .prose-notes ol li { margin: 0.35rem 0; }
        .prose-notes strong { color: #1F1B16; font-weight: 600; background: linear-gradient(120deg, rgba(247,217,206,0.55) 0%, rgba(247,217,206,0.55) 100%); background-repeat: no-repeat; background-size: 100% 38%; background-position: 0 85%; padding: 0 0.1em; }
        .prose-notes em { color: #4D6040; }
        .prose-notes code { background: #F2EBDC; padding: 0.1em 0.4em; border-radius: 4px; font-size: 0.9em; }
        .prose-notes blockquote { border-left: 3px solid #E69478; padding-left: 1rem; color: #6B6258; font-style: italic; margin: 1rem 0; }
        .prose-notes hr { border: 0; border-top: 1px dashed #E8DFC9; margin: 1.5rem 0; }
        .prose-notes table { width: 100%; border-collapse: collapse; margin: 1rem 0; font-size: 0.95em; }
        .prose-notes th, .prose-notes td { border: 1px solid #E8DFC9; padding: 0.5rem 0.75rem; text-align: left; }
        .prose-notes th { background: #FAF6EE; font-weight: 600; }
      `}</style>
    </article>
  );
}
