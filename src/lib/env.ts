/**
 * Public environment helpers. Never put secrets in `NEXT_PUBLIC_*` — they ship to the browser.
 */

/**
 * Canonical site origin without a trailing slash (e.g. `https://app.example.com`).
 * - Set `NEXT_PUBLIC_APP_URL` in `.env.local` and in Vercel **Project → Environment Variables**.
 * - On Vercel, if unset, falls back to `https://${VERCEL_URL}` (server-only; previews work without extra config).
 */
export function getPublicAppUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_APP_URL?.trim();
  if (explicit) {
    return explicit.replace(/\/$/, "");
  }
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    const host = vercel.replace(/^https?:\/\//, "").replace(/\/$/, "");
    return `https://${host}`;
  }
  return "";
}

/** Simulated AI rewrite latency in the browser (ms). Override via `NEXT_PUBLIC_MOCK_REWRITE_DELAY_MS`. */
export const MOCK_REWRITE_DELAY_MS = Number(
  process.env.NEXT_PUBLIC_MOCK_REWRITE_DELAY_MS ?? 2200
);

/**
 * Optional mock failure rate for the resume rewrite (0–1). Use e.g. `0.25` to demo error UI locally.
 * `NEXT_PUBLIC_*` so the client bundle can read it for the simulated request.
 */
export const MOCK_REWRITE_FAIL_RATE = Math.min(
  1,
  Math.max(0, Number(process.env.NEXT_PUBLIC_MOCK_REWRITE_FAIL_RATE ?? 0))
);
