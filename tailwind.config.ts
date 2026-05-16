import type { Config } from "tailwindcss";

const config = {
  darkMode: "class",
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './modules/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--color-background)",
        foreground: "var(--color-secondary)",
        primary: {
          DEFAULT: "var(--color-primary)",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          foreground: "var(--color-muted)",
        },
        destructive: {
          DEFAULT: "var(--color-destructive)",
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-secondary)",
        },
        accent: {
          DEFAULT: "var(--color-muted)",
          foreground: "var(--color-secondary)",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
