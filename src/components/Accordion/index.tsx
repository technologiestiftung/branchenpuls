import { ChevronDown } from "@components/Icons/ChevronDown";
import React, { FC, useState, useEffect } from "react";

interface AccordionPropType {
	title: string;
	titleClasses?: string;
	content: React.JSX.Element;
	active?: boolean;
}

export const Accordion: FC<AccordionPropType> = ({
	title,
	titleClasses = "",
	content,
	active,
}) => {
	const [isActive, setIsActive] = useState<boolean>(active || false);

	useEffect(() => {
		setIsActive(active || false);
	}, [active]);

	return (
		<div className="mt-[24px] border-b border-dashed border-light-grey pb-[4px]">
			<button
				className={`flex w-full justify-between`}
				onClick={() => {
					setIsActive(!isActive);
				}}
				tabIndex={isActive ? 1 : 0}
			>
				<h2 className={`${titleClasses} text-left text-sm font-bold`}>
					{title}
				</h2>
				<ChevronDown
					className={`transform transition-transform
						 ${isActive ? "rotate-180" : "rotate-0"}
					`}
				/>
			</button>
			{isActive && (
				<div className="w-full pb-[10px] pt-[16px] text-sm">{content}</div>
			)}
		</div>
	);
};
