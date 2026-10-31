import React, { useEffect, useState, useRef, useMemo } from 'react';
import { MANIFESTO_LINES } from '../constants/media';

export function ManifestoSection({ isRecorder, isReducedMotion }) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

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

  // Compute word color with 3-word soft edge
  const getWordColor = (idx) => {
    if (isReducedMotion) return '#f4f4f4';
    const softEdge = 3;
    const currentPos = scrollProgress * (totalWords + softEdge);

    if (idx <= currentPos - softEdge) {
      return '#f4f4f4';
    } else if (idx >= currentPos) {
      return '#6f6f6f';
    } else {
      const ratio = (currentPos - idx) / softEdge;
      const clamped = Math.max(0, Math.min(1, ratio));
      const val = Math.round(111 + (244 - 111) * clamped);
      return `rgb(${val}, ${val}, ${val})`;
    }
  };

  return (
    <section className="section-manifesto" id="studio" ref={sectionRef}>
      <div className="manifesto-container">
        <p className="manifesto-text" aria-label="Agency manifesto">
          {MANIFESTO_LINES.map((line, lIdx) => (
            <React.Fragment key={lIdx}>
              {line.map((word, wIdx) => {
                const wordObj = allWords.find(
                  (w) => w.lineIdx === lIdx && w.word === word && allWords.indexOf(w) >= lIdx
                );
                const globalIdx = allWords.findIndex(
                  (item, idx) => item.lineIdx === lIdx && item.word === word && idx >= (allWords.filter((x, i) => i < idx && x.lineIdx === lIdx).length)
                );
                // calculate word index accurately
                let runningIdx = 0;
                for (let i = 0; i < lIdx; i++) {
                  runningIdx += MANIFESTO_LINES[i].length;
                }
                runningIdx += wIdx;

                return (
                  <span
                    key={wIdx}
                    className="manifesto-word"
                    style={{ color: getWordColor(runningIdx) }}
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

      <div className="manifesto-subline">
        Performance-driven marketing, from strategy to execution.{' '}
        <span className="subline-italic">Built for growing brands.</span>
      </div>
    </section>
  );
}

