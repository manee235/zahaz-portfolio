import React from 'react';
import GradientASCII from './GradientASCII';
import { HeroTitle } from './HeroTitle';
import { HeroFigure } from './HeroFigure';
import { HeroStatsFrame } from './HeroStatsFrame';
import { HeroRightColumn } from './HeroRightColumn';
import { useMouseParallax } from '../hooks/useMouseParallax';

export function HeroSection({ scrollY, isRecorder, isReducedMotion }) {
  const mousePos = useMouseParallax(!isRecorder && !isReducedMotion);

  // Parallax offsets and scroll blur-push fade
  const scrollBlur = !isReducedMotion && scrollY > 40 ? Math.min((scrollY - 40) * 0.02, 8) : 0;
  const scrollFade = !isReducedMotion ? Math.max(0, 1 - scrollY * 0.0016) : 1;

  const titleParallax = isReducedMotion
    ? {}
    : {
        transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -6 - scrollY * 0.08}px, 0px)`,
        filter: scrollBlur > 0 ? `blur(${scrollBlur}px)` : 'none',
        opacity: scrollFade,
        transition: 'filter 0.15s ease-out, opacity 0.15s ease-out',
      };

  const statsParallax = isReducedMotion
    ? {}
    : {
        transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10 + scrollY * 0.12}px, 0px)`,
        filter: scrollBlur > 0 ? `blur(${scrollBlur * 0.7}px)` : 'none',
        opacity: scrollFade,
        transition: 'filter 0.15s ease-out, opacity 0.15s ease-out',
      };

  const rightColParallax = isReducedMotion
    ? {}
    : {
        transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14 + scrollY * 0.1}px, 0px)`,
        filter: scrollBlur > 0 ? `blur(${scrollBlur * 0.8}px)` : 'none',
        opacity: scrollFade,
        transition: 'filter 0.15s ease-out, opacity 0.15s ease-out',
      };

  return (
    <header className="hero-wrapper" id="home">
      {/* Dynamic ASCII Gradient Horizon Background */}
      <div className="hero-ascii-bg" aria-hidden="true">
        <GradientASCII
          colors={['#1e3fd8', '#f6f8ff', '#a5d8ff', '#38bdf8']}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.8}
        />
      </div>

      <div className="hero-stage" id="hero-stage">
        <div className="hero-title-wrapper" style={titleParallax}>
          <HeroTitle />
        </div>
        <HeroFigure
          scrollY={scrollY}
          mousePos={mousePos}
          isRecorder={isRecorder}
          isReducedMotion={isReducedMotion}
        />
        <div className="hero-stats-wrapper" style={statsParallax}>
          <HeroStatsFrame />
        </div>
        <div className="hero-right-wrapper" style={rightColParallax}>
          <HeroRightColumn />
        </div>
      </div>
    </header>
  );
}
