import { FC } from "react";
import { IconPropType } from "./IconPropType";

export const BuildingsSanierung: FC<IconPropType> = ({
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
			viewBox="0 0 45 21"
		>
			<path
				fill={color2 || "currentColor"}
				d="M9.41478 9.56804C10.1004 8.70203 11.5516 8.01172 12.6561 8.02618L42.6535 8.41887C43.758 8.43333 44.0975 9.14708 43.4119 10.0131L35.963 19.4213C35.2774 20.2873 33.8262 20.9776 32.7217 20.9632L2.72428 20.5705C1.61981 20.556 1.28028 19.8423 1.96593 18.9763L9.41478 9.56804Z"
			/>
			<g>
				<rect x="24" y="1" width="10" height="14" fill="white" />

				<path
					fill={color1 || "currentColor"}
					d="M25 2.5C25 2.36739 25.0527 2.24021 25.1464 2.14645C25.2402 2.05268 25.3674 2 25.5 2H26.5C26.6326 2 26.7598 2.05268 26.8536 2.14645C26.9473 2.24021 27 2.36739 27 2.5V3.5C27 3.63261 26.9473 3.75979 26.8536 3.85355C26.7598 3.94732 26.6326 4 26.5 4H25.5C25.3674 4 25.2402 3.94732 25.1464 3.85355C25.0527 3.75979 25 3.63261 25 3.5V2.5ZM28 2.5C28 2.36739 28.0527 2.24021 28.1464 2.14645C28.2402 2.05268 28.3674 2 28.5 2H29.5C29.6326 2 29.7598 2.05268 29.8536 2.14645C29.9473 2.24021 30 2.36739 30 2.5V3.5C30 3.63261 29.9473 3.75979 29.8536 3.85355C29.7598 3.94732 29.6326 4 29.5 4H28.5C28.3674 4 28.2402 3.94732 28.1464 3.85355C28.0527 3.75979 28 3.63261 28 3.5V2.5ZM31.5 2C31.3674 2 31.2402 2.05268 31.1464 2.14645C31.0527 2.24021 31 2.36739 31 2.5V3.5C31 3.63261 31.0527 3.75979 31.1464 3.85355C31.2402 3.94732 31.3674 4 31.5 4H32.5C32.6326 4 32.7598 3.94732 32.8536 3.85355C32.9473 3.75979 33 3.63261 33 3.5V2.5C33 2.36739 32.9473 2.24021 32.8536 2.14645C32.7598 2.05268 32.6326 2 32.5 2H31.5ZM25 5.5C25 5.36739 25.0527 5.24021 25.1464 5.14645C25.2402 5.05268 25.3674 5 25.5 5H26.5C26.6326 5 26.7598 5.05268 26.8536 5.14645C26.9473 5.24021 27 5.36739 27 5.5V6.5C27 6.63261 26.9473 6.75979 26.8536 6.85355C26.7598 6.94732 26.6326 7 26.5 7H25.5C25.3674 7 25.2402 6.94732 25.1464 6.85355C25.0527 6.75979 25 6.63261 25 6.5V5.5ZM28.5 5C28.3674 5 28.2402 5.05268 28.1464 5.14645C28.0527 5.24021 28 5.36739 28 5.5V6.5C28 6.63261 28.0527 6.75979 28.1464 6.85355C28.2402 6.94732 28.3674 7 28.5 7H29.5C29.6326 7 29.7598 6.94732 29.8536 6.85355C29.9473 6.75979 30 6.63261 30 6.5V5.5C30 5.36739 29.9473 5.24021 29.8536 5.14645C29.7598 5.05268 29.6326 5 29.5 5H28.5ZM31 5.5C31 5.36739 31.0527 5.24021 31.1464 5.14645C31.2402 5.05268 31.3674 5 31.5 5H32.5C32.6326 5 32.7598 5.05268 32.8536 5.14645C32.9473 5.24021 33 5.36739 33 5.5V6.5C33 6.63261 32.9473 6.75979 32.8536 6.85355C32.7598 6.94732 32.6326 7 32.5 7H31.5C31.3674 7 31.2402 6.94732 31.1464 6.85355C31.0527 6.75979 31 6.63261 31 6.5V5.5ZM25.5 8C25.3674 8 25.2402 8.05268 25.1464 8.14645C25.0527 8.24021 25 8.36739 25 8.5V9.5C25 9.63261 25.0527 9.75979 25.1464 9.85355C25.2402 9.94732 25.3674 10 25.5 10H26.5C26.6326 10 26.7598 9.94732 26.8536 9.85355C26.9473 9.75979 27 9.63261 27 9.5V8.5C27 8.36739 26.9473 8.24021 26.8536 8.14645C26.7598 8.05268 26.6326 8 26.5 8H25.5ZM28 8.5C28 8.36739 28.0527 8.24021 28.1464 8.14645C28.2402 8.05268 28.3674 8 28.5 8H29.5C29.6326 8 29.7598 8.05268 29.8536 8.14645C29.9473 8.24021 30 8.36739 30 8.5V9.5C30 9.63261 29.9473 9.75979 29.8536 9.85355C29.7598 9.94732 29.6326 10 29.5 10H28.5C28.3674 10 28.2402 9.94732 28.1464 9.85355C28.0527 9.75979 28 9.63261 28 9.5V8.5ZM31.5 8C31.3674 8 31.2402 8.05268 31.1464 8.14645C31.0527 8.24021 31 8.36739 31 8.5V9.5C31 9.63261 31.0527 9.75979 31.1464 9.85355C31.2402 9.94732 31.3674 10 31.5 10H32.5C32.6326 10 32.7598 9.94732 32.8536 9.85355C32.9473 9.75979 33 9.63261 33 9.5V8.5C33 8.36739 32.9473 8.24021 32.8536 8.14645C32.7598 8.05268 32.6326 8 32.5 8H31.5Z"
				/>
				<path
					fill={color1 || "currentColor"}
					d="M23 1C23 0.734784 23.1054 0.48043 23.2929 0.292893C23.4804 0.105357 23.7348 0 24 0L34 0C34.2652 0 34.5196 0.105357 34.7071 0.292893C34.8946 0.48043 35 0.734784 35 1V15C35 15.2652 34.8946 15.5196 34.7071 15.7071C34.5196 15.8946 34.2652 16 34 16H24C23.7348 16 23.4804 15.8946 23.2929 15.7071C23.1054 15.5196 23 15.2652 23 15V1ZM34 1H24V15H27V12.5C27 12.3674 27.0527 12.2402 27.1464 12.1464C27.2402 12.0527 27.3674 12 27.5 12H30.5C30.6326 12 30.7598 12.0527 30.8536 12.1464C30.9473 12.2402 31 12.3674 31 12.5V15H34V1Z"
				/>
			</g>
			<g>
				<rect x="12" y="1" width="10" height="14" fill="white" />

				<path
					fill={color1 || "currentColor"}
					d="M13 2.5C13 2.36739 13.0527 2.24021 13.1464 2.14645C13.2402 2.05268 13.3674 2 13.5 2H14.5C14.6326 2 14.7598 2.05268 14.8536 2.14645C14.9473 2.24021 15 2.36739 15 2.5V3.5C15 3.63261 14.9473 3.75979 14.8536 3.85355C14.7598 3.94732 14.6326 4 14.5 4H13.5C13.3674 4 13.2402 3.94732 13.1464 3.85355C13.0527 3.75979 13 3.63261 13 3.5V2.5ZM16 2.5C16 2.36739 16.0527 2.24021 16.1464 2.14645C16.2402 2.05268 16.3674 2 16.5 2H17.5C17.6326 2 17.7598 2.05268 17.8536 2.14645C17.9473 2.24021 18 2.36739 18 2.5V3.5C18 3.63261 17.9473 3.75979 17.8536 3.85355C17.7598 3.94732 17.6326 4 17.5 4H16.5C16.3674 4 16.2402 3.94732 16.1464 3.85355C16.0527 3.75979 16 3.63261 16 3.5V2.5ZM19.5 2C19.3674 2 19.2402 2.05268 19.1464 2.14645C19.0527 2.24021 19 2.36739 19 2.5V3.5C19 3.63261 19.0527 3.75979 19.1464 3.85355C19.2402 3.94732 19.3674 4 19.5 4H20.5C20.6326 4 20.7598 3.94732 20.8536 3.85355C20.9473 3.75979 21 3.63261 21 3.5V2.5C21 2.36739 20.9473 2.24021 20.8536 2.14645C20.7598 2.05268 20.6326 2 20.5 2H19.5ZM13 5.5C13 5.36739 13.0527 5.24021 13.1464 5.14645C13.2402 5.05268 13.3674 5 13.5 5H14.5C14.6326 5 14.7598 5.05268 14.8536 5.14645C14.9473 5.24021 15 5.36739 15 5.5V6.5C15 6.63261 14.9473 6.75979 14.8536 6.85355C14.7598 6.94732 14.6326 7 14.5 7H13.5C13.3674 7 13.2402 6.94732 13.1464 6.85355C13.0527 6.75979 13 6.63261 13 6.5V5.5ZM16.5 5C16.3674 5 16.2402 5.05268 16.1464 5.14645C16.0527 5.24021 16 5.36739 16 5.5V6.5C16 6.63261 16.0527 6.75979 16.1464 6.85355C16.2402 6.94732 16.3674 7 16.5 7H17.5C17.6326 7 17.7598 6.94732 17.8536 6.85355C17.9473 6.75979 18 6.63261 18 6.5V5.5C18 5.36739 17.9473 5.24021 17.8536 5.14645C17.7598 5.05268 17.6326 5 17.5 5H16.5ZM19 5.5C19 5.36739 19.0527 5.24021 19.1464 5.14645C19.2402 5.05268 19.3674 5 19.5 5H20.5C20.6326 5 20.7598 5.05268 20.8536 5.14645C20.9473 5.24021 21 5.36739 21 5.5V6.5C21 6.63261 20.9473 6.75979 20.8536 6.85355C20.7598 6.94732 20.6326 7 20.5 7H19.5C19.3674 7 19.2402 6.94732 19.1464 6.85355C19.0527 6.75979 19 6.63261 19 6.5V5.5ZM13.5 8C13.3674 8 13.2402 8.05268 13.1464 8.14645C13.0527 8.24021 13 8.36739 13 8.5V9.5C13 9.63261 13.0527 9.75979 13.1464 9.85355C13.2402 9.94732 13.3674 10 13.5 10H14.5C14.6326 10 14.7598 9.94732 14.8536 9.85355C14.9473 9.75979 15 9.63261 15 9.5V8.5C15 8.36739 14.9473 8.24021 14.8536 8.14645C14.7598 8.05268 14.6326 8 14.5 8H13.5ZM16 8.5C16 8.36739 16.0527 8.24021 16.1464 8.14645C16.2402 8.05268 16.3674 8 16.5 8H17.5C17.6326 8 17.7598 8.05268 17.8536 8.14645C17.9473 8.24021 18 8.36739 18 8.5V9.5C18 9.63261 17.9473 9.75979 17.8536 9.85355C17.7598 9.94732 17.6326 10 17.5 10H16.5C16.3674 10 16.2402 9.94732 16.1464 9.85355C16.0527 9.75979 16 9.63261 16 9.5V8.5ZM19.5 8C19.3674 8 19.2402 8.05268 19.1464 8.14645C19.0527 8.24021 19 8.36739 19 8.5V9.5C19 9.63261 19.0527 9.75979 19.1464 9.85355C19.2402 9.94732 19.3674 10 19.5 10H20.5C20.6326 10 20.7598 9.94732 20.8536 9.85355C20.9473 9.75979 21 9.63261 21 9.5V8.5C21 8.36739 20.9473 8.24021 20.8536 8.14645C20.7598 8.05268 20.6326 8 20.5 8H19.5Z"
				/>
				<path
					fill={color1 || "currentColor"}
					d="M11 1C11 0.734784 11.1054 0.48043 11.2929 0.292893C11.4804 0.105357 11.7348 0 12 0L22 0C22.2652 0 22.5196 0.105357 22.7071 0.292893C22.8946 0.48043 23 0.734784 23 1V15C23 15.2652 22.8946 15.5196 22.7071 15.7071C22.5196 15.8946 22.2652 16 22 16H12C11.7348 16 11.4804 15.8946 11.2929 15.7071C11.1054 15.5196 11 15.2652 11 15V1ZM22 1H12V15H15V12.5C15 12.3674 15.0527 12.2402 15.1464 12.1464C15.2402 12.0527 15.3674 12 15.5 12H18.5C18.6326 12 18.7598 12.0527 18.8536 12.1464C18.9473 12.2402 19 12.3674 19 12.5V15H22V1Z"
				/>
			</g>
		</svg>
	);
};
