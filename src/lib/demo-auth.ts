/**
 * Mock auth. There is no backend — these credentials are intentionally public
 * so anyone evaluating the showcase can land in the dashboard in one click.
 */
export const DEMO_CREDENTIALS = {
  email: "demo@hiredlens.ai",
  password: "letmein"
} as const;

export const DEMO_AUTH_KEY = "hiredlens-demo-auth";
export const POST_LOGIN_ROUTE = "/app/overview";

/** Marks the (fake) session as active so the dashboard greets the demo user. */
export function markDemoAuthenticated() {
  try {
    window.localStorage.setItem(DEMO_AUTH_KEY, "true");
  } catch {
    /* storage unavailable — non-fatal in a demo */
  }
}
