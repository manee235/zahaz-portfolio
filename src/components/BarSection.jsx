import React, { useEffect, useState, useRef } from 'react';

export function BarSection({ onScrollDown }) {
  const [inView, setInView] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="section-bar" ref={barRef}>
      <div className="bar-inner bar-inner-centered">
        <div
          className={`bar-center text-blur-reveal ${inView ? 'is-in-view' : ''} delay-100`}
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
      </div>
    </div>
  );
}

