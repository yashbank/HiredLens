"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

type Props = {
  value: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
};

/** Counts up from 0 → value the first time it scrolls into view. */
export function AnimatedNumber({
  value,
  duration = 1.5,
  decimals = 0,
  prefix = "",
  suffix = "",
  className
}: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const format = React.useCallback(
    (v: number) => `${prefix}${v.toFixed(decimals)}${suffix}`,
    [prefix, suffix, decimals]
  );

  React.useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (reduce) {
      node.textContent = format(value);
      return;
    }
    if (!inView) return;
    node.textContent = format(0);
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = format(v);
      }
    });
    return () => controls.stop();
  }, [inView, value, duration, reduce, format]);

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  );
}
