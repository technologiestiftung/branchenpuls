import { FC } from "react";

export interface HeatmapToggleType {
	color: string;
	showHeatmap: boolean;
	setShowHeatmap: (show: boolean) => void;
}

const colors = {
	"#e40032": "text-custom-red hover:text-darker-custom-red",
	"#2e92d0": "text-babyblue hover:text-darker-babyblue",
	"#00727c": "text-emerald hover:text-darker-emerald",
};

export const HeatmapToggle: FC<HeatmapToggleType> = ({
	color,
	showHeatmap,
	setShowHeatmap,
}) => {
	return (
		<button
			className={`fixed right-4 top-[22px] z-30 rounded shadow-lg drop-shadow-lg ${
				showHeatmap ? "border-2" : ""
				// @ts-ignore
			} ${colors[color]}`}
			title={showHeatmap ? "Streudiagramm anzeigen" : "Heatmap anzeigen"}
			onClick={() => setShowHeatmap(!showHeatmap)}
		>
			{!showHeatmap ? (
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<rect
						width="40"
						height="40"
						rx="4"
						fill="currentColor"
						fillOpacity="0.3"
					/>
					<g filter="url(#filter0_f_6_115)">
						<circle cx="15" cy="15" r="10" fill="currentColor" />
					</g>
					<g filter="url(#filter1_f_6_115)">
						<circle cx="25" cy="25" r="10" fill="currentColor" />
					</g>
					<circle cx="15" cy="15" r="5" fill="currentColor" />
					<circle cx="25" cy="25" r="5" fill="currentColor" />
					<defs>
						<filter
							id="filter0_f_6_115"
							x="2"
							y="2"
							width="26"
							height="26"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="BackgroundImageFix"
								result="shape"
							/>
							<feGaussianBlur
								stdDeviation="1.5"
								result="effect1_foregroundBlur_6_115"
							/>
						</filter>
						<filter
							id="filter1_f_6_115"
							x="12"
							y="12"
							width="26"
							height="26"
							filterUnits="userSpaceOnUse"
							colorInterpolationFilters="sRGB"
						>
							<feFlood floodOpacity="0" result="BackgroundImageFix" />
							<feBlend
								mode="normal"
								in="SourceGraphic"
								in2="BackgroundImageFix"
								result="shape"
							/>
							<feGaussianBlur
								stdDeviation="1.5"
								result="effect1_foregroundBlur_6_115"
							/>
						</filter>
					</defs>
				</svg>
			) : (
				<svg
					width="40"
					height="40"
					viewBox="0 0 40 40"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<circle cx="15" cy="15" r="5" fill="currentColor" />
					<circle cx="25" cy="25" r="5" fill="currentColor" />
					<rect x="0.5" y="0.5" width="39" height="39" rx="3.5" />
				</svg>
			)}
		</button>
	);
};
