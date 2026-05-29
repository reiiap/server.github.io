export function SectionHeader({ eyebrow, title, copy }: { eyebrow: string; title: string; copy: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center animate-fade-up">
      <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-amber-100">
        {eyebrow}
      </span>
      <h2 className="mt-5 text-4xl font-black tracking-tight text-white md:text-6xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-stone-400 md:text-lg">{copy}</p>
    </div>
  );
}
