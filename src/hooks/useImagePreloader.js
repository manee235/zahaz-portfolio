import { useState, useEffect, useRef } from 'react';

/**
 * useImagePreloader
 * Preloads an array of image URLs and tracks real loading progress
 * with smooth easing interpolation and fallback timeout.
 */
export function useImagePreloader(imageUrls = []) {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [status, setStatus] = useState('INITIALIZING ARCHIVE');

  const animationRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Deduplicate and filter valid image URLs
    const urls = Array.from(new Set(imageUrls.filter(Boolean)));
    const total = urls.length;

    if (total === 0) {
      setProgress(100);
      setIsReady(true);
      return;
    }

    let loaded = 0;
    let targetProgress = 5;
    let currentProgress = 0;
    let isCancelled = false;

    // Minimum display time (1200ms) for smooth cinematic reveal
    const minDuration = 1200;
    startTimeRef.current = Date.now();

    // Status message updater based on progress
    const getStatusText = (pct) => {
      if (pct < 20) return 'INITIALIZING ARCHIVE';
      if (pct < 45) return 'DOWNLOADING HIGH-RES EDITORIAL ASSETS';
      if (pct < 75) return 'CACHING 4K PORTRAIT & REDUX VARIANTS';
      if (pct < 95) return 'COMPOSING TYPOGRAPHY & VIEWPORT';
      return 'READY · ENTERING PORTFOLIO';
    };

    // Continuous smooth animation loop
    const tick = () => {
      if (isCancelled) return;

      const elapsed = Date.now() - startTimeRef.current;
      const minProgressFloor = Math.min((elapsed / minDuration) * 90, 90);

      // Current target is the higher of actual loaded pct or time-based pace
      const effectiveTarget = Math.max(targetProgress, minProgressFloor);

      // Smooth lerp toward effective target
      currentProgress += (effectiveTarget - currentProgress) * 0.1;

      // Snap when close
      if (Math.abs(effectiveTarget - currentProgress) < 0.2) {
        currentProgress = effectiveTarget;
      }

      const displayPct = Math.min(100, Math.round(currentProgress));
      setProgress(displayPct);
      setStatus(getStatusText(displayPct));

      if (displayPct >= 100) {
        // Complete! Brief delay for final 100% appreciation
        setTimeout(() => {
          if (!isCancelled) {
            setIsReady(true);
          }
        }, 320);
      } else {
        animationRef.current = requestAnimationFrame(tick);
      }
    };

    animationRef.current = requestAnimationFrame(tick);

    const onAssetResolved = () => {
      if (isCancelled) return;
      loaded += 1;
      setLoadedCount(loaded);

      const actualPct = Math.round((loaded / total) * 100);
      targetProgress = Math.max(targetProgress, actualPct);

      if (loaded >= total) {
        // Once all assets finish, ensure fonts are also ready
        if (document.fonts && document.fonts.ready) {
          document.fonts.ready.then(() => {
            targetProgress = 100;
          }).catch(() => {
            targetProgress = 100;
          });
        } else {
          targetProgress = 100;
        }
      }
    };

    // Preload each image asynchronously
    urls.forEach((src) => {
      const img = new Image();
      img.src = src;

      if (img.complete && img.naturalWidth !== 0) {
        // Already cached in memory
        onAssetResolved();
      } else {
        img.onload = onAssetResolved;
        img.onerror = onAssetResolved; // Proceed gracefully even on network error
      }
    });

    // Failsafe timeout: 8 seconds maximum
    const safetyTimer = setTimeout(() => {
      targetProgress = 100;
    }, 8000);

    return () => {
      isCancelled = true;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      clearTimeout(safetyTimer);
    };
  }, [imageUrls]);

  return {
    progress,
    isReady,
    loadedCount,
    totalCount: Array.from(new Set(imageUrls.filter(Boolean))).length,
    status,
  };
}

export default useImagePreloader;

