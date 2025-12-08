import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { TermsOfService } from './components/TermsOfService';
import { initAnalytics } from './services/analytics';

const App: React.FC = () => {
  const [route, setRoute] = useState(typeof window !== 'undefined' ? window.location.hash : '#/');

  useEffect(() => {
    // Initialize Analytics
    initAnalytics();

    const handleHashChange = () => {
      setRoute(window.location.hash || '#/');
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Simple Hash Router
  if (route === '#/privacy') {
    return <PrivacyPolicy />;
  }
  
  if (route === '#/terms') {
    return <TermsOfService />;
  }

  // Default to Landing Page
  return <LandingPage />;
};

export default App;