"use client";

import Link from "next/link";
import { memo } from "react";
import { ArrowRight, ArrowUpRight, BarChart2, Check, FileText, Sparkles, Users } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Tilt, Spotlight } from "@/components/motion/interactive";
import { PageHeading } from "@/components/dashboard/page-heading";
import { AreaSpark, BarsMini, Meter, RadialGauge } from "@/components/ui/charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { appNav } from "@/data/nav";
import { cn } from "@/lib/utils";
import type { OverviewDashboardSnapshot, OverviewSkillGap } from "@/types/overview";

const SCORE_HISTORY = [74, 78, 76, 81, 83, 86, 88];
const ATS_BARS = [62, 70, 66, 78, 84, 88, 91];

function GapIcon({ kind }: { kind: OverviewSkillGap["icon"] }) {
  const Icon = kind === "document" ? FileText : kind === "chart" ? BarChart2 : Users;
  return (
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border/60 bg-background/40 transition-colors duration-200 group-hover:border-primary/30 group-hover:bg-primary/10">
      <Icon className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-primary" />
    </div>
  );
}

function OverviewDashboardImpl({ data }: { data: OverviewDashboardSnapshot }) {
  const shortcuts = appNav.filter((i) => i.href !== "/app/overview").slice(0, 6);

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Live demo workspace"
        title={data.headline}
        description={data.subline}
        action={
          <div className="flex flex-wrap gap-2">
            <Badge variant="soft">{data.analysisMeta.postingRef}</Badge>
            <Badge variant="outline" className="text-muted-foreground">
              Top 12%
            </Badge>
          </div>
        }
      />

      {/* HERO — copy + 3D score showcase */}
      <Reveal>
        <Card variant="glass" className="overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[1.25fr_1fr]">
            <div className="space-y-6 p-7 md:p-9">
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                What HiredLens is
              </p>
              <p className="max-w-xl text-[15px] leading-7 text-muted-foreground md:text-base">
                {data.productPitch}
              </p>
              <Stagger className="grid gap-3 sm:grid-cols-1" gap={0.1}>
                {data.valueProps.map((line, i) => (
                  <StaggerItem key={i}>
                    <div className="flex gap-3 rounded-[calc(var(--radius)-4px)] border border-border/50 bg-background/30 px-3.5 py-3 text-sm leading-snug text-foreground/95">
                      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-primary">
                        <Check className="h-3 w-3" strokeWidth={3} />
                      </span>
                      <span>{line}</span>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
              <div className="flex flex-wrap gap-3 pt-1">
                <Button asChild variant="gradient" className="shine">
                  <Link href="/app/keywords">
                    Open keyword analysis
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/app/rewrites">Run an AI rewrite</Link>
                </Button>
              </div>
            </div>

            <div className="relative border-t border-border/50 bg-[hsl(var(--surface)/0.4)] p-7 md:p-9 lg:border-l lg:border-t-0">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,hsl(var(--primary)/0.14),transparent_60%)]"
              />
              <Tilt className="relative" max={8}>
                <Spotlight className="flex flex-col items-center gap-5 rounded-[var(--radius)] p-2 text-center">
                  <RadialGauge value={data.overallScorePercent} label="Overall match" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">{data.percentileLabel}</p>
                    <p className="text-xs leading-relaxed text-primary/90">{data.scoreCallout}</p>
                  </div>
                  <div className="w-full">
                    <AreaSpark data={SCORE_HISTORY} />
                    <p className="mt-1 text-[11px] uppercase tracking-wider text-muted-foreground">
                      Score trend · last 7 runs
                    </p>
                  </div>
                </Spotlight>
              </Tilt>
            </div>
          </div>
        </Card>
      </Reveal>

      {/* METRIC TILES */}
      <Stagger className="grid gap-4 md:grid-cols-3" gap={0.1}>
        <StaggerItem>
          <Tilt className="h-full" max={7}>
            <Card variant="glass" className="spotlight h-full p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Keyword match
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <span className="font-display text-4xl font-semibold tabular-nums text-foreground">
                  <AnimatedNumber value={data.matchedKeywordCount} />
                </span>
                <Badge variant="success">+6 this week</Badge>
              </div>
              <Meter
                className="mt-5"
                value={data.keywordAlignmentPercent}
                label="Weighted alignment"
              />
            </Card>
          </Tilt>
        </StaggerItem>

        <StaggerItem>
          <Tilt className="h-full" max={7}>
            <Card variant="glass" className="spotlight h-full p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                ATS compatibility
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <span className="font-display text-4xl font-semibold tabular-nums text-foreground">
                  <AnimatedNumber value={data.atsCompatibilityPercent} suffix="%" />
                </span>
                <Badge variant="soft">Parser-safe</Badge>
              </div>
              <BarsMini className="mt-5" data={ATS_BARS} />
            </Card>
          </Tilt>
        </StaggerItem>

        <StaggerItem>
          <Tilt className="h-full" max={7}>
            <Card variant="glass" className="spotlight h-full p-6">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Skill gaps
              </p>
              <div className="mt-2 flex items-end justify-between gap-3">
                <span className="font-display text-4xl font-semibold tabular-nums text-foreground">
                  <AnimatedNumber value={data.skillGaps.length} />
                </span>
                <Badge variant="warning">Action queue</Badge>
              </div>
              <p className="mt-5 text-sm leading-relaxed text-muted-foreground">
                Themes recruiters flag when bullets don&apos;t yet prove depth — each links to the
                roadmap.
              </p>
            </Card>
          </Tilt>
        </StaggerItem>
      </Stagger>

      {/* MISSING KEYWORDS + SKILL GAPS */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Reveal>
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  Top missing keywords
                </p>
                <p className="mt-1 text-sm text-muted-foreground">Highest-impact phrases to add next</p>
              </div>
              <Link
                href="/app/keywords"
                className="group inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
              >
                View all
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2.5">
                {data.missingKeywords.map((kw) => (
                  <li
                    key={kw.id}
                    className={cn(
                      "flex items-start gap-3 rounded-[calc(var(--radius)-4px)] border px-3.5 py-3 text-sm leading-snug transition-colors duration-200",
                      kw.emphasis
                        ? "border-primary/30 bg-primary/[0.08] text-foreground hover:border-primary/50"
                        : "border-border/60 bg-muted/20 text-muted-foreground hover:border-border"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                        kw.emphasis ? "bg-primary" : "bg-muted-foreground/50"
                      )}
                    />
                    {kw.label}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card className="h-full">
            <CardHeader>
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                Skill gaps to close
              </p>
              <p className="mt-1 text-sm text-muted-foreground">Sequenced against the panel rubric</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {data.skillGaps.map((gap) => (
                <div key={gap.id} className="group flex gap-3">
                  <GapIcon kind={gap.icon} />
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-sm font-medium leading-snug text-foreground">{gap.title}</p>
                    <p className="text-xs text-muted-foreground">{gap.subtitle}</p>
                  </div>
                </div>
              ))}
              <Button asChild variant="ghost" className="w-full justify-between">
                <Link href="/app/skill-roadmap">
                  View full roadmap
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>

      {/* NEXT BEST ACTION */}
      <Reveal>
        <Card variant="gradient" className="overflow-hidden">
          <div className="relative flex flex-col gap-5 p-7 md:flex-row md:items-center md:justify-between md:p-8">
            <div className="min-w-0 space-y-1.5">
              <p className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                <Sparkles className="h-3.5 w-3.5" />
                {data.nextBestAction.title}
              </p>
              <h3 className="font-display text-xl font-semibold tracking-tight text-foreground">
                Move the needle today
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                {data.nextBestAction.description}
              </p>
            </div>
            <Button asChild variant="gradient" size="lg" className="shrink-0 shine">
              <Link href={data.nextBestAction.href}>
                Open keyword analysis
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Card>
      </Reveal>

      {/* WORKFLOW SHORTCUTS */}
      <div className="space-y-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Continue your workflow
        </p>
        <Stagger className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
          {shortcuts.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.href}>
                <Tilt max={6}>
                  <Link
                    href={item.href}
                    className="group flex h-full items-start gap-3 rounded-[var(--radius)] border border-border/60 bg-card/60 p-4 transition-colors duration-200 hover:border-primary/30 hover:bg-card"
                  >
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/50 bg-background/50 text-muted-foreground transition-colors group-hover:border-primary/30 group-hover:text-primary">
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                        {item.title}
                        <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {item.description}
                      </span>
                    </span>
                  </Link>
                </Tilt>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </div>
  );
}

export const OverviewDashboard = memo(OverviewDashboardImpl);
