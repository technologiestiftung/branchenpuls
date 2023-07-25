"use client";
import { FC, useState, useEffect } from "react";
import { MapComponent } from "@components/map/Map";
import { SidebarContentFilter } from "@components/Sidebar/content/SidebarContentFilter";
import { SidebarWrapper } from "@components/Sidebar/SidebarWrapper";
import { NavView, SidebarNav } from "@components/Sidebar/SidebarNav";
import { Welcome } from "@components/Welcome";
import { SidebarContentInfo } from "@components/Sidebar/content/SidebarContentInfo";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { BranchenPulsButton } from "@components/BranchenPulsButton";
import { SidebarContentSearch } from "@components/Sidebar/content/SidebarContentSearch";
import { ViewStateType } from "@common/interfaces";
import { JoyrideWrapper } from "@components/JoyrideWrapper";
import { getNextOrPreviousId } from "@lib/getNextOrPreviousId";
import { FilterIndicator } from "@components/FilterIndicator";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";
import { Filter } from "@components/Icons/Filter";

export const App = () => {
	const [deckLayers, setDeckLayers] = useState([]);
	const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
	const [layersData, setLayersData] = useState<object>({});
	const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(true);
	const [mobileHeight, setMobileHeight] = useState<"half" | "full">("half");
	const [navView, setNavView] = useState<NavView>("filter");
	const [loading, setLoading] = useState<boolean>(false);
	const [showWelcome, setShowWelcome] = useState<boolean>(true);
	const [showNextLayer, setShowNextLayer] = useState<boolean>(false);
	const [layerColor, setLayerColor] = useState<string>("##e5e7eb");
	const [layerCount, setLayerCount] = useState<null | number>(0);
	const [searchResult, setSearchResult] = useState<number[] | null>(null);
	const [runJoyride, setRunJoyride] = useState<boolean>(false);
	const [viewState, setViewState] = useState<ViewStateType>({
		longitude: 13.405,
		latitude: 52.52,
		zoom: 10,
		pitch: 0,
		bearing: 0,
		transitionDuration: 300,
	});
	const [activeFiltersList, setActiveFiltersList] = useState<number[]>([]);
	const [showMobileFilter, setShowMobileFilter] = useState<boolean>(false);

	useEffect(() => {
		setLayerColor(layersData[activeLayerId]?.colorHex || "#e5e7eb");
		setLayerCount(layersData[activeLayerId]?.count || 0);
		setShowNextLayer(Object.keys(layersData).length > 1);
	}, [layersData, activeLayerId]);

	function applyNextLayer(option: "next" | "previous") {
		let nextlayerId = getNextOrPreviousId(
			activeLayerId,
			Object.keys(layersData),
			option
		);
		setActiveLayerId(nextlayerId);
	}

	const hasMobileSize = useHasMobileSize();

	return (
		<>
			<main className="">
				<LoadingIndicator loading={loading}></LoadingIndicator>
				{runJoyride && (
					<JoyrideWrapper
						runJoyride={runJoyride}
						setRunJoyride={setRunJoyride}
						setShowWelcome={setShowWelcome}
					/>
				)}
				<BranchenPulsButton
					setShowWelcome={setShowWelcome}
					showWelcome={showWelcome}
				/>
				{showWelcome ? (
					<Welcome
						setShowWelcome={setShowWelcome}
						setNavView={setNavView}
						setSidebarMenuOpen={setSidebarMenuOpen}
						setRunJoyride={setRunJoyride}
					/>
				) : null}
				<MapComponent
					deckLayers={deckLayers}
					viewState={viewState}
					setViewState={setViewState}
				></MapComponent>

				{!hasMobileSize && (
					<div className="fixed right-3 top-5 flex flex-col flex-wrap-reverse">
						<FilterIndicator
							activeFiltersList={activeFiltersList}
							badgeClasses="shadow-lg"
						></FilterIndicator>
					</div>
				)}

				{hasMobileSize && activeFiltersList.length != 1 && (
					<button
						onClick={() => setShowMobileFilter(!showMobileFilter)}
						className="fixed right-[28px] top-6 z-10 flex h-[40px] w-[40px] cursor-pointer flex-col flex-wrap-reverse justify-between rounded-[4px] bg-primary p-[8px] text-white shadow-lg hover:bg-darker-primary"
					>
						<Filter />
					</button>
				)}

				{hasMobileSize && showMobileFilter && (
					<div
						onClick={() => setShowMobileFilter(!showMobileFilter)}
						className="fixed right-0 top-0 z-40 flex h-full w-full flex-col flex-wrap-reverse bg-white/70 pt-20 "
					>
						<div className="">
							<FilterIndicator
								activeFiltersList={activeFiltersList}
								badgeClasses="shadow-lg"
							></FilterIndicator>
						</div>
					</div>
				)}

				<div className={showWelcome ? "opacity-0" : ""}>
					<SidebarWrapper
						classes="z-20"
						position="left"
						isOpen={sidebarMenuOpen}
						setOpen={setSidebarMenuOpen}
						closeSymbol="cross"
						mobileHeight={mobileHeight}
					>
						<span className={navView === "filter" ? "" : "hidden"}>
							<SidebarContentFilter
								setDeckLayers={setDeckLayers}
								deckLayers={deckLayers}
								layersData={layersData}
								setLayersData={setLayersData}
								loading={loading}
								setLoading={setLoading}
								setOpen={setSidebarMenuOpen}
								activeLayerId={activeLayerId}
								setActiveLayerId={setActiveLayerId}
								viewState={viewState}
								searchResult={searchResult}
								activeFiltersList={activeFiltersList}
								setActiveFiltersList={setActiveFiltersList}
							/>
						</span>
						<span className={navView === "info" ? "" : "hidden"}>
							<SidebarContentInfo />
						</span>

						<span className={navView === "search" ? "" : "hidden"}>
							<SidebarContentSearch
								viewState={viewState}
								setViewState={setViewState}
								searchResult={searchResult}
								setSearchResult={setSearchResult}
							/>
						</span>
					</SidebarWrapper>
					<SidebarNav
						navView={navView}
						setNavView={setNavView}
						sidebarMenuOpen={sidebarMenuOpen}
						setSidebarMenuOpen={setSidebarMenuOpen}
						applyPreviousLayer={() => applyNextLayer("previous")}
						applyNextLayer={() => applyNextLayer("next")}
						showNextLayer={showNextLayer}
						layerColor={layerColor}
						layerCount={layerCount}
					/>
				</div>
			</main>
		</>
	);
};
