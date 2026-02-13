import React from 'react';
import { BANKS_DATA, EWALLETS_DATA, USE_CASES_DATA } from '../data/seo-data';
import { ArrowRight } from 'lucide-react';

interface ProgrammaticLinksProps {
  variant?: 'compact' | 'full';
  className?: string;
}

export const ProgrammaticLinks: React.FC<ProgrammaticLinksProps> = ({
  variant = 'full',
  className = ''
}) => {
  const popularBanks = BANKS_DATA.filter(b => b.popular).slice(0, 5);
  const popularEWallets = EWALLETS_DATA.filter(e => e.popular).slice(0, 5);
  const featuredUseCases = USE_CASES_DATA.slice(0, 4);

  if (variant === 'compact') {
    return (
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {/* Banks */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Convert ke Bank</h3>
          <ul className="space-y-2">
            {popularBanks.map(bank => (
              <li key={bank.id}>
                <a
                  href={`/convert-paypal-ke-${bank.id}`}
                  className="text-sm text-gray-600 hover:text-brand-600 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Convert PayPal ke {bank.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* E-Wallets */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Convert ke E-Wallet</h3>
          <ul className="space-y-2">
            {popularEWallets.map(ewallet => (
              <li key={ewallet.id}>
                <a
                  href={`/convert-paypal-ke-${ewallet.id}`}
                  className="text-sm text-gray-600 hover:text-brand-600 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  Convert PayPal ke {ewallet.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Use Cases */}
        <div>
          <h3 className="font-bold text-gray-900 mb-3">Solusi untuk Anda</h3>
          <ul className="space-y-2">
            {featuredUseCases.map(useCase => (
              <li key={useCase.id}>
                <a
                  href={`/untuk-${useCase.slug}`}
                  className="text-sm text-gray-600 hover:text-brand-600 transition-colors flex items-center gap-1 group"
                >
                  <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  {useCase.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Banks Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Convert PayPal ke Bank Indonesia
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {BANKS_DATA.map(bank => (
            <a
              key={bank.id}
              href={`/convert-paypal-ke-${bank.id}`}
              className="block p-4 bg-white border border-gray-200 hover:border-brand-300 hover:bg-brand-50 rounded-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 group-hover:text-brand-600">
                  {bank.name}
                </span>
                <ArrowRight size={16} className="text-brand-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-gray-500 mt-1">{bank.fullName}</p>
            </a>
          ))}
        </div>
      </div>

      {/* E-Wallets Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Convert PayPal ke E-Wallet
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {EWALLETS_DATA.map(ewallet => (
            <a
              key={ewallet.id}
              href={`/convert-paypal-ke-${ewallet.id}`}
              className="block p-4 bg-white border border-gray-200 hover:border-green-300 hover:bg-green-50 rounded-lg transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900 group-hover:text-green-600">
                  {ewallet.name}
                </span>
                <ArrowRight size={16} className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <p className="text-xs text-gray-500 mt-1">{ewallet.fullName}</p>
            </a>
          ))}
        </div>
      </div>

      {/* Use Cases Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Solusi Convert PayPal untuk Profesi Anda
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {USE_CASES_DATA.map(useCase => (
            <a
              key={useCase.id}
              href={`/untuk-${useCase.slug}`}
              className="block p-6 bg-white border border-gray-200 hover:border-purple-300 hover:bg-purple-50 rounded-lg transition-all group"
            >
              <h3 className="font-bold text-gray-900 group-hover:text-purple-600 mb-2">
                {useCase.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4">{useCase.description}</p>
              <div className="flex items-center gap-2 text-sm font-semibold text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity">
                Pelajari Lebih Lanjut
                <ArrowRight size={16} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

/**
 * Quick Links Component for Sidebar/Widget
 */
export const QuickLinks: React.FC<{ className?: string }> = ({ className = '' }) => {
  const topLinks = [
    ...BANKS_DATA.filter(b => b.popular).slice(0, 3).map(b => ({
      url: `/convert-paypal-ke-${b.id}`,
      label: `Convert ke ${b.name}`
    })),
    ...EWALLETS_DATA.slice(0, 2).map(e => ({
      url: `/convert-paypal-ke-${e.id}`,
      label: `Convert ke ${e.name}`
    }))
  ];

  return (
    <div className={`bg-gray-50 rounded-lg p-4 ${className}`}>
      <h3 className="font-bold text-gray-900 mb-3 text-sm">Quick Links</h3>
      <ul className="space-y-2">
        {topLinks.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.url}
              className="text-sm text-gray-600 hover:text-brand-600 transition-colors flex items-center gap-1 group"
            >
              <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
