import { useState, useEffect, useRef } from 'react';

export function useMouseParallax(active = true) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const targetPos = useRef({ x: 0, y: 0 });
  const currentPos = useRef({ x: 0, y: 0 });
  const frameId = useRef(null);

  useEffect(() => {
    if (!active) return;

    const isReduced = typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) return;

    function handleMouseMove(e) {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const nx = ((e.clientX / width) - 0.5) * 2;
      const ny = ((e.clientY / height) - 0.5) * 2;
      targetPos.current = { x: nx, y: ny };
    }

    function animate() {
      // Smooth lerp (damping factor 0.08)
      currentPos.current.x += (targetPos.current.x - currentPos.current.x) * 0.08;
      currentPos.current.y += (targetPos.current.y - currentPos.current.y) * 0.08;

      setMousePos({
        x: Number(currentPos.current.x.toFixed(4)),
        y: Number(currentPos.current.y.toFixed(4)),
      });

      frameId.current = requestAnimationFrame(animate);
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    frameId.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (frameId.current) cancelAnimationFrame(frameId.current);
    };
  }, [active]);

  return mousePos;
}
