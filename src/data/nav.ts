import {
  BookOpen,
  Briefcase,
  Gauge,
  HelpCircle,
  History,
  LayoutGrid,
  PencilRuler,
  Settings,
  Sparkles,
  Target
} from "lucide-react";

import type { NavItem } from "@/types/nav";

export const appNav: NavItem[] = [
  {
    title: "Overview",
    href: "/app/overview",
    icon: LayoutGrid,
    description: "North-star score, ATS fit, and prioritized gaps for your active JD."
  },
  {
    title: "Keywords",
    href: "/app/keywords",
    icon: Target,
    description: "Semantic match of resume language vs. posting—green chips are already mirrored."
  },
  {
    title: "Rewrites",
    href: "/app/rewrites",
    icon: Sparkles,
    description: "AI bullet rewrites and keyword injections tuned to this role (simulated latency)."
  },
  {
    title: "Skill Roadmap",
    href: "/app/skill-roadmap",
    icon: Gauge,
    description: "Sequenced upskilling plan inferred from gap cards and recruiter feedback themes."
  },
  {
    title: "Q&A Prep",
    href: "/app/qa-prep",
    icon: BookOpen,
    description: "Behavioral and system-design prompts aligned to Staff-level interview rubrics."
  },
  {
    title: "Mock Interview",
    href: "/app/mock-interview",
    icon: PencilRuler,
    description: "Pick mode, language, and channel—then review the AI interviewer persona before a run."
  },
  {
    title: "Portfolio",
    href: "/app/portfolio",
    icon: Briefcase,
    description: "Case studies and artifacts packaged for hiring-manager review and export."
  },
  {
    title: "History",
    href: "/app/history",
    icon: History,
    description: "Past analyses and score runs—compare versions after each resume iteration."
  }
];

export const appNavSecondary: NavItem[] = [
  {
    title: "Settings",
    href: "/app/settings",
    icon: Settings,
    description: "Workspace defaults, notifications, and data retention preferences."
  },
  {
    title: "Support",
    href: "/app/support",
    icon: HelpCircle,
    description: "Help center, SLA details, and escalation paths for your organization."
  }
];
