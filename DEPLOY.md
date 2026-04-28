# Deploy HiredLens to Vercel

This app is a **Next.js 15 (App Router)** project. Deploy it on [Vercel](https://vercel.com) in a few minutes.

## Prerequisites

- A [GitHub](https://github.com) (or GitLab / Bitbucket) account with this repository pushed.
- A [Vercel](https://vercel.com) account.

## 1. Environment variables

1. Copy `.env.example` to `.env.local` for local development.
2. In Vercel: **Project → Settings → Environment Variables**, add the same names as in `.env.example`:

| Name | Value | Notes |
|------|--------|--------|
| `NEXT_PUBLIC_APP_URL` | `https://your-production-domain.com` | **Production:** set to your canonical URL (no trailing slash). **Preview:** optional; if unset, the app uses Vercel’s server-only `VERCEL_URL` fallback for `metadataBase` / Open Graph. |
| `NEXT_PUBLIC_MOCK_REWRITE_DELAY_MS` | `2200` | Optional; simulated delay for the resume rewrite demo (ms). |
| `NEXT_PUBLIC_MOCK_REWRITE_FAIL_RATE` | `0` | Optional; `0`–`1` probability of a **mock** rewrite failure (for testing retry UI). Leave `0` in production. |

There are **no server-side secrets** in this repo yet—do not commit API keys; add them only in Vercel env (non-`NEXT_PUBLIC_*`) when you wire backends.

## 2. Connect the repo to Vercel

1. Log in to [vercel.com](https://vercel.com) and click **Add New… → Project**.
2. **Import** your Git repository (`hiredlens` or your fork).
3. Vercel auto-detects **Next.js**. Leave defaults:

   - **Framework Preset:** Next.js  
   - **Root Directory:** `.` (repository root)  
   - **Build Command:** `bun run build` *or* `npm run build` — see below.

## 3. Build settings (Bun vs npm)

This repo uses **Bun** (`bun.lock`). **`vercel.json`** sets `installCommand` to `bun install` and `buildCommand` to `bun run build`. Override in the Vercel dashboard if needed.

**npm instead of Bun:** remove `bun.lock`, add `package-lock.json` via `npm install`, then set **Build Command** to `npm run build` and clear or edit `vercel.json`.

## 4. Deploy

1. Click **Deploy**.
2. Wait for the build to finish. Vercel assigns a URL like `https://hiredlens-xxx.vercel.app`.

## 5. After deploy

- Open the production URL and smoke-test: `/`, `/app/overview`, `/app/keywords`, `/app/rewrites`, `/app/mock-interview`.
- **Custom domain:** Project → **Settings → Domains** → add your domain and follow DNS instructions.

## 6. Preview deployments

Every push to a non-production branch creates a **Preview** deployment with its own URL. Use this for QA before merging to `main` (or your production branch).

## Troubleshooting

| Issue | What to check |
|--------|----------------|
| Build fails on install | Use `bun install` vs `npm install` consistently with your lockfile. |
| Env not applied | Redeploy after changing variables; confirm variable names match code (`NEXT_PUBLIC_*` is exposed to the browser). |
| 404 on `/app/*` | Ensure routes live under `src/app/app/...` and you open `/app/...` in the browser. |

---

For local development: `bun install` then `bun run dev` (see `package.json` scripts).
