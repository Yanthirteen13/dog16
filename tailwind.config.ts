import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF6F0",
        pinkbg: "#FFE9F0",
        ink: "#2C2A3A",
        primary: {
          DEFAULT: "#FF4E8E",
          dark: "#E63A77",
          soft: "#FFD6E4",
        },
        sun: "#FFD23F",
        grass: "#8BD46E",
        sky: "#5BB8F5",
        grape: "#B98CF0",
        // additive palette for the "奶油毒舌测评卡风" homepage redesign
        roast: {
          bg: "#FFF8F5",
          bg2: "#FFF1F3",
          bg3: "#FFFDF9",
          ink: "#251F2D",
          muted: "#7A7280",
          pink: "#FF2D7A",
          pinklight: "#FFE3EE",
          yellow: "#FFD23F",
          blue: "#4DA3FF",
          border: "#F1E6E0",
        },
      },
      fontFamily: {
        rounded: [
          "var(--font-rounded)",
          "ui-rounded",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 8px 24px -8px rgba(255, 78, 142, 0.25)",
        pop: "0 4px 0 0 rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl2: "1.75rem",
      },
    },
  },
  plugins: [],
};

export default config;
