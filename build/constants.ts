const {
  VITE_GA_MEASUREMENT_ID,
  VITE_META_PIXEL_ID,
  VITE_WHATSAPP_NUMBER,
  VITE_MESSENGER_URL,
} = import.meta.env;

export const CONFIG = {
  APP_NAME: 'Lapak Bang Ade',
  WHATSAPP_NUMBER: VITE_WHATSAPP_NUMBER || '6281234567890', // Placeholder
  MESSENGER_URL: VITE_MESSENGER_URL || 'https://m.me/lapakbangade', // Placeholder
  GA_MEASUREMENT_ID: VITE_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX',
  META_PIXEL_ID: VITE_META_PIXEL_ID || '1234567890',
  OPERATIONAL_HOURS: '08:00 - 20:00 WIB'
};

export const RATE = {
  USD_TO_IDR: 15350, // Mock dynamic rate
  MIN_TRANSACTION: 1,
  MAX_TRANSACTION: 5000,
  FEE_UNDER_50_PERCENT: 0.10, // 10%
  FEE_OVER_50_FLAT: 5, // $5
};

export const NAV_LINKS = [
  { name: 'Cek Rate', href: '#calculator' },
  { name: 'Keunggulan', href: '#trust' },
  { name: 'Cara Convert', href: '#how-it-works' },
  { name: 'Fee & Biaya', href: '#fees' },
  { name: 'FAQ', href: '#faq' },
];

export const BANKS = [
  'BCA', 'Mandiri', 'BNI', 'BRI', 'BSI'
];

export const WALLETS = [
  'DANA', 'OVO', 'GoPay', 'ShopeePay', 'LinkAja'
];

export const FAQS = [
  {
    question: 'Berapa lama prosesnya?',
    answer: 'Biasanya 30-60 menit di jam aktif (08:00 - 20:00 WIB). Admin memproses antrian satu per satu secara manual agar aman.',
  },
  {
    question: 'Ada minimal dan maksimal nominal?',
    answer: 'Minimal convert $1, maksimal $5000 per transaksi. Untuk nominal besar, silakan chat admin terlebih dahulu.',
  },
  {
    question: 'Apakah aman?',
    answer: 'Aman. Bukti transfer terekam dan transaksi diproses manual oleh admin. Kami juga menerapkan verifikasi untuk mencegah fraud.',
  },
  {
    question: 'Bisa e-wallet?',
    answer: 'Bisa banget! Kami support pencairan ke DANA, OVO, GoPay, ShopeePay, dan LinkAja.',
  },
  {
    question: 'Cara bayar gimana?',
    answer: 'Cukup kirim USD via PayPal ke email yang diberikan admin (gunakan opsi Friends & Family). Step detailnya akan dijelaskan admin saat chat.',
  },
  {
    question: 'Kalau butuh bantuan gimana?',
    answer: 'Langsung klik tombol Messenger di halaman ini. Admin Lapak Bang Ade siap bantu kamu.',
  },
];
