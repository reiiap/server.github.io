import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Toko VoxenSMP — Rank, Book & Skill',
  description: 'Toko Minecraft RPG VoxenSMP berbahasa Indonesia untuk rank, book, contract, skill, balance, armor, dan item premium.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
