import dynamic from "next/dynamic";

import { PageFeatureFallback } from "@/components/loading/page-feature-fallback";
import { resumeRewriteContext, resumeRewriteResult } from "@/data/resume-rewrite";

const ResumeRewriteFlow = dynamic(
  () =>
    import("@/features/resume-rewrite/resume-rewrite-flow").then((m) => ({
      default: m.ResumeRewriteFlow
    })),
  { loading: () => <PageFeatureFallback />, ssr: true }
);

export default async function RewritesPage({
  searchParams
}: {
  searchParams: Promise<{ sample?: string }>;
}) {
  let sample: string | undefined;
  try {
    const sp = await searchParams;
    sample = sp.sample;
  } catch {
    sample = undefined;
  }
  const initialPhase = sample === "1" ? ("result" as const) : ("idle" as const);

  return (
    <ResumeRewriteFlow
      context={resumeRewriteContext}
      result={resumeRewriteResult}
      initialPhase={initialPhase}
      sampleMode={sample === "1"}
    />
  );
}
