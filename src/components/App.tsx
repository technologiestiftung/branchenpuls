"use client";
import { FC, useState, useEffect } from "react";
import { MapComponent } from "@components/map/Map";

import { SidebarContentFilter } from "@components/Sidebar/content/SidebarContentFilter";
import { SidebarWrapper } from "@components/Sidebar/SidebarWrapper";
import { SidebarNav } from "@components/Sidebar/SidebarNav";
import { Info, Filter, Search } from "@components/Icons";
import { Welcome } from "@components/Welcome";
import { Footer } from "@components/Footer";
import { LoadingIndicator } from "@/components/LoadingIndicator";

const navViews = [
	{
		value: "filter",
		name: "filter",
		icon: <Filter />,
		mobileHeight: "half",
	},
	//   {
	//     value: "info",
	//     name: "information",
	//     icon: <Info />,
	//     mobileHeight: "full",
	//   },
];

export interface AppType {
	dataPoints: any;
}

export const App: FC<AppType> = () => {
	const [deckLayers, setDeckLayers] = useState([]);
	const [layersData, setLayersData] = useState<object>({});
	const [sidebarMenuOpen, setSidebarMenuOpen] = useState<boolean>(true);
	const [mobileHeight, setMobileHeight] = useState<"half" | "full">("half");
	const [navView, setNavView] = useState<"filter" | "info">("filter");
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
						</SidebarWrapper>
						<SidebarNav
							navViews={navViews}
							setNavView={setNavView}
							navView={navView}
							sidebarMenuOpen={sidebarMenuOpen}
							setSidebarMenuOpen={setSidebarMenuOpen}
						/>
					</>
				)}
			</main>
		</>
	);
};
