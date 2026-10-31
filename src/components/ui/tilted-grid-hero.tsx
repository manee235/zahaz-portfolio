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
  glowColor?: string;
  glowSecondary?: string;
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
  /** Callback fired when the active/focused foreground image changes */
  onActiveImageChange?: (image: TiltedGridImage, index: number) => void;
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
      onActiveImageChange,
      children,
      className,
      style,
      ...props
    },
    ref
  ) {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const runwayRef = React.useRef<HTMLDivElement>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);
    const dofLayersRef = React.useRef<(HTMLDivElement | null)[]>([]);

    // Responsive mobile state
    const [isMobile, setIsMobile] = React.useState(false);

    // Physics & Interaction references
    const offsetRef = React.useRef(0);
    const velocityRef = React.useRef(0);
    const isDraggingRef = React.useRef(false);
    const isHoveringCardRef = React.useRef(false);
    const activeIdleSpeedRef = React.useRef(0);
    const lastInteractionTimeRef = React.useRef(performance.now());
    const lastReportedIdxRef = React.useRef<number>(-1);
    const isPausedRef = React.useRef(false);

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

    // Responsive 3D Geometry
    const activeAngleY = isMobile ? 0 : angleY;
    const activePushBack = isMobile ? -20 : pushBack;
    const activeAngleX = isMobile ? 0 : angleX;

    // Continuous Idle Animation, Momentum Physics, Ambient Glow Tracking & Optical DoF Focus
    React.useEffect(() => {
      let animId: number;
      // Base continuous drift rate (pixels per frame at 60fps)
      const baseDriftRate = direction === 'back-to-front' ? 1.05 : -1.05;

      const loop = () => {
        const now = performance.now();
        const singleWidth = singleSetWidthRef.current;
        const totalItems = displayList.length;

        // 1. Physics: Dragging vs Momentum vs Idle Glide
        if (isDraggingRef.current) {
          lastInteractionTimeRef.current = now;
          activeIdleSpeedRef.current = 0;
        } else if (Math.abs(velocityRef.current) > 0.08) {
          // Momentum decay following drag or scroll release
          offsetRef.current += velocityRef.current;
          velocityRef.current *= 0.94; // smooth friction
          lastInteractionTimeRef.current = now;
          activeIdleSpeedRef.current = 0;
        } else {
          velocityRef.current = 0;

          // Continuous Idle Animation:
          // Active when not dragging or paused.
          // If hovering over a specific card to inspect, glide at 25% speed (slow-mo inspection)
          if (!isPausedRef.current) {
            const targetSpeed = isHoveringCardRef.current ? baseDriftRate * 0.22 : baseDriftRate;
            // Smooth acceleration ramp for silky-smooth motion
            activeIdleSpeedRef.current += (targetSpeed - activeIdleSpeedRef.current) * 0.055;
            offsetRef.current -= activeIdleSpeedRef.current;
          }
        }

        // 2. Seamless wrap modulo
        if (singleWidth > 0) {
          while (offsetRef.current <= -singleWidth) {
            offsetRef.current += singleWidth;
          }
          while (offsetRef.current > 0) {
            offsetRef.current -= singleWidth;
          }
        }

        // 3. Apply position to track
        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${offsetRef.current}px, 0, 0)`;
        }

        // 4. Subtle Weightless Zero-Gravity Floating Breathing when idle
        if (runwayRef.current && !isMobile) {
          const breathY = Math.sin(now * 0.0015) * 5;
          const breathRotX = Math.cos(now * 0.0012) * 0.55;
          runwayRef.current.style.transform = `translate3d(0, ${breathY.toFixed(2)}px, ${activePushBack}px) rotateY(${activeAngleY}deg) rotateX(${(activeAngleX + breathRotX).toFixed(2)}deg)`;
        }

        // 5. Active Foreground Image Detection & Optical Depth of Field (DoF) Focus
        if (singleWidth > 0 && totalItems > 0 && images.length > 0) {
          const itemStep = singleWidth / images.length;
          const containerW = window.innerWidth;
          const isMob = containerW < 768;

          // Focal zone configuration:
          // Foreground card area (sharp focus): around 35% to 45% screen width
          const focalCenter = isMob ? containerW * 0.48 : containerW * 0.38;
          const focalStart = isMob ? containerW * 0.16 : containerW * 0.28;
          const focalEnd = isMob ? containerW * 0.72 : containerW * 0.82;
          const falloff = Math.max(1, focalEnd - focalStart);

          let closestDist = Infinity;
          let closestOriginalIdx = 0;

          for (let i = 0; i < totalItems; i++) {
            // Calculate card's screen X position
            let cardScreenX = offsetRef.current + i * itemStep;
            while (cardScreenX < -itemStep * 1.5) cardScreenX += singleWidth;
            while (cardScreenX > containerW + itemStep * 1.5) cardScreenX -= singleWidth;

            // Track active card closest to foreground focal point
            const distToFocal = Math.abs(cardScreenX - focalCenter);
            if (distToFocal < closestDist) {
              closestDist = distToFocal;
              closestOriginalIdx = i % images.length;
            }

            // Optical Depth of Field: Far cards in distance (right side) blur with cinematic bokeh
            const dofEl = dofLayersRef.current[i];
            if (dofEl) {
              let blurRatio = (cardScreenX - focalStart) / falloff;
              blurRatio = Math.max(0, Math.min(1, blurRatio));
              dofEl.style.opacity = blurRatio.toFixed(3);
            }
          }

          // Emit active image change for dynamic backblur ambient glow
          if (closestOriginalIdx !== lastReportedIdxRef.current && images[closestOriginalIdx]) {
            lastReportedIdxRef.current = closestOriginalIdx;
            onActiveImageChange?.(images[closestOriginalIdx], closestOriginalIdx);
          }
        }

        animId = requestAnimationFrame(loop);
      };

      animId = requestAnimationFrame(loop);
      return () => cancelAnimationFrame(animId);
    }, [
      direction,
      displayList.length,
      images,
      activeAngleX,
      activeAngleY,
      activePushBack,
      isMobile,
      onActiveImageChange,
    ]);

    // Handle Wheel / Trackpad Scroll Scrubbing
    React.useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const handleWheel = (e: WheelEvent) => {
        lastInteractionTimeRef.current = performance.now();
        const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) * 0.7 ? e.deltaX : e.deltaY;
        if (Math.abs(delta) > 0) {
          offsetRef.current -= delta * 0.95;
          velocityRef.current = -delta * 0.22;
        }
      };

      container.addEventListener("wheel", handleWheel, { passive: true });
      return () => container.removeEventListener("wheel", handleWheel);
    }, []);

    // Pointer Drag / Touch Gestures
    const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      isDraggingRef.current = true;
      hasDraggedSignificantly.current = false;
      lastInteractionTimeRef.current = performance.now();
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
      lastInteractionTimeRef.current = performance.now();

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
      lastInteractionTimeRef.current = performance.now();

      const el = e.currentTarget;
      if (el && typeof el.releasePointerCapture === "function") {
        try {
          el.releasePointerCapture(e.pointerId);
        } catch {
          // ignore
        }
      }

      velocityRef.current = Math.max(-28, Math.min(28, velocityRef.current));
    };

    // Expose programmatic controls via Ref
    React.useImperativeHandle(
      ref,
      () => ({
        scrollPrev: (dist = 360) => {
          lastInteractionTimeRef.current = performance.now();
          velocityRef.current = Math.abs(dist) * 0.08;
          offsetRef.current += dist;
        },
        scrollNext: (dist = 360) => {
          lastInteractionTimeRef.current = performance.now();
          velocityRef.current = -Math.abs(dist) * 0.08;
          offsetRef.current -= dist;
        },
        scrollBy: (delta: number) => {
          lastInteractionTimeRef.current = performance.now();
          offsetRef.current += delta;
        },
        pause: () => {
          isPausedRef.current = true;
        },
        resume: () => {
          isPausedRef.current = false;
        },
      }),
      []
    );

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
            ref={runwayRef}
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
            {/* Interactive Looping Track with idle drift, wheel & touch momentum */}
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
                    onMouseEnter={() => {
                      isHoveringCardRef.current = true;
                    }}
                    onMouseLeave={() => {
                      isHoveringCardRef.current = false;
                    }}
                    onClick={() => {
                      if (!hasDraggedSignificantly.current) {
                        onImageClick?.(item, originalIndex);
                      }
                    }}
                  >
                    {/* Square Card Container */}
                    <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/14 bg-neutral-900/90 shadow-[0_20px_50px_rgba(0,0,0,0.85)] transition-all duration-300 group-hover:scale-[1.04] group-hover:border-white/40 group-hover:shadow-[0_30px_70px_rgba(0,0,0,0.95)]">
                      {/* 1:1 Square Image - Sharp Base Layer */}
                      <img
                        src={item.src}
                        alt={item.title || item.alt || "Project visual"}
                        draggable={false}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 pointer-events-none"
                        loading="lazy"
                      />

                      {/* Depth of Field Camera Blur Layer (Activated for far cards in distance) */}
                      <div
                        ref={(el) => {
                          dofLayersRef.current[idx] = el;
                        }}
                        className="card-dof-overlay pointer-events-none"
                        aria-hidden="true"
                      >
                        <img
                          src={item.src}
                          alt=""
                          draggable={false}
                          className="card-dof-blurred-img"
                          loading="lazy"
                        />
                        <div className="card-dof-haze" />
                      </div>

                      {/* Subtle Gradient Framing */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 transition-opacity duration-300 group-hover:opacity-40 pointer-events-none" />

                      {/* Hover / Touch Caption Overlay */}
                      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col gap-1 transform translate-y-2 opacity-90 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-300 pointer-events-none z-10">
                        <span className="text-[10px] font-semibold tracking-widest text-[#ff3355] uppercase">
                          {item.category || "PROJECT"}
                        </span>
                        <h4 className="text-sm font-semibold text-white tracking-tight font-['Archivo'] truncate">
                          {item.title || "Selected Work"}
                        </h4>
                      </div>

                      {/* Inspect Tag */}
                      <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-black/60 border border-white/20 text-[9px] font-semibold tracking-wider text-neutral-300 uppercase backdrop-blur-md opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10">
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
