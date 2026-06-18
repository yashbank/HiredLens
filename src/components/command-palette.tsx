"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import { ArrowRight, Palette, Search } from "lucide-react";

import { useThemeId } from "@/components/theme-provider";
import { appNav, appNavSecondary } from "@/data/nav";
import { THEME_IDS, THEMES } from "@/lib/themes";

const COMMAND_EVENT = "hiredlens:command";

/** Imperatively open the palette from anywhere (e.g. the topbar search button). */
export function openCommandPalette() {
  window.dispatchEvent(new Event(COMMAND_EVENT));
}

export function CommandPalette() {
  const router = useRouter();
  const { setThemeId } = useThemeId();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(COMMAND_EVENT, onEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(COMMAND_EVENT, onEvent);
    };
  }, []);

  const run = React.useCallback((fn: () => void) => {
    setOpen(false);
    fn();
  }, []);

  return (
    <Command.Dialog
      open={open}
      onOpenChange={setOpen}
      label="Command menu"
      className="fixed left-1/2 top-[18%] z-[100] w-[min(40rem,calc(100vw-2rem))] -translate-x-1/2"
      overlayClassName="fixed inset-0 z-[99] bg-background/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=open]:fade-in"
      contentClassName="overflow-hidden rounded-[var(--radius)] glass-strong glass-edge shadow-floaty data-[state=open]:animate-scale-in"
    >
      <div className="flex items-center gap-2 border-b border-border/60 px-4">
        <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
        <Command.Input
          autoFocus
          placeholder="Search pages, switch theme, run actions…"
          className="h-12 w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
        />
        <kbd className="hidden rounded border border-border/70 bg-muted/40 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:block">
          ESC
        </kbd>
      </div>

      <Command.List className="max-h-[min(24rem,60vh)] overflow-y-auto p-2 scrollbar-thin">
        <Command.Empty className="py-10 text-center text-sm text-muted-foreground">
          No results found.
        </Command.Empty>

        <Command.Group
          heading="Navigate"
          className="px-1 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground [&_[cmdk-group-items]]:mt-1 [&_[cmdk-group-items]]:space-y-0.5"
        >
          {[...appNav, ...appNavSecondary].map((item) => (
            <Command.Item
              key={item.href}
              value={`${item.title} ${item.description ?? ""}`}
              onSelect={() => run(() => router.push(item.href))}
              className="group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground aria-selected:bg-primary/10 aria-selected:text-foreground"
            >
              <item.icon className="h-4 w-4 text-muted-foreground group-aria-selected:text-primary" />
              <span className="flex-1 font-medium normal-case tracking-normal">{item.title}</span>
              <ArrowRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-aria-selected:opacity-100" />
            </Command.Item>
          ))}
        </Command.Group>

        <Command.Group
          heading="Theme"
          className="px-1 py-1 text-[11px] font-medium uppercase tracking-wider text-muted-foreground [&_[cmdk-group-items]]:mt-1 [&_[cmdk-group-items]]:space-y-0.5"
        >
          {THEME_IDS.map((id) => {
            const meta = THEMES[id];
            const [a, b, c] = meta.swatches;
            return (
              <Command.Item
                key={id}
                value={`theme ${meta.name} ${meta.tagline}`}
                onSelect={() => run(() => setThemeId(id))}
                className="group flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-sm text-foreground aria-selected:bg-primary/10"
              >
                <span
                  className="h-4 w-4 rounded-full ring-1 ring-white/20"
                  style={{
                    backgroundImage: `linear-gradient(135deg, hsl(${a}), hsl(${b}) 55%, hsl(${c}))`
                  }}
                />
                <span className="flex-1 font-medium normal-case tracking-normal">
                  Switch to {meta.name}
                </span>
                <Palette className="h-3.5 w-3.5 opacity-0 transition-opacity group-aria-selected:opacity-100" />
              </Command.Item>
            );
          })}
        </Command.Group>
      </Command.List>
    </Command.Dialog>
  );
}
