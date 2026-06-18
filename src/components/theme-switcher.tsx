"use client";

import * as React from "react";
import { motion } from "framer-motion";

import { useThemeId } from "@/components/theme-provider";
import { THEME_IDS, THEMES, type ThemeId } from "@/lib/themes";
import { cn } from "@/lib/utils";

function Swatch({ id, className }: { id: ThemeId; className?: string }) {
  const [a, b, c] = THEMES[id].swatches;
  return (
    <span
      aria-hidden
      className={cn("h-4 w-4 rounded-full ring-1 ring-white/20", className)}
      style={{ backgroundImage: `linear-gradient(135deg, hsl(${a}), hsl(${b}) 55%, hsl(${c}))` }}
    />
  );
}

/** Segmented tri-theme switcher with animated pill + circular view-transition. */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { themeId, setThemeId, mounted } = useThemeId();

  return (
    <div
      role="radiogroup"
      aria-label="Color theme"
      className={cn(
        "glass glass-edge inline-flex items-center gap-1 rounded-full p-1",
        className
      )}
    >
      {THEME_IDS.map((id) => {
        const active = mounted && themeId === id;
        const meta = THEMES[id];
        return (
          <button
            key={id}
            role="radio"
            aria-checked={active}
            title={`${meta.name} — ${meta.tagline}`}
            onClick={(e) => setThemeId(id, { clientX: e.clientX, clientY: e.clientY })}
            className={cn(
              "relative inline-flex h-9 items-center gap-2 rounded-full px-2.5 text-[13px] font-medium transition-colors duration-200 sm:px-3.5",
              active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            )}
          >
            {active ? (
              <motion.span
                layoutId="theme-pill"
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
                className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30"
              />
            ) : null}
            <span className="relative z-10 flex items-center gap-2">
              <Swatch id={id} />
              <span className="hidden sm:inline">{meta.name}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Expanded card-style picker for marketing / auth screens. */
export function ThemeSwitcherCards({ className }: { className?: string }) {
  const { themeId, setThemeId, mounted } = useThemeId();

  return (
    <div className={cn("grid gap-2", className)}>
      {THEME_IDS.map((id) => {
        const active = mounted && themeId === id;
        const meta = THEMES[id];
        return (
          <button
            key={id}
            onClick={(e) => setThemeId(id, { clientX: e.clientX, clientY: e.clientY })}
            className={cn(
              "group relative flex items-center gap-3 overflow-hidden rounded-[var(--radius)] border p-3 text-left transition-all duration-300",
              active
                ? "border-primary/50 bg-primary/[0.07] shadow-glow"
                : "border-border/60 bg-card/40 hover:border-primary/30 hover:bg-card/70"
            )}
          >
            <Swatch id={id} className="h-8 w-8 shrink-0" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-semibold text-foreground">{meta.name}</span>
              <span className="block truncate text-xs text-muted-foreground">{meta.tagline}</span>
            </span>
            <span
              className={cn(
                "h-2.5 w-2.5 shrink-0 rounded-full transition-all duration-300",
                active ? "bg-primary shadow-[0_0_12px_hsl(var(--primary))]" : "bg-border"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}
