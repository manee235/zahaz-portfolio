import React, { useEffect, useState, useRef } from 'react';
import { MEDIA } from '../constants/media';
import { useCounter } from '../hooks/useCounter';
import { MagicAvatar } from './MagicAvatar';

export function TrustSection({ scrollY = 0, isRecorder, isReducedMotion }) {
  const panelRef = useRef(null);
  const [inView, setInView] = useState(false);
  const [avatarsPopped, setAvatarsPopped] = useState(false);
  const [awardsCardLifted, setAwardsCardLifted] = useState(false);
  const [panelOffset, setPanelOffset] = useState(0);

  // Parallax calculation relative to trust panel position
  useEffect(() => {
    if (!panelRef.current || isReducedMotion) return;
    const rect = panelRef.current.getBoundingClientRect();
    const centerOffset = rect.top - window.innerHeight / 2;
    setPanelOffset(centerOffset);
  }, [scrollY, isReducedMotion]);

  // Trigger counters and avatar pop-in when panel enters viewport
  useEffect(() => {
    if (isReducedMotion) {
      setInView(true);
      setAvatarsPopped(true);
      return;
    }

    if (isRecorder) {
      // Trust counters and avatars: 3.5 - 5.2s
      const timer1 = setTimeout(() => {
        setInView(true);
        setAvatarsPopped(true);
      }, 3500);

      // Awards card lift: 5.3s
      const timer2 = setTimeout(() => {
        setAwardsCardLifted(true);
      }, 5300);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setInView(true);
          setTimeout(() => setAvatarsPopped(true), 150);
          observer.disconnect();
        }
      },
      { threshold: 0.25 }
    );

    if (panelRef.current) {
      observer.observe(panelRef.current);
    }

    return () => observer.disconnect();
  }, [isRecorder, isReducedMotion]);

  const count56 = useCounter(56, 1400, 0, inView);
  const count10 = useCounter(10, 1400, 100, inView);

  // Floating parallax styles for the two frosted glass tiles
  const asteriskTileParallax = isReducedMotion
    ? {}
    : {
        transform: `translate3d(0, ${panelOffset * -0.06}px, 0)`,
      };

  const dotsTileParallax = isReducedMotion
    ? {}
    : {
        transform: `translate3d(0, ${panelOffset * 0.05}px, 0)`,
      };

  return (
    <section className="section-trust" id="contact">
      <div className="trust-panel" id="trust-panel" ref={panelRef}>
        {/* Left Column: Heading, Paragraph & Overlapping Glass Tiles */}
        <div className="trust-left-col">
          {/* Frosted Glass Tile 1: Asterisk at top right of line 1 with floating parallax */}
          <div className="glass-tile glass-tile-asterisk" style={asteriskTileParallax}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 2V22M2 12H22M4.93 4.93L19.07 19.07M19.07 4.93L4.93 19.07"
                stroke="#ffffff"
                strokeWidth="2.6"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Frosted Glass Tile 2: Four-dot tile over "Businesses" with floating parallax (hidden on phone) */}
          <div className="glass-tile glass-tile-dots" style={dotsTileParallax}>
            <div className="four-dots-grid">
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>

          <h2 className="trust-heading">
            <span className={`trust-heading-line text-blur-reveal ${inView ? 'is-in-view' : ''} delay-100`}>
              Trusted by
            </span>
            <span className={`trust-heading-line text-blur-reveal ${inView ? 'is-in-view' : ''} delay-200`}>
              Hundreds of
            </span>
            <span className={`trust-heading-line text-blur-reveal ${inView ? 'is-in-view' : ''} delay-300`}>
              Growing
            </span>
            <span className={`trust-heading-line text-blur-reveal ${inView ? 'is-in-view' : ''} delay-400`}>
              Businesses
            </span>
          </h2>

          <p className={`trust-subtext text-blur-reveal ${inView ? 'is-in-view' : ''} delay-500`}>
            Strategic craft and precision brand engineering designed to elevate industry disruptors
            into category leaders across the globe.
          </p>
        </div>

        {/* Right Column: 3 Cards (326u tall, 8u radius) */}
        <div className="trust-cards-row">
          {/* Card 1: Avatar card (light grey #d6d6d6, 293u) */}
          <div className={`trust-card card-avatar-stat text-blur-reveal ${inView ? 'is-in-view' : ''} delay-300`}>
            <div className="avatars-grid-4x2">
              {MEDIA.avatars.map((avatarUrl, idx) => (
                <div
                  key={idx}
                  className={`avatar-item ${avatarsPopped ? 'popped' : ''}`}
                  style={{
                    transitionDelay: isReducedMotion ? '0s' : `${idx * 60}ms`,
                  }}
                >
                  <img src={avatarUrl} alt={`Client avatar ${idx + 1}`} loading="lazy" />
                </div>
              ))}
            </div>

            <div className="avatar-stat-info">
              <div className="avatar-stat-number">{count56}M+</div>
              <div className="avatar-stat-label">Global Collaborations</div>
            </div>
          </div>

          {/* Card 2: Awards card (#262626, 298u) */}
          <div
            className={`trust-card card-awards-stat text-blur-reveal ${inView ? 'is-in-view' : ''} delay-450`}
            id="card-awards-stat"
            style={
              awardsCardLifted
                ? {
                    transform: 'translateY(calc(-6 * var(--u)))',
                    boxShadow: '0 16px 30px rgba(0, 0, 0, 0.4)',
                  }
                : undefined
            }
          >
            <div className="awards-top-info">
              <div className="awards-stat-number">{count10}+</div>
              <div className="awards-stat-label">Industry Awards</div>
            </div>

            {/* SVG laurel badge: BEST GROWTH PARTNER 2026 */}
            <div className="laurel-badge-wrap">
              <svg className="laurel-svg" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="24"
                  cy="24"
                  r="22"
                  stroke="rgba(255,255,255,0.25)"
                  strokeWidth="1.2"
                  strokeDasharray="2 3"
                />
                {/* Laurel left branch */}
                <path d="M16 34 C12 28, 12 18, 20 12" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M14 30 Q10 28 12 25" stroke="#ffffff" strokeWidth="1.2" />
                <path d="M13 24 Q9 22 12 19" stroke="#ffffff" strokeWidth="1.2" />
                <path d="M15 18 Q12 15 16 14" stroke="#ffffff" strokeWidth="1.2" />
                {/* Laurel right branch */}
                <path d="M32 34 C36 28, 36 18, 28 12" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M34 30 Q38 28 36 25" stroke="#ffffff" strokeWidth="1.2" />
                <path d="M35 24 Q39 22 36 19" stroke="#ffffff" strokeWidth="1.2" />
                <path d="M33 18 Q36 15 32 14" stroke="#ffffff" strokeWidth="1.2" />
                {/* Center star */}
                <polygon
                  points="24,19 25.5,23 29.5,23.5 26.5,26.5 27.5,30.5 24,28.5 20.5,30.5 21.5,26.5 18.5,23.5 22.5,23"
                  fill="#ffffff"
                />
              </svg>
              <div className="laurel-badge-text">
                Best Growth
                <br />
                Partner 2026
              </div>
            </div>

            <div className="awards-card-note">
              Recognized for exceptional design systems and strategic excellence.
            </div>
          </div>

          {/* Card 3: Portrait card (200u, cut off by panel's right edge) with Magic Reveal */}
          <div className={`trust-card card-portrait-stat text-blur-reveal ${inView ? 'is-in-view' : ''} delay-600`}>
            <MagicAvatar
              isRecorder={false}
              isReducedMotion={isReducedMotion}
              className="portrait-card-magic-avatar"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
