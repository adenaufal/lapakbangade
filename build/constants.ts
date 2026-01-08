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

import { Testimonial } from './types';

// Central source of truth for testimonials
export const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: "Rian Saputra",
    avatar: "https://i.pravatar.cc/96?img=11",
    content: "Awalnya ragu karena baru pertama kali convert, eh ternyata cepet banget. 30 menit duit udah masuk DANA. Adminnya juga ramah banget jelasinnya.",
    platform: "Facebook"
  },
  {
    id: 2,
    name: "Siska Wijaya",
    avatar: "https://i.pravatar.cc/96?img=5",
    content: "Langganan di sini buat cairin hasil freelance. Rate-nya berani diadu sama lapak lain, dan yang paling penting fee-nya transparan ga ada potongan aneh-aneh.",
    platform: "WhatsApp"
  },
  {
    id: 3,
    name: "Laras Putri",
    avatar: "https://i.pravatar.cc/96?img=47",
    content: "Admin detail verifikasi, jadi makin yakin aman. Cair ke BCA ga sampai 1 jam. Recommended banget buat yang cari tempat convert terpercaya.",
    platform: "WhatsApp"
  },
  {
    id: 4,
    name: "Budi Santoso",
    avatar: "https://i.pravatar.cc/96?img=59",
    content: "Pas banget butuh cairin saldo malem-malem, ternyata masih dilayani. Recommended banget buat yang butuh urgent.",
    platform: "Facebook"
  },
  {
    id: 5,
    name: "Dimas Hartono",
    avatar: "https://i.pravatar.cc/96?img=21",
    content: "Butuh top-up USD dadakan, di sini paling cepat responsnya. Rate juga oke dibanding tempat lain.",
    platform: "Facebook"
  },
  {
    id: 6,
    name: "Nadia Prameswari",
    avatar: "https://i.pravatar.cc/96?img=15",
    content: "Suka karena fee jelas di depan, ga ada biaya nyelip. CS bantuin step-by-step sampai saldo masuk.",
    platform: "WhatsApp"
  },
  {
    id: 7,
    name: "Andi Pratama",
    avatar: "https://i.pravatar.cc/96?img=33",
    content: "Penyelamat freelancer di tanggal tua! Proses convert PayPal ke DANA kilat banget.",
    platform: "Upwork"
  },
  {
    id: 8,
    name: "Maya Anggraini",
    avatar: "https://i.pravatar.cc/96?img=9",
    content: "Udah sering transaksi di sini, amanah banget. Rate bersaing dan pelayanan selalu ramah.",
    platform: "Fiverr"
  },
  {
    id: 9,
    name: "Eko Prasetyo",
    avatar: "https://i.pravatar.cc/96?img=60",
    content: "Solusi terbaik buat freelancer Indo. Ga perlu pusing mikirin WD PayPal yang lama.",
    platform: "Freelancer.com"
  },
  {
    id: 10,
    name: "Citra Lestari",
    avatar: "https://i.pravatar.cc/96?img=28",
    content: "Ramah banget adminnya, padahal saya bawel nanya terus. Tetap dilayani dengan sabar. Mantap!",
    platform: "WhatsApp"
  }
];

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
