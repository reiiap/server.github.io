export type IconName =
  | 'arrow' | 'bag' | 'badge-dollar' | 'boxes' | 'castle' | 'check' | 'chevron' | 'circle'
  | 'clipboard' | 'crown' | 'diamond' | 'external' | 'fish' | 'gem' | 'menu' | 'pickaxe'
  | 'server' | 'shield' | 'shield-check' | 'sparkles' | 'swords' | 'trophy' | 'users'
  | 'vote' | 'wand' | 'x' | 'zap';

export const server = {
  name: 'VoxenSMP',
  ip: 'voxensmp.xyz',
  version: '1.21+',
  genre: 'Economy Crystal PvP Survival',
  theme: 'Competitive Survival + Modern Community',
};

export const navLinks = ['Home', 'Features', 'Community', 'Leaderboard', 'Store', 'Vote', 'Wiki'];

export const features: { title: string; icon: IconName; detail: string }[] = [
  { title: 'Economy System', icon: 'badge-dollar', detail: 'Smart market loops, jobs, trading routes, and vault progression built for long-term survival.' },
  { title: 'Crystal PvP', icon: 'gem', detail: 'Low-latency arenas, ranked kits, safe practice zones, and competitive seasonal rewards.' },
  { title: 'Dungeons', icon: 'castle', detail: 'Mythic rooms, custom bosses, rare loot tables, and party-ready combat encounters.' },
  { title: 'Skills', icon: 'pickaxe', detail: 'Level combat, mining, farming, fishing, and utility skills with prestige milestones.' },
  { title: 'Auction House', icon: 'boxes', detail: 'Premium marketplace UI for flipping resources, gear, cosmetics, and player services.' },
  { title: 'Fishing System', icon: 'fish', detail: 'Biome-specific catches, tournaments, relic rods, and economy-linked fishing events.' },
  { title: 'Custom Enchants', icon: 'wand', detail: 'Balanced enchant meta with discoverable books, forge upgrades, and risk-based crafting.' },
  { title: 'Player Warps', icon: 'zap', detail: 'Showcase shops, clan bases, farms, and public builds with curated warp discovery.' },
];

export const communities: { title: string; value: string; icon: IconName; copy: string }[] = [
  { title: 'Guild Showcase', value: '42 Guilds', icon: 'shield', copy: 'Verified guild pages, territories, achievements, and seasonal identity badges.' },
  { title: 'Clan Recruitment', value: '18 Open', icon: 'swords', copy: 'Find PvP squads, economy cartels, builders, and casual survival teams.' },
  { title: 'Community Posts', value: 'Daily Drops', icon: 'sparkles', copy: 'Patch notes, event recaps, market alerts, and player-led announcements.' },
  { title: 'Staff Team', value: '24/7 Support', icon: 'users', copy: 'Dedicated moderation, helper onboarding, and transparent ticket escalation.' },
];

export const leaderboards: { title: string; icon: IconName; players: { name: string; score: string; tone: 'gold' | 'silver' | 'bronze' }[] }[] = [
  { title: 'Top Balance', icon: 'badge-dollar', players: [{ name: 'AstraVault', score: '$18.4M', tone: 'gold' }, { name: 'CypherMC', score: '$14.9M', tone: 'silver' }, { name: 'NexaTrades', score: '$12.1M', tone: 'bronze' }] },
  { title: 'Top Kills', icon: 'swords', players: [{ name: 'CrystalRift', score: '2,941', tone: 'gold' }, { name: 'VoidCombo', score: '2,604', tone: 'silver' }, { name: 'PearlFang', score: '2,388', tone: 'bronze' }] },
  { title: 'Top Playtime', icon: 'trophy', players: [{ name: 'QuartzNomad', score: '612h', tone: 'gold' }, { name: 'EchoMiner', score: '589h', tone: 'silver' }, { name: 'Vexel', score: '544h', tone: 'bronze' }] },
  { title: 'Top Clan', icon: 'crown', players: [{ name: 'Obsidian Syndicate', score: '91K', tone: 'gold' }, { name: 'Prism Order', score: '84K', tone: 'silver' }, { name: 'Nether Circuit', score: '79K', tone: 'bronze' }] },
];

export const storeItems: { name: string; price: string; tag: string; icon: IconName; perks: string[] }[] = [
  { name: 'Voxen Elite', price: '$19.99', tag: 'Best Value', icon: 'crown', perks: ['Priority queue', 'Monthly crate bundle', 'Premium cosmetics', 'Elite chat flair'] },
  { name: 'Crystal Keys', price: '$7.99', tag: 'Hot Drop', icon: 'diamond', perks: ['10x premium keys', 'Seasonal loot', 'Rare enchants', 'Cosmetic trails'] },
  { name: 'Aura Cosmetics', price: '$4.99', tag: 'Style', icon: 'sparkles', perks: ['Particle aura', 'Kill effects', 'Join animation', 'Name glow'] },
];
