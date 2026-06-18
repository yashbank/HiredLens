import { cn } from "@/lib/utils";

export function Marquee({
  children,
  reverse = false,
  className,
  pauseOnHover = true
}: {
  children: React.ReactNode;
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}) {
  return (
    <div className={cn("group flex overflow-hidden mask-fade-x", className)}>
      <div
        className={cn(
          "flex w-max shrink-0 items-center gap-4 pr-4",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
      >
        {children}
        {children}
      </div>
    </div>
  );
}
