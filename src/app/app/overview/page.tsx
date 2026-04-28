import dynamic from "next/dynamic";

import { PageFeatureFallback } from "@/components/loading/page-feature-fallback";
import { overviewDashboardSnapshot } from "@/data/overview";

const OverviewDashboard = dynamic(
  () =>
    import("@/features/overview/overview-dashboard").then((m) => ({
      default: m.OverviewDashboard
    })),
  { loading: () => <PageFeatureFallback />, ssr: true }
);

export default function OverviewPage() {
  return <OverviewDashboard data={overviewDashboardSnapshot} />;
}
