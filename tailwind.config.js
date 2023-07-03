/** @type {import('tailwindcss').Config} */
const SIDEBARWIDTH = "360px";

module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      width: {
        sidebar: SIDEBARWIDTH,
      },
      spacing: {
        sidebar: SIDEBARWIDTH,
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#003366",
          secondary: "#ccd7e6",
          third: "#56bd66",
          "base-100": "#FFFFFF",
          info: "#3ABFF8",
          success: "#36D399",
          warning: "#FBBD23",
          error: "#F87272",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
