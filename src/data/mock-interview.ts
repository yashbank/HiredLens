import type { MockInterviewConfig } from "@/types/mock-interview";

export const mockInterviewConfig: MockInterviewConfig = {
  targetRole: "Staff Backend Engineer — Platform (Meridian Payments)",
  sessionContext:
    "Practice how you’ll defend tradeoffs and ownership out loud—the same signals recruiters already saw on your Overview and Keyword screens.",
  defaultMode: "technical",
  defaultLanguage: "go",
  defaultInput: "voice",
  modes: [
    {
      value: "behavioral",
      label: "Behavioral",
      description:
        "Staff-level leadership stories: cross-team execution, mentoring, navigating ambiguity, and customer impact under constraints."
    },
    {
      value: "technical",
      label: "Technical",
      description:
        "Deep system design on payments-scale throughput, consistency models, failure domains, and pragmatic tradeoffs with cost and operability."
    },
    {
      value: "portfolio",
      label: "Portfolio critique",
      description:
        "Walkthrough of your strongest launches—metrics, architecture diagrams, and what you would redesign with hindsight."
    }
  ],
  languages: [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "python", label: "Python" },
    { value: "go", label: "Go" },
    { value: "english-us", label: "English (US)" }
  ],
  persona: {
    name: "Jordan M.",
    badge: "Principal",
    bio: "Jordan has led 200+ staff-level loops at high-growth fintechs. Expect crisp follow-ups on failure modes, observability, and how you coach teams through production risk.",
    tagsPrimary: ["PLATFORM", "PAYMENTS", "STAFF+ PANEL"],
    tagsSecondary: ["SLO DISCIPLINE", "ON-CALL", "API DESIGN", "COST AWARENESS"]
  }
};
