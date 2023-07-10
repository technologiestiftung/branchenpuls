import "./globals.css";

export const metadata = {
	title: "BranchenPuls",
	description: "Gewerbedaten von Berlin erkunden",
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
