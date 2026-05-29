'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import { features, navLinks, server, staff, storeCategories, weapons } from '@/lib/data';
import type { IconName } from '@/lib/data';

type ServerStatus = {
  ok: boolean;
  online?: boolean;
  playersOnline?: number;
  playersMax?: number | null;
  version?: string | null;
  motd?: string | null;
  error?: string;
};

const iconPaths: Record<IconName, string> = {
  book: 'M5 4h11a3 3 0 0 1 3 3v14H7a4 4 0 0 1-4-4V6a2 2 0 0 1 2-2Zm2 0v17M9 8h6M9 12h5',
  boss: 'M5 19 3 9l5 2 4-7 4 7 5-2-2 10H5Zm4-3h.01M15 16h.01',
  check: 'M5 13l4 4L19 7',
  chevron: 'M9 6l6 6-6 6',
  coins: 'M12 6c4 0 8-1.3 8-3s-4-3-8-3-8 1.3-8 3 4 3 8 3Zm-8 1v5c0 1.7 4 3 8 3s8-1.3 8-3V7M4 14v5c0 1.7 4 3 8 3s8-1.3 8-3v-5',
  contract: 'M7 3h8l4 4v14H7V3Zm8 0v5h5M10 12h7M10 16h5',
  copy: 'M8 8h11v13H8V8Zm-3 8H4V3h11v1',
  discord: 'M8 8c2-1 6-1 8 0l1 8c-2 2-8 2-10 0l1-8Zm2 5h.01M14 13h.01M9 18l-2 2M15 18l2 2',
  emerald: 'M6 3h12l4 6-10 12L2 9l4-6Zm0 0 6 18 6-18M2 9h20',
  flame: 'M12 22c4 0 7-3 7-7 0-5-4-7-5-12-3 2-3 5-2 8-2-1-3-3-3-5-3 2-5 5-5 9 0 4 4 7 8 7Z',
  menu: 'M4 7h16M4 12h16M4 17h16',
  rank: 'M12 3l3 5 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-5Z',
  shield: 'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z',
  spark: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Zm7 13 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3',
  staff: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 9a8 8 0 0 0-16 0',
  sword: 'M14 4l6-1-1 6L8 20l-4-4L15 5M5 15l4 4M12 8l4 4',
  wand: 'M4 20 20 4M15 4l5 5M6 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2',
  x: 'M6 6l12 12M18 6 6 18',
};

const reveal = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0 },
};

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d={iconPaths[name]} /></svg>;
}

function useServerStatus() {
  const [status, setStatus] = useState<ServerStatus>({ ok: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const response = await fetch('/api/server-status', { cache: 'no-store' });
        const data = (await response.json()) as ServerStatus;
        if (active) setStatus(data);
      } catch {
        if (active) setStatus({ ok: false, error: 'Server signal unavailable.' });
      } finally {
        if (active) setLoading(false);
      }
    };

    load();
    const timer = window.setInterval(load, 60_000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, []);

  return { status, loading };
}

function LoadingScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(false), 2400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#050403]" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(214,161,58,.20),transparent_28rem),radial-gradient(circle_at_25%_75%,rgba(153,27,27,.22),transparent_26rem),radial-gradient(circle_at_80%_70%,rgba(16,185,129,.16),transparent_24rem)]" />
          {Array.from({ length: 24 }).map((_, index) => (
            <span key={index} className="loading-particle absolute h-1 w-1 rounded-full bg-amber-200/70 shadow-[0_0_16px_rgba(251,191,36,.85)]" style={{ left: `${(index * 37) % 100}%`, top: `${(index * 53) % 100}%`, animationDelay: `${index * 0.08}s` }} />
          ))}
          <motion.div className="relative z-10 flex flex-col items-center text-center" initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .7 }}>
            <motion.div animate={{ y: [0, -10, 0], filter: ['drop-shadow(0 0 18px rgba(251,191,36,.45))', 'drop-shadow(0 0 34px rgba(16,185,129,.55))', 'drop-shadow(0 0 18px rgba(251,191,36,.45))'] }} transition={{ duration: 2, repeat: Infinity }}>
              <Image src="/brand/voxensmp-rpg-emblem.svg" alt="VoxenSMP animated RPG logo" width={124} height={124} priority />
            </motion.div>
            <p className="mt-7 text-xs font-black uppercase tracking-[0.48em] text-amber-200">Loading...</p>
            <div className="mt-5 h-1.5 w-72 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-red-700 via-amber-300 to-emerald-400" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 2.1, ease: 'easeInOut' }} />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      const current = navLinks.map((link) => link.href.slice(1)).findLast((id) => {
        const element = document.getElementById(id);
        return element ? element.offsetTop - 140 <= window.scrollY : false;
      });
      setActive(current ?? 'home');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 py-4">
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.5rem] border border-amber-200/15 bg-black/35 px-4 py-3 shadow-2xl shadow-black/40 backdrop-blur-2xl lg:px-6">
        <a href="#home" className="group flex items-center gap-3">
          <Image src="/brand/voxensmp-rpg-emblem.svg" alt="VoxenSMP RPG emblem" width={48} height={48} className="transition duration-300 group-hover:rotate-6 group-hover:scale-110" priority />
          <span className="hidden text-lg font-black tracking-[0.22em] text-amber-100 sm:block">VOXEN<span className="text-emerald-300">SMP</span></span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={`rounded-full px-4 py-2 text-sm font-bold transition ${active === link.href.slice(1) ? 'bg-amber-300/15 text-amber-100 shadow-[0_0_22px_rgba(251,191,36,.14)]' : 'text-stone-300 hover:bg-white/10 hover:text-white'}`}>
              {link.label}
            </a>
          ))}
        </div>
        <button onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white lg:hidden"><Icon name={open ? 'x' : 'menu'} className="h-5 w-5" /></button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-amber-200/15 bg-[#090706]/95 p-3 backdrop-blur-2xl lg:hidden">
            {navLinks.map((link) => <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-bold text-stone-200 hover:bg-white/10">{link.label}</a>)}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function StatusCard({ compact = false }: { compact?: boolean }) {
  const { status, loading } = useServerStatus();
  const online = status.ok && status.online;

  return (
    <GlassCard className="h-full">
      <div className="flex items-center gap-3">
        <span className="relative flex h-3 w-3">{online && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />}<span className={`relative inline-flex h-3 w-3 rounded-full ${online ? 'bg-emerald-300' : 'bg-red-400'}`} /></span>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-200">Server Status</p>
      </div>
      <h3 className="mt-5 text-3xl font-black text-white">{loading ? 'Opening Realm...' : online ? 'Server Online' : 'Server Offline'}</h3>
      <div className={`mt-5 grid gap-3 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-xs uppercase tracking-[0.24em] text-stone-500">Players</p><p className="mt-2 text-2xl font-black text-emerald-200">{loading ? '—' : `${status.playersOnline ?? 0}${status.playersMax ? `/${status.playersMax}` : ''}`}</p></div>
        <div className="rounded-2xl border border-white/10 bg-black/25 p-4"><p className="text-xs uppercase tracking-[0.24em] text-stone-500">Version</p><p className="mt-2 text-2xl font-black text-amber-100">{status.version ?? server.version}</p></div>
      </div>
      {!compact && <p className="mt-5 text-sm leading-7 text-stone-400">{status.motd ?? status.error ?? 'Live data refreshes every 60 seconds.'}</p>}
    </GlassCard>
  );
}

function Hero() {
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => Array.from({ length: 46 }, (_, index) => ({ id: index, left: `${(index * 47) % 100}%`, delay: `${(index % 11) * -0.75}s`, duration: `${9 + (index % 7)}s`, size: 2 + (index % 4) })), []);

  const copyIp = async () => {
    await navigator.clipboard.writeText(server.ip);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="home" className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(153,27,27,.28),transparent_30rem),radial-gradient(circle_at_76%_18%,rgba(214,161,58,.20),transparent_30rem),radial-gradient(circle_at_52%_80%,rgba(16,185,129,.16),transparent_34rem),linear-gradient(135deg,#050403_0%,#100807_52%,#020302_100%)]" />
      <div className="grid-overlay absolute inset-0" />
      <div className="noise-overlay absolute inset-0" />
      {!reduceMotion && particles.map((particle) => <span key={particle.id} className="particle absolute bottom-[-4rem] rounded-sm bg-amber-200/70 shadow-[0_0_18px_rgba(251,191,36,.7)]" style={{ left: particle.left, width: particle.size, height: particle.size, '--delay': particle.delay, '--duration': particle.duration } as React.CSSProperties} />)}
      <div className="absolute left-[8%] top-[24%] hidden h-40 w-40 rotate-45 rounded-[2rem] border border-red-400/20 bg-red-900/10 blur-sm animate-floaty lg:block" />
      <div className="absolute bottom-[18%] right-[7%] hidden h-48 w-48 rounded-full border border-emerald-300/20 bg-emerald-500/10 blur-sm animate-floaty lg:block" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
          <motion.div variants={reveal} className="inline-flex items-center gap-3 rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.32em] text-amber-100"><Icon name="flame" className="h-4 w-4" /> Minecraft Server</motion.div>
          <motion.div variants={reveal} className="mt-7 flex items-center gap-4"><Image src="/brand/voxensmp-rpg-emblem.svg" alt="VoxenSMP Legends RPG logo" width={96} height={96} priority className="drop-shadow-[0_0_28px_rgba(251,191,36,.4)]" /><div className="h-px flex-1 bg-gradient-to-r from-amber-200/80 to-transparent" /></motion.div>
          <motion.h1 variants={reveal} className="fantasy-title mt-6 max-w-5xl text-5xl font-black leading-[.88] tracking-[-0.075em] text-white sm:text-6xl md:text-7xl xl:text-8xl">VOXENSMP <span className="block bg-gradient-to-r from-amber-100 via-red-200 to-emerald-200 bg-clip-text text-transparent">LEGENDS RPG SURVIVAL</span></motion.h1>
          <motion.p variants={reveal} className="mt-7 text-2xl font-semibold text-amber-100 md:text-3xl">Every weapon has a story.</motion.p>
          <motion.p variants={reveal} className="mt-4 max-w-2xl text-base leading-8 text-stone-400 md:text-lg">Enter an obsidian realm of custom skills, boss dungeons, contract books, rare weapons, and competitive survival progression built for Minecraft {server.version}.</motion.p>
          <motion.div variants={reveal} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a href="#features" className="rounded-2xl bg-gradient-to-r from-amber-300 via-yellow-200 to-emerald-300 px-8 py-4 text-center font-black text-black shadow-xl shadow-amber-950/40 transition hover:scale-105">PLAY NOW</a>
            <a href="#discord" className="rounded-2xl border border-white/10 bg-white/10 px-8 py-4 text-center font-black text-white backdrop-blur-xl transition hover:border-emerald-300/50 hover:bg-emerald-300/10">JOIN DISCORD</a>
          </motion.div>
          <motion.button variants={reveal} onClick={copyIp} className="glow-border relative mt-5 flex w-full max-w-md items-center justify-between rounded-2xl bg-black/45 px-5 py-4 text-left backdrop-blur-xl transition hover:scale-[1.02]">
            <span><span className="block text-xs font-black uppercase tracking-[0.28em] text-stone-500">Copy Server IP</span><span className="text-2xl font-black text-white">{server.ip}</span></span>
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-amber-200 text-black"><Icon name={copied ? 'check' : 'copy'} className="h-5 w-5" /></span>
          </motion.button>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8, delay: .25 }} className="relative">
          <div className="absolute -inset-7 rounded-[3rem] bg-gradient-to-br from-amber-300/20 via-red-700/20 to-emerald-400/10 blur-3xl" />
          <StatusCard />
        </motion.div>
      </div>
      <a href="#features" aria-label="Scroll to features" className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-black uppercase tracking-[0.3em] text-amber-100/70 md:flex">Scroll <span className="h-10 w-px overflow-hidden bg-white/10"><span className="scroll-line block h-4 w-px bg-amber-200" /></span></a>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Core Systems" title="A survival realm built like an RPG." copy="Legends weapons, custom skills, boss dungeons, contracts, and PvP progression give every player a path to become known." />
        <div className="grid auto-rows-fr gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div key={feature.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal} transition={{ duration: .55, delay: (index % 3) * .06 }}>
              <GlassCard className="h-full"><Icon name={feature.icon} className="mb-7 h-12 w-12 text-amber-200 transition duration-500 group-hover:rotate-6 group-hover:scale-110" /><h3 className="text-2xl font-black text-white">{feature.title}</h3><p className="mt-4 leading-8 text-stone-400">{feature.detail}</p></GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WeaponShowcase() {
  const accent: Record<string, string> = {
    gold: 'from-amber-300/25 via-yellow-700/10 to-transparent text-amber-100',
    emerald: 'from-emerald-300/25 via-emerald-900/10 to-transparent text-emerald-100',
    crimson: 'from-red-400/25 via-red-950/10 to-transparent text-red-100',
    violet: 'from-fuchsia-300/20 via-purple-950/10 to-transparent text-fuchsia-100',
  };

  return (
    <section id="weapons" className="relative overflow-hidden px-5 py-24 lg:px-8">
      <div className="absolute inset-x-0 top-1/2 h-96 -translate-y-1/2 bg-[radial-gradient(circle_at_center,rgba(214,161,58,.10),transparent_42rem)]" />
      <div className="relative mx-auto max-w-7xl">
        <SectionHeader eyebrow="Weapon Showcase" title="Rare gear should feel powerful." copy="Cinematic cards for mythic weapons, divine relics, legendary contracts, and ascended custom skills." />
        <div className="grid gap-6 lg:grid-cols-4">
          {weapons.map((weapon) => (
            <GlassCard key={weapon.name} className="min-h-[25rem]">
              <div className={`absolute inset-x-0 top-0 h-44 bg-gradient-to-b ${accent[weapon.accent]}`} />
              <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-[2rem] border border-amber-200/15 bg-black/35 shadow-2xl shadow-black/30"><Icon name={weapon.icon} className="h-20 w-20 text-current drop-shadow-[0_0_20px_rgba(251,191,36,.55)]" /></div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.34em] text-amber-200/70">{weapon.rarity}</p>
              <h3 className="mt-2 text-3xl font-black text-white">{weapon.name}</h3>
              <p className="mt-4 leading-8 text-stone-400">{weapon.detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Staff() {
  return (
    <section id="staff" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="VoxenSMP Team" title="The official realm council." copy="Updated admin roster with Minecraft avatar rendering for every active team member and clean vacancy cards for open roles." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((member) => (
            <GlassCard key={`${member.role}-${member.username ?? 'kosong'}`} className={`text-center ${member.username ? '' : 'opacity-80'}`}>
              {member.username ? (
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-[2rem] border border-amber-200/20 bg-black/40 p-2 shadow-2xl shadow-black/30"><img src={`https://mc-heads.net/avatar/${member.username}`} alt={`${member.username} Minecraft head`} className="h-full w-full rounded-[1.4rem] object-cover transition duration-500 group-hover:scale-110" loading="lazy" /></div>
              ) : (
                <div className="mx-auto grid h-28 w-28 place-items-center rounded-[2rem] border border-red-300/20 bg-red-950/20 p-2 shadow-2xl shadow-black/30"><Icon name="staff" className="h-12 w-12 text-red-200/70" /></div>
              )}
              <h3 className="mt-6 text-2xl font-black text-white">{member.username ?? 'KOSONG'}</h3>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <p className="inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-amber-100">{member.role}</p>
                {member.quota && <p className="inline-flex rounded-full border border-emerald-200/20 bg-emerald-200/10 px-3 py-1 text-xs font-black uppercase tracking-[0.22em] text-emerald-100">{member.quota}</p>}
              </div>
              <p className={`mt-4 text-sm font-semibold ${member.username ? 'text-emerald-200' : 'text-red-200'}`}>{member.badge}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Store() {
  const [active, setActive] = useState(storeCategories[0].id);
  const category = storeCategories.find((item) => item.id === active) ?? storeCategories[0];

  return (
    <section id="store" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="RPG Store" title="An MMORPG shop for the survival realm." copy="Balance, ranks, contract books, and skill products are organized like a premium in-game marketplace." />
        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-2xl">
            {storeCategories.map((item) => (
              <button key={item.id} onClick={() => setActive(item.id)} className={`mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left font-black transition ${active === item.id ? 'bg-amber-200 text-black' : 'text-stone-300 hover:bg-white/10 hover:text-white'}`}><Icon name={item.icon} className="h-5 w-5" />{item.label}</button>
            ))}
          </aside>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {category.items.map((item) => (
              <GlassCard key={item.name}>
                <div className="flex items-start justify-between"><Icon name={category.icon} className="h-12 w-12 text-amber-200" /><span className="rounded-full bg-red-500/15 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-red-100">{item.badge}</span></div>
                <p className="mt-7 text-xs font-black uppercase tracking-[0.32em] text-emerald-200">{item.rarity}</p>
                <h3 className="mt-2 text-2xl font-black text-white">{item.name}</h3>
                <p className="mt-4 text-4xl font-black text-amber-100">{item.price}</p>
                <button className="mt-8 w-full rounded-2xl bg-white py-4 font-black text-black transition hover:scale-[1.02] hover:bg-amber-200">Purchase</button>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function DiscordFooter() {
  return (
    <footer id="discord" className="border-t border-white/10 px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-amber-200/15 bg-white/[0.04] p-8 backdrop-blur-2xl md:grid-cols-[1.2fr_.8fr]">
        <div><Image src="/brand/voxensmp-rpg-emblem.svg" alt="VoxenSMP emblem" width={76} height={76} /><h2 className="mt-5 text-4xl font-black text-white">Join the VoxenSMP realm.</h2><p className="mt-4 max-w-2xl leading-8 text-stone-400">Connect at <span className="font-black text-amber-100">{server.ip}</span>, join Discord for announcements, and begin your Legends RPG Survival story.</p></div>
        <div className="grid content-center gap-4"><StatusCard compact /><a href="#home" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-emerald-300 px-6 py-4 font-black text-black"><Icon name="discord" className="h-5 w-5" /> JOIN DISCORD</a></div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-sm text-stone-600">© 2026 VoxenSMP. Not affiliated with Mojang or Microsoft.</p>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <LoadingScreen />
      <Navbar />
      <Hero />
      <Features />
      <WeaponShowcase />
      <Staff />
      <Store />
      <DiscordFooter />
    </main>
  );
}
