import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        smidhusBackground: "#0A0D10",
        smidhusForgeOrange: "#FF6B00",
        smidhusTerminalGreen: "#00FF66",
        smidhusBorder: "#1F242C",
      },
    },
  },
};

export default config;
