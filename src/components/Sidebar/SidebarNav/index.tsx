import React, { Dispatch, FC, SetStateAction } from "react";
import { MobileNavbar } from "@components/Sidebar/SidebarNav/MobileNavbar";
import { DesktopNavbar } from "@components/Sidebar/SidebarNav/DesktopNavbar";

export type NavView = "info" | "filter" | "search" | "none";

export interface SidebarNavType {
	navView: NavView;
	setNavView: Dispatch<SetStateAction<NavView>>;
	sidebarMenuOpen: boolean;
	setSidebarMenuOpen: Dispatch<SetStateAction<boolean>>;
	applyPreviousLayer: () => void;
	applyNextLayer: () => void;
	showNextLayer: boolean;
	layerColor: string;
	layerCount: null | number;
}

export const SidebarNav: FC<SidebarNavType> = ({
	navView,
	setNavView,
	sidebarMenuOpen,
	setSidebarMenuOpen,
	applyPreviousLayer,
	applyNextLayer,
	showNextLayer,
	layerColor,
	layerCount,
}) => {
	function onNavClick(clickedNavView: NavView) {
		const shouldClose = sidebarMenuOpen && navView === clickedNavView;
		if (shouldClose) {
			setSidebarMenuOpen(false);
			setNavView("none");
			return;
		}

		setSidebarMenuOpen(true);
		setNavView(clickedNavView);
	}

	return (
		<>
			<MobileNavbar
				onNavClick={onNavClick}
				navView={navView}
				applyNextLayer={applyNextLayer}
				applyPreviousLayer={applyPreviousLayer}
				sidebarMenuOpen={sidebarMenuOpen}
				showNextLayer={showNextLayer}
				layerColor={layerColor}
				layerCount={layerCount}
			/>

			<DesktopNavbar
				onNavClick={onNavClick}
				navView={navView}
				applyNextLayer={applyNextLayer}
				applyPreviousLayer={applyPreviousLayer}
				sidebarMenuOpen={sidebarMenuOpen}
				showNextLayer={showNextLayer}
				layerColor={layerColor}
				layerCount={layerCount}
			/>
		</>
	);
};
