"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { useThemeId } from "@/components/theme-provider";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

const DistortedOrbScene = dynamic(() => import("./distorted-orb"), {
  ssr: false,
  loading: () => null
});

function toCssHsl(channels: string) {
  const [h, s, l] = channels.split(" ");
  return `hsl(${h}, ${s}, ${l})`;
}

/** Theme-reactive WebGL orb. Falls back to a soft glow until mounted / on reduced-motion. */
export function HeroOrb({ className }: { className?: string }) {
  const { themeId, mounted } = useThemeId();
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const swatches = THEMES[themeId].swatches;
  const colorA = toCssHsl(swatches[0]);
  const colorB = toCssHsl(swatches[1]);

  return (
    <div className={cn("relative", className)}>
      {/* ambient halo always present */}
      <div
        className="pointer-events-none absolute inset-0 rounded-full opacity-70 blur-3xl"
        style={{
          background: `radial-gradient(circle at 50% 45%, hsl(${swatches[0]} / 0.5), transparent 65%)`
        }}
      />
      {mounted && !reduced ? (
        <DistortedOrbScene colorA={colorA} colorB={colorB} />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          <div
            className="h-2/3 w-2/3 animate-pulse-glow rounded-full"
            style={{
              background: `radial-gradient(circle at 40% 35%, ${colorB}, ${colorA} 70%)`
            }}
          />
        </div>
      )}
    </div>
  );
}
