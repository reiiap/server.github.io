import type { ReactNode } from 'react';

export function GlassCard({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`group relative overflow-hidden rounded-[2rem] border border-amber-200/12 bg-white/[0.045] p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl transition duration-500 hover:-translate-y-2 hover:scale-[1.012] hover:border-amber-200/30 ${className}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-amber-300/0 via-red-700/0 to-emerald-300/0 transition duration-500 group-hover:from-amber-300/10 group-hover:via-red-700/10 group-hover:to-emerald-300/10" />
      <div className="absolute -right-16 -top-16 h-32 w-32 rounded-full bg-amber-300/10 blur-3xl transition duration-500 group-hover:bg-emerald-300/20" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
