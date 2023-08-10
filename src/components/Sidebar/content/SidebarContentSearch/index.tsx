import { FC } from "react";
import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { Search } from "@components/Search";
import { ViewStateType } from "@common/interfaces";

export interface SidebarContentSearchType {
	viewState: ViewStateType;
	setViewState: React.Dispatch<React.SetStateAction<ViewStateType>>;
	setSearchResult: (center: number[] | null) => void;
	searchResult: number[] | null;
}

export const SidebarContentSearch: FC<SidebarContentSearchType> = ({
	viewState,
	setViewState,
	searchResult,
	setSearchResult,
}) => {
	return (
		<>
			<SidebarHeader text={"Adresssuche"} />
			<SidebarBody>
				<div className="gap- flex w-full flex-col">
					<p className="text-sm text-dark-grey">
						Finde deinen Bezirke, deine Straße oder einen anderen Ort in Berlin.
					</p>

					<Search
						viewState={viewState}
						setViewState={setViewState}
						searchResult={searchResult}
						setSearchResult={setSearchResult}
					></Search>
				</div>
			</SidebarBody>
		</>
	);
};
