'use client';

import { useEffect, useMemo, useState } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { SectionHeader } from '@/components/SectionHeader';
import { communities, features, leaderboards, navLinks, server, storeItems } from '@/lib/data';
import type { IconName } from '@/lib/data';


function Icon({ name, className = '' }: { name: IconName; className?: string }) {
  const paths: Record<IconName, string> = {
    'arrow': 'M5 12h14m-6-6 6 6-6 6', 'bag': 'M6 8h12l-1 12H7L6 8Zm3 0a3 3 0 0 1 6 0', 'badge-dollar': 'M12 3l8 4v6c0 5-3.5 8-8 8s-8-3-8-8V7l8-4Zm0 5v8m3-6c-1.2-1-4-1-4 .8 0 2 4 1 4 3.2 0 2-3 2-5 1', 'boxes': 'M4 7l4-2 4 2-4 2-4-2Zm8 0l4-2 4 2-4 2-4-2ZM4 13l4-2 4 2-4 2-4-2Zm8 0l4-2 4 2-4 2-4-2Zm-4-4v6m8-6v6', 'castle': 'M5 21V9h3V5h2v4h4V5h2v4h3v12H5Zm4 0v-5a3 3 0 0 1 6 0v5', 'check': 'M5 13l4 4L19 7', 'chevron': 'M9 6l6 6-6 6', 'circle': 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z', 'clipboard': 'M9 4h6l1 2h3v15H5V6h3l1-2Zm0 4h6', 'crown': 'M3 8l5 4 4-7 4 7 5-4-2 11H5L3 8Z', 'diamond': 'M6 3h12l4 6-10 12L2 9l4-6Z', 'external': 'M14 3h7v7m0-7-9 9M5 7v12h12', 'fish': 'M3 12s4-6 10-6c4 0 7 3 8 6-1 3-4 6-8 6-6 0-10-6-10-6Zm0 0-2-3v6l2-3Zm13 0h.01', 'gem': 'M6 3h12l4 6-10 12L2 9l4-6Z', 'menu': 'M4 7h16M4 12h16M4 17h16', 'pickaxe': 'M14 4l6 6M4 20 16-16M12 6c-3-2-6-2-8 0 4 0 6 2 8 4', 'server': 'M4 5h16v6H4V5Zm0 8h16v6H4v-6Zm3-5h.01M7 16h.01', 'shield': 'M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Z', 'shield-check': 'M12 3l8 4v5c0 5-3.4 8-8 9-4.6-1-8-4-8-9V7l8-4Zm-3 9 2 2 4-5', 'sparkles': 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Zm6 11 1 3 3 1-3 1-1 3-1-3-3-1 3-1 1-3Z', 'swords': 'M14 4l6 6M20 4l-6 6M4 20l7-7M4 14l6 6M10 14l-6 6', 'trophy': 'M8 4h8v4a4 4 0 0 1-8 0V4Zm0 2H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4m-4 0v5m-4 3h8', 'users': 'M16 21v-2a4 4 0 0 0-8 0v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm6 1a3 3 0 0 1 3 3v2M18 4a3 3 0 0 1 0 6', 'vote': 'M9 12l2 2 4-5M4 13h4l2 4h4l2-4h4v8H4v-8Zm2-9h12v9H6V4Z', 'wand': 'M4 20 20 4M15 4l5 5M6 4l1 2 2 1-2 1-1 2-1-2-2-1 2-1 1-2', 'x': 'M6 6l12 12M18 6 6 18', 'zap': 'M13 2 4 14h7l-1 8 10-13h-7l0-7Z'
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d={paths[name]} /></svg>;
}

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${isScrolled ? 'border-b border-white/10 bg-slate-950/60 shadow-2xl shadow-purple-950/20 backdrop-blur-2xl' : 'bg-transparent'}`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <a href="#home" className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-purple-500 to-cyan-300 font-black text-slate-950 shadow-lg shadow-cyan-500/30">V</span>
          <span className="text-xl font-black tracking-wider text-white">Voxen<span className="text-cyan-300">SMP</span></span>
        </a>
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <a key={link} href={`#${link.toLowerCase()}`} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white">
              {link}
            </a>
          ))}
        </div>
        <a href="#store" className="hidden rounded-full bg-white px-5 py-2.5 text-sm font-black text-slate-950 shadow-lg shadow-cyan-400/20 transition hover:scale-105 hover:bg-cyan-200 lg:inline-flex">
          Join Network
        </a>
        <button aria-label="Toggle navigation" onClick={() => setOpen((v) => !v)} className="rounded-2xl border border-white/10 bg-white/10 p-3 text-white lg:hidden">
          {open ? <Icon name="x" className="h-5 w-5" /> : <Icon name="menu" className="h-5 w-5" />}
        </button>
      </nav>
      {open && (
          <div className="mx-5 mb-4 rounded-3xl border border-white/10 bg-slate-950/90 p-3 backdrop-blur-xl lg:hidden">
            {navLinks.map((link) => (
              <a onClick={() => setOpen(false)} key={link} href={`#${link.toLowerCase()}`} className="block rounded-2xl px-4 py-3 font-semibold text-slate-200 hover:bg-white/10">
                {link}
              </a>
            ))}
          </div>
        )}
    </header>
  );
}

function Hero() {
  const [copied, setCopied] = useState(false);
  const particles = useMemo(() => Array.from({ length: 44 }, (_, i) => ({ id: i, left: `${(i * 37) % 100}%`, delay: `${(i % 11) * -0.8}s`, duration: `${8 + (i % 7)}s`, size: 2 + (i % 4) })), []);

  const copyIp = async () => {
    await navigator.clipboard.writeText(server.ip);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden px-5 pt-28 lg:px-8">
      <div className="grid-overlay absolute inset-0" />
      <div className="noise-overlay absolute inset-0" />
      <div className="absolute left-1/2 top-20 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-purple-500/20 blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-10 right-0 h-[28rem] w-[28rem] rounded-full bg-cyan-400/20 blur-[110px]" />
      {particles.map((p) => (
        <span key={p.id} className="particle absolute bottom-[-5rem] rounded-sm bg-cyan-200/70 shadow-[0_0_16px_rgba(34,211,238,.8)]" style={{ left: p.left, width: p.size, height: p.size, '--delay': p.delay, '--duration': p.duration } as React.CSSProperties} />
      ))}
      <div className="absolute right-[8%] top-[22%] hidden h-24 w-24 rotate-12 rounded-[1.6rem] border border-cyan-300/25 bg-cyan-300/10 backdrop-blur-xl animate-floaty lg:block" />
      <div className="absolute bottom-[18%] left-[7%] hidden h-20 w-20 -rotate-12 rounded-[1.2rem] border border-purple-300/25 bg-purple-400/10 backdrop-blur-xl animate-floaty lg:block" style={{ animationDelay: '-2s' }} />

      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1.08fr_.92fr]">
        <div className="animate-fade-up">
          <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-bold text-emerald-200">
            <span className="relative flex h-3 w-3"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" /><span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-300" /></span>
            Online • Minecraft {server.version}
          </div>
          <h1 className="minecraft-title text-6xl font-black leading-none tracking-[-0.08em] text-white sm:text-7xl md:text-8xl xl:text-9xl">
            VOXEN<span className="block bg-gradient-to-r from-purple-300 via-white to-cyan-200 bg-clip-text text-transparent">SMP</span>
          </h1>
          <p className="mt-6 max-w-2xl text-xl font-semibold leading-9 text-slate-200 md:text-2xl">
            Modern Economy Crystal PvP Survival Server
          </p>
          <p className="mt-3 max-w-2xl text-base leading-8 text-slate-400 md:text-lg">
            Competitive survival, premium economy loops, elite clan warfare, and a polished community ecosystem for players who want a serious Minecraft network.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <button onClick={copyIp} className="glow-border relative flex items-center justify-between gap-5 rounded-2xl bg-slate-950/70 px-5 py-4 text-left shadow-2xl shadow-cyan-500/10 backdrop-blur-xl transition hover:scale-[1.02] sm:min-w-80">
              <span><span className="block text-xs font-bold uppercase tracking-[0.3em] text-slate-400">Server IP</span><span className="text-2xl font-black text-white">{server.ip}</span></span>
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-cyan-300 text-slate-950">{copied ? <Icon name="check" /> : <Icon name="clipboard" />}</span>
            </button>
            <a href="#vote" className="rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-300 px-7 py-4 text-center font-black text-slate-950 shadow-xl shadow-purple-500/30 transition hover:scale-105">Play Now</a>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            {[['Vote Server', 'vote'], ['Store', 'bag'], ['Community', 'users']].map(([label, icon]) => (
              <a key={label as string} href={`#${String(label).split(' ')[0].toLowerCase()}`} className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm font-bold text-slate-200 transition hover:border-cyan-300/40 hover:bg-cyan-300/10">
                <Icon name={icon as IconName} className="h-4 w-4" /> {label}
              </a>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-br from-purple-500/30 to-cyan-300/20 blur-3xl" />
          <div className="glow-border relative overflow-hidden rounded-[2.25rem] bg-slate-950/65 p-6 backdrop-blur-2xl">
            <div className="mb-5 flex items-center justify-between">
              <div><p className="text-sm uppercase tracking-[0.35em] text-cyan-200">Live Network</p><h3 className="mt-2 text-3xl font-black text-white">312 Players</h3></div>
              <Icon name="circle" className="text-emerald-300" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {[['TPS', '20.0'], ['Version', server.version], ['Mode', 'Crystal PvP'], ['Uptime', '99.9%']].map(([k, v]) => (
                <div key={k} className="rounded-3xl border border-white/10 bg-white/[0.06] p-5"><p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">{k}</p><p className="mt-2 text-2xl font-black text-white">{v}</p></div>
              ))}
            </div>
            <div className="mt-5 rounded-3xl border border-purple-300/15 bg-gradient-to-br from-purple-500/15 to-cyan-300/10 p-5">
              <div className="flex items-center gap-4"><Icon name="server" className="text-cyan-200" /><div><h4 className="font-black text-white">Competitive Survival Queue</h4><p className="text-sm text-slate-400">Season 04 • Economy reset protected • Clan wars enabled</p></div></div>
            </div>
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
        <SectionHeader eyebrow="Network Systems" title="Feature-rich survival, built premium." copy="Every system is tuned for competitive progression, clean economy balance, and a high-end player experience." />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <GlassCard key={feature.title}>
              <Icon name={feature.icon} className="mb-6 h-11 w-11 text-cyan-200" />
              <h3 className="text-xl font-black text-white">{feature.title}</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">{feature.detail}</p>
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
        <SectionHeader eyebrow="Community Core" title="Guilds, clans, posts, and staff in one hub." copy="VoxenSMP is designed around social progression: build teams, recruit talent, publish updates, and get support fast." />
        <div className="grid gap-6 lg:grid-cols-4">
          {communities.map((item, idx) => (
            <GlassCard key={item.title} className={idx === 0 ? 'lg:col-span-2' : ''}>
              <Icon name={item.icon} className="h-10 w-10 text-purple-200" />
              <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-cyan-200">{item.value}</p>
              <h3 className="mt-2 text-2xl font-black text-white">{item.title}</h3>
              <p className="mt-3 leading-7 text-slate-400">{item.copy}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function Leaderboard() {
  const toneClass = { gold: 'from-amber-300 to-yellow-600', silver: 'from-slate-200 to-slate-500', bronze: 'from-orange-300 to-amber-800' };
  return (
    <section id="leaderboard" className="px-5 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeader eyebrow="Season Rankings" title="Live competitive leaderboard." copy="Animated ranking cards spotlight the economy kings, PvP legends, grinders, and dominant clans of the current season." />
        <div className="grid gap-6 lg:grid-cols-2">
          {leaderboards.map((board) => (
            <GlassCard key={board.title}>
              <div className="mb-6 flex items-center gap-3"><Icon name={board.icon} className="text-cyan-200" /><h3 className="text-2xl font-black text-white">{board.title}</h3></div>
              <div className="space-y-3">
                {board.players.map((player, i) => (
                  <div key={player.name} className="flex items-center gap-4 rounded-3xl border border-white/10 bg-slate-950/35 p-4">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${toneClass[player.tone as keyof typeof toneClass]} font-black text-slate-950`}>#{i + 1}</div>
                    <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-purple-400/30 to-cyan-300/30 text-lg">🧑</div>
                    <div className="min-w-0 flex-1"><p className="truncate font-black text-white">{player.name}</p><p className="text-sm text-slate-500">Minecraft player head</p></div>
                    <p className="font-black text-cyan-200">{player.score}</p>
                  </div>
                ))}
              </div>
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
        <SectionHeader eyebrow="Premium Store" title="Ranks, crate keys, and cosmetics." copy="Polished monetization cards highlight premium upgrades without sacrificing competitive integrity." />
        <div className="grid gap-6 lg:grid-cols-3">
          {storeItems.map((item, idx) => (
            <GlassCard key={item.name} className={idx === 0 ? 'lg:scale-105' : ''}>
              <div className="flex items-start justify-between"><Icon name={item.icon} className="h-12 w-12 text-cyan-200" /><span className="rounded-full bg-purple-400/15 px-3 py-1 text-xs font-black text-purple-100">{item.tag}</span></div>
              <h3 className="mt-7 text-3xl font-black text-white">{item.name}</h3>
              <p className="mt-2 text-4xl font-black text-cyan-200">{item.price}</p>
              <ul className="mt-6 space-y-3">
                {item.perks.map((perk) => <li key={perk} className="flex items-center gap-3 text-slate-300"><Icon name="check" className="h-4 w-4 text-emerald-300" />{perk}</li>)}
              </ul>
              <button className="mt-8 w-full rounded-2xl bg-white py-4 font-black text-slate-950 transition hover:scale-[1.02] hover:bg-cyan-200">Purchase <Icon name="arrow" className="ml-2 inline h-4 w-4" /></button>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}

function VoteWiki() {
  return (
    <section id="vote" className="px-5 py-20 lg:px-8">
      <div id="wiki" className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
        <GlassCard><Icon name="vote" className="h-10 w-10 text-cyan-200" /><h2 className="mt-5 text-4xl font-black text-white">Vote Server</h2><p className="mt-3 leading-8 text-slate-400">Boost VoxenSMP rankings, earn keys, and unlock daily streak multipliers.</p><a className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-purple-500 to-cyan-300 px-6 py-3 font-black text-slate-950" href="#home">Vote Now <Icon name="external" className="h-4 w-4" /></a></GlassCard>
        <GlassCard><Icon name="shield-check" className="h-10 w-10 text-purple-200" /><h2 className="mt-5 text-4xl font-black text-white">Wiki</h2><p className="mt-3 leading-8 text-slate-400">Learn crystals, clan rules, economy routes, custom enchants, dungeons, and safe trading standards.</p><a className="mt-6 inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/10 px-6 py-3 font-black text-white" href="#features">Explore Wiki <Icon name="chevron" className="h-4 w-4" /></a></GlassCard>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 px-5 py-12 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-4">
        <div className="md:col-span-2"><h2 className="text-3xl font-black text-white">Voxen<span className="text-cyan-300">SMP</span></h2><p className="mt-3 max-w-md text-slate-400">{server.theme}. Join at <span className="font-bold text-cyan-200">{server.ip}</span>.</p></div>
        <div><h3 className="font-black text-white">Quick Links</h3><div className="mt-3 grid gap-2 text-slate-400">{navLinks.slice(1).map((n) => <a key={n} href={`#${n.toLowerCase()}`} className="hover:text-cyan-200">{n}</a>)}</div></div>
        <div><h3 className="font-black text-white">Status</h3><p className="mt-3 flex items-center gap-2 text-emerald-300"><span className="h-2 w-2 rounded-full bg-emerald-300" />Online</p><p className="mt-2 text-slate-400">Discord • TikTok • YouTube</p></div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-sm text-slate-600">© 2026 VoxenSMP. Not affiliated with Mojang or Microsoft.</p>
    </footer>
  );
}

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Features />
      <Community />
      <Leaderboard />
      <Store />
      <VoteWiki />
      <Footer />
    </main>
  );
}
