export type ResumeRewriteBullet = {
  id: string;
  before: string;
  after: string;
};

export type ResumeRewriteResult = {
  headline: string;
  summary: string;
  bullets: ResumeRewriteBullet[];
  keywordInjections: string[];
};

export type ResumeRewriteContext = {
  fileName: string;
  targetRole: string;
};
