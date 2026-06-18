"use client";

import Link from "next/link";
import { memo, useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AlertCircle, ArrowRight, Check, Loader2, Sparkles, Wand2 } from "lucide-react";

import { PageHeading } from "@/components/dashboard/page-heading";
import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getUserFacingMessage } from "@/lib/error-messages";
import { requestMockResumeRewrite } from "@/lib/mock-rewrite-api";
import { cn } from "@/lib/utils";
import type { ResumeRewriteContext, ResumeRewriteResult } from "@/types/resume-rewrite";

type Phase = "idle" | "loading" | "result";

const STEPS = [
  "Parsing resume structure",
  "Mapping job-description keywords",
  "Tightening metrics & impact",
  "Preserving your voice",
  "Finalizing optimized draft"
];

function LoadingState() {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = window.setInterval(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 620);
    return () => window.clearInterval(t);
  }, []);

  return (
    <div className="relative flex min-h-[min(460px,70vh)] flex-col items-center justify-center gap-9 overflow-hidden px-6 py-16">
      <div className="relative grid h-24 w-24 place-items-center">
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-2xl animate-pulse-glow" />
        <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary/40 animate-spin [animation-duration:1.1s]" />
        <div className="relative grid h-16 w-16 place-items-center rounded-2xl glass glass-edge">
          <Wand2 className="h-7 w-7 text-primary" />
        </div>
      </div>

      <div className="w-full max-w-sm space-y-2.5">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <motion.div
              key={label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: i <= step ? 1 : 0.4, x: 0 }}
              className="flex items-center gap-3 text-sm"
            >
              <span
                className={cn(
                  "grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors",
                  done
                    ? "border-primary bg-primary text-primary-foreground"
                    : active
                      ? "border-primary text-primary"
                      : "border-border text-muted-foreground"
                )}
              >
                {done ? (
                  <Check className="h-3 w-3" strokeWidth={3} />
                ) : active ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : null}
              </span>
              <span className={cn(done || active ? "text-foreground" : "text-muted-foreground")}>
                {label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function ResumeRewriteFlowImpl({
  context,
  result,
  initialPhase = "idle",
  sampleMode = false
}: {
  context: ResumeRewriteContext;
  result: ResumeRewriteResult;
  initialPhase?: Phase;
  sampleMode?: boolean;
}) {
  const [phase, setPhase] = useState<Phase>(initialPhase);
  const [showSampleRibbon, setShowSampleRibbon] = useState(sampleMode);
  const [rewriteError, setRewriteError] = useState<string | null>(null);

  const onGenerate = useCallback(async () => {
    setRewriteError(null);
    setPhase("loading");
    try {
      await requestMockResumeRewrite();
      setPhase("result");
    } catch (err) {
      setPhase("idle");
      setRewriteError(getUserFacingMessage(err));
    }
  }, []);

  const onReset = useCallback(() => {
    setPhase("idle");
    setShowSampleRibbon(false);
    setRewriteError(null);
  }, []);

  return (
    <div className="space-y-8">
      <PageHeading
        eyebrow="Generative rewrite"
        title="Resume AI rewrite"
        description={`Tailored for ${context.targetRole}. Bullet rewrites, keyword injections, and quantified impact — your voice intact.`}
        action={
          <Badge variant="soft" className="gap-2 px-3 py-1.5 font-mono">
            <Sparkles className="h-3.5 w-3.5" />
            {context.fileName}
          </Badge>
        }
      />

      <Reveal>
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <AnimatePresence mode="wait">
              {phase === "idle" ? (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="relative flex min-h-[min(460px,70vh)] flex-col items-center justify-center gap-7 overflow-hidden px-6 py-16 text-center"
                >
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,hsl(var(--primary)/0.14),transparent_55%)]"
                  />
                  <div className="relative grid h-20 w-20 place-items-center">
                    <div className="absolute inset-0 rounded-2xl bg-primary/25 blur-2xl animate-pulse-glow" />
                    <div className="relative grid h-20 w-20 place-items-center rounded-2xl glass glass-edge">
                      <Wand2 className="h-9 w-9 text-primary" />
                    </div>
                  </div>

                  {rewriteError ? (
                    <div
                      role="alert"
                      className="relative max-w-md rounded-[var(--radius)] border border-destructive/35 bg-destructive/10 px-4 py-3 text-left text-sm text-destructive"
                    >
                      <div className="flex gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                        <span>{rewriteError}</span>
                      </div>
                    </div>
                  ) : null}

                  <div className="relative max-w-lg space-y-3">
                    <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground">
                      AI resume rewriter
                    </h2>
                    <p className="text-[15px] leading-relaxed text-muted-foreground">
                      Generate an optimized version tailored to this role — enhanced bullets, injected
                      keywords, stronger impact. Timing is simulated locally; nothing leaves your
                      browser.
                    </p>
                  </div>

                  <div className="relative flex flex-col items-center gap-3">
                    <Button size="lg" variant="gradient" className="px-8 shine" onClick={onGenerate}>
                      <Wand2 className="h-4 w-4" />
                      Generate AI rewrite
                    </Button>
                    <Link
                      href="/app/rewrites?sample=1"
                      className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                    >
                      Or open a finished sample
                    </Link>
                  </div>
                </motion.div>
              ) : null}

              {phase === "loading" ? (
                <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <LoadingState />
                </motion.div>
              ) : null}

              {phase === "result" ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {showSampleRibbon ? (
                    <div className="border-b border-primary/20 bg-primary/[0.08] px-6 py-3 text-center text-xs text-muted-foreground md:px-10">
                      <span className="font-medium text-foreground">Demo tip:</span> pre-generated
                      rewrite. Use <span className="font-medium text-foreground">Start over</span> to
                      run the simulated flow.
                    </div>
                  ) : null}

                  <div className="relative overflow-hidden border-b border-border/50 px-6 py-9 md:px-10">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-grad-brand opacity-[0.06]"
                    />
                    <div className="relative flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div className="min-w-0 space-y-3">
                        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-medium text-emerald-500">
                          <Check className="h-4 w-4" strokeWidth={3} />
                          Rewrite complete
                        </div>
                        <h2 className="font-display text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                          {result.headline}
                        </h2>
                        <p className="max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                          {result.summary}
                        </p>
                      </div>
                      <Button variant="outline" className="shrink-0" onClick={onReset}>
                        Start over
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-8 px-6 py-9 md:px-10">
                    <div className="space-y-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Keyword injections
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {result.keywordInjections.map((k, i) => (
                          <motion.span
                            key={k}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 400, damping: 24 }}
                          >
                            <Badge variant="soft">{k}</Badge>
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Before → after
                      </p>
                      <div className="space-y-4">
                        {result.bullets.map((b, i) => (
                          <motion.div
                            key={b.id}
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="grid gap-4 rounded-[var(--radius)] border border-border/50 bg-muted/15 p-4 md:grid-cols-2 md:p-6"
                          >
                            <div className="min-w-0 space-y-2">
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                                Before
                              </p>
                              <p className="text-sm leading-relaxed text-muted-foreground">
                                {b.before}
                              </p>
                            </div>
                            <div className="relative min-w-0 space-y-2 border-t border-border/50 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                              <p className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-primary">
                                <Sparkles className="h-3 w-3" />
                                After
                              </p>
                              <p className="text-sm leading-relaxed text-foreground">{b.after}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <Button variant="gradient" className="shine">
                        Download optimized resume
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                      <Button asChild variant="outline">
                        <Link href="/app/mock-interview">Practice in mock interview</Link>
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CardContent>
        </Card>
      </Reveal>
    </div>
  );
}

export const ResumeRewriteFlow = memo(ResumeRewriteFlowImpl);
