"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, LayoutGrid, Sparkles, Target, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { DEMO_WELCOME_DISMISSED_KEY } from "@/lib/demo-storage";
import { OVERLINE_ACCENT } from "@/lib/ui";
import { cn } from "@/lib/utils";

const steps = [
  { href: "/app/overview", label: "Overview", icon: LayoutGrid, hint: "Story + scores" },
  { href: "/app/keywords", label: "Keywords", icon: Target, hint: "JD vs resume" },
  { href: "/app/rewrites?sample=1", label: "Sample rewrite", icon: Sparkles, hint: "Instant result" }
] as const;

const valueLines = [
  { n: "1", text: "Scores your resume against one real job post." },
  { n: "2", text: "Surfaces missing phrases and AI rewrite suggestions." },
  { n: "3", text: "Prepares you to explain tradeoffs in mock interviews." }
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

  if (!visible) return null;

  return (
    <div
      className={cn(
        "mb-8 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/[0.12] via-card to-muted/30 p-4 shadow-depth md:p-5",
        "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-500"
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0 space-y-3">
          <p className={OVERLINE_ACCENT}>Start here · under 30 seconds</p>
          <h2 className="text-lg font-semibold tracking-tight text-foreground md:text-xl">
            HiredLens is an AI career workspace: score → fix language → practice out loud.
          </h2>
          <ol className="grid gap-2 sm:grid-cols-3 sm:gap-3">
            {valueLines.map(({ n, text }) => (
              <li
                key={n}
                className="flex gap-2 rounded-lg border border-border/50 bg-background/50 px-3 py-2 text-xs leading-snug text-muted-foreground md:text-[13px] md:leading-relaxed"
              >
                <span className="font-semibold tabular-nums text-primary">{n}.</span>
                <span>{text}</span>
              </li>
            ))}
          </ol>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Below: realistic demo data for <span className="font-medium text-foreground/90">Meridian Payments</span>{" "}
            · Staff Backend (REQ-4481). Hover <span className="font-medium text-foreground/90">?</span> on Overview
            metrics for definitions.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="shrink-0 self-start text-muted-foreground hover:text-foreground"
          aria-label="Dismiss welcome banner"
          onClick={dismiss}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-border/40 pt-4">
        {steps.map(({ href, label, icon: Icon, hint }) => (
          <Button
            key={href}
            asChild
            variant="secondary"
            size="sm"
            className="h-auto gap-2 rounded-lg border border-border/50 bg-background/60 py-2 pl-3 pr-3 shadow-sm backdrop-blur-sm transition-[transform,box-shadow] duration-200 motion-safe:hover:-translate-y-px motion-safe:hover:shadow-md"
          >
            <Link href={href} className="inline-flex items-center gap-2">
              <Icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="flex flex-col items-start gap-0.5 text-left">
                <span className="text-xs font-semibold text-foreground">{label}</span>
                <span className="text-[11px] font-normal text-muted-foreground">{hint}</span>
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 opacity-60" />
            </Link>
          </Button>
        ))}
        <Button
          asChild
          variant="outline"
          size="sm"
          className="h-auto rounded-lg border-dashed py-2"
        >
          <Link href="/app/mock-interview">Mock interview</Link>
        </Button>
      </div>
    </div>
  );
}
