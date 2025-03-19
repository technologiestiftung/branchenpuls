import { FC, useState } from "react";
import { FilterList } from "@components/FilterIndicator/FilterList";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";
// import { Pills } from "@components/Icons";
// import { Modal } from "@components/Modal";

export interface FilterIndicatorType {
	activeFiltersList: string[];
}

export const FilterIndicator: FC<FilterIndicatorType> = ({
	activeFiltersList,
}) => {
	const hasMobileSize = useHasMobileSize();
	// const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

	return (
		<>
			{!hasMobileSize && (
				<div className="pointer-events-none fixed right-3 top-24 flex flex-col flex-wrap-reverse xl:top-6">
					<FilterList
						activeFiltersList={activeFiltersList}
						badgeClasses="shadow-lg"
						hideFirstEntry={false}
					></FilterList>
				</div>
			)}
			{/* No filter list on mobile */}
			{/* 
			{hasMobileSize && activeFiltersList?.length != 1 && (
				<button
					onClick={() => setShowMobileFilter(!showMobileFilter)}
					className="fixed right-[28px] top-6 z-10 flex h-[40px] w-[40px] cursor-pointer flex-col flex-wrap-reverse content-center justify-between rounded-[4px] bg-primary p-[8px] text-white shadow-lg hover:bg-darker-primary"
				>
					<Pills />
				</button>
			)}

			<Modal
				headerName={"Aktive Filter " + activeFiltersList[0]}
				onClose={() => {
					setShowMobileFilter(!showMobileFilter);
				}}
				open={hasMobileSize && showMobileFilter}
			>
				<div className="max-h-[50vh] overflow-auto">
					<FilterList
						activeFiltersList={activeFiltersList}
						badgeClasses=""
						hideFirstEntry={true}
					></FilterList>
				</div>
			</Modal> */}
		</>
	);
};
