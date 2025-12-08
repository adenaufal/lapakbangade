import React, { useState, useEffect } from 'react';
import { Send, Clock, CheckCircle, MessageCircle, RefreshCw, Star } from 'lucide-react';
import { RATE, CONFIG } from '../constants';
import { trackConversion, trackEvent, trackInitiateCheckout } from '../services/analytics';
import { fetchUsdIdrRate, rateConfig } from '../services/rates';

type Mode = 'convert' | 'topup';
type TopupCondition = 'promo' | 'normal' | 'mixed';

export const Hero = () => {
  const [usdAmount, setUsdAmount] = useState<number | string>(60);
  const [mode, setMode] = useState<Mode>('convert');
  const topupCondition: TopupCondition = 'promo';
  const [baseRate, setBaseRate] = useState(rateConfig.fallbackBase);
  const [rateSource, setRateSource] = useState<'api' | 'fallback'>('fallback');
  const [isLoadingRate, setIsLoadingRate] = useState(false);
  // Mock Friday logic: in a real app, use new Date().getDay() === 5
  const [isFriday] = useState(false);
  
  const rawUsd = Number(usdAmount) || 0;

  useEffect(() => {
    const loadRate = async () => {
      setIsLoadingRate(true);
      const result = await fetchUsdIdrRate();
      setBaseRate(result.baseRate);
      setRateSource(result.source);
      setIsLoadingRate(false);
      trackEvent('rate_viewed', { base_rate: result.baseRate, source: result.source });
    };
    loadRate();
  }, []);

  const convertRate = Math.max(0, baseRate - rateConfig.convertAdjustment);

  // Convert fee logic
  let fee = 0;
  let isPromoApplied = false;

  if (rawUsd < 50) {
    fee = rawUsd * RATE.FEE_UNDER_50_PERCENT;
    if (isFriday) {
        fee = fee * 0.5;
        isPromoApplied = true;
    }
  } else {
    fee = RATE.FEE_OVER_50_FLAT;
  }

  const finalUsd = Math.max(0, rawUsd - fee);
  const idrReceived = finalUsd * convertRate;

  // Top-up (IDR -> USD) uses different adjustments
  const promoTopupRate = Math.max(0, baseRate + rateConfig.topupPromoDelta);
  const normalTopupRate = Math.max(0, baseRate + rateConfig.topupNormalDelta);
  const mixedTopupRate = (promoTopupRate + normalTopupRate) / 2;
  const effectiveTopupRate =
    topupCondition === 'promo'
      ? promoTopupRate
      : topupCondition === 'normal'
      ? normalTopupRate
      : mixedTopupRate;
  const topupIdrTotal = rawUsd * effectiveTopupRate;
  
  const formatIDR = (val: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(val);
  };

  const handleConvertClick = () => {
    trackInitiateCheckout({
      amount: rawUsd,
      mode,
      rate: mode === 'convert' ? convertRate : effectiveTopupRate,
    });

    if (mode === 'convert') {
      trackConversion('USD', rawUsd);
      trackEvent('cta_hero_click', { amount: rawUsd, mode: 'convert', rate: convertRate });
    } else {
      trackConversion('USD', rawUsd);
      trackEvent('cta_hero_click', { amount: rawUsd, mode: 'topup', rate: effectiveTopupRate });
    }
    window.open(CONFIG.MESSENGER_URL, '_blank');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsdAmount(e.target.value);
  };

  return (
    <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden bg-white">
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 tracking-tight leading-tight mb-6">
              Convert PayPal ke Rupiah, <span className="text-brand-600">Cepat & Aman</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0 font-medium">
              Langsung cair ke bank atau e-wallet kamu.
            </p>

            {/* Quick Points */}
            <ul className="space-y-3 mb-8 text-gray-600 inline-block text-left">
                <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-brand-600 flex-shrink-0" />
                    <span>Diproses manual oleh admin</span>
                </li>
                <li className="flex items-center gap-2">
                    <CheckCircle size={20} className="text-brand-600 flex-shrink-0" />
                    <span>Anti ribet, tinggal kirim bukti</span>
                </li>
                <li className="flex items-center gap-2">
                    <Clock size={20} className="text-brand-600 flex-shrink-0" />
                    <span>Respon 30-60 menit</span>
                </li>
            </ul>

            {/* Social Proof Avatars */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=11" alt="User 1" />
                <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=32" alt="User 2" />
                <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=12" alt="User 3" />
                <img className="w-10 h-10 rounded-full border-2 border-white shadow-sm" src="https://i.pravatar.cc/100?img=53" alt="User 4" />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-600 shadow-sm">
                  99+
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                </div>
                <p className="text-xs text-gray-500 font-medium">Dipercaya <span className="text-gray-900 font-bold">500+ Freelancer</span></p>
              </div>
            </div>

            <div className="flex flex-col items-center lg:items-start gap-4 mb-8">
                <button 
                  onClick={handleConvertClick}
                  className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-brand-500/20 transition-all flex items-center justify-center gap-2"
                >
                    <MessageCircle size={24} />
                    Chat via Messenger
                </button>
                <div className="text-sm text-gray-500 font-medium bg-gray-50 px-3 py-1 rounded-full border border-gray-100">
                    Jam operasional {CONFIG.OPERATIONAL_HOURS}
                </div>
            </div>
          </div>

          {/* Calculator Card */}
          <div className="flex-1 w-full max-w-md" id="calculator">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden ring-1 ring-gray-100">
                <div className="bg-gray-900 p-4 text-white text-center">
                    <div className="font-bold text-lg">
                       1 USD = Rp {(mode === 'convert' ? convertRate : effectiveTopupRate).toLocaleString('id-ID')}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 flex items-center justify-center gap-1">
                        <RefreshCw size={12} className={isLoadingRate ? 'animate-spin' : ''} />
                        {isLoadingRate ? 'Memuat rate...' : `Sumber: ${rateSource === 'api' ? 'API' : 'Fallback'}`}
                    </div>
                </div>
                
                <div className="p-6 md:p-8 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <button
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-semibold transition ${mode === 'convert' ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-brand-200'}`}
                        onClick={() => setMode('convert')}
                      >
                        Convert USD ke IDR
                      </button>
                      <button
                        className={`w-full px-4 py-3 rounded-lg border text-sm font-semibold transition ${mode === 'topup' ? 'bg-brand-50 border-brand-200 text-brand-700' : 'bg-gray-50 border-gray-200 text-gray-600 hover:border-brand-200'}`}
                        onClick={() => setMode('topup')}
                      >
                        Top-up USD
                      </button>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Nominal (USD)</label>
                        <div className="relative group">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                            <input 
                                type="number" 
                                value={usdAmount}
                                onChange={handleInputChange}
                                className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-transparent outline-none text-xl font-bold text-gray-900 transition-all"
                                placeholder="50"
                                min={RATE.MIN_TRANSACTION}
                            />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Min ${RATE.MIN_TRANSACTION}, maks ${RATE.MAX_TRANSACTION} per hari.</p>
                    </div>

                    {mode === 'convert' ? (
                      <div className="flex flex-col gap-4 min-h-[160px]">
                        <div className="bg-blue-50/50 p-4 rounded-lg space-y-2 border border-dashed border-blue-100">
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Estimasi Fee</span>
                                <span className="font-medium">-${fee.toFixed(2)}</span>
                            </div>
                            {isPromoApplied && (
                                 <div className="flex justify-between text-xs text-green-600 font-bold">
                                    <span>Promo Jumat (50% Off Fee)</span>
                                    <span>Applied!</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1">
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Kamu Terima (IDR)</label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    readOnly
                                    value={formatIDR(idrReceived)}
                                    className="w-full pl-4 pr-4 py-3 bg-brand-50 border border-brand-200 rounded-lg text-2xl font-bold text-brand-700"
                                />
                            </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 min-h-[160px]">
                        <div className="rounded-lg border border-blue-100 bg-blue-50/50 p-4 space-y-1.5">
                          <div className="text-sm text-gray-700 font-semibold">Top-up rate (saldo tersedia)</div>
                          <p className="text-xs text-gray-500">Jika saldo admin kosong, rate normal akan dikonfirmasi dulu.</p>
                          <div className="flex justify-between text-sm text-gray-600 pt-1 border-t border-blue-100">
                              <span>IDR yang harus dibayar</span>
                              <span className="font-bold text-gray-900">{formatIDR(topupIdrTotal)}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <button 
                        onClick={handleConvertClick}
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold py-3.5 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                        <span>{mode === 'convert' ? 'Lanjut Convert ke Rupiah' : 'Lanjut Top-up USD'}</span>
                        <Send size={18} />
                    </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
