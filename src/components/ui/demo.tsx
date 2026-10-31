import React from "react";
import { TiltedGridHero } from "@/components/ui/tilted-grid-hero";
import { ArrowUpRight, Sparkles } from "lucide-react";

// Curated high-res Unsplash editorial imagery
const IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    alt: "Modern architectural spatial design with cantilevered concrete and glass",
  },
  {
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    alt: "Minimal monochromatic liquid topology and light refraction",
  },
  {
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
    alt: "High-contrast editorial studio portrait with dramatic chiaroscuro",
  },
  {
    src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    alt: "Brutalist sculptural interior with natural zenithal illumination",
  },
  {
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    alt: "Avant-garde editorial fashion silhouette in motion",
  },
  {
    src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    alt: "Minimalist corporate tower geometry reflecting morning light",
  },
  {
    src: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    alt: "Nordic interior architectural volume with oak and raw plaster",
  },
  {
    src: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80",
    alt: "Precision-tailored menswear editorial silhouette",
  },
  {
    src: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    alt: "Tactile editorial book binding and minimalist typography packaging",
  },
  {
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    alt: "Industrial design chronograph with matte monochrome finish",
  },
];

export default function TiltedGridHeroDemo() {
  return (
    <TiltedGridHero
      images={IMAGES}
      className="h-[560px] w-full rounded-2xl border border-white/10 bg-black/60 shadow-2xl backdrop-blur-md"
    >
      <div className="relative z-10 flex h-full flex-col items-center justify-between py-12 text-center">
        <div className="px-6 flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs font-medium tracking-widest text-neutral-300 uppercase backdrop-blur-md mb-4">
            <Sparkles className="size-3.5 text-neutral-200" />
            <span>Curated Cylindrical Reel</span>
          </div>
          <h1 className="text-balance text-4xl font-medium tracking-tight text-white sm:text-5xl font-['Archivo']">
            Every frame,
            <br />
            brought into focus.
          </h1>
        </div>
        <div className="flex flex-col items-center gap-3">
          <p className="max-w-md text-balance px-6 text-sm text-neutral-400">
            Images curve in from one edge, flatten out at the centre, then fade
            away round the other.
          </p>
          <a
            href="#works"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-white hover:text-neutral-300 transition-colors"
          >
            Explore Selected Archive <ArrowUpRight className="size-3.5" />
          </a>
        </div>
      </div>
    </TiltedGridHero>
  );
}

export { TiltedGridHeroDemo };
