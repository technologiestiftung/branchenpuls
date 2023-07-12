import { ChevronLeft, ChevronRight, Filter, Info } from "@components/Icons";
import React from "react";

export type MobileNavbarProps = {
	onNavClick: (navView: "filter" | "info" | "none") => void;
	navView: "filter" | "info" | "none";
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
		<div className="fixed bottom-0 z-50 block sm:hidden">
			<div className="flex w-screen justify-center px-[28px] pb-[21px]">
				<nav className="flex w-full justify-center">
					<ul className="flex w-full justify-center gap-[7px]">
						<li className="flex shadow-lg">
							<button
								onClick={() => onNavClick("filter")}
								title="Filter anzeigen/schließen"
								className={`rounded-[4px] p-[8px]
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

						<li
							style={{ backgroundColor: layerColor }}
							className="flex w-full max-w-[226px] justify-between rounded-[4px] p-[8px] text-dark-grey text-white shadow-lg"
						>
							{showNextLayer && (
								<button
									title="Vorherige Ansicht"
									onClick={() => applyPreviousLayer()}
								>
									<ChevronLeft />
								</button>
							)}

							<p className="w-full text-center text-lg font-bold">
								{layerCount?.toLocaleString("de-DE")}
							</p>

							{showNextLayer && (
								<button
									title="Nächste Ansicht"
									onClick={() => applyNextLayer()}
								>
									<ChevronRight />
								</button>
							)}
						</li>

						<li className="flex shadow-lg">
							<button
								onClick={() => onNavClick("info")}
								title="Mehr Informationen anzeigen/schließen"
								className={`rounded-[4px] p-[8px]
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
