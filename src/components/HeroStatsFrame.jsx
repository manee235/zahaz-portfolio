import React from 'react';
import { MEDIA, PARTNERS } from '../constants/media';
import { useCounter } from '../hooks/useCounter';

export function HeroStatsFrame() {
  const count400 = useCounter(400, 1400, 300);
  const count230 = useCounter(230, 1400, 450);

  const renderGlyph = (type) => {
    switch (type) {
      case 'diamond':
        return <path d="M5 0 L10 5 L5 10 L0 5 Z" />;
      case 'circle':
        return (
          <>
            <circle cx="5" cy="5" r="4" fill="none" stroke="#fff" strokeWidth="1.3" />
            <circle cx="5" cy="5" r="1.5" />
          </>
        );
      case 'lines':
        return <path d="M2 1 H8 V3 H4 V5 H7 V7 H4 V9 H2 Z" />;
      case 'rings':
        return (
          <>
            <circle cx="3" cy="5" r="2.4" />
            <circle cx="7" cy="5" r="2.4" />
          </>
        );
      case 'kite':
        return <polygon points="5,1 9,4.5 5,9 1,4.5" />;
      case 'tree':
        return <path d="M5 1 C2 4.5 2 7.5 5 9 C8 7.5 8 4.5 5 1 Z" />;
      default:
        return <circle cx="5" cy="5" r="3" />;
    }
  };

  return (
    <div className="hero-stats-frame">
      {/* Subcard A: Dark Card */}
      <div className="stats-subcard-dark">
        <div className="subcard-count-row">
          <div className="subcard-number">{count400}+</div>
          <div className="subcard-subtitle">Trusted Partner</div>
        </div>

        {/* 6 Fictional Partner Marks */}
        <div className="partner-marks-grid">
          {PARTNERS.map((partner) => (
            <div key={partner.name} className="partner-mark">
              <svg viewBox="0 0 10 10">{renderGlyph(partner.glyph)}</svg>
              <span>{partner.name}</span>
            </div>
          ))}
        </div>

        <button className="btn-partner-book" aria-label="Book a call with trusted partner">
          <span>Book a call</span>
          <span>↗</span>
        </button>
      </div>

      {/* Subcard B: Photo Card (Young man in black cap) */}
      <div className="stats-subcard-photo">
        <img
          className="subcard-photo-img"
          src={MEDIA.card230Photo}
          alt="Studio feed photo - young man in black cap"
          loading="lazy"
        />
        <div className="subcard-photo-overlay" />
        <div className="subcard-photo-header">Studio Feed · 05/06</div>
        <div className="subcard-photo-footer">
          <div className="photo-footer-num">{count230}+</div>
          <div className="photo-footer-label">Projects successfully launched worldwide</div>
        </div>
      </div>
    </div>
  );
}

