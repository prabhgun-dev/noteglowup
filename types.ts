export type Flashcard = {
  front: string;
  back: string;
};

export type Conversion = {
  id: string;
  title: string;
  subject?: string;
  notesMarkdown: string;
  flashcards: Flashcard[];
  createdAt: string;
};

export type ConvertResponse = {
  title: string;
  subject?: string;
  notesMarkdown: string;
  flashcards: Flashcard[];
};
