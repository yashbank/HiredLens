import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/app/globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { getPublicAppUrl } from "@/lib/env";

const inter = Inter({ subsets: ["latin"] });

const siteUrl = getPublicAppUrl();

export const metadata: Metadata = {
  metadataBase: siteUrl ? new URL(`${siteUrl}/`) : undefined,
  title: "HiredLens",
  description: "AI career intelligence",
  ...(siteUrl
    ? {
        openGraph: {
          type: "website",
          url: siteUrl,
          siteName: "HiredLens",
          title: "HiredLens",
          description: "AI career intelligence"
        },
        twitter: {
          card: "summary_large_image",
          title: "HiredLens",
          description: "AI career intelligence"
        }
      }
    : {})
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

