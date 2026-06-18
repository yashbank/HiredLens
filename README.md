# HiredLens

**A tri-theme, motion-rich UI/UX showcase** — an AI career-intelligence prototype rendered in
three distinct design languages from a single token engine. Resume insights, keyword analysis, AI
rewrites, and mock-interview configuration, all driven by mock data (no backend).

> This is a frontend craft showcase. Everything is intentionally mock/fake data; the goal is to
> demonstrate full-stack-flavored, AI-driven development and best-in-class UI/UX.

## ✨ Highlights

- **Three unidentical themes, one codebase** — `Aurora` (dark spatial glass), `Porcelain` (light
  Apple-grade minimal), and `Pulse` (bold vibrant gradient). Switch live; the entire app re-skins
  with a View-Transitions circular reveal.
- **Premium motion** — Framer Motion scroll reveals, staggers, magnetic buttons, 3D tilt, count-up
  numbers, animated gauges/charts, marquees, and an Embla carousel.
- **WebGL** — a theme-reactive distorted orb (react-three-fiber + drei) on the hero surfaces.
- **⌘K command palette** (cmdk) for navigation + theme switching.
- **Frictionless demo** — a floating, semi-transparent credentials chip drops you straight into the
  dashboard. No real auth.

## 🔐 Demo access

```
email:    demo@hiredlens.ai
password: letmein
```

Or just click **Enter demo** on the floating card at `/login`.

## 🧱 Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 15 (App Router) · React 19 · TypeScript |
| Styling | Tailwind CSS · CSS-variable token engine · shadcn/Radix primitives |
| Motion | Framer Motion · GSAP-ready |
| 3D | three.js · @react-three/fiber · @react-three/drei |
| UI extras | cmdk · Embla carousel · sonner · lucide-react |
| Fonts | Space Grotesk · Inter · Bricolage Grotesque · Instrument Serif · JetBrains Mono |

## 🚀 Local development

```bash
bun install
bun run dev
```

Open the URL shown (default **3000**).

## 📜 Scripts

| Command | Description |
|---|---|
| `bun run dev` | Development server |
| `bun run build` | Production build |
| `bun run start` | Run production server locally |
| `bun run lint` | ESLint |
| `node scripts/screenshots.mjs` | Capture case-study screenshots across all 3 themes (see script header) |

## 📓 Case study

See **[`docs/CASE_STUDY.md`](./docs/CASE_STUDY.md)** for the full engineering write-up — architecture,
the theme engine, motion system, and per-feature breakdown.

## ☁️ Deployment

See **[DEPLOY.md](./DEPLOY.md)** for Vercel deployment notes.
