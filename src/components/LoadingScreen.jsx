import React, { useState, useEffect, useCallback } from 'react';

/**
 * LoadingScreen
 * Obsidian Black editorial preloader featuring:
 * 1. "ZAHAZ" in Bebas Neue with letter-by-letter blur fading animation (no typewriter cursor).
 * 2. Progress track and status strip placed directly BELOW the ZAHAZ wordmark.
 * 3. Bottom bar has NO middle line/strip.
 * 4. When loading completes, transitions to "Let's work together" (regular size/weight, not bold).
 * 5. Waits until user clicks "ENTER WEBSITE" to enter.
 */
export function LoadingScreen({
  progress = 0,
  isReady = false,
  status = 'INITIALIZING ARCHIVE',
  loadedCount = 0,
  totalCount = 12,
  onFinished = () => {},
}) {
  const [shouldRender, setShouldRender] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [showSuccessStage, setShowSuccessStage] = useState(false);

  // Characters for ZAHAZ
  const wordChars = ['Z', 'A', 'H', 'A', 'Z'];

  // When loaded (100% / isReady), pause briefly to show full loaded name, then reveal "Let's work together"
  useEffect(() => {
    if (isReady || progress >= 100) {
      const successTimer = setTimeout(() => {
        setShowSuccessStage(true);
      }, 700);

      return () => clearTimeout(successTimer);
    }
  }, [isReady, progress]);

  // Enter Website action (triggered ONLY when the user clicks or presses Enter)
  const handleEnterWebsite = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);

    const revealTimer = setTimeout(() => {
      onFinished();
    }, 150);

    const unmountTimer = setTimeout(() => {
      setShouldRender(false);
    }, 900);

    return () => {
      clearTimeout(revealTimer);
      clearTimeout(unmountTimer);
    };
  }, [isExiting, onFinished]);

  // Keyboard shortcut (Enter / Space) to enter website when ready
  useEffect(() => {
    if (!showSuccessStage) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleEnterWebsite();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSuccessStage, handleEnterWebsite]);

  if (!shouldRender) return null;

  const boundedProgress = Math.min(100, Math.max(0, Math.round(progress)));
  const displayPct = boundedProgress < 10 ? `0${boundedProgress}` : `${boundedProgress}`;

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

      {/* Main Center Stage: Either ZAHAZ Name Loading OR "Let's work together" */}
      <main className="loading-center-stage">
        {!showSuccessStage ? (
          /* State 1: ZAHAZ in Bebas Neue with Letter-by-Letter Blur-Fading + Progress Strip Below */
          <div className="loading-bebas-wrap" aria-label="Loading ZAHAZ">
            <h1 className="loading-bebas-wordmark">
              {wordChars.map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="loading-bebas-char"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  {char}
                </span>
              ))}
            </h1>

            {/* Progress Strip Placed Directly Below ZAHAZ Text */}
            <div className="loading-below-strip-wrap">
              <div className="loading-below-strip-track">
                <div
                  className="loading-below-strip-bar"
                  style={{ width: `${boundedProgress}%` }}
                />
              </div>
              <div className="loading-below-strip-meta">
                <span className="loading-below-status">{status}</span>
                <span className="loading-below-pct">{displayPct}%</span>
              </div>
            </div>
          </div>
        ) : (
          /* State 2: Loaded Successfully -> "Let's work together" (Regular Size, Not Bold) + ENTER WEBSITE */
          <div className="loading-success-stage">
            <div className="loading-work-together-heading">
              <span className="work-together-light">Let's work</span>
              <span className="work-together-regular">together</span>
            </div>

            {/* Circular CTA Button with Arrow & "ENTER WEBSITE" */}
            <button
              type="button"
              className="loading-enter-site-btn"
              onClick={handleEnterWebsite}
              aria-label="Enter Website"
              title="Click to enter website"
            >
              <span className="enter-site-circle">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
              <span className="enter-site-label">ENTER WEBSITE</span>
            </button>
          </div>
        )}
      </main>

      {/* Bottom Footer: Meta status & count ONLY — Middle strip removed */}
      <footer className="loading-bottom-bar">
        <div className="loading-meta-status">
          <span className="loading-status-text">
            {showSuccessStage ? 'SYSTEM READY · ARCHIVE DECRYPTED' : 'ASSET ARCHIVE'}
          </span>
          <span className="loading-counter-tag">
            [ {loadedCount} / {totalCount} ASSETS ]
          </span>
        </div>

        <div className="loading-meta-pct">
          <span className="loading-numeral">{displayPct}%</span>
        </div>
      </footer>
    </div>
  );
}

export default LoadingScreen;
