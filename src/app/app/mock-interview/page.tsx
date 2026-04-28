import dynamic from "next/dynamic";

import { PageFeatureFallback } from "@/components/loading/page-feature-fallback";
import { mockInterviewConfig } from "@/data/mock-interview";

const MockInterviewConfigView = dynamic(
  () =>
    import("@/features/mock-interview/mock-interview-config-view").then((m) => ({
      default: m.MockInterviewConfigView
    })),
  { loading: () => <PageFeatureFallback />, ssr: true }
);

export default function MockInterviewPage() {
  return <MockInterviewConfigView data={mockInterviewConfig} />;
}
