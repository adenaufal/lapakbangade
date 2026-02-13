/**
 * Programmatic SEO Data Structure
 * This file contains all data for generating programmatic SEO pages
 */

export interface BankData {
  id: string;
  name: string;
  fullName: string;
  logo?: string;
  popular: boolean;
  description: string;
  benefits: string[];
}

export interface EWalletData {
  id: string;
  name: string;
  fullName: string;
  logo?: string;
  popular: boolean;
  description: string;
  benefits: string[];
}

export interface CityData {
  id: string;
  name: string;
  province: string;
  population?: number;
  timezone: string;
  keywords: string[];
}

export interface ServiceVariation {
  id: string;
  slug: string;
  title: string;
  h1: string;
  description: string;
  keywords: string[];
  serviceType: 'convert' | 'topup';
}

export interface UseCaseData {
  id: string;
  slug: string;
  title: string;
  persona: string;
  description: string;
  painPoints: string[];
  benefits: string[];
  keywords: string[];
}

// ============ BANKS DATA ============
export const BANKS_DATA: BankData[] = [
  {
    id: 'bca',
    name: 'BCA',
    fullName: 'Bank Central Asia',
    popular: true,
    description: 'Bank swasta terbesar di Indonesia dengan jaringan ATM terluas dan layanan internet banking terpercaya.',
    benefits: [
      'Jaringan ATM terluas di Indonesia',
      'Transfer instan 24/7',
      'Internet banking terpercaya',
      'Gratis biaya transfer antar BCA',
      'Proses pencairan cepat'
    ]
  },
  {
    id: 'mandiri',
    name: 'Mandiri',
    fullName: 'Bank Mandiri',
    popular: true,
    description: 'Bank BUMN terbesar dengan jangkauan nasional dan layanan perbankan lengkap.',
    benefits: [
      'Bank BUMN terpercaya',
      'Jangkauan nasional luas',
      'Layanan 24 jam',
      'Livin by Mandiri untuk kemudahan',
      'Transfer real-time'
    ]
  },
  {
    id: 'bni',
    name: 'BNI',
    fullName: 'Bank Negara Indonesia',
    popular: true,
    description: 'Bank BUMN dengan reputasi solid dan layanan perbankan internasional.',
    benefits: [
      'Bank BUMN dengan reputasi solid',
      'Mobile banking BNI Mobile',
      'Transfer cepat dan aman',
      'Jaringan ATM luas',
      'Layanan customer service responsif'
    ]
  },
  {
    id: 'bri',
    name: 'BRI',
    fullName: 'Bank Rakyat Indonesia',
    popular: true,
    description: 'Bank dengan jangkauan terluas hingga pelosok dengan jutaan nasabah.',
    benefits: [
      'Jangkauan hingga pelosok daerah',
      'Bank dengan nasabah terbanyak',
      'BRImo untuk mobile banking',
      'Transfer instan antar BRI',
      'Layanan prioritas untuk freelancer'
    ]
  },
  {
    id: 'bsi',
    name: 'BSI',
    fullName: 'Bank Syariah Indonesia',
    popular: true,
    description: 'Bank syariah terbesar di Indonesia dengan prinsip-prinsip syariah.',
    benefits: [
      'Bank syariah terbesar',
      'Prinsip-prinsip syariah',
      'BSI Mobile untuk kemudahan',
      'Transfer bebas riba',
      'Layanan sesuai syariat Islam'
    ]
  },
  {
    id: 'cimb',
    name: 'CIMB Niaga',
    fullName: 'CIMB Niaga',
    popular: false,
    description: 'Bank dengan layanan digital OCTO dan kemudahan transaksi online.',
    benefits: [
      'OCTO Mobile untuk digital banking',
      'Transfer real-time',
      'Layanan customer service 24/7',
      'Gratis biaya admin bulanan (dengan syarat)',
      'Proses cepat'
    ]
  },
  {
    id: 'permata',
    name: 'Permata',
    fullName: 'Bank Permata',
    popular: false,
    description: 'Bank swasta dengan layanan perbankan modern dan digital.',
    benefits: [
      'PermataMobile X untuk banking',
      'Transfer instan',
      'Layanan digital modern',
      'Proses pencairan efisien',
      'Customer service responsif'
    ]
  },
  {
    id: 'danamon',
    name: 'Danamon',
    fullName: 'Bank Danamon',
    popular: false,
    description: 'Bank swasta dengan layanan D-Bank untuk kemudahan transaksi.',
    benefits: [
      'D-Bank mobile banking',
      'Transfer 24 jam',
      'Layanan lengkap',
      'Proses aman',
      'Jaringan ATM luas'
    ]
  },
  {
    id: 'btn',
    name: 'BTN',
    fullName: 'Bank Tabungan Negara',
    popular: false,
    description: 'Bank BUMN dengan fokus pada pembiayaan perumahan dan layanan tabungan.',
    benefits: [
      'Bank BUMN terpercaya',
      'BTN Mobile untuk kemudahan',
      'Transfer aman',
      'Layanan customer service baik',
      'Proses pencairan lancar'
    ]
  }
];

// ============ E-WALLETS DATA ============
export const EWALLETS_DATA: EWalletData[] = [
  {
    id: 'dana',
    name: 'DANA',
    fullName: 'DANA Digital Wallet',
    popular: true,
    description: 'Dompet digital paling populer di Indonesia dengan jutaan merchant dan kemudahan top up.',
    benefits: [
      'Dompet digital terpopuler',
      'Diterima di jutaan merchant',
      'Top up mudah dan cepat',
      'Transfer gratis ke sesama DANA',
      'Promo cashback rutin',
      'Pencairan instan langsung ke saldo'
    ]
  },
  {
    id: 'ovo',
    name: 'OVO',
    fullName: 'OVO Digital Wallet',
    popular: true,
    description: 'E-wallet dengan ekosistem luas dari Grab hingga Tokopedia.',
    benefits: [
      'Terintegrasi dengan Grab dan Tokopedia',
      'OVO Points untuk reward',
      'Transfer instan',
      'Diterima di banyak merchant',
      'Promo cashback menarik',
      'Pencairan langsung ke saldo OVO'
    ]
  },
  {
    id: 'gopay',
    name: 'GoPay',
    fullName: 'GoPay Gojek',
    popular: true,
    description: 'Dompet digital dari Gojek dengan jutaan pengguna aktif.',
    benefits: [
      'Terintegrasi dengan Gojek',
      'GoPayCoins untuk reward',
      'Transfer ke teman gratis',
      'Diterima di semua layanan Gojek',
      'Promo rutin untuk pengguna',
      'Pencairan cepat ke saldo GoPay'
    ]
  },
  {
    id: 'shopeepay',
    name: 'ShopeePay',
    fullName: 'ShopeePay',
    popular: true,
    description: 'E-wallet dari Shopee dengan banyak promo untuk belanja online.',
    benefits: [
      'Terintegrasi dengan Shopee',
      'Promo cashback untuk belanja',
      'ShopeePay Coins untuk reward',
      'Transfer gratis ke sesama ShopeePay',
      'Diterima di merchant SPayLater',
      'Pencairan instan ke saldo'
    ]
  },
  {
    id: 'linkaja',
    name: 'LinkAja',
    fullName: 'LinkAja',
    popular: true,
    description: 'E-wallet dari BUMN dengan jangkauan luas dan berbagai layanan.',
    benefits: [
      'E-wallet BUMN terpercaya',
      'Terintegrasi dengan berbagai layanan',
      'LinkAja Syariah tersedia',
      'Promo rutin untuk pengguna',
      'Diterima di merchant nasional',
      'Pencairan aman dan cepat'
    ]
  }
];

// ============ CITIES DATA ============
export const CITIES_DATA: CityData[] = [
  {
    id: 'jakarta',
    name: 'Jakarta',
    province: 'DKI Jakarta',
    population: 10_600_000,
    timezone: 'WIB',
    keywords: ['jakarta', 'dki jakarta', 'ibukota', 'jabodetabek']
  },
  {
    id: 'surabaya',
    name: 'Surabaya',
    province: 'Jawa Timur',
    population: 2_900_000,
    timezone: 'WIB',
    keywords: ['surabaya', 'kota pahlawan', 'jawa timur', 'sby']
  },
  {
    id: 'bandung',
    name: 'Bandung',
    province: 'Jawa Barat',
    population: 2_500_000,
    timezone: 'WIB',
    keywords: ['bandung', 'kota kembang', 'jawa barat', 'bdg']
  },
  {
    id: 'bekasi',
    name: 'Bekasi',
    province: 'Jawa Barat',
    population: 2_500_000,
    timezone: 'WIB',
    keywords: ['bekasi', 'jabodetabek', 'jawa barat']
  },
  {
    id: 'medan',
    name: 'Medan',
    province: 'Sumatera Utara',
    population: 2_400_000,
    timezone: 'WIB',
    keywords: ['medan', 'sumatera utara', 'sumut']
  },
  {
    id: 'tangerang',
    name: 'Tangerang',
    province: 'Banten',
    population: 2_100_000,
    timezone: 'WIB',
    keywords: ['tangerang', 'banten', 'jabodetabek']
  },
  {
    id: 'depok',
    name: 'Depok',
    province: 'Jawa Barat',
    population: 2_000_000,
    timezone: 'WIB',
    keywords: ['depok', 'jabodetabek', 'jawa barat']
  },
  {
    id: 'semarang',
    name: 'Semarang',
    province: 'Jawa Tengah',
    population: 1_600_000,
    timezone: 'WIB',
    keywords: ['semarang', 'jawa tengah', 'jateng']
  },
  {
    id: 'palembang',
    name: 'Palembang',
    province: 'Sumatera Selatan',
    population: 1_600_000,
    timezone: 'WIB',
    keywords: ['palembang', 'sumatera selatan', 'sumsel', 'pempek']
  },
  {
    id: 'makassar',
    name: 'Makassar',
    province: 'Sulawesi Selatan',
    population: 1_400_000,
    timezone: 'WITA',
    keywords: ['makassar', 'sulawesi selatan', 'sulsel']
  },
  {
    id: 'bogor',
    name: 'Bogor',
    province: 'Jawa Barat',
    population: 1_000_000,
    timezone: 'WIB',
    keywords: ['bogor', 'kota hujan', 'jawa barat', 'jabodetabek']
  },
  {
    id: 'yogyakarta',
    name: 'Yogyakarta',
    province: 'DI Yogyakarta',
    population: 400_000,
    timezone: 'WIB',
    keywords: ['yogyakarta', 'jogja', 'yogya', 'diy', 'kota pelajar']
  },
  {
    id: 'malang',
    name: 'Malang',
    province: 'Jawa Timur',
    population: 900_000,
    timezone: 'WIB',
    keywords: ['malang', 'jawa timur', 'kota apel']
  },
  {
    id: 'batam',
    name: 'Batam',
    province: 'Kepulauan Riau',
    population: 1_200_000,
    timezone: 'WIB',
    keywords: ['batam', 'kepulauan riau', 'kepri']
  },
  {
    id: 'pekanbaru',
    name: 'Pekanbaru',
    province: 'Riau',
    population: 1_000_000,
    timezone: 'WIB',
    keywords: ['pekanbaru', 'riau', 'pkb']
  },
  {
    id: 'denpasar',
    name: 'Denpasar',
    province: 'Bali',
    population: 900_000,
    timezone: 'WITA',
    keywords: ['denpasar', 'bali', 'dps']
  },
  {
    id: 'samarinda',
    name: 'Samarinda',
    province: 'Kalimantan Timur',
    population: 800_000,
    timezone: 'WITA',
    keywords: ['samarinda', 'kalimantan timur', 'kaltim']
  },
  {
    id: 'banjarmasin',
    name: 'Banjarmasin',
    province: 'Kalimantan Selatan',
    population: 700_000,
    timezone: 'WITA',
    keywords: ['banjarmasin', 'kalimantan selatan', 'kalsel']
  },
  {
    id: 'balikpapan',
    name: 'Balikpapan',
    province: 'Kalimantan Timur',
    population: 700_000,
    timezone: 'WITA',
    keywords: ['balikpapan', 'kalimantan timur', 'kaltim']
  },
  {
    id: 'manado',
    name: 'Manado',
    province: 'Sulawesi Utara',
    population: 500_000,
    timezone: 'WITA',
    keywords: ['manado', 'sulawesi utara', 'sulut']
  }
];

// ============ SERVICE VARIATIONS ============
export const SERVICE_VARIATIONS: ServiceVariation[] = [
  {
    id: 'convert-paypal',
    slug: 'convert-paypal',
    title: 'Convert PayPal ke Rupiah',
    h1: 'Jasa Convert PayPal ke Rupiah Terpercaya',
    description: 'Layanan convert PayPal USD ke Rupiah (IDR) dengan rate kompetitif, fee transparan, dan proses aman.',
    keywords: ['convert paypal', 'convert paypal ke rupiah', 'convert paypal ke idr', 'konversi paypal'],
    serviceType: 'convert'
  },
  {
    id: 'jual-saldo-paypal',
    slug: 'jual-saldo-paypal',
    title: 'Jual Saldo PayPal Terpercaya',
    h1: 'Jual Saldo PayPal Anda dengan Aman',
    description: 'Jual saldo PayPal USD ke Rupiah dengan rate terbaik, proses cepat, dan pencairan ke bank/e-wallet Indonesia.',
    keywords: ['jual saldo paypal', 'jual paypal', 'jual usd paypal', 'mencairkan paypal'],
    serviceType: 'convert'
  },
  {
    id: 'tukar-paypal',
    slug: 'tukar-paypal',
    title: 'Tukar PayPal ke Rupiah',
    h1: 'Tukar PayPal USD ke IDR dengan Mudah',
    description: 'Tukar saldo PayPal Anda ke Rupiah dengan rate kompetitif dan proses verifikasi manual yang aman.',
    keywords: ['tukar paypal', 'tukar paypal ke rupiah', 'tukar usd paypal', 'tukar saldo paypal'],
    serviceType: 'convert'
  },
  {
    id: 'cairkan-paypal',
    slug: 'cairkan-paypal',
    title: 'Cairkan Saldo PayPal ke Rekening',
    h1: 'Cairkan Saldo PayPal ke Bank/E-Wallet',
    description: 'Cairkan saldo PayPal langsung ke rekening bank atau e-wallet Indonesia dengan proses cepat dan aman.',
    keywords: ['cairkan paypal', 'cairkan saldo paypal', 'pencairan paypal', 'withdraw paypal'],
    serviceType: 'convert'
  },
  {
    id: 'top-up-paypal',
    slug: 'top-up-paypal',
    title: 'Top Up Saldo PayPal',
    h1: 'Isi Ulang Saldo PayPal dengan Mudah',
    description: 'Top up saldo PayPal dengan transfer Rupiah. Rate kompetitif tanpa fee tambahan untuk isi ulang PayPal.',
    keywords: ['top up paypal', 'isi saldo paypal', 'topup paypal', 'tambah saldo paypal'],
    serviceType: 'topup'
  },
  {
    id: 'beli-saldo-paypal',
    slug: 'beli-saldo-paypal',
    title: 'Beli Saldo PayPal Terpercaya',
    h1: 'Beli Saldo PayPal USD dengan Transfer IDR',
    description: 'Beli saldo PayPal dengan transfer Rupiah. Proses cepat, aman, dan rate lebih murah dari market.',
    keywords: ['beli saldo paypal', 'beli paypal', 'beli usd paypal', 'tambah saldo paypal'],
    serviceType: 'topup'
  }
];

// ============ USE CASES DATA ============
export const USE_CASES_DATA: UseCaseData[] = [
  {
    id: 'freelancer',
    slug: 'freelancer',
    title: 'Convert PayPal untuk Freelancer',
    persona: 'Freelancer',
    description: 'Solusi terbaik untuk freelancer yang terima pembayaran dari klien luar negeri via PayPal.',
    painPoints: [
      'Biaya withdraw PayPal resmi terlalu mahal',
      'Proses pencairan lama dan ribet',
      'Rate PayPal resmi tidak kompetitif',
      'Butuh pencairan cepat untuk kebutuhan mendesak',
      'Khawatir dengan keamanan jasa convert'
    ],
    benefits: [
      'Rate lebih baik dari PayPal resmi',
      'Fee transparan dan kompetitif',
      'Proses 30-60 menit saat jam operasional',
      'Verifikasi manual untuk keamanan',
      'Support semua bank dan e-wallet'
    ],
    keywords: [
      'convert paypal freelancer',
      'cairkan paypal upwork',
      'cairkan paypal fiverr',
      'jual saldo paypal freelance',
      'tukar paypal freelancer indonesia'
    ]
  },
  {
    id: 'online-seller',
    slug: 'online-seller',
    title: 'Convert PayPal untuk Online Seller',
    persona: 'Online Seller',
    description: 'Layanan convert PayPal khusus untuk penjual online yang terima pembayaran internasional.',
    painPoints: [
      'Terima pembayaran PayPal dari buyer luar negeri',
      'Butuh cairkan ke Rupiah untuk restock',
      'Biaya PayPal resmi memakan profit',
      'Proses withdraw PayPal terlalu lama',
      'Cash flow terganggu karena hold fund'
    ],
    benefits: [
      'Rate kompetitif untuk maksimalkan profit',
      'Proses cepat untuk cash flow lancar',
      'Fee bertingkat - makin besar makin murah',
      'Pencairan ke bank/e-wallet pilihan',
      'Admin berpengalaman tangani seller'
    ],
    keywords: [
      'convert paypal online seller',
      'cairkan paypal ebay',
      'cairkan paypal etsy',
      'jual saldo paypal seller',
      'tukar paypal penjual online'
    ]
  },
  {
    id: 'content-creator',
    slug: 'content-creator',
    title: 'Convert PayPal untuk Content Creator',
    persona: 'Content Creator',
    description: 'Solusi pencairan PayPal untuk kreator konten yang monetize dari platform internasional.',
    painPoints: [
      'Terima earning dari YouTube, Patreon, Ko-fi',
      'Biaya withdraw PayPal resmi potong income',
      'Butuh cairkan cepat untuk kebutuhan produksi',
      'Rate PayPal resmi kurang menguntungkan',
      'Proses ribet untuk kreator pemula'
    ],
    benefits: [
      'Rate terbaik untuk maksimalkan earning',
      'Proses mudah untuk kreator pemula',
      'Fee transparan tanpa biaya tersembunyi',
      'Pencairan cepat 30-60 menit',
      'Customer service responsif'
    ],
    keywords: [
      'convert paypal content creator',
      'cairkan paypal youtube',
      'cairkan paypal patreon',
      'jual saldo paypal kreator',
      'tukar paypal youtuber indonesia'
    ]
  },
  {
    id: 'gamer',
    slug: 'gamer',
    title: 'Convert PayPal untuk Gamer',
    persona: 'Gamer',
    description: 'Layanan convert PayPal untuk gamer yang jual item, boost account, atau terima hadiah turnamen.',
    painPoints: [
      'Jual item game atau boost account dapat PayPal',
      'Hadiah turnamen e-sports dalam USD',
      'Butuh uang cepat untuk top up game atau kebutuhan',
      'Biaya PayPal resmi terlalu tinggi',
      'Proses withdraw PayPal lama'
    ],
    benefits: [
      'Rate kompetitif untuk gamer',
      'Proses cepat untuk top up game lagi',
      'Minimal transaksi cuma $1',
      'Pencairan ke DANA, OVO, GoPay',
      'Admin paham kebutuhan gamer'
    ],
    keywords: [
      'convert paypal gamer',
      'cairkan paypal game',
      'jual saldo paypal gaming',
      'tukar paypal e-sports',
      'cairkan hadiah turnamen paypal'
    ]
  },
  {
    id: 'affiliate-marketer',
    slug: 'affiliate-marketer',
    title: 'Convert PayPal untuk Affiliate Marketer',
    persona: 'Affiliate Marketer',
    description: 'Cairkan komisi affiliate dari program internasional dengan rate terbaik.',
    painPoints: [
      'Terima komisi dari program affiliate luar',
      'Biaya withdraw PayPal potong komisi',
      'Butuh cairkan untuk reinvest campaign',
      'Rate PayPal resmi kurang untung',
      'Proses lama ganggu cash flow'
    ],
    benefits: [
      'Rate terbaik untuk maksimalkan ROI',
      'Fee bertingkat - komisi besar fee lebih murah',
      'Proses cepat untuk reinvest',
      'Verifikasi aman anti-fraud',
      'Support bank dan e-wallet lengkap'
    ],
    keywords: [
      'convert paypal affiliate marketer',
      'cairkan komisi affiliate paypal',
      'jual saldo paypal affiliasi',
      'tukar paypal affiliate',
      'cairkan paypal clickbank'
    ]
  },
  {
    id: 'ilustrator',
    slug: 'ilustrator',
    title: 'Convert PayPal untuk Ilustrator',
    persona: 'Ilustrator & Designer',
    description: 'Solusi pencairan PayPal untuk ilustrator dan desainer yang kerja dengan klien internasional.',
    painPoints: [
      'Terima pembayaran komisi art dari klien luar',
      'Biaya PayPal resmi mahal untuk seniman',
      'Butuh uang cepat untuk alat gambar atau software',
      'Rate PayPal tidak ramah kreator',
      'Proses ribet untuk fokus berkarya'
    ],
    benefits: [
      'Rate kompetitif untuk kreator',
      'Proses mudah dan cepat',
      'Fee transparan tanpa biaya tersembunyi',
      'Pencairan 30-60 menit',
      'Admin support kreator Indonesia'
    ],
    keywords: [
      'convert paypal ilustrator',
      'cairkan paypal commission art',
      'jual saldo paypal artist',
      'tukar paypal desainer',
      'cairkan paypal freelance artist'
    ]
  }
];

// ============ HELPER FUNCTIONS ============

/**
 * Get all programmatic page URLs for sitemap generation
 */
export function getAllProgrammaticUrls(baseUrl: string = 'https://lapakbangade.com'): string[] {
  const urls: string[] = [];

  // Service variation pages
  SERVICE_VARIATIONS.forEach(service => {
    urls.push(`${baseUrl}/${service.slug}`);
  });

  // Bank-specific pages
  BANKS_DATA.forEach(bank => {
    urls.push(`${baseUrl}/convert-paypal-ke-${bank.id}`);
  });

  // E-wallet specific pages
  EWALLETS_DATA.forEach(ewallet => {
    urls.push(`${baseUrl}/convert-paypal-ke-${ewallet.id}`);
  });

  // City-based pages (top 10 cities only for now)
  CITIES_DATA.slice(0, 10).forEach(city => {
    urls.push(`${baseUrl}/convert-paypal-${city.id}`);
  });

  // Use case pages
  USE_CASES_DATA.forEach(useCase => {
    urls.push(`${baseUrl}/untuk-${useCase.slug}`);
  });

  return urls;
}

/**
 * Get related pages for internal linking
 */
export function getRelatedPages(currentPageType: string, currentId: string): Array<{url: string, title: string}> {
  const related: Array<{url: string, title: string}> = [];

  // Add 3-5 related pages based on page type
  if (currentPageType === 'bank') {
    // Add other popular banks
    BANKS_DATA.filter(b => b.popular && b.id !== currentId).slice(0, 3).forEach(bank => {
      related.push({
        url: `/convert-paypal-ke-${bank.id}`,
        title: `Convert PayPal ke ${bank.name}`
      });
    });
    // Add related e-wallets
    EWALLETS_DATA.slice(0, 2).forEach(ewallet => {
      related.push({
        url: `/convert-paypal-ke-${ewallet.id}`,
        title: `Convert PayPal ke ${ewallet.name}`
      });
    });
  } else if (currentPageType === 'ewallet') {
    // Add other e-wallets
    EWALLETS_DATA.filter(e => e.id !== currentId).slice(0, 3).forEach(ewallet => {
      related.push({
        url: `/convert-paypal-ke-${ewallet.id}`,
        title: `Convert PayPal ke ${ewallet.name}`
      });
    });
    // Add popular banks
    BANKS_DATA.filter(b => b.popular).slice(0, 2).forEach(bank => {
      related.push({
        url: `/convert-paypal-ke-${bank.id}`,
        title: `Convert PayPal ke ${bank.name}`
      });
    });
  } else if (currentPageType === 'city') {
    // Add nearby or similar-sized cities
    const currentCity = CITIES_DATA.find(c => c.id === currentId);
    if (currentCity) {
      CITIES_DATA.filter(c => c.province === currentCity.province && c.id !== currentId).slice(0, 2).forEach(city => {
        related.push({
          url: `/convert-paypal-${city.id}`,
          title: `Convert PayPal ${city.name}`
        });
      });
      CITIES_DATA.filter(c => c.province !== currentCity.province && c.id !== currentId).slice(0, 3).forEach(city => {
        related.push({
          url: `/convert-paypal-${city.id}`,
          title: `Convert PayPal ${city.name}`
        });
      });
    }
  } else if (currentPageType === 'usecase') {
    // Add other use cases
    USE_CASES_DATA.filter(u => u.id !== currentId).slice(0, 4).forEach(useCase => {
      related.push({
        url: `/untuk-${useCase.slug}`,
        title: useCase.title
      });
    });
  }

  return related;
}
