import type { OverviewDashboardSnapshot } from "@/types/overview";

/** Latest dashboard snapshot for the active analysis (mock API shape). */
export const overviewDashboardSnapshot: OverviewDashboardSnapshot = {
  userFirstName: "Alex",
  headline: "You're interview-ready on paper—now close the last proof gaps.",
  subline:
    "Compared to 182 applicants on this requisition, you sit in the top tier for depth of platform work. Recruiters will skim for gRPC, SLO ownership, and pipeline proof—those are the only themes still under-weighted vs. the panel rubric.",
  productPitch:
    "HiredLens compares your resume to one job description at a time: match score, ATS safety, missing phrases, and what to say next in interviews.",
  valueProps: [
    "One dashboard answers “how strong is my fit?” before you spend hours tailoring.",
    "Keyword and rewrite modules tell you exactly what to add—not generic buzzwords.",
    "Mock interview pairs the same role story with voice or text practice."
  ] as const,
  analysisMeta: {
    lastSynced: "Today · 9:14 AM PT · auto-save on",
    postingRef: "REQ-4481 · Staff Backend — Platform",
    applicantPool: "182 applicants in cohort (simulated market data)"
  },
  nextBestAction: {
    title: "Best next step",
    description:
      "Open Keyword analysis to see which JD chips are still red—then run a rewrite to fold two of them into your strongest bullet.",
    href: "/app/keywords"
  },
  targetRole: "Staff Backend Engineer — Platform (Meridian Payments)",
  percentileLabel: "Top 12% of applicants on this posting",
  overallScorePercent: 88,
  scoreCallout: "+6 pts vs. your Feb 12 run on the same posting — momentum is with you.",
  matchedKeywordCount: 24,
  keywordAlignmentPercent: 74,
  atsCompatibilityPercent: 91,
  missingKeywords: [
    {
      id: "kw-1",
      label: "Production gRPC / protobuf experience across service boundaries",
      emphasis: true
    },
    {
      id: "kw-2",
      label: "Explicit SLOs, error budgets, and on-call ownership narratives",
      emphasis: true
    },
    {
      id: "kw-3",
      label: "Load testing in CI (k6, Locust) tied to release gates",
      emphasis: false
    },
    {
      id: "kw-4",
      label: "Multi-region failover or active-active data patterns",
      emphasis: false
    }
  ],
  skillGaps: [
    {
      id: "gap-1",
      title: "gRPC & contract-first APIs…",
      subtitle: "Panel asks for concrete service boundaries you owned—not library usage.",
      icon: "document"
    },
    {
      id: "gap-2",
      title: "Reliability engineering story (SLOs / incidents)…",
      subtitle: "Meridian weights on-call narrative higher than average for Staff.",
      icon: "chart"
    },
    {
      id: "gap-3",
      title: "Performance validation in pipeline…",
      subtitle: "Peers flagged “claims without CI proof” in debrief notes.",
      icon: "people"
    }
  ]
};
