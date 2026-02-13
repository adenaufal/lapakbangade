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
  // Info Dasar
  {
    question: 'Apa saja layanan Lapak Bang Ade?',
    answer: 'Kami punya berbagai layanan: Convert PayPal - Pencairan (USD ke IDR), Convert PayPal - Topup (IDR ke USD), jasa belanja online (Gumroad, Etsy, Amazon), jasa belanja software (CSP, Paint Tool SAI), dan jasa proteksi gambar ilustrasi (Glaze/Nightshade). Beberapa layanan belum ada di bot, info lebih lanjut hubungi Facebook @aadenaufall atau WhatsApp 0821-1330-4116.',
  },
  {
    question: 'Berapa minimal dan maksimal transaksi?',
    answer: 'Untuk convert PayPal ke Rupiah maupun top-up: Min $1, Max $5,000 per hari. Fee bertingkat: untuk transaksi di bawah $50 dikenakan fee 10% dari nominal (contoh: $10 = fee $1), sedangkan $50 ke atas fee flat $5. Khusus Jumat: Diskon 50% untuk fee transaksi di bawah $50 (khusus transaksi pertama di hari Jumat).',
  },
  {
    question: 'Support bank dan e-wallet apa aja?',
    answer: 'Kami support semua bank (BCA, Mandiri, BNI, BRI, CIMB, Permata, dan bank lainnya) dan e-wallet (GoPay, OVO, DANA, LinkAja, ShopeePay). Support semua bank & e-wallet resmi!',
  },

  // Rate & Biaya
  {
    question: 'Berapa dan kapan update rate-nya?',
    answer: 'Update otomatis tiap 1 jam di jam operasional (08.00-20.00 WIB) dan tiap 3 jam di luar jam operasional untuk monitoring market. Rate convert pencairan bedanya tipis banget dengan rate PayPal, sedangkan rate top-up 100 rupiah lebih murah dari rate market sekarang!',
  },
  {
    question: 'Ada biaya admin tidak?',
    answer: 'Khusus convert pencairan: fee bertingkat berdasarkan jumlah. Di bawah $50 fee 10% dari nominal (contoh: $10 = fee $1, $25 = fee $2.5), sedangkan $50 ke atas fee flat $5. Promo Jumat: Diskon 50% untuk fee transaksi di bawah $50 (khusus transaksi pertama di hari Jumat). Tidak ada fee untuk top-up. No hidden fee! Free transfer ke semua bank/e-wallet.',
  },
  {
    question: 'Berapa lama prosesnya?',
    answer: 'Jam operasional: 08.00-20.00 WIB. Proses: 30-60 menit setelah transfer (mungkin delay di jam siang-sore). Di luar jam operasional? Next day.',
  },
  {
    question: 'Bisa refund kalo ada masalah?',
    answer: 'Tenang aja! Kita jamin 100% uang kamu aman. Kalo ada masalah, langsung kontak admin ya.',
  },

  // Cara Convert
  {
    question: 'Perlu nyiapin apa aja untuk convert?',
    answer: 'Kamu perlu siapkan: email PayPal sendiri, nomor rekening/e-wallet, minimal saldo $1 (untuk pencairan), dan jangan lupa tulis notes sewajarnya!',
  },
  {
    question: 'Step by step convert gimana?',
    answer: 'Gampang! 1) Chat bot di Messenger, 2) Pilih nominal convert, 3) Transfer ke weiss.schrodinger@gmail.com a.n Ade Naufal Ammar (WAJIB pake mode Friends & Family), 4) Kirim bukti transfer, 5) Tunggu 30-60 menit.',
  },
  {
    question: 'Bisa pake PayPal luar negeri?',
    answer: 'Bisa! Rules-nya: untuk transaksi <$102.50 gunakan Goods & Services + note umum (misal: "Thanks for the groceries"), sedangkan >$102.50 gunakan Friends & Family + note umum (misal: "Birthday gift"). Note penting buat hindarin flag PayPal.',
  },
  {
    question: 'Kenapa perlu notes yang wajar?',
    answer: 'Untuk hindari flag dari sistem PayPal, pastikan transaksi aman & lancar, dan kurangi risiko hold/limit.',
  },

  // Security
  {
    question: 'Apakah transaksinya aman?',
    answer: 'Sangat aman! Semua transaksi diproses manual oleh admin, bukti transfer selalu kami simpan, dan kami melakukan verifikasi ketat untuk mencegah penipuan. Double check email tujuan transfer (weiss.schrodinger@gmail.com), pake email PayPal sendiri, pake note yang wajar, dan keep semua bukti transaksi.',
  },
  {
    question: 'Apa yang tidak bisa diproses?',
    answer: 'Dana dari PayPal reward/cashback, transaksi dari pihak ketiga, transfer antar negara tanpa notes, dan invoice untuk pihak ketiga tidak bisa kami proses demi keamanan.',
  },

  // Bantuan
  {
    question: 'Bagaimana cara menghubungi admin?',
    answer: 'Kontak admin via Facebook @aadenaufall, WhatsApp 0821-1330-4116, atau Email ade.naufal@gmail.com. Jam operasional: 08.00-20.00 WIB. Response time: 30-60 menit (mungkin delay di jam siang-sore). Tips: Keep it friendly, lampirkan screenshot chat dengan bot dan bukti transfer (kalo sudah), tunggu 60 menit sebelum follow up.',
  },
];
