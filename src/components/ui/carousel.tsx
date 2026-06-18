"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function Carousel({
  slides,
  className,
  slideClassName,
  autoplay = true,
  showArrows = true,
  showDots = true
}: {
  slides: React.ReactNode[];
  className?: string;
  slideClassName?: string;
  autoplay?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center", skipSnaps: false },
    autoplay ? [Autoplay({ delay: 4200, stopOnInteraction: false, stopOnMouseEnter: true })] : []
  );
  const [selected, setSelected] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (emblaApi) setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {slides.map((slide, i) => (
            <div key={i} className={cn("min-w-0 shrink-0 grow-0 basis-full px-2", slideClassName)}>
              {slide}
            </div>
          ))}
        </div>
      </div>

      {showArrows ? (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-1">
          <button
            aria-label="Previous"
            onClick={() => emblaApi?.scrollPrev()}
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full glass glass-edge text-foreground transition-transform hover:scale-105"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            aria-label="Next"
            onClick={() => emblaApi?.scrollNext()}
            className="pointer-events-auto grid h-10 w-10 place-items-center rounded-full glass glass-edge text-foreground transition-transform hover:scale-105"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      ) : null}

      {showDots ? (
        <div className="mt-5 flex items-center justify-center gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300",
                selected === i ? "w-6 bg-primary" : "w-2 bg-muted-foreground/40 hover:bg-muted-foreground/70"
              )}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
