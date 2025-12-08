import React, { useState, useEffect, Suspense } from 'react';
import { LandingPage } from './components/LandingPage';
import { initAnalytics } from './services/analytics';

const PrivacyPolicy = React.lazy(() => import('./components/PrivacyPolicy'));
const TermsOfService = React.lazy(() => import('./components/TermsOfService'));

const App: React.FC = () => {
  const [route, setRoute] = useState(typeof window !== 'undefined' ? window.location.hash : '#/');

  useEffect(() => {
    // Initialize Analytics
    initAnalytics();

    const handleHashChange = () => {
      const nextHash = window.location.hash || '#/';
      setRoute(nextHash);

      // Scroll behavior: smooth scroll to section anchors, or reset for page-level routes
      if (nextHash === '#/' || nextHash === '#/privacy' || nextHash === '#/terms') {
        window.scrollTo(0, 0);
      } else {
        const target = document.querySelector(nextHash);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple Hash Router
  if (route === '#/privacy') {
    return (
      <Suspense fallback={<div className="p-8 text-center text-gray-700">Memuat...</div>}>
        <PrivacyPolicy />
      </Suspense>
    );
  }
  
  if (route === '#/terms') {
    return (
      <Suspense fallback={<div className="p-8 text-center text-gray-700">Memuat...</div>}>
        <TermsOfService />
      </Suspense>
    );
  }

  // Default to Landing Page
  return <LandingPage />;
};

export default App;
