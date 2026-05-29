import type { ReactNode } from 'react';

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.055] p-6 shadow-2xl shadow-purple-950/20 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:scale-[1.015] ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 via-cyan-300/0 to-purple-400/0 transition duration-500 group-hover:from-purple-500/10 group-hover:via-cyan-300/5 group-hover:to-purple-400/10" />
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-cyan-400/10 blur-3xl transition duration-500 group-hover:bg-cyan-300/30" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
