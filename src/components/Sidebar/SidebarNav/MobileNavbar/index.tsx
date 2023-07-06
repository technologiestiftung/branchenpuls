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
		<div className="fixed bottom-0 block sm:hidden">
			<div className="flex w-screen justify-center px-[28px] pb-[21px]">
				<nav className="flex w-full justify-center">
					<ul className="flex w-full justify-center gap-[7px]">
						<li className="flex shadow-lg">
							<button
								onClick={() => onNavClick("filter")}
								className={`rounded-[4px] p-[8px] hover:bg-dark-grey hover:text-white
										${
											navView === "filter" && sidebarMenuOpen
												? "bg-dark-grey text-white"
												: "bg-white text-dark-grey"
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
								<button onClick={() => applyPreviousLayer()}>
									<ChevronLeft />
								</button>
							)}

							<p className="w-full text-center text-lg font-bold">
								{layerCount?.toLocaleString("de-DE")}
							</p>

							{showNextLayer && (
								<button onClick={() => applyNextLayer()}>
									<ChevronRight />
								</button>
							)}
						</li>

						<li className="flex shadow-lg">
							<button
								onClick={() => onNavClick("info")}
								className={`rounded-[4px] p-[8px]  hover:bg-dark-grey hover:text-white
										${
											navView === "info" && sidebarMenuOpen
												? "bg-dark-grey text-white"
												: "bg-white text-dark-grey"
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
