import { FC } from "react";

export interface FilterIndicatorType {
	activeFiltersList: number[];
	setActiveFiltersList: (x: number[]) => void;
}

export const FilterIndicator: FC<FilterIndicatorType> = ({
	activeFiltersList,
}) => {
	return (
		<>
			<div className="fixed right-3 top-5 flex flex-col flex-wrap-reverse">
				{activeFiltersList.map((filterName, i) => {
					return (
						<div
							key={`key-${filterName?.replace(" ", "")}`}
							className="mb-2 w-fit rounded-xl bg-dark-grey p-1 px-4 text-sm text-white shadow-lg"
						>
							{filterName}
						</div>
					);
				})}
			</div>
		</>
	);
};
