export function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center animate-fade-up">
      <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.35em] text-cyan-200">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-300 md:text-lg">{copy}</p>
    </div>
  );
}
