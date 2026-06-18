"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Animated radial gauge with gradient stroke that draws when scrolled into view. */
export function RadialGauge({
  value,
  size = 184,
  stroke = 14,
  label,
  suffix = "",
  className
}: {
  value: number;
  size?: number;
  stroke?: number;
  label?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const gid = React.useId();
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);
  const animate = reduce || inView;

  return (
    <div className={cn("relative inline-grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg ref={ref} width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--grad-1))" />
            <stop offset="60%" stopColor="hsl(var(--grad-2))" />
            <stop offset="100%" stopColor="hsl(var(--grad-3))" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
          opacity={0.5}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#${gid})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={animate ? { strokeDashoffset: offset } : { strokeDashoffset: c }}
          transition={{ duration: 1.6, ease: EASE }}
          style={{ filter: "drop-shadow(0 0 6px hsl(var(--glow) / 0.55))" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-display text-4xl font-semibold tabular-nums tracking-tight text-foreground">
          <AnimatedNumber value={value} suffix={suffix} />
        </span>
        {label ? (
          <span className="mt-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

/** Smooth area sparkline that draws its line and fades in its fill. */
export function AreaSpark({
  data,
  className,
  height = 84,
  width = 360
}: {
  data: number[];
  className?: string;
  height?: number;
  width?: number;
}) {
  const gid = React.useId();
  const max = Math.max(...data);
  const min = Math.min(...data);
  const span = max - min || 1;
  const pad = 6;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - pad - ((d - min) / span) * (height - pad * 2);
    return [x, y] as const;
  });
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L ${width} ${height} L 0 ${height} Z`;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-20 w-full overflow-visible", className)}
    >
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="hsl(var(--grad-1) / 0.35)" />
          <stop offset="100%" stopColor="hsl(var(--grad-1) / 0)" />
        </linearGradient>
      </defs>
      <motion.path
        d={area}
        fill={`url(#${gid})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      />
      <motion.path
        d={line}
        fill="none"
        stroke="hsl(var(--grad-1))"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: EASE }}
      />
    </svg>
  );
}

/** Animated mini bar chart (grows from the baseline). */
export function BarsMini({ data, className }: { data: number[]; className?: string }) {
  const max = Math.max(...data) || 1;
  return (
    <div className={cn("flex h-16 items-end gap-1.5", className)}>
      {data.map((d, i) => (
        <motion.div
          key={i}
          className="flex-1 rounded-t-sm bg-grad-brand"
          style={{ height: `${(d / max) * 100}%`, transformOrigin: "bottom" }}
          initial={{ scaleY: 0, opacity: 0.4 }}
          whileInView={{ scaleY: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: i * 0.05, ease: EASE }}
        />
      ))}
    </div>
  );
}

/** Labeled gradient meter with width draw-in. */
export function Meter({
  value,
  label,
  valueLabel,
  className,
  tone = "brand"
}: {
  value: number;
  label?: React.ReactNode;
  valueLabel?: string;
  className?: string;
  tone?: "brand" | "primary" | "amber";
}) {
  const fill =
    tone === "brand"
      ? "bg-grad-brand"
      : tone === "amber"
        ? "bg-gradient-to-r from-amber-500 to-amber-300"
        : "bg-primary";
  return (
    <div className={cn("space-y-1.5", className)}>
      {label || valueLabel ? (
        <div className="flex items-center justify-between gap-2 text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="shrink-0 font-medium tabular-nums text-foreground">
            {valueLabel ?? `${value}%`}
          </span>
        </div>
      ) : null}
      <div className="h-2 overflow-hidden rounded-full bg-muted/60">
        <motion.div
          className={cn("h-full rounded-full", fill)}
          initial={{ width: 0 }}
          whileInView={{ width: `${Math.min(100, Math.max(0, value))}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: EASE }}
        />
      </div>
    </div>
  );
}
