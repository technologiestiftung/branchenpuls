export const customStyles = {
	placeholder: (baseStyles, state) => ({
		...baseStyles,
		color: "#dadada",
		fontSize: "0.875rem",
		fontStyle: "italic",
	}),
	multiValueRemove: (styles, { data }) => ({
		...styles,
		color: "white",
		":hover": {
			backgroundColor: "#182D73",
			color: "white",
		},
	}),
	multiValue: (styles, { data }) => {
		return {
			...styles,
			backgroundColor: "#1E398F",
			width: "100%",
			":hover": {
				backgroundColor: "#182D73",
			},
			justifyContent: "space-between",
			// fontSize: "12px",
		};
	},
	multiValueLabel: (styles, { data }) => ({
		...styles,
		color: "white",
	}),
	indicatorSeparator: () => ({
		display: "none",
	}),
};

export function customTheme(theme) {
	return {
		...theme,
		colors: {
			...theme.colors,
			primary25: "#CAD3F2", // a5dbf8
			primary: "#182D73",
		},
	};
}

export function noOptionsMessage() {
	return "keine Auswahl verfügbar";
}

export function getOptionLabel(option) {
	return <div dangerouslySetInnerHTML={{ __html: option.label }} />;
}

export function customFilterOption(option, searchText) {
	const label = option.data.label.replace(/<\/?[^>]+(>|$)/g, "");
	return label.toLowerCase().includes(searchText.toLowerCase());
}
