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

export type TiltedGridHeroHandle = {
  scrollPrev: (distance?: number) => void;
  scrollNext: (distance?: number) => void;
  scrollBy: (delta: number) => void;
  pause: () => void;
  resume: () => void;
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

export const TiltedGridHero = React.forwardRef<TiltedGridHeroHandle, React.ComponentProps<"div"> & TiltedGridHeroProps>(
  function TiltedGridHero(
    {
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
    },
    ref
  ) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);

    // Responsive mobile state
    const [isMobile, setIsMobile] = React.useState(false);

    // Physics & Interaction references
    const offsetRef = React.useRef(0);
    const velocityRef = React.useRef(0);
    const isDraggingRef = React.useRef(false);
    const isHoveredRef = React.useRef(false);
    const dragStartPos = React.useRef({ x: 0, y: 0, time: 0 });
    const lastPointerPos = React.useRef({ x: 0, time: 0 });
    const hasDraggedSignificantly = React.useRef(false);
    const singleSetWidthRef = React.useRef(0);

    // Duplicate items 3 times for a seamless, infinite loop
    const displayList = React.useMemo(() => {
      if (!images || images.length === 0) return [];
      return [...images, ...images, ...images];
    }, [images]);

    // Check mobile screen
    React.useEffect(() => {
      const checkMobile = () => {
        setIsMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize", checkMobile, { passive: true });
      return () => window.removeEventListener("resize", checkMobile);
    }, []);

    // Preload all unique images
    React.useEffect(() => {
      images.forEach(({ src }) => {
        if (src) new Image().src = src;
      });
    }, [images]);

    // Compute cycle width whenever displayList or gap changes
    const measureCycleWidth = React.useCallback(() => {
      if (!trackRef.current) return;
      const totalWidth = trackRef.current.scrollWidth;
      if (totalWidth > 0) {
        singleSetWidthRef.current = totalWidth / 3;
      }
    }, []);

    React.useEffect(() => {
      const timer = setTimeout(measureCycleWidth, 100);
      window.addEventListener("resize", measureCycleWidth, { passive: true });
      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", measureCycleWidth);
      };
    }, [measureCycleWidth, displayList]);

    // Auto-drift & momentum animation loop
    React.useEffect(() => {
      let animId: number;
      // Drift rate in pixels per 60fps frame
      const driftRate = direction === 'back-to-front' ? 0.65 : -0.65;

      const loop = () => {
        const singleWidth = singleSetWidthRef.current;

        if (!isDraggingRef.current) {
          // Momentum decay
          if (Math.abs(velocityRef.current) > 0.08) {
            offsetRef.current += velocityRef.current;
            velocityRef.current *= 0.94; // friction
          } else {
            velocityRef.current = 0;
            // Gentle auto-drift when not hovered or active
            if (!isHoveredRef.current) {
              offsetRef.current -= driftRate;
            }
          }
        }

        // Seamless wrap modulo
        if (singleWidth > 0) {
          while (offsetRef.current <= -singleWidth) {
            offsetRef.current += singleWidth;
          }
          while (offsetRef.current > 0) {
            offsetRef.current -= singleWidth;
          }
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }

        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animId);
    }, [direction]);

    // Handle Wheel / Trackpad Scroll
    React.useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e: WheelEvent) => {
        // Trackpad horizontal scroll or shift-wheel or vertical wheel
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.7 ? e.deltaX : e.deltaY;
        if (Math.abs(delta) > 0) {
          // Scrub smoothly
          offsetRef.current -= delta * 0.95;
          velocityRef.current = -delta * 0.22;
        }
      };

      container.addEventListener("wheel", handleWheel, { passive: true });
      return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    // Pointer Drag / Touch Gestures
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      // Allow dragging on both desktop and mobile
      isDraggingRef.current = true;
      hasDraggedSignificantly.current = false;
      dragStartPos.current = { x: e.clientX, y: e.clientY, time: performance.now() };
      lastPointerPos.current = { x: e.clientX, time: performance.now() };
      velocityRef.current = 0;

      const el = e.currentTarget;
      if (el && typeof el.setPointerCapture === "function") {
        try {
          el.setPointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }
    };

    const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;

      const dx = e.clientX - lastPointerPos.current.x;
      const totalDx = Math.abs(e.clientX - dragStartPos.current.x);
      const totalDy = Math.abs(e.clientY - dragStartPos.current.y);

      if (totalDx > 6 || totalDy > 6) {
        hasDraggedSignificantly.current = true;
      }

      offsetRef.current += dx * 1.25;

      const now = performance.now();
      const dt = now - lastPointerPos.current.time;
      if (dt > 4) {
        velocityRef.current = (dx / dt) * 14;
      }

      lastPointerPos.current = { x: e.clientX, time: now };
    };

    const handlePointerUpOrCancel = (e: React.PointerEvent<HTMLDivElement>) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;

      const el = e.currentTarget;
      if (el && typeof el.releasePointerCapture === "function") {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }

      // Add gentle flick momentum clamp
      velocityRef.current = Math.max(-28, Math.min(28, velocityRef.current));
    };

    // Expose programmatic controls via Ref
    React.useImperativeHandle(
      ref,
      () => ({
        scrollPrev: (dist = 360) => {
          velocityRef.current = Math.abs(dist) * 0.08;
          offsetRef.current += dist;
        },
        scrollNext: (dist = 360) => {
          velocityRef.current = -Math.abs(dist) * 0.08;
          offsetRef.current -= dist;
        },
        scrollBy: (delta: number) => {
          offsetRef.current += delta;
        },
        pause: () => {
          isHoveredRef.current = true;
        },
        resume: () => {
          isHoveredRef.current = false;
        },
      }),
      []
    );

    // Responsive 3D Geometry
    const activeAngleY = isMobile ? 0 : angleY;
    const activePushBack = isMobile ? -20 : pushBack;
    const activeAngleX = isMobile ? 0 : angleX;

    const maskStyle = `linear-gradient(90deg, transparent 0%, #000 ${fade}%, #000 ${100 - fade}%, transparent 100%)`;

    return (
      <div
        ref={containerRef}
        className={cn("relative overflow-hidden w-full h-full select-none", className)}
        style={{
          width: "100%",
          height: "100%",
          touchAction: "pan-y",
          ...style,
        }}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        {...props}
      >
        {/* 3D Perspective Stage */}
        <div
          className="absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{
            perspective: isMobile ? "900px" : "1300px",
            perspectiveOrigin: "50% 50%",
            maskImage: maskStyle,
            WebkitMaskImage: maskStyle,
            zIndex: 1,
            pointerEvents: "auto",
          }}
        >
          {/* Angled 3D Runway Plane */}
          <div
            className="relative flex items-center justify-start pointer-events-auto"
            style={{
              transformStyle: "preserve-3d",
              transform: `translate3d(0, 0, ${activePushBack}px) rotateY(${activeAngleY}deg) rotateX(${activeAngleX}deg)`,
              width: "100%",
              willChange: "transform",
            }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUpOrCancel}
            onPointerCancel={handlePointerUpOrCancel}
          >
            {/* Interactive Looping Track moving with drag/wheel/auto-drift */}
            <div
              ref={trackRef}
              className="angled-stream-track flex items-center will-change-transform"
              style={{
                gap: `${gap}px`,
                width: "max-content",
                cursor: "grab",
                paddingLeft: isMobile ? "24px" : "0",
              }}
            >
              {displayList.map((item, idx) => {
                const originalIndex = idx % Math.max(images.length, 1);
                return (
                  <div
                    key={`${item.id || item.src}-${idx}`}
                    className="relative group shrink-0 select-none cursor-pointer"
                    style={{
                      width: isMobile ? "clamp(230px, 72vw, 320px)" : "clamp(260px, 34vh, 420px)",
                      aspectRatio: "1 / 1",
                      borderRadius: "20px",
                    }}
                    onClick={(e) => {
                      // Only trigger click if user wasn't dragging
                      if (!hasDraggedSignificantly.current) {
                        onImageClick?.(item, originalIndex);
                      }
                    }}
                  >
                    {/* Square Card Container */}
                    <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/14 bg-neutral-900/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:scale-[1.04] group-hover:border-white/40 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
                      {/* 1:1 Square Image */}
                      <img
                        src={item.src}
                        alt={item.title || item.alt || "Project visual"}
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                        loading="lazy"
                      />

                      {/* Subtle Gradient Framing */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none" />

                      {/* Hover / Touch Caption Overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1 transform translate-y-2 opacity-90 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                        <span className="text-[10px] font-semibold tracking-widest text-[#ff3355] uppercase">
                          {item.category || "PROJECT"}
                        </span>
                        <h4 className="text-sm font-semibold text-white tracking-tight font-['Archivo'] truncate">
                          {item.title || "Selected Work"}
                        </h4>
                      </div>

                      {/* Inspect Tag */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-[9px] font-semibold tracking-wider text-neutral-300 uppercase backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        INSPECT ↗
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Foreground Children (Headline, Filters, Bottom Controls) with high z-index */}
        <div className="relative z-20 w-full h-full pointer-events-none">
          {children}
        </div>
      </div>
    );
  }
);

export default TiltedGridHero;
