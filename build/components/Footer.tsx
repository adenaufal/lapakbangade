import React from 'react';
import { CONFIG } from '../constants';
import { MessageCircle } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2 pr-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{CONFIG.APP_NAME}</h3>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
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
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#calculator" className="hover:text-brand-600 transition">Hitung Rate</a></li>
              <li><a href="#how-it-works" className="hover:text-brand-600 transition">Cara Convert</a></li>
              <li><a href="#testimonials" className="hover:text-brand-600 transition">Testimoni</a></li>
              <li><a href="#faq" className="hover:text-brand-600 transition">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Legal & Kontak</h4>
            <ul className="space-y-2 text-sm text-gray-500 mb-6">
               <li><a href="#/privacy" className="hover:text-brand-600 transition">Privacy Policy</a></li>
               <li><a href="#/terms" className="hover:text-brand-600 transition">Terms of Service</a></li>
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
          <p>&copy; {new Date().getFullYear()} {CONFIG.APP_NAME}. All rights reserved.</p>
          <p>
            Disclaimer: Kami bukan bagian dari PayPal Inc.
          </p>
        </div>
      </div>
    </footer>
  );
};
