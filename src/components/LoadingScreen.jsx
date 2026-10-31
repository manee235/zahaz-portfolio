import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * LoadingScreen
 * Obsidian Black editorial preloader featuring:
 * 1. Big "ZAHAZ" in Bebas Neue with blur-fading typewriter animation.
 * 2. On completion, transitions to "Let's work together" (crisp white, no gradient)
 *    with interactive "ENTER WEBSITE" circular CTA button.
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
  const autoEnterTimerRef = useRef(null);

  // Blur-fade typewriter typing progression
  useEffect(() => {
    if (showSuccessStage) return;

    // As progress advances, calculate min visible characters
    const progressChars = Math.max(1, Math.min(5, Math.ceil((progress / 100) * 5)));

    // Continuous smooth blur typewriter cycling
    const interval = setInterval(() => {
      setVisibleCount((prev) => {
        const next = prev >= wordChars.length ? progressChars : prev + 1;
        return Math.max(next, progressChars);
      });
    }, 420);

    return () => clearInterval(interval);
  }, [progress, showSuccessStage, wordChars.length]);

  // When loaded (100% / isReady), transition to "Let's work together" stage
  useEffect(() => {
    if (isReady || progress >= 100) {
      // Reveal the success stage
      const successTimer = setTimeout(() => {
        setShowSuccessStage(true);
      }, 250);

      return () => clearTimeout(successTimer);
    }
  }, [isReady, progress]);

  // Enter Website action
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

  // Auto-enter fallback after 4.5 seconds if user hasn't clicked
  useEffect(() => {
    if (showSuccessStage && !isExiting) {
      autoEnterTimerRef.current = setTimeout(() => {
        handleEnterWebsite();
      }, 4500);

      return () => clearTimeout(autoEnterTimerRef.current);
    }
  }, [showSuccessStage, isExiting, handleEnterWebsite]);

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
          /* State 1: ZAHAZ in Bebas Neue with Blur-Fading Typewriter Animation */
          <div className="loading-bebas-wrap" aria-label="Loading ZAHAZ">
            <h1 className="loading-bebas-wordmark">
              {wordChars.map((char, index) => {
                const isCharVisible = index < visibleCount;
                return (
                  <span
                    key={index}
                    className={`loading-bebas-char ${isCharVisible ? 'is-visible' : 'is-hidden'}`}
                  >
                    {char}
                  </span>
                );
              })}
              <span className="loading-type-cursor" aria-hidden="true" />
            </h1>
          </div>
        ) : (
          /* State 2: Loaded Successfully -> "Let's work together" + ENTER WEBSITE */
          <div className="loading-success-stage">
            <div className="loading-work-together-heading">
              <span className="work-together-light">Let's work</span>
              <span className="work-together-bold">together</span>
            </div>

            {/* Circular CTA Button with Arrow & "ENTER WEBSITE" */}
            <button
              type="button"
              className="loading-enter-site-btn"
              onClick={handleEnterWebsite}
              aria-label="Enter Website"
              title="Click or press Enter to explore"
              autoFocus
            >
              <span className="enter-site-circle">
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
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
