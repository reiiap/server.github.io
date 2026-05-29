'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { FormEvent, useEffect, useMemo, useState } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import {
  adminWhatsapp,
  discordUrl,
  features,
  importantNotes,
  navLinks,
  ownerWhatsapp,
  server,
  staff,
  storeCategories,
  weapons,
} from '@/lib/data';
import type { IconName, StoreProduct } from '@/lib/data';

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

const rarityClasses: Record<string, string> = {
  Darkness: 'from-zinc-200/25 via-purple-500/20 to-red-500/15 text-zinc-100 shadow-purple-500/20',
  Mythic: 'from-fuchsia-300/25 via-purple-500/20 to-amber-300/15 text-fuchsia-100 shadow-fuchsia-500/20',
  Victorium: 'from-cyan-300/25 via-emerald-500/20 to-amber-300/15 text-cyan-100 shadow-cyan-500/20',
  Knight: 'from-slate-200/25 via-sky-500/15 to-transparent text-slate-100 shadow-sky-500/10',
  Elite: 'from-emerald-300/25 via-lime-500/15 to-transparent text-emerald-100 shadow-emerald-500/10',
  Prime: 'from-amber-200/25 via-orange-500/15 to-transparent text-amber-100 shadow-amber-500/10',
  Basic: 'from-stone-200/20 via-white/10 to-transparent text-stone-100 shadow-white/10',
  Rare: 'from-sky-300/25 via-blue-500/15 to-transparent text-sky-100 shadow-blue-500/10',
  Legend: 'from-amber-300/30 via-red-500/15 to-transparent text-amber-100 shadow-amber-500/20',
  Premium: 'from-yellow-200/30 via-amber-500/15 to-transparent text-yellow-100 shadow-yellow-500/20',
  Glory: 'from-orange-300/30 via-red-500/20 to-amber-300/15 text-orange-100 shadow-orange-500/20',
  Superior: 'from-rose-300/30 via-purple-500/20 to-amber-300/15 text-rose-100 shadow-rose-500/20',
  Skill: 'from-violet-300/25 via-indigo-500/15 to-transparent text-violet-100 shadow-violet-500/10',
  Balance: 'from-emerald-300/25 via-green-500/15 to-transparent text-emerald-100 shadow-emerald-500/10',
  Mech: 'from-cyan-200/25 via-zinc-400/15 to-transparent text-cyan-100 shadow-cyan-500/10',
  Enchant: 'from-indigo-300/25 via-purple-500/15 to-transparent text-indigo-100 shadow-indigo-500/10',
};

function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d={iconPaths[name]} /></svg>;
}

function whatsappMessage(product?: StoreProduct) {
  const text = product
    ? `Halo VOXEN SMP, saya minat membeli ${product.name} (${product.price}).`
    : 'Halo VOXEN SMP, saya minat dengan store VOXEN SMP.';
  return `${ownerWhatsapp}?text=${encodeURIComponent(text)}`;
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
        if (active) setStatus({ ok: false, error: 'Sinyal server belum tersedia.' });
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
    const timer = window.setTimeout(() => setVisible(false), 2200);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center overflow-hidden bg-[#050403]" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.7 }}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(214,161,58,.22),transparent_28rem),radial-gradient(circle_at_25%_75%,rgba(153,27,27,.24),transparent_26rem),radial-gradient(circle_at_80%_70%,rgba(16,185,129,.18),transparent_24rem)]" />
          {Array.from({ length: 24 }).map((_, index) => (
            <span key={index} className="loading-particle absolute h-1 w-1 rounded-full bg-amber-200/70 shadow-[0_0_16px_rgba(251,191,36,.85)]" style={{ left: `${(index * 37) % 100}%`, top: `${(index * 53) % 100}%`, animationDelay: `${index * 0.08}s` }} />
          ))}
          <motion.div className="relative z-10 flex flex-col items-center text-center" initial={{ scale: .92, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .7 }}>
            <motion.div className="logo-glow" animate={{ y: [0, -10, 0], filter: ['drop-shadow(0 0 18px rgba(251,191,36,.45))', 'drop-shadow(0 0 38px rgba(16,185,129,.65))', 'drop-shadow(0 0 18px rgba(251,191,36,.45))'] }} transition={{ duration: 2, repeat: Infinity }}>
              <Image src="/brand/voxensmp-rpg-emblem.svg" alt="Logo VOXEN SMP" width={132} height={132} priority />
            </motion.div>
            <p className="mt-7 text-xs font-black uppercase tracking-[0.48em] text-amber-200">Memuat Realm...</p>
            <div className="mt-5 h-1.5 w-72 overflow-hidden rounded-full bg-white/10">
              <motion.div className="h-full rounded-full bg-gradient-to-r from-red-700 via-amber-300 to-emerald-400" initial={{ width: '0%' }} animate={{ width: '100%' }} transition={{ duration: 1.9, ease: 'easeInOut' }} />
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
      <nav className="mx-auto flex max-w-7xl items-center justify-between rounded-[1.5rem] border border-amber-200/15 bg-black/45 px-4 py-3 shadow-2xl shadow-black/30 backdrop-blur-2xl">
        <a href="#home" className="flex items-center gap-3">
          <Image src="/brand/voxensmp-compact.svg" alt="Logo VOXEN SMP" width={48} height={48} className="logo-glow rounded-xl" priority />
          <div className="leading-tight">
            <p className="text-lg font-black tracking-[0.16em] text-white">VOXEN SMP</p>
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-200">Store RPG</p>
          </div>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={`rounded-full px-4 py-2 text-sm font-bold transition ${active === link.href.slice(1) ? 'bg-amber-200 text-black' : 'text-stone-300 hover:bg-white/10 hover:text-white'}`}>{link.label}</a>
          ))}
        </div>
        <div className="hidden items-center gap-3 lg:flex">
          <a href={discordUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-indigo-300/20 bg-indigo-500/15 px-4 py-2 text-sm font-black text-indigo-100 transition hover:scale-105 hover:bg-indigo-400/25"><Icon name="discord" className="h-4 w-4" />Discord</a>
          <a href="#login" className="rounded-full bg-white px-4 py-2 text-sm font-black text-black transition hover:scale-105 hover:bg-amber-200">Login</a>
        </div>
        <button onClick={() => setOpen((value) => !value)} className="rounded-2xl border border-white/10 p-3 text-white lg:hidden" aria-label="Buka menu"><Icon name={open ? 'x' : 'menu'} className="h-5 w-5" /></button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-[1.5rem] border border-white/10 bg-black/80 p-3 backdrop-blur-2xl lg:hidden">
            {[...navLinks, { label: 'Discord', href: discordUrl }].map((link) => (
              <a key={link.href} href={link.href} target={link.href.startsWith('http') ? '_blank' : undefined} rel={link.href.startsWith('http') ? 'noreferrer' : undefined} onClick={() => setOpen(false)} className="rounded-2xl px-4 py-3 font-black text-stone-200 hover:bg-white/10">{link.label}</a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function StatusCard({ compact = false }: { compact?: boolean }) {
  const { status, loading } = useServerStatus();
  const statusText = loading ? 'Mengecek realm...' : status.online ? 'Realm Online' : 'Realm Offline';
  const players = status.online ? `${status.playersOnline ?? 0}/${status.playersMax ?? '∞'} Player` : 'Cek lagi nanti';

  return (
    <div className={`relative overflow-hidden rounded-[2rem] border border-amber-200/15 bg-black/45 p-6 shadow-2xl shadow-black/30 backdrop-blur-2xl ${compact ? '' : 'glow-border'}`}>
      <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-emerald-300/15 blur-3xl" />
      <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-200">Status Server</p>
      <div className="mt-4 flex items-center justify-between gap-5">
        <div>
          <h3 className="text-2xl font-black text-white">{statusText}</h3>
          <p className="mt-1 text-sm text-stone-400">{players} • {status.version ?? server.version}</p>
        </div>
        <span className={`h-4 w-4 rounded-full ${status.online ? 'bg-emerald-300 shadow-[0_0_24px_rgba(110,231,183,.9)]' : 'bg-red-400 shadow-[0_0_24px_rgba(248,113,113,.75)]'}`} />
      </div>
    </div>
  );
}

function Hero() {
  const [copied, setCopied] = useState(false);

  const copyIp = async () => {
    await navigator.clipboard.writeText(server.ip);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden px-5 pb-24 pt-36 lg:px-8">
      <div className="grid-overlay absolute inset-0 opacity-70" />
      <div className="noise-overlay absolute inset-0" />
      <div className="absolute left-1/2 top-28 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-amber-300/10 blur-3xl" />
      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-9rem)] max-w-7xl items-center gap-12 lg:grid-cols-[1.1fr_.9fr]">
        <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8 }}>
          <span className="inline-flex rounded-full border border-amber-200/20 bg-amber-200/10 px-4 py-2 text-xs font-black uppercase tracking-[0.35em] text-amber-100">{server.subtitle}</span>
          <h1 className="fantasy-title mt-6 text-6xl font-black tracking-tight text-white md:text-8xl">{server.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-9 text-stone-300 md:text-xl">Store premium Minecraft RPG Indonesia untuk rank, book, skill, balance, dan item permanen. Pilih paket, login pakai username Minecraft, lalu hubungi Owner atau Admin.</p>
          <p className="mt-4 text-amber-100">Minat? Langsung hubungi: <a className="font-black underline decoration-amber-300/50" href={ownerWhatsapp}>Owner</a> atau <a className="font-black underline decoration-amber-300/50" href={adminWhatsapp}>Admin</a>.</p>
          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <a href="#store" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-300 to-emerald-300 px-7 py-4 font-black text-black shadow-[0_0_30px_rgba(251,191,36,.25)] transition hover:scale-[1.03]"><Icon name="emerald" className="h-5 w-5" /> Lihat Store</a>
            <a href={discordUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl border border-indigo-300/20 bg-indigo-500/15 px-7 py-4 font-black text-indigo-100 transition hover:scale-[1.03] hover:bg-indigo-400/25"><Icon name="discord" className="h-5 w-5" /> Gabung Discord</a>
            <button onClick={copyIp} className="inline-flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-7 py-4 font-black text-white transition hover:scale-[1.03] hover:bg-white/10"><Icon name={copied ? 'check' : 'copy'} className="h-5 w-5" /> {copied ? 'IP Disalin' : server.ip}</button>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, scale: .94, y: 28 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: .8, delay: .2 }} className="relative">
          <div className="absolute -inset-7 rounded-[3rem] bg-gradient-to-br from-amber-300/20 via-red-700/20 to-emerald-400/10 blur-3xl" />
          <div className="relative rounded-[3rem] border border-amber-200/15 bg-black/35 p-8 text-center shadow-2xl shadow-black/40 backdrop-blur-2xl">
            <Image src="/brand/voxensmp-full.svg" alt="Logo VOXEN SMP" width={420} height={260} className="logo-glow mx-auto" priority />
            <StatusCard />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Features() {
  return (
    <section id="features" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Sistem Realm" title="Survival rasa RPG premium." copy="Semua elemen dibuat untuk petualangan yang rapi, seru, dan mudah dipahami player Indonesia." />
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
    emerald: 'from-emerald-300/25 via-green-700/10 to-transparent text-emerald-100',
    crimson: 'from-red-300/25 via-red-900/10 to-transparent text-red-100',
    violet: 'from-violet-300/25 via-purple-900/10 to-transparent text-violet-100',
  };

  return (
    <section id="weapons" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Relik & Build" title="Pilih gaya bermainmu." copy="Rank, contract, skill, dan armor dibuat terasa seperti progres karakter di dunia RPG." />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {weapons.map((weapon) => (
            <GlassCard key={weapon.name} className={`min-h-[24rem] bg-gradient-to-br ${accent[weapon.accent]}`}>
              <div className="grid h-28 w-28 place-items-center rounded-[2rem] border border-amber-200/15 bg-black/35 shadow-2xl shadow-black/30"><Icon name={weapon.icon} className="h-20 w-20 text-current drop-shadow-[0_0_20px_rgba(251,191,36,.55)]" /></div>
              <p className="mt-8 text-xs font-black uppercase tracking-[0.34em] text-amber-200/70">{weapon.rarity}</p>
              <h3 className="mt-2 text-3xl font-black text-white">{weapon.name}</h3>
              <p className="mt-4 leading-8 text-stone-300">{weapon.detail}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function LoginPanel() {
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = window.localStorage.getItem('voxensmp_username') ?? '';
    setUsername(saved);
    setInput(saved);
  }, []);

  const previewName = input.trim();
  const isValid = /^[A-Za-z0-9_]{3,16}$/.test(previewName);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!previewName) {
      setError('Username tidak boleh kosong.');
      return;
    }
    if (!isValid) {
      setError('Gunakan 3-16 karakter: huruf, angka, atau underscore.');
      return;
    }
    window.localStorage.setItem('voxensmp_username', previewName);
    setUsername(previewName);
    setError('');
  };

  const logout = () => {
    window.localStorage.removeItem('voxensmp_username');
    setUsername('');
    setInput('');
    setError('');
  };

  return (
    <section id="login" className="px-5 py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1.1fr]">
        <SectionHeader eyebrow="Login Minecraft" title="Masuk pakai username saja." copy="Preview avatar otomatis dari mc-heads.net dan username disimpan di perangkat kamu agar checkout lebih cepat." />
        <GlassCard className="self-center">
          <div className="grid gap-6 md:grid-cols-[11rem_1fr]">
            <div className="mx-auto h-40 w-40 overflow-hidden rounded-[2rem] border border-amber-200/20 bg-black/40 p-3 shadow-[0_0_36px_rgba(251,191,36,.15)]">
              {previewName && isValid ? <img src={`https://mc-heads.net/avatar/${previewName}`} alt={`Avatar Minecraft ${previewName}`} className="h-full w-full rounded-[1.3rem] object-cover" /> : <div className="grid h-full w-full place-items-center rounded-[1.3rem] bg-white/5 text-amber-200"><Icon name="staff" className="h-16 w-16" /></div>}
            </div>
            <div>
              {username ? <p className="mb-4 rounded-2xl border border-emerald-300/20 bg-emerald-400/10 px-4 py-3 font-bold text-emerald-100">Login sebagai <span className="font-black">{username}</span>.</p> : <p className="mb-4 rounded-2xl border border-amber-300/20 bg-amber-400/10 px-4 py-3 font-bold text-amber-100">Belum login. Masukkan username Minecraft kamu.</p>}
              <form onSubmit={submit} className="grid gap-4">
                <label className="text-sm font-black uppercase tracking-[0.2em] text-stone-300" htmlFor="minecraft-username">Username Minecraft</label>
                <input id="minecraft-username" value={input} onChange={(event) => { setInput(event.target.value); setError(''); }} placeholder="Contoh: Steve" className="rounded-2xl border border-white/10 bg-black/40 px-5 py-4 font-bold text-white outline-none transition placeholder:text-stone-600 focus:border-amber-200/50 focus:ring-4 focus:ring-amber-200/10" />
                {error && <p className="text-sm font-bold text-red-200">{error}</p>}
                <div className="flex flex-col gap-3 sm:flex-row">
                  <button className="rounded-2xl bg-amber-200 px-6 py-4 font-black text-black transition hover:scale-[1.02] hover:bg-emerald-200" type="submit">Simpan Login</button>
                  {username && <button onClick={logout} className="rounded-2xl border border-white/10 px-6 py-4 font-black text-white transition hover:bg-white/10" type="button">Logout</button>}
                </div>
              </form>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function StaffSection() {
  return (
    <section id="staff" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Team VOXEN SMP" title="Dewan penjaga realm." copy="Roster admin dengan avatar Minecraft untuk anggota aktif dan kartu kosong untuk role yang terbuka." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {staff.map((member) => (
            <GlassCard key={`${member.role}-${member.username ?? 'kosong'}`} className={`text-center ${member.username ? '' : 'opacity-80'}`}>
              {member.username ? (
                <div className="mx-auto h-28 w-28 overflow-hidden rounded-[2rem] border border-amber-200/20 bg-black/40 p-2 shadow-2xl shadow-black/30"><img src={`https://mc-heads.net/avatar/${member.username}`} alt={`Avatar Minecraft ${member.username}`} className="h-full w-full rounded-[1.4rem] object-cover transition duration-500 group-hover:scale-110" loading="lazy" /></div>
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

function ProductCard({ product, icon }: { product: StoreProduct; icon: IconName }) {
  const rarity = rarityClasses[product.rarity] ?? 'from-amber-300/25 via-red-500/15 to-transparent text-amber-100 shadow-amber-500/10';
  const discount = useMemo(() => {
    const current = Number(product.price.replace(/K/i, ''));
    const old = Number(product.originalPrice.replace(/K/i, ''));
    return old > current ? Math.round(((old - current) / old) * 100) : 0;
  }, [product.originalPrice, product.price]);

  return (
    <GlassCard className={`store-card min-h-full bg-gradient-to-br ${rarity}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-black/30"><Icon name={icon} className="h-8 w-8" /></div>
        <div className="text-right">
          <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-red-100">{product.badge}</span>
          {discount > 0 && <p className="mt-2 text-xs font-black text-emerald-100">Hemat {discount}%</p>}
        </div>
      </div>
      <p className="mt-7 text-xs font-black uppercase tracking-[0.32em] text-current">{product.rarity}</p>
      <h3 className="mt-2 text-2xl font-black text-white">{product.name}</h3>
      <div className="mt-4 flex items-end gap-3">
        <p className="text-4xl font-black text-amber-100">{product.price}</p>
        <p className="pb-1 text-lg font-black text-stone-500 line-through">{product.originalPrice}</p>
      </div>
      {product.features && (
        <ul className="mt-6 grid gap-2 text-sm font-semibold text-stone-300">
          {product.features.map((feature) => <li key={feature} className="flex items-center gap-2"><Icon name="check" className="h-4 w-4 text-emerald-200" />{feature}</li>)}
        </ul>
      )}
      <a href={whatsappMessage(product)} target="_blank" rel="noreferrer" className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 font-black text-black transition hover:scale-[1.02] hover:bg-amber-200">Beli via WhatsApp</a>
    </GlassCard>
  );
}

function Store() {
  const [active, setActive] = useState(storeCategories[0].id);
  const category = storeCategories.find((item) => item.id === active) ?? storeCategories[0];

  return (
    <section id="store" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="VOXEN SMP Store" title="Rank - Book - Skill." copy="Kategori store sudah dirapikan agar kamu cepat menemukan paket yang cocok untuk progres RPG-mu." />
        <div className="mb-8 grid gap-4 rounded-[2rem] border border-amber-200/15 bg-amber-300/10 p-5 md:grid-cols-3">
          {importantNotes.map((note) => <p key={note} className="flex items-center gap-3 font-bold text-amber-50"><Icon name="spark" className="h-5 w-5 text-amber-200" />{note}</p>)}
        </div>
        <div className="grid gap-6 lg:grid-cols-[18rem_1fr]">
          <aside className="h-fit rounded-[2rem] border border-white/10 bg-white/[0.04] p-3 backdrop-blur-2xl">
            {storeCategories.map((item) => (
              <button key={item.id} onClick={() => setActive(item.id)} className={`mb-2 flex w-full items-center gap-3 rounded-2xl px-4 py-4 text-left font-black transition ${active === item.id ? 'bg-amber-200 text-black shadow-[0_0_24px_rgba(251,191,36,.2)]' : 'text-stone-300 hover:bg-white/10 hover:text-white'}`}><Icon name={item.icon} className="h-5 w-5" />{item.label}</button>
            ))}
          </aside>
          <div>
            {category.note && <p className="mb-5 rounded-2xl border border-emerald-300/15 bg-emerald-400/10 px-5 py-4 font-bold text-emerald-100">Info: {category.note}</p>}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {category.items.map((item) => <ProductCard key={item.name} product={item} icon={category.icon} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section id="contact" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Hubungi Kami" title="Minat? Langsung hubungi." copy="Untuk pembelian, konfirmasi pembayaran, atau pertanyaan paket, hubungi Owner atau Admin resmi VOXEN SMP." />
        <div className="grid gap-5 md:grid-cols-2">
          <GlassCard>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-200">Owner</p>
            <h3 className="mt-3 text-3xl font-black text-white">Owner VOXEN SMP</h3>
            <p className="mt-4 leading-8 text-stone-400">Kontak utama untuk pembelian rank, armor, dan paket premium.</p>
            <a href={ownerWhatsapp} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-2xl bg-emerald-300 px-6 py-4 font-black text-black transition hover:scale-[1.03]">WhatsApp Owner</a>
          </GlassCard>
          <GlassCard>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-amber-200">Admin</p>
            <h3 className="mt-3 text-3xl font-black text-white">Admin Store</h3>
            <p className="mt-4 leading-8 text-stone-400">Bantuan cepat untuk cek item, pertanyaan contract, dan follow-up transaksi.</p>
            <a href={adminWhatsapp} target="_blank" rel="noreferrer" className="mt-7 inline-flex rounded-2xl bg-amber-200 px-6 py-4 font-black text-black transition hover:scale-[1.03]">WhatsApp Admin</a>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

function DiscordCTA() {
  return (
    <section className="px-5 py-20 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-6 rounded-[2.5rem] border border-indigo-300/20 bg-gradient-to-br from-indigo-500/15 via-black/30 to-amber-500/10 p-8 shadow-2xl shadow-black/30 backdrop-blur-2xl md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.3em] text-indigo-100">Gabung Komunitas</p>
          <h2 className="mt-3 text-4xl font-black text-white">Masuk Discord VOXEN SMP.</h2>
          <p className="mt-4 max-w-2xl leading-8 text-stone-300">Dapatkan pengumuman event, info restock, bantuan store, dan update season langsung dari komunitas.</p>
        </div>
        <a href={discordUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-200 px-7 py-4 font-black text-black transition hover:scale-[1.03]"><Icon name="discord" className="h-5 w-5" /> Gabung Discord</a>
      </div>
    </section>
  );
}

function DiscordFooter() {
  return (
    <footer id="discord" className="border-t border-white/10 px-5 py-16 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-amber-200/15 bg-white/[0.04] p-8 backdrop-blur-2xl md:grid-cols-[1.2fr_.8fr]">
        <div>
          <Image src="/brand/voxensmp-rpg-emblem.svg" alt="Logo VOXEN SMP" width={86} height={86} className="logo-glow" />
          <h2 className="mt-5 text-4xl font-black text-white">Mulai petualangan di VOXEN SMP.</h2>
          <p className="mt-4 max-w-2xl leading-8 text-stone-400">Masuk ke <span className="font-black text-amber-100">{server.ip}</span>, gabung Discord, dan simpan bukti transaksi setiap pembelian store.</p>
          <p className="mt-4 text-sm text-stone-500">Kami tidak berafiliasi dengan Mojang atau Microsoft.</p>
        </div>
        <div className="grid content-center gap-4">
          <StatusCard compact />
          <a href={discordUrl} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-200 to-emerald-300 px-6 py-4 font-black text-black"><Icon name="discord" className="h-5 w-5" /> Discord VOXEN SMP</a>
          <a href="#contact" className="inline-flex items-center justify-center rounded-2xl border border-white/10 px-6 py-4 font-black text-white hover:bg-white/10">Kontak Owner & Admin</a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-7xl text-sm text-stone-600">By Team VoxenSMP 2025 - 2026</p>
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
      <LoginPanel />
      <StaffSection />
      <Store />
      <ContactSection />
      <DiscordCTA />
      <DiscordFooter />
    </main>
  );
}
