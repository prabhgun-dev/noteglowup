import type { Metadata } from 'next';
import { Fraunces, Inter, Caveat } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  axes: ['SOFT', 'opsz'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Notesly — Ugly notes, aesthetic in 20 seconds',
  description:
    'Snap a photo of your notebook. Get clean digital notes + 30 flashcards instantly. Built for JEE, NEET, and Class 11–12 students.',
  openGraph: {
    title: 'Notesly',
    description: 'Snap your notes. Get aesthetic notes + flashcards in 20s.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${caveat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
