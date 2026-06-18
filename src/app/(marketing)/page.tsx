"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  Check,
  FileText,
  Layers,
  Mic,
  Palette,
  Play,
  Sparkles,
  Star,
  Target,
  Wand2,
  Zap
} from "lucide-react";

import { AnimatedNumber } from "@/components/motion/animated-number";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Spotlight, Tilt } from "@/components/motion/interactive";
import { ThemeSwitcherCards } from "@/components/theme-switcher";
import { HeroOrb } from "@/components/three/hero-orb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel } from "@/components/ui/carousel";
import { Marquee } from "@/components/ui/marquee";
import { DEMO_CREDENTIALS } from "@/lib/demo-auth";
import { cn } from "@/lib/utils";

const SKILLS = [
  "ATS scoring", "gRPC", "SLO ownership", "Keyword match", "AI rewrites", "Mock interviews",
  "Skill roadmap", "Q&A prep", "Semantic fit", "Multi-region", "OpenTelemetry", "Canary deploys"
];

const FEATURES = [
  { icon: Target, title: "Keyword analysis", desc: "Semantic match of resume language vs. the posting — matched and missing chips, weighted by impact.", span: true },
  { icon: Wand2, title: "AI rewrites", desc: "Before/after bullet rewrites with keyword injection and quantified outcomes.", span: false },
  { icon: BarChart3, title: "Overview score", desc: "North-star match, ATS safety, and prioritized gaps at a glance.", span: false },
  { icon: Mic, title: "Mock interviews", desc: "Voice or text practice with a role-tuned AI persona.", span: false },
  { icon: BookOpen, title: "Q&A prep", desc: "Behavioral and system-design prompts aligned to staff rubrics.", span: false },
  { icon: FileText, title: "Skill roadmap", desc: "A sequenced upskilling plan inferred from your gaps.", span: false }
];

const STATS = [
  { value: 3, suffix: "", label: "Design languages" },
  { value: 10, suffix: "+", label: "Polished surfaces" },
  { value: 60, suffix: "fps", label: "Motion target" },
  { value: 0, suffix: "", label: "Backends required" }
];

const TESTIMONIALS = [
  { quote: "The tri-theme switch is the slickest portfolio detail I've seen — one codebase, three identities.", name: "Design lead", role: "Series B fintech" },
  { quote: "Genuinely feels like a $20k product site. The motion and glass work is immaculate.", name: "Frontend architect", role: "Dev tools" },
  { quote: "Aurora for focus, Porcelain for clarity, Pulse for energy. Each one feels intentional.", name: "Hiring manager", role: "Platform org" }
];

const TIERS = [
  { name: "Free", price: "$0", note: "Explore the demo", features: ["1 active analysis", "Keyword spectrum", "Overview score"], highlight: false },
  { name: "Pro", price: "$24", note: "For active job seekers", features: ["Unlimited analyses", "AI rewrites & exports", "Mock interview studio", "All three themes"], highlight: true },
  { name: "Team", price: "Custom", note: "For career programs", features: ["Seats & SSO", "Shared workspaces", "Audit & retention"], highlight: false }
];

const EASE = [0.16, 1, 0.3, 1] as const;

export default function MarketingHomePage() {
  return (
    <div className="overflow-clip">
      {/* HERO */}
      <section className="relative mx-auto grid max-w-6xl gap-10 px-4 pb-16 pt-12 md:px-8 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:pb-24 lg:pt-20">
        <div className="space-y-7">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <Badge variant="soft" className="gap-2 px-3 py-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Tri-theme UI/UX showcase
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.05, ease: EASE }}
            className="text-balance font-display text-5xl font-semibold leading-[1.04] tracking-tight text-foreground md:text-6xl lg:text-7xl"
          >
            Your AI lens for the{" "}
            <span className="text-gradient text-gradient-animate">future of work</span>.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.12, ease: EASE }}
            className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Optimize your resume, close keyword gaps, and rehearse interviews with role-specific
            guidance. The same product rendered in three distinct design languages — switch live.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18, ease: EASE }}
            className="flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="xl" variant="gradient" className="shine">
              <Link href="/login">
                <Play className="h-4 w-4" />
                Open live demo
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link href="/#features">
                Explore features
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex flex-wrap items-center gap-x-2 gap-y-1 rounded-full border border-border/60 bg-background/40 px-3 py-1.5 text-xs text-muted-foreground backdrop-blur-sm"
          >
            <span className="font-medium text-foreground">Demo login</span>
            <span className="font-mono">{DEMO_CREDENTIALS.email}</span>
            <span className="text-border">·</span>
            <span className="font-mono">{DEMO_CREDENTIALS.password}</span>
          </motion.div>
        </div>

        {/* 3D showcase */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.1, ease: EASE }}
          className="relative mx-auto aspect-square w-full max-w-md"
        >
          <Card variant="glass" className="absolute inset-0 overflow-hidden">
            <HeroOrb className="absolute inset-0" />
          </Card>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -left-3 top-10 rounded-[var(--radius)] glass glass-edge px-3.5 py-2.5 shadow-floaty"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">ATS score</p>
            <p className="font-display text-xl font-semibold tabular-nums text-foreground">92%</p>
          </motion.div>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 bottom-12 rounded-[var(--radius)] glass glass-edge px-3.5 py-2.5 shadow-floaty"
          >
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Impact</p>
            <p className="font-display text-xl font-semibold tabular-nums text-emerald-500">+9%</p>
          </motion.div>
        </motion.div>
      </section>

      {/* SKILLS MARQUEE */}
      <section className="border-y border-border/40 bg-[hsl(var(--surface)/0.3)] py-5 backdrop-blur-sm">
        <Marquee>
          {SKILLS.map((s) => (
            <span key={s} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary/60" />
              {s}
            </span>
          ))}
        </Marquee>
      </section>

      {/* THEMES */}
      <section id="themes" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <div className="space-y-5">
              <Badge variant="soft" className="gap-2 px-3 py-1.5">
                <Palette className="h-3.5 w-3.5" />
                The headline trick
              </Badge>
              <h2 className="text-balance font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                One product. <span className="text-gradient">Three design languages.</span>
              </h2>
              <p className="max-w-lg text-pretty leading-relaxed text-muted-foreground">
                Most portfolios ship one look. HiredLens ships three — color, typography, surface
                treatment, and motion personality all swap from a single token engine. Try it now;
                the whole site re-skins with a circular reveal.
              </p>
              <ul className="space-y-2.5 text-sm text-muted-foreground">
                {["Token-driven theming (no duplicated UI)", "Per-theme fonts, radius, shadow & motion", "View-Transitions circular reveal on switch"].map((t) => (
                  <li key={t} className="flex items-center gap-2.5">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-primary">
                      <Check className="h-3 w-3" strokeWidth={3} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Card variant="glass" className="p-6 md:p-8">
              <p className="mb-4 text-sm font-medium text-foreground">Switch the entire experience</p>
              <ThemeSwitcherCards />
              <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
                Your choice persists across every page, including the dashboard.
              </p>
            </Card>
          </Reveal>
        </div>
      </section>

      {/* FEATURES */}
      <section id="features" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-8">
        <Reveal>
          <div className="mb-10 max-w-2xl space-y-3">
            <Badge variant="soft" className="gap-2 px-3 py-1.5">
              <Layers className="h-3.5 w-3.5" />
              Everything in one workspace
            </Badge>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Built for the whole job hunt.
            </h2>
          </div>
        </Reveal>

        <Stagger className="grid gap-4 md:grid-cols-2 lg:grid-cols-3" gap={0.08}>
          {FEATURES.map((f) => (
            <StaggerItem key={f.title} className={cn(f.span && "md:col-span-2 lg:col-span-2")}>
              <Tilt className="h-full" max={6}>
                <Spotlight className="h-full">
                  <Card variant="glass" className="group h-full p-6 md:p-7">
                    <div className="grid h-11 w-11 place-items-center rounded-xl bg-grad-brand text-white shadow-glow">
                      <f.icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-5 font-display text-xl font-semibold text-foreground">{f.title}</h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                  </Card>
                </Spotlight>
              </Tilt>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 py-12 md:px-8">
        <Card variant="gradient" className="overflow-hidden">
          <CardContent className="grid grid-cols-2 gap-6 p-8 md:grid-cols-4 md:p-10">
            {STATS.map((s) => (
              <Reveal key={s.label}>
                <div className="text-center">
                  <p className="font-display text-4xl font-semibold tabular-nums text-foreground md:text-5xl">
                    <AnimatedNumber value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </CardContent>
        </Card>
      </section>

      {/* TESTIMONIALS */}
      <section className="mx-auto max-w-3xl px-4 py-20 md:px-8">
        <Reveal>
          <div className="mb-8 text-center">
            <h2 className="font-display text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              What people notice first
            </h2>
          </div>
        </Reveal>
        <Carousel
          slides={TESTIMONIALS.map((t) => (
            <Card key={t.name} variant="glass" className="mx-2 p-8 text-center md:p-10">
              <div className="mb-4 flex justify-center gap-1 text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-pretty font-display text-xl leading-relaxed text-foreground md:text-2xl">
                “{t.quote}”
              </p>
              <p className="mt-5 text-sm font-medium text-foreground">{t.name}</p>
              <p className="text-xs text-muted-foreground">{t.role}</p>
            </Card>
          ))}
        />
      </section>

      {/* PRICING */}
      <section id="pricing" className="mx-auto max-w-6xl scroll-mt-24 px-4 py-20 md:px-8">
        <Reveal>
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Simple, honest pricing
            </h2>
            <p className="mt-3 text-muted-foreground">A demo, of course — but priced like the real thing.</p>
          </div>
        </Reveal>
        <Stagger className="grid gap-4 md:grid-cols-3" gap={0.1}>
          {TIERS.map((tier) => (
            <StaggerItem key={tier.name}>
              <Card
                variant={tier.highlight ? "gradient" : "glass"}
                className={cn("relative h-full p-7", tier.highlight && "shadow-glow")}
              >
                {tier.highlight ? (
                  <Badge variant="gradient" className="absolute -top-2.5 left-7">
                    Most popular
                  </Badge>
                ) : null}
                <p className="text-sm font-medium text-muted-foreground">{tier.name}</p>
                <p className="mt-2 font-display text-4xl font-semibold text-foreground">
                  {tier.price}
                  {tier.price.startsWith("$") && tier.price !== "$0" ? (
                    <span className="text-base font-normal text-muted-foreground">/mo</span>
                  ) : null}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{tier.note}</p>
                <ul className="mt-6 space-y-2.5 text-sm">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-foreground/90">
                      <Check className="h-4 w-4 text-primary" strokeWidth={2.5} />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  variant={tier.highlight ? "gradient" : "outline"}
                  className={cn("mt-7 w-full", tier.highlight && "shine")}
                >
                  <Link href="/login">{tier.highlight ? "Start Pro demo" : "Choose"}</Link>
                </Button>
              </Card>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-24 md:px-8">
        <Reveal>
          <Card variant="glass" className="relative overflow-hidden p-10 text-center md:p-16">
            <div aria-hidden className="pointer-events-none absolute inset-0 bg-grad-brand opacity-[0.07]" />
            <div className="relative space-y-6">
              <Zap className="mx-auto h-8 w-8 text-primary" />
              <h2 className="text-balance font-display text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
                See it in motion.
              </h2>
              <p className="mx-auto max-w-xl text-muted-foreground">
                Jump straight into the dashboard — no sign-up needed. Then switch themes and watch
                everything transform.
              </p>
              <Button asChild size="xl" variant="gradient" className="shine">
                <Link href="/login">
                  Enter the demo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </Card>
        </Reveal>
      </section>
    </div>
  );
}
