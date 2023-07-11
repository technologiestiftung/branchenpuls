/** @type {import('tailwindcss').Config} */
const SIDEBARWIDTH = "360px";

module.exports = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		fontFamily: {
			sans: ["Clan Book"],
			medium: ["Clan Medium"],
			bold: ["Clan Bold"],
		},
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
			colors: {
				"dark-grey": "#3B3B3A",
				"darker-primary": "#182D73",
				"light-grey": "#B1B2B3",
				emerald: "#00727C",
				"darker-emerald": "#004247",
				babyblue: "#2E92D0",
				"darker-babyblue": "#2575A7",
				"custom-red": "#E40032",
				"darker-custom-red": "#B20027",
			},
		},
	},
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: "#1E398F",
					secondary: "#ccd7e6",
					third: "#56bd66",
					"base-100": "#FFFFFF",
					info: "#3ABFF8",
					success: "#36D399",
					warning: "#FBBD23",
					error: "#F87272",
					".btn-outline.btn-primary:hover": {
						color: "white",
						"background-color": "#1E398F",
					},
				},
			},
		],
	},
	plugins: [require("daisyui")],
};
