import { FC, useState } from "react";
import { FilterList } from "@/components/FilterIndicator/FilterList";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";
import { Filter, Pills } from "@components/Icons";

export interface FilterIndicatorType {
	activeFiltersList: number[];
}

export const FilterIndicator: FC<FilterIndicatorType> = ({
	activeFiltersList,
}) => {
	const hasMobileSize = useHasMobileSize();
	const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

	return (
		<>
			{!hasMobileSize && (
				<div className="fixed right-3 top-5 flex flex-col flex-wrap-reverse">
					<FilterList
						activeFiltersList={activeFiltersList}
						badgeClasses="shadow-lg"
					></FilterList>
				</div>
			)}

			{hasMobileSize && activeFiltersList.length != 1 && (
				<button
					onClick={() => setShowMobileFilter(!showMobileFilter)}
					className="fixed right-[28px] top-6 z-10 flex h-[40px] w-[40px] cursor-pointer flex-col flex-wrap-reverse justify-between rounded-[4px] bg-primary p-[8px] text-white shadow-lg hover:bg-darker-primary"
				>
					<Pills />
					{/* <Filter /> */}
				</button>
			)}

			{hasMobileSize && showMobileFilter && (
				<div
					onClick={() => setShowMobileFilter(!showMobileFilter)}
					className="fixed right-0 top-0 z-40 flex h-full w-full flex-col flex-wrap-reverse bg-white/70 pt-20 "
				>
					<div className="">
						<FilterList
							activeFiltersList={activeFiltersList}
							badgeClasses="shadow-lg"
						></FilterList>
					</div>
				</div>
			)}
		</>
	);
};
