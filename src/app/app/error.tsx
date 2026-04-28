"use client";

import { AppErrorFallback } from "@/components/error/app-error-fallback";

export default function AppSegmentError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <AppErrorFallback error={error} reset={reset} variant="dashboard" />;
}
