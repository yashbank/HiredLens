"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Bell, LogOut, Menu, Search } from "lucide-react";
import { useMemo } from "react";

import { openCommandPalette } from "@/components/command-palette";
import { ThemeSwitcher } from "@/components/theme-switcher";
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
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { appNav, appNavSecondary } from "@/data/nav";
import { mockCurrentUser } from "@/data/user";

import { SidebarNavBody } from "./app-sidebar";

function useCurrentNav() {
  const pathname = usePathname();
  return useMemo(() => {
    const all = [...appNav, ...appNavSecondary];
    return all.find((i) => pathname === i.href || pathname?.startsWith(`${i.href}/`)) ?? null;
  }, [pathname]);
}

export function AppTopbar() {
  const router = useRouter();
  const current = useCurrentNav();
  const initials = mockCurrentUser.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-40 border-b border-border/50 bg-[hsl(var(--surface)/0.5)] backdrop-blur-xl">
      <div className="flex h-16 items-center gap-2 px-4 md:gap-3 md:px-6 lg:px-8">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[min(100%,17rem)] border-border/50 p-0 sm:max-w-[17rem]">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex h-full flex-col bg-[hsl(var(--surface)/0.85)] backdrop-blur-xl">
              <SidebarNavBody />
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="min-w-0">
            <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
              Dashboard
            </p>
            <h1 className="truncate font-display text-base font-semibold tracking-tight text-foreground">
              {current?.title ?? "Overview"}
            </h1>
          </div>
        </div>

        <button
          onClick={openCommandPalette}
          className="hidden h-9 items-center gap-2 rounded-full border border-border/60 bg-background/40 pl-3 pr-2 text-sm text-muted-foreground backdrop-blur-sm transition-colors hover:border-primary/30 hover:text-foreground sm:flex"
        >
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">Search…</span>
          <kbd className="rounded border border-border/70 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px]">
            ⌘K
          </kbd>
        </button>

        <ThemeSwitcher />

        <Button variant="outline" size="icon" className="relative shrink-0" aria-label="Notifications">
          <Bell className="h-4 w-4" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_hsl(var(--primary))]" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-10 gap-2 px-1.5 sm:px-2">
              <Avatar className="h-8 w-8 ring-2 ring-primary/20">
                <AvatarFallback className="bg-grad-brand text-xs font-semibold text-white">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium lg:inline">{mockCurrentUser.name}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60">
            <DropdownMenuLabel>
              <div className="grid">
                <span className="text-sm font-medium">{mockCurrentUser.name}</span>
                <span className="truncate text-xs font-normal text-muted-foreground">
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
            <DropdownMenuItem
              className="text-destructive focus:text-destructive"
              onClick={() => router.push("/login")}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
