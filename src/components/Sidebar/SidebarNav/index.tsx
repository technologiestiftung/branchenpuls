import React, { Dispatch, FC, SetStateAction } from "react";
import { MobileNavbar } from "@components/Sidebar/SidebarNav/MobileNavbar";
import { DesktopNavbar } from "@components/Sidebar/SidebarNav/DesktopNavbar";

export interface SidebarNavType {
	navView: "info" | "filter" | "none";
	setNavView: Dispatch<SetStateAction<"info" | "filter" | "none">>;
	sidebarMenuOpen: boolean;
	setSidebarMenuOpen: Dispatch<SetStateAction<boolean>>;
	applyPreviousLayer: () => void;
	applyNextLayer: () => void;
}

export const SidebarNav: FC<SidebarNavType> = ({
	navView,
	setNavView,
	sidebarMenuOpen,
	setSidebarMenuOpen,
	applyPreviousLayer,
	applyNextLayer,
}) => {
	function onNavClick(clickedNavView: "filter" | "info" | "none") {
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
			/>

			<DesktopNavbar
				onNavClick={onNavClick}
				navView={navView}
				applyNextLayer={applyNextLayer}
				applyPreviousLayer={applyPreviousLayer}
				sidebarMenuOpen={sidebarMenuOpen}
			/>
		</>
	);
};
