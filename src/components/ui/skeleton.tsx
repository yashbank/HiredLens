import * as React from "react";

import { cn } from "@/lib/utils";

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-muted/35",
        "bg-gradient-to-r from-muted/60 via-muted-foreground/20 to-muted/60 bg-[length:200%_100%] motion-safe:animate-shimmer",
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
