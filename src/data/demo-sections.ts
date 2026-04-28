export type DemoSectionSlug =
  | "skill-roadmap"
  | "qa-prep"
  | "portfolio"
  | "history"
  | "settings"
  | "support";

export type RelatedLink = {
  href: string;
  label: string;
  hint: string;
};

export type DemoSectionContent = {
  eyebrow: string;
  title: string;
  description: string;
  stats: { label: string; value: string; detail: string }[];
  focusTitle: string;
  focusDescription: string;
  checklist: string[];
  related: RelatedLink[];
  activity?: { id: string; title: string; meta: string; badge: string }[];
  settingsRows?: { id: string; label: string; value: string }[];
  articles?: { id: string; title: string; meta: string }[];
  milestones?: { id: string; date: string; title: string; status: "done" | "current" | "upcoming" }[];
};

export const demoSections: Record<DemoSectionSlug, DemoSectionContent> = {
  "skill-roadmap": {
    eyebrow: "Skill development",
    title: "Skill roadmap",
    description:
      "A prioritized path from your gap analysis to the Meridian Staff Backend JD—milestones, lift estimates, and the next concrete module to ship before interviews.",
    stats: [
      { label: "Active goals", value: "4", detail: "2 in flight · 2 queued behind gRPC module" },
      { label: "Est. match lift", value: "+11 pts", detail: "Modeled overall score if milestones complete" },
      { label: "Next checkpoint", value: "Mar 14", detail: "gRPC contracts + k6 smoke in CI" }
    ],
    focusTitle: "Execution focus",
    focusDescription:
      "These items mirror what hiring managers ask to see on staff loops—ownership, measurability, and production discipline.",
    checklist: [
      "Ship a bounded gRPC surface with protobuf versioning and deprecation policy",
      "Add k6 smoke tests on two latency-sensitive endpoints with CI thresholds",
      "Publish SLOs and error budgets with links to incidents you commanded"
    ],
    related: [
      { href: "/app/overview", label: "Overview", hint: "Refresh scores after each milestone" },
      { href: "/app/keywords", label: "Keywords", hint: "Verify new bullets move chips to matched" },
      { href: "/app/mock-interview", label: "Mock interview", hint: "Practice explaining tradeoffs out loud" }
    ],
    milestones: [
      { id: "m1", date: "Feb 26", title: "SLO narrative + incident retro in resume", status: "done" },
      { id: "m2", date: "Mar 7", title: "gRPC hello-service in staging with tracing", status: "current" },
      { id: "m3", date: "Mar 14", title: "Load tests in pipeline + failure budgets doc", status: "upcoming" },
      { id: "m4", date: "Mar 21", title: "Mock panel dry run (technical mode)", status: "upcoming" }
    ]
  },
  "qa-prep": {
    eyebrow: "Interview readiness",
    title: "Q&A prep",
    description:
      "Structured prompts for behavioral depth and system-design clarity—aligned to Staff-level rubrics for platform and payments domains.",
    stats: [
      { label: "Curated prompts", value: "38", detail: "Behavioral, design, and role-specific follow-ups" },
      { label: "Practice streak", value: "5 days", detail: "Rolling average session length 14 min" },
      { label: "Themes to tighten", value: "2", detail: "Delegation under pressure · cross-team conflict" }
    ],
    focusTitle: "This week’s practice set",
    focusDescription:
      "Work through the list aloud; the mock interview module uses the same vocabulary signals when you switch to simulation mode.",
    checklist: [
      "STAR: multi-region outage where you owned detection, comms, and retro outcomes",
      "Design: sketch ledger read path with failure domains and replay strategy",
      "Behavioral: why platform engineering vs. product-facing backend at this stage"
    ],
    related: [
      { href: "/app/mock-interview", label: "Mock interview", hint: "Run voice or text practice with a tuned persona" },
      { href: "/app/overview", label: "Overview", hint: "Tie stories back to highlighted gaps" },
      { href: "/app/keywords", label: "Keywords", hint: "Anchor vocabulary you want to reuse live" }
    ]
  },
  portfolio: {
    eyebrow: "Recruiter artifacts",
    title: "Portfolio",
    description:
      "Case studies packaged for hiring-manager review—metrics, architecture, and scope statements consistent with your HiredLens analyses.",
    stats: [
      { label: "Published cases", value: "2", detail: "Payments platform reliability · Ingestion scale-up" },
      { label: "Last export", value: "Feb 2", detail: "PDF + password-protected web deck" },
      { label: "Engagement (demo)", value: "128 views", detail: "Last 30 days, anonymized aggregate" }
    ],
    focusTitle: "Polish checklist",
    focusDescription:
      "Before sharing externally, align each case study with the same numbers surfaced in rewrites and overview.",
    checklist: [
      "Add a sequence diagram for ledger reconciliation and retry boundaries",
      "Surface quantified outcomes above the fold on both case study heroes",
      "Cross-link to keyword categories you strengthened in the latest run"
    ],
    related: [
      { href: "/app/rewrites", label: "Resume rewrites", hint: "Keep bullets and portfolio metrics in sync" },
      { href: "/app/history", label: "Analysis history", hint: "Reference which JD version each case study targets" },
      { href: "/app/overview", label: "Overview", hint: "Pull headline scores into your cover email" }
    ]
  },
  history: {
    eyebrow: "Version control",
    title: "Analysis history",
    description:
      "Every JD upload, score run, and export is retained here so you can diff language changes and score movement across iterations.",
    stats: [
      { label: "Latest run", value: "Today", detail: "Staff Backend — Meridian Payments (active)" },
      { label: "Best overall", value: "88", detail: "Peak composite match in the last 30 days" },
      { label: "Runs (30d)", value: "6", detail: "Includes 2 shared exports to stakeholders" }
    ],
    focusTitle: "How to use history",
    focusDescription:
      "Open a prior run to branch a new experiment without losing the baseline snapshot recruiters already saw.",
    checklist: [
      "Compare Feb 12 vs. Feb 26 to isolate which rewrites moved keyword alignment",
      "Duplicate a run before testing a risky tone change in rewrites",
      "Export a PDF summary after each panel round for your records"
    ],
    related: [
      { href: "/app/overview", label: "Overview", hint: "Jump to the live snapshot for the active JD" },
      { href: "/app/keywords", label: "Keywords", hint: "See chip-level deltas between two dates" },
      { href: "/app/rewrites", label: "Rewrites", hint: "Re-run AI from any historical context" }
    ],
    activity: [
      { id: "a1", title: "Full analysis · Meridian Staff Backend", meta: "Today · 09:14 · auto-save", badge: "88" },
      { id: "a2", title: "Keyword refresh · same JD", meta: "Feb 26 · 16:02 · manual", badge: "86" },
      { id: "a3", title: "Resume export · v14 PDF", meta: "Feb 22 · 11:41 · shared link", badge: "—" },
      { id: "a4", title: "Initial ingest · Meridian posting", meta: "Feb 12 · 08:30 · upload", badge: "82" }
    ]
  },
  settings: {
    eyebrow: "Workspace",
    title: "Settings",
    description:
      "Defaults for new analyses, notification cadence, and data retention. Values shown match the demo tenant used across HiredLens screens.",
    stats: [
      { label: "Workspace owner", value: "Alex Rivera", detail: "Pro trial · billing seat 1 of 3" },
      { label: "Default target role", value: "Staff BE", detail: "Applied to new uploads until you override" },
      { label: "File retention", value: "90 days", detail: "Uploaded resumes & exports; models excluded" }
    ],
    focusTitle: "Operational checklist",
    focusDescription:
      "When the full product ships, these toggles connect to email, SSO, and audit logs—for now they document expected behavior for buyers.",
    checklist: [
      "Connect Google Calendar for mock interview reminders",
      "Enable weekly digest summarizing new gaps vs. last run",
      "Restrict exports to company domain for regulated teams"
    ],
    related: [
      { href: "/app/support", label: "Support", hint: "SLA, escalation paths, and security questionnaires" },
      { href: "/app/overview", label: "Overview", hint: "Confirm default role matches your active JD" },
      { href: "/app/history", label: "History", hint: "Verify retention policy against compliance needs" }
    ],
    settingsRows: [
      { id: "s1", label: "Work email for digests", value: "alex.rivera@meridian-payments.demo" },
      { id: "s2", label: "Default analysis language", value: "English (US)" },
      { id: "s3", label: "Theme sync", value: "Follow system (dark in demo)" },
      { id: "s4", label: "API access", value: "Off · Enterprise add-on" }
    ]
  },
  support: {
    eyebrow: "Help center",
    title: "Support",
    description:
      "Response targets, self-serve documentation, and escalation paths. Use this surface during evaluations to explain how customer success plugs into the workspace.",
    stats: [
      { label: "First response", value: "< 4h", detail: "Business hours · Pacific" },
      { label: "Open requests", value: "0", detail: "No tickets blocking your workspace" },
      { label: "Plan", value: "Standard", detail: "Upgrade path for phone + dedicated CSM" }
    ],
    focusTitle: "When to open a ticket",
    focusDescription:
      "Product issues, billing, and security reviews each route to a different queue—use the right template to avoid delays.",
    checklist: [
      "Parser oddities: attach the JD PDF and ATS vendor name if known",
      "Billing: include workspace ID from Settings",
      "Security: request SOC2 / DPA pack via the enterprise form linked below"
    ],
    related: [
      { href: "/app/settings", label: "Settings", hint: "Grab workspace metadata before filing" },
      { href: "/app/history", label: "History", hint: "Attach run IDs when reporting score regressions" },
      { href: "/app/overview", label: "Overview", hint: "Screenshot headline metrics for faster triage" }
    ],
    articles: [
      { id: "k1", title: "How overall score blends ATS, keywords, and semantics", meta: "6 min read · Updated Feb 2026" },
      { id: "k2", title: "Data handling for uploads, exports, and model calls", meta: "Security · 4 min read" },
      { id: "k3", title: "Running a credible mock interview with voice input", meta: "Productivity · 3 min read" }
    ]
  }
};
