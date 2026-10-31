import React from 'react';
import { MagicAvatar } from './MagicAvatar';
import sahasWordmark from '../Assets/Logo/sahas-wordmark.svg.svg';

export function HeroFigure({ scrollY, mousePos = { x: 0, y: 0 }, isRecorder, isReducedMotion }) {
  // Parallax offsets
  const driftY = isRecorder ? 0 : scrollY * 0.16;

  // 3D perspective mouse tilt
  const figureTilt = isReducedMotion
    ? {}
    : {
        transform: `translate3d(${mousePos.x * 12}px, calc(var(--drift-y, 0px) + ${mousePos.y * 12}px), 0px)`,
      };

  const plateTilt = isReducedMotion
    ? {}
    : {
        transform: `translate3d(${mousePos.x * 24}px, ${mousePos.y * 24}px, 30px) translateY(${scrollY * 0.12}px)`,
      };

  const wordmarksTilt = isReducedMotion
    ? {}
    : {
        transform: `translateX(-50%) translate3d(${mousePos.x * 8}px, ${mousePos.y * 8}px, 0px)`,
      };

  return (
    <div className="hero-figure-container">
      {/* Avatar with Magic Reveal on mouse hover */}
      <div className="hero-photo-wrap">
        <MagicAvatar
          isRecorder={isRecorder}
          isReducedMotion={isReducedMotion}
          driftY={driftY}
          tiltStyle={figureTilt}
        />
      </div>

      {/* Brand Plate: Dark glass plate over man's back at (532, 444), 364 × 73u */}
      <div className="brand-glass-plate" style={plateTilt}>
        <div className="brand-mark-triangle">
          {/* Two-part geometric triangular mark */}
          <svg viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14 2L26 22H17L14 16L11 22H2L14 2Z" fill="#FFFFFF" />
            <path d="M14 10.5L18.2 18H9.8L14 10.5Z" fill="#141414" />
          </svg>
        </div>

        {/* Wordmark Logo */}
        <div className="brand-plate-wordmark" title="ZAHAS">
          <img
            src={sahasWordmark}
            alt="ZAHAS"
            className="brand-wordmark-img"
          />
        </div>

        <div className="brand-plate-menu" aria-label="Menu trigger">
          <span />
          <span />
        </div>
      </div>

      {/* Logos across jacket: fictional white wordmarks at y 864 */}
      <div className="jacket-wordmarks" style={wordmarksTilt}>
        Lumon &nbsp;·&nbsp; Paperfold &nbsp;·&nbsp; Northwind
      </div>
    </div>
  );
}
