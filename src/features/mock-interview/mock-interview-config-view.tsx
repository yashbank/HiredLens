"use client";

import { Bot, Grid2x2, Keyboard, MapPin, Mic, RefreshCw } from "lucide-react";

import { FeatureTooltip } from "@/components/demo/feature-tooltip";
import { memo, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  CARD_INTERACTIVE,
  OVERLINE,
  OVERLINE_ACCENT,
  PAGE_DESCRIPTION,
  PAGE_ENTER,
  PAGE_STACK,
  PAGE_TITLE,
  SECTION_GAP
} from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { MockInterviewConfig } from "@/types/mock-interview";

function MockInterviewConfigViewImpl({ data }: { data: MockInterviewConfig }) {
  const [mode, setMode] = useState(data.defaultMode);
  const [language, setLanguage] = useState(data.defaultLanguage);
  const [input, setInput] = useState<"voice" | "text">(data.defaultInput);

  const modeMeta = useMemo(
    () => data.modes.find((m) => m.value === mode) ?? data.modes[0],
    [data.modes, mode]
  );

  return (
    <div className={cn(PAGE_STACK, PAGE_ENTER)}>
      <div className="space-y-2">
        <p className={cn(OVERLINE_ACCENT, "tracking-[0.2em]")}>Simulation environment setup</p>
        <h1 className={PAGE_TITLE}>Mock interview</h1>
        <p className={PAGE_DESCRIPTION}>
          Configure how the AI interviewer should challenge you—then review the recommended persona
          before you enter the simulation.
        </p>
        <p className="max-w-2xl border-l-2 border-primary/35 bg-primary/[0.04] py-2 pl-4 text-sm leading-relaxed text-muted-foreground">
          {data.sessionContext}
        </p>
      </div>

      <section className={SECTION_GAP}>
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className={OVERLINE_ACCENT}>Step 01</span>
          <Separator className="hidden max-w-[120px] bg-border/50 sm:block" />
          <h2 className="text-sm font-semibold text-foreground">Configure your session</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card className={cn(CARD_INTERACTIVE, "min-w-0")}>
            <CardHeader className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/50">
                <Grid2x2 className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className={OVERLINE}>Interview mode</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <CardTitle className="text-base font-semibold">Mode</CardTitle>
                  <FeatureTooltip label="Interview mode">
                    Behavioral focuses on leadership narratives; technical stresses architecture under
                    load; portfolio critique walks your shipped work.
                  </FeatureTooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label className="sr-only" htmlFor="interview-mode">
                Interview mode
              </Label>
              <Select value={mode} onValueChange={setMode}>
                <SelectTrigger id="interview-mode">
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  {data.modes.map((m) => (
                    <SelectItem key={m.value} value={m.value}>
                      {m.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CardDescription className={PAGE_DESCRIPTION}>{modeMeta.description}</CardDescription>
            </CardContent>
          </Card>

          <Card className={cn(CARD_INTERACTIVE, "min-w-0")}>
            <CardHeader className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/50">
                <MapPin className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className={OVERLINE}>Language</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <CardTitle className="text-base font-semibold">Dialect</CardTitle>
                  <FeatureTooltip label="Language">
                    Controls vocabulary and idioms the interviewer uses—pick the language you want to
                    practice answering in, independent of your resume language.
                  </FeatureTooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <Label className="sr-only" htmlFor="interview-language">
                Language
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="interview-language">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {data.languages.map((l) => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <CardDescription className={PAGE_DESCRIPTION}>
                Natural NLP processing in your choice of professional dialect.
              </CardDescription>
            </CardContent>
          </Card>

          <Card className={cn(CARD_INTERACTIVE, "min-w-0")}>
            <CardHeader className="space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-background/50">
                <Mic className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className={OVERLINE}>Input method</p>
                <div className="mt-1 flex flex-wrap items-center gap-1.5">
                  <CardTitle className="text-base font-semibold">Channel</CardTitle>
                  <FeatureTooltip label="Input method">
                    Voice simulates real interview pacing and filler words; text is better for quiet
                    environments or accessibility-first demos.
                  </FeatureTooltip>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 rounded-xl border border-border/60 bg-muted/20 p-1">
                <Button
                  type="button"
                  size="sm"
                  variant={input === "voice" ? "default" : "ghost"}
                  className={cn("h-10 gap-2 rounded-lg", input === "voice" && "shadow-sm")}
                  onClick={() => setInput("voice")}
                >
                  <Mic className="h-4 w-4 shrink-0" />
                  Voice
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={input === "text" ? "default" : "ghost"}
                  className={cn("h-10 gap-2 rounded-lg", input === "text" && "shadow-sm")}
                  onClick={() => setInput("text")}
                >
                  <Keyboard className="h-4 w-4 shrink-0" />
                  Text
                </Button>
              </div>
              <CardDescription className={PAGE_DESCRIPTION}>
                Recommended for real-time stress testing and tone analysis.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className={SECTION_GAP}>
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className={OVERLINE_ACCENT}>Step 02</span>
          <Separator className="hidden max-w-[120px] bg-border/50 sm:block" />
          <div className="flex flex-wrap items-center gap-1.5">
            <h2 className="text-sm font-semibold text-foreground">AI interviewer recommendation</h2>
            <FeatureTooltip label="AI interviewer recommendation">
              Personas blend rubric data from similar roles—swap profiles when you want a harsher
              staff+ loop or a more coaching-oriented tone.
            </FeatureTooltip>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <Card className="min-w-0 shadow-sm">
            <CardContent className="space-y-4 p-6 md:p-8">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Based on your target role:{" "}
                <span className="font-semibold text-foreground">{data.targetRole}</span>. We&apos;ve
                synthesized a profile optimized to challenge your specific portfolio gaps.
              </p>
              <Button variant="link" className="h-auto gap-2 px-0 text-primary">
                <RefreshCw className="h-4 w-4 shrink-0" />
                Get duration recommendation
              </Button>
            </CardContent>
          </Card>

          <Card
            className={cn(
              "relative min-w-0 overflow-hidden border-border/40 bg-gradient-to-b from-card/95 via-primary/[0.03] to-muted/25 shadow-depth ring-1 ring-white/[0.03] transition-[box-shadow,transform] duration-500 ease-out motion-safe:hover:shadow-depth-lg"
            )}
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/10 blur-3xl" />
            <CardHeader className="relative flex flex-row items-start justify-between gap-3 space-y-0 pb-10">
              <div className="flex min-w-0 items-start gap-3">
                <div className="relative grid h-12 w-12 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10">
                  <Bot className="h-6 w-6 text-primary" />
                  <Badge className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-1.5 text-[10px] uppercase">
                    {data.persona.badge}
                  </Badge>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">Persona</p>
                  <CardTitle className="text-lg font-semibold">{data.persona.name}</CardTitle>
                </div>
              </div>
              <div className="flex max-w-[40%] flex-wrap justify-end gap-1">
                {data.persona.tagsPrimary.map((t) => (
                  <Badge
                    key={t}
                    variant="outline"
                    className="border-primary/35 bg-primary/10 text-[10px] font-semibold uppercase tracking-wide text-foreground"
                  >
                    {t}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4 pt-0">
              <p className="text-sm leading-relaxed text-muted-foreground">{data.persona.bio}</p>
              <div className="flex flex-wrap gap-2">
                {data.persona.tagsSecondary.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Button variant="link" className="h-auto gap-2 px-0 text-primary">
                <RefreshCw className="h-4 w-4 shrink-0" />
                Change profile
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

export const MockInterviewConfigView = memo(MockInterviewConfigViewImpl);
