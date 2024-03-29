import { FC } from "react";
import { IconPropType } from "./IconPropType";

export const Euro: FC<IconPropType> = ({
	color1,
	color2,
	color3,
	strokeWidth = 2,
	size = 24,
	...props
}) => {
	const col1 = color1;
	const col2 = color3 || color2 || color1;
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			fill={col1}
			viewBox="0 0 16 16"
		>
			<path
				fill={color1 || "currentColor"}
				d="M4 9.42h1.063C5.4 12.323 7.317 14 10.34 14c.622 0 1.167-.068 1.659-.185v-1.3c-.484.119-1.045.17-1.659.17-2.1 0-3.455-1.198-3.775-3.264h4.017v-.928H6.497v-.936c0-.11 0-.219.008-.329h4.078v-.927H6.618c.388-1.898 1.719-2.985 3.723-2.985.614 0 1.175.05 1.659.177V2.194A6.617 6.617 0 0 0 10.341 2c-2.928 0-4.82 1.569-5.244 4.3H4v.928h1.01v1.265H4v.928z"
			/>
		</svg>
	);
};
