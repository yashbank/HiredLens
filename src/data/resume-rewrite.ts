import type { ResumeRewriteContext, ResumeRewriteResult } from "@/types/resume-rewrite";

export const resumeRewriteContext: ResumeRewriteContext = {
  fileName: "Alex_Rivera_Staff_Backend_2026.pdf",
  targetRole: "Staff Backend Engineer — Platform (Meridian Payments)"
};

export const resumeRewriteResult: ResumeRewriteResult = {
  headline: "AI-optimized resume draft",
  summary:
    "We sharpened platform-scale language, aligned bullets to Meridian’s JD (gRPC, SLOs, multi-region), and surfaced quantified outcomes while keeping your voice intact.",
  bullets: [
    {
      id: "b1",
      before:
        "Worked on backend services in Go and Python, helped improve performance and fixed bugs during on-call.",
      after:
        "Led reliability for ledger ingestion (Go): defined SLOs (99.95%), drove p99 latency down 22% via pooling + cache stampede guards, and authored runbooks adopted by 3 sister teams."
    },
    {
      id: "b2",
      before: "Experience with databases and building APIs for internal teams.",
      after:
        "Designed PostgreSQL schemas and versioned REST + gRPC APIs with protobuf; introduced contract tests in CI to catch breaking changes before canary deploys."
    },
    {
      id: "b3",
      before: "Participated in code reviews and used GitHub for collaboration.",
      after:
        "Mentored 4 engineers through design reviews and production readiness checklists; standardized GitHub Actions pipelines with canary gates and automated rollback on SLO burn alerts."
    },
    {
      id: "b4",
      before: "Helped deploy services to Kubernetes.",
      after:
        "Owned rollout strategy on Kubernetes (HPA, topology spread): cut failed deploys by 35% quarter-over-quarter by pairing progressive delivery with synthetic checks."
    }
  ],
  keywordInjections: ["gRPC / protobuf", "SLOs & error budgets", "OpenTelemetry", "k6 in CI", "Multi-region", "Canary + rollback"]
};
