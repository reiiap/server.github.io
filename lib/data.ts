export type IconName =
  | 'book'
  | 'boss'
  | 'check'
  | 'chevron'
  | 'coins'
  | 'contract'
  | 'copy'
  | 'discord'
  | 'emerald'
  | 'flame'
  | 'menu'
  | 'rank'
  | 'shield'
  | 'spark'
  | 'staff'
  | 'sword'
  | 'wand'
  | 'x';

export const server = {
  name: 'VoxenSMP',
  ip: 'voxensmp.xyz',
  version: '1.21+',
  title: 'VOXENSMP — LEGENDS RPG SURVIVAL',
  subtitle: 'Every weapon has a story.',
};

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'Weapons', href: '#weapons' },
  { label: 'Staff', href: '#staff' },
  { label: 'Store', href: '#store' },
  { label: 'Discord', href: '#discord' },
];

export const features: { title: string; icon: IconName; detail: string }[] = [
  { title: 'Legends Weapons', icon: 'sword', detail: 'Mythic blades, divine relics, soulbound upgrades, and weapon stories that evolve with your survival journey.' },
  { title: 'Custom Skills', icon: 'wand', detail: 'Combat, mining, forging, fishing, and arcane talents with RPG-style milestones and meaningful mastery rewards.' },
  { title: 'RPG Progression', icon: 'emerald', detail: 'Quest paths, economy growth, contracts, dungeons, and seasonal goals built for long-term character progression.' },
  { title: 'Boss Dungeons', icon: 'boss', detail: 'Cinematic raid arenas, elite mobs, loot tables, dungeon keys, and boss mechanics for coordinated parties.' },
  { title: 'Contracts System', icon: 'contract', detail: 'Hunt targets, complete bounty scrolls, unlock relic lore, and earn rare currency through risk-based objectives.' },
  { title: 'Competitive PvP', icon: 'shield', detail: 'Crystal PvP pressure, arena duels, clan rivalry, and balanced combat rewards for high-skill players.' },
];

export const weapons = [
  { name: 'Mythic Weapons', rarity: 'Mythic', icon: 'sword' as IconName, accent: 'gold', detail: 'Rare forged weapons with animated glows, progression tiers, and battle-defining passives.' },
  { name: 'Divine Weapons', rarity: 'Divine', icon: 'spark' as IconName, accent: 'emerald', detail: 'End-game relics designed for legends who master dungeons, contracts, and PvP seasons.' },
  { name: 'Legendary Contracts', rarity: 'Legendary', icon: 'contract' as IconName, accent: 'crimson', detail: 'High-risk scrolls that unlock boss hunts, bounty chains, and exclusive weapon lore.' },
  { name: 'Custom Skills', rarity: 'Ascended', icon: 'wand' as IconName, accent: 'violet', detail: 'Skill trees that transform your loadout and give your character a distinct survival identity.' },
];

export const staff = [
  { username: 'Notch', role: 'Owner', badge: 'Crimson Crown' },
  { username: 'Jeb_', role: 'Admin', badge: 'Emerald Council' },
  { username: 'Dinnerbone', role: 'Developer', badge: 'Arcane Forge' },
  { username: 'Grumm', role: 'Moderator', badge: 'Obsidian Watch' },
];

export const storeCategories = [
  {
    id: 'balance',
    label: 'Balance',
    icon: 'coins' as IconName,
    items: [
      { name: '50K Gold Balance', price: '$4.99', rarity: 'Common', badge: 'Starter' },
      { name: '250K Royal Treasury', price: '$14.99', rarity: 'Rare', badge: 'Best Seller' },
      { name: '1M Kingdom Vault', price: '$39.99', rarity: 'Epic', badge: 'Limited' },
    ],
  },
  {
    id: 'rank',
    label: 'Rank',
    icon: 'rank' as IconName,
    items: [
      { name: 'Knight Rank', price: '$9.99', rarity: 'Rare', badge: 'Popular' },
      { name: 'Elite Rank', price: '$19.99', rarity: 'Epic', badge: 'Best Seller' },
      { name: 'Mythic Rank', price: '$34.99', rarity: 'Mythic', badge: 'Premium' },
      { name: 'Divine Rank', price: '$59.99', rarity: 'Divine', badge: 'Limited' },
    ],
  },
  {
    id: 'contracts',
    label: 'Contract Book',
    icon: 'book' as IconName,
    items: [
      { name: 'Hunter Contract Book', price: '$6.99', rarity: 'Rare', badge: 'PvE' },
      { name: 'Legend Contract Book', price: '$16.99', rarity: 'Legendary', badge: 'Limited' },
      { name: 'Divine Contract Codex', price: '$29.99', rarity: 'Divine', badge: 'Best Seller' },
    ],
  },
  {
    id: 'skills',
    label: 'Skills',
    icon: 'wand' as IconName,
    items: [
      { name: 'Skill Per Level', price: '$2.99', rarity: 'Common', badge: 'Upgrade' },
      { name: 'Max Level Bundle', price: '$24.99', rarity: 'Mythic', badge: 'Best Seller' },
      { name: 'Arcane Reset Token', price: '$7.99', rarity: 'Epic', badge: 'Utility' },
    ],
  },
];
