import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { CallToAction } from '../CallToAction';
import { FAQ } from '../FAQ';
import { BANKS_DATA, getRelatedPages } from '../../data/seo-data';
import { CONFIG } from '../../constants';
import { trackViewContent } from '../../services/analytics';
import { Check, Clock, Shield, TrendingUp, ArrowRight, Building2 } from 'lucide-react';

export const BankPage: React.FC = () => {
  const { bankId } = useParams<{ bankId: string }>();
  const bank = BANKS_DATA.find(b => b.id === bankId);

  useEffect(() => {
    if (bank) {
      trackViewContent({ page: 'bank_page', section: bank.id });
    }
  }, [bank]);

  if (!bank) {
    return <Navigate to="/" replace />;
  }

  const relatedPages = getRelatedPages('bank', bank.id);
  const pageTitle = `Convert PayPal ke ${bank.name} - Rate Terbaik & Proses Cepat`;
  const pageDescription = `Jasa convert PayPal USD ke Rupiah langsung ke rekening ${bank.fullName}. Rate kompetitif, fee transparan, proses 30-60 menit. Aman, terpercaya, anti-fraud.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle} | Lapak Bang Ade</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={`convert paypal ke ${bank.id}, cairkan paypal ke ${bank.name}, jual saldo paypal ${bank.name}, tukar paypal ${bank.id}, convert paypal bank ${bank.name}`} />
        <link rel="canonical" href={`https://lapakbangade.com/convert-paypal-ke-${bank.id}`} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://lapakbangade.com/convert-paypal-ke-${bank.id}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": `Convert PayPal ke ${bank.name} - Lapak Bang Ade`,
            "description": pageDescription,
            "url": `https://lapakbangade.com/convert-paypal-ke-${bank.id}`,
            "areaServed": "ID",
            "availableLanguage": "id",
            "serviceType": `Convert PayPal ke ${bank.fullName}`,
            "provider": {
              "@type": "Organization",
              "name": "Lapak Bang Ade",
              "url": "https://lapakbangade.com"
            },
            "offers": {
              "@type": "Offer",
              "priceCurrency": "IDR",
              "description": `Jasa convert PayPal ke ${bank.name} dengan rate kompetitif`
            }
          })}
        </script>

        {/* Breadcrumb Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://lapakbangade.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": `Convert PayPal ke ${bank.name}`,
                "item": `https://lapakbangade.com/convert-paypal-ke-${bank.id}`
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-brand-50 via-white to-brand-50">
            <div className="container mx-auto px-4 max-w-6xl">
              {/* Breadcrumb */}
              <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li><a href="/" className="hover:text-brand-600 transition-colors">Home</a></li>
                  <li><span className="text-gray-400">/</span></li>
                  <li className="text-gray-900 font-medium">Convert PayPal ke {bank.name}</li>
                </ol>
              </nav>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-100 text-brand-700 rounded-full text-sm font-semibold mb-6">
                    <Building2 size={16} />
                    {bank.fullName}
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                    Convert PayPal ke<br />
                    <span className="text-brand-600">{bank.name}</span>
                  </h1>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {bank.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-green-600" size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Rate Terbaik</div>
                        <div className="text-sm text-gray-600">Kompetitif & Update Rutin</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">30-60 Menit</div>
                        <div className="text-sm text-gray-600">Proses Cepat</div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={CONFIG.MESSENGER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Convert Sekarang ke {bank.name}
                    <ArrowRight size={20} />
                  </a>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Check className="text-brand-600" size={24} />
                    Keuntungan Convert ke {bank.name}
                  </h3>
                  <ul className="space-y-4">
                    {bank.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works for Bank Specific */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  Cara Convert PayPal ke {bank.name}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Proses mudah dan cepat, uang langsung masuk ke rekening {bank.fullName} Anda
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Chat Bot',
                    description: `Hubungi bot Messenger kami dan pilih nominal yang ingin di-convert ke ${bank.name}`
                  },
                  {
                    step: '2',
                    title: 'Input Data',
                    description: `Masukkan email PayPal dan nomor rekening ${bank.name} Anda`
                  },
                  {
                    step: '3',
                    title: 'Transfer PayPal',
                    description: 'Transfer USD ke email admin kami (weiss.schrodinger@gmail.com) via Friends & Family'
                  },
                  {
                    step: '4',
                    title: `Terima di ${bank.name}`,
                    description: `Dalam 30-60 menit, Rupiah langsung masuk ke rekening ${bank.name} Anda`
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="bg-brand-50 rounded-xl p-6 h-full border-2 border-brand-100 hover:border-brand-300 transition-colors">
                      <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center font-black text-xl mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="text-brand-300" size={24} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Why Choose Us for This Bank */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                    Kenapa Pilih Kami untuk Convert ke {bank.name}?
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                        <Shield className="text-brand-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Aman & Terpercaya</h3>
                        <p className="text-gray-600">
                          Verifikasi manual oleh admin untuk setiap transaksi. Sistem anti-fraud aktif melindungi Anda.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-brand-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Rate Kompetitif</h3>
                        <p className="text-gray-600">
                          Rate convert kami lebih baik dari PayPal resmi, update setiap 1-3 jam sesuai market.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                        <Clock className="text-brand-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Proses Cepat</h3>
                        <p className="text-gray-600">
                          Transfer langsung ke {bank.name} Anda dalam 30-60 menit saat jam operasional (08:00-20:00 WIB).
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Spesial untuk Pengguna {bank.name}
                  </h3>
                  <ul className="space-y-4 mb-6">
                    <li className="flex items-center gap-3">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">Transfer gratis ke {bank.name} (tidak ada biaya transfer)</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">Proses prioritas untuk nasabah {bank.name}</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">Verifikasi cepat untuk rekening verified</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-gray-700">Support via WA untuk kendala {bank.name}</span>
                    </li>
                  </ul>
                  <a
                    href={CONFIG.MESSENGER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="block w-full text-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Mulai Convert Sekarang
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQ />

          {/* Related Pages */}
          {relatedPages.length > 0 && (
            <section className="py-16 bg-white">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
                  Layanan Convert PayPal Lainnya
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {relatedPages.map((page, idx) => (
                    <a
                      key={idx}
                      href={page.url}
                      className="block p-4 bg-gray-50 hover:bg-brand-50 border border-gray-200 hover:border-brand-300 rounded-lg transition-all group"
                    >
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:text-brand-600">
                        {page.title}
                        <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* CTA */}
          <CallToAction />
        </main>

        <Footer />
      </div>
    </>
  );
};
