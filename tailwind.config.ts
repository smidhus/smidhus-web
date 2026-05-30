import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        smidhusBackground: "#0f1316",
        smidhusForgeOrange: "#FF6B00",
        smidhusTerminalGreen: "#00FF66",
        smidhusBorder: "#1F242C",
        smidhusBone: "#EAE6DF",
        smidhusBoneDim: "#A39F95",
        smidhusMutedOrange: "#D38B5B",
      },
    },
  },
};

export default config;
