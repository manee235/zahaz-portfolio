import React, { useState, useEffect } from 'react';
import { SahasWordmarkSvg } from './SahasWordmarkSvg';

/**
 * LoadingScreen
 * Fullscreen white editorial preloader that fills the Zahas wordmark
 * with pure black color as assets load, then slides out smoothly.
 */
export function LoadingScreen({
  progress = 0,
  isReady = false,
  status = 'INITIALIZING ARCHIVE',
  loadedCount = 0,
  totalCount = 12,
  onFinished = () => {},
}) {
  const [fillMode, setFillMode] = useState('vertical'); // 'vertical' (bottom-to-top) or 'horizontal' (left-to-right)
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    if (isReady) {
      // Trigger exit transition
      setIsExiting(true);
      const timer = setTimeout(() => {
        setShouldRender(false);
        onFinished();
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [isReady, onFinished]);

  if (!shouldRender) return null;

  const boundedProgress = Math.min(100, Math.max(0, Math.round(progress)));
  const displayPct = boundedProgress < 10 ? `0${boundedProgress}` : `${boundedProgress}`;

  // Clipping logic for filling the black SVG layer
  const fillClipStyle =
    fillMode === 'vertical'
      ? { clipPath: `inset(calc(100% - ${boundedProgress}%) 0 0 0)` }
      : { clipPath: `inset(0 calc(100% - ${boundedProgress}%) 0 0)` };

  return (
    <div
      className={`zahas-loading-screen ${isExiting ? 'is-exiting' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio assets"
    >
      {/* Top Header Bar */}
      <header className="loading-top-bar">
        <div className="loading-brand-id">
          <span className="loading-pulse-dot" aria-hidden="true" />
          <span className="loading-brand-text">ZAHAS · CREATIVE DIRECTION</span>
        </div>
        <div className="loading-edition-tag">
          <span>INDEX / 2026</span>
        </div>
      </header>

      {/* Main Center Stage: Wordmark Filling with Black */}
      <main className="loading-center-stage">
        <div className="loading-wordmark-container">
          {/* Layer 1: Ghost Silhouette in faint gray (#e5e5e5) */}
          <div className="loading-wordmark-layer loading-wordmark-ghost" aria-hidden="true">
            <SahasWordmarkSvg fill="#e5e5e5" />
          </div>

          {/* Layer 2: Filling Active Layer in pure black (#000000) */}
          <div
            className="loading-wordmark-layer loading-wordmark-fill"
            style={fillClipStyle}
            aria-hidden="true"
          >
            <SahasWordmarkSvg fill="#000000" />
          </div>

          {/* Liquid Ink Level Waterline Accent */}
          {fillMode === 'vertical' && boundedProgress > 0 && boundedProgress < 100 && (
            <div
              className="loading-ink-waterline-v"
              style={{ bottom: `${boundedProgress}%` }}
              aria-hidden="true"
            />
          )}
          {fillMode === 'horizontal' && boundedProgress > 0 && boundedProgress < 100 && (
            <div
              className="loading-ink-waterline-h"
              style={{ left: `${boundedProgress}%` }}
              aria-hidden="true"
            />
          )}
        </div>

        {/* Fill Mode Direction Switcher */}
        <div className="loading-direction-toggle">
          <button
            type="button"
            className={`toggle-dir-btn ${fillMode === 'vertical' ? 'is-active' : ''}`}
            onClick={() => setFillMode('vertical')}
            title="Liquid ink level fill from bottom to top"
          >
            ↑ VERTICAL INK
          </button>
          <span className="toggle-sep">/</span>
          <button
            type="button"
            className={`toggle-dir-btn ${fillMode === 'horizontal' ? 'is-active' : ''}`}
            onClick={() => setFillMode('horizontal')}
            title="Horizontal ink sweep from left to right"
          >
            → HORIZONTAL SWEEP
          </button>
        </div>
      </main>

      {/* Bottom Footer: Progress, Count & Minimal Track */}
      <footer className="loading-bottom-bar">
        <div className="loading-meta-status">
          <span className="loading-status-text">{status}</span>
          <span className="loading-counter-tag">
            [ {loadedCount} / {totalCount} ASSETS ]
          </span>
        </div>

        {/* 1px Minimal Black Progress Track */}
        <div className="loading-track-wrapper">
          <div
            className="loading-track-bar"
            style={{ width: `${boundedProgress}%` }}
          />
        </div>

        <div className="loading-meta-pct">
          <span className="loading-numeral">{displayPct}%</span>
        </div>
      </footer>
    </div>
  );
}

export default LoadingScreen;
