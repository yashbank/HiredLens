"use client";

import { memo, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Bot, Keyboard, Languages, Mic, Play, RefreshCw, SlidersHorizontal } from "lucide-react";

import { PageHeading } from "@/components/dashboard/page-heading";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Tilt } from "@/components/motion/interactive";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { MockInterviewConfig } from "@/types/mock-interview";

function Waveform({ active }: { active: boolean }) {
  return (
    <div className="flex h-8 items-center gap-0.5">
      {Array.from({ length: 18 }).map((_, i) => (
        <motion.span
          key={i}
          className="w-0.5 rounded-full bg-primary"
          animate={
            active
              ? { height: [4, 6 + ((i * 7) % 20), 4] }
              : { height: 3 }
          }
          transition={
            active
              ? { duration: 0.7 + (i % 5) * 0.12, repeat: Infinity, ease: "easeInOut" }
              : { duration: 0.2 }
          }
        />
      ))}
    </div>
  );
}

function ConfigCard({
  icon: Icon,
  eyebrow,
  title,
  children
}: {
  icon: React.ComponentType<{ className?: string }>;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Tilt className="h-full" max={6}>
      <Card variant="glass" className="spotlight h-full">
        <CardHeader className="space-y-3 pb-3">
          <div className="grid h-10 w-10 place-items-center rounded-lg border border-border/50 bg-background/40 text-primary">
            <Icon className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
              {eyebrow}
            </p>
            <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
          </div>
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </Tilt>
  );
}

function MockInterviewConfigViewImpl({ data }: { data: MockInterviewConfig }) {
  const [mode, setMode] = useState(data.defaultMode);
  const [language, setLanguage] = useState(data.defaultLanguage);
  const [input, setInput] = useState<"voice" | "text">(data.defaultInput);

  const modeMeta = useMemo(
    () => data.modes.find((m) => m.value === mode) ?? data.modes[0],
    [data.modes, mode]
  );
  const langMeta = useMemo(
    () => data.languages.find((l) => l.value === language) ?? data.languages[0],
    [data.languages, language]
  );

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Simulation setup"
        title="Mock interview"
        description={data.sessionContext}
      />

      {/* STEP 1 — configuration */}
      <Stagger className="grid gap-4 md:grid-cols-3" gap={0.1}>
        <StaggerItem>
          <ConfigCard icon={SlidersHorizontal} eyebrow="Step 01" title="Interview mode">
            <Label htmlFor="interview-mode" className="sr-only">
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
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {modeMeta.description}
            </p>
          </ConfigCard>
        </StaggerItem>

        <StaggerItem>
          <ConfigCard icon={Languages} eyebrow="Step 02" title="Language">
            <Label htmlFor="interview-language" className="sr-only">
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
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Natural NLP in your chosen professional dialect.
            </p>
          </ConfigCard>
        </StaggerItem>

        <StaggerItem>
          <ConfigCard icon={Mic} eyebrow="Step 03" title="Channel">
            <div className="grid grid-cols-2 gap-1 rounded-full border border-border/60 bg-muted/30 p-1">
              {(["voice", "text"] as const).map((ch) => (
                <button
                  key={ch}
                  onClick={() => setInput(ch)}
                  className={cn(
                    "relative flex h-9 items-center justify-center gap-2 rounded-full text-sm font-medium capitalize transition-colors",
                    input === ch ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {input === ch ? (
                    <motion.span
                      layoutId="channel-pill"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-primary/15 ring-1 ring-primary/30"
                    />
                  ) : null}
                  <span className="relative z-10 flex items-center gap-1.5">
                    {ch === "voice" ? <Mic className="h-3.5 w-3.5" /> : <Keyboard className="h-3.5 w-3.5" />}
                    {ch}
                  </span>
                </button>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {input === "voice" ? "Real-time pacing & tone." : "Quiet & accessibility-first."}
              </p>
              <Waveform active={input === "voice"} />
            </div>
          </ConfigCard>
        </StaggerItem>
      </Stagger>

      {/* STEP 2 — persona + launch */}
      <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
        <Reveal>
          <Card variant="glass" className="flex h-full flex-col justify-between">
            <CardHeader>
              <h2 className="font-display text-lg font-semibold tracking-tight text-foreground">
                Ready to begin
              </h2>
              <p className="text-sm text-muted-foreground">
                Your tuned session for{" "}
                <span className="font-medium text-foreground">{data.targetRole}</span>.
              </p>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex flex-wrap gap-2">
                <Badge variant="soft">{modeMeta.label}</Badge>
                <Badge variant="outline" className="text-muted-foreground">
                  {langMeta.label}
                </Badge>
                <Badge variant="outline" className="text-muted-foreground capitalize">
                  {input}
                </Badge>
              </div>
              <div className="flex flex-wrap gap-3">
                <Button variant="gradient" size="lg" className="shine">
                  <Play className="h-4 w-4" />
                  Start simulation
                </Button>
                <Button variant="ghost">
                  <RefreshCw className="h-4 w-4" />
                  Duration recommendation
                </Button>
              </div>
            </CardContent>
          </Card>
        </Reveal>

        <Reveal delay={0.08}>
          <Card variant="gradient" className="relative h-full overflow-hidden">
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-primary/15 blur-3xl" />
            <CardHeader className="relative gap-4">
              <div className="flex items-center gap-3">
                <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-grad-brand text-white shadow-glow">
                  <Bot className="h-7 w-7" />
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-background px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-primary ring-1 ring-primary/30">
                    {data.persona.badge}
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-muted-foreground">AI interviewer</p>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {data.persona.name}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {data.persona.tagsPrimary.map((t) => (
                  <Badge key={t} variant="soft" className="text-[10px] uppercase">
                    {t}
                  </Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent className="relative space-y-4">
              <p className="text-sm leading-relaxed text-muted-foreground">{data.persona.bio}</p>
              <div className="flex flex-wrap gap-1.5">
                {data.persona.tagsSecondary.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border/60 bg-background/40 px-2 py-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <Button variant="link" className="h-auto gap-2 px-0">
                <RefreshCw className="h-4 w-4" />
                Change profile
              </Button>
            </CardContent>
          </Card>
        </Reveal>
      </div>
    </div>
  );
}

export const MockInterviewConfigView = memo(MockInterviewConfigViewImpl);
