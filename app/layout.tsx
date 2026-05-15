import type { Metadata } from 'next';
import { Fraunces, Inter, Caveat, Bungee, Anton, Special_Elite } from 'next/font/google';
import './globals.css';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
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

const bungee = Bungee({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bungee',
  display: 'swap',
});

const anton = Anton({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-anton',
  display: 'swap',
});

const specialElite = Special_Elite({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-elite',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Notesly — ugly notes → aesthetic in 20 seconds',
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
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${bungee.variable} ${anton.variable} ${specialElite.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
