# HiredLens

AI career intelligence UI: resume insights, keyword analysis, rewrites, and mock interview configuration.

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
