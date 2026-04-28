"use client";

import Link from "next/link";
import { ArrowRight, BarChart2, Check, FileText, Users } from "lucide-react";
import type { ReactNode } from "react";
import { memo } from "react";

import { FeatureTooltip } from "@/components/demo/feature-tooltip";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  CARD_INTERACTIVE,
  GRID_GAP,
  OVERLINE,
  OVERLINE_ACCENT,
  PAGE_DESCRIPTION,
  PAGE_ENTER,
  PAGE_STACK,
  PAGE_TITLE
} from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { OverviewDashboardSnapshot, OverviewSkillGap } from "@/types/overview";

const ScoreRing = memo(function ScoreRing({ value }: { value: number }) {
  const size = 168;
  const stroke = 12;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - value / 100);

  return (
    <div
      className={cn(
        "relative mx-auto inline-flex rounded-full p-2",
        "ring-2 ring-primary/25 ring-offset-2 ring-offset-background",
        "motion-safe:shadow-[0_0_40px_-12px_hsl(var(--primary)/0.45)]"
      )}
    >
      <div className="relative mx-auto" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90 text-muted-foreground/15" aria-hidden>
          <circle
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            r={r}
            cx={size / 2}
            cy={size / 2}
          />
          <circle
            className="text-emerald-400 transition-[stroke-dashoffset] duration-700 ease-out motion-safe:drop-shadow-[0_0_12px_rgba(52,211,153,0.35)]"
            stroke="currentColor"
            strokeWidth={stroke}
            fill="none"
            r={r}
            cx={size / 2}
            cy={size / 2}
            strokeDasharray={c}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-4xl font-semibold tabular-nums tracking-tight text-foreground transition-colors duration-300">
            {value}
          </span>
          <span className={cn(OVERLINE, "tracking-[0.2em]")}>Percent</span>
        </div>
      </div>
    </div>
  );
});

const GapIcon = memo(function GapIcon({ kind }: { kind: OverviewSkillGap["icon"] }) {
  const Icon = kind === "document" ? FileText : kind === "chart" ? BarChart2 : Users;
  return (
    <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-border/60 bg-background/50 transition-colors duration-200 motion-safe:group-hover:border-primary/25 motion-safe:group-hover:bg-primary/5">
      <Icon className="h-4 w-4 text-muted-foreground transition-colors duration-200 motion-safe:group-hover:text-primary" />
    </div>
  );
});

function MetricHeader({
  label,
  tooltip,
  badge
}: {
  label: string;
  tooltip: ReactNode;
  badge?: string;
}) {
  return (
    <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0 pb-2">
      <div className="flex min-w-0 items-center gap-1.5">
        <p className={OVERLINE}>{label}</p>
        <FeatureTooltip label={label}>{tooltip}</FeatureTooltip>
      </div>
      {badge ? (
        <Badge
          variant="outline"
          className="shrink-0 border-primary/25 bg-primary/10 text-[10px] font-semibold uppercase tracking-wide text-primary"
        >
          {badge}
        </Badge>
      ) : null}
    </CardHeader>
  );
}

function OverviewDashboardImpl({ data }: { data: OverviewDashboardSnapshot }) {
  return (
    <div className={cn(PAGE_STACK, PAGE_ENTER)}>
      <Card
        className={cn(
          "overflow-hidden border-border/40 bg-gradient-to-br from-card via-card to-primary/[0.06] shadow-depth-lg ring-1 ring-white/[0.04] transition-[box-shadow,transform] duration-500 ease-out motion-safe:hover:shadow-glow"
        )}
      >
        <CardHeader className="space-y-5 pb-4 pt-9">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary" className="border-border/60 text-[10px] font-semibold uppercase tracking-wide">
              Live demo workspace
            </Badge>
            <Badge variant="outline" className="text-[10px] font-medium text-muted-foreground">
              Meridian Payments · REQ-4481
            </Badge>
          </div>
          <div className="space-y-2">
            <p className={OVERLINE_ACCENT}>What HiredLens is</p>
            <p className="max-w-3xl text-[15px] leading-7 text-muted-foreground md:text-base md:leading-8">
              {data.productPitch}
            </p>
          </div>
          <h1 className={cn(PAGE_TITLE, "max-w-3xl")}>{data.headline}</h1>
          <p className={cn(PAGE_DESCRIPTION, "max-w-3xl")}>{data.subline}</p>
        </CardHeader>
        <CardContent className="space-y-6 border-t border-border/40 pb-8 pt-2">
          <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <span>{data.analysisMeta.lastSynced}</span>
            <span className="hidden text-border/80 sm:inline" aria-hidden>
              ·
            </span>
            <span>{data.analysisMeta.postingRef}</span>
            <span className="hidden text-border/80 sm:inline" aria-hidden>
              ·
            </span>
            <span>{data.analysisMeta.applicantPool}</span>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {data.valueProps.map((line, i) => (
              <div
                key={i}
                className="flex gap-3 rounded-lg border border-border/50 bg-muted/15 px-3 py-3 text-sm leading-snug text-foreground/95"
              >
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" strokeWidth={2.5} aria-hidden />
                <span>{line}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-primary/20 bg-gradient-to-r from-primary/[0.08] via-card to-muted/20 shadow-depth">
        <CardHeader className="space-y-2 pb-2 pt-6 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div className="min-w-0 space-y-1">
            <p className={OVERLINE_ACCENT}>{data.nextBestAction.title}</p>
            <p className="text-base font-semibold tracking-tight text-foreground">Move the needle today</p>
            <p className={cn(PAGE_DESCRIPTION, "max-w-2xl pt-1")}>{data.nextBestAction.description}</p>
          </div>
          <Button asChild className="mt-2 shrink-0 gap-2 md:mt-0">
            <Link href={data.nextBestAction.href}>
              Open keyword analysis
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </Button>
        </CardHeader>
      </Card>

      <div className={cn("grid lg:grid-cols-3", GRID_GAP)}>
        <Card
          className={cn(
            CARD_INTERACTIVE,
            "ring-2 ring-primary/20 shadow-depth-lg motion-safe:transition-[box-shadow,transform] motion-safe:duration-300"
          )}
        >
          <MetricHeader
            label="Overall score"
            badge="Primary"
            tooltip={
              <>
                Composite of keyword coverage, ATS parsing safety, and semantic fit vs. this posting.
                Use it as your headline KPI when iterating your resume.
              </>
            }
          />
          <CardContent className="flex flex-col items-center gap-7 pb-8 pt-2">
            <ScoreRing value={data.overallScorePercent} />
            <div className="max-w-xs space-y-2 text-center">
              <p className="text-sm leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">{data.percentileLabel}</span>
                <br />
                <span className="text-xs text-muted-foreground/90">{data.targetRole}</span>
              </p>
              <p className="text-xs leading-relaxed text-primary/90">{data.scoreCallout}</p>
            </div>
          </CardContent>
        </Card>

        <Card
          className={cn(
            CARD_INTERACTIVE,
            "ring-1 ring-emerald-500/20 shadow-depth motion-safe:transition-[box-shadow,transform] motion-safe:duration-300"
          )}
        >
          <MetricHeader
            label="Keyword match %"
            badge="Coverage"
            tooltip={
              <>
                Matched count is how many JD phrases appear on your resume. Alignment % weights
                critical vs. nice-to-have terms so you know where density still lags.
              </>
            }
          />
          <CardContent className="space-y-7 pb-8">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-4xl font-semibold tabular-nums tracking-tight text-foreground">
                  {data.matchedKeywordCount}
                </p>
                <p className="text-sm text-primary/85">{data.keywordAlignmentPercent}% alignment</p>
              </div>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-center justify-between gap-2 text-sm">
                <span className="flex items-center gap-1 text-muted-foreground">
                  ATS compatibility
                  <FeatureTooltip label="ATS compatibility">
                    How confidently parsers will map your headings, dates, and skills blocks—high
                    scores reduce formatting risk before a human reads you.
                  </FeatureTooltip>
                </span>
                <span className="font-medium tabular-nums text-foreground">
                  {data.atsCompatibilityPercent}%
                </span>
              </div>
              <Progress
                value={data.atsCompatibilityPercent}
                className="h-2.5 bg-muted/50 [&_[data-slot=progress-indicator]]:bg-primary"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-1.5">
                <p className={OVERLINE}>Top missing keywords</p>
                <FeatureTooltip label="Top missing keywords">
                  Highest-impact phrases from the JD that are absent or weak on your resume—address
                  these before polishing lower-priority vocabulary.
                </FeatureTooltip>
              </div>
              <ul className="space-y-2">
                {data.missingKeywords.map((kw) => (
                  <li key={kw.id}>
                    <span
                      className={cn(
                        "inline-flex w-full rounded-lg border px-3 py-2 text-left text-xs leading-snug transition-colors duration-200 md:text-sm",
                        kw.emphasis
                          ? "border-primary/35 bg-primary/10 text-foreground motion-safe:hover:border-primary/50 motion-safe:hover:bg-primary/[0.14]"
                          : "border-border/60 bg-muted/25 text-muted-foreground motion-safe:hover:border-border motion-safe:hover:bg-muted/40"
                      )}
                    >
                      {kw.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card className={cn(CARD_INTERACTIVE)}>
          <MetricHeader
            label="Skill gaps"
            badge="Queue"
            tooltip={
              <>
                Themes recruiters flag when your bullets don&apos;t yet prove depth. Each links
                forward to roadmap tasks and mock-interview prompts.
              </>
            }
          />
          <CardContent className="space-y-5 pb-8">
            <ul className="space-y-4">
              {data.skillGaps.map((gap) => (
                <li key={gap.id} className="group flex gap-3">
                  <GapIcon kind={gap.icon} />
                  <div className="min-w-0 flex-1 space-y-0.5">
                    <p className="text-sm font-medium leading-snug text-foreground">{gap.title}</p>
                    <p className="text-xs text-muted-foreground">{gap.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/app/skill-roadmap"
              className="group inline-flex items-center gap-1.5 text-sm font-medium text-primary transition-colors duration-200 hover:text-primary/90 hover:underline"
            >
              View full roadmap
              <ArrowRight className="h-4 w-4 shrink-0 transition-transform duration-200 motion-safe:group-hover:translate-x-0.5" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export const OverviewDashboard = memo(OverviewDashboardImpl);
