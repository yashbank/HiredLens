"use client";

import Link from "next/link";
import { memo, useCallback, useState } from "react";
import { AlertCircle, CheckCircle2, Loader2, Sparkles, Wand2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserFacingMessage } from "@/lib/error-messages";
import { requestMockResumeRewrite } from "@/lib/mock-rewrite-api";
import { OVERLINE, OVERLINE_ACCENT, PAGE_DESCRIPTION, PAGE_ENTER, PAGE_STACK, PAGE_TITLE } from "@/lib/ui";
import { cn } from "@/lib/utils";
import type { ResumeRewriteContext, ResumeRewriteResult } from "@/types/resume-rewrite";

type Phase = "idle" | "loading" | "result";

function ResumeRewriteFlowImpl({
  context,
  result,
  initialPhase = "idle",
  sampleMode = false
}: {
  context: ResumeRewriteContext;
  result: ResumeRewriteResult;
  /** When `result`, shows pre-filled output for demos (e.g. `?sample=1`). */
  initialPhase?: Phase;
  /** Explains that the on-screen rewrite is a canned sample until the user resets. */
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
    <div className={cn(PAGE_STACK, PAGE_ENTER)}>
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between md:gap-6">
        <div className="min-w-0 space-y-2">
          <h1 className={PAGE_TITLE}>Resume AI rewrite</h1>
          <p className={PAGE_DESCRIPTION}>
            Tailored for <span className="font-medium text-foreground">{context.targetRole}</span>
          </p>
        </div>
        <Badge
          variant="secondary"
          className="w-fit max-w-full gap-2 truncate border-border/50 px-3 py-1.5 font-mono text-xs uppercase shadow-sm backdrop-blur-sm transition-shadow duration-300 motion-safe:hover:shadow-md"
        >
          <Sparkles className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="truncate">{context.fileName}</span>
        </Badge>
      </div>

      <Card className="overflow-hidden shadow-depth transition-[box-shadow,transform] duration-500 ease-out motion-safe:hover:shadow-depth-lg">
        <CardContent className="p-0">
          {phase === "idle" ? (
            <div className="relative flex min-h-[min(440px,70vh)] flex-col items-center justify-center gap-8 overflow-hidden px-6 py-16 text-center">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,hsl(var(--primary)/0.12),transparent_55%)]"
              />
              <div className="relative flex flex-col items-center gap-8">
                <div className="relative">
                  <div className="absolute inset-0 rounded-2xl bg-primary/20 blur-2xl motion-safe:animate-icon-halo" />
                  <div className="relative grid h-16 w-16 place-items-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/15 to-primary/5 shadow-depth ring-1 ring-primary/15">
                    <Wand2 className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="max-w-lg space-y-3 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-700 motion-safe:delay-100">
                  {rewriteError ? (
                    <div
                      role="alert"
                      className="rounded-lg border border-destructive/35 bg-destructive/10 px-4 py-3 text-left text-sm leading-relaxed text-destructive"
                    >
                      <div className="flex gap-2">
                        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
                        <span>{rewriteError}</span>
                      </div>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Button type="button" size="sm" className="gap-1.5" onClick={onGenerate}>
                          Try again
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setRewriteError(null)}
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ) : null}
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">AI resume rewriter</h2>
                  <p className={PAGE_DESCRIPTION}>
                    Generate an AI-optimized version of your resume tailored specifically for this role.
                    The AI will enhance bullet points, inject keywords, and strengthen your impact
                    statements.
                  </p>
                  <p className="text-xs text-muted-foreground/90">
                    Nothing is sent to a server in this preview—timing is simulated locally.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Prefer to skip the wait?{" "}
                    <Link
                      href="/app/rewrites?sample=1"
                      className="font-medium text-primary underline-offset-4 hover:underline"
                    >
                      Open a finished sample rewrite
                    </Link>
                    .
                  </p>
                </div>
                <Button size="lg" className="gap-2 px-8 shadow-depth motion-safe:hover:shadow-glow" onClick={onGenerate}>
                  <Wand2 className="h-4 w-4" />
                  Generate AI rewrite
                </Button>
              </div>
            </div>
          ) : null}

          {phase === "loading" ? (
            <div className="relative flex min-h-[min(440px,70vh)] flex-col items-center justify-center gap-10 overflow-hidden px-6 py-16">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,hsl(var(--primary)/0.14),transparent_60%)]"
              />
              <div className="relative flex flex-col items-center gap-8">
                <div className="relative grid h-20 w-20 place-items-center">
                  <div className="absolute inset-0 rounded-full border-2 border-muted/40" />
                  <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary motion-safe:animate-spin motion-safe:[animation-duration:1.1s]" />
                  <div className="relative grid h-14 w-14 place-items-center rounded-2xl border border-primary/30 bg-primary/10 shadow-inner">
                    <Loader2 className="h-7 w-7 animate-spin text-primary motion-safe:[animation-duration:1.4s]" />
                  </div>
                </div>
                <div className="w-full max-w-md space-y-3">
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span className="font-medium text-foreground">Rewriting bullets</span>
                    <span className="shrink-0 text-muted-foreground">Gemini · v1</span>
                  </div>
                  {[100, 90, 75, 60].map((w, i) => (
                    <Skeleton
                      key={i}
                      className="h-3"
                      style={{ width: `${w}%`, animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                  <p className="text-center text-xs leading-relaxed text-muted-foreground">
                    Applying JD keywords, tightening metrics, and preserving your voice…
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {phase === "result" ? (
            <div className="space-y-0">
              {showSampleRibbon ? (
                <div className="border-b border-primary/20 bg-primary/[0.08] px-6 py-3 text-center text-xs leading-relaxed text-muted-foreground md:px-10">
                  <span className="font-medium text-foreground">Demo tip:</span> you&apos;re viewing a
                  pre-generated rewrite for this workspace. Use{" "}
                  <span className="font-medium text-foreground">Start over</span> to run the simulated
                  flow from scratch.
                </div>
              ) : null}
              <div className="border-b border-border/50 bg-gradient-to-r from-primary/[0.14] via-primary/[0.05] to-transparent px-6 py-9 md:px-10">
                <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                      <CheckCircle2 className="h-4 w-4 shrink-0" />
                      Rewrite complete
                    </div>
                    <h2 className="text-2xl font-semibold tracking-[-0.02em] text-foreground md:text-3xl">
                      {result.headline}
                    </h2>
                    <p className={cn(PAGE_DESCRIPTION, "max-w-2xl")}>{result.summary}</p>
                  </div>
                  <Button variant="outline" className="shrink-0" onClick={onReset}>
                    Start over
                  </Button>
                </div>
              </div>

              <div className="space-y-8 px-6 py-9 md:px-10">
                <div>
                  <p className={cn("mb-3", OVERLINE)}>Keyword injections</p>
                  <div className="flex flex-wrap gap-2">
                    {result.keywordInjections.map((k) => (
                      <Badge
                        key={k}
                        variant="outline"
                        className="border-primary/30 bg-primary/5 transition-colors duration-200 motion-safe:hover:border-primary/45 motion-safe:hover:bg-primary/10"
                      >
                        {k}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Separator className="bg-border/50" />

                <div className="space-y-5">
                  <p className={OVERLINE}>Before → after</p>
                  <div className="space-y-6">
                    {result.bullets.map((b, i) => (
                      <div
                        key={b.id}
                        className={cn(
                          "grid gap-4 rounded-xl border border-border/50 bg-gradient-to-br from-muted/15 to-muted/5 p-4 shadow-sm transition-[box-shadow,border-color,transform] duration-300 ease-out md:grid-cols-2 md:p-6",
                          "motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500",
                          "motion-safe:hover:-translate-y-px motion-safe:hover:shadow-depth"
                        )}
                        style={{ animationDelay: `${i * 90}ms` }}
                      >
                        <div className="min-w-0 space-y-2">
                          <p className={OVERLINE}>Before</p>
                          <p className="text-sm leading-relaxed text-muted-foreground">{b.before}</p>
                        </div>
                        <div className="min-w-0 space-y-2 border-t border-border/50 pt-4 md:border-l md:border-t-0 md:pl-6 md:pt-0">
                          <p className={OVERLINE_ACCENT}>After</p>
                          <p className="text-sm leading-relaxed text-foreground">{b.after}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}

export const ResumeRewriteFlow = memo(ResumeRewriteFlowImpl);
