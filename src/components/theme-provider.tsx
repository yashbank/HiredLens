"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

import { DEFAULT_THEME, isThemeId, THEME_IDS, type ThemeId } from "@/lib/themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      themes={THEME_IDS}
      defaultTheme={DEFAULT_THEME}
      enableSystem={false}
      storageKey="hiredlens-theme"
    >
      {children}
    </NextThemesProvider>
  );
}

/** Strongly-typed theme accessor with a mounted flag to avoid hydration mismatch. */
export function useThemeId() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  const themeId: ThemeId = isThemeId(theme) ? theme : DEFAULT_THEME;

  const setThemeId = React.useCallback(
    (next: ThemeId, event?: { clientX: number; clientY: number }) => {
      // Premium circular reveal via the View Transitions API where supported.
      const root = document.documentElement;
      const enableMorph = () => {
        root.classList.add("theme-anim");
        window.setTimeout(() => root.classList.remove("theme-anim"), 650);
      };

      const doc = document as Document & {
        startViewTransition?: (cb: () => void) => { ready: Promise<void> };
      };

      if (
        !event ||
        !doc.startViewTransition ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        enableMorph();
        setTheme(next);
        return;
      }

      const transition = doc.startViewTransition(() => {
        setTheme(next);
      });

      transition.ready.then(() => {
        const x = event.clientX;
        const y = event.clientY;
        const endRadius = Math.hypot(
          Math.max(x, window.innerWidth - x),
          Math.max(y, window.innerHeight - y)
        );
        root.animate(
          {
            clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`]
          },
          {
            duration: 620,
            easing: "cubic-bezier(0.16, 1, 0.3, 1)",
            pseudoElement: "::view-transition-new(root)"
          }
        );
      });
    },
    [setTheme]
  );

  return { themeId, setThemeId, mounted };
}
