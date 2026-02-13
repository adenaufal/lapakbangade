import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Navbar } from '../Navbar';
import { Footer } from '../Footer';
import { CallToAction } from '../CallToAction';
import { FAQ } from '../FAQ';
import { USE_CASES_DATA, getRelatedPages } from '../../data/seo-data';
import { CONFIG } from '../../constants';
import { trackViewContent } from '../../services/analytics';
import { Check, Clock, Shield, TrendingUp, ArrowRight, Users, X } from 'lucide-react';

export const UseCasePage: React.FC = () => {
  const { useCaseSlug } = useParams<{ useCaseSlug: string }>();
  const useCase = USE_CASES_DATA.find(u => u.slug === useCaseSlug);

  useEffect(() => {
    if (useCase) {
      trackViewContent({ page: 'usecase_page', section: useCase.id });
    }
  }, [useCase]);

  if (!useCase) {
    return <Navigate to="/" replace />;
  }

  const relatedPages = getRelatedPages('usecase', useCase.id);
  const pageTitle = `${useCase.title} - Solusi Terbaik`;
  const pageDescription = `${useCase.description} Rate kompetitif, fee transparan, proses cepat 30-60 menit. Dipercaya oleh ${useCase.persona} di seluruh Indonesia.`;

  return (
    <>
      <Helmet>
        <title>{pageTitle} | Lapak Bang Ade</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={useCase.keywords.join(', ')} />
        <link rel="canonical" href={`https://lapakbangade.com/untuk-${useCase.slug}`} />

        {/* Open Graph */}
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={`https://lapakbangade.com/untuk-${useCase.slug}`} />
        <meta property="og:type" content="website" />

        {/* Twitter Card */}
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={pageDescription} />

        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialService",
            "name": `${useCase.title} - Lapak Bang Ade`,
            "description": pageDescription,
            "url": `https://lapakbangade.com/untuk-${useCase.slug}`,
            "areaServed": "ID",
            "availableLanguage": "id",
            "serviceType": `Convert PayPal untuk ${useCase.persona}`,
            "provider": {
              "@type": "Organization",
              "name": "Lapak Bang Ade",
              "url": "https://lapakbangade.com"
            },
            "audience": {
              "@type": "Audience",
              "audienceType": useCase.persona
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
                "name": useCase.title,
                "item": `https://lapakbangade.com/untuk-${useCase.slug}`
              }
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-white">
        <Navbar />

        <main>
          {/* Hero Section */}
          <section className="pt-24 pb-12 md:pt-32 md:pb-16 bg-gradient-to-br from-purple-50 via-white to-blue-50">
            <div className="container mx-auto px-4 max-w-6xl">
              {/* Breadcrumb */}
              <nav className="text-sm text-gray-600 mb-6" aria-label="Breadcrumb">
                <ol className="flex items-center space-x-2">
                  <li><a href="/" className="hover:text-brand-600 transition-colors">Home</a></li>
                  <li><span className="text-gray-400">/</span></li>
                  <li className="text-gray-900 font-medium">{useCase.title}</li>
                </ol>
              </nav>

              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-semibold mb-6">
                    <Users size={16} />
                    Untuk {useCase.persona}
                  </div>
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-6 leading-tight">
                    {useCase.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    {useCase.description}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 mb-8">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                        <TrendingUp className="text-green-600" size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Rate Terbaik</div>
                        <div className="text-sm text-gray-600">Maksimalkan Earning</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <Clock className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900">Proses Cepat</div>
                        <div className="text-sm text-gray-600">30-60 Menit</div>
                      </div>
                    </div>
                  </div>

                  <a
                    href={CONFIG.MESSENGER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                  >
                    Mulai Convert Sekarang
                    <ArrowRight size={20} />
                  </a>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <Check className="text-brand-600" size={24} />
                    Kenapa {useCase.persona} Pilih Kami?
                  </h3>
                  <ul className="space-y-4">
                    {useCase.benefits.map((benefit, idx) => (
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

          {/* Pain Points Section */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  Masalah yang Sering Dialami {useCase.persona}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Kami paham tantangan Anda dalam mencairkan PayPal
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {useCase.painPoints.map((painPoint, idx) => (
                  <div key={idx} className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                    <div className="flex items-start gap-3">
                      <X className="text-red-500 flex-shrink-0 mt-1" size={20} />
                      <p className="text-gray-700">{painPoint}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 mb-4">
                  Solusinya? Lapak Bang Ade!
                </p>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Kami menyediakan solusi convert PayPal yang dirancang khusus untuk memahami kebutuhan {useCase.persona} di Indonesia.
                </p>
              </div>
            </div>
          </section>

          {/* How We Help */}
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6">
                    Bagaimana Kami Bantu {useCase.persona}?
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-brand-100 rounded-lg flex items-center justify-center">
                        <Shield className="text-brand-600" size={24} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 mb-2">Aman & Terpercaya</h3>
                        <p className="text-gray-600">
                          Verifikasi manual oleh admin untuk setiap transaksi. Sistem anti-fraud aktif melindungi Anda dan uang Anda.
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
                          Rate convert kami lebih baik dari PayPal resmi. Update setiap 1-3 jam sesuai market untuk maksimalkan earning Anda.
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
                          Proses 30-60 menit saat jam operasional (08:00-20:00 WIB). Langsung cair ke bank atau e-wallet pilihan Anda.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Testimoni {useCase.persona}
                  </h3>
                  <div className="space-y-6">
                    <div className="border-l-4 border-brand-600 pl-4">
                      <p className="text-gray-700 italic mb-2">
                        "Sebagai {useCase.persona.toLowerCase()}, saya sering terima payment dari klien luar. Lapak Bang Ade sangat membantu dengan rate yang lebih baik dan proses yang cepat!"
                      </p>
                      <p className="text-sm font-semibold text-gray-900">- Pengguna {useCase.persona}</p>
                    </div>
                    <div className="border-l-4 border-brand-600 pl-4">
                      <p className="text-gray-700 italic mb-2">
                        "Fee transparan dan tidak ada biaya tersembunyi. Admin juga responsif dan helpful. Recommended!"
                      </p>
                      <p className="text-sm font-semibold text-gray-900">- {useCase.persona} dari Jakarta</p>
                    </div>
                  </div>
                  <a
                    href={CONFIG.MESSENGER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-6 block w-full text-center px-6 py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-lg transition-colors"
                  >
                    Join Ribuan {useCase.persona} Lainnya
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4 max-w-6xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">
                  Cara Convert PayPal untuk {useCase.persona}
                </h2>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Proses mudah dan cepat, dirancang khusus untuk {useCase.persona.toLowerCase()}
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    step: '1',
                    title: 'Chat Bot',
                    description: 'Hubungi bot Messenger kami dan pilih nominal convert'
                  },
                  {
                    step: '2',
                    title: 'Input Data',
                    description: 'Masukkan email PayPal dan rekening/e-wallet tujuan'
                  },
                  {
                    step: '3',
                    title: 'Transfer PayPal',
                    description: 'Transfer USD ke email admin via Friends & Family'
                  },
                  {
                    step: '4',
                    title: 'Terima Rupiah',
                    description: '30-60 menit, Rupiah langsung masuk ke rekening Anda'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="bg-purple-50 rounded-xl p-6 h-full border-2 border-purple-100 hover:border-purple-300 transition-colors">
                      <div className="w-12 h-12 bg-brand-600 text-white rounded-full flex items-center justify-center font-black text-xl mb-4">
                        {item.step}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                    {idx < 3 && (
                      <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                        <ArrowRight className="text-purple-300" size={24} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ */}
          <FAQ />

          {/* Related Use Cases */}
          {relatedPages.length > 0 && (
            <section className="py-16 bg-gray-50">
              <div className="container mx-auto px-4 max-w-6xl">
                <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-8">
                  Solusi untuk Profesi Lainnya
                </h2>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {relatedPages.map((page, idx) => (
                    <a
                      key={idx}
                      href={page.url}
                      className="block p-6 bg-white hover:bg-purple-50 border border-gray-200 hover:border-purple-300 rounded-lg transition-all group"
                    >
                      <div className="flex flex-col gap-2">
                        <div className="text-sm font-semibold text-gray-900 group-hover:text-purple-600">
                          {page.title}
                        </div>
                        <ArrowRight size={16} className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
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
