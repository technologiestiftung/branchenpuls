import { FC } from "react";

export interface FilterListType {
	activeFiltersList: number[];
	badgeClasses: string;
}

export const FilterList: FC<FilterListType> = ({
	activeFiltersList,
	badgeClasses = "",
}) => {
	return (
		<>
			{activeFiltersList.map((filterName, i) => {
				return (
					<div
						key={`key-${filterName?.replace(" ", "")}`}
						className={`${badgeClasses} mx-2 mb-2 w-fit rounded-xl bg-primary p-1 px-4 text-sm text-white`}
					>
						{filterName}
					</div>
				);
			})}
		</>
	);
};
