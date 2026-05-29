import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoxenSMP — Legends RPG Survival',
  description: 'Dark fantasy Minecraft RPG Survival server with legendary weapons, custom skills, boss dungeons, contracts, and competitive PvP.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
