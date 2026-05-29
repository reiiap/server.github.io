'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import { armory, communityPanels, featureCards, navLinks, server, storeItems } from '@/lib/data';
import type { IconName } from '@/lib/data';

type ServerStatus = {
  ok: boolean;
  online?: boolean;
  playersOnline?: number;
  playersMax?: number | null;
  version?: string | null;
  motd?: string | null;
  ping?: boolean | null;
  checkedAt?: string;
  error?: string;
};

type PlayerProfile = {
  username: string;
  uuid: string;
  rank: string;
  avatarUrl: string;
  balance?: number | null;
  playtime?: number | null;
};

const iconPaths: Record<IconName, string> = {
  auction: 'M4 7h16M6 7l2 14h8l2-14M9 7a3 3 0 0 1 6 0M8 12h8M9 16h6',
  badge: 'M12 3l3 5 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-5Z',
  bolt: 'M13 2 4 14h7l-1 8 10-13h-7V2Z',
  castle: 'M5 21V9h3V5h2v4h4V5h2v4h3v12H5Zm4 0v-5a3 3 0 0 1 6 0v5',
  check: 'M5 13l4 4L19 7',
  chevron: 'M9 6l6 6-6 6',
  clan: 'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Zm-4 9h8M9 16h6M12 7v13',
  clipboard: 'M9 4h6l1 2h3v15H5V6h3l1-2Zm0 4h6',
  coins: 'M12 6c4.4 0 8-1.3 8-3s-3.6-3-8-3-8 1.3-8 3 3.6 3 8 3Zm-8 1v5c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 14v5c0 1.7 3.6 3 8 3s8-1.3 8-3v-5',
  crystal: 'M6 3h12l4 6-10 12L2 9l4-6Zm0 0 6 18 6-18M2 9h20',
  discord: 'M8 8c2-1 6-1 8 0l1 8c-2 2-8 2-10 0l1-8Zm2 5h.01M14 13h.01M9 18l-2 2M15 18l2 2',
  external: 'M14 3h7v7m0-7-9 9M5 7v12h12',
  fish: 'M3 12s4-6 10-6c4 0 7 3 8 6-1 3-4 6-8 6-6 0-10-6-10-6Zm0 0-2-3v6l2-3Zm13 0h.01',
  flame: 'M12 22c4 0 7-3 7-7 0-5-4-7-5-12-3 2-3 5-2 8-2-1-3-3-3-5-3 2-5 5-5 9 0 4 4 7 8 7Z',
  gem: 'M6 3h12l4 6-10 12L2 9l4-6Z',
  hammer: 'M14 4l6 6M4 20 16-16M12 6c-3-2-6-2-8 0 4 0 6 2 8 4',
  login: 'M10 17l5-5-5-5M15 12H3M15 4h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-4',
  menu: 'M4 7h16M4 12h16M4 17h16',
  scroll: 'M7 4h10a3 3 0 0 1 3 3v13H8a4 4 0 0 1-4-4V7a3 3 0 0 1 3-3Zm1 16a4 4 0 0 0 4-4V7',
  shield: 'M12 3l8 4v5c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z',
  skull: 'M12 3c5 0 8 3 8 8 0 3-1 5-4 6v4H8v-4c-3-1-4-3-4-6 0-5 3-8 8-8Zm-3 9h.01M15 12h.01M10 17h4',
  spark: 'M12 3l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6Zm7 13 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3',
  sword: 'M14 4l6-1-1 6L8 20l-4-4L15 5M5 15l4 4M12 8l4 4',
  trade: 'M7 7h13l-3-3M20 7l-3 3M17 17H4l3 3M4 17l3-3',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm8 9a8 8 0 0 0-16 0',
  wand: 'M4 20 20 4M15 4l5 5M6 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2',
  x: 'M6 6l12 12M18 6 6 18',
};

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d={iconPaths[name]} /></svg>;
}

const reveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

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
        if (active) setStatus({ ok: false, error: 'Unable to fetch live status.' });
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

function Navbar({ onLogin }: { onLogin: () => void }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 px-4 py-3 transition-all duration-500 ${scrolled ? 'bg-black/45 backdrop-blur-2xl' : 'bg-transparent'}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.6rem] border border-white/10 bg-white/[0.045] px-4 py-3 shadow-2xl shadow-cyan-950/20 backdrop-blur-xl lg:px-6">
        <a href="#home" className="group flex items-center gap-3">
          <Image src="/brand/voxensmp-emblem.svg" alt="VoxenSMP emblem" width={46} height={46} className="drop-shadow-[0_0_22px_rgba(34,211,238,.45)] transition duration-300 group-hover:rotate-6 group-hover:scale-110" priority />
          <Image src="/brand/voxensmp-compact.svg" alt="VoxenSMP" width={180} height={45} className="hidden h-10 w-auto sm:block" priority />
        </a>

        <div className="hidden items-center gap-1 xl:flex">
          {navLinks.slice(0, -1).map((link) => (
            <a key={link.href} href={link.href} className="rounded-full px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-cyan-300/10 hover:text-cyan-100 hover:shadow-[0_0_22px_rgba(34,211,238,.16)]">
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 xl:flex">
          <button onClick={onLogin} className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-5 py-2.5 text-sm font-black text-cyan-100 transition hover:border-cyan-200/60 hover:bg-cyan-300/20">
            <Icon name="login" className="h-4 w-4" /> Player Login
          </button>
          <a href="#store" className="rounded-full bg-gradient-to-r from-purple-500 to-cyan-300 px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/25 transition hover:scale-105">Store</a>
        </div>

        <button onClick={() => setOpen((value) => !value)} aria-label="Toggle menu" className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white xl:hidden">
          <Icon name={open ? 'x' : 'menu'} className="h-5 w-5" />
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} className="mx-auto mt-3 max-w-7xl rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-3 backdrop-blur-2xl xl:hidden">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 font-bold text-slate-200 hover:bg-white/10">
                {link.label}
              </a>
            ))}
            <button onClick={() => { setOpen(false); onLogin(); }} className="mt-2 w-full rounded-2xl bg-cyan-300 px-4 py-3 font-black text-slate-950">Player Login</button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function StatusBadge({ status, loading }: { status: ServerStatus; loading: boolean }) {
  const online = status.ok && status.online;
  return (
    <div className={`inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm font-black ${online ? 'border-emerald-300/25 bg-emerald-300/10 text-emerald-200' : 'border-rose-300/20 bg-rose-300/10 text-rose-100'}`}>
      <span className="relative flex h-3 w-3">
        {online && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-70" />}
        <span className={`relative inline-flex h-3 w-3 rounded-full ${online ? 'bg-emerald-300' : 'bg-rose-300'}`} />
      </span>
      {loading ? 'Checking live server...' : online ? 'Online now' : 'Offline or unreachable'}
    </div>
  );
}

function Hero({ onLogin }: { onLogin: () => void }) {
  const { status, loading } = useServerStatus();
  const [copied, setCopied] = useState(false);
  const reduceMotion = useReducedMotion();
  const particles = useMemo(() => Array.from({ length: 58 }, (_, index) => ({
    id: index,
    left: `${(index * 41) % 100}%`,
    delay: `${(index % 13) * -0.7}s`,
    duration: `${9 + (index % 8)}s`,
    size: 2 + (index % 4),
  })), []);

  const copyIp = async () => {
    await navigator.clipboard.writeText(server.ip);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="home" className="relative isolate flex min-h-screen items-center overflow-hidden px-5 pb-20 pt-32 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_15%,rgba(124,58,237,.34),transparent_32rem),radial-gradient(circle_at_85%_12%,rgba(34,211,238,.23),transparent_30rem),linear-gradient(135deg,#02030d_0%,#08051a_48%,#020617_100%)]" />
      <div className="grid-overlay absolute inset-0" />
      <div className="noise-overlay absolute inset-0" />
      {!reduceMotion && particles.map((particle) => (
        <span key={particle.id} className="particle absolute bottom-[-4rem] rounded-sm bg-cyan-200/70 shadow-[0_0_18px_rgba(34,211,238,.85)]" style={{ left: particle.left, width: particle.size, height: particle.size, '--delay': particle.delay, '--duration': particle.duration } as React.CSSProperties} />
      ))}
      <div className="absolute left-[5%] top-[23%] hidden h-32 w-32 rotate-45 rounded-[2rem] border border-purple-300/20 bg-purple-500/10 blur-[1px] animate-floaty lg:block" />
      <div className="absolute bottom-[20%] right-[8%] hidden h-44 w-44 rounded-full border border-cyan-300/20 bg-cyan-300/10 blur-sm animate-floaty lg:block" />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr]">
        <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.11 } } }}>
          <motion.div variants={reveal}><StatusBadge status={status} loading={loading} /></motion.div>
          <motion.div variants={reveal} className="mt-7 flex items-center gap-4">
            <Image src="/brand/voxensmp-emblem.svg" alt="VoxenSMP crystal sword emblem" width={92} height={92} className="drop-shadow-[0_0_34px_rgba(34,211,238,.55)]" priority />
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-300/80 to-transparent" />
          </motion.div>
          <motion.h1 variants={reveal} className="minecraft-title mt-6 max-w-4xl text-6xl font-black leading-[.82] tracking-[-0.09em] text-white sm:text-7xl md:text-8xl xl:text-[9.5rem]">
            VOXEN<span className="block bg-gradient-to-r from-cyan-200 via-white to-purple-300 bg-clip-text text-transparent">SMP</span>
          </motion.h1>
          <motion.p variants={reveal} className="mt-7 max-w-2xl text-xl font-semibold leading-9 text-slate-200 md:text-2xl">
            Premium Economy Survival + Crystal PvP network for competitive Minecraft players.
          </motion.p>
          <motion.p variants={reveal} className="mt-4 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Forge legendary weapons, dominate clan wars, raid dark fantasy dungeons, control the market, and climb a survival MMO built for serious 1.21+ gameplay.
          </motion.p>

          <motion.div variants={reveal} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button onClick={copyIp} className="glow-border group relative flex items-center justify-between gap-5 rounded-3xl bg-black/50 px-5 py-4 text-left shadow-2xl shadow-cyan-500/10 backdrop-blur-xl transition hover:scale-[1.02] sm:min-w-80">
              <span><span className="block text-xs font-black uppercase tracking-[0.32em] text-slate-500">Copy Server IP</span><span className="text-2xl font-black text-white">{server.ip}</span></span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-300 text-slate-950 transition group-hover:rotate-6"><Icon name={copied ? 'check' : 'clipboard'} className="h-5 w-5" /></span>
            </button>
            <a href="#status" className="rounded-3xl bg-gradient-to-r from-purple-500 to-cyan-300 px-8 py-4 text-center font-black text-slate-950 shadow-xl shadow-purple-500/30 transition hover:scale-105">Play Now</a>
          </motion.div>

          <motion.div variants={reveal} className="mt-5 flex flex-wrap gap-3">
            <a href="#store" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-purple-300/50 hover:bg-purple-300/10"><Icon name="gem" className="h-4 w-4" /> Store</a>
            <a href="#community" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"><Icon name="discord" className="h-4 w-4" /> Discord</a>
            <button onClick={onLogin} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/50 hover:bg-cyan-300/10"><Icon name="login" className="h-4 w-4" /> Login</button>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: .94, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8, delay: .25 }} className="relative">
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-br from-cyan-300/20 via-purple-500/25 to-transparent blur-3xl" />
          <div className="relative overflow-hidden rounded-[2.3rem] border border-white/10 bg-black/45 p-6 shadow-2xl shadow-purple-950/40 backdrop-blur-2xl">
            <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-300/15 blur-3xl" />
            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.34em] text-cyan-200">Live Realm Status</p>
                <h2 className="mt-2 text-4xl font-black text-white">{loading ? 'Syncing...' : status.online ? 'Server Online' : 'Server Offline'}</h2>
              </div>
              <Image src="/brand/voxensmp-emblem.svg" alt="VoxenSMP compact emblem" width={76} height={76} className="drop-shadow-[0_0_28px_rgba(34,211,238,.45)]" />
            </div>

            <div className="relative mt-7 grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">Players</p><p className="mt-3 text-4xl font-black text-cyan-100">{loading ? '—' : `${status.playersOnline ?? 0}${status.playersMax ? `/${status.playersMax}` : ''}`}</p></div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">Version</p><p className="mt-3 text-4xl font-black text-purple-100">{status.version ?? server.version}</p></div>
              <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 sm:col-span-2"><p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">MOTD</p><p className="mt-3 min-h-8 text-lg font-bold text-slate-200">{loading ? 'Reading server signal...' : status.motd ?? status.error ?? 'No message returned by status API.'}</p></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function ServerStatusPanel() {
  const { status, loading } = useServerStatus();
  return (
    <section id="status" className="px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Real Server API" title="Live VoxenSMP network signal." copy="This card is powered by api.mcsrvstat.us and refreshes automatically every 60 seconds with live player counts." />
        <div className="grid gap-6 lg:grid-cols-[.85fr_1.15fr]">
          <GlassCard className="min-h-full">
            <StatusBadge status={status} loading={loading} />
            <h3 className="mt-8 text-4xl font-black text-white">{status.online ? 'Realm Open' : 'Awaiting Signal'}</h3>
            <p className="mt-4 leading-8 text-slate-400">IP: <span className="font-black text-cyan-200">{server.ip}</span>. Version: <span className="font-black text-purple-200">{status.version ?? server.version}</span>.</p>
          </GlassCard>
          <div className="grid gap-5 sm:grid-cols-3">
            {[['Online Players', loading ? '—' : String(status.playersOnline ?? 0)], ['Max Slots', loading ? '—' : status.playersMax ? String(status.playersMax) : 'API n/a'], ['Ping Check', loading ? '—' : status.ping === null ? 'API n/a' : status.ping ? 'Passed' : 'No ping']].map(([label, value]) => (
              <GlassCard key={label}><p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">{label}</p><p className="mt-4 text-3xl font-black text-white">{value}</p></GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Core MMO Systems" title="Economy survival, crystal warfare, legendary progression." copy="Structured systems built around wealth, combat, clan power, and long-term survival progression." />
        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {featureCards.map((feature, index) => (
            <motion.div key={feature.title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={reveal} transition={{ duration: .55, delay: (index % 5) * .05 }}>
              <GlassCard className="h-full">
                <div className="mb-6 flex items-center justify-between"><Icon name={feature.icon} className="h-11 w-11 text-cyan-200" /><span className="rounded-full bg-purple-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-purple-100">{feature.tag}</span></div>
                <h3 className="text-xl font-black text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-400">{feature.detail}</p>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Armory() {
  const accent = { cyan: 'from-cyan-300/25 to-cyan-300/0 text-cyan-100', purple: 'from-purple-400/25 to-purple-400/0 text-purple-100', rose: 'from-rose-400/25 to-rose-400/0 text-rose-100' };
  return (
    <section id="armory" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Legendary Armory" title="Weapons that feel earned, feared, and collectible." copy="A cinematic showcase for premium relic gear, mythic drops, and crystal-forged progression." />
        <div className="grid gap-6 lg:grid-cols-3">
          {armory.map((item) => (
            <GlassCard key={item.name} className="min-h-[24rem]">
              <div className={`absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${accent[item.accent as keyof typeof accent]}`} />
              <div className="relative mx-auto grid h-36 w-36 place-items-center rounded-[2rem] border border-white/10 bg-black/40 shadow-2xl shadow-cyan-500/10">
                <Icon name="sword" className="h-20 w-20 rotate-45 text-cyan-100 drop-shadow-[0_0_18px_rgba(34,211,238,.75)]" />
              </div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.32em] text-slate-500">{item.rarity}</p>
              <h3 className="mt-2 text-3xl font-black text-white">{item.name}</h3>
              <p className="mt-4 leading-8 text-slate-400">{item.copy}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Community() {
  return (
    <section id="community" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Community Command Center" title="Clans, guilds, legends, builds, events, and staff." copy="Organized panels for the social MMO layer of VoxenSMP without messy forum-template clutter." />
        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {communityPanels.map((panel) => (
            <GlassCard key={panel.title} className="h-full">
              <Icon name={panel.icon} className="h-10 w-10 text-purple-200" />
              <h3 className="mt-6 text-2xl font-black text-white">{panel.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{panel.copy}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Store() {
  return (
    <section id="store" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Premium Storefront" title="Clean rank, key, and cosmetic presentation." copy="High-end purchase cards designed for a professional network store integration." />
        <div className="grid gap-6 lg:grid-cols-3">
          {storeItems.map((item, index) => (
            <GlassCard key={item.name} className={index === 0 ? 'lg:scale-[1.03]' : ''}>
              <div className="flex items-start justify-between"><Icon name={item.icon} className="h-12 w-12 text-cyan-200" /><span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-black text-slate-200">{item.price}</span></div>
              <h3 className="mt-7 text-3xl font-black text-white">{item.name}</h3>
              <ul className="mt-6 space-y-3">
                {item.perks.map((perk) => <li key={perk} className="flex items-center gap-3 text-slate-300"><Icon name="check" className="h-4 w-4 text-emerald-300" />{perk}</li>)}
              </ul>
              <a href="#login" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-black text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-200">Open Store <Icon name="external" className="h-4 w-4" /></a>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoginModal({ open, onClose, player, setPlayer }: { open: boolean; onClose: () => void; player: PlayerProfile | null; setPlayer: (player: PlayerProfile | null) => void }) {
  const [username, setUsername] = useState('');
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch('/api/auth/session').then((response) => response.json()).then((data) => setPlayer(data.player ?? null)).catch(() => undefined);
  }, [setPlayer]);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await fetch('/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username, code }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? 'Login failed.');
      setPlayer(data.player);
      setMessage('Login verified. Rank synced from LuckPerms.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/session', { method: 'DELETE' });
    setPlayer(null);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[80] grid place-items-center bg-black/70 p-4 backdrop-blur-xl" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ opacity: 0, scale: .94, y: 24 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: .94, y: 24 }} className="relative w-full max-w-xl overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/95 p-6 shadow-2xl shadow-cyan-950/40">
            <button onClick={onClose} className="absolute right-5 top-5 rounded-full border border-white/10 bg-white/10 p-2 text-white"><Icon name="x" className="h-5 w-5" /></button>
            <Image src="/brand/voxensmp-emblem.svg" alt="VoxenSMP emblem" width={72} height={72} className="drop-shadow-[0_0_24px_rgba(34,211,238,.45)]" />
            <h2 className="mt-5 text-3xl font-black text-white">Secure Player Login</h2>
            <p className="mt-3 leading-7 text-slate-400">Only players registered in the VoxenSMP MySQL database can login. Use an in-game one-time verification code, then rank is synced from LuckPerms.</p>

            {player ? (
              <div className="mt-7 rounded-3xl border border-cyan-300/15 bg-cyan-300/10 p-5">
                <div className="flex items-center gap-4"><img src={player.avatarUrl} alt={`${player.username} avatar`} className="h-16 w-16 rounded-2xl" /><div><p className="text-xl font-black text-white">{player.username}</p><p className="text-cyan-200">Rank: {player.rank}</p></div></div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2"><div className="rounded-2xl bg-black/25 p-4"><p className="text-xs uppercase tracking-[.2em] text-slate-500">Balance</p><p className="font-black text-white">{player.balance ?? 'Not synced'}</p></div><div className="rounded-2xl bg-black/25 p-4"><p className="text-xs uppercase tracking-[.2em] text-slate-500">Playtime</p><p className="font-black text-white">{player.playtime ?? 'Not synced'}</p></div></div>
                <button onClick={logout} className="mt-5 rounded-2xl border border-white/10 px-5 py-3 font-black text-white">Logout</button>
              </div>
            ) : (
              <form onSubmit={submit} className="mt-7 space-y-4">
                <input value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Minecraft username" className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 font-bold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50" />
                <input value={code} onChange={(event) => setCode(event.target.value)} placeholder="One-time server code" className="w-full rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 font-bold text-white outline-none transition placeholder:text-slate-600 focus:border-cyan-300/50" />
                <button disabled={loading} className="w-full rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-300 px-5 py-4 font-black text-slate-950 disabled:opacity-60">{loading ? 'Verifying...' : 'Verify Minecraft Account'}</button>
              </form>
            )}
            {message && <p className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-slate-200">{message}</p>}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Footer({ onLogin }: { onLogin: () => void }) {
  return (
    <footer id="login" className="border-t border-white/10 px-5 py-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-[1.4fr_.8fr_.8fr]">
        <div><Image src="/brand/voxensmp-full.svg" alt="VoxenSMP full logo" width={260} height={72} className="h-16 w-auto" /><p className="mt-4 max-w-xl leading-8 text-slate-400">A premium Economy Survival and Crystal PvP Minecraft network for version {server.version}. Connect with <span className="font-black text-cyan-200">{server.ip}</span>.</p></div>
        <div><h3 className="font-black text-white">Network</h3><div className="mt-4 grid gap-2 text-slate-400">{navLinks.slice(0, -1).map((link) => <a key={link.href} href={link.href} className="hover:text-cyan-200">{link.label}</a>)}</div></div>
        <div><h3 className="font-black text-white">Player Access</h3><button onClick={onLogin} className="mt-4 rounded-2xl bg-cyan-300 px-5 py-3 font-black text-slate-950">Login with Minecraft</button><p className="mt-4 text-sm text-slate-500">© 2026 VoxenSMP. Not affiliated with Mojang or Microsoft.</p></div>
      </div>
    </footer>
  );
}

export default function Home() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [player, setPlayer] = useState<PlayerProfile | null>(null);

  return (
    <main>
      <Navbar onLogin={() => setLoginOpen(true)} />
      <Hero onLogin={() => setLoginOpen(true)} />
      <ServerStatusPanel />
      <Features />
      <Armory />
      <Community />
      <Store />
      <Footer onLogin={() => setLoginOpen(true)} />
      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} player={player} setPlayer={setPlayer} />
    </main>
  );
}
