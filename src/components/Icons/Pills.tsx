import { FC } from "react";
import { IconPropType } from "./IconPropType";

export const Pills: FC<IconPropType> = ({
	color1,
	color2,
	color3,
	strokeWidth = 2,
	size = 40,
	...props
}) => {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 40 40"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M12 26H22"
				stroke={color1 || "currentColor"}
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 20H28"
				stroke={color1 || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M12 14H18"
				stroke={color1 || "currentColor"}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>

		// <svg
		// 	xmlns="http://www.w3.org/2000/svg"
		// 	width={size}
		// 	height={size}
		// 	fill="currentColor"
		// 	viewBox="0 0 16 16"
		// >
		// 	<path
		// 		fill-rule="evenodd"
		// 		d="M2 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm0-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
		// 	/>
		// </svg>
	);
};
