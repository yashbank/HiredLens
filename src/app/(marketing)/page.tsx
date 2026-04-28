import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { OVERLINE } from "@/lib/ui";
import { cn } from "@/lib/utils";

export default function MarketingHomePage() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-10 md:px-8 md:py-14">
      <div className="grid gap-10 md:grid-cols-2 md:items-center md:gap-12">
        <div id="overview" className="scroll-mt-28 space-y-6">
          <p className={cn(OVERLINE, "tracking-[0.2em] text-muted-foreground")}>
            Intelligence for talent
          </p>
          <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            Your AI-powered lens for the future of work.
          </h1>
          <p className="text-pretty text-sm leading-relaxed text-muted-foreground md:text-base">
            HiredLens helps you optimize your resume, close keyword gaps, and practice interviews
            with role-specific AI guidance—so you walk in prepared.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/signup">Optimize your career</Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/login">View demo</Link>
            </Button>
          </div>
        </div>

        <Card
          id="features"
          className="scroll-mt-28 shadow-depth transition-[box-shadow,transform] duration-500 ease-out motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-depth-lg"
        >
          <CardHeader>
            <CardTitle className="text-xl font-semibold tracking-tight">Preview</CardTitle>
            <CardDescription>Shell UI only (pages coming next).</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/10 p-3 transition-colors duration-200 motion-safe:hover:border-primary/20 motion-safe:hover:bg-muted/25">
              <span className="text-sm font-medium">ATS score</span>
              <span className="text-sm tabular-nums text-muted-foreground">92%</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/10 p-3 transition-colors duration-200 motion-safe:hover:border-primary/20 motion-safe:hover:bg-muted/25">
              <span className="text-sm font-medium">Keyword gaps</span>
              <span className="text-sm tabular-nums text-muted-foreground">6</span>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border/60 bg-muted/10 p-3 transition-colors duration-200 motion-safe:hover:border-primary/20 motion-safe:hover:bg-muted/25">
              <span className="text-sm font-medium">Impact potential</span>
              <span className="text-sm tabular-nums text-muted-foreground">+9%</span>
            </div>
            <div id="pricing" className="scroll-mt-28">
              <Button asChild className="w-full">
                <Link href="/app">Start analysis</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

