import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VOXEN SMP Store — Rank, Book, Skill',
  description: 'Store Minecraft RPG Indonesia untuk rank, book, skill, balance, dan item premium VOXEN SMP.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
