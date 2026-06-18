"use client";

import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function PageHeading({
  eyebrow,
  title,
  description,
  action,
  className
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <Reveal>
      <div
        className={cn(
          "flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:gap-6",
          className
        )}
      >
        <div className="min-w-0 space-y-2.5">
          {eyebrow ? (
            <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-primary">
              <span className="h-1 w-6 rounded-full bg-grad-brand" />
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-balance font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-pretty text-[15px] leading-relaxed text-muted-foreground md:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </Reveal>
  );
}
