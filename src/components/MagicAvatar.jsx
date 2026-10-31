import React, { useState, useRef, useEffect } from 'react';
import { MEDIA } from '../constants/media';

export function MagicAvatar({
  className = '',
  style = {},
  isRecorder = false,
  isReducedMotion = false,
  driftY = 0,
  tiltStyle = {},
}) {
  const containerRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [coords, setCoords] = useState({ x: '50%', y: '50%', pxX: 0, pxY: 0 });

  // Recorder mode automated sweep
  useEffect(() => {
    if (!isRecorder || isReducedMotion) return;

    const timer = setTimeout(() => {
      setIsHovered(true);

      let start = null;
      const duration = 2600;

      function sweep(timestamp) {
        if (!start) start = timestamp;
        const elapsed = timestamp - start;
        const p = Math.min(elapsed / duration, 1);
        const angle = p * Math.PI * 2.5;
        const cx = 50 + Math.cos(angle) * 28;
        const cy = 48 + Math.sin(angle) * 32;

        setCoords({
          x: `${cx}%`,
          y: `${cy}%`,
          pxX: 0,
          pxY: 0,
        });

        if (p < 1) {
          requestAnimationFrame(sweep);
        } else {
          setIsHovered(false);
        }
      }

      requestAnimationFrame(sweep);
    }, 1800);

    return () => clearTimeout(timer);
  }, [isRecorder, isReducedMotion]);

  const handleMouseMove = (e) => {
    if (isRecorder || isReducedMotion) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const pctX = ((x / rect.width) * 100).toFixed(2);
    const pctY = ((y / rect.height) * 100).toFixed(2);

    setCoords({
      x: `${pctX}%`,
      y: `${pctY}%`,
      pxX: x,
      pxY: y,
    });
  };

  const handleMouseEnter = (e) => {
    if (isReducedMotion) return;
    setIsHovered(true);
    handleMouseMove(e);
  };

  const handleMouseLeave = () => {
    if (isRecorder || isReducedMotion) return;
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      className={`magic-avatar-container noir-avatar ${className} ${isHovered ? 'is-hovered' : ''}`}
      style={{
        ...style,
        ...tiltStyle,
        '--reveal-x': coords.x,
        '--reveal-y': coords.y,
        '--drift-y': `${driftY}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Layer 1: High-Contrast Film Noir Base Portrait */}
      <img
        className="magic-avatar-img magic-avatar-base noir-base-portrait"
        src={MEDIA.heroPhoto}
        alt="Sahas - Film Noir Portrait"
        loading="eager"
      />

      {/* Layer 2: Cinematic Chiaroscuro Vignette */}
      <div className="noir-vignette-overlay" aria-hidden="true" />

      {/* Layer 3: Authentic 35mm Film Grain Texture */}
      <div className="noir-grain-overlay" aria-hidden="true" />

      {/* Layer 4: Electric Red Magic Reveal Portrait */}
      <img
        className="magic-avatar-img magic-avatar-red"
        src={MEDIA.heroPhotoRed}
        alt="Sahas - Redux Variant"
        loading="eager"
        aria-hidden="true"
      />

      {/* Layer 5: Luminous Crimson Cursor Aura */}
      <div className="magic-reveal-flare" aria-hidden="true" />

      {/* Interactive Badge */}
      <div className="magic-reveal-badge" aria-hidden="true">
        <span className="badge-pulse-dot" />
        <span className="badge-text">NOIR · MAGIC REVEAL</span>
      </div>
    </div>
  );
}
