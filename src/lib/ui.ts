/**
 * Shared layout / typography tokens for dashboard pages (single product surface).
 */
export const PAGE_STACK = "min-w-0 space-y-10 pb-14 md:space-y-12 md:pb-16";
export const PAGE_ENTER =
  "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:ease-out motion-safe:fill-mode-both";
export const OVERLINE =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground md:text-xs";
export const OVERLINE_ACCENT =
  "text-[11px] font-semibold uppercase tracking-[0.14em] text-primary md:text-xs";
export const PAGE_TITLE =
  "text-balance text-3xl font-semibold tracking-[-0.02em] text-foreground md:text-4xl lg:text-[2.375rem] lg:leading-[1.15]";
export const PAGE_DESCRIPTION =
  "max-w-2xl text-[15px] font-normal leading-7 text-muted-foreground md:text-base md:leading-8";
export const SECTION_GAP = "space-y-5 md:space-y-6";
export const GRID_GAP = "gap-4 md:gap-5";

/** Default surface for interactive dashboard cards (Card root already includes base surface). */
export const CARD_INTERACTIVE =
  "transition-all duration-300 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-depth-lg motion-safe:hover:ring-1 motion-safe:hover:ring-primary/15";
