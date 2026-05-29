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

export type TokoProduct = {
  name: string;
  price: string;
  oldPrice: string;
  rarity: string;
  badge: string;
  perks?: string[];
};

export const discordUrl = 'http://dsc.gg/voxensmp';

export const contacts = {
  owner: {
    label: 'Owner',
    name: 'Owner VoxenSMP',
    url: 'https://wa.me/6285728148809',
  },
  admin: {
    label: 'Admin',
    name: 'Admin VoxenSMP',
    url: 'https://wa.me/6281553480217',
  },
};

export const server = {
  name: 'VoxenSMP',
  ip: 'voxensmp.xyz',
  version: '1.21+',
  title: 'VOXEN SMP',
  subtitle: 'RANK - BOOK - SKILL',
};

export const navLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Fitur', href: '#features' },
  { label: 'Relik', href: '#weapons' },
  { label: 'Tim', href: '#staff' },
  { label: 'Toko', href: '#store' },
  { label: 'Kontak', href: '#contact' },
];

export const features: { title: string; icon: IconName; detail: string }[] = [
  { title: 'Senjata Legenda', icon: 'sword', detail: 'Blade mythic, relik divine, upgrade soulbound, dan cerita senjata yang berkembang bersama perjalanan survival kamu.' },
  { title: 'Skill Custom', icon: 'wand', detail: 'Combat, mining, forging, fishing, dan talent arcane dengan milestone RPG serta reward mastery yang terasa berharga.' },
  { title: 'Progress RPG', icon: 'emerald', detail: 'Quest, ekonomi, contract, dungeon, dan target season disusun untuk progres karakter jangka panjang.' },
  { title: 'Boss Dungeon', icon: 'boss', detail: 'Arena raid sinematik, elite mob, loot table, dungeon key, dan mekanik boss untuk party yang kompak.' },
  { title: 'Sistem Contract', icon: 'contract', detail: 'Ambil target hunt, selesaikan bounty scroll, buka lore relik, dan dapatkan currency langka lewat misi penuh risiko.' },
  { title: 'PvP Kompetitif', icon: 'shield', detail: 'Arena duel, rivalitas clan, tekanan crystal PvP, dan reward combat yang seimbang untuk pemain ber-skill tinggi.' },
];

export const weapons = [
  { name: 'Senjata Mythic', rarity: 'Mythic', icon: 'sword' as IconName, accent: 'gold', detail: 'Senjata langka dengan glow premium, tier progresi, dan passive yang bisa mengubah arah battle.' },
  { name: 'Divine Relic', rarity: 'Divine', icon: 'spark' as IconName, accent: 'emerald', detail: 'Relik end-game untuk legend yang menguasai dungeon, contract, dan pertarungan season.' },
  { name: 'Contract Legend', rarity: 'Legendary', icon: 'contract' as IconName, accent: 'crimson', detail: 'Scroll high-risk untuk membuka boss hunt, rantai bounty, dan lore eksklusif.' },
  { name: 'Ascended Skill', rarity: 'Ascended', icon: 'wand' as IconName, accent: 'violet', detail: 'Skill tree yang membentuk loadout dan memberi identitas survival berbeda untuk karakter kamu.' },
];

export const staff: { username: string | null; role: string; badge: string; quota?: string }[] = [
  { username: 'Syanzx777', role: 'Owner', badge: 'Pendiri Realm' },
  { username: 'ZenTheMonarch', role: 'CEO', badge: 'Dewan Monarch' },
  { username: 'yinz', role: 'Supervisor', badge: 'Lead Operasional' },
  { username: 'ReiiAp', role: 'H.Developer', badge: 'Arsitek Utama' },
  { username: 'NabilEmon', role: 'Developer', badge: 'Forge Sistem' },
  { username: 'KunZzdev', role: 'Admin', badge: 'Dewan Admin', quota: '2/3' },
  { username: 'ryw', role: 'Admin', badge: 'Dewan Admin', quota: '0/3' },
  { username: 'Kyenzx', role: 'N.Admin', badge: 'Novice Admin', quota: '2/3' },
  { username: 'aufar', role: 'N.Admin', badge: 'Novice Admin', quota: '0/3' },
  { username: 'EvanCPM', role: 'N.Admin', badge: 'Novice Admin', quota: '0/3' },
  { username: null, role: 'Moderator', badge: 'Kosong' },
  { username: null, role: 'Staf', badge: 'Kosong' },
  { username: 'RusdiSetengah', role: 'N.Staf', badge: 'Novice Staf', quota: '0/3' },
  { username: null, role: 'Helper', badge: 'Kosong' },
];

export const storeCategories: { id: string; label: string; icon: IconName; info?: string; items: TokoProduct[] }[] = [
  {
    id: 'rank',
    label: 'Rank',
    icon: 'rank',
    items: [
      { name: 'Darkness', price: '150K', oldPrice: '160K', rarity: 'Darkness', badge: 'Diskon', perks: ['Sethome 50', '/fly', '/enderchest', '/anvil', '/repair', '/tpdeny', '/nick', '/ptime'] },
      { name: 'Mythic', price: '100K', oldPrice: '120K', rarity: 'Mythic', badge: 'Premium', perks: ['Sethome 30', '/fly', '/enderchest', '/anvil', '/repair', '/craft', '/hat', '/pweather'] },
      { name: 'Victorium', price: '50K', oldPrice: '70K', rarity: 'Epic', badge: 'Value', perks: ['Sethome 15', '/fly', '/enderchest', '/anvil', '/craft', '/hat'] },
      { name: 'Knight', price: '30K', oldPrice: '40K', rarity: 'Rare', badge: 'Populer', perks: ['Sethome 8', '/enderchest', '/anvil', '/craft', '/hat'] },
      { name: 'Elite', price: '15K', oldPrice: '25K', rarity: 'Uncommon', badge: 'Starter', perks: ['Sethome 6', '/hat', '/craft'] },
      { name: 'Prime', price: '10K', oldPrice: '17K', rarity: 'Common', badge: 'Hemat', perks: ['Sethome 4', '/craft'] },
    ],
  },
  {
    id: 'book-contract',
    label: 'Book & Contract',
    icon: 'book',
    info: 'SL Req = Pilih 1 skill sesuai tipe contract (bisa dari gacha).',
    items: [
      { name: 'Basic + SL Req', price: '15K', oldPrice: '30K', rarity: 'Basic', badge: 'Paket' },
      { name: 'Rare + SL Req', price: '30K', oldPrice: '50K', rarity: 'Rare', badge: 'Paket' },
      { name: 'Legend + SL Req', price: '50K', oldPrice: '75K', rarity: 'Legend', badge: 'Paket' },
      { name: 'Premium + SL Req', price: '75K', oldPrice: '100K', rarity: 'Premium', badge: 'Paket' },
      { name: 'Mythic + SL Req', price: '100K', oldPrice: '150K', rarity: 'Mythic', badge: 'Paket' },
      { name: 'Glory + SL Req', price: '150K', oldPrice: '200K', rarity: 'Glory', badge: 'Paket' },
      { name: 'Superior + SL Req', price: '200K', oldPrice: '250K', rarity: 'Superior', badge: 'Paket' },
    ],
  },
  {
    id: 'skill',
    label: 'Skill',
    icon: 'wand',
    info: 'Max level total = 250 level.',
    items: [
      { name: 'All Skill Max', price: '150K', oldPrice: '200K', rarity: 'Mythic', badge: 'Maksimal' },
      { name: '1 Skill Max', price: '15K', oldPrice: '20K', rarity: 'Rare', badge: 'Naik Level' },
    ],
  },
  {
    id: 'items',
    label: 'Balance & Items',
    icon: 'coins',
    items: [
      { name: 'Money 1M', price: '5K', oldPrice: '10K', rarity: 'Common', badge: 'Saldo' },
      { name: 'Armor Darkness', price: '80K', oldPrice: '100K', rarity: 'Darkness', badge: 'Armor' },
      { name: 'Armor Mech', price: '150K', oldPrice: '200K', rarity: 'Superior', badge: 'Armor' },
      { name: 'Custom Enchant', price: '15K', oldPrice: '25K', rarity: 'Epic', badge: 'Enchant' },
    ],
  },
];

export const storeNotes = [
  'Skill hanya berlaku 1 season.',
  'Rank, SL, Armor = permanent.',
  'Wajib simpan bukti transaksi.',
];
