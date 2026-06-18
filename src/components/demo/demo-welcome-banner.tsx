"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, LayoutGrid, Sparkles, Target, Wand2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DEMO_WELCOME_DISMISSED_KEY } from "@/lib/demo-storage";

const steps = [
  { href: "/app/overview", label: "Overview", icon: LayoutGrid },
  { href: "/app/keywords", label: "Keywords", icon: Target },
  { href: "/app/rewrites?sample=1", label: "Sample rewrite", icon: Wand2 }
] as const;

export function DemoWelcomeBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === "undefined") return;
      setVisible(window.localStorage.getItem(DEMO_WELCOME_DISMISSED_KEY) !== "1");
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(DEMO_WELCOME_DISMISSED_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  return (
    <AnimatePresence initial={false}>
      {visible ? (
        <motion.div
          initial={{ opacity: 0, y: -8, height: 0 }}
          animate={{ opacity: 1, y: 0, height: "auto" }}
          exit={{ opacity: 0, y: -8, height: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <div className="gradient-border relative flex flex-col gap-4 overflow-hidden rounded-[var(--radius)] bg-card/60 p-4 backdrop-blur-md md:flex-row md:items-center md:justify-between md:p-5">
            <div className="flex min-w-0 items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-grad-brand text-white shadow-glow">
                <Sparkles className="h-5 w-5" />
              </span>
              <div className="min-w-0 space-y-0.5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                  Welcome to the demo
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Realistic mock data for{" "}
                  <span className="font-medium text-foreground">Meridian Payments · Staff Backend</span>.
                  Try switching themes in the top bar — everything re-skins live.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div className="hidden flex-wrap gap-1.5 sm:flex">
                {steps.map(({ href, label, icon: Icon }) => (
                  <Button key={href} asChild variant="glass" size="sm">
                    <Link href={href}>
                      <Icon className="h-3.5 w-3.5 text-primary" />
                      <span className="hidden md:inline">{label}</span>
                      <ArrowRight className="h-3 w-3 opacity-60" />
                    </Link>
                  </Button>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                aria-label="Dismiss"
                onClick={dismiss}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
