import {
	ChevronLeft,
	ChevronRight,
	Filter,
	Info,
	MagnifyingGlass,
} from "@components/Icons";
import React from "react";
import { NavView } from "@components/Sidebar/SidebarNav";

export type MobileNavbarProps = {
	onNavClick: (navView: NavView) => void;
	navView: NavView;
	sidebarMenuOpen: boolean;
	applyPreviousLayer: () => void;
	applyNextLayer: () => void;
	showNextLayer: boolean;
	layerColor: string;
	layerCount: null | number;
};

export const MobileNavbar = ({
	onNavClick,
	navView,
	sidebarMenuOpen,
	applyPreviousLayer,
	applyNextLayer,
	showNextLayer,
	layerColor,
	layerCount,
}: MobileNavbarProps) => {
	return (
		<div className="counter fixed bottom-0 z-30 block sm:hidden">
			<div className="flex w-screen flex-col items-center gap-[7px] px-[28px] pb-[21px]">
				<div
					style={{ backgroundColor: layerColor }}
					className="flex w-full justify-between p-[4px] text-white shadow-lg"
				>
					{showNextLayer && (
						<button
							title="Vorherige Ansicht"
							onClick={() => applyPreviousLayer()}
						>
							<ChevronLeft />
						</button>
					)}

					<p
						id="joyride-counter-mob"
						className="w-full border border-white border-opacity-70 py-1 text-center text-lg font-bold"
					>
						{layerCount?.toLocaleString("de-DE")}
					</p>

					{showNextLayer && (
						<button title="Nächste Ansicht" onClick={() => applyNextLayer()}>
							<ChevronRight />
						</button>
					)}
				</div>

				<nav className="flex w-full justify-center">
					<ul className="flex w-full justify-center shadow-lg">
						<li className="flex grow">
							<button
								onClick={() => onNavClick("filter")}
								title="Suche anzeigen/schließen"
								className={`flex grow justify-center rounded-l-[4px] p-[8px]
										${
											navView === "filter" && sidebarMenuOpen
												? "bg-dark-grey text-white hover:bg-white hover:text-dark-grey"
												: "bg-white text-dark-grey hover:bg-dark-grey hover:text-white"
										}
									`}
							>
								<Filter />
							</button>
						</li>

						<li className="flex grow">
							<button
								onClick={() => onNavClick("search")}
								title="Filter anzeigen/schließen"
								className={`flex grow justify-center p-[8px]
										${
											navView === "search" && sidebarMenuOpen
												? "bg-dark-grey text-white hover:bg-white hover:text-dark-grey"
												: "bg-white text-dark-grey hover:bg-dark-grey hover:text-white"
										}
									`}
							>
								<span id="joyride-search-nav-mob">
									<MagnifyingGlass />
								</span>
							</button>
						</li>

						<li className="flex grow">
							<button
								onClick={() => onNavClick("info")}
								title="Mehr Informationen anzeigen/schließen"
								className={`flex grow justify-center rounded-r-[4px] p-[8px]
										${
											navView === "info" && sidebarMenuOpen
												? "bg-dark-grey text-white hover:bg-white hover:text-dark-grey"
												: "bg-white text-dark-grey hover:bg-dark-grey hover:text-white"
										}
								`}
							>
								<Info className={``} />
							</button>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	);
};
