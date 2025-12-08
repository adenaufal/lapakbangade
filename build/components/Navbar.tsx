import React, { useState, useEffect } from 'react';
import { Menu, X, Wallet } from 'lucide-react';
import { CONFIG, NAV_LINKS } from '../constants';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 border-b ${
        scrolled ? 'bg-white/95 backdrop-blur-sm border-gray-200 py-3 shadow-sm' : 'bg-white border-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <a href="#/" className="flex items-center gap-2 group">
                <div className="bg-brand-600 text-white p-2 rounded-lg group-hover:bg-brand-700 transition-colors">
                    <Wallet size={20} />
                </div>
                <span className="font-bold text-xl text-gray-900 tracking-tight">
                    {CONFIG.APP_NAME}
                </span>
            </a>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <a
              href={CONFIG.MESSENGER_URL}
              target="_blank"
              rel="noreferrer"
              className="bg-gray-900 hover:bg-black text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg shadow-gray-900/10"
            >
              Hubungi Admin
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 p-2"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
             <a
              href={CONFIG.MESSENGER_URL}
              className="block w-full text-center px-4 py-3 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg mt-4"
              onClick={() => setIsOpen(false)}
            >
              Chat Messenger
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
