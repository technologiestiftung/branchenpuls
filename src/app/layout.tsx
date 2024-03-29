import "./globals.css";

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata#metadata-fields
export const metadata = {
	title: "Berlins Branchenpuls",
	description:
		"Die Berliner Wirtschaft ist so bunt wie die Stadt selbst. Mit dem Branchenpuls tauchst du in die dynamische Gewerbelandschaft und die verschiedenen Branchen ein. Exploriere und vergleiche Berlins Gewerbe vom Bezirk bis zum Kiez.",
	keywords: ["ODIS", "Technologiestiftung Berlin", "CityLAB", "IHK Berlin"],
	locale: "de_DE",
	type: "website",
	themeColor: "#1e398f",
	twitter: {
		card: "summary_large_image",
		title: "Berlins Branchenpuls",
		description:
			"Die Berliner Wirtschaft ist so bunt wie die Stadt selbst. Mit dem Branchenpuls tauchst du in die dynamische Gewerbelandschaft und die verschiedenen Branchen ein. Exploriere und vergleiche Berlins Gewerbe vom Bezirk bis zum Kiez.",
		// creator: "@nextjs",
		images: ["https://branchenpuls.odis-berlin.de/social-image-1280x640.png"],
	},
	openGraph: {
		title: "Berlins Branchenpuls",
		description:
			"Die Berliner Wirtschaft ist so bunt wie die Stadt selbst. Mit dem Branchenpuls tauchst du in die dynamische Gewerbelandschaft und die verschiedenen Branchen ein. Exploriere und vergleiche Berlins Gewerbe vom Bezirk bis zum Kiez.",
		url: "https://branchenpuls.odis-berlin.de",
		siteName: "branchenpuls.odis-berlin.de",
		images: [
			{
				url: "https://branchenpuls.odis-berlin.de/open-graph-800x600.png",
				width: 800,
				height: 600,
			},
			{
				url: "https://branchenpuls.odis-berlin.de/open-graph-1800x1600.png",
				width: 1800,
				height: 1600,
				alt: "Vorschau vom Berliner Branchenpuls",
			},
		],
		locale: "de_DE",
		type: "website",
	},
	viewport: {
		width: "device-width",
		initialScale: 1,
		maximumScale: 1,
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
