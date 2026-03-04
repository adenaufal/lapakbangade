import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { CONFIG, NAV_LINKS } from '../constants';
import { LoginButton } from './LoginButton';

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
      className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/90 backdrop-blur-xl border-slate-200 py-3 shadow-[0_8px_28px_rgba(15,23,42,0.08)]' : 'bg-transparent border-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3 min-w-0">
            <Link to="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
              <img
                src="/favicon/apple-icon-180x180.png"
                alt="Lapak Bang Ade Logo"
                className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg group-hover:opacity-90 transition-opacity flex-shrink-0"
              />
              <span className="font-bold text-base sm:text-lg md:text-xl text-gray-900 tracking-tight truncate max-w-[9.5rem] sm:max-w-none">
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
                className="text-sm font-medium text-gray-600 hover:text-brand-600 transition-colors"
              >
                {link.name}
              </Link>
            ))}



            <LoginButton />

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 p-1.5"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-lg">
          <div className="px-4 py-4 space-y-3">
            {!isDashboard && NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}



            <div className="pt-2">
              <LoginButton variant="mobile" />
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};
