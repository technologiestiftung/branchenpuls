"use client";
import { FC, useState, useEffect } from "react";
import { MapComponent } from "@components/map/Map";

import { SidebarContentFilter } from "@components/Sidebar/content/SidebarContentFilter";
import { SidebarWrapper } from "@components/Sidebar/SidebarWrapper";
import { SidebarNav } from "@components/Sidebar/SidebarNav";
import { Welcome } from "@components/Welcome";
import { SidebarContentInfo } from "@components/Sidebar/content/SidebarContentInfo";
import { LoadingIndicator } from "@components/LoadingIndicator";
import { BranchenPulsButton } from "@components/BranchenPulsButton";

export interface AppType {
	dataPoints: any;
}

export const App: FC<AppType> = () => {
	const [deckLayers, setDeckLayers] = useState([]);
	const [activeLayerId, setActiveLayerId] = useState<string | null>(null);

	const [layersData, setLayersData] = useState<object>({});
	const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(true);
	const [mobileHeight, setMobileHeight] = useState<"half" | "full">("half");
	const [navView, setNavView] = useState<"filter" | "info" | "none">("filter");
	const [zoom, setZoom] = useState<null | number>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const [showWelcome, setShowWelcome] = useState<boolean>(true);

	const [showNextLayer, setShowNextLayer] = useState<boolean>(false);
	const [layerColor, setLayerColor] = useState<string>("##e5e7eb");
	const [layerCount, setLayerCount] = useState<null | number>(0);

	useEffect(() => {
		setLayerColor(layersData[activeLayerId]?.colorHex || "#e5e7eb");
		setLayerCount(layersData[activeLayerId]?.count || 0);
		setShowNextLayer(Object.keys(layersData).length > 1);
	}, [layersData, activeLayerId]);

	function getNextOrPreviousId(
		id: string,
		ids: string[],
		option: "next" | "previous"
	) {
		if (ids.length === 0) return null;

		const index = ids?.indexOf(id);
		if (index === -1) {
			return null;
		}

		if (option === "next") {
			if (index === ids.length - 1) {
				return ids[0];
			} else {
				return ids[index + 1];
			}
		} else {
			if (index === 0) {
				return ids[ids.length - 1];
			} else {
				return ids[index - 1];
			}
		}
	}

	function applyNextLayer(option: "next" | "previous") {
		let nextlayerId = getNextOrPreviousId(
			activeLayerId,
			Object.keys(layersData),
			option
		);
		setActiveLayerId(nextlayerId);
	}

	return (
		<>
			<main className="">
				<LoadingIndicator loading={loading}></LoadingIndicator>
				<MapComponent deckLayers={deckLayers} setZoom={setZoom}></MapComponent>
				<BranchenPulsButton
					setShowWelcome={setShowWelcome}
					showWelcome={showWelcome}
				/>
				{showWelcome ? (
					<Welcome setShowWelcome={setShowWelcome} />
				) : (
					<>
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
									zoom={zoom}
									activeLayerId={activeLayerId}
									setActiveLayerId={setActiveLayerId}
								/>
							</span>
							<span className={navView === "info" ? "" : "hidden"}>
								<SidebarContentInfo />
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
					</>
				)}
			</main>
		</>
	);
};
