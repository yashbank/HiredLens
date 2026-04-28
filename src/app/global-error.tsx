"use client";

import Link from "next/link";

import "./globals.css";

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-background font-sans text-foreground antialiased">
        <div className="flex min-h-dvh flex-col items-center justify-center gap-6 px-6 py-16">
          <div className="max-w-md space-y-3 text-center">
            <h1 className="text-xl font-semibold tracking-tight">HiredLens couldn&apos;t start</h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              The application shell failed to load. Try reloading the page. If you just deployed,
              wait a moment and try again.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-6 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
              onClick={() => reset()}
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex h-10 items-center justify-center rounded-md border border-input bg-background px-6 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Go home
            </Link>
          </div>
          {process.env.NODE_ENV === "development" ? (
            <p className="max-w-lg text-center font-mono text-xs text-muted-foreground">{error.message}</p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
