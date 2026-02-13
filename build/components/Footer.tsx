import React from 'react';
import { Link } from 'react-router-dom';
import { CONFIG } from '../constants';
import { MessageCircle } from 'lucide-react';
import { ProgrammaticLinks } from './ProgrammaticLinks';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Programmatic SEO Links Section */}
        <div className="mb-12 pb-12 border-b border-gray-200">
          <ProgrammaticLinks variant="compact" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2 pr-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{CONFIG.APP_NAME}</h3>
            <p className="text-gray-700 text-sm leading-relaxed mb-6">
              Jasa convert PayPal ke Rupiah yang mengutamakan keamanan dan kepercayaan.
              Diproses manual, rate transparan, dan tanpa biaya tersembunyi.
            </p>
            <div className="flex items-center gap-2 text-sm font-semibold text-brand-600">
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
              Operasional: {CONFIG.OPERATIONAL_HOURS}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Menu</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/#calculator" className="hover:text-brand-600 transition">Hitung Rate</Link></li>
              <li><Link to="/#how-it-works" className="hover:text-brand-600 transition">Cara Convert</Link></li>
              <li><Link to="/#testimonials" className="hover:text-brand-600 transition">Testimoni</Link></li>
              <li><Link to="/#faq" className="hover:text-brand-600 transition">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal & Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-600 mb-6">
              <li><Link to="/privacy" className="hover:text-brand-600 transition">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-brand-600 transition">Terms of Service</Link></li>
            </ul>
            <a
              href={CONFIG.MESSENGER_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-gray-600 hover:text-brand-600 transition-colors mb-2"
            >
              <MessageCircle size={18} /> Messenger
            </a>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p className="text-gray-700">&copy; {new Date().getFullYear()} {CONFIG.APP_NAME}. All rights reserved.</p>
          <p className="text-gray-700">
            Disclaimer: Kami bukan bagian dari PayPal Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};
