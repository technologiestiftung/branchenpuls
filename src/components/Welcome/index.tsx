import React, { Dispatch, SetStateAction } from "react";
import { MobileWelcome } from "@components/Welcome/MobileWelcome";
import { DesktopWelcome } from "@components/Welcome/DesktopWelcome";

export const Welcome = ({
	setShowWelcome,
	setNavView,
	setSidebarMenuOpen,
}: {
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
	setNavView: Dispatch<SetStateAction<"info" | "filter" | "none">>;
	setSidebarMenuOpen: Dispatch<SetStateAction<boolean>>;
}) => {
	function showInfo() {
		setShowWelcome(false);
		setNavView("info");
		setSidebarMenuOpen(true);
	}
	return (
		<>
			<div className="absolute left-0 top-0 z-20 backdrop-blur">
				<div className="flex h-screen w-screen bg-primary opacity-30"></div>
			</div>
			<div className="absolute left-0 top-0 z-30">
				<MobileWelcome setShowWelcome={setShowWelcome} showInfo={showInfo} />
				<DesktopWelcome setShowWelcome={setShowWelcome} showInfo={showInfo} />
			</div>
		</>
	);
};
