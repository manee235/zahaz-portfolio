import React, { useState, useEffect } from 'react';
import { MEDIA } from '../constants/media';

export function HeroRightColumn() {
  const [progressActive, setProgressActive] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgressActive(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Frosted "True Growth" pill with black check disc at (1216, 258) */}
      <div className="pill-true-growth">
        <span className="growth-check-disc">✓</span>
        <span className="growth-label">True Growth</span>
      </div>

      {/* "We’re available / ● for you", right-aligned at y 442 */}
      <div className="hero-available-tag">
        <div>We’re available</div>
        <div>
          <span className="available-dot" />
          for you
        </div>
      </div>

      {/* "Out Now / Q Industrial / [2025]" with 196u-tall image card */}
      <div className="card-out-now">
        <div className="out-now-meta">
          <span>Out Now</span>
          <span className="out-now-title">Q Industrial</span>
          <span className="out-now-year">[2025]</span>
        </div>
        <div className="out-now-media">
          <img
            className="out-now-img"
            src={MEDIA.qIndustrial}
            alt="Q Industrial monochrome fashion shot"
            loading="lazy"
          />
          <div className="out-now-arrow-btn">↗</div>
        </div>
        <div className="out-now-progress-track">
          <div className={`out-now-progress-bar ${progressActive ? 'active' : ''}`} />
        </div>
      </div>
    </>
  );
}

