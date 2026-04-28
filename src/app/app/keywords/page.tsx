import dynamic from "next/dynamic";

import { PageFeatureFallback } from "@/components/loading/page-feature-fallback";
import { keywordAnalysisSnapshot } from "@/data/keywords";

const KeywordAnalysisView = dynamic(
  () =>
    import("@/features/keywords/keyword-analysis-view").then((m) => ({
      default: m.KeywordAnalysisView
    })),
  { loading: () => <PageFeatureFallback />, ssr: true }
);

export default function KeywordsPage() {
  return <KeywordAnalysisView data={keywordAnalysisSnapshot} />;
}
