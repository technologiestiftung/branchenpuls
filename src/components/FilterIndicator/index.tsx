import { FC, useState } from "react";
import { FilterList } from "@/components/FilterIndicator/FilterList";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";
import { Pills, Cross } from "@components/Icons";

export interface FilterIndicatorType {
	activeFiltersList: number[];
}

export const FilterIndicator: FC<FilterIndicatorType> = ({
	activeFiltersList,
}) => {
	const hasMobileSize = useHasMobileSize();
	const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);
	function close(e) {
		e.stopPropagation();
		setShowMobileFilter(!showMobileFilter);
	}

	return (
		<>
			{!hasMobileSize && (
				<div className="fixed right-3 top-5 flex flex-col flex-wrap-reverse">
					<FilterList
						activeFiltersList={activeFiltersList}
						badgeClasses="shadow-lg"
						hideFirstEntry={false}
					></FilterList>
				</div>
			)}

			{hasMobileSize && activeFiltersList?.length != 1 && (
				<button
					onClick={() => setShowMobileFilter(!showMobileFilter)}
					className="fixed right-[28px] top-6 z-10 flex h-[40px] w-[40px] cursor-pointer flex-col flex-wrap-reverse content-center justify-between rounded-[4px] bg-primary p-[8px] text-white shadow-lg hover:bg-darker-primary"
				>
					<Pills />
				</button>
			)}

			{hasMobileSize && showMobileFilter && (
				<>
					<div className="absolute left-0 top-0 z-20 backdrop-blur">
						<div className="flex h-screen w-screen bg-primary opacity-30"></div>
					</div>
					<div className="absolute left-0 top-0 z-50" onClick={close}>
						<div className="flex h-screen w-screen items-center justify-center py-[18px] sm:hidden">
							<div className="flex w-[320px] flex-col rounded-lg bg-white p-5">
								<button
									onClick={() => setShowMobileFilter(!showMobileFilter)}
									className="flex w-full justify-end text-dark-grey"
								>
									<Cross />
								</button>
								<h1 className="mb-[16px] text-lg font-bold text-dark-grey">
									Aktive Filter {activeFiltersList[0]}
								</h1>
								<div className="max-h-[50vh] overflow-scroll">
									<FilterList
										activeFiltersList={activeFiltersList}
										badgeClasses=""
										hideFirstEntry={true}
									></FilterList>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
		</>
	);
};
