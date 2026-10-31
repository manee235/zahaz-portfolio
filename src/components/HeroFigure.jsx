import React from 'react';
import { MagicAvatar } from './MagicAvatar';

export function HeroFigure({ scrollY, mousePos = { x: 0, y: 0 }, isRecorder, isReducedMotion }) {
  // Parallax offsets
  const driftY = isRecorder ? 0 : scrollY * 0.16;

  // 3D perspective mouse tilt
  const figureTilt = isReducedMotion
    ? {}
    : {
        transform: `translate3d(${mousePos.x * 12}px, calc(var(--drift-y, 0px) + ${mousePos.y * 12}px), 0px)`,
      };

  const nameParallax = isReducedMotion
    ? { transform: 'translateX(-50%)' }
    : {
        transform: `translateX(-50%) translate3d(${mousePos.x * -8}px, ${mousePos.y * -6 - scrollY * 0.06}px, 0px)`,
      };

  const wordmarksTilt = isReducedMotion
    ? { transform: 'translateX(-50%)' }
    : {
        transform: `translateX(-50%) translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0px)`,
      };

  return (
    <div className="hero-figure-container">
      {/* Big Typographic Backdrop Name directly behind avatar in Glass Blur Style */}
      <div className="hero-backdrop-name" aria-hidden="true" style={nameParallax}>
        <div className="backdrop-glass-wrap">
          <span className="backdrop-text-zahaz backdrop-text-blur">ZAHAZ</span>
          <span className="backdrop-text-zahaz backdrop-text-glass">ZAHAZ</span>
        </div>
      </div>

      {/* Avatar */}
      <div className="hero-photo-wrap">
        <MagicAvatar
          isRecorder={isRecorder}
          isReducedMotion={isReducedMotion}
          driftY={driftY}
          tiltStyle={figureTilt}
        />
      </div>

      {/* Logos across jacket */}
      <div className="jacket-wordmarks" style={wordmarksTilt}>
        Lumon &nbsp;·&nbsp; Paperfold &nbsp;·&nbsp; Northwind
      </div>
    </div>
  );
}
