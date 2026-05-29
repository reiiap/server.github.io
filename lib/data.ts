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

export type StoreProduct = {
  name: string;
  price: string;
  originalPrice: string;
  rarity: string;
  badge: string;
  features?: string[];
  info?: string;
};

export type StoreCategory = {
  id: string;
  label: string;
  icon: IconName;
  note?: string;
  items: StoreProduct[];
};

export const discordUrl = 'http://dsc.gg/voxensmp';
export const ownerWhatsapp = 'https://wa.me/6285728148809';
export const adminWhatsapp = 'https://wa.me/6281553480217';

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
  { label: 'Login', href: '#login' },
  { label: 'Store', href: '#store' },
  { label: 'Kontak', href: '#contact' },
];

export const features: { title: string; icon: IconName; detail: string }[] = [
  { title: 'Senjata Legenda', icon: 'sword', detail: 'Blade mythic, relic dungeon, upgrade soulbound, dan progres petualangan yang terasa seperti cerita RPG.' },
  { title: 'Skill Custom', icon: 'wand', detail: 'Combat, mining, forging, fishing, dan talent arcane dengan milestone level yang jelas dan reward berasa.' },
  { title: 'Progress RPG', icon: 'emerald', detail: 'Quest, ekonomi, contract, dungeon, dan target seasonal yang bikin karakter kamu terus berkembang.' },
  { title: 'Boss Dungeon', icon: 'boss', detail: 'Arena raid sinematik, elite mob, loot table, dungeon key, dan mekanik boss untuk party yang kompak.' },
  { title: 'Book & Contract', icon: 'contract', detail: 'Buka contract, pilih skill sesuai tipe, kejar reward langka, dan simpan progres terbaikmu setiap season.' },
  { title: 'PvP Kompetitif', icon: 'shield', detail: 'Arena duel, rivalitas clan, crystal pressure, dan reward combat yang tetap fair untuk player serius.' },
];

export const weapons = [
  { name: 'Darkness Relic', rarity: 'Superior', icon: 'sword' as IconName, accent: 'gold', detail: 'Aura premium untuk pemain yang ingin tampil dominan di dungeon, PvP, dan wilayah survival.' },
  { name: 'Contract Codex', rarity: 'Glory', icon: 'contract' as IconName, accent: 'emerald', detail: 'Book contract dengan jalur skill pilihan, cocok untuk membangun role karakter dari awal season.' },
  { name: 'Skill Awakening', rarity: 'Mythic', icon: 'wand' as IconName, accent: 'violet', detail: 'Percepat progression skill sampai level maksimal dan buka potensi build karakter kamu.' },
  { name: 'Armor Forge', rarity: 'Permanent', icon: 'shield' as IconName, accent: 'crimson', detail: 'Armor premium permanen untuk menambah gaya, kekuatan, dan identitas di dunia VOXEN SMP.' },
];

export const staff: { username: string | null; role: string; badge: string; quota?: string }[] = [
  { username: 'Syanzx777', role: 'Owner', badge: 'Pendiri Realm' },
  { username: 'ZenTheMonarch', role: 'CEO', badge: 'Dewan Monarch' },
  { username: 'yinz', role: 'Supervisor', badge: 'Pengarah Operasional' },
  { username: 'ReiiAp', role: 'H.Developer', badge: 'Arsitek Sistem' },
  { username: 'NabilEmon', role: 'Developer', badge: 'Forge Sistem' },
  { username: 'KunZzdev', role: 'Admin', badge: 'Dewan Admin', quota: '2/3' },
  { username: 'ryw', role: 'Admin', badge: 'Dewan Admin', quota: '0/3' },
  { username: 'Kyenzx', role: 'N.Admin', badge: 'Admin Baru', quota: '2/3' },
  { username: 'aufar', role: 'N.Admin', badge: 'Admin Baru', quota: '0/3' },
  { username: 'EvanCPM', role: 'N.Admin', badge: 'Admin Baru', quota: '0/3' },
  { username: null, role: 'Moderator', badge: 'Kosong' },
  { username: null, role: 'Staff', badge: 'Kosong' },
  { username: 'RusdiSetengah', role: 'N.Staff', badge: 'Staff Baru', quota: '0/3' },
  { username: null, role: 'Helper', badge: 'Kosong' },
];

export const storeCategories: StoreCategory[] = [
  {
    id: 'rank',
    label: 'Rank',
    icon: 'rank',
    items: [
      { name: 'Darkness', price: '150K', originalPrice: '160K', rarity: 'Darkness', badge: 'Diskon', features: ['Sethome 50', '/fly', '/enderchest', '/anvil', '/repair', '/tpdeny', '/nick', '/ptime'] },
      { name: 'Mythic', price: '100K', originalPrice: '120K', rarity: 'Mythic', badge: 'Populer', features: ['Sethome 30', '/fly', '/enderchest', '/anvil', '/repair', '/craft', '/hat', '/pweather'] },
      { name: 'Victorium', price: '50K', originalPrice: '70K', rarity: 'Victorium', badge: 'Best Value', features: ['Sethome 15', '/fly', '/enderchest', '/anvil', '/craft', '/hat'] },
      { name: 'Knight', price: '30K', originalPrice: '40K', rarity: 'Knight', badge: 'Starter+', features: ['Sethome 8', '/enderchest', '/anvil', '/craft', '/hat'] },
      { name: 'Elite', price: '15K', originalPrice: '25K', rarity: 'Elite', badge: 'Hemat', features: ['Sethome 6', '/hat', '/craft'] },
      { name: 'Prime', price: '10K', originalPrice: '17K', rarity: 'Prime', badge: 'Starter', features: ['Sethome 4', '/craft'] },
    ],
  },
  {
    id: 'book-contract',
    label: 'Book & Contract',
    icon: 'book',
    note: 'SL Req = Pilih 1 skill sesuai tipe contract (bisa dari gacha)',
    items: [
      { name: 'Basic + SL Req', price: '15K', originalPrice: '30K', rarity: 'Basic', badge: 'Contract' },
      { name: 'Rare + SL Req', price: '30K', originalPrice: '50K', rarity: 'Rare', badge: 'Contract' },
      { name: 'Legend + SL Req', price: '50K', originalPrice: '75K', rarity: 'Legend', badge: 'Contract' },
      { name: 'Premium + SL Req', price: '75K', originalPrice: '100K', rarity: 'Premium', badge: 'Contract' },
      { name: 'Mythic + SL Req', price: '100K', originalPrice: '150K', rarity: 'Mythic', badge: 'Contract' },
      { name: 'Glory + SL Req', price: '150K', originalPrice: '200K', rarity: 'Glory', badge: 'Contract' },
      { name: 'Superior + SL Req', price: '200K', originalPrice: '250K', rarity: 'Superior', badge: 'Contract' },
    ],
  },
  {
    id: 'skill',
    label: 'Skill',
    icon: 'wand',
    note: 'Max level total = 250 level',
    items: [
      { name: 'All Skill Max', price: '150K', originalPrice: '200K', rarity: 'Mythic', badge: 'Max Build' },
      { name: '1 Skill Max', price: '15K', originalPrice: '20K', rarity: 'Skill', badge: 'Fokus' },
    ],
  },
  {
    id: 'balance-items',
    label: 'Balance & Items',
    icon: 'coins',
    items: [
      { name: 'Money 1M', price: '5K', originalPrice: '10K', rarity: 'Balance', badge: 'Cepat' },
      { name: 'Armor Darkness', price: '80K', originalPrice: '100K', rarity: 'Darkness', badge: 'Permanent' },
      { name: 'Armor Mech', price: '150K', originalPrice: '200K', rarity: 'Mech', badge: 'Permanent' },
      { name: 'Custom Enchant', price: '15K', originalPrice: '25K', rarity: 'Enchant', badge: 'Upgrade' },
    ],
  },
];

export const importantNotes = [
  'Skill hanya berlaku 1 season',
  'Rank, SL, Armor = permanent',
  'Wajib simpan bukti transaksi',
];
