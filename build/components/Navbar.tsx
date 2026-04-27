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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur">
      {!isDashboard && (
        <div className="bg-slate-950 px-4 py-2 text-xs font-bold text-slate-100 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-block size-1.5 rounded-full bg-green-500" />
              <span>LIVE RATE 1 USD = Rp 16.145</span>
              <span className="hidden text-slate-500 sm:inline">·</span>
              <span className="hidden text-slate-300 sm:inline">Online 08:00–20:00 WIB</span>
            </div>
            <div className="text-amber-300">PROMO JUMAT — fee diskon 20%</div>
          </div>
        </div>
      )}
      <nav
        className={cn(
          'relative border-b transition-all duration-200',
          scrolled ? 'border-slate-200 shadow-sm' : 'border-slate-100',
        )}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <Link to="/" className="group flex min-w-0 items-center gap-3">
                <span className="grid size-9 place-items-center rounded-xl bg-brand-600 font-extrabold text-white shadow-lg shadow-brand-600/20">
                  L
                </span>
                <span className="truncate text-lg font-extrabold text-slate-950">
                  {CONFIG.APP_NAME}
                </span>
              </Link>
            </div>

          {/* Desktop Menu */}
            <div className="hidden items-center space-x-6 md:flex">
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
                className="inline-flex items-center gap-2 rounded-full bg-brand-600 px-5 py-2.5 text-sm font-extrabold text-white shadow-lg shadow-brand-600/25 transition duration-200 hover:-translate-y-0.5 hover:bg-brand-700"
              >
                <MessageCircle size={16} />
                Chat Admin
              </a>
              )}
              <LoginButton />

            </div>

            <div className="flex items-center md:hidden">
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

        {isOpen && (
        <div className="absolute left-0 top-full w-full border-b border-slate-200 bg-white shadow-lg md:hidden">
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
    </header>
  );
};
