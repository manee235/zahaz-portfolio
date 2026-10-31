import React from 'react';

export function BarSection({ onScrollDown }) {
  return (
    <div className="section-bar">
      <div className="bar-inner">
        <div className="bar-left">
          <span>EST</span>
          <span className="year">2019</span>
        </div>
        <div
          className="bar-center"
          role="button"
          tabIndex={0}
          aria-label="Scroll down"
          onClick={onScrollDown}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') onScrollDown();
          }}
        >
          <span>SCROLL DOWN</span>
          <span className="scroll-arrow-circle">↓</span>
        </div>
        <div className="bar-right">LIVE IN DETAILS</div>
      </div>
    </div>
  );
}

