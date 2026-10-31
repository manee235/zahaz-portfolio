import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

export function AboutSection({ onOpenHireMe }) {
  const behanceUrl = 'https://www.behance.net/sahasradeshan';

  return (
    <section className="section-about" id="about">
      <div className="about-container">
        
        {/* Centered Editorial Wrapper */}
        <div className="about-centered-content">
          
          {/* Big Centered Headline: HELLO I'M DESHAN GANEGODA */}
          <h2 className="about-centered-name">
            <span className="about-greeting">HELLO I'M</span>{' '}
            <span className="about-name">DESHAN GANEGODA</span>
          </h2>

          {/* Big Centered Bio Narrative in Bebas Neue font */}
          <p className="about-centered-bio">
            SPECIALIZED IN 3D SPATIAL ENVIRONMENTS, HIGH-PERFORMANCE PRODUCT MODELING, AND LUXURY BRAND ENGINEERING 
            WITH OVER <strong className="text-white font-semibold">4+ YEARS OF DEDICATED CRAFT</strong> FOR INTERNATIONAL CLIENTS WORLDWIDE.
          </p>

          {/* Centered Actions: Behance Profile & Hire Me */}
          <div className="about-centered-actions">
            <a
              href={behanceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-behance-pill"
              title="View Deshan Ganegoda on Behance"
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
    </section>
  );
}

export default AboutSection;
