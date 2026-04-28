import Link from "next/link";
import { ArrowRight, CheckCircle2, Circle, CircleDot } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { demoSections, type DemoSectionSlug } from "@/data/demo-sections";
import {
  CARD_INTERACTIVE,
  GRID_GAP,
  OVERLINE,
  OVERLINE_ACCENT,
  PAGE_DESCRIPTION,
  PAGE_ENTER,
  PAGE_STACK,
  PAGE_TITLE,
  SECTION_GAP
} from "@/lib/ui";
import { cn } from "@/lib/utils";

function MilestoneIcon({ status }: { status: "done" | "current" | "upcoming" }) {
  if (status === "done") {
    return <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500" aria-hidden />;
  }
  if (status === "current") {
    return <CircleDot className="h-4 w-4 shrink-0 text-primary" aria-hidden />;
  }
  return <Circle className="h-4 w-4 shrink-0 text-muted-foreground/50" aria-hidden />;
}

export function DemoFeatureShell({ slug }: { slug: DemoSectionSlug }) {
  const content = demoSections[slug];

  return (
    <div className={cn(PAGE_STACK, PAGE_ENTER)}>
      <div className="space-y-2">
        <p className={OVERLINE_ACCENT}>{content.eyebrow}</p>
        <h1 className={PAGE_TITLE}>{content.title}</h1>
        <p className={PAGE_DESCRIPTION}>{content.description}</p>
      </div>

      <div className={cn("grid sm:grid-cols-3", GRID_GAP)}>
        {content.stats.map((s) => (
          <Card key={s.label} className={cn("group", CARD_INTERACTIVE)}>
            <CardHeader className="pb-2">
              <p className={OVERLINE}>{s.label}</p>
              <CardTitle className="text-2xl font-semibold tabular-nums tracking-tight text-foreground transition-colors duration-300 motion-safe:group-hover:text-foreground/90">
                {s.value}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm leading-relaxed text-muted-foreground">
                {s.detail}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className={SECTION_GAP}>
        {content.milestones?.length ? (
          <Card className="border-border/50 shadow-depth">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-lg font-semibold tracking-tight">Milestone timeline</CardTitle>
              <CardDescription className={PAGE_DESCRIPTION}>
                Ordered checkpoints synced to your gap cards—status updates here when integrations land
                on your resume.
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ul className="space-y-4">
                {content.milestones.map((m) => (
                  <li key={m.id} className="flex gap-3">
                    <div className="mt-0.5">
                      <MilestoneIcon status={m.status} />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {m.date}
                        </span>
                        {m.status === "current" ? (
                          <Badge variant="secondary" className="text-[10px] uppercase">
                            In progress
                          </Badge>
                        ) : null}
                      </div>
                      <p className="text-sm font-medium leading-snug text-foreground">{m.title}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ) : null}

        {content.activity?.length ? (
          <Card className="border-border/50 shadow-depth">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-lg font-semibold tracking-tight">Recent activity</CardTitle>
              <CardDescription className={PAGE_DESCRIPTION}>
                Immutable log lines for each analysis touchpoint—open a row in a future build to
                restore that snapshot.
              </CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-border/50 p-0">
              {content.activity.map((row) => (
                <div
                  key={row.id}
                  className="flex flex-col gap-1 px-6 py-4 transition-colors motion-safe:hover:bg-muted/20 sm:flex-row sm:items-center sm:justify-between md:px-7"
                >
                  <div className="min-w-0 space-y-1">
                    <p className="text-sm font-medium text-foreground">{row.title}</p>
                    <p className="text-xs text-muted-foreground">{row.meta}</p>
                  </div>
                  <div className="shrink-0">
                    {row.badge === "—" ? (
                      <span className="text-xs tabular-nums text-muted-foreground">{row.badge}</span>
                    ) : (
                      <Badge variant="outline" className="tabular-nums">
                        Score {row.badge}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}

        {content.settingsRows?.length ? (
          <Card className="border-border/50 shadow-depth">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-lg font-semibold tracking-tight">Workspace profile</CardTitle>
              <CardDescription className={PAGE_DESCRIPTION}>
                Read-only snapshot of preferences that propagate to analyses and notifications.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 pt-6">
              {content.settingsRows.map((row) => (
                <div key={row.id} className="space-y-2">
                  <p className="text-sm font-medium text-foreground">{row.label}</p>
                  <div className="rounded-lg border border-border/60 bg-muted/15 px-3 py-2.5 text-sm text-foreground/90">
                    {row.value}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}

        {content.articles?.length ? (
          <Card className="border-border/50 shadow-depth">
            <CardHeader className="border-b border-border/50 pb-4">
              <CardTitle className="text-lg font-semibold tracking-tight">Recommended reading</CardTitle>
              <CardDescription className={PAGE_DESCRIPTION}>
                Short articles stakeholders read during pilots—links activate when help center is wired
                to production.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-0 divide-y divide-border/50 p-0">
              {content.articles.map((a) => (
                <div
                  key={a.id}
                  className="flex flex-col gap-1 px-6 py-4 md:px-7"
                >
                  <p className="text-sm font-medium text-foreground">{a.title}</p>
                  <p className="text-xs text-muted-foreground">{a.meta}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}

        <Card className="border-border/50 shadow-depth">
          <CardHeader className="border-b border-border/50 pb-4">
            <CardTitle className="text-lg font-semibold tracking-tight">{content.focusTitle}</CardTitle>
            <CardDescription className={PAGE_DESCRIPTION}>{content.focusDescription}</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <ul className="space-y-3 text-sm leading-relaxed text-muted-foreground">
              {content.checklist.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/80" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="border-border/40 bg-gradient-to-r from-card/95 via-primary/[0.04] to-muted/20 shadow-depth">
          <CardHeader className="space-y-1 pb-2">
            <CardTitle className="text-base font-semibold">Continue in HiredLens</CardTitle>
            <CardDescription className={PAGE_DESCRIPTION}>
              Jump to adjacent workflows that already run end-to-end in this workspace build.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 pt-2 sm:flex-row sm:flex-wrap">
            {content.related.map((r) => (
              <Button
                key={r.href}
                asChild
                variant="secondary"
                className="h-auto justify-between gap-3 rounded-lg border border-border/50 bg-background/70 py-3 pl-4 pr-3 text-left shadow-sm backdrop-blur-sm"
              >
                <Link href={r.href} className="inline-flex w-full items-center gap-3">
                  <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                    <span className="text-sm font-semibold text-foreground">{r.label}</span>
                    <span className="text-xs font-normal text-muted-foreground">{r.hint}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-primary opacity-80" aria-hidden />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-xs leading-relaxed text-muted-foreground">
        Figures and copy stay synchronized with the Meridian Staff Backend workspace used on Overview
        and Keywords.
      </p>
    </div>
  );
}
