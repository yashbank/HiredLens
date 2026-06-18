import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        className={cn(
          "flex h-11 w-full rounded-[calc(var(--radius)-4px)] border border-input bg-background/50 px-3.5 py-2 text-sm shadow-sm backdrop-blur-sm transition-all duration-200",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground/70",
          "focus-visible:border-primary/50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
