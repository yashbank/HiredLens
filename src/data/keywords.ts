import type { KeywordAnalysisSnapshot } from "@/types/keywords";

export const keywordAnalysisSnapshot: KeywordAnalysisSnapshot = {
  pageTitle: "Keyword semantic analysis",
  insightLead:
    "Each chip is language from REQ-4481 mapped to your resume. Green = already mirrored; amber = still missing or too shallow for this panel.",
  targetRole: "Staff Backend Engineer — Platform (Meridian Payments)",
  aiScore: 88,
  matchedCount: 24,
  alignmentPercent: 74,
  missingCriticalCount: 5,
  impactPotentialPercent: 11,
  categories: [
    {
      id: "cat-platform",
      title: "Platform & distributed systems",
      chips: [
        { id: "c1", label: "Kubernetes", matched: true },
        { id: "c2", label: "Service mesh", matched: true },
        { id: "c3", label: "gRPC", matched: false },
        { id: "c4", label: "Multi-region", matched: false },
        { id: "c5", label: "Idempotency keys", matched: true },
        { id: "c6", label: "Event-driven design", matched: true }
      ]
    },
    {
      id: "cat-reliability",
      title: "Reliability & observability",
      chips: [
        { id: "c7", label: "OpenTelemetry", matched: true },
        { id: "c8", label: "Prometheus", matched: true },
        { id: "c9", label: "SLO / error budgets", matched: false },
        { id: "c10", label: "Structured logging", matched: true },
        { id: "c11", label: "Runbooks", matched: false },
        { id: "c12", label: "Incident commander", matched: true }
      ]
    },
    {
      id: "cat-data",
      title: "Data & persistence",
      chips: [
        { id: "c13", label: "PostgreSQL", matched: true },
        { id: "c14", label: "Redis", matched: true },
        { id: "c15", label: "CDC / outbox", matched: false },
        { id: "c16", label: "Schema migrations", matched: true },
        { id: "c17", label: "Query tuning", matched: true },
        { id: "c18", label: "Partitioning strategy", matched: false }
      ]
    },
    {
      id: "cat-delivery",
      title: "Delivery & quality",
      chips: [
        { id: "c19", label: "Go", matched: true },
        { id: "c20", label: "Python", matched: true },
        { id: "c21", label: "GitHub Actions", matched: true },
        { id: "c22", label: "Canary releases", matched: true },
        { id: "c23", label: "Contract tests", matched: false },
        { id: "c24", label: "Load tests in CI", matched: false }
      ]
    }
  ],
  optimization: {
    title: "Integration: SLO ownership narrative",
    body:
      "Instead of: “Helped improve reliability for our payments service.”\n\nTry: “Owned SLOs for ledger ingestion (99.95% monthly): cut p99 latency 22% via connection pooling + cache stampede guards; led two Sev-2 incidents to retro action items closed within 10 days.”"
  },
  semanticContext: {
    industryRelevancy: { label: "Strong", percent: 78 },
    jdDifficulty: { label: "Staff-level", percent: 86 }
  }
};
