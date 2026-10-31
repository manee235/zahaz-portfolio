import React, { useState, useEffect, useCallback } from 'react';

/**
 * LoadingScreen
 * Obsidian Black editorial preloader featuring:
 * 1. "ZAHAZ" in Bebas Neue with tight typewriter blur-fade animation (no phantom letter gap).
 * 2. On completion, transitions to "Let's work together" (reduced size, regular weight, no bold).
 * 3. Waits indefinitely until the user explicitly clicks "ENTER WEBSITE" (no auto-enter).
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

  // Typewriter sequence for "ZAHAZ"
  const wordChars = ['Z', 'A', 'H', 'A', 'Z'];
  const [visibleCount, setVisibleCount] = useState(1);

  // Blur-fade typewriter progression - cursor stays flush next to current letter
  useEffect(() => {
    if (showSuccessStage) return;

    // Minimum chars based on progress (at least 1, up to 5 at 100%)
    const progressChars = Math.max(1, Math.min(5, Math.ceil((progress / 100) * 5)));

    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        if (prev < wordChars.length) {
          return prev + 1;
        }
        return Math.max(1, progressChars);
      });
    }, 450);

    return () => clearInterval(interval);
  }, [progress, showSuccessStage, wordChars.length]);

  // When loaded (100% / isReady), lock all 5 letters then reveal success stage
  useEffect(() => {
    if (isReady || progress >= 100) {
      setVisibleCount(5);
      const successTimer = setTimeout(() => {
        setShowSuccessStage(true);
      }, 550);

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

      {/* Main Center Stage: Either ZAHAZ Typewriter Loading OR "Let's work together" */}
      <main className="loading-center-stage">
        {!showSuccessStage ? (
          /* State 1: ZAHAZ in Bebas Neue with Blur-Fading Typewriter (Cursor flush to current letter) */
          <div className="loading-bebas-wrap" aria-label="Loading ZAHAZ">
            <h1 className="loading-bebas-wordmark">
              {wordChars.slice(0, visibleCount).map((char, index) => (
                <span
                  key={`${char}-${index}`}
                  className="loading-bebas-char"
                >
                  {char}
                </span>
              ))}
              <span className="loading-type-cursor" aria-hidden="true" />
            </h1>
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

      {/* Bottom Footer: Progress, Count & Minimal Track */}
      <footer className="loading-bottom-bar">
        <div className="loading-meta-status">
          <span className="loading-status-text">
            {showSuccessStage ? 'SYSTEM READY · ARCHIVE DECRYPTED' : status}
          </span>
          <span className="loading-counter-tag">
            [ {loadedCount} / {totalCount} ASSETS ]
          </span>
        </div>

        {/* 2px Minimal White Progress Track */}
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
