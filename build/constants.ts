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
  FEE_OVER_50_FLAT: 4.97, // $4.97 (charm pricing)
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
    answer: 'Layanan utama yang bisa langsung kamu gunakan: (1) Convert PayPal ke Rupiah—pencairan USD ke rekening/e-wallet kamu, (2) Top-up PayPal—isi saldo PayPal dari Rupiah.',
  },
  {
    question: 'Berapa minimal dan maksimal transaksi?',
    answer: 'Min $1 (cocok untuk coba-coba dulu!), Max $5,000 per hari. Fee bertingkat dan fair: transaksi $1-$49 fee 10% (contoh: $10 dapat $9), sedangkan $50 ke atas fee flat $5 saja—makin besar makin worth it! 💰 Promo Jumat: Diskon 50% fee untuk transaksi pertama di hari Jumat (khusus di bawah $50). 🎉',
  },
  {
    question: 'Support bank dan e-wallet apa aja?',
    answer: 'Semua bank besar (BCA, Mandiri, BNI, BRI, CIMB, Permata, dll) dan semua e-wallet utama (GoPay, OVO, DANA, LinkAja, ShopeePay) kami support! Bank kecil atau digital bank juga bisa. Basically, semua bank & e-wallet resmi Indonesia kami terima. 💳',
  },

  // Rate & Biaya
  {
    question: 'Berapa dan kapan update rate-nya?',
    answer: 'Update otomatis setiap 1 jam saat jam operasional (08.00-20.00 WIB)—artinya kamu selalu dapat rate terbaru dan fair, nggak perlu khawatir rugi karena rate lama. Rate pencairan kami biasanya hanya selisih Rp50-200 dari rate resmi PayPal. Rate top-up 100 rupiah lebih murah dari market (kamu hemat!). 📊',
  },
  {
    question: 'Ada biaya admin tidak?',
    answer: 'Fee transparan, no hidden cost! ✅ Transaksi di bawah $50: fee 10% dari nominal (contoh: $10 = fee $1). Transaksi $50 ke atas: fee flat $5 saja (cuma 5% untuk $100, makin besar makin worth it!). Top-up: GRATIS fee. Transfer ke semua bank/e-wallet juga GRATIS. Promo Jumat: Diskon 50% fee untuk transaksi pertama di hari Jumat (khusus di bawah $50).',
  },
  {
    question: 'Berapa lama prosesnya?',
    answer: 'Cepat! ⚡ Biasanya 30-60 menit setelah transfer—artinya dana bisa masuk hari yang sama, nggak perlu nunggu berhari-hari. Di jam sibuk (12.00-15.00) mungkin sampai 90 menit. Transfer di luar jam operasional (08.00-20.00 WIB)? No worries, diproses first thing pagi berikutnya.',
  },
  {
    question: 'Bisa refund kalau ada masalah?',
    answer: 'Tenang, uang kamu 100% aman! 🛡️ Kalau ada masalah apapun dari sisi kami, langsung refund penuh—no questions asked. Kami sudah proses ribuan transaksi tanpa masalah, tapi jika ada kendala, kami tangani langsung. Kontak admin kapan saja!',
  },

  // Cara Convert
  {
    question: 'Perlu nyiapin apa aja untuk convert?',
    answer: 'Simple! Cuma perlu: (1) Email PayPal kamu, (2) Nomor rekening/e-wallet tujuan, (3) Minimal saldo $1 di PayPal, (4) Note wajar saat transfer. Belum punya semuanya? No problem—chat dulu, kami bantu persiapan! 😊',
  },
  {
    question: 'Step by step convert gimana?',
    answer: 'Mudah! (1) Chat bot di Messenger, (2) Pilih nominal convert, (3) Transfer ke weiss.schrodinger@gmail.com a.n Ade Naufal Ammar—gunakan mode Friends & Family untuk menghindari fee PayPal (kamu dapat full amount!), (4) Kirim bukti transfer, (5) Tunggu 30-60 menit, done! ✅',
  },
  {
    question: 'Bisa pakai PayPal luar negeri?',
    answer: 'Bisa! Panduan mudah: Transaksi di bawah $100 pakai Goods & Services + note casual (contoh: "Thanks for lunch"). Transaksi di atas $100 pakai Friends & Family + note casual (contoh: "Birthday gift"). Bingung? No worries—tanya admin dulu sebelum transfer, kami guide step-by-step! 😊',
  },
  {
    question: 'Kenapa perlu notes yang wajar?',
    answer: 'Notes yang natural (seperti transaksi antar teman biasa) membantu menghindari flag dari sistem anti-fraud PayPal. Hindari note seperti "convert PayPal", "exchange", atau yang terlalu formal. Contoh notes yang baik: "Thanks for the help", "Birthday gift", "Lunch money". Ini melindungi akun PayPal kamu dan kami! 🔒',
  },

  // Security
  {
    question: 'Apakah transaksinya aman?',
    answer: 'Sangat aman—keamanan adalah prioritas utama kami! 🔒 Setiap transaksi diproses manual oleh admin (bukan bot), semua bukti transfer kami simpan, dan kami verifikasi ketat di setiap tahap. Ribuan customer sudah transaksi dengan aman. Tips keamanan: Double-check email tujuan (weiss.schrodinger@gmail.com), pakai email PayPal sendiri, tulis note wajar, dan simpan semua bukti.',
  },
  {
    question: 'Apa yang tidak bisa diproses?',
    answer: 'Demi keamanan bersama, kami tidak bisa proses: (1) Dana dari PayPal reward/cashback (tidak bisa ditransfer), (2) Transaksi pihak ketiga (risiko dispute tinggi), (3) Transfer antar negara tanpa note (mudah di-flag PayPal), (4) Invoice untuk pihak ketiga (melanggar ToS PayPal). ⚠️',
  },

  // Bantuan
  {
    question: 'Bagaimana cara menghubungi admin?',
    answer: 'Kontak admin via WhatsApp 0821-1330-4116 (prioritas), Facebook @aadenaufall, atau Email ade.naufal@gmail.com. Jam operasional: 08.00-20.00 WIB. Response time: biasanya 15-30 menit, maksimal 60 menit di jam sibuk. Tips: Lampirkan screenshot chat bot + bukti transfer (jika sudah), tunggu minimal 60 menit sebelum follow up. 💬',
  },
];
