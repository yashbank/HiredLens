"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, LogOut, Menu } from "lucide-react";
import { useMemo } from "react";

import { mockCurrentUser } from "@/data/user";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { SidebarNavBody } from "./app-sidebar";

const BREADCRUMB_RULES: { test: (pathname: string) => boolean; current: string }[] = [
  { test: (p) => p === "/app/overview" || p.startsWith("/app/overview/"), current: "OVERVIEW" },
  { test: (p) => p === "/app/keywords" || p.startsWith("/app/keywords/"), current: "KEYWORDS" },
  { test: (p) => p === "/app/rewrites" || p.startsWith("/app/rewrites/"), current: "REWRITES" },
  { test: (p) => p === "/app/skill-roadmap" || p.startsWith("/app/skill-roadmap/"), current: "SKILL ROADMAP" },
  { test: (p) => p === "/app/qa-prep" || p.startsWith("/app/qa-prep/"), current: "Q&A PREP" },
  {
    test: (p) => p === "/app/mock-interview" || p.startsWith("/app/mock-interview/"),
    current: "MOCK INTERVIEW"
  },
  { test: (p) => p === "/app/portfolio" || p.startsWith("/app/portfolio/"), current: "PORTFOLIO" },
  { test: (p) => p === "/app/history" || p.startsWith("/app/history/"), current: "HISTORY" },
  { test: (p) => p === "/app/settings" || p.startsWith("/app/settings/"), current: "SETTINGS" },
  { test: (p) => p === "/app/support" || p.startsWith("/app/support/"), current: "SUPPORT" }
];

function breadcrumbFromPath(pathname: string | null) {
  if (!pathname?.startsWith("/app")) return null;
  const hit = BREADCRUMB_RULES.find((r) => r.test(pathname));
  return hit ? { prefix: "DASHBOARD", current: hit.current } : { prefix: "DASHBOARD", current: "APP" };
}

export function AppTopbar({ title }: { title?: string }) {
  const pathname = usePathname();
  const breadcrumb = useMemo(() => breadcrumbFromPath(pathname), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-background/70 backdrop-blur-md supports-[backdrop-filter]:bg-background/50">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:gap-3 md:px-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[min(100%,18rem)] border-border/50 p-0 sm:max-w-[18rem]"
          >
            <div className="flex h-full flex-col bg-background/95 backdrop-blur-md">
              <SidebarNavBody />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <div className="min-w-0">
            {breadcrumb ? (
              <p className="truncate text-xs font-medium tracking-wide text-muted-foreground">
                <span>{breadcrumb.prefix}</span>
                <span className="mx-1.5 text-muted-foreground/50">›</span>
                <span className="text-foreground/90">{breadcrumb.current}</span>
              </p>
            ) : (
              <div className="truncate text-sm font-semibold">{title ?? "Dashboard"}</div>
            )}
          </div>
        </div>

        <Button variant="outline" size="icon" className="shrink-0" aria-label="Notifications">
          <Bell className="h-4 w-4" />
        </Button>

        <ThemeToggle />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-9 gap-2 px-2">
              <Avatar className="h-7 w-7">
                <AvatarFallback>
                  {mockCurrentUser.name
                    .split(" ")
                    .map((p) => p[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium sm:inline">
                {mockCurrentUser.name}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <div className="grid">
                <span className="text-sm font-medium">{mockCurrentUser.name}</span>
                <span className="text-xs font-normal text-muted-foreground">
                  {mockCurrentUser.email}
                </span>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/app/settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/app/support">Support</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

