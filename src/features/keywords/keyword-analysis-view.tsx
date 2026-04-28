"use client";

import { Download, Info, Sparkles } from "lucide-react";

import { FeatureTooltip } from "@/components/demo/feature-tooltip";
import type { ReactNode } from "react";
import { memo, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CARD_INTERACTIVE, GRID_GAP, OVERLINE, PAGE_DESCRIPTION, PAGE_ENTER, PAGE_STACK, PAGE_TITLE } from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { KeywordAnalysisSnapshot, KeywordSpectrumFilter } from "@/types/keywords";

const StatCard = memo(function StatCard({
  label,
  value,
  hint,
  hintClassName,
  labelHint
}: {
  label: string;
  value: string;
  hint: string;
  hintClassName?: string;
  labelHint?: ReactNode;
}) {
  return (
    <Card className={cn("group", CARD_INTERACTIVE)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex min-w-0 items-center gap-1">
          <p className={OVERLINE}>{label}</p>
          {labelHint ? <FeatureTooltip label={label}>{labelHint}</FeatureTooltip> : null}
        </div>
      </CardHeader>
      <CardContent className="space-y-1 pb-6">
        <p className="text-3xl font-semibold tabular-nums tracking-tight text-foreground transition-colors duration-300 motion-safe:group-hover:text-foreground/90">
          {value}
        </p>
        <p className={cn("text-sm", hintClassName ?? "text-muted-foreground")}>{hint}</p>
      </CardContent>
    </Card>
  );
});

const SpectrumBar = memo(function SpectrumBar({
  label,
  sublabel,
  percent,
  hint
}: {
  label: string;
  sublabel: string;
  percent: number;
  hint?: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2 text-sm">
        <span className="flex items-center gap-1 text-muted-foreground">
          {label}
          {hint ? <FeatureTooltip label={label}>{hint}</FeatureTooltip> : null}
        </span>
        <span className="shrink-0 font-medium text-amber-200/90">{sublabel}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-muted/50">
        <div
          className="h-full rounded-full bg-gradient-to-r from-amber-600 to-amber-400 shadow-[0_0_12px_-2px_rgba(251,191,36,0.35)] transition-[width,box-shadow] duration-700 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
});

function KeywordAnalysisViewImpl({ data }: { data: KeywordAnalysisSnapshot }) {
  const [filter, setFilter] = useState<KeywordSpectrumFilter>("matched");

  const filteredCategories = useMemo(() => {
    return data.categories
      .map((cat) => ({
        ...cat,
        chips: cat.chips.filter((c) => (filter === "matched" ? c.matched : !c.matched))
      }))
      .filter((cat) => cat.chips.length > 0);
  }, [data.categories, filter]);

  return (
    <div className={cn(PAGE_STACK, PAGE_ENTER)}>
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between md:gap-6">
        <div className="min-w-0 space-y-3">
          <h1 className={PAGE_TITLE}>{data.pageTitle}</h1>
          <p className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {data.targetRole}
          </p>
          <p className="max-w-2xl border-l-2 border-primary/35 bg-primary/[0.04] py-2 pl-4 text-sm leading-relaxed text-muted-foreground">
            {data.insightLead}
          </p>
        </div>
        <Badge variant="success" className="w-fit gap-2 px-3 py-1 text-xs">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          AI score: {data.aiScore}/100
        </Badge>
      </div>

      <div className={cn("grid md:grid-cols-3", GRID_GAP)}>
        <StatCard
          label="Keywords matched"
          value={String(data.matchedCount)}
          hint={`${data.alignmentPercent}% alignment`}
          hintClassName="text-primary/80"
          labelHint={
            <>
              Count of JD terms detected on your resume. Alignment % weights must-have language more
              heavily than optional phrasing.
            </>
          }
        />
        <StatCard
          label="Missing critical"
          value={String(data.missingCriticalCount)}
          hint="Action required"
          hintClassName="text-amber-400"
          labelHint={
            <>
              High-signal phrases recruiters expect to see verbatim or as close paraphrases—fix
              these before tuning secondary vocabulary.
            </>
          }
        />
        <StatCard
          label="Impact potential"
          value={`+${data.impactPotentialPercent}%`}
          hint="Post integration"
          labelHint={
            <>
              Modeled lift to your overall match if suggested integrations ship—use it to prioritize
              rewrite vs. roadmap work.
            </>
          }
        />
      </div>

      <div className={cn("grid lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]", "gap-6 md:gap-8")}>
        <Card className={cn(CARD_INTERACTIVE, "min-w-0")}>
          <CardHeader className="flex flex-col gap-4 border-b border-border/50 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-xl font-semibold tracking-tight">Target keyword spectrum</CardTitle>
                <FeatureTooltip label="Target keyword spectrum">
                  Each chip is a normalized JD concept. Matched chips already appear on your resume;
                  missing chips are prioritized in rewrites and roadmap suggestions.
                </FeatureTooltip>
              </div>
              <CardDescription className={PAGE_DESCRIPTION}>
                Categorized landscape based on job description vs. your resume.
              </CardDescription>
            </div>
            <div className="flex shrink-0 rounded-xl border border-border/60 bg-muted/20 p-1">
              <Button
                type="button"
                size="sm"
                variant={filter === "matched" ? "default" : "ghost"}
                className={cn("h-9 rounded-lg px-4", filter === "matched" && "shadow-sm")}
                onClick={() => setFilter("matched")}
              >
                Matched
              </Button>
              <Button
                type="button"
                size="sm"
                variant={filter === "missing" ? "default" : "ghost"}
                className={cn("h-9 rounded-lg px-4", filter === "missing" && "shadow-sm")}
                onClick={() => setFilter("missing")}
              >
                Missing
              </Button>
            </div>
          </CardHeader>
          <CardContent className="max-h-[min(420px,55vh)] space-y-8 overflow-y-auto overflow-x-hidden pt-6 scrollbar-thin">
            {filteredCategories.length === 0 ? (
              <p className="text-sm text-muted-foreground">No keywords in this view.</p>
            ) : (
              filteredCategories.map((cat) => (
                <div key={cat.id} className="space-y-3">
                  <p className={OVERLINE}>{cat.title}</p>
                  <div className="flex flex-wrap gap-2">
                    {cat.chips.map((chip) => (
                      <span
                        key={chip.id}
                        className={cn(
                          "rounded-full border px-3 py-1 text-xs font-medium transition-colors duration-200",
                          chip.matched
                            ? "border-border/60 bg-muted/25 text-foreground motion-safe:hover:border-primary/20 motion-safe:hover:bg-muted/40"
                            : "border-amber-500/25 bg-amber-500/10 text-amber-50 motion-safe:hover:border-amber-400/40 motion-safe:hover:bg-amber-500/15"
                        )}
                      >
                        {chip.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>

        <div className="flex min-w-0 flex-col gap-4">
          <Card className={cn(CARD_INTERACTIVE, "min-w-0")}>
            <CardHeader className="space-y-2 border-b border-border/50 pb-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Sparkles className="h-4 w-4 shrink-0 text-primary" />
                AI optimization
                <FeatureTooltip label="AI optimization">
                  Concrete before/after language you can paste into your resume—grounded in the gaps
                  surfaced in this analysis.
                </FeatureTooltip>
              </div>
            </CardHeader>
            <CardContent className="max-h-[min(220px,40vh)] space-y-3 overflow-y-auto overflow-x-hidden pt-4 scrollbar-thin">
              <p className="text-xs font-semibold uppercase tracking-wide text-amber-400">
                {data.optimization.title}
              </p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                {data.optimization.body}
              </p>
            </CardContent>
          </Card>

          <Card className={cn(CARD_INTERACTIVE, "min-w-0")}>
            <CardHeader className="border-b border-border/50 pb-4">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle className="text-base font-semibold">Semantic context</CardTitle>
                <FeatureTooltip label="Semantic context">
                  Higher-level fit signals beyond literal keyword matches—use them to tune stories in
                  interviews, not just bullet wording.
                </FeatureTooltip>
              </div>
              <CardDescription className={PAGE_DESCRIPTION}>
                How your resume reads against this JD.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-4">
              <SpectrumBar
                label="Industry relevancy"
                sublabel={data.semanticContext.industryRelevancy.label}
                percent={data.semanticContext.industryRelevancy.percent}
                hint={
                  <>
                    How closely your experience narrative matches fintech / platform hiring signals in
                    this corpus—not a score on you personally, but fit to this JD family.
                  </>
                }
              />
              <SpectrumBar
                label="JD difficulty"
                sublabel={data.semanticContext.jdDifficulty.label}
                percent={data.semanticContext.jdDifficulty.percent}
                hint={
                  <>
                    Heuristic for how selective this posting is (bar for proof, seniority, and scope).
                    Higher difficulty means reviewers expect more concrete ownership stories.
                  </>
                }
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <Card className="border-border/40 bg-gradient-to-r from-card/95 via-primary/[0.04] to-muted/20 shadow-depth transition-[box-shadow,transform] duration-500 ease-out motion-safe:hover:shadow-glow">
        <CardContent className="flex flex-col gap-5 p-5 md:flex-row md:items-center md:justify-between md:p-7">
          <div className="flex min-w-0 gap-3 text-sm text-muted-foreground">
            <div className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-border/60 bg-background/50">
              <Info className="h-4 w-4 text-primary" />
            </div>
            <p className="min-w-0 max-w-2xl leading-relaxed">
              Ready to update your resume? Download the optimized keyword list as a guide, then apply
              AI rewrites in one click.
            </p>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              Export analysis
            </Button>
            <Button className="gap-2 shadow-sm">
              Apply rewrites
              <span aria-hidden>›</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export const KeywordAnalysisView = memo(KeywordAnalysisViewImpl);
