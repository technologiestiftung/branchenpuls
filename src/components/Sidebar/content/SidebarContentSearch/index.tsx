import { FC } from "react";
import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { Search } from "@components/Search";

export interface SidebarContentSearchType {
	setMapCenter: (center: number[] | null) => void;
}

export const SidebarContentSearch: FC<SidebarContentSearchType> = ({
	setMapCenter,
}) => {
	return (
		<>
			<SidebarHeader text={"Standort Suche"} />
			<SidebarBody>
				<div className="gap- flex w-full flex-col pr-[16px]">
					<p className="text-sm text-dark-grey">
						Finde dein Unternehmen, die relevante Straße für eine Neugründung
						oder betrachte deine gewohnte Nachbarschaft aus der Perspektive
						eines Wirtschaftsstandorts.
					</p>

					<Search setMapCenter={setMapCenter}></Search>
				</div>
			</SidebarBody>
		</>
	);
};
