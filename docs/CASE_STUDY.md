# HiredLens — Engineering Case Study

**A tri-theme, motion-rich UI/UX showcase**
Frontend craft · AI-driven product surfaces · zero backend

---

> **About the figures.** Every screenshot referenced below is generated automatically across all
> three themes by `scripts/screenshots.mjs`. To populate them locally:
> ```bash
> bun run build && PORT=3100 bun run start      # terminal 1
> bun add -d playwright && npx playwright install chromium
> node scripts/screenshots.mjs                   # terminal 2 → designs/screens/*.png
> ```

---

## 1. Summary

HiredLens is an AI career-intelligence prototype: it scores a resume against a single job
description, surfaces matched/missing keywords, generates AI bullet rewrites, and configures a mock
interview. **There is no backend** — every number is realistic mock data. The product exists to
demonstrate one thing: *industry-leading frontend and UI/UX engineering.*

The headline idea is a **tri-theme design engine**. Rather than ship one look, HiredLens ships
three genuinely different design languages — **Aurora**, **Porcelain**, and **Pulse** — from a
single component tree. A user switches themes live and the *entire* application re-skins: color,
typography, corner radius, shadow language, surface treatment (glass vs. solid vs. gradient), and
even motion personality. One codebase reads as three products.

| Theme | Personality | Surface | Type | Motion |
|---|---|---|---|---|
| **Aurora** | Dark spatial glass (Vision Pro / Linear) | Glassmorphism + blur | Space Grotesk | Smooth float |
| **Porcelain** | Light Apple-grade minimalism | Solid, soft shadow | Inter (tight) | Crisp, restrained |
| **Pulse** | Bold vibrant energy (Stripe-with-a-twist) | Gradient mesh + grain | Bricolage Grotesque | Springy |

![Aurora · Porcelain · Pulse — Overview side by side](../designs/screens/aurora-overview.png)
*Fig 1. The Overview dashboard. The same component tree rendered in the Aurora theme. See
`porcelain-overview.png` and `pulse-overview.png` for the other two languages.*

---

## 2. Objective & constraints

**Goal.** Prove full-stack-flavored, AI-driven development and best-possible UI/UX in a single
portfolio artifact — extraordinary animation, 3D depth, refined color and typography, and rich
interaction (hover, slide, carousel).

**Hard constraints.**
- Keep it a **prototype**: mock data only, no real authentication, no server.
- Frictionless evaluation: any visitor must reach the working dashboard in one click.
- Push the frontend hard — heavy bundles are acceptable because there is no backend to balance.

**Non-goals.** Real persistence, real ML, SEO, or production auth.

---

## 3. The core idea — a tri-theme token engine

### 3.1 Why tokens, not three apps

Shipping three separate UIs would triple the maintenance and prove little. Instead, **every surface
reads from semantic CSS variables**, and a single class on `<html>` (`aurora` / `porcelain` /
`pulse`) swaps the whole token block. Components never hard-code a color; they reference
`hsl(var(--primary))`, `var(--radius)`, `.glass`, `.shadow-floaty`, etc. The result: **zero
duplicated component code**, three fully distinct identities.

```
<html class="aurora">          globals.css
  └─ :root tokens (fallback)   .aurora    { --primary, --radius, --surface, --font-display … }
     overridden by theme class .porcelain { … }
                               .pulse      { … }
```

Each theme defines ~30 tokens — the standard shadcn set (`--background`, `--card`, `--primary`,
`--muted`, `--border`, `--ring`…) **plus** showcase extras:

| Token | Purpose |
|---|---|
| `--radius` | Corner language (Aurora 1.2rem · Porcelain 0.85rem · Pulse 0.5rem) |
| `--surface` / `--surface-alpha` | Glass translucency base per theme |
| `--grad-1/2/3` | Three-stop brand gradient (drives `.text-gradient`, `bg-grad-brand`) |
| `--glow` | Glow/halo color for shadows and focus |
| `--shadow-color` | Theme-correct shadow tint |
| `--font-display` | Per-theme display typeface |

### 3.2 Switching with a circular reveal

Theme switching is handled by `next-themes` (persistence + no-flash SSR) wrapped in a typed
`useThemeId()` hook. On switch we use the **View Transitions API** to animate a circular clip-path
reveal originating from the click coordinates — a detail usually reserved for premium product
sites. Reduced-motion users get an instant, accessible swap.

```ts
const transition = document.startViewTransition(() => setTheme(next));
transition.ready.then(() => root.animate(
  { clipPath: [`circle(0 at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
  { duration: 620, easing: "cubic-bezier(0.16,1,0.3,1)", pseudoElement: "::view-transition-new(root)" }
));
```

![Theme switcher](../designs/screens/aurora-overview.png)
*Fig 2. The segmented theme switcher (top bar) with animated active pill and gradient swatches.*

---

## 4. Architecture

```
Next.js 15 App Router
│
├─ app/layout.tsx ............ fonts (5×) + ThemeProvider + AmbientBackground + Toaster
├─ (marketing)/ .............. landing + marketing chrome
├─ login / signup ........... split auth + floating demo-credentials chip
└─ app/ ..................... dashboard shell (sidebar + topbar + ⌘K palette)
   ├─ overview .............. flagship: gauge, charts, tilt, shortcuts
   ├─ keywords ............. filterable spectrum w/ spring chip transitions
   ├─ rewrites ............. cinematic AI generation flow (mock API)
   ├─ mock-interview ....... animated config + AI persona
   └─ 6× demo shells ....... shared content-driven shell

Cross-cutting systems
├─ lib/themes.ts ............ typed theme registry
├─ components/theme-* ....... provider, switcher, View-Transition logic
├─ components/motion/ ....... Reveal, Stagger, AnimatedNumber, Magnetic, Tilt, Spotlight
├─ components/ui/ ........... Button, Card, Badge, charts, carousel, marquee, sonner …
├─ components/three/ ........ WebGL orb (dynamic, ssr:false)
└─ components/ambient-background.tsx … theme-scoped fixed backdrop
```

**Data flow.** Server components import typed mock snapshots from `src/data/*` and pass them into
client feature views. Types live in `src/types/*`, so the data contracts are unchanged from the
original prototype — the redesign is purely presentational and additive.

---

## 5. Design system

### 5.1 Utilities (in `globals.css`)

A curated utility layer powers the premium look without per-component CSS:

- `.glass` / `.glass-strong` / `.glass-edge` — translucent, blurred, light-edged surfaces
- `.text-gradient` (+ `.text-gradient-animate`) — animated brand-gradient text
- `.aurora-field`, `.mesh-bg`, `.grid-bg`, `.grain` — theme-scoped ambient backgrounds
- `.glow-sm/md/lg`, `.shadow-soft`, `.shadow-floaty` — token-aware depth
- `.shine` — hover light-sweep; `.spotlight` — pointer-following radial; `.gradient-border` — masked
  gradient ring; `.hover-lift`, `.perspective`, `.preserve-3d`

### 5.2 Primitives

`Button` and `Card` are CVA-driven with theme-aware variants (`gradient`, `glass`, `gradient`
border). `Badge` adds `soft` and `gradient`. All inherit `--radius`, so corners reshape per theme.

![Login — demo chip](../designs/screens/aurora-login.png)
*Fig 3. Login. The floating, semi-transparent demo-credentials chip (bottom-left) copies values and
one-click-enters the dashboard. The brand panel hosts the WebGL orb + live theme switcher.*

---

## 6. Motion & interaction system

All motion lives in a small reusable library (`components/motion/`) so pages compose, not reinvent:

| Primitive | Behavior |
|---|---|
| `Reveal` / `Stagger` / `StaggerItem` | Scroll-triggered fade+rise, staggered children |
| `AnimatedNumber` | Count-up on first in-view |
| `Magnetic` | Cursor-magnetic element with spring return |
| `Tilt` | 3D tilt-on-hover + moving light origin |
| `Spotlight` | Pointer-following radial highlight |
| `RadialGauge` / `AreaSpark` / `BarsMini` / `Meter` | SVG charts that **draw** when scrolled into view |

Every motion primitive checks `useReducedMotion()` and degrades to a static render. Marquees pause
on hover; the carousel (Embla) autoplays but stops on interaction.

![Rewrites — generation flow](../designs/screens/aurora-rewrites.png)
*Fig 4. The AI rewrite flow: animated "thinking" steps check off in sequence, then a staggered
before→after reveal with keyword-injection chips. Backed entirely by the existing mock API.*

---

## 7. 3D / WebGL

The hero orb (`components/three/`) is a distorted icosahedron with a faceted wireframe shell and
particle sparkles (react-three-fiber + drei `MeshDistortMaterial`, `Float`, `Sparkles`). Its colors
are pulled from the active theme's swatches, so it recolors on theme switch. It is **dynamically
imported with `ssr: false`** and isolated behind a reduced-motion / not-mounted fallback glow, so it
never blocks SSR or hurts the accessibility baseline.

---

## 8. Feature walkthrough

- **Landing** — hero with the WebGL orb + floating stat chips, a dedicated *"One product, three
  design languages"* section (live `ThemeSwitcherCards`), a features bento, animated stats, a
  testimonial carousel, and pricing. A scroll-progress bar tracks the page.
- **Auth** — split layout, prefilled form, social buttons (all mock), and the floating demo chip.
- **Overview** — 3D-tilt score gauge, animated stat tiles, missing-keyword and skill-gap panels, a
  next-best-action band, and a workflow shortcut grid.
- **Keywords** — animated stat tiles + a filterable keyword spectrum with **spring chip
  transitions** (Framer `AnimatePresence` + `layout`), AI-optimization before/after, semantic
  meters.
- **Mock interview** — animated selectors, a channel toggle with a live **voice waveform**, and a
  premium AI-persona card.
- **Skill roadmap / Q&A / Portfolio / History / Settings / Support** — one content-driven
  `DemoFeatureShell` with an animated milestone timeline, activity lists, and related-link grids.

![Keywords — spectrum](../designs/screens/aurora-keywords.png)
*Fig 5. Keyword spectrum with matched/missing filter and animated chips.*

![Mock interview](../designs/screens/aurora-mock-interview.png)
*Fig 6. Mock interview configuration and AI persona.*

---

## 9. Accessibility & performance

- **Reduced motion** is a first-class path: a global media query neutralizes animation, and every
  motion primitive + the 3D orb honor `prefers-reduced-motion`.
- **No-flash theming** via `next-themes`' pre-paint script; ambient backgrounds are CSS-scoped to
  the theme class (no JS, no hydration flash).
- **Keyboard** — ⌘K command palette; Radix primitives provide focus management for menus, selects,
  sheets, and dialogs.
- **Bundles** — the heavy 3D path is code-split (`ssr:false`, dynamic). Dashboard routes land around
  ~170 kB first-load JS; the WebGL chunk loads only where the orb appears. Frontend-heavy is a
  deliberate, acceptable tradeoff given there is no backend.

---

## 10. Engineering decisions & tradeoffs

- **`next-themes` for 3 custom themes** rather than a hand-rolled provider — we get persistence and
  SSR no-flash for free, and drive everything else through CSS variables.
- **CSS-variable tokens over Tailwind dark: variants** — one source of truth, infinitely theme-able,
  and components stay semantic.
- **View Transitions** for the switch — progressive enhancement; unsupported browsers and
  reduced-motion users get an instant swap.
- **Mock data untouched** — the original typed `data/` + `types/` contracts are preserved, so the
  redesign is provably non-breaking and the prototype stays honest.

---

## 11. Running & capturing screenshots

```bash
bun install
bun run dev            # http://localhost:3000
# or production:
bun run build && PORT=3100 bun run start
```

Capture all figures (all themes × all pages):

```bash
bun add -d playwright && npx playwright install chromium
node scripts/screenshots.mjs   # → designs/screens/<theme>-<page>.png
```

---

## 12. Appendix — selected file map

```
src/
├─ app/
│  ├─ layout.tsx                      fonts + providers + ambient bg
│  ├─ (marketing)/page.tsx            landing (hero, themes, bento, carousel, pricing)
│  ├─ login/ · signup/                split auth + demo chip
│  └─ app/<feature>/page.tsx          dashboard routes
├─ components/
│  ├─ theme-provider.tsx              next-themes + useThemeId + View Transitions
│  ├─ theme-switcher.tsx              segmented + card pickers
│  ├─ ambient-background.tsx          theme-scoped fixed backdrop
│  ├─ command-palette.tsx             ⌘K (cmdk)
│  ├─ brand/logo.tsx                  aperture "lens" mark
│  ├─ auth/                           brand panel, form, demo-credentials chip
│  ├─ motion/                         reveal, animated-number, interactive (magnetic/tilt/spotlight)
│  ├─ three/                          distorted-orb + hero-orb wrapper
│  ├─ layout/                         app sidebar, topbar, app + marketing layouts
│  └─ ui/                             button, card, badge, input, charts, carousel, marquee, sonner …
├─ features/                          overview, keywords, resume-rewrite, mock-interview, demo shell
├─ lib/themes.ts                      typed theme registry
├─ data/ · types/                     untouched mock contracts
└─ app/globals.css                    the tri-theme token engine + utility layer
```

---

*HiredLens is a UI/UX showcase prototype. All data is fictional; no information leaves the browser.*
