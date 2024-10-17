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
        primary: "#333333", // color principal
        secondary: "#50E3C2", // color secundario
        background: "#F5F5F5", // color de fondo
        text: "#333333", // color de texto
        border: "#E1E1E1", // color de borde
      },
    },
  },
  plugins: [],
};

export default config;
