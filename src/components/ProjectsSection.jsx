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
    <section className="projects-section-container" id="works">
      <div className="projects-inner-stage">
        
        {/* Editorial Section Header */}
        <div className="projects-header-row">
          <div className="projects-tag-group">
            <span className="projects-dot-badge">●</span>
            <span className="projects-pill-label">(SELECTED WORKS)</span>
          </div>
          
          <div className="projects-heading-block">
            <h2 className="projects-display-title">
              CURATED ARCHIVE <span className="projects-year-spec">(’26)</span>
            </h2>
            <p className="projects-subtitle">
              Every system is engineered from strategy through execution—bending aesthetic discipline into measurable brand authority.
            </p>
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
        </div>

        {/* 3D Curved Cylindrical Carousel Hero Component */}
        <div className="projects-carousel-wrapper">
          <TiltedGridHero
            images={PROJECT_IMAGES}
            speed={4.2}
            curve={78}
            tileHeight={30}
            aspectRatio={16 / 9}
            gap={5.5}
            fade={14}
            className="h-[520px] md:h-[620px] w-full rounded-2xl border border-white/14 bg-neutral-950/80 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-xl"
          >
            <div className="relative z-10 flex h-full flex-col items-center justify-between py-10 md:py-14 text-center pointer-events-none">
              
              {/* Top Floating Badge */}
              <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/60 px-4 py-1.5 text-[11px] font-semibold tracking-[0.2em] text-neutral-300 uppercase backdrop-blur-xl shadow-lg">
                <Sparkles className="size-3 text-neutral-200 animate-pulse" />
                <span>3D CONTINUOUS CYLINDER REEL</span>
              </div>

              {/* Central Typographic Statement */}
              <div className="px-6 flex flex-col items-center max-w-2xl">
                <h3 className="text-balance text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white font-['Archivo'] leading-[0.95]">
                  Every frame,
                  <br />
                  <span className="text-neutral-400 font-light italic">brought into focus.</span>
                </h3>
              </div>

              {/* Bottom Interactive Footer CTA */}
              <div className="pointer-events-auto flex flex-col sm:flex-row items-center gap-4 px-6">
                <p className="text-xs sm:text-sm text-neutral-400 tracking-wide font-normal">
                  Dynamic cylinder projection with multi-facet CSS perspective
                </p>
                <div className="h-4 w-px bg-white/20 hidden sm:block" />
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase text-white bg-white/10 hover:bg-white/20 border border-white/25 px-4 py-2 rounded-full transition-all duration-300 hover:scale-105"
                >
                  <span>Request Full Case Study</span>
                  <ArrowUpRight className="size-3.5" />
                </a>
              </div>

            </div>
          </TiltedGridHero>
        </div>

        {/* Technical Specification Bar underneath the reel */}
        <div className="projects-specs-strip">
          <div className="spec-item">
            <Layers className="size-4 text-neutral-400" />
            <span className="spec-label">16-Facet Cylindrical Slices</span>
          </div>
          <div className="spec-separator" />
          <div className="spec-item">
            <Compass className="size-4 text-neutral-400" />
            <span className="spec-label">78° Dynamic Horizon Arc</span>
          </div>
          <div className="spec-separator" />
          <div className="spec-item">
            <Eye className="size-4 text-neutral-400" />
            <span className="spec-label">Infinite GPU Transform Loop</span>
          </div>
          <div className="spec-separator" />
          <div className="spec-item text-neutral-300">
            <span className="font-semibold text-white">400+</span>
            <span className="spec-label">Deployments Worldwide</span>
          </div>
        </div>

      </div>
    </section>
  );
}

export default ProjectsSection;
