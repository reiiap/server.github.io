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

export type StoreItem = {
  name: string;
  price: string;
  originalPrice: string;
  rarity: string;
  badge: string;
  description: string;
  perks?: string[];
};

export type StoreCategory = {
  id: string;
  label: string;
  icon: IconName;
  note?: string;
  items: StoreItem[];
};

export const server = {
  name: 'VoxenSMP',
  ip: 'voxensmp.xyz',
  version: '1.21+',
  title: 'VOXEN SMP',
  subtitle: 'RANK - BOOK - SKILL',
  discordUrl: 'http://dsc.gg/voxensmp',
};

export const contacts = {
  owner: {
    label: 'Owner',
    whatsapp: 'https://wa.me/6285728148809',
  },
  admin: {
    label: 'Admin',
    whatsapp: 'https://wa.me/6281553480217',
  },
};

export const navLinks = [
  { label: 'Beranda', href: '#home' },
  { label: 'Fitur', href: '#features' },
  { label: 'Gear RPG', href: '#weapons' },
  { label: 'Login', href: '#login' },
  { label: 'Toko', href: '#store' },
  { label: 'Kontak', href: '#contact' },
];

export const features: { title: string; icon: IconName; detail: string }[] = [
  { title: 'Senjata Legends', icon: 'sword', detail: 'Blade mythic, relic divine, upgrade soulbound, dan cerita gear yang tumbuh bersama perjalanan survival kamu.' },
  { title: 'Skill Kustom', icon: 'wand', detail: 'Combat, mining, forging, fishing, dan talent arcane dengan milestone RPG serta reward mastery yang terasa berguna.' },
  { title: 'Progress RPG', icon: 'emerald', detail: 'Jalur quest, ekonomi realm, contract, dungeon, dan target season dibuat untuk progres karakter jangka panjang.' },
  { title: 'Boss Dungeon', icon: 'boss', detail: 'Arena raid sinematik, elite mobs, loot table, dungeon key, dan mekanik boss untuk party yang kompak.' },
  { title: 'Book & Contract', icon: 'contract', detail: 'Ambil target hunt, selesaikan bounty scroll, buka lore relic, dan kumpulkan reward langka dari misi berisiko.' },
  { title: 'PvP Kompetitif', icon: 'shield', detail: 'Duel arena, rivalitas clan, tekanan crystal PvP, dan reward combat yang tetap seimbang untuk player skill tinggi.' },
];

export const weapons = [
  { name: 'Mythic Weapon', rarity: 'Mythic', icon: 'sword' as IconName, accent: 'gold', detail: 'Gear langka dengan glow premium, tier progresif, dan passive yang bisa mengubah gaya bertarung.' },
  { name: 'Divine Relic', rarity: 'Divine', icon: 'spark' as IconName, accent: 'emerald', detail: 'Relic end-game untuk legenda yang menguasai dungeon, contract, ekonomi, dan season PvP.' },
  { name: 'Legend Contract', rarity: 'Legendary', icon: 'contract' as IconName, accent: 'crimson', detail: 'Scroll high-risk untuk boss hunt, bounty chain, dan jalur unlock lore eksklusif.' },
  { name: 'Ascended Skill', rarity: 'Ascended', icon: 'wand' as IconName, accent: 'violet', detail: 'Skill tree yang membentuk identitas survival kamu, dari fighter, miner, hingga arcane support.' },
];

export const staff: { username: string | null; role: string; badge: string; quota?: string }[] = [
  { username: 'Syanzx777', role: 'Owner', badge: 'Pendiri Realm' },
  { username: 'ZenTheMonarch', role: 'CEO', badge: 'Dewan Monarch' },
  { username: 'yinz', role: 'Supervisor', badge: 'Lead Operasional' },
  { username: 'ReiiAp', role: 'H.Developer', badge: 'Arsitek Utama' },
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
    note: 'Rank bersifat permanent dan memberi akses command premium sesuai tier.',
    items: [
      { name: 'Darkness', price: '150K', originalPrice: '160K', rarity: 'Darkness', badge: 'Top Tier', description: 'Rank paling gelap untuk petualang end-game VoxenSMP.', perks: ['Sethome 50', '/fly', '/enderchest', '/anvil', '/repair', '/tpdeny', '/nick', '/ptime'] },
      { name: 'Mythic', price: '100K', originalPrice: '120K', rarity: 'Mythic', badge: 'Premium', description: 'Tier mythic dengan command lengkap untuk eksplorasi cepat.', perks: ['Sethome 30', '/fly', '/enderchest', '/anvil', '/repair', '/craft', '/hat', '/pweather'] },
      { name: 'Victorium', price: '50K', originalPrice: '70K', rarity: 'Epic', badge: 'Favorit', description: 'Rank kuat untuk player aktif yang ingin progres lebih nyaman.', perks: ['Sethome 15', '/fly', '/enderchest', '/anvil', '/craft', '/hat'] },
      { name: 'Knight', price: '30K', originalPrice: '40K', rarity: 'Rare', badge: 'Starter+', description: 'Awal yang solid untuk menjadi ksatria realm.', perks: ['Sethome 8', '/enderchest', '/anvil', '/craft', '/hat'] },
      { name: 'Elite', price: '15K', originalPrice: '25K', rarity: 'Uncommon', badge: 'Hemat', description: 'Paket ringan untuk akses command harian yang praktis.', perks: ['Sethome 6', '/hat', '/craft'] },
      { name: 'Prime', price: '10K', originalPrice: '17K', rarity: 'Common', badge: 'Basic', description: 'Rank pembuka untuk memulai journey store VoxenSMP.', perks: ['Sethome 4', '/craft'] },
    ],
  },
  {
    id: 'book-contract',
    label: 'Book & Contract',
    icon: 'book',
    note: 'SL Req = Pilih 1 skill sesuai tipe contract (bisa dari gacha).',
    items: [
      { name: 'Basic + SL Req', price: '15K', originalPrice: '30K', rarity: 'Common', badge: 'Diskon', description: 'Contract basic untuk mulai membangun jalur skill.' },
      { name: 'Rare + SL Req', price: '30K', originalPrice: '50K', rarity: 'Rare', badge: 'Diskon', description: 'Contract rare dengan nilai progres yang lebih terasa.' },
      { name: 'Legend + SL Req', price: '50K', originalPrice: '75K', rarity: 'Legendary', badge: 'Diskon', description: 'Scroll legend untuk player yang mengejar kekuatan tinggi.' },
      { name: 'Premium + SL Req', price: '75K', originalPrice: '100K', rarity: 'Epic', badge: 'Diskon', description: 'Contract premium dengan rasa RPG marketplace.' },
      { name: 'Mythic + SL Req', price: '100K', originalPrice: '150K', rarity: 'Mythic', badge: 'Diskon', description: 'Contract mythic untuk upgrade serius di realm.' },
      { name: 'Glory + SL Req', price: '150K', originalPrice: '200K', rarity: 'Glory', badge: 'Diskon', description: 'Contract glory untuk pemburu reputasi dan power.' },
      { name: 'Superior + SL Req', price: '200K', originalPrice: '250K', rarity: 'Superior', badge: 'Diskon', description: 'Contract tertinggi untuk pemain yang ingin tampil dominan.' },
    ],
  },
  {
    id: 'skill',
    label: 'Skill',
    icon: 'wand',
    note: 'Max level total = 250 level. Skill hanya berlaku 1 season.',
    items: [
      { name: 'All Skill Max', price: '150K', originalPrice: '200K', rarity: 'Mythic', badge: 'Max Build', description: 'Maksimalkan semua skill untuk build season yang siap tempur.' },
      { name: '1 Skill Max', price: '15K', originalPrice: '20K', rarity: 'Rare', badge: 'Fokus', description: 'Naikkan satu skill favorit ke level maksimal.' },
    ],
  },
  {
    id: 'items',
    label: 'Balance & Items',
    icon: 'coins',
    note: 'Rank, SL, dan Armor bersifat permanent. Wajib simpan bukti transaksi.',
    items: [
      { name: 'Money 1M', price: '5K', originalPrice: '10K', rarity: 'Common', badge: 'Ekonomi', description: 'Modal cepat untuk market, upgrade, dan kebutuhan survival.' },
      { name: 'Armor Darkness', price: '80K', originalPrice: '100K', rarity: 'Darkness', badge: 'Armor', description: 'Set armor gelap permanent untuk tampil seperti boss dungeon.' },
      { name: 'Armor Mech', price: '150K', originalPrice: '200K', rarity: 'Superior', badge: 'Armor', description: 'Armor mech permanent dengan aura premium dan tampilan futuristik.' },
      { name: 'Custom Enchant', price: '15K', originalPrice: '25K', rarity: 'Epic', badge: 'Enchant', description: 'Tambahkan custom enchant untuk memperkuat gear pilihanmu.' },
    ],
  },
];

export const importantNotes = [
  'Skill hanya berlaku 1 season',
  'Rank, SL, Armor = permanent',
  'Wajib simpan bukti transaksi',
];
