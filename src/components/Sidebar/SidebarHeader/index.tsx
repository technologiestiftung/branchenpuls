import { FC } from "react";
import classNames from "classnames";

export interface SidebarHeaderType {
	text: string;
	fontSize?: string;
	sidebarId?: string;
}

export const SidebarHeader: FC<SidebarHeaderType> = ({
	text,
	fontSize = "text-2xl",
	sidebarId = "",
}) => {
	return (
		<>
			<h1
				className={classNames(
					fontSize,
					"scroll-shadow sticky top-0 z-10 w-full bg-white px-4 pb-4 pt-7 font-medium text-dark-grey"
				)}
			>
				<span id={sidebarId} className="inline-block w-[85%]">
					{text}
				</span>
			</h1>
		</>
	);
};
