import { Skeleton } from "@/components/ui/skeleton";
import { PAGE_STACK } from "@/lib/ui";
import { cn } from "@/lib/utils";

/** Lightweight shell while route-level feature chunks load (no client JS). */
export function PageFeatureFallback() {
  return (
    <div
      className={cn(PAGE_STACK, "min-h-[40vh]")}
      aria-busy="true"
      aria-label="Loading workspace"
    >
      <Skeleton className="h-36 w-full max-w-3xl rounded-xl" />
      <div className={cn("grid gap-4 md:grid-cols-3", "md:gap-5")}>
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
        <Skeleton className="h-48 rounded-xl" />
      </div>
      <Skeleton className="h-64 w-full rounded-xl" />
    </div>
  );
}
