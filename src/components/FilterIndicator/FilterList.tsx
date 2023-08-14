import { FC } from "react";

export interface FilterListType {
	activeFiltersList: number[];
	badgeClasses: string;
	hideFirstEntry: boolean;
}

export const FilterList: FC<FilterListType> = ({
	activeFiltersList,
	badgeClasses = "",
	hideFirstEntry = false,
}) => {
	const filterList = hideFirstEntry
		? activeFiltersList.slice(1)
		: activeFiltersList;
	return (
		<>
			{filterList.map((filterName, i) => {
				return (
					<div
						key={`key-${filterName?.replace(" ", "")}`}
						className={`${badgeClasses} mb-2 w-fit rounded-3xl bg-primary p-1 px-4 text-sm text-white`}
					>
						{filterName}
					</div>
				);
			})}
		</>
	);
};
