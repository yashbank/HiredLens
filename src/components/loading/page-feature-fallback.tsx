import { cn } from "@/lib/utils";

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-[var(--radius)] border border-border/50 bg-card/50",
        className
      )}
    />
  );
}

/** Glass shimmer shell while route-level feature chunks load. */
export function PageFeatureFallback() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading workspace">
      <div className="space-y-3">
        <Shimmer className="h-4 w-32" />
        <Shimmer className="h-10 w-2/3 max-w-xl" />
        <Shimmer className="h-4 w-full max-w-2xl" />
      </div>
      <Shimmer className="h-56 w-full" />
      <div className="grid gap-4 md:grid-cols-3">
        <Shimmer className="h-40" />
        <Shimmer className="h-40" />
        <Shimmer className="h-40" />
      </div>
    </div>
  );
}
