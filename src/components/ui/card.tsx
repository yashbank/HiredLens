import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "text-card-foreground transition-[box-shadow,transform,border-color] duration-300 ease-out",
  {
    variants: {
      variant: {
        default: "rounded-lg border border-border/60 bg-card shadow-depth",
        glass: "rounded-lg glass glass-edge shadow-depth",
        gradient:
          "rounded-lg gradient-border bg-card/80 shadow-depth backdrop-blur-md",
        plain: "rounded-lg border border-border/50 bg-card",
        ghost: "rounded-lg"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, ...props }: CardProps) {
  return (
    <div data-slot="card" className={cn(cardVariants({ variant }), className)} {...props} />
  );
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn("flex flex-col space-y-1.5 p-6 md:p-7", className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-[15px] leading-relaxed text-muted-foreground md:text-sm", className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="card-content" className={cn("p-6 pt-0 md:px-7 md:pb-7", className)} {...props} />
  );
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center p-6 pt-0 md:px-7 md:pb-7", className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent, cardVariants };
