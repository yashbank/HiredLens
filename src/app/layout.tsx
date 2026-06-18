import type { Metadata } from "next";
import {
  Inter,
  Space_Grotesk,
  Bricolage_Grotesque,
  Instrument_Serif,
  JetBrains_Mono
} from "next/font/google";

import "@/app/globals.css";
import { AmbientBackground } from "@/components/ambient-background";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { getPublicAppUrl } from "@/lib/env";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap"
});
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap"
});
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap"
});
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap"
});

const siteUrl = getPublicAppUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(`${siteUrl}/`) : undefined,
  title: "HiredLens — AI Career Intelligence",
  description:
    "A tri-theme, motion-rich UI showcase: resume insights, keyword analysis, AI rewrites, and mock interviews.",
  ...(siteUrl
    ? {
        openGraph: {
          type: "website",
          url: siteUrl,
          siteName: "HiredLens",
          title: "HiredLens — AI Career Intelligence",
          description: "Three design languages, one AI career platform."
        },
        twitter: {
          card: "summary_large_image",
          title: "HiredLens — AI Career Intelligence",
          description: "Three design languages, one AI career platform."
        }
      }
    : {})
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        inter.variable,
        spaceGrotesk.variable,
        bricolage.variable,
        instrumentSerif.variable,
        jetbrainsMono.variable
      )}
    >
      <body>
        <ThemeProvider>
          <AmbientBackground />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
