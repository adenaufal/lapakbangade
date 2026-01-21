import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LayoutDashboard } from 'lucide-react';
import { CONFIG, NAV_LINKS } from '../constants';
import { LoginButton } from './LoginButton';
import { useAuth } from '../hooks/useAuth';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isAuthenticated } = useAuth();
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
      className={`fixed w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-white/95 backdrop-blur-sm border-gray-200 py-3 shadow-sm' : 'bg-white border-transparent py-4'
        }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3 group">
              <img
                src="/favicon/apple-icon-180x180.png"
                alt="Lapak Bang Ade Logo"
                className="h-10 w-10 rounded-lg group-hover:opacity-90 transition-opacity"
              />
              <span className="font-bold text-xl text-gray-900 tracking-tight">
                {CONFIG.APP_NAME}
              </span>
            </Link>
            {/* Live Status Badge */}
            <div className="hidden sm:flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-semibold text-green-700">
                {CONFIG.LIVE_STATUS} • {CONFIG.AVERAGE_PROCESS_TIME}
              </span>
            </div>
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

            {isAuthenticated && !isDashboard && (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors bg-brand-50 px-3 py-2 rounded-lg"
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>
            )}

            <LoginButton />
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
              <Link
                key={link.name}
                to={link.href}
                className="block px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {isAuthenticated && (
              <Link
                to="/dashboard"
                className="block px-4 py-3 text-base font-medium text-brand-600 hover:bg-brand-50 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
            )}

            <div className="pt-2">
              <LoginButton variant="mobile" />
            </div>
            <a
              href={CONFIG.MESSENGER_URL}
              className="block w-full text-center px-4 py-3 text-base font-bold text-white bg-brand-600 hover:bg-brand-700 rounded-lg mt-2"
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
