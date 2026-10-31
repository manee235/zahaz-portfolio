import React from 'react';

export function HeroTitle({ onOpenHireMe }) {
  return (
    <>
      <button
        type="button"
        onClick={onOpenHireMe}
        className="btn-book-call"
        aria-label="Open Hire Me inquiry"
      >
        <span>Hire Me</span>
        <span>↗</span>
      </button>
    </>
  );
}

