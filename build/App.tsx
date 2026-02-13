import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { LandingPage } from './components/LandingPage';
import { AuthProvider } from './hooks/useAuth';
import { FloatingChatButton } from './components/FloatingChatButton';
import { CookieConsent } from './components/CookieConsent';
import { initAnalytics } from './services/analytics';

const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./components/TermsOfService'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

// Programmatic SEO Pages
const BankPage = React.lazy(() => import('./components/programmatic/BankPage').then(m => ({ default: m.BankPage })));
const EWalletPage = React.lazy(() => import('./components/programmatic/EWalletPage').then(m => ({ default: m.EWalletPage })));
const UseCasePage = React.lazy(() => import('./components/programmatic/UseCasePage').then(m => ({ default: m.UseCasePage })));

const ScrollToAnchor = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash && !hash.startsWith('#/')) {
      try {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      } catch (e) {
        console.warn('Invalid hash selector:', hash);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
};

const LegacyRedirect = () => {
  const { hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (hash.startsWith('#/')) {
      const newPath = hash.substring(1); // e.g. #/terms -> /terms
      navigate(newPath, { replace: true });
    }
  }, [hash, navigate]);

  return null;
};

const App: React.FC = () => {
  useEffect(() => {
    // Implicit Consent: Initialize analytics unless explicitly declined
    if (localStorage.getItem('cookie_consent') !== 'declined') {
      initAnalytics();
    }
  }, []);

  return (
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <ScrollToAnchor />
          <LegacyRedirect />
          <FloatingChatButton />
          <CookieConsent />
          <Suspense fallback={<div className="p-8 text-center text-gray-700">Memuat...</div>}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsOfService />} />
              <Route path="/dashboard" element={<Dashboard />} />

              {/* Programmatic SEO Routes */}
              {/* Bank-specific pages */}
              <Route path="/convert-paypal-ke-:bankId" element={<BankPage />} />

              {/* E-wallet specific pages */}
              <Route path="/convert-paypal-ke-:ewalletId" element={<EWalletPage />} />

              {/* Use case pages */}
              <Route path="/untuk-:useCaseSlug" element={<UseCasePage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
};

export default App;
