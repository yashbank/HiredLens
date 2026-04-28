export type OverviewMissingKeyword = {
  id: string;
  label: string;
  emphasis: boolean;
};

export type OverviewSkillGap = {
  id: string;
  title: string;
  subtitle: string;
  icon: "document" | "chart" | "people";
};

export type OverviewDashboardSnapshot = {
  userFirstName: string;
  headline: string;
  subline: string;
  /** One-line product story for first-time readers (overview hero). */
  productPitch: string;
  /** Three scannable outcomes — what HiredLens does for a candidate. */
  valueProps: readonly [string, string, string];
  /** JD / sync context for realism. */
  analysisMeta: {
    lastSynced: string;
    postingRef: string;
    applicantPool: string;
  };
  /** Primary CTA after the hero. */
  nextBestAction: {
    title: string;
    description: string;
    href: string;
  };
  targetRole: string;
  percentileLabel: string;
  overallScorePercent: number;
  /** Short trend or proof line under the score ring. */
  scoreCallout: string;
  /** Count of JD keywords present on the resume. */
  matchedKeywordCount: number;
  /** How well matched keywords cover the JD (weighted). */
  keywordAlignmentPercent: number;
  atsCompatibilityPercent: number;
  missingKeywords: OverviewMissingKeyword[];
  skillGaps: OverviewSkillGap[];
};
