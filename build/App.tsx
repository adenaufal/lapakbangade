import React, { useEffect, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { LandingPage } from './components/LandingPage';
import { AuthProvider } from './hooks/useAuth';
import { initAnalytics } from './services/analytics';

const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./components/TermsOfService'));
const Dashboard = React.lazy(() => import('./components/Dashboard'));

const ScrollToAnchor = () => {
  const { hash } = useLocation();

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
    } else if (!hash) {
      window.scrollTo(0, 0);
    }
  }, [hash]);

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
    initAnalytics();
  }, []);

  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToAnchor />
        <LegacyRedirect />
        <Suspense fallback={<div className="p-8 text-center text-gray-700">Memuat...</div>}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
