import { FC } from "react";
import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { Charts } from "@components/Charts";
import { MixedArray } from "@common/interfaces";

export interface SidebarContentChartsTypes {
	allFilter: MixedArray;
	// viewState: ViewStateType;
	// setViewState: React.Dispatch<React.SetStateAction<ViewStateType>>;
	// setSearchResult: (center: number[] | null) => void;
}

export const SidebarContentCharts: FC<SidebarContentChartsTypes> = ({
	allFilter,
}) => {
	return (
		<>
			<SidebarHeader text={"Statistiken"} />
			<SidebarBody>
				<div className="gap- flex w-full flex-col">
					<p className="text-sm text-dark-grey">
						Hier findest du Statistiken zu den angezeigten Branchen.
					</p>
					<Charts allFilter={allFilter} />
				</div>
			</SidebarBody>
		</>
	);
};
