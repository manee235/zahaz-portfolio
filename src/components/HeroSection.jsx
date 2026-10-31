import React from 'react';
import GradientASCII from './GradientASCII';
import { HeroTitle } from './HeroTitle';
import { HeroFigure } from './HeroFigure';
import { useMouseParallax } from '../hooks/useMouseParallax';

export function HeroSection({ scrollY, isRecorder, isReducedMotion, onOpenHireMe }) {
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

  return (
    <header className="hero-wrapper" id="home">
      {/* Dynamic ASCII Gradient Horizon Background (Dark Moody Horizon) */}
      <div className="hero-ascii-bg" aria-hidden="true">
        <GradientASCII
          colors={['#02040a', '#050c24', '#0c1844', '#15296b', '#1e40af']}
          shape="horizon"
          characters=" =+xX0S8#@"
          cellSize={18}
          density={0.75}
          gradientOpacity={0.45}
          glyphOpacity={0.7}
          glow={0.08}
        />
      </div>

      <div className="hero-stage" id="hero-stage">
        <div className="hero-title-wrapper" style={titleParallax}>
          <HeroTitle onOpenHireMe={onOpenHireMe} />
        </div>
        <HeroFigure
          scrollY={scrollY}
          mousePos={mousePos}
          isRecorder={isRecorder}
          isReducedMotion={isReducedMotion}
        />
      </div>
    </header>
  );
}
