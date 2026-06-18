import { Aperture } from "lucide-react";

import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-[0.7em] bg-grad-brand text-white shadow-glow",
        className
      )}
    >
      <span className="absolute inset-0 opacity-40 mix-blend-overlay grain" aria-hidden />
      <Aperture className="relative h-[58%] w-[58%]" strokeWidth={2.2} />
    </span>
  );
}

export function Logo({
  className,
  showWordmark = true,
  subtitle = "AI career intelligence"
}: {
  className?: string;
  showWordmark?: boolean;
  subtitle?: string;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9 text-base" />
      {showWordmark ? (
        <span className="min-w-0 leading-tight">
          <span className="block truncate font-display text-[15px] font-semibold tracking-tight text-foreground">
            HiredLens
          </span>
          {subtitle ? (
            <span className="block truncate text-[11px] text-muted-foreground">{subtitle}</span>
          ) : null}
        </span>
      ) : null}
    </span>
  );
}
