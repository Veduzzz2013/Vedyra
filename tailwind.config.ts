import type { Config } from "tailwindcss";
export default {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: { colors: { primary: "#2563EB", accent: "#38BDF8", ink: "#0F172A" } } },
  plugins: []
} satisfies Config;
