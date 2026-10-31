"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TiltedGridImage = {
  id?: string;
  src: string;
  alt?: string;
  title?: string;
  category?: string;
  year?: string;
  client?: string;
  role?: string;
  description?: string;
  deliverables?: string[];
  metrics?: string;
};

export type TiltedGridHeroProps = {
  /** Images to stream continuously along the 3D angled line */
  images: TiltedGridImage[];
  /** Seconds for one full cycle loop @default 34 */
  speed?: number;
  /** Distance in pixels pushed back into Z space @default -200 */
  pushBack?: number;
  /** Angle along Y axis in degrees to create back-to-front perspective @default 24 */
  angleY?: number;
  /** Subtle vertical tilt in degrees @default 4 */
  angleX?: number;
  /** Height/width of each 1:1 square tile in pixels (or responsive clamp) */
  tileSize?: number;
  /** Gap between square tiles in pixels @default 32 */
  gap?: number;
  /** Edge mask fade percentage @default 10 */
  fade?: number;
  /** Direction of movement: 'back-to-front' or 'front-to-back' @default 'back-to-front' */
  direction?: 'back-to-front' | 'front-to-back';
  /** Callback fired when a tile is clicked */
  onImageClick?: (image: TiltedGridImage, index: number) => void;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
};

export function TiltedGridHero({
  images = [],
  speed = 36,
  pushBack = -200,
  angleY = 24,
  angleX = 4,
  gap = 32,
  fade = 10,
  direction = 'back-to-front',
  onImageClick,
  children,
  className,
  style,
  ...props
}: React.ComponentProps<"div"> & TiltedGridHeroProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const id = React.useId().replace(/[^a-zA-Z0-9]/g, "");
  const animName = `angled-stream-${id}`;

  // Duplicate items 3 times for a seamless, infinite loop
  const displayList = React.useMemo(() => {
    if (!images || images.length === 0) return [];
    return [...images, ...images, ...images];
  }, [images]);

  // Preload all unique images
  React.useEffect(() => {
    images.forEach(({ src }) => {
      if (src) new Image().src = src;
    });
  }, [images]);

  // Direction animation logic:
  // With angleY > 0 (e.g. 24deg), right side is in the back (deep negative Z), left side is in the front (positive Z).
  // Translating from 0% to -33.333% moves items from right (back) to left (front) = back-to-front stream!
  const fromTranslate = direction === 'back-to-front' ? '0%' : '-33.3333%';
  const toTranslate = direction === 'back-to-front' ? '-33.3333%' : '0%';

  const keyframesCss = `
    @keyframes ${animName} {
      0% {
        transform: translate3d(${fromTranslate}, 0, 0);
      }
      100% {
        transform: translate3d(${toTranslate}, 0, 0);
      }
    }
    @media (prefers-reduced-motion: reduce) {
      .angled-stream-track-${id} {
        animation-play-state: paused !important;
      }
    }
  `;

  const maskStyle = `linear-gradient(90deg, transparent 0%, #000 ${fade}%, #000 ${100 - fade}%, transparent 100%)`;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden w-full h-full", className)}
      style={{
        width: "100%",
        height: "100%",
        ...style,
      }}
      {...props}
    >
      <style>{keyframesCss}</style>

      {/* 3D Perspective Stage: Pushed backward in Z, angled from back to front */}
      <div
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
        style={{
          perspective: "1300px",
          perspectiveOrigin: "50% 50%",
          maskImage: maskStyle,
          WebkitMaskImage: maskStyle,
          zIndex: 1,
        }}
        aria-hidden
      >
        {/* Angled 3D Runway Plane: Pushed back in Z & rotated in Y */}
        <div
          className="relative flex items-center justify-start pointer-events-auto"
          style={{
            transformStyle: "preserve-3d",
            transform: `translate3d(0, 0, ${pushBack}px) rotateY(${angleY}deg) rotateX(${angleX}deg)`,
            width: "100%",
            willChange: "transform",
          }}
        >
          {/* Looping Track moving along the angled 3D line */}
          <div
            className={`angled-stream-track-${id} flex items-center will-change-transform`}
            style={{
              gap: `${gap}px`,
              animation: `${animName} ${speed}s linear infinite`,
              width: "max-content",
            }}
          >
            {displayList.map((item, idx) => {
              const originalIndex = idx % Math.max(images.length, 1);
              return (
                <div
                  key={`${item.id || item.src}-${idx}`}
                  className="relative group shrink-0 select-none cursor-pointer"
                  style={{
                    width: "clamp(260px, 34vh, 420px)",
                    aspectRatio: "1 / 1",
                    borderRadius: "20px",
                  }}
                  onClick={() => onImageClick?.(item, originalIndex)}
                >
                  {/* Square Card Container */}
                  <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/14 bg-neutral-900/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:scale-[1.04] group-hover:border-white/40 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
                    
                    {/* 1:1 Square Image */}
                    <img
                      src={item.src}
                      alt={item.title || item.alt || "Project visual"}
                      draggable={false}
                      className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* Subtle Gradient Framing */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none" />

                    {/* Hover Caption Overlay */}
                    <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <span className="text-[10px] font-semibold tracking-widest text-[#ff3355] uppercase">
                        {item.category || "PROJECT"}
                      </span>
                      <h4 className="text-sm font-semibold text-white tracking-tight font-['Archivo'] truncate">
                        {item.title || "Selected Work"}
                      </h4>
                    </div>

                    {/* Subtle Click Hint Pill */}
                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-[9px] font-semibold tracking-wider text-neutral-300 uppercase backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      INSPECT ↗
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Foreground Children (Headline, Filters, Controls) with high z-index */}
      <div className="relative z-20 w-full h-full pointer-events-none">
        {children}
      </div>
    </div>
  );
}

export default TiltedGridHero;
