"use client";

import * as React from "react";
import Link from "next/link";
import { motion, useScroll, useSpring } from "framer-motion";

import { Logo } from "@/components/brand/logo";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";

export function MarketingLayout({ children }: { children: React.ReactNode }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div className="relative min-h-dvh">
      <motion.div
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-50 h-0.5 origin-left bg-grad-brand"
      />
      <header className="sticky top-0 z-40 border-b border-border/40 bg-[hsl(var(--surface)/0.5)] backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 md:px-8">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-7 text-sm text-muted-foreground md:flex">
            <Link href="/#features" className="transition-colors hover:text-foreground">
              Features
            </Link>
            <Link href="/#themes" className="transition-colors hover:text-foreground">
              Themes
            </Link>
            <Link href="/#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <ThemeSwitcher className="hidden sm:inline-flex" />
            <Button asChild variant="ghost" className="hidden sm:inline-flex">
              <Link href="/login">Sign in</Link>
            </Button>
            <Button asChild variant="gradient" className="shine">
              <Link href="/signup">Get started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="border-t border-border/40 bg-[hsl(var(--surface)/0.3)] backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-muted-foreground sm:flex-row md:px-8">
          <Logo subtitle={undefined} />
          <p>Prototype · tri-theme UI/UX showcase · mock data, no backend.</p>
          <div className="flex gap-5">
            <Link href="/login" className="hover:text-foreground">
              Demo
            </Link>
            <Link href="/#features" className="hover:text-foreground">
              Features
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
