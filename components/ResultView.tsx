'use client';

import { useState } from 'react';
import { FileText, Layers, ArrowLeft } from 'lucide-react';
import type { ConvertResponse } from '@/lib/types';
import { NotesView } from './NotesView';
import { Flashcards } from './Flashcards';
import { ExportMenu } from './ExportMenu';

type Tab = 'notes' | 'cards';

export function ResultView({ result, onReset }: { result: ConvertResponse; onReset: () => void }) {
  const [tab, setTab] = useState<Tab>('notes');

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 no-print">
        <button onClick={onReset} className="btn-ghost self-start">
          <ArrowLeft size={16} /> New conversion
        </button>
        <div className="flex items-center gap-1 p-1 rounded-full bg-rose/40 border border-ink/15 self-start sm:self-auto">
          <TabBtn active={tab === 'notes'} onClick={() => setTab('notes')} icon={FileText}>
            Notes
          </TabBtn>
          <TabBtn active={tab === 'cards'} onClick={() => setTab('cards')} icon={Layers}>
            {result.flashcards.length} cards
          </TabBtn>
        </div>
        <ExportMenu result={result} />
      </div>

      <div className="print-area">
        {tab === 'notes' ? (
          <NotesView markdown={result.notesMarkdown} title={result.title} subject={result.subject} />
        ) : (
          <Flashcards cards={result.flashcards} />
        )}
      </div>
    </div>
  );
}

function TabBtn({
  active,
  onClick,
  icon: Icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ComponentType<{ size?: number }>;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm transition-colors ${
        active ? 'bg-ink text-cream' : 'text-ink-soft hover:text-ink'
      }`}
    >
      <Icon size={14} />
      {children}
    </button>
  );
}
