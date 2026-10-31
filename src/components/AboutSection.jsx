import React from 'react';
import { ArrowUpRight, MapPin, Sparkles, Box, Clock, Compass, Globe } from 'lucide-react';

export function AboutSection({ onOpenHireMe }) {
  const behanceUrl = 'https://www.behance.net/sahasradeshan';

  return (
    <section className="section-about" id="about">
      <div className="about-container">
        
        {/* Top Header Row */}
        <header className="about-header">
          <div className="about-meta-tag">
            <span className="about-pulse-dot" />
            <span className="about-meta-text">(ABOUT THE DESIGNER)</span>
          </div>

          <h2 className="about-display-name">
            SAHASRA DESHAN
          </h2>

          <div className="about-sub-roles">
            <span className="about-role-highlight">Virtual Designer</span>
            <span className="about-role-separator">/</span>
            <span className="about-role-highlight">Product Designer</span>
          </div>
        </header>

        {/* Editorial Bento Grid */}
        <div className="about-bento-grid">
          
          {/* Card 1: Main Editorial Bio Narrative (Span 2 cols on desktop) */}
          <div className="about-bento-card card-narrative">
            <div className="card-badge-row">
              <span className="card-tag">BIOGRAPHY & CRAFT</span>
              <span className="card-year-tag">EST. 2022 — 2026</span>
            </div>

            <p className="narrative-lead">
              I am <strong className="text-white font-semibold">Sahasra Deshan</strong>, a multidisciplinary{' '}
              <strong className="text-white font-semibold">Virtual Designer & Product Designer</strong> based in{' '}
              <strong className="text-[#38bdf8] font-semibold">Kurunegala, Sri Lanka</strong>.
            </p>

            <p className="narrative-body">
              With over <strong className="text-white font-semibold">4+ years of specialized industry experience</strong>, 
              I design at the intersection of virtual reality, 3D industrial product visualization, and razor-sharp digital aesthetics. 
              My work translates raw concepts into tactile, unforgettable spatial worlds, high-fidelity digital products, and 
              future-facing brand platforms for disruptors worldwide.
            </p>

            {/* Quick Stats Pill Strip */}
            <div className="about-stats-strip">
              <div className="stat-pill">
                <Clock className="size-4 text-[#38bdf8]" />
                <div className="stat-pill-content">
                  <span className="stat-value">4+ Years</span>
                  <span className="stat-desc">Dedicated Experience</span>
                </div>
              </div>

              <div className="stat-pill">
                <MapPin className="size-4 text-[#818cf8]" />
                <div className="stat-pill-content">
                  <span className="stat-value">Kurunegala, LK</span>
                  <span className="stat-desc">Sri Lanka · UTC +5:30</span>
                </div>
              </div>

              <div className="stat-pill">
                <Globe className="size-4 text-[#34d399]" />
                <div className="stat-pill-content">
                  <span className="stat-value">Global</span>
                  <span className="stat-desc">Worldwide Clients</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Behance Showcase Card (Direct Navigation with official Behance Icon) */}
          <div className="about-bento-card card-behance">
            <div className="card-badge-row">
              <span className="card-tag">PORTFOLIO ARCHIVE</span>
              <span className="behance-live-badge">VERIFIED</span>
            </div>

            <div className="behance-hero-block">
              {/* Official Behance SVG Icon */}
              <div className="behance-icon-frame" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="36"
                  height="36"
                  fill="currentColor"
                  className="behance-svg"
                >
                  <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.666 0-5.772-2.585-5.772-6.059 0-3.684 2.378-6.037 5.702-6.037 3.393 0 5.259 2.298 5.259 5.753 0 .548-.048 1.056-.129 1.543H15.93c.121 1.777 1.344 2.809 3.033 2.809 1.319 0 2.222-.647 2.684-1.554l2.079.545zM8.88 11.455c1.477-.426 2.39-1.579 2.39-2.973 0-2.398-1.89-3.482-4.577-3.482H0v14h7.039c2.81 0 4.88-1.285 4.88-3.953 0-1.743-1.127-3.08-3.039-3.592zm-5.61-4.47h3.197c1.365 0 2.254.516 2.254 1.727 0 1.157-.889 1.696-2.254 1.696H3.27V6.985zm3.486 9.03H3.27v-3.766h3.486c1.553 0 2.508.614 2.508 1.883 0 1.285-.955 1.883-2.508 1.883zm12.355-6.529c-1.397 0-2.39.907-2.541 2.393h5.048c-.067-1.488-1.096-2.393-2.507-2.393z"/>
                </svg>
              </div>

              <div className="behance-info">
                <h3 className="behance-title">Curated Case Studies</h3>
                <p className="behance-sub">Explore full resolution 3D renders, spatial layouts & identity monographs.</p>
              </div>
            </div>

            <a
              href={behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-behance-navigate"
              title="Open Sahasra Deshan on Behance"
            >
              <span>Explore Behance Profile</span>
              <ArrowUpRight className="size-4" />
            </a>
          </div>

          {/* Card 3: Core Disciplines & Technical Arsenal */}
          <div className="about-bento-card card-disciplines">
            <div className="card-badge-row">
              <span className="card-tag">CORE DISCIPLINES</span>
              <span className="card-year-tag">EXPERTISE</span>
            </div>

            <div className="disciplines-grid">
              <div className="discipline-item">
                <div className="discipline-icon-box">
                  <Globe className="size-4 text-[#38bdf8]" />
                </div>
                <div className="discipline-content">
                  <h4 className="discipline-name">Virtual & Spatial Environments</h4>
                  <p className="discipline-desc">3D digital twins, experiential showrooms, immersive WebGL stages.</p>
                </div>
              </div>

              <div className="discipline-item">
                <div className="discipline-icon-box">
                  <Box className="size-4 text-[#818cf8]" />
                </div>
                <div className="discipline-content">
                  <h4 className="discipline-name">Product Design & Visualization</h4>
                  <p className="discipline-desc">Precision industrial modeling, tactile materiality, commercial launch cinema.</p>
                </div>
              </div>

              <div className="discipline-item">
                <div className="discipline-icon-box">
                  <Sparkles className="size-4 text-[#e879f9]" />
                </div>
                <div className="discipline-content">
                  <h4 className="discipline-name">Creative & Brand Direction</h4>
                  <p className="discipline-desc">Monolithic typography, editorial artbooks, bespoke identity systems.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Location & Availability / Quick CTA */}
          <div className="about-bento-card card-location-cta">
            <div className="card-badge-row">
              <span className="card-tag">STUDIO LOCATION</span>
              <span className="location-status-badge">
                <span className="status-ping" />
                AVAILABLE FOR HIRE
              </span>
            </div>

            <div className="location-display-block">
              <div className="location-city-spec">
                <MapPin className="size-5 text-[#38bdf8]" />
                <span className="city-title">Kurunegala, Sri Lanka</span>
              </div>
              <p className="location-desc">
                Operating remotely across worldwide time zones with seamless collaboration in English.
              </p>
            </div>

            <button
              type="button"
              className="btn-about-hire"
              onClick={onOpenHireMe}
            >
              <span>Work With Sahasra</span>
              <ArrowUpRight className="size-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;
