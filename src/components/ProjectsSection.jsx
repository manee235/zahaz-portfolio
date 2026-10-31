import React, { useState } from 'react';
import { TiltedGridHero } from './ui/tilted-grid-hero';
import { ArrowUpRight, Sparkles, Layers, Compass, Eye } from 'lucide-react';

const PROJECT_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Aura Residence - Spatial Architecture & Brutalist Monolith",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Kinetix Identity - Fluid Monochromatic Brand Platform",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    alt: "Vogue Noir - Editorial Direction & Chiaroscuro Campaign",
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    alt: "Atelier Form - Concrete Sculptural Pavilion",
  },
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    alt: "Elysium Paris - Haute Couture Digital Experience",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Prism Tower - Corporate Headquarters Architectural Identity",
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    alt: "Nordic Haven - Bespoke Interior & Spatial System",
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    alt: "Sartorial Lab - Luxury Menswear Global Strategy",
  },
  {
    src: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    alt: "Chronicle Monograph - Limited Edition Editorial Artbook",
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    alt: "Chronos One - Matte Black Titanium Horology Design",
  },
];

const CATEGORIES = ['ALL WORKS (24)', 'BRAND IDENTITY', 'SPATIAL & ARCHITECTURE', 'DIGITAL DIRECTION'];

export function ProjectsSection({ isReducedMotion = false }) {
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section className="projects-fullscreen-section" id="works">
      <TiltedGridHero
        images={PROJECT_IMAGES}
        speed={4.2}
        curve={76}
        tileHeight={34}
        aspectRatio={16 / 9}
        gap={6}
        axis={50}
        fade={8}
        className="w-full h-full min-h-screen"
        style={{ width: '100vw', height: '100vh', minHeight: '100vh' }}
      >
        {/* Full-bleed Edge-to-Edge UI Layer */}
        <div className="projects-fullscreen-overlay">
          
          {/* Top Floating Editorial Bar */}
          <header className="projects-overlay-top">
            <div className="projects-overlay-title-group">
              <div className="projects-tag-group">
                <span className="projects-dot-badge">●</span>
                <span className="projects-pill-label">(SELECTED WORKS)</span>
              </div>
              <h2 className="projects-display-title">
                CURATED ARCHIVE <span className="projects-year-spec">(’26)</span>
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="projects-filter-bar" role="tablist">
              {CATEGORIES.map((cat, idx) => (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === idx}
                  className={`projects-filter-pill ${activeCategory === idx ? 'is-active' : ''}`}
                  onClick={() => setActiveCategory(idx)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </header>

          {/* Central Hero Statement */}
          <div className="projects-overlay-center">
            <div className="projects-badge-pill">
              <Sparkles className="size-3 text-neutral-200 animate-pulse" />
              <span>3D FULL-BLEED CYLINDER REEL</span>
            </div>
            
            <h3 className="projects-center-headline">
              Every frame,
              <br />
              <span className="projects-center-italic">brought into focus.</span>
            </h3>

            <p className="projects-center-subtext">
              Images curve in from one edge of your display, flatten out at the centre, then fade away round the other.
            </p>
          </div>

          {/* Bottom Floating Bar */}
          <footer className="projects-overlay-bottom">
            <div className="projects-specs-strip">
              <div className="spec-item">
                <Layers className="size-3.5 text-neutral-400" />
                <span className="spec-label">16-Facet Cylinder</span>
              </div>
              <div className="spec-separator" />
              <div className="spec-item">
                <Compass className="size-3.5 text-neutral-400" />
                <span className="spec-label">76° Panoramic Arc</span>
              </div>
              <div className="spec-separator" />
              <div className="spec-item">
                <Eye className="size-3.5 text-neutral-400" />
                <span className="spec-label">GPU Transform Loop</span>
              </div>
              <div className="spec-separator" />
              <div className="spec-item text-neutral-300">
                <span className="font-semibold text-white">400+</span>
                <span className="spec-label">Deployments</span>
              </div>
            </div>

            <a
              href="#contact"
              className="projects-cta-btn"
            >
              <span>Request Full Case Study</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </footer>

        </div>
      </TiltedGridHero>
    </section>
  );
}

export default ProjectsSection;
