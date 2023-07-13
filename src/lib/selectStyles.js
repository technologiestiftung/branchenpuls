export function customStyles(theme) {
	return {
		placeholder: (baseStyles, state) => ({
			...baseStyles,
			color: "#dadada",
			fontSize: "0.875rem",
			fontStyle: "italic",
		}),
	};
}

export function customTheme(theme) {
	return {
		...theme,
		colors: {
			...theme.colors,
			primary25: "#a5dbf8",
			primary: "#182D73",
		},
	};
}
