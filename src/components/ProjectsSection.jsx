import React, { useState } from 'react';
import { TiltedGridHero } from './ui/tilted-grid-hero';
import { ProjectModal } from './ProjectModal';
import { ArrowUpRight, Sparkles, Layers, Compass, Eye, MousePointerClick } from 'lucide-react';

const PROJECT_IMAGES = [
  {
    id: 'proj-01',
    title: "AURA RESIDENCE",
    category: "SPATIAL ARCHITECTURE",
    year: "2026",
    client: "Atelier Nord / Oslo",
    role: "Spatial Direction & Visual Identity",
    description: "A monolithic coastal residence engineered from textured cast concrete, cantilevered architectural volumes, and panoramic floor-to-ceiling glass. The brand platform translates the stark Scandinavian topography into a tactile editorial publication, custom typography, and digital presence.",
    deliverables: ["Architectural Direction", "Visual Identity", "Bespoke Monograph", "Spatial Photography"],
    metrics: "Best Spatial Architecture 2026 · Featured in ArchDaily & Frame Magazine",
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Aura Residence - Spatial Architecture & Brutalist Monolith",
  },
  {
    id: 'proj-02',
    title: "KINETIX PLATFORM",
    category: "BRAND IDENTITY",
    year: "2025",
    client: "Kinetix Digital Capital",
    role: "Complete Rebrand & Generative Visuals",
    description: "A fluid, monochromatic brand ecosystem for a digital investment syndicate. Features liquid typographic morphing, generative real-time data visualizers, and a proprietary dark-mode interface system engineered for high-frequency trading terminals.",
    deliverables: ["Brand Strategy", "Generative WebGL System", "Typography Specimen", "Design System"],
    metrics: "+240% syndicate engagement · Awwwards Site of the Month",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Kinetix Identity - Fluid Monochromatic Brand Platform",
  },
  {
    id: 'proj-03',
    title: "VOGUE NOIR",
    category: "EDITORIAL DIRECTION",
    year: "2026",
    client: "Condé Nast / Paris",
    role: "Creative Direction & Chiaroscuro Campaign",
    description: "An uncompromising editorial photography series celebrating classic 1940s film noir chiaroscuro through contemporary avant-garde haute couture. Produced with analog medium-format grain, stark directional key lighting, and deep charcoal shadows.",
    deliverables: ["Creative Direction", "Exhibition Scenography", "Hardcover Monograph", "Film Production"],
    metrics: "Prix de la Photographie Paris · 14 Global Gallery Showings",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    alt: "Vogue Noir - Editorial Direction & Chiaroscuro Campaign",
  },
  {
    id: 'proj-04',
    title: "ATELIER FORM",
    category: "SPATIAL ARCHITECTURE",
    year: "2025",
    client: "Form Foundation / Berlin",
    role: "Sculptural Pavilion & Scenography",
    description: "A permanent cultural pavilion exploring raw rammed-earth construction and geometric light apertures. Designed to host international design symposiums and acoustic performances with zero artificial amplification.",
    deliverables: ["Pavilion Design", "Wayfinding System", "Exhibition Catalog", "Acoustic Mapping"],
    metrics: "Mies van der Rohe Award Nominee 2026",
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    alt: "Atelier Form - Concrete Sculptural Pavilion",
  },
  {
    id: 'proj-05',
    title: "ELYSIUM HAUTE",
    category: "DIGITAL DIRECTION",
    year: "2026",
    client: "Elysium Couture / Milan",
    role: "E-Commerce Experience & 3D Runway",
    description: "An immersive digital showroom blending 60fps WebGL fabric simulations with razor-sharp editorial typography. Allows global private collectors to inspect couture garments down to the individual silk thread before bespoke commissioning.",
    deliverables: ["3D Cloth Simulation", "Global Commerce Engine", "Editorial Lookbook", "VIP Portal"],
    metrics: "€14.2M In Private Commissions In First 90 Days",
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    alt: "Elysium Paris - Haute Couture Digital Experience",
  },
  {
    id: 'proj-06',
    title: "PRISM TOWER",
    category: "SPATIAL ARCHITECTURE",
    year: "2025",
    client: "Prism Development / Zurich",
    role: "Corporate Architecture & Identity",
    description: "A 44-story glass and steel spire dominating Zurich’s financial district. The identity system mirrors the building's geometric triangular facets across internal signage, executive suites, and corporate literature.",
    deliverables: ["Façade Identity", "Environmental Signage", "Corporate Collateral", "Digital Twin"],
    metrics: "LEED Platinum Certified · Council on Tall Buildings Excellence",
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Prism Tower - Corporate Headquarters Architectural Identity",
  },
  {
    id: 'proj-07',
    title: "NORDIC HAVEN",
    category: "SPATIAL ARCHITECTURE",
    year: "2026",
    client: "Haven Hospitality / Copenhagen",
    role: "Interior System & Brand Narrative",
    description: "A 24-suite boutique sanctuary curated with smoked white oak, natural limestone, and acoustic wool drapery. Every tactile detail—from custom door hardware to organic room fragrances—was designed from scratch.",
    deliverables: ["Interior Architecture", "Guest Experience Strategy", "Bespoke Furniture Line", "Staff Uniforms"],
    metrics: "Wallpaper* Design Awards 2026 Best Urban Hotel",
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    alt: "Nordic Haven - Bespoke Interior & Spatial System",
  },
  {
    id: 'proj-08',
    title: "SARTORIAL LAB",
    category: "BRAND IDENTITY",
    year: "2025",
    client: "Sartorial Menswear / London",
    role: "Global Strategy & Retail Direction",
    description: "Repositioning a Savile Row tailoring institution for the modern digital era. Created an ultra-minimalist visual code, tactile handmade packaging, and a mobile-first bespoke appointment scheduling platform.",
    deliverables: ["Brand Repositioning", "Packaging Suite", "Retail Concept Store", "Digital Commerce"],
    metrics: "+195% International Revenue Growth",
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    alt: "Sartorial Lab - Luxury Menswear Global Strategy",
  },
  {
    id: 'proj-09',
    title: "CHRONICLE ARTBOOK",
    category: "EDITORIAL DIRECTION",
    year: "2026",
    client: "Steidl Publishing / Göttingen",
    role: "Book Design & Typography",
    description: "A limited-run 420-page monograph documenting ten years of brutalist and spatial design. Featuring custom Swiss binding, hand-tipped silver gelatin plates, and French fold Japanese paper signatures.",
    deliverables: ["Publication Design", "Typographic System", "Print Production", "Slipcase Fabrication"],
    metrics: "Tokyo TDC Annual Award 2026 · Limited Edition Sold Out",
    src: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    alt: "Chronicle Monograph - Limited Edition Editorial Artbook",
  },
  {
    id: 'proj-10',
    title: "CHRONOS ONE",
    category: "BRAND IDENTITY",
    year: "2026",
    client: "Chronos Horology / Geneva",
    role: "Industrial Identity & Launch Campaign",
    description: "A mechanical chronograph milled from a single block of Grade 5 titanium with an all-black diamond-like carbon finish. We directed the watch's visual identity, technical launch cinema, and collector packaging.",
    deliverables: ["Product Launch Cinema", "Visual Identity", "Collector Box Design", "Interactive 3D Configurator"],
    metrics: "Grand Prix d'Horlogerie de Genève Selection",
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    alt: "Chronos One - Matte Black Titanium Horology Design",
  },
];

const CATEGORIES = ['ALL WORKS (24)', 'BRAND IDENTITY', 'SPATIAL & ARCHITECTURE', 'DIGITAL DIRECTION'];

export function ProjectsSection({ isReducedMotion = false }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedIdx, setSelectedIdx] = useState(null);

  // Filter projects by active tab if not "ALL WORKS"
  const filteredProjects = PROJECT_IMAGES.filter((item) => {
    if (activeCategory === 0) return true;
    if (activeCategory === 1) return item.category.includes('BRAND');
    if (activeCategory === 2) return item.category.includes('SPATIAL');
    if (activeCategory === 3) return item.category.includes('DIGITAL') || item.category.includes('EDITORIAL');
    return true;
  });

  const handleTileClick = (img, tileLoopIdx) => {
    const foundIdx = PROJECT_IMAGES.findIndex((p) => p.src === img.src);
    setSelectedIdx(foundIdx !== -1 ? foundIdx : 0);
  };

  const handleCloseModal = () => {
    setSelectedIdx(null);
  };

  const handleNextProject = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev + 1) % PROJECT_IMAGES.length);
  };

  const handlePrevProject = () => {
    if (selectedIdx === null) return;
    setSelectedIdx((prev) => (prev - 1 + PROJECT_IMAGES.length) % PROJECT_IMAGES.length);
  };

  const currentProject = selectedIdx !== null ? PROJECT_IMAGES[selectedIdx] : null;

  return (
    <section className="projects-fullscreen-section" id="works">
      {/* 3D Angled Line Carousel: Pushed back in Z, streaming from back in the distance to front */}
      <TiltedGridHero
        images={filteredProjects}
        speed={32}
        pushBack={-220}
        angleY={24}
        angleX={4}
        gap={36}
        fade={10}
        direction="back-to-front"
        className="w-full h-full min-h-screen"
        style={{ width: '100vw', height: '100vh', minHeight: '100vh' }}
        onImageClick={handleTileClick}
      >
        {/* Full-bleed Edge-to-Edge Foreground Layer */}
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
              <span>3D ANGLED PERSPECTIVE REEL</span>
            </div>
            
            <h3 className="projects-center-headline">
              Every frame,
              <br />
              <span className="projects-center-italic">brought into focus.</span>
            </h3>

            <p className="projects-center-subtext">
              Projects stream along an angled 3D depth vector—emerging from the distant background and advancing forward in sharp focus.
            </p>

            <div className="projects-click-hint">
              <MousePointerClick className="size-3.5 text-neutral-400" />
              <span>CLICK ANY 1:1 SQUARE TILE TO INSPECT CASE STUDY</span>
            </div>
          </div>

          {/* Bottom Floating Bar */}
          <footer className="projects-overlay-bottom">
            <div className="projects-specs-strip">
              <div className="spec-item">
                <Compass className="size-3.5 text-neutral-400" />
                <span className="spec-label">24° Angled 3D Vector</span>
              </div>
              <div className="spec-separator" />
              <div className="spec-item">
                <Layers className="size-3.5 text-neutral-400" />
                <span className="spec-label">Pushed Backward (-220px)</span>
              </div>
              <div className="spec-separator" />
              <div className="spec-item">
                <Eye className="size-3.5 text-neutral-400" />
                <span className="spec-label">1:1 Square Ratio</span>
              </div>
              <div className="spec-separator" />
              <div className="spec-item text-neutral-300">
                <span className="font-semibold text-white">10</span>
                <span className="spec-label">Curated Studies</span>
              </div>
            </div>

            <a
              href="#contact"
              className="projects-cta-btn"
            >
              <span>Request Full Portfolio</span>
              <ArrowUpRight className="size-3.5" />
            </a>
          </footer>

        </div>
      </TiltedGridHero>

      {/* Interactive Project Details Popup Modal */}
      <ProjectModal
        isOpen={selectedIdx !== null}
        project={currentProject}
        currentIndex={selectedIdx ?? 0}
        totalProjects={PROJECT_IMAGES.length}
        onClose={handleCloseModal}
        onNext={handleNextProject}
        onPrev={handlePrevProject}
      />
    </section>
  );
}

export default ProjectsSection;
