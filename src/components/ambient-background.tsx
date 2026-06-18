/**
 * Fixed, theme-scoped ambient backdrop. Pure CSS — swaps with the <html> theme
 * class so there is no hydration flash. Sits behind all content (-z-10).
 */
export function AmbientBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* AURORA — drifting neon blobs over deep glass */}
      <div className="ambient-aurora absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,hsl(var(--primary)/0.10),transparent_60%)]" />
        <div
          className="absolute -left-[12%] -top-[14%] h-[58vw] w-[58vw] rounded-full opacity-60 blur-[100px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--grad-1) / 0.85), transparent 60%)",
            animation: "blob-a 20s ease-in-out infinite"
          }}
        />
        <div
          className="absolute -right-[10%] top-[10%] h-[48vw] w-[48vw] rounded-full opacity-50 blur-[100px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--grad-2) / 0.7), transparent 60%)",
            animation: "blob-b 26s ease-in-out infinite"
          }}
        />
        <div
          className="absolute bottom-[-18%] left-[20%] h-[44vw] w-[44vw] rounded-full opacity-45 blur-[110px]"
          style={{
            background: "radial-gradient(circle, hsl(var(--grad-3) / 0.6), transparent 60%)",
            animation: "blob-a 24s ease-in-out infinite reverse"
          }}
        />
      </div>

      {/* PORCELAIN — faint grid + soft single light */}
      <div className="ambient-porcelain absolute inset-0">
        <div className="grid-bg absolute inset-0 opacity-70" />
        <div className="absolute -top-40 left-1/2 h-[55vh] w-[80vw] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,hsl(var(--primary)/0.08),transparent_65%)]" />
        <div className="absolute bottom-0 right-0 h-[40vh] w-[40vw] rounded-full bg-[radial-gradient(circle,hsl(var(--accent-2)/0.06),transparent_65%)] blur-2xl" />
      </div>

      {/* PULSE — vivid mesh gradient + grain + slow conic glow */}
      <div className="ambient-pulse grain absolute inset-0 mesh-bg">
        <div
          className="absolute left-1/2 top-1/2 h-[120vmax] w-[120vmax] -translate-x-1/2 -translate-y-1/2 opacity-25 blur-3xl"
          style={{
            background:
              "conic-gradient(from 0deg, hsl(var(--grad-1)/0.5), hsl(var(--grad-2)/0.5), hsl(var(--grad-3)/0.5), hsl(var(--grad-1)/0.5))",
            animation: "spin-slow 40s linear infinite"
          }}
        />
      </div>
    </div>
  );
}
