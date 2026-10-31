import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, ArrowUpRight, Award, Layers, Sparkles, Check } from 'lucide-react';

export function ProjectModal({
  project,
  currentIndex = 0,
  totalProjects = 1,
  isOpen = false,
  onClose = () => {},
  onNext = () => {},
  onPrev = () => {},
}) {
  // Handle keyboard events (Escape, ArrowLeft, ArrowRight)
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !project) return null;

  return (
    <div
      className="project-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="project-modal-card"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Close and Project Counter */}
        <div className="modal-header-bar">
          <div className="modal-counter-pill">
            <span className="modal-pulse-dot" />
            <span>PROJECT {String(currentIndex + 1).padStart(2, '0')} / {String(totalProjects).padStart(2, '0')}</span>
          </div>

          <div className="modal-header-actions">
            <div className="modal-nav-group">
              <button
                type="button"
                className="modal-icon-btn"
                onClick={onPrev}
                title="Previous project (←)"
                aria-label="Previous project"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                type="button"
                className="modal-icon-btn"
                onClick={onNext}
                title="Next project (→)"
                aria-label="Next project"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>

            <button
              type="button"
              className="modal-close-btn"
              onClick={onClose}
              title="Close modal (Esc)"
              aria-label="Close modal"
            >
              <X className="size-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Content Grid */}
        <div className="modal-body-grid">
          
          {/* Left Column: 1:1 High-Res Square Project Image */}
          <div className="modal-media-col">
            <div className="modal-square-frame">
              <img
                src={project.src}
                alt={project.title || project.alt || "Project visual"}
                className="modal-square-image"
                loading="eager"
              />
              <div className="modal-image-vignette" />
              <div className="modal-live-tag">
                <Sparkles className="size-3 text-neutral-300" />
                <span>1:1 ULTRA HIGH RESOLUTION</span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative & Details */}
          <div className="modal-info-col">
            
            {/* Category & Year Tag */}
            <div className="modal-tag-row">
              <span className="modal-category-tag">{project.category || 'BRAND IDENTITY & SPATIAL'}</span>
              <span className="modal-year-tag">[ {project.year || '2026'} ]</span>
            </div>

            {/* Main Project Title */}
            <h2 id="modal-project-title" className="modal-title">
              {project.title || 'CURATED WORK'}
            </h2>

            {/* Client & Role Spec Grid */}
            <div className="modal-specs-grid">
              <div className="modal-spec-cell">
                <span className="modal-spec-caption">CLIENT</span>
                <span className="modal-spec-val">{project.client || 'Confidential Enterprise'}</span>
              </div>
              <div className="modal-spec-cell">
                <span className="modal-spec-caption">ROLE</span>
                <span className="modal-spec-val">{project.role || 'Design Direction & Execution'}</span>
              </div>
            </div>

            {/* Rich Narrative Description */}
            <div className="modal-description-box">
              <p className="modal-description-text">
                {project.description ||
                  'An architectural and brand identity system created for uncompromising cultural visibility. Balancing structural minimalism with tactile editorial finish to command audience authority.'}
              </p>
            </div>

            {/* Deliverables / Scope */}
            {project.deliverables && project.deliverables.length > 0 && (
              <div className="modal-scope-section">
                <span className="modal-section-heading">SCOPE & ARTIFACTS</span>
                <div className="modal-pill-list">
                  {project.deliverables.map((item, idx) => (
                    <span key={idx} className="modal-scope-pill">
                      <Check className="size-3 text-white" />
                      <span>{item}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Honors / Recognition Badge */}
            {project.metrics && (
              <div className="modal-award-callout">
                <Award className="size-4 text-white shrink-0" />
                <span className="modal-award-text">{project.metrics}</span>
              </div>
            )}

            {/* Bottom Modal Actions */}
            <div className="modal-footer-actions">
              <a
                href="#contact"
                onClick={onClose}
                className="modal-primary-btn"
              >
                <span>Inquire This System</span>
                <ArrowUpRight className="size-4" />
              </a>

              <button
                type="button"
                onClick={onClose}
                className="modal-secondary-btn"
              >
                Close (Esc)
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default ProjectModal;

