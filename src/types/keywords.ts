export type KeywordSpectrumFilter = "matched" | "missing";

export type KeywordChip = {
  id: string;
  label: string;
  matched: boolean;
};

export type KeywordCategory = {
  id: string;
  title: string;
  chips: KeywordChip[];
};

export type KeywordAnalysisSnapshot = {
  pageTitle: string;
  /** One sentence: what this screen proves (onboarding). */
  insightLead: string;
  targetRole: string;
  aiScore: number;
  matchedCount: number;
  alignmentPercent: number;
  missingCriticalCount: number;
  impactPotentialPercent: number;
  categories: KeywordCategory[];
  optimization: {
    title: string;
    body: string;
  };
  semanticContext: {
    industryRelevancy: { label: string; percent: number };
    jdDifficulty: { label: string; percent: number };
  };
};
