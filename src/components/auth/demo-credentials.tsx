"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Copy, Eye, EyeOff, Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { DEMO_CREDENTIALS, markDemoAuthenticated, POST_LOGIN_ROUTE } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";

function CredRow({
  label,
  value,
  mono = true,
  masked = false
}: {
  label: string;
  value: string;
  mono?: boolean;
  masked?: boolean;
}) {
  const [copied, setCopied] = React.useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success(`${label} copied`, { description: value });
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      toast.error("Clipboard unavailable");
    }
  }

  return (
    <div className="flex items-center justify-between gap-2 rounded-md border border-border/50 bg-background/40 px-2.5 py-1.5">
      <div className="min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          {label}
        </p>
        <p className={cn("truncate text-[13px] text-foreground", mono && "font-mono")}>
          {masked ? "•".repeat(value.length) : value}
        </p>
      </div>
      <button
        onClick={copy}
        aria-label={`Copy ${label}`}
        className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
      >
        {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
    </div>
  );
}

export function DemoCredentials({ className }: { className?: string }) {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [reveal, setReveal] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [show, setShowPassword] = React.useState(false);

  React.useEffect(() => {
    const t = window.setTimeout(() => setReveal(true), 700);
    return () => window.clearTimeout(t);
  }, []);

  function enterDemo() {
    setLoading(true);
    markDemoAuthenticated();
    toast.success("Signing in as Alex Rivera…");
    window.setTimeout(() => router.push(POST_LOGIN_ROUTE), 650);
  }

  return (
    <div
      className={cn(
        "fixed bottom-4 left-4 z-50 w-[min(20rem,calc(100vw-2rem))] sm:bottom-6 sm:left-6",
        className
      )}
    >
      <AnimatePresence>
        {reveal ? (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 240, damping: 24 }}
            className="group rounded-[var(--radius)] border border-border/60 bg-[hsl(var(--surface)/0.55)] p-3 shadow-floaty backdrop-blur-2xl transition-colors duration-300 hover:bg-[hsl(var(--surface)/0.82)]"
          >
            <div className="mb-2.5 flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <p className="text-xs font-semibold text-foreground">Demo access</p>
              <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                <Sparkles className="h-3 w-3" />
                no sign-up
              </span>
            </div>

            <div className="space-y-1.5">
              <CredRow label="Email" value={DEMO_CREDENTIALS.email} />
              <div className="relative">
                <CredRow label="Password" value={DEMO_CREDENTIALS.password} masked={!show} />
                <button
                  onClick={() => setShowPassword((s) => !s)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-9 top-1/2 grid h-7 w-7 -translate-y-1/2 place-items-center rounded-md text-muted-foreground transition-colors hover:text-primary"
                >
                  {show ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                </button>
              </div>
            </div>

            <Button
              variant="gradient"
              onClick={enterDemo}
              disabled={loading}
              className="mt-3 w-full shine"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Entering…
                </>
              ) : (
                <>
                  Enter demo
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
            <p className="mt-2 text-center text-[10px] leading-relaxed text-muted-foreground">
              Prototype · mock data · no real authentication
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
