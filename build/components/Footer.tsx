import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants';

export const Footer = () => {
  const columns = [
    { title: 'Layanan', items: ['Convert PayPal → IDR', 'Top-up PayPal', 'Convert Stripe', 'Convert Wise', 'Bisnis & Bulk'] },
    { title: 'Resources', items: ['Blog', 'Cara Convert', 'Tips Freelancer', 'Update Rate', 'Pajak'] },
    { title: 'Kontak', items: ['Messenger', 'WhatsApp', 'Discord', 'Email', '08:00–20:00 WIB'] },
    { title: 'Hukum', items: ['Privacy Policy', 'Terms of Service', 'Refund Policy', 'Sitemap'] },
  ];

  return (
    <footer className="border-t border-white/5 bg-[#0a0f1c] px-4 py-12 text-slate-400 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
        <div>
          <Link to="/" className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-brand-600 font-extrabold text-white">L</span>
            <span className="text-lg font-extrabold text-white">{CONFIG.APP_NAME}</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-6">
            Jasa convert PayPal ke Rupiah terpercaya untuk freelancer Indonesia. Dijalankan oleh bot &amp; admin manusia sejak 2020.
          </p>
        </div>

        {columns.map((column) => (
          <div key={column.title}>
            <h3 className="text-xs font-bold uppercase text-white">{column.title}</h3>
            <ul className="mt-4 space-y-2">
              {column.items.map((item) => (
                <li key={item}>
                  <a href={item === 'Privacy Policy' ? '/privacy' : item === 'Terms of Service' ? '/terms' : '#'} className="text-sm transition hover:text-white">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-slate-500">
        <div>© {new Date().getFullYear()} {CONFIG.APP_NAME} · PT XYZ Digital Indonesia</div>
        <div>Made with ☕ in Indonesia</div>
      </div>
    </footer>
  );
};
