"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { appNav, appNavSecondary } from "@/data/nav";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

function NavLink({
  href,
  title,
  description,
  icon: Icon
}: {
  href: string;
  title: string;
  description?: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  const pathname = usePathname();
  const active = pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant={active ? "default" : "ghost"}
          className={cn("h-10 w-full justify-start gap-2 rounded-lg", active && "shadow-none")}
        >
          <Link href={href}>
            <Icon className="h-4 w-4 shrink-0" />
            <span className="truncate">{title}</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right" className="max-w-[260px] space-y-1 p-3">
        <p className="text-xs font-semibold text-foreground">{title}</p>
        {description ? (
          <p className="text-[11px] leading-relaxed text-muted-foreground">{description}</p>
        ) : null}
      </TooltipContent>
    </Tooltip>
  );
}

/** Shared nav body: use inside desktop `<aside>` and mobile `<Sheet>`. */
export function SidebarNavBody() {
  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex items-center gap-2 px-5 py-4">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground">
          <span className="text-sm font-semibold">H</span>
        </div>
        <div className="min-w-0 leading-tight">
          <div className="truncate text-sm font-semibold">HiredLens</div>
          <div className="truncate text-xs text-muted-foreground">AI career intelligence</div>
        </div>
      </div>

      <div className="px-4">
        <Separator />
      </div>

      <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto overflow-x-hidden p-3 scrollbar-thin">
        {appNav.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </nav>

      <div className="px-4 pb-3">
        <Separator />
      </div>

      <nav className="space-y-1 px-3 pb-3">
        {appNavSecondary.map((item) => (
          <NavLink
            key={item.href}
            href={item.href}
            title={item.title}
            description={item.description}
            icon={item.icon}
          />
        ))}
      </nav>

      <div className="px-3 pb-4">
        <Button className="w-full rounded-lg shadow-sm" variant="default">
          New analysis
        </Button>
      </div>
    </div>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden h-dvh w-72 shrink-0 border-r border-border/50 bg-background/50 backdrop-blur-md supports-[backdrop-filter]:bg-background/70 md:flex">
      <SidebarNavBody />
    </aside>
  );
}
