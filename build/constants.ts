/// <reference types="vite/client" />
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
  GA_MEASUREMENT_ID: VITE_GA_MEASUREMENT_ID || 'G-ZTR1QX14YK',
  META_PIXEL_ID: VITE_META_PIXEL_ID || '837636162306241',
  OPERATIONAL_HOURS: '08:00 - 20:00 WIB',
  // Social Media Links
  FACEBOOK_URL: 'https://www.facebook.com/lapakbangade',
  INSTAGRAM_URL: 'https://instagram.com/lapakbangade',
  // Live Status (easily editable)
  LIVE_STATUS: 'Admin Online',
  AVERAGE_PROCESS_TIME: '15 Menit',
  // WhatsApp for support/help only
  WHATSAPP_SUPPORT: '6282113304116',
};

// Central source of truth for testimonials
export { TESTIMONIALS } from './TESTIMONIALS';

export const RATE = {
  // ... existing content (I'll need to read constants.ts first to preserve other exports)
  USD_TO_IDR: 15350, // Mock dynamic rate
  MIN_TRANSACTION: 1,
  MAX_TRANSACTION: 5000,
  FEE_UNDER_50_PERCENT: 0.10, // 10%
  FEE_OVER_50_FLAT: 5, // $5
};

export const NAV_LINKS = [
  { name: 'Cek Rate', href: '/#calculator' },
  { name: 'Keunggulan', href: '/#trust' },
  { name: 'Cara Convert', href: '/#how-it-works' },
  { name: 'Fee & Biaya', href: '/#fees' },
  { name: 'FAQ', href: '/#faq' },
];

export const BANKS = [
  'BCA', 'Mandiri', 'BNI', 'BRI', 'BSI'
];

export const WALLETS = [
  'DANA', 'OVO', 'GoPay', 'ShopeePay', 'LinkAja'
];

export const FAQS = [
  {
    question: 'Berapa lama proses transaksi?',
    answer: 'Biasanya 30-60 menit pada jam operasional (08:00 - 20:00 WIB). Kami memproses setiap transaksi secara manual satu per satu untuk menjamin keamanan.',
  },
  {
    question: 'Apa saja layanan yang tersedia?',
    answer: 'Saat ini kami melayani Convert PayPal (USD ke IDR) dan Top-up PayPal (IDR ke USD). Layanan lain seperti jasa bayar (eBay, Amazon, dll) akan segera hadir!',
  },
  {
    question: 'Berapa rate dan biayanya?',
    answer: 'Rate update otomatis setiap jam mengikuti pasar. Untuk convert, fee 10% (min $1) untuk transaksi di bawah $50, dan flat fee $5 untuk transaksi di atas $50. Top-up PayPal tidak ada fee tambahan!',
  },
  {
    question: 'Berapa minimal dan maksimal transaksi?',
    answer: 'Minimal transaksi $1 dan maksimal $5,000 per hari. Untuk nominal besar di atas limit harian, silakan hubungi admin terlebih dahulu untuk verifikasi.',
  },
  {
    question: 'Metode pembayaran apa saja yang didukung?',
    answer: 'Kami support transfer ke semua bank besar (BCA, Mandiri, BNI, BRI, dll) dan e-wallet (GoPay, OVO, DANA, LinkAja, ShopeePay).',
  },
  {
    question: 'Apakah transaksinya aman?',
    answer: 'Sangat aman. Semua transaksi diproses manual oleh admin dan bukti transfer selalu kami simpan. Kami juga melakukan verifikasi ketat untuk mencegah penipuan.',
  },
  {
    question: 'Bagaimana jika transaksi gagal?',
    answer: 'Jangan khawatir, dana Anda aman 100%. Jika ada kendala teknis atau transaksi tidak dapat diproses, kami akan melakukan refund penuh.',
  },
  {
    question: 'Kenapa harus pakai "Friends & Family"?',
    answer: 'Untuk menghindari hold dan limit dari pihak PayPal. Dengan opsi ini, dana bisa langsung masuk dan kami proses dengan cepat tanpa resiko keamanan tambahan.',
  },
  {
    question: 'Butuh bantuan lebih lanjut?',
    answer: 'Admin kami siap membantu! Hubungi kami via Messenger atau WhatsApp (0821-1330-4116) pada jam kerja untuk respon tercepat.',
  },
];
