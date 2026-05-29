export type IconName =
  | 'auction'
  | 'badge'
  | 'bolt'
  | 'castle'
  | 'check'
  | 'chevron'
  | 'clan'
  | 'clipboard'
  | 'coins'
  | 'crystal'
  | 'discord'
  | 'external'
  | 'fish'
  | 'flame'
  | 'gem'
  | 'hammer'
  | 'login'
  | 'menu'
  | 'scroll'
  | 'shield'
  | 'skull'
  | 'spark'
  | 'sword'
  | 'trade'
  | 'user'
  | 'wand'
  | 'x';

export const server = {
  name: 'VoxenSMP',
  ip: 'voxensmp.xyz',
  version: '1.21+',
  genres: ['Economy Survival', 'Crystal PvP'],
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Systems', href: '#features' },
  { label: 'Status', href: '#status' },
  { label: 'Armory', href: '#armory' },
  { label: 'Community', href: '#community' },
  { label: 'Store', href: '#store' },
  { label: 'Login', href: '#login' },
];

export const featureCards: { title: string; tag: string; icon: IconName; detail: string }[] = [
  { title: 'Economy Survival', tag: 'Marketplace MMO', icon: 'coins', detail: 'Player-driven wealth, protected trade routes, shops, jobs, auctions, and progression designed for long seasons.' },
  { title: 'Crystal PvP', tag: 'Competitive Combat', icon: 'crystal', detail: 'Fast arenas, lethal crystal meta, clan skirmishes, ranking pressure, and kits tuned for serious fighters.' },
  { title: 'Legendary Weapons', tag: 'Mythic Gear', icon: 'sword', detail: 'Earn named relic blades, crystal-forged bows, rarity tiers, upgrade trees, and prestige weapon cosmetics.' },
  { title: 'Dungeon Raids', tag: 'Dark Fantasy PvE', icon: 'castle', detail: 'Party raids with boss mechanics, relic drops, elite mobs, dungeon keys, and survival kingdom lore.' },
  { title: 'Clan Wars', tag: 'Territory Conflict', icon: 'clan', detail: 'Build alliances, declare rivals, defend vaults, and dominate server-wide competitive events.' },
  { title: 'Skills System', tag: 'Progression', icon: 'badge', detail: 'Level combat, mining, fishing, farming, and utility skills with meaningful boosts and prestige paths.' },
  { title: 'Auction House', tag: 'High-end Trading', icon: 'auction', detail: 'Flip gear, resources, relics, cosmetics, and rare enchants through a clean economy interface.' },
  { title: 'Fishing System', tag: 'Relaxed Profit', icon: 'fish', detail: 'Biome catches, tournament rotations, rare fish, custom rods, and economy-connected rewards.' },
  { title: 'Trading System', tag: 'Secure Exchange', icon: 'trade', detail: 'Trade coins, weapons, keys, and resources safely without scams or messy drop trades.' },
  { title: 'Custom Enchants', tag: 'Arcane Forge', icon: 'wand', detail: 'Balanced enchantments, crystal dust upgrades, forge risks, and loadouts for PvP and survival.' },
];

export const armory = [
  { name: 'Aetherfang', rarity: 'Legendary Sword', accent: 'cyan', copy: 'Crystal-edged blade designed for high-pressure PvP and clan war finishers.' },
  { name: 'Void Ledger', rarity: 'Economy Relic', accent: 'purple', copy: 'A royal artifact that amplifies trading prestige and market dominance.' },
  { name: 'Nether Pike', rarity: 'Dungeon Drop', accent: 'rose', copy: 'Boss-forged weapon for raiders who survive the deepest Voxen dungeons.' },
];

export const communityPanels: { title: string; icon: IconName; copy: string }[] = [
  { title: 'Clan Showcase', icon: 'shield', copy: 'Spotlight dominant clans, recruitment windows, territories, achievements, and seasonal rivalries.' },
  { title: 'Guild Showcase', icon: 'clan', copy: 'Economy guilds, builders, raiders, grinders, and casual groups get clean profile cards.' },
  { title: 'Top PvP Players', icon: 'skull', copy: 'When database leaderboards are connected, this panel can surface kill leaders and duel legends.' },
  { title: 'Richest Players', icon: 'coins', copy: 'Designed for synced balance rankings from the server economy database.' },
  { title: 'Featured Builds', icon: 'castle', copy: 'Showcase survival kingdoms, bases, shops, war rooms, and community megaprojects.' },
  { title: 'Community Events', icon: 'flame', copy: 'Announce KOTH, fishing tournaments, dungeon races, economy resets, and clan war nights.' },
  { title: 'Staff Team', icon: 'user', copy: 'Display helpers, moderators, admins, and escalation paths with professional support UI.' },
  { title: 'Announcements', icon: 'scroll', copy: 'Patch notes, balance changes, marketplace updates, rules, and server-wide news.' },
];

export const storeItems = [
  { name: 'Voxen Warlord', price: 'Premium Rank', icon: 'sword' as IconName, perks: ['Priority access', 'Rank cosmetics', 'Monthly keys', 'Premium chat identity'] },
  { name: 'Crystal Key Bundle', price: 'Crate Pack', icon: 'crystal' as IconName, perks: ['Mythic crates', 'Relic chances', 'Cosmetic trails', 'Seasonal rewards'] },
  { name: 'Kingdom Cosmetics', price: 'Style Pack', icon: 'spark' as IconName, perks: ['Auras', 'Kill effects', 'Join effects', 'Name glow'] },
];
