<div align="center">

<img src="assets/hero.svg" alt="HiredLens" width="100%"/>

![Next.js 15](https://img.shields.io/badge/Next.js%2015-000?logo=nextdotjs&logoColor=white) ![React 19](https://img.shields.io/badge/React%2019-149ECA?logo=react&logoColor=white) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white) ![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?logo=tailwindcss&logoColor=white) ![Bun](https://img.shields.io/badge/Bun-FBF0DF?logo=bun&logoColor=black) ![Vercel](https://img.shields.io/badge/Vercel-000?logo=vercel&logoColor=white)

<img src="https://readme-typing-svg.demolab.com?font=Inter&weight=700&size=22&duration=2600&pause=900&color=34D399&center=true&vCenter=true&width=900&lines=Know+how+recruiters+read+your+resume;Fix+keywords.+Sharpen+bullets.+Practice+the+interview.;One+workspace+for+your+whole+job+hunt" alt="typing"/>

[**Live demo**](https://hiredlens.vercel.app) · [Deploy guide](DEPLOY.md)

</div>

---

## What it does

```mermaid
flowchart LR
  R[Upload resume] --> I[Insights overview]
  I --> K[Keyword + ATS analysis]
  K --> W[AI rewrites]
  W --> Q[Q&A prep]
  Q --> M[Mock interview]
  M --> S[Skill roadmap]
  style R fill:#34d399,color:#000
  style M fill:#38bdf8,color:#000
```

| Module | Purpose |
|---|---|
| 📊 **Overview** | Resume score and top fixes at a glance |
| 🔑 **Keywords** | ATS keyword coverage against a target role |
| ✍️ **Rewrites** | Stronger bullet points, side by side with the original |
| 💬 **Q&A prep** | Likely interview questions for your profile |
| 🎤 **Mock interview** | Configure and rehearse role-specific interviews |
| 🧭 **Skill roadmap** | What to learn next to close your gaps |
| 🗂️ **History, portfolio, settings** | Track versions and manage your account |

> The UI runs in a demo mode with mocked AI responses so it can be explored without API keys.

## Stack

<img src="https://skillicons.dev/icons?i=nextjs,react,ts,tailwind,bun,vercel,github,figma&perline=8" alt="stack"/>

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind · shadcn/ui · Bun · Vercel

## Local development

```bash
bun install
bun run dev
```

After `bun run dev`, open the URL shown in the terminal (port **3000** unless you changed it).

## Scripts

| Command | Description |
|---------|-------------|
| `bun run dev` | Development server |
| `bun run build` | Production build |
| `bun run start` | Run production server locally |
| `bun run lint` | ESLint |

## Deployment

See **[DEPLOY.md](./DEPLOY.md)** for step-by-step **Vercel** deployment, environment variables, and build notes.

## Environment

Copy `.env.example` to `.env.local`. Variables are documented inline in `.env.example`; `src/lib/env.ts` reads `NEXT_PUBLIC_APP_URL` and `NEXT_PUBLIC_MOCK_REWRITE_DELAY_MS` (see **DEPLOY.md** for Vercel).
# HiredLens

## Built by

[Yash Bankar](https://github.com/yashbank), with AI agents under human-owned design and review.
