import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MessageCircle, Menu, X } from 'lucide-react';
import { CONFIG, NAV_LINKS } from '../constants';
import { LoginButton } from './LoginButton';

import { cn } from '../utils/cn';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't show confusing nav links on dashboard
  const isDashboard = location.pathname === '/dashboard';

  return (
    <nav
      className={cn(
        'fixed w-full z-50 border-b transition-all duration-200',
        scrolled ? 'bg-white/95 border-slate-200 py-3 shadow-lg' : 'bg-white/80 border-transparent py-4',
      )}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <img
                src="/favicon/apple-icon-180x180.png"
                alt="Lapak Bang Ade Logo"
                className="size-9 rounded-xl shadow-lg shadow-brand-600/20 transition-opacity group-hover:opacity-90 sm:size-10"
              />
              <span className="truncate text-base font-black text-slate-950 sm:max-w-none sm:text-lg md:text-xl">
                {CONFIG.APP_NAME}
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            {!isDashboard && NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-bold text-slate-600 transition-colors hover:text-brand-600"
              >
                {link.name}
              </Link>
            ))}
            {!isDashboard && (
              <a
                href={CONFIG.MESSENGER_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-black text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
              >
                <MessageCircle size={16} />
                Chat Admin
              </a>
            )}
            <LoginButton />

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="rounded-xl p-2 text-slate-800 transition-colors hover:bg-slate-100"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-slate-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {!isDashboard && NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block rounded-xl px-4 py-3 text-base font-bold text-slate-700 hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            {!isDashboard && (
              <a
                href={CONFIG.MESSENGER_URL}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 font-black text-white"
              >
                <MessageCircle size={18} />
                Chat Admin
              </a>
            )}
            <div className="pt-2">
              <LoginButton variant="mobile" />
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};
