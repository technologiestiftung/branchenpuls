"use client";
import { FC, useState } from "react";
import { MapComponent } from "@components/map/Map";

import { SidebarContentFilter } from "@components/Sidebar/content/SidebarContentFilter";
import { SidebarWrapper } from "@components/Sidebar/SidebarWrapper";
import { SidebarNav } from "@components/Sidebar/SidebarNav";
import { Welcome } from "@components/Welcome";
import { SidebarContentInfo } from "@components/Sidebar/content/SidebarContentInfo";
import { LoadingIndicator } from "@components/LoadingIndicator";

export interface AppType {
	dataPoints: any;
}

export const App: FC<AppType> = () => {
	const [deckLayers, setDeckLayers] = useState([]);
	const [layersData, setLayersData] = useState<object>({});
	const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(true);
	const [mobileHeight, setMobileHeight] = useState<"half" | "full">("half");
	const [navView, setNavView] = useState<"filter" | "info" | "none">("filter");
	const [zoom, setZoom] = useState<null | number>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const [showWelcome, setShowWelcome] = useState<boolean>(true);

	return (
		<>
			<main className="">
				<LoadingIndicator loading={loading}></LoadingIndicator>
				<MapComponent deckLayers={deckLayers} setZoom={setZoom}></MapComponent>
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
							{navView === "filter" && (
								<SidebarContentFilter
									setDeckLayers={setDeckLayers}
									deckLayers={deckLayers}
									layersData={layersData}
									setLayersData={setLayersData}
									loading={loading}
									setLoading={setLoading}
									setOpen={setSidebarMenuOpen}
									zoom={zoom}
								/>
							)}
							{navView === "info" && <SidebarContentInfo />}
						</SidebarWrapper>
						<SidebarNav
							navView={navView}
							setNavView={setNavView}
							sidebarMenuOpen={sidebarMenuOpen}
							setSidebarMenuOpen={setSidebarMenuOpen}
							applyPreviousLayer={() => {}}
							applyNextLayer={() => {}}
						/>
					</>
				)}
			</main>
		</>
	);
};
