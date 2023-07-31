import "./globals.css";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
export const metadata = {
	title: "Branchen Puls",
	description: "Gewerbedaten von Berlin erkunden",
	keywords: ["ODIS", "Technologiestiftung Berlin", "CityLAB", "IHK Berlin"],
	locale: "de_DE",
	type: "website",
	themeColor: "#1e398f",
	twitter: {
		card: "summary_large_image",
		title: "Branchen Puls",
		description: "Gewerbedaten von Berlin erkunden",
		// creator: "@nextjs",
		images: ["https://nextjs.org/og.png"],
	},
	openGraph: {
		title: "Branchen Puls",
		description: "Gewerbedaten von Berlin erkunden",
		url: "https://nextjs.org",
		siteName: "Next.js",
		images: [
			{
				url: "https://nextjs.org/og.png",
				width: 800,
				height: 600,
			},
			{
				url: "https://nextjs.org/og-alt.png",
				width: 1800,
				height: 1600,
				alt: "My custom alt",
			},
		],
		locale: "de_DE",
		type: "website",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>{children}</body>
		</html>
	);
}
