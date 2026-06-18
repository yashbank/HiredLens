import * as React from "react";
import dynamic from "next/dynamic";

import { CommandPalette } from "@/components/command-palette";
import { AppSidebar } from "@/components/layout/app-sidebar";
import { AppTopbar } from "@/components/layout/app-topbar";
import { TooltipProvider } from "@/components/ui/tooltip";

const DemoWelcomeBanner = dynamic(
  () =>
    import("@/components/demo/demo-welcome-banner").then((m) => ({
      default: m.DemoWelcomeBanner
    })),
  { loading: () => null }
);

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={150}>
      <div className="relative flex min-h-dvh">
        <AppSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <AppTopbar />
          <main className="relative min-w-0 flex-1 px-4 py-8 md:px-6 md:py-10 lg:px-8">
            <div className="mx-auto w-full max-w-6xl space-y-8">
              <DemoWelcomeBanner />
              {children}
            </div>
          </main>
        </div>
      </div>
      <CommandPalette />
    </TooltipProvider>
  );
}
