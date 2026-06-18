"use client";

import { memo, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Sparkles, Wand2 } from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/interactive";
import { PageHeading } from "@/components/dashboard/page-heading";
import { Meter } from "@/components/ui/charts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { KeywordAnalysisSnapshot, KeywordSpectrumFilter } from "@/types/keywords";

function StatTile({
  label,
  children,
  badge,
  badgeTone = "soft"
}: {
  label: string;
  children: React.ReactNode;
  badge?: string;
  badgeTone?: "soft" | "success" | "warning";
}) {
  return (
    <Tilt className="h-full" max={7}>
      <Card variant="glass" className="spotlight h-full p-6">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          {badge ? <Badge variant={badgeTone}>{badge}</Badge> : null}
        </div>
        <div className="mt-3">{children}</div>
      </Card>
    </Tilt>
  );
}

function KeywordAnalysisViewImpl({ data }: { data: KeywordAnalysisSnapshot }) {
  const [filter, setFilter] = useState<KeywordSpectrumFilter>("matched");

  const filteredCategories = useMemo(
    () =>
      data.categories
        .map((cat) => ({
          ...cat,
          chips: cat.chips.filter((c) => (filter === "matched" ? c.matched : !c.matched))
        }))
        .filter((cat) => cat.chips.length > 0),
    [data.categories, filter]
  );

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Semantic analysis"
        title={data.pageTitle}
        description={data.insightLead}
        action={
          <Badge variant="success" className="gap-2 px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            AI score {data.aiScore}/100
          </Badge>
        }
      />

      <Stagger className="grid gap-4 md:grid-cols-3" gap={0.1}>
        <StaggerItem>
          <StatTile label="Keywords matched" badge="74% aligned" badgeTone="success">
            <span className="font-display text-4xl font-semibold tabular-nums text-foreground">
              <AnimatedNumber value={data.matchedCount} />
            </span>
            <Meter className="mt-4" value={data.alignmentPercent} valueLabel={`${data.alignmentPercent}%`} label="Weighted alignment" />
          </StatTile>
        </StaggerItem>
        <StaggerItem>
          <StatTile label="Missing critical" badge="Action required" badgeTone="warning">
            <span className="font-display text-4xl font-semibold tabular-nums text-foreground">
              <AnimatedNumber value={data.missingCriticalCount} />
            </span>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              High-signal phrases recruiters expect verbatim — fix these before secondary vocabulary.
            </p>
          </StatTile>
        </StaggerItem>
        <StaggerItem>
          <StatTile label="Impact potential">
            <span className="font-display text-4xl font-semibold tabular-nums text-foreground">
              +<AnimatedNumber value={data.impactPotentialPercent} suffix="%" />
            </span>
            <Meter className="mt-4" value={data.impactPotentialPercent * 6} valueLabel="Post-integration" label="Modeled score lift" />
          </StatTile>
        </StaggerItem>
      </Stagger>

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,21rem)]">
        {/* Spectrum */}
        <Reveal>
          <Card className="min-w-0">
            <CardHeader className="flex flex-col gap-4 border-b border-border/50 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 space-y-1">
                <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                  Target keyword spectrum
                </h2>
                <p className="text-sm text-muted-foreground">
                  Normalized JD concepts vs. your resume language.
                </p>
              </div>
              <div className="inline-flex shrink-0 rounded-full border border-border/60 bg-muted/30 p-1">
                {(["matched", "missing"] as KeywordSpectrumFilter[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "relative rounded-full px-4 py-1.5 text-sm font-medium capitalize transition-colors",
                      filter === f ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    {filter === f ? (
                      <motion.span
                        layoutId="kw-filter"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30"
                      />
                    ) : null}
                    <span className="relative z-10">{f}</span>
                  </button>
                ))}
              </div>
            </CardHeader>
            <CardContent className="max-h-[min(440px,58vh)] space-y-7 overflow-y-auto pt-6 scrollbar-thin">
              <AnimatePresence mode="popLayout">
                {filteredCategories.map((cat) => (
                  <motion.div
                    key={cat.id}
                    layout
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="space-y-3"
                  >
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                      {cat.title}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <AnimatePresence mode="popLayout">
                        {cat.chips.map((chip) => (
                          <motion.span
                            key={chip.id}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ type: "spring", stiffness: 400, damping: 28 }}
                            whileHover={{ y: -2 }}
                            className={cn(
                              "cursor-default rounded-full border px-3.5 py-1.5 text-xs font-medium",
                              chip.matched
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
                                : "border-amber-500/30 bg-amber-500/10 text-amber-500"
                            )}
                          >
                            {chip.label}
                          </motion.span>
                        ))}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </CardContent>
          </Card>
        </Reveal>

        {/* Side column */}
        <div className="flex min-w-0 flex-col gap-4">
          <Reveal delay={0.06}>
            <Card variant="gradient" className="min-w-0">
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Sparkles className="h-4 w-4 text-primary" />
                  AI optimization
                </div>
              </CardHeader>
              <CardContent className="space-y-2.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-primary">
                  {data.optimization.title}
                </p>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                  {data.optimization.body}
                </p>
              </CardContent>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card className="min-w-0">
              <CardHeader className="pb-3">
                <h3 className="font-display text-base font-semibold text-foreground">
                  Semantic context
                </h3>
                <p className="text-sm text-muted-foreground">How your resume reads vs. this JD.</p>
              </CardHeader>
              <CardContent className="space-y-5">
                <Meter
                  value={data.semanticContext.industryRelevancy.percent}
                  label="Industry relevancy"
                  valueLabel={data.semanticContext.industryRelevancy.label}
                  tone="brand"
                />
                <Meter
                  value={data.semanticContext.jdDifficulty.percent}
                  label="JD difficulty"
                  valueLabel={data.semanticContext.jdDifficulty.label}
                  tone="amber"
                />
              </CardContent>
            </Card>
          </Reveal>
        </div>
      </div>

      <Reveal>
        <Card variant="gradient">
          <CardContent className="flex flex-col gap-5 p-6 md:flex-row md:items-center md:justify-between md:p-7">
            <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Ready to update your resume? Export the optimized keyword list, then apply AI rewrites in
              one click.
            </p>
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
              <Button variant="outline">
                <Download className="h-4 w-4" />
                Export analysis
              </Button>
              <Button variant="gradient" className="shine" asChild>
                <a href="/app/rewrites">
                  <Wand2 className="h-4 w-4" />
                  Apply rewrites
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}

export const KeywordAnalysisView = memo(KeywordAnalysisViewImpl);
