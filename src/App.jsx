import React, { useEffect, useState, useMemo } from 'react';
import { HeroSection } from './components/HeroSection';
import { BarSection } from './components/BarSection';
import { ManifestoSection } from './components/ManifestoSection';
import { ProjectsSection } from './components/ProjectsSection';
import { TrustSection } from './components/TrustSection';
import { LoadingScreen } from './components/LoadingScreen';
import { useScrollProgress } from './hooks/useScrollProgress';
import { useImagePreloader } from './hooks/useImagePreloader';
import { MEDIA } from './constants/media';

export function App() {
  const scrollY = useScrollProgress();
  const [isRecorder, setIsRecorder] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [hasFinishedLoading, setHasFinishedLoading] = useState(false);

  // Critical editorial assets to preload before presentation
  const assetUrls = useMemo(
    () => [
      MEDIA.heroPhoto,
      MEDIA.heroPhotoRed,
      MEDIA.card230Photo,
      MEDIA.qIndustrial,
      ...(MEDIA.avatars || []),
    ],
    []
  );

  const { progress, isReady, loadedCount, totalCount, status } = useImagePreloader(assetUrls);

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
    const el = document.getElementById('studio') || document.getElementById('section-manifesto');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="zahas-app">
      {/* 0. Editorial White Loading Screen with Filling Wordmark */}
      <LoadingScreen
        progress={progress}
        isReady={isReady}
        status={status}
        loadedCount={loadedCount}
        totalCount={totalCount}
        onFinished={() => setHasFinishedLoading(true)}
      />

      {/* 1. Hero Section (1440 × 938u) with Mouse & Scroll Parallax */}
      <HeroSection
        scrollY={scrollY}
        isRecorder={isRecorder}
        isReducedMotion={isReducedMotion}
        isLoaded={hasFinishedLoading}
      />

      {/* 2. Black Bar (111u) */}
      <BarSection onScrollDown={handleScrollDown} />

      {/* 3. Manifesto Section (grey to white fill) */}
      <ManifestoSection isRecorder={isRecorder} isReducedMotion={isReducedMotion} />

      {/* 4. Projects Section (3D Curved Cylindrical Carousel Hero) */}
      <ProjectsSection isReducedMotion={isReducedMotion} />

      {/* 5. Trust Section (1302 × 429u panel) with Parallax Floating Tiles */}
      <TrustSection scrollY={scrollY} isRecorder={isRecorder} isReducedMotion={isReducedMotion} />
    </div>
  );
}

export default App;
