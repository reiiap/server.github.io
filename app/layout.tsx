import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoxenSMP — Server RPG Indonesia',
  description:
    'Server Minecraft RPG VoxenSMP untuk beli rank, book, skill, balance, item, dan komunitas survival premium.',

  icons: {
    icon: '/brand/voxensmp-rpg-emblem.svg',
    shortcut: '/brand/voxensmp-rpg-emblem.svg',
    apple: '/brand/voxensmp-rpg-emblem.svg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
