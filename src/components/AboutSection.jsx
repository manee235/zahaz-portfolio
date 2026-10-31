import React from 'react';
import { ArrowUpRight, MapPin, Star, Sparkles } from 'lucide-react';

export function AboutSection({ onOpenHireMe }) {
  const behanceUrl = 'https://www.behance.net/sahasradeshan';

  return (
    <section className="section-about" id="about">
      <div className="about-container">
        
        {/* Top Meta Tag & Section Label */}
        <div className="about-meta-tag">
          <span className="about-pulse-dot" />
          <span className="about-meta-text">(CREATIVE VIRTUAL DESIGNER)</span>
        </div>

        {/* Main 2-Column Split: Big Stacked Typography + Frosted Glassblur Stat Cluster */}
        <div className="about-split-row">
          
          {/* Left Column: Big Stacked Editorial Typography (Image 2 style) */}
          <div className="about-typography-col">
            <div className="big-stacked-typography" aria-label="Creative Virtual Product Designer">
              <span className="stacked-word word-creative">CREATIVE</span>
              <span className="stacked-word word-virtual">VIRTUAL</span>
              <span className="stacked-word word-product">PRODUCT</span>
              <span className="stacked-word word-designer">DESIGNER</span>
            </div>

            {/* Sub-Bio & Profile Details */}
            <div className="about-profile-bio">
              <h3 className="profile-name-tag">
                Sahasra Deshan <span className="profile-role-dot">·</span> <span className="text-[#38bdf8]">Kurunegala, Sri Lanka</span>
              </h3>
              <p className="profile-bio-text">
                Specialized in 3D spatial environments, high-performance product modeling, and luxury brand engineering 
                with over <strong>4+ years of dedicated craft</strong> for international clients worldwide.
              </p>

              {/* Action Buttons: Behance Profile & Hire Me */}
              <div className="about-actions-row">
                <a
                  href={behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-behance-pill"
                  title="View Sahasra Deshan on Behance"
                >
                  {/* Official Behance Bē Icon */}
                  <span className="behance-icon-wrap" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="18"
                      height="18"
                      fill="currentColor"
                      className="behance-svg"
                    >
                      <path d="M22 7h-7v2h7V7zm1.726 10c-.442 1.297-2.029 3-4.726 3-3.666 0-5.772-2.585-5.772-6.059 0-3.684 2.378-6.037 5.702-6.037 3.393 0 5.259 2.298 5.259 5.753 0 .548-.048 1.056-.129 1.543H15.93c.121 1.777 1.344 2.809 3.033 2.809 1.319 0 2.222-.647 2.684-1.554l2.079.545zM8.88 11.455c1.477-.426 2.39-1.579 2.39-2.973 0-2.398-1.89-3.482-4.577-3.482H0v14h7.039c2.81 0 4.88-1.285 4.88-3.953 0-1.743-1.127-3.08-3.039-3.592zm-5.61-4.47h3.197c1.365 0 2.254.516 2.254 1.727 0 1.157-.889 1.696-2.254 1.696H3.27V6.985zm3.486 9.03H3.27v-3.766h3.486c1.553 0 2.508.614 2.508 1.883 0 1.285-.955 1.883-2.508 1.883zm12.355-6.529c-1.397 0-2.39.907-2.541 2.393h5.048c-.067-1.488-1.096-2.393-2.507-2.393z"/>
                    </svg>
                  </span>
                  <span>Behance</span>
                  <ArrowUpRight className="size-3.5" />
                </a>

                <button
                  type="button"
                  className="btn-about-hire-cta"
                  onClick={onOpenHireMe}
                >
                  <Sparkles className="size-3.5 text-[#38bdf8]" />
                  <span>Hire Me</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Glassblur Styled Stat Cards Cluster (Image 1 style) */}
          <div className="about-stats-cluster">
            
            {/* Card 1 (Left Tall Card): Satisfaction 99% */}
            <div className="glassblur-stat-card card-satisfaction">
              {/* Soft Mint/Cyan Corner Aura */}
              <div className="card-ambient-aura" aria-hidden="true" />

              <div className="card-top-tag">
                <span className="pill-tag-label">SATISFACTION</span>
              </div>

              <div className="card-stat-hero">
                <span className="stat-number-hero">99%</span>
              </div>

              <p className="card-description">
                Delivering high-performance virtual, 3D & product design solutions for international clients.
              </p>
            </div>

            {/* Card 2 (Top Right Wide Card): Projects 25+ with Rising Bars Graphic */}
            <div className="glassblur-stat-card card-projects">
              <div className="card-projects-content">
                <div className="card-top-tag">
                  <span className="pill-tag-plain">PROJECTS</span>
                </div>
                <div className="stat-number-mid">25+</div>
              </div>

              {/* Vertical Rising Bar Chart Graphic */}
              <div className="rising-bars-graphic" aria-hidden="true" title="Project delivery growth">
                <span className="bar-col bar-1" />
                <span className="bar-col bar-2" />
                <span className="bar-col bar-3" />
                <span className="bar-col bar-4" />
                <span className="bar-col bar-5" />
                <span className="bar-col bar-6" />
                <span className="bar-col bar-7" />
                <span className="bar-col bar-8" />
                <span className="bar-col bar-9" />
              </div>
            </div>

            {/* Card 3 (Bottom Left Square Card): 4+ Years Exp */}
            <div className="glassblur-stat-card card-experience">
              <div className="stat-number-large">4+</div>
              <div className="card-stat-label">YEARS EXP</div>
            </div>

            {/* Card 4 (Bottom Right Square Card): 4.9 / 5.0 Client Reviews with Star Badge */}
            <div className="glassblur-stat-card card-reviews">
              <div className="reviews-star-badge" aria-hidden="true">
                <Star className="size-4 fill-white text-white" />
              </div>

              <div className="reviews-content-wrap">
                <div className="reviews-score">4.9 / 5.0</div>
                <div className="reviews-label">Client Reviews</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default AboutSection;
