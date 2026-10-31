import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MANIFESTO_LINES } from '../constants/media';

export function ManifestoSection({ isRecorder, isReducedMotion }) {
  const sectionRef = useRef(null);
  const sublineRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [sublineInView, setSublineInView] = useState(false);

  // Flatten words with line index
  const allWords = useMemo(() => {
    const list = [];
    let count = 0;
    MANIFESTO_LINES.forEach((line, lineIdx) => {
      line.forEach((word) => {
        list.push({ word, index: count, lineIdx });
        count++;
      });
    });
    return list;
  }, []);

  const totalWords = allWords.length;

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSublineInView(true);
      }
    }, { threshold: 0.2 });

    if (sublineRef.current) observer.observe(sublineRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isReducedMotion) {
      setScrollProgress(1);
      return;
    }

    if (isRecorder) {
      // Recorder mode: 1.3s to 4.2s (2900ms)
      const timer = setTimeout(() => {
        let startTime = null;
        const duration = 2900;
        function step(timestamp) {
          if (!startTime) startTime = timestamp;
          const elapsed = timestamp - startTime;
          const p = Math.min(elapsed / duration, 1);
          setScrollProgress(p);
          if (p < 1) {
            requestAnimationFrame(step);
          }
        }
        requestAnimationFrame(step);
      }, 1300);
      return () => clearTimeout(timer);
    }

    function handleScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const winHeight = window.innerHeight;
      const enterY = winHeight * 0.8;
      const exitY = winHeight * 0.2;
      const progress = (enterY - rect.top) / (enterY - exitY + rect.height * 0.45);
      setScrollProgress(Math.max(0, Math.min(1, progress)));
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isRecorder, isReducedMotion]);

  // Compute word appearance: color, blur, pushing translation & opacity
  const getWordStyle = (idx) => {
    if (isReducedMotion) {
      return { color: '#f4f4f4', filter: 'none', transform: 'none', opacity: 1 };
    }
    const softEdge = 3.5;
    const currentPos = scrollProgress * (totalWords + softEdge);

    if (idx <= currentPos - softEdge) {
      return {
        color: '#f4f4f4',
        filter: 'blur(0px)',
        transform: 'translateY(0px)',
        opacity: 1,
      };
    } else if (idx >= currentPos) {
      return {
        color: '#555555',
        filter: 'blur(5px)',
        transform: 'translateY(8px)',
        opacity: 0.35,
      };
    } else {
      const ratio = (currentPos - idx) / softEdge;
      const clamped = Math.max(0, Math.min(1, ratio));
      const val = Math.round(85 + (244 - 85) * clamped);
      const blurVal = (5 * (1 - clamped)).toFixed(2);
      const pushY = (8 * (1 - clamped)).toFixed(2);
      const opacityVal = (0.35 + 0.65 * clamped).toFixed(2);
      return {
        color: `rgb(${val}, ${val}, ${val})`,
        filter: `blur(${blurVal}px)`,
        transform: `translateY(${pushY}px)`,
        opacity: opacityVal,
      };
    }
  };

  return (
    <section className="section-manifesto" id="studio" ref={sectionRef}>
      <div className="manifesto-container">
        <p className="manifesto-text" aria-label="Agency manifesto">
          {MANIFESTO_LINES.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {line.map((word, wIdx) => {
                let runningIdx = 0;
                for (let i = 0; i < lIdx; i++) {
                  runningIdx += MANIFESTO_LINES[i].length;
                }
                runningIdx += wIdx;

                return (
                  <span
                    key={wIdx}
                    className="manifesto-word"
                    style={getWordStyle(runningIdx)}
                  >
                    {word}{' '}
                  </span>
                );
              })}
              {lIdx < MANIFESTO_LINES.length - 1 && <br className="manifesto-desktop-br" />}
            </React.Fragment>
          ))}
        </p>
      </div>

      <div
        ref={sublineRef}
        className={`manifesto-subline text-blur-reveal ${sublineInView ? 'is-in-view' : ''} delay-200`}
      >
        Performance-driven marketing, from strategy to execution.{' '}
        <span className="subline-italic">Built for growing brands.</span>
      </div>
    </section>
  );
}

