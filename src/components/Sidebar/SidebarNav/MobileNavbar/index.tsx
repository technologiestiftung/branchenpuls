import { ChevronLeft, ChevronRight, Filter, Info } from "@components/Icons";
import React from "react";

export type MobileNavbarProps = {
	onNavClick: (navView: "filter" | "info" | "none") => void;
	navView: "filter" | "info" | "none";
	sidebarMenuOpen: boolean;
	applyPreviousLayer: () => void;
	applyNextLayer: () => void;
};

export const MobileNavbar = ({
	onNavClick,
	navView,
	sidebarMenuOpen,
	applyPreviousLayer,
	applyNextLayer,
}: MobileNavbarProps) => {
	return (
		<div className="fixed bottom-0 block sm:hidden">
			<div className="flex w-screen justify-center px-[28px] pb-[21px]">
				<nav className="flex w-full justify-center">
					<ul className="flex w-full justify-center gap-[7px]">
						<li className="flex shadow-lg">
							<button
								onClick={() => onNavClick("filter")}
								className={`rounded-[4px] bg-white p-[8px] text-dark-grey hover:bg-dark-grey hover:text-white
										${navView === "filter" && sidebarMenuOpen && "bg-dark-grey text-white"}
									`}
							>
								<Filter />
							</button>
						</li>

						<li className="flex w-full max-w-[226px] justify-between rounded-[4px] bg-red-500 p-[8px] text-dark-grey text-white shadow-lg">
							<button onClick={() => applyPreviousLayer()}>
								<ChevronLeft />
							</button>

							<p className="text-lg font-bold">253.000</p>

							<button onClick={() => applyNextLayer()}>
								<ChevronRight />
							</button>
						</li>

						<li className="flex shadow-lg">
							<button
								onClick={() => onNavClick("info")}
								className={`rounded-[4px] bg-white p-[8px] text-dark-grey hover:bg-dark-grey hover:text-white
										${navView === "info" && sidebarMenuOpen && "bg-dark-grey text-white"}
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
