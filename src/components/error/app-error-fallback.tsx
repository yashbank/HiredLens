"use client";

import Link from "next/link";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type AppErrorFallbackProps = {
  error: Error & { digest?: string };
  reset: () => void;
  /** Dashboard: emphasize app home + overview. */
  variant?: "generic" | "dashboard";
};

export function AppErrorFallback({ error, reset, variant = "generic" }: AppErrorFallbackProps) {
  const isDashboard = variant === "dashboard";

  return (
    <div className="mx-auto flex min-w-0 max-w-lg flex-col gap-6 px-4 py-16 md:px-8">
      <Card className="border-destructive/25 shadow-depth">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="h-5 w-5 shrink-0" aria-hidden />
            <CardTitle className="text-lg font-semibold tracking-tight text-foreground">
              {isDashboard ? "This workspace hit a snag" : "Something went wrong"}
            </CardTitle>
          </div>
          <CardDescription className="text-sm leading-relaxed text-muted-foreground">
            {isDashboard
              ? "A part of the dashboard failed to render. You can safely retry—your saved data in this demo lives in the browser session only."
              : "An unexpected error occurred. Try again, or head home if the problem persists."}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Button type="button" className="gap-2" onClick={() => reset()}>
            <RefreshCw className="h-4 w-4 shrink-0" aria-hidden />
            Try again
          </Button>
          {isDashboard ? (
            <Button type="button" variant="outline" asChild className="gap-2">
              <Link href="/app/overview">
                <Home className="h-4 w-4 shrink-0" aria-hidden />
                Overview
              </Link>
            </Button>
          ) : (
            <Button type="button" variant="outline" asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4 shrink-0" aria-hidden />
                Home
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
      {process.env.NODE_ENV === "development" ? (
        <p className="rounded-md border border-border/60 bg-muted/30 px-3 py-2 font-mono text-xs text-muted-foreground">
          {error.message}
          {error.digest ? ` · digest ${error.digest}` : ""}
        </p>
      ) : null}
    </div>
  );
}
