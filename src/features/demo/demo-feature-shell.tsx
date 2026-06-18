"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, CircleDot } from "lucide-react";

import { PageHeading } from "@/components/dashboard/page-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/interactive";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { demoSections, type DemoSectionSlug } from "@/data/demo-sections";
import { cn } from "@/lib/utils";

function MilestoneIcon({ status }: { status: "done" | "current" | "upcoming" }) {
  if (status === "done") return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
  if (status === "current") return <CircleDot className="h-4 w-4 text-primary" />;
  return <Circle className="h-4 w-4 text-muted-foreground/50" />;
}

function SectionCard({
  title,
  description,
  children
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="border-b border-border/50 pb-4">
        <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">{title}</h2>
        {description ? <p className="text-sm leading-relaxed text-muted-foreground">{description}</p> : null}
      </CardHeader>
      <CardContent className="pt-6">{children}</CardContent>
    </Card>
  );
}

export function DemoFeatureShell({ slug }: { slug: DemoSectionSlug }) {
  const content = demoSections[slug];

  return (
    <div className="space-y-8">
      <PageHeading eyebrow={content.eyebrow} title={content.title} description={content.description} />

      <Stagger className="grid gap-4 sm:grid-cols-3" gap={0.1}>
        {content.stats.map((s) => (
          <StaggerItem key={s.label}>
            <Tilt className="h-full" max={6}>
              <Card variant="glass" className="spotlight h-full p-6">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {s.label}
                </p>
                <p className="mt-2 font-display text-3xl font-semibold tabular-nums tracking-tight text-foreground">
                  {s.value}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.detail}</p>
              </Card>
            </Tilt>
          </StaggerItem>
        ))}
      </Stagger>

      <div className="space-y-4">
        {content.milestones?.length ? (
          <Reveal>
            <SectionCard
              title="Milestone timeline"
              description="Ordered checkpoints synced to your gap cards."
            >
              <ol className="relative space-y-5 before:absolute before:left-[7px] before:top-1 before:h-[calc(100%-1rem)] before:w-px before:bg-border">
                {content.milestones.map((m) => (
                  <li key={m.id} className="relative flex gap-4 pl-0">
                    <span className="relative z-10 mt-0.5 grid h-4 w-4 place-items-center rounded-full bg-background">
                      <MilestoneIcon status={m.status} />
                    </span>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {m.date}
                        </span>
                        {m.status === "current" ? (
                          <Badge variant="soft" className="text-[10px] uppercase">
                            In progress
                          </Badge>
                        ) : null}
                      </div>
                      <p className="text-sm font-medium leading-snug text-foreground">{m.title}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </SectionCard>
          </Reveal>
        ) : null}

        {content.activity?.length ? (
          <Reveal>
            <SectionCard title="Recent activity" description="Immutable log lines for each analysis touchpoint.">
              <div className="-mt-2 divide-y divide-border/50">
                {content.activity.map((row) => (
                  <div
                    key={row.id}
                    className="flex flex-col gap-1 py-3.5 transition-colors hover:bg-muted/10 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 space-y-0.5">
                      <p className="text-sm font-medium text-foreground">{row.title}</p>
                      <p className="text-xs text-muted-foreground">{row.meta}</p>
                    </div>
                    {row.badge === "—" ? (
                      <span className="text-xs tabular-nums text-muted-foreground">{row.badge}</span>
                    ) : (
                      <Badge variant="outline" className="tabular-nums">
                        Score {row.badge}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          </Reveal>
        ) : null}

        {content.settingsRows?.length ? (
          <Reveal>
            <SectionCard title="Workspace profile" description="Read-only snapshot of preferences.">
              <div className="space-y-4">
                {content.settingsRows.map((row) => (
                  <div key={row.id} className="space-y-1.5">
                    <p className="text-sm font-medium text-foreground">{row.label}</p>
                    <div className="rounded-[calc(var(--radius)-4px)] border border-border/60 bg-muted/15 px-3 py-2.5 text-sm text-foreground/90">
                      {row.value}
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </Reveal>
        ) : null}

        {content.articles?.length ? (
          <Reveal>
            <SectionCard title="Recommended reading" description="Short articles stakeholders read during pilots.">
              <div className="-mt-2 divide-y divide-border/50">
                {content.articles.map((a) => (
                  <div key={a.id} className="group flex items-center justify-between gap-3 py-3.5">
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-foreground">{a.title}</p>
                      <p className="text-xs text-muted-foreground">{a.meta}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                ))}
              </div>
            </SectionCard>
          </Reveal>
        ) : null}

        <Reveal>
          <SectionCard title={content.focusTitle} description={content.focusDescription}>
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {content.checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SectionCard>
        </Reveal>

        <Reveal>
          <Card variant="gradient">
            <CardHeader className="pb-3">
              <h2 className="font-display text-base font-semibold text-foreground">
                Continue in HiredLens
              </h2>
              <p className="text-sm text-muted-foreground">Jump to adjacent workflows.</p>
            </CardHeader>
            <CardContent className="grid gap-3 sm:grid-cols-3">
              {content.related.map((r) => (
                <Button
                  key={r.href}
                  asChild
                  variant="glass"
                  className="h-auto flex-col items-start gap-1 p-4 text-left"
                >
                  <Link href={r.href}>
                    <span className="flex w-full items-center justify-between text-sm font-semibold text-foreground">
                      {r.label}
                      <ArrowRight className="h-4 w-4 text-primary" />
                    </span>
                    <span className="text-xs font-normal text-muted-foreground">{r.hint}</span>
                  </Link>
                </Button>
              ))}
            </CardContent>
          </Card>
        </Reveal>
      </div>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Figures and copy stay synchronized with the Meridian Staff Backend workspace.
      </p>
    </div>
  );
}
