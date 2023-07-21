import React, { Dispatch, SetStateAction } from "react";
import { MobileWelcome } from "@components/Welcome/MobileWelcome";
import { DesktopWelcome } from "@components/Welcome/DesktopWelcome";
import { NavView } from "@components/Sidebar/SidebarNav";

export const Welcome = ({
	setShowWelcome,
	setNavView,
	setSidebarMenuOpen,
	setRunJoyride,
}: {
	setShowWelcome: Dispatch<SetStateAction<boolean>>;
	setNavView: Dispatch<SetStateAction<NavView>>;
	setSidebarMenuOpen: Dispatch<SetStateAction<boolean>>;
	setRunJoyride: Dispatch<SetStateAction<boolean>>;
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
			<div className="absolute left-0 top-0 z-50">
				<MobileWelcome
					setShowWelcome={setShowWelcome}
					setRunJoyride={setRunJoyride}
					showInfo={showInfo}
				/>
				<DesktopWelcome
					setShowWelcome={setShowWelcome}
					setRunJoyride={setRunJoyride}
					showInfo={showInfo}
				/>
			</div>
		</>
	);
};
