import * as React from "react";
import dynamic from "next/dynamic";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import { TooltipProvider } from "@/components/ui/tooltip";

const DemoWelcomeBanner = dynamic(
  () =>
    import("@/components/demo/demo-welcome-banner").then((m) => ({
      default: m.DemoWelcomeBanner
    })),
  { ssr: true, loading: () => null }
);

export function AppLayout({
  children,
  title
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <TooltipProvider delayDuration={180}>
      <div className="min-h-dvh bg-gradient-to-b from-background via-background to-muted/20">
        <div className="flex">
          <AppSidebar />
          <div className="flex min-w-0 flex-1 flex-col">
            <AppTopbar title={title} />
            <main className="relative min-w-0 flex-1 px-4 py-10 md:px-8 md:py-14">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_50%_-30%,hsl(var(--primary)/0.12),transparent_55%),radial-gradient(ellipse_55%_45%_at_100%_0%,hsl(280_45%_52%/0.07),transparent_50%)] motion-safe:animate-ambient-drift"
              />
              <div className="relative mx-auto max-w-6xl">
                <DemoWelcomeBanner />
                {children}
              </div>
            </main>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}

