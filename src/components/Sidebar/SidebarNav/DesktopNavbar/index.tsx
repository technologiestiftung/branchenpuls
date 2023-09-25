import {
	ChevronLeft,
	ChevronRight,
	Filter,
	Info,
	MagnifyingGlass,
} from "@components/Icons";
import React from "react";
import { NavView } from "@components/Sidebar/SidebarNav";

export type DesktopNavbarProps = {
	onNavClick: (navView: NavView) => void;
	navView: NavView;
	sidebarMenuOpen: boolean;
	applyPreviousLayer: () => void;
	applyNextLayer: () => void;
	showNextLayer: boolean;
	layerColor: string;
	layerCount: null | number;
};
export const DesktopNavbar = ({
	onNavClick,
	navView,
	sidebarMenuOpen,
	applyPreviousLayer,
	applyNextLayer,
	showNextLayer,
	layerColor,
	layerCount,
}: DesktopNavbarProps) => {
	return (
		<>
			<div className="fixed left-[28px] top-[22px] z-20 hidden sm:block">
				<nav>
					<ul className="flex flex-col">
						<li className="flex">
							<button
								onClick={() => onNavClick("filter")}
								title="Filter anzeigen/schließen"
								className={`rounded-t-[4px] p-[8px] shadow-lg duration-300 ease-in-out
											${
												navView === "filter"
													? "bg-dark-grey text-white hover:bg-white hover:text-dark-grey"
													: "bg-white text-dark-grey hover:bg-dark-grey hover:text-white"
											}
											${sidebarMenuOpen ? "ml-[356px]" : "ml-0"}
									`}
							>
								<Filter />
							</button>
						</li>

						<li className="flex">
							<button
								onClick={() => onNavClick("search")}
								title="Suche anzeigen/schließen"
								className={`p-[8px] shadow-lg duration-300 ease-in-out
											${
												navView === "search" && sidebarMenuOpen
													? "bg-dark-grey text-white hover:bg-white hover:text-dark-grey"
													: "bg-white text-dark-grey hover:bg-dark-grey hover:text-white"
											}
											${sidebarMenuOpen ? "ml-[356px]" : "ml-0"}
									`}
							>
								<span id="joyride-search-nav">
									<MagnifyingGlass />
								</span>
							</button>
						</li>

						<li className="flex">
							<button
								onClick={() => onNavClick("info")}
								title="Mehr Informationen anzeigen/schließen"
								className={`rounded-b-[4px] p-[8px] shadow-lg duration-300 ease-in-out
											${
												navView === "info" && sidebarMenuOpen
													? "bg-dark-grey text-white hover:bg-white hover:text-dark-grey"
													: "bg-white text-dark-grey hover:bg-dark-grey hover:text-white"
											}
											${sidebarMenuOpen ? "ml-[356px]" : "ml-0"}
									`}
							>
								<Info />
							</button>
						</li>
					</ul>
				</nav>
			</div>

			<div
				id="joyride-counter"
				className="fixed bottom-0 left-2/4 z-40 mx-[28px] mb-[21px]  hidden -translate-x-2/4 transform sm:block sm:block"
			>
				<div
					style={{ backgroundColor: layerColor }}
					className="flex w-full max-w-[260px] justify-between  p-[4px]"
				>
					{showNextLayer && (
						<button
							title="Vorherige Ansicht"
							onClick={() => applyPreviousLayer()}
						>
							<ChevronLeft />
						</button>
					)}

					<p className="w-full border border-white border-opacity-70 px-4 py-1 text-center text-lg font-medium text-white">
						{layerCount?.toLocaleString("de-DE")} Unternehmen
					</p>

					{showNextLayer && (
						<button title="Nächste Ansicht" onClick={() => applyNextLayer()}>
							<ChevronRight />
						</button>
					)}
				</div>
			</div>
		</>
	);
};
