"use client";

import { AppErrorFallback } from "@/components/error/app-error-fallback";

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <AppErrorFallback error={error} reset={reset} variant="generic" />;
}
