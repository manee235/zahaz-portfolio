import React from 'react';

export function HeroTitle({ onOpenHireMe, isLoaded = false }) {
  return (
    <div className={`hero-title-area ${isLoaded ? 'is-loaded' : 'is-loading'}`}>
      <h1 className="hero-stacked-title" aria-label="Creative Virtual Product Designer">
        <span className="hero-title-mask">
          <span className="hero-title-word word-creative">CREATIVE</span>
        </span>
        <span className="hero-title-mask">
          <span className="hero-title-word word-virtual">VIRTUAL</span>
        </span>
        <span className="hero-title-mask">
          <span className="hero-title-word word-product">PRODUCT</span>
        </span>
        <span className="hero-title-mask">
          <span className="hero-title-word word-designer">DESIGNER</span>
        </span>
      </h1>

      <button
        type="button"
        onClick={onOpenHireMe}
        className="btn-book-call"
        aria-label="Open Hire Me inquiry"
      >
        <span>Hire Me</span>
        <span>↗</span>
      </button>
    </div>
  );
}

export default HeroTitle;
