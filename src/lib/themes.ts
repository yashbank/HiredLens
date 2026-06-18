/**
 * Tri-theme registry. Each entry is a complete, unidentical design language.
 * The id maps 1:1 to the class applied on <html> and the token block in globals.css.
 */
export type ThemeId = "aurora" | "porcelain" | "pulse";

export type ThemeMeta = {
  id: ThemeId;
  name: string;
  tagline: string;
  description: string;
  mode: "dark" | "light";
  /** Preview swatches (raw HSL channels) for the switcher pills. */
  swatches: [string, string, string];
  /** Headline accent used in marketing copy. */
  accent: string;
  /** Framer spring personality per theme. */
  spring: { stiffness: number; damping: number; mass: number };
};

export const THEME_IDS: ThemeId[] = ["aurora", "porcelain", "pulse"];
export const DEFAULT_THEME: ThemeId = "aurora";

export const THEMES: Record<ThemeId, ThemeMeta> = {
  aurora: {
    id: "aurora",
    name: "Aurora",
    tagline: "Spatial glass",
    description: "Dark glassmorphism with depth, blur, and neon aurora light.",
    mode: "dark",
    swatches: ["264 90% 66%", "190 95% 55%", "320 90% 66%"],
    accent: "violet / cyan",
    spring: { stiffness: 220, damping: 26, mass: 0.9 }
  },
  porcelain: {
    id: "porcelain",
    name: "Porcelain",
    tagline: "Airy minimal",
    description: "Light, calm, Apple-grade restraint with soft shadow and whitespace.",
    mode: "light",
    swatches: ["222 83% 53%", "270 70% 60%", "200 90% 52%"],
    accent: "cobalt",
    spring: { stiffness: 260, damping: 30, mass: 0.8 }
  },
  pulse: {
    id: "pulse",
    name: "Pulse",
    tagline: "Vivid energy",
    description: "Bold gradient mesh, grain, and expressive type with springy motion.",
    mode: "dark",
    swatches: ["22 100% 58%", "330 95% 60%", "265 95% 66%"],
    accent: "sunset",
    spring: { stiffness: 300, damping: 18, mass: 0.7 }
  }
};

export function isThemeId(value: string | undefined): value is ThemeId {
  return value === "aurora" || value === "porcelain" || value === "pulse";
}
