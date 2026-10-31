import { useState, useEffect } from 'react';

export function useCounter(endValue, duration = 1400, delay = 0, shouldTrigger = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!shouldTrigger) return;

    const isReduced = typeof window !== 'undefined' && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReduced) {
      setCount(endValue);
      return;
    }

    const timer = setTimeout(() => {
      let startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Cubic ease-out
        const ease = 1 - Math.pow(1 - progress, 3);
        setCount(Math.floor(ease * endValue));

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          setCount(endValue);
        }
      }

      requestAnimationFrame(step);
    }, delay);

    return () => clearTimeout(timer);
  }, [endValue, duration, delay, shouldTrigger]);

  return count;
}

