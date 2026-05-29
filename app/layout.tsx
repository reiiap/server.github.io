import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoxenSMP — Toko RPG Indonesia',
  description: 'Toko Minecraft RPG VoxenSMP berbahasa Indonesia untuk rank, book, skill, balance, item, dan komunitas survival premium.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
