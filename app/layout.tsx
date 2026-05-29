import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VoxenSMP - Premium Minecraft Survival Network',
  description: 'Modern Economy Crystal PvP Survival Server for Minecraft 1.21+',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
