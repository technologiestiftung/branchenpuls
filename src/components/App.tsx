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
import { getOptionsDates } from "@lib/getOptionsDates";
import { useMatomo } from "@lib/hooks/useMatomo";
import { LayerDataType } from "@common/interfaces";

export const App = () => {
	const [deckLayers, setDeckLayers] = useState<number[]>([]);
	const [activeLayerId, setActiveLayerId] = useState<string | null>(null);
	const [layersData, setLayersData] = useState<LayerDataType>({});
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
	const [optionsDate, setOptionsDate] = useState<number[]>([]);

	useMatomo();

	useEffect(() => {
		if (activeLayerId === null) return;
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

	// when the app loads, get the data options based on the available tables for each month
	useEffect(() => {
		(async () => {
			const data = await getOptionsDates();
			setOptionsDate(data);
		})();
	}, []);

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

				<FilterIndicator
					activeFiltersList={activeFiltersList}
				></FilterIndicator>
				{optionsDate && (
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
									optionsDate={optionsDate}
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
				)}
			</main>
		</>
	);
};
