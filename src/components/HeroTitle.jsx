import React from 'react';

export function HeroTitle() {
  return (
    <>
      <div className="hero-title-area">
        <div className="title-line-mask">
          <h1 className="title-line title-line-pure">PURE</h1>
        </div>
        <div className="title-line-mask">
          <div className="title-line title-line-design">DESIGN</div>
        </div>
      </div>

      <div className="title-year-tag">(’25)</div>

      <div className="hero-about-area">
        <div className="about-label">
          <span className="about-label-dot" />
          <span>(ABOUT)</span>
        </div>
        <p className="about-copy">
          Building stunning website that every brand deserves to be seen.
        </p>
      </div>

      <a href="#book-call" className="btn-book-call">
        <span>Book A Call</span>
        <span>↗</span>
      </a>
    </>
  );
}

