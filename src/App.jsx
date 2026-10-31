import React, { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { BarSection } from './components/BarSection';
import { ManifestoSection } from './components/ManifestoSection';
import { TrustSection } from './components/TrustSection';
import { useScrollProgress } from './hooks/useScrollProgress';

export function App() {
  const scrollY = useScrollProgress();
  const [isRecorder, setIsRecorder] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIsRecorder(params.get('rec') === '1');

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(mediaQuery.matches);

    const listener = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const handleScrollDown = () => {
    const el = document.getElementById('section-manifesto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="zahas-app">
      {/* 1. Hero Section (1440 × 938u) with Mouse & Scroll Parallax */}
      <HeroSection scrollY={scrollY} isRecorder={isRecorder} isReducedMotion={isReducedMotion} />

      {/* 2. Black Bar (111u) */}
      <BarSection onScrollDown={handleScrollDown} />

      {/* 3. Manifesto Section (grey to white fill) */}
      <ManifestoSection isRecorder={isRecorder} isReducedMotion={isReducedMotion} />

      {/* 4. Trust Section (1302 × 429u panel) with Parallax Floating Tiles */}
      <TrustSection scrollY={scrollY} isRecorder={isRecorder} isReducedMotion={isReducedMotion} />
    </div>
  );
}

export default App;
