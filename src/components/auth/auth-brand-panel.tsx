"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  BarChart3,
  BrainCircuit,
  FileText,
  Mic,
  Sparkles,
  Target,
  TrendingUp
} from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { HeroOrb } from "@/components/three/hero-orb";
import { Marquee } from "@/components/ui/marquee";
import { useThemeId } from "@/components/theme-provider";
import { THEMES } from "@/lib/themes";

const CAPABILITIES = [
  { icon: Target, label: "Keyword match" },
  { icon: FileText, label: "ATS scoring" },
  { icon: Sparkles, label: "AI rewrites" },
  { icon: Mic, label: "Mock interviews" },
  { icon: BarChart3, label: "Skill roadmap" },
  { icon: BrainCircuit, label: "Q&A prep" }
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function AuthBrandPanel() {
  const { themeId, mounted } = useThemeId();
  const meta = THEMES[themeId];

  return (
    <div className="relative hidden overflow-hidden lg:flex lg:flex-col lg:justify-between">
      {/* glass plate over the global ambient backdrop */}
      <div className="absolute inset-0 -z-10 glass" />

      <div className="relative z-10 flex items-center justify-between p-10">
        <Logo subtitle="AI career intelligence" />
        <ThemeSwitcher />
      </div>

      <HeroOrb className="pointer-events-none absolute inset-0 z-0 mx-auto h-full w-full opacity-90" />

      <div className="relative z-10 space-y-7 p-10">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur-sm">
            <TrendingUp className="h-3.5 w-3.5 text-primary" />
            Tri-theme UI showcase ·{" "}
            <span className="font-semibold text-foreground">
              {mounted ? meta.name : "Aurora"}
            </span>
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.06, ease: EASE }}
          className="max-w-md font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground xl:text-5xl"
        >
          Your AI lens for the{" "}
          <span className="text-gradient text-gradient-animate">future of work</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
          className="max-w-md text-pretty text-[15px] leading-relaxed text-muted-foreground"
        >
          Optimize your resume, close keyword gaps, and rehearse interviews with role-specific
          guidance. Switch themes any time — same product, three design languages.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Marquee className="max-w-md py-1">
            {CAPABILITIES.map((c) => (
              <span
                key={c.label}
                className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/40 px-3.5 py-1.5 text-sm text-foreground/90 backdrop-blur-sm"
              >
                <c.icon className="h-4 w-4 text-primary" />
                {c.label}
              </span>
            ))}
          </Marquee>
        </motion.div>
      </div>
    </div>
  );
}
