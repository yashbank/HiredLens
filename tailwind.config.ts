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
          "2xl": "1400px"
        }
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
          foreground: "hsl(var(--accent-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.33, 1, 0.68, 1)",
        out: "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      boxShadow: {
        depth:
          "0 0 0 1px hsl(var(--border) / 0.5), 0 1px 2px rgb(0 0 0 / 0.12), 0 10px 28px -8px rgb(0 0 0 / 0.38)",
        "depth-lg":
          "0 0 0 1px hsl(var(--border) / 0.4), 0 4px 8px rgb(0 0 0 / 0.18), 0 22px 48px -14px rgb(0 0 0 / 0.48)",
        glow: "0 0 0 1px hsl(var(--primary) / 0.18), 0 10px 36px -10px hsl(var(--primary) / 0.35)"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200% center" },
          "100%": { backgroundPosition: "-200% center" }
        },
        "ambient-drift": {
          "0%, 100%": { opacity: "0.45" },
          "50%": { opacity: "0.75" }
        },
        "icon-halo": {
          "0%, 100%": { opacity: "0.35" },
          "50%": { opacity: "0.7" }
        }
      },
      animation: {
        shimmer: "shimmer 2.2s ease-in-out infinite",
        "ambient-drift": "ambient-drift 8s ease-in-out infinite",
        "icon-halo": "icon-halo 3.2s ease-in-out infinite"
      }
    }
  },
  plugins: [require("tailwindcss-animate")]
};

export default config;

