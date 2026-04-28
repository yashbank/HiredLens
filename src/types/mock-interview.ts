export type MockInterviewConfig = {
  targetRole: string;
  /** One line under the page title — why this module exists. */
  sessionContext: string;
  modes: { value: string; label: string; description: string }[];
  languages: { value: string; label: string }[];
  defaultMode: string;
  defaultLanguage: string;
  defaultInput: "voice" | "text";
  persona: {
    name: string;
    badge: string;
    bio: string;
    tagsPrimary: string[];
    tagsSecondary: string[];
  };
};
