"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { appNav, appNavSecondary } from "@/data/nav";
import type { NavItem } from "@/types/nav";
import { cn } from "@/lib/utils";

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname();
  const Icon = item.icon;
  const active = pathname === item.href || pathname?.startsWith(`${item.href}/`);

  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex h-11 items-center gap-3 rounded-[calc(var(--radius)-6px)] px-3 text-sm font-medium transition-colors duration-200",
        active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {active ? (
        <motion.span
          layoutId="sidebar-active"
          transition={{ type: "spring", stiffness: 380, damping: 32 }}
          className="absolute inset-0 rounded-[calc(var(--radius)-6px)] bg-primary/[0.12] ring-1 ring-primary/25"
        />
      ) : null}
      <span
        className={cn(
          "relative z-10 grid h-7 w-7 shrink-0 place-items-center rounded-md border transition-colors duration-200",
          active
            ? "border-primary/30 bg-primary/15 text-primary"
            : "border-border/50 bg-background/40 text-muted-foreground group-hover:border-primary/20 group-hover:text-foreground"
        )}
      >
        <Icon className="h-4 w-4" />
      </span>
      <span className="relative z-10 truncate">{item.title}</span>
      {active ? (
        <span className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
      ) : null}
    </Link>
  );
}

/** Shared nav body for desktop aside + mobile sheet. */
export function SidebarNavBody() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="px-5 py-5">
        <Logo />
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overflow-x-hidden px-3 pb-2 scrollbar-thin">
        <p className="px-3 pb-1 pt-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Workspace
        </p>
        {appNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}

        <p className="px-3 pb-1 pt-4 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/70">
          Account
        </p>
        {appNavSecondary.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      <div className="space-y-3 p-3">
        <div className="gradient-border overflow-hidden rounded-[var(--radius)] bg-card/40 p-3.5">
          <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="h-4 w-4 text-primary" />
            Pro trial
          </div>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
            18 days left · unlimited analyses & exports.
          </p>
          <Button variant="gradient" size="sm" className="mt-3 w-full shine">
            Upgrade
          </Button>
        </div>
        <Button variant="outline" className="w-full">
          + New analysis
        </Button>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="sticky top-0 hidden h-dvh w-[17rem] shrink-0 border-r border-border/50 bg-[hsl(var(--surface)/0.4)] backdrop-blur-xl md:flex">
      <SidebarNavBody />
    </aside>
  );
}
