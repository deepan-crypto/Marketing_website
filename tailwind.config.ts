import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        banana: "#F4C430",
        leaf: "#2E8B57",
        flame: "#FF8C00",
        cream: "#FFF7DF",
        ink: "#182215",
      },
      boxShadow: {
        glow: "0 24px 80px rgba(244, 196, 48, 0.3)",
        pack: "0 28px 80px rgba(46, 139, 87, 0.28)",
      },
      fontFamily: {
        display: ["var(--font-display)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-warm":
          "radial-gradient(circle at 20% 20%, rgba(244,196,48,0.35), transparent 32%), radial-gradient(circle at 80% 10%, rgba(255,140,0,0.2), transparent 28%), linear-gradient(135deg, #FFFBEA 0%, #FFF4C1 42%, #F9FFE8 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
