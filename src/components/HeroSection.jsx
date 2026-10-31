import React from 'react';
import { HeroNav } from './HeroNav';
import { HeroTitle } from './HeroTitle';
import { HeroFigure } from './HeroFigure';
import { HeroStatsFrame } from './HeroStatsFrame';
import { HeroRightColumn } from './HeroRightColumn';
import { useMouseParallax } from '../hooks/useMouseParallax';

export function HeroSection({ scrollY, isRecorder, isReducedMotion }) {
  const mousePos = useMouseParallax(!isRecorder && !isReducedMotion);

  // Parallax offsets for other floating hero elements
  const titleParallax = isReducedMotion
    ? {}
    : {
        transform: `translate3d(${mousePos.x * -8}px, ${mousePos.y * -6 - scrollY * 0.08}px, 0px)`,
      };

  const statsParallax = isReducedMotion
    ? {}
    : {
        transform: `translate3d(${mousePos.x * 10}px, ${mousePos.y * 10 + scrollY * 0.12}px, 0px)`,
      };

  const rightColParallax = isReducedMotion
    ? {}
    : {
        transform: `translate3d(${mousePos.x * 14}px, ${mousePos.y * 14 + scrollY * 0.1}px, 0px)`,
      };

  return (
    <header className="hero-wrapper" id="home">
      <div className="hero-stage" id="hero-stage">
        <HeroNav />
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
