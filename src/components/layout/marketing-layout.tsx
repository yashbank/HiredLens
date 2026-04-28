import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-background via-background to-muted/20">
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:px-8">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
              <span className="text-sm font-semibold">H</span>
            </div>
            <span className="text-sm font-semibold">HiredLens</span>
          </Link>

          <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
            <Link href="/#overview" className="hover:text-foreground">
              Overview
            </Link>
            <Link href="/#features" className="hover:text-foreground">
              Features
            </Link>
            <Link href="/#pricing" className="hover:text-foreground">
              Pricing
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild>
              <Link href="/signup">Start analysis</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}

