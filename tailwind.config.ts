import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "2rem",
        screens: {
          "2xl": "1440px"
        }
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"]
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          2: "hsl(var(--accent-2))",
          3: "hsl(var(--accent-3))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        grad: {
          1: "hsl(var(--grad-1))",
          2: "hsl(var(--grad-2))",
          3: "hsl(var(--grad-3))"
        },
        glow: "hsl(var(--glow))"
      },
      borderRadius: {
        "2xl": "calc(var(--radius) + 6px)",
        xl: "calc(var(--radius) + 2px)",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 4px)",
        sm: "calc(var(--radius) - 8px)"
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.33, 1, 0.68, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)",
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)"
      },
      boxShadow: {
        depth:
          "0 0 0 1px hsl(var(--border) / 0.5), 0 1px 2px hsl(var(--shadow-color) / 0.3), 0 12px 30px -10px hsl(var(--shadow-color) / 0.5)",
        "depth-lg":
          "0 0 0 1px hsl(var(--border) / 0.4), 0 4px 10px hsl(var(--shadow-color) / 0.3), 0 26px 60px -16px hsl(var(--shadow-color) / 0.6)",
        glow: "0 0 0 1px hsl(var(--glow) / 0.2), 0 14px 44px -12px hsl(var(--glow) / 0.45)"
      },
      backgroundImage: {
        "grad-brand": "linear-gradient(100deg, hsl(var(--grad-1)), hsl(var(--grad-2)) 50%, hsl(var(--grad-3)))",
        "grad-radial": "radial-gradient(ellipse at center, var(--tw-gradient-stops))"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" }
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-22px) translateX(8px)" }
        },
        "spin-slow": {
          to: { transform: "rotate(360deg)" }
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" }
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.55", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" }
        },
        "pulse-ring": {
          "0%": { transform: "scale(0.8)", opacity: "0.7" },
          "100%": { transform: "scale(2.2)", opacity: "0" }
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.94)" },
          to: { opacity: "1", transform: "scale(1)" }
        },
        "ambient-drift": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.8" }
        },
        "icon-halo": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" }
        },
        "border-beam": {
          to: { "offset-distance": "100%" }
        },
        "caret-blink": {
          "0%, 70%, 100%": { opacity: "1" },
          "20%, 50%": { opacity: "0" }
        }
      },
      animation: {
        shimmer: "shimmer 2.4s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 9s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        marquee: "marquee 32s linear infinite",
        "marquee-reverse": "marquee-reverse 32s linear infinite",
        "pulse-glow": "pulse-glow 4s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.6s cubic-bezier(0.16, 1, 0.3, 1) infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both",
        "ambient-drift": "ambient-drift 8s ease-in-out infinite",
        "icon-halo": "icon-halo 3.2s ease-in-out infinite",
        "caret-blink": "caret-blink 1.1s steps(1) infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;
