import type { LucideIcon } from "lucide-react";

export type NavItem = {
  title: string;
  href: string;
  icon: LucideIcon;
  disabled?: boolean;
  /** Shown beside the title in sidebar tooltips for demo / onboarding. */
  description?: string;
};
