import React, { useState } from 'react';
import {
  ArrowRight,
  Bot,
  Building2,
  Check,
  ChevronDown,
  CreditCard,
  FileText,
  Landmark,
  MessageCircle,
  ShieldCheck,
  Star,
  User,
  WalletCards,
  Zap,
} from 'lucide-react';
import { CONFIG } from '../constants';
import { trackEvent } from '../services/analytics';
import { cn } from '../utils/cn';

type BankLogoProps = {
  name: string;
  color: string;
};

const BankLogo = ({ name, color }: BankLogoProps) => (
  <div className="flex h-16 min-w-[140px] items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 font-sans text-lg font-extrabold shadow-sm">
    <span className="h-7 w-2 rounded-sm" style={{ backgroundColor: color }} />
    <span style={{ color }}>{name}</span>
  </div>
);

const CheckItem = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <li className={cn('flex items-start gap-2 text-sm leading-6', dark ? 'text-slate-100' : 'text-slate-950')}>
    <span
      className={cn(
        'mt-1 grid size-5 shrink-0 place-items-center rounded-md',
        dark ? 'bg-amber-500/20 text-amber-400' : 'bg-brand-100 text-brand-600',
      )}
    >
      <Check size={12} strokeWidth={2.4} />
    </span>
    {children}
  </li>
);

const SectionEyebrow = ({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) => (
  <p className={cn('text-xs font-bold uppercase', dark ? 'text-amber-200' : 'text-brand-600')}>
    {children}
  </p>
);

export const MitraSection = () => {
  const rowOne = [
    ['BCA', '#0060af'],
    ['Mandiri', '#003d79'],
    ['BNI', '#f37021'],
    ['BRI', '#003366'],
    ['GoPay', '#00aed6'],
    ['OVO', '#4c2a85'],
    ['DANA', '#118eea'],
    ['ShopeePay', '#ee4d2d'],
  ] as const;
  const rowTwo = [
    ['LinkAja', '#e30613'],
    ['CIMB Niaga', '#a4262c'],
    ['Permata', '#005bac'],
    ['& lainnya', '#64748b'],
  ] as const;

  return (
    <section id="mitra" className="border-t border-slate-100 bg-white px-4 py-[72px] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl text-center">
        <p className="text-xs font-bold uppercase text-slate-500">Mitra Bank &amp; E-Wallet</p>
        <h2 className="mx-auto mt-2 max-w-3xl text-balance text-4xl font-extrabold leading-tight text-slate-950 md:text-5xl">
          Cair ke <span className="text-brand-600">12+ bank &amp; e-wallet</span> Indonesia
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-pretty text-base leading-7 text-slate-600">
          Transfer langsung ke rekening favoritmu — tanpa perantara, tanpa biaya tambahan.
        </p>
      </div>

      <div className="mx-auto mt-9 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rowOne.map(([name, color]) => <BankLogo key={name} name={name} color={color} />)}
      </div>
      <div className="mx-auto mt-3 grid max-w-7xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rowTwo.map(([name, color]) => <BankLogo key={name} name={name} color={color} />)}
      </div>
    </section>
  );
};

export const KenapaSection = () => (
  <section id="kenapa" className="bg-slate-50 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow>Cara Kerja Bang Ade</SectionEyebrow>
        <h2 className="mt-3 text-balance text-4xl font-extrabold leading-none text-slate-950 md:text-5xl">
          Bot yang siap siaga, <br />
          <span className="text-brand-600">dengan admin di balik layar.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-pretty text-lg leading-8 text-slate-600">
          Bot Bang Ade jalan 24/7 buat handle chat &amp; instruksi. Admin kami yang verifikasi tiap transfer manual — itu kenapa cair-nya 30–60 menit, bukan instan dan bukan asal otomatis.
        </p>
      </div>

      <div className="mt-14 grid gap-5 lg:grid-cols-2">
        <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-8">
          <div className="relative">
            <div className="grid size-14 place-items-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-600/30">
              <Bot size={28} />
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-3 py-1 text-xs font-bold uppercase text-green-800">
              <span className="size-1.5 rounded-full bg-green-500" />
              Online 24/7
            </div>
            <h3 className="mt-4 text-2xl font-extrabold text-slate-950">Bot Lapak Bang Ade</h3>
            <p className="mt-2 text-pretty text-sm leading-6 text-slate-500">Bagian operasional — selalu siap nampung chat-mu.</p>
            <ul className="mt-5 space-y-2">
              {[
                'Balas chat dalam hitungan detik',
                'Kasih rate live + kalkulasi otomatis',
                'Generate instruksi transfer PayPal',
                'Update status transaksi real-time',
              ].map((item) => <CheckItem key={item}>{item}</CheckItem>)}
            </ul>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl border border-slate-950 bg-slate-950 p-8 text-slate-100">
          <div className="relative">
            <div className="grid size-14 place-items-center rounded-2xl bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30">
              <User size={28} />
            </div>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-bold uppercase text-amber-200">
              <span className="size-1.5 rounded-full bg-amber-500" />
              08:00–20:00 WIB
            </div>
            <h3 className="mt-4 text-2xl font-extrabold">Admin Bang Ade</h3>
            <p className="mt-2 text-pretty text-sm leading-6 text-slate-400">Manusia di balik layar — verifikasi &amp; cairin dana.</p>
            <ul className="mt-5 space-y-2">
              {[
                'Verifikasi tiap bukti transfer secara manual',
                'Cairin dana ke rekening dalam 30–60 menit',
                'Bisa dikontak langsung kalau ada masalah',
                'Refund penuh kalau ada error dari kami',
              ].map((item) => <CheckItem key={item} dark>{item}</CheckItem>)}
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const TESTIS = [
  { name: 'Sari Dewi', role: 'Illustrator · Jakarta', quote: 'Udah 6 bulan langganan, nggak pernah ada masalah. Admin responsif banget, rate-nya juga kompetitif!', color: '#dbeafe' },
  { name: 'Budi Rahman', role: 'Translator · Bandung', quote: '$200 cair cuma 20 menit. Recommend banget buat freelancer yang sering nerima dari klien luar.', color: '#fef3c7' },
  { name: 'Lia Kusuma', role: 'Voice Actor · Surabaya', quote: 'Nggak perlu ribet sama bank, langsung cair ke GoPay. Bot-nya pinter, adminnya ramah.', color: '#fce7f3' },
  { name: 'Yoga P.', role: 'Web Developer · Yogya', quote: 'Fee transparan, nggak ada hidden cost. Udah convert 50+ kali, selalu aman dan tepat waktu.', color: '#dcfce7' },
  { name: 'Maya Sari', role: 'Content Writer · Bali', quote: 'Pertama kali coba, langsung trust. Bot-nya jelas, adminnya verifikasi cepat. Worth it banget.', color: '#e0e7ff' },
  { name: 'Andre W.', role: 'Designer · Medan', quote: 'Klien Upwork tiap minggu, jadi rutin pake. Bang Ade selalu ngasih rate fair. Top!', color: '#fed7d7' },
  { name: 'Rina H.', role: 'Editor · Semarang', quote: 'Promo Jumat-nya lumayan banget buat hemat fee. Customer service A+++, fast response.', color: '#cffafe' },
  { name: 'Dimas A.', role: 'Photographer · Bali', quote: 'Pernah ada masalah sama PayPal, Bang Ade refund tanpa banyak tanya. Trust banget.', color: '#fde68a' },
];

const TestimonialCard = ({ item }: { item: typeof TESTIS[number] }) => (
  <div className="mr-4 w-[360px] shrink-0 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
    <div className="mb-3 flex gap-1 text-amber-500">
      {[1, 2, 3, 4, 5].map((star) => <Star key={star} size={14} fill="currentColor" />)}
    </div>
    <p className="min-h-[88px] text-pretty text-[15px] leading-7 text-slate-950">"{item.quote}"</p>
    <div className="mt-5 flex items-center gap-3 border-t border-slate-100 pt-4">
      <div
        className="grid size-10 place-items-center rounded-full text-sm font-extrabold text-slate-950"
        style={{ backgroundColor: item.color }}
      >
        {item.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
      </div>
      <div>
        <p className="text-sm font-bold text-slate-950">{item.name}</p>
        <p className="text-xs text-slate-500">{item.role}</p>
      </div>
    </div>
  </div>
);

export const TestimonialMarquee = () => {
  const row1 = [...TESTIS, ...TESTIS];
  const row2 = [...TESTIS.slice().reverse(), ...TESTIS.slice().reverse()];

  return (
    <section id="cerita" className="overflow-hidden bg-white py-20 md:py-24">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <SectionEyebrow>Cerita Pengguna</SectionEyebrow>
        <h2 className="mt-3 text-balance text-4xl font-extrabold leading-none text-slate-950 md:text-5xl">
          Dipercaya <span className="text-brand-600">500+ freelancer</span> Indonesia.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-8 text-slate-600">
          Sejak 2020 — dari illustrator, design, sampai streamer. Nggak ada review palsu di sini.
        </p>
      </div>

      <div className="mt-12">
        <div className="mask-linear-fade flex overflow-hidden">
          <div className="lba-marquee-left flex shrink-0">
            {row1.map((item, index) => <TestimonialCard key={`r1-${index}`} item={item} />)}
          </div>
        </div>
        <div className="mask-linear-fade mt-4 flex overflow-hidden">
          <div className="lba-marquee-right flex shrink-0">
            {row2.map((item, index) => <TestimonialCard key={`r2-${index}`} item={item} />)}
          </div>
        </div>
      </div>

      <div className="mt-9 text-center">
        <a href={CONFIG.FACEBOOK_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-brand-600">
          Lihat 50+ review lainnya <ArrowRight size={14} />
        </a>
      </div>
    </section>
  );
};

export const CaraSection = () => {
  const steps = [
    { num: '01', title: 'Chat Bot Bang Ade', desc: 'Buka Messenger, isi identitas diri, sebut nominal & bank tujuan. Bot kasih rate + instruksi transfer.', icon: MessageCircle },
    { num: '02', title: 'Transfer PayPal F&F', desc: 'Kirim USD ke email Bang Ade pakai mode Friends & Family — biar nggak kena fee PayPal.', icon: Zap },
    { num: '03', title: 'Kirim Bukti Screenshot', desc: 'Screenshot bukti transfer, kirim balik ke bot. Admin akan review manual.', icon: FileText },
    { num: '04', title: 'Cair ke Rekening', desc: 'Admin cairin dalam 30–60 menit ke rekening atau e-wallet pilihanmu.', icon: WalletCards },
  ];

  return (
    <section id="cara" className="bg-slate-50 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <SectionEyebrow>Cara Convert</SectionEyebrow>
          <h2 className="mt-3 text-balance text-4xl font-extrabold leading-none text-slate-950 md:text-5xl">
            4 langkah, <br />
            <span className="text-brand-600">nggak ada yang bikin pusing.</span>
          </h2>
          <p className="mt-4 max-w-xl text-pretty text-lg leading-8 text-slate-600">
            Sebagian besar transaksi selesai dalam satu chat. Pertama kali pakai? Tenang, bot bakal nuntun step-by-step.
          </p>
          <a href="#calc" className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700">
            Mulai sekarang <ArrowRight size={14} />
          </a>
        </div>

        <div className="space-y-3">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex gap-5 rounded-3xl border border-slate-200 bg-white p-6 transition duration-200 hover:translate-x-1 hover:border-brand-200">
                <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-100 text-brand-600">
                  <Icon size={22} />
                </div>
                <div>
                  <p className="font-mono text-xs font-semibold text-slate-400 tabular-nums">STEP {step.num}</p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-950">{step.title}</h3>
                  <p className="mt-2 text-pretty text-sm leading-6 text-slate-600">{step.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export const PromoSection = () => (
  <section id="promo" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
    <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[28px] bg-brand-800 px-6 py-12 text-white sm:px-10 lg:px-14">
      <div className="relative grid items-center gap-9 lg:grid-cols-[1fr_auto]">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/40 bg-amber-500/20 px-4 py-1.5 text-xs font-bold uppercase text-amber-200">
            <span className="size-1.5 rounded-full bg-amber-500" />
            Tiap Jumat
          </div>
          <h2 className="mt-3 text-balance text-4xl font-extrabold leading-none md:text-5xl">
            Promo Jumat Berkah —<br />
            <span className="text-amber-200">fee diskon 50%.</span>
          </h2>
          <p className="mt-4 max-w-xl text-pretty leading-7 text-white/85">
            Kalau bisa nunggu sampai akhir minggu, lumayan banget — apalagi buat nominal kecil. Otomatis di-apply, nggak perlu kode.
          </p>
        </div>
        <div className="mx-auto grid size-44 rotate-[-8deg] place-items-center rounded-full border-[6px] border-white bg-amber-500 text-center text-slate-950 shadow-2xl lg:size-48">
          <div>
            <div className="font-display text-2xl leading-none">diskon</div>
            <div className="text-6xl font-extrabold leading-none">50%</div>
            <div className="mt-1 text-xs font-bold uppercase">fee off</div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const BLOG_POSTS = [
  { cat: 'Tutorial', title: 'Cara Cair PayPal ke BCA Tanpa Ribet (Update 2026)', read: '5 menit', tint: 'bg-brand-100', icon: FileText },
  { cat: 'Perbandingan', title: 'Jasa Convert PayPal vs Withdraw Sendiri: Mana Lebih Untung?', read: '7 menit', tint: 'bg-amber-100', icon: Landmark },
  { cat: 'Untuk Freelancer', title: '5 Tips Hemat Fee PayPal untuk Freelancer Upwork & Fiverr', read: '4 menit', tint: 'bg-pink-100', icon: Zap },
  { cat: 'FAQ Mendalam', title: 'PayPal Friends & Family vs Goods & Services: Mana yang Tepat?', read: '6 menit', tint: 'bg-green-100', icon: ShieldCheck },
  { cat: 'Pajak', title: 'Pajak Penghasilan Freelance dari PayPal: Yang Harus Kamu Tau', read: '8 menit', tint: 'bg-indigo-100', icon: Building2 },
  { cat: 'Update Mingguan', title: 'Rate USD–IDR Hari Ini: Update Mingguan + Analisis Tren', read: 'refresh tiap Senin', tint: 'bg-cyan-100', icon: Zap },
];

export const BlogSection = () => (
  <section id="blog" className="bg-slate-950 px-4 py-20 text-slate-100 sm:px-6 md:py-24 lg:px-8">
    <div className="mx-auto max-w-7xl">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div className="max-w-2xl">
          <SectionEyebrow dark>Panduan &amp; Tips PayPal</SectionEyebrow>
          <h2 className="mt-3 text-balance text-4xl font-extrabold leading-none md:text-5xl">
            Belajar dulu, <span className="text-amber-200">convert kemudian.</span>
          </h2>
          <p className="mt-4 text-pretty text-lg leading-8 text-slate-300">
            Artikel praktis untuk freelancer, content creator, dan bisnis kecil. Bahas yang sering ditanya — pajak, fee, F&amp;F, sampai update rate.
          </p>
        </div>
        <a href="#blog" className="inline-flex items-center gap-2 text-sm font-bold text-amber-200">
          Semua artikel <ArrowRight size={14} />
        </a>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {BLOG_POSTS.map((post) => {
          const Icon = post.icon;
          return (
            <a key={post.title} href="#blog" className="flex flex-col gap-4 rounded-3xl border border-slate-700 bg-slate-800 p-6 text-inherit transition duration-200 hover:-translate-y-1 hover:border-slate-500">
              <div className={cn('grid h-24 place-items-center rounded-2xl', post.tint)}>
                <div className="grid size-14 place-items-center rounded-2xl bg-white text-brand-600 shadow">
                  <Icon size={20} />
                </div>
              </div>
              <div>
                <span className="inline-flex rounded-full border border-amber-200/30 bg-amber-200/10 px-3 py-1 text-[10px] font-bold uppercase text-amber-200">
                  {post.cat}
                </span>
                <h3 className="mt-3 text-pretty text-lg font-extrabold leading-snug text-slate-100">{post.title}</h3>
                <p className="mt-2 text-xs text-slate-400">📖 {post.read}</p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  </section>
);

export const LayananSection = () => {
  const layanan = [
    { icon: CreditCard, title: 'Top-up PayPal', desc: 'Isi saldo PayPal kamu pakai Rupiah. IDR → USD, langsung masuk ke akun PayPal-mu. Cocok buat bayar subscription, beli aset digital, atau kirim ke teman luar negeri.', cta: 'Detail Top-up', tag: 'Populer' },
    { icon: Landmark, title: 'Convert Stripe / Wise / Payoneer', desc: 'Bukan cuma PayPal. Kami juga handle Stripe payouts, Wise transfer, dan Payoneer balance — semua bisa dicairkan ke rekening Indonesia.', cta: 'Detail Convert' },
    { icon: Building2, title: 'Bisnis & Volume Tinggi', desc: 'Volume tinggi tiap bulan? Custom rate khusus untuk agency, studio, marketplace, atau bisnis yang butuh konsistensi & faktur formal.', cta: 'Hubungi Tim' },
  ];

  return (
    <section id="layanan" className="bg-white px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Layanan Lain</SectionEyebrow>
          <h2 className="mt-3 text-balance text-4xl font-extrabold leading-none text-slate-950 md:text-5xl">
            Bukan cuma <span className="text-brand-600">convert PayPal.</span>
          </h2>
          <p className="mt-4 text-pretty text-lg leading-8 text-slate-600">
            Top-up PayPal, convert Stripe/Wise, sampai layanan bisnis — semua dengan operator yang sama.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {layanan.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="relative flex flex-col rounded-3xl border border-slate-200 bg-slate-50 p-7 transition duration-200 hover:-translate-y-1 hover:shadow-lg">
                {item.tag && (
                  <span className="absolute right-5 top-5 rounded-full bg-amber-200 px-3 py-1 text-[10px] font-bold uppercase text-amber-900">
                    {item.tag}
                  </span>
                )}
                <div className="grid size-14 place-items-center rounded-2xl bg-brand-100 text-brand-600">
                  <Icon size={26} />
                </div>
                <h3 className="mt-5 text-2xl font-extrabold text-slate-950">{item.title}</h3>
                <p className="mt-3 flex-1 text-pretty text-sm leading-6 text-slate-600">{item.desc}</p>
                <a href={CONFIG.MESSENGER_URL} target="_blank" rel="noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-brand-600">
                  {item.cta} <ArrowRight size={14} />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const REFERENCE_FAQS = [
  { q: 'Berapa minimal & maksimal transaksi?', a: 'Min $1 (cuma buat coba-coba dulu juga boleh!), Max $5.000 per hari. Fee bertingkat: di bawah $50 fee 10% dari nominal, $50 ke atas fee flat $5 aja.' },
  { q: 'Berapa lama prosesnya?', a: 'Rata-rata 30–60 menit setelah kamu transfer & kirim bukti. Jam sibuk (siang & sore weekday) max 90 menit. Transfer di luar jam operasional (08:00–20:00 WIB) diproses pagi berikutnya.' },
  { q: 'Bank dan e-wallet apa saja yang didukung?', a: 'Semua bank besar Indonesia: BCA, Mandiri, BNI, BRI, CIMB Niaga, Permata, dan lainnya. E-wallet utama: GoPay, OVO, DANA, LinkAja, ShopeePay. Kalau ada bank/e-wallet lain, tinggal tanya admin di chat.' },
  { q: 'Apakah transaksi ini aman?', a: 'Sangat aman. Setiap transaksi diproses dua lapis — bot generate instruksi, lalu admin manusia verifikasi manual. Semua bukti transfer disimpan, dan kalau ada masalah dari sisi kami, refund 100% tanpa banyak tanya.' },
  { q: 'Bisa refund kalau ada masalah?', a: 'Bisa banget. Kalau ada error dari sisi kami (salah transfer, delay tidak wajar, dll), refund penuh — no questions asked. Kalau dari sisi PayPal/bank, kami bantu mediasi.' },
  { q: 'Kenapa harus pakai F&F bukan G&S?', a: 'Friends & Family (F&F) di PayPal nggak kena fee dari PayPal. Goods & Services (G&S) bakal kena fee ~5%, jadi rate yang kamu dapat lebih kecil. Kami pakai F&F supaya rate-nya lebih kompetitif buat kamu.' },
  { q: 'Apakah dikenakan pajak?', a: 'Lapak Bang Ade nggak motong pajak — itu tanggung jawab kamu sebagai freelancer untuk lapor PPh sendiri. Kami sediakan bukti transfer & invoice (kalau dibutuhkan) untuk keperluan pelaporan.' },
  { q: 'Bagaimana cara kerja Promo Jumat?', a: 'Tiap Jumat (07:00–23:59 WIB), fee otomatis turun 50% untuk nominal kecil. Lumayan banget kalau nominalnya kecil. Otomatis di-apply, nggak perlu kode promo.' },
];

export const ReferenceFAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <section id="faq" className="bg-slate-50 px-4 py-20 sm:px-6 md:py-24 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <SectionEyebrow>FAQ</SectionEyebrow>
          <h2 className="mt-3 text-balance text-4xl font-extrabold leading-none text-slate-950 md:text-5xl">
            Pertanyaan yang <span className="text-brand-600">sering ditanya.</span>
          </h2>
        </div>

        <div className="mt-12 rounded-3xl border border-slate-200 bg-white px-6 py-2 md:px-8">
          {REFERENCE_FAQS.map((faq, index) => (
            <div key={faq.q} className="border-b border-slate-200 last:border-b-0">
              <button
                type="button"
                onClick={() => {
                  setOpen(open === index ? -1 : index);
                  trackEvent('faq_open_question', { question_index: index });
                }}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={open === index}
              >
                <span className="text-base font-bold text-slate-950 md:text-lg">{faq.q}</span>
                <span className={cn('grid size-8 shrink-0 place-items-center rounded-full transition duration-200', open === index ? 'rotate-180 bg-brand-600 text-white' : 'bg-slate-100 text-slate-950')}>
                  <ChevronDown size={16} />
                </span>
              </button>
              {open === index && (
                <p className="pb-5 pr-12 text-pretty text-[15px] leading-7 text-slate-600">{faq.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
