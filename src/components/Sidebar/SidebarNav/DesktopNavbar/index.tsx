import { ChevronLeft, ChevronRight, Filter, Info } from "@components/Icons";
import React from "react";

export type DesktopNavbarProps = {
	onNavClick: (navView: "filter" | "info" | "none") => void;
	navView: "filter" | "info" | "none";
	sidebarMenuOpen: boolean;
	applyPreviousLayer: () => void;
	applyNextLayer: () => void;
};
export const DesktopNavbar = ({
	onNavClick,
	navView,
	sidebarMenuOpen,
	applyPreviousLayer,
	applyNextLayer,
}: DesktopNavbarProps) => {
	return (
		<>
			<div className="fixed left-[28px] top-[22px] hidden sm:block">
				<nav>
					<ul className="flex flex-col">
						<li className="flex">
							<button
								onClick={() => onNavClick("filter")}
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
								onClick={() => onNavClick("info")}
								className={`rounded-b-[4px] p-[8px] shadow-lg duration-300 ease-in-out hover:bg-dark-grey hover:text-white
											${
												navView === "info" && sidebarMenuOpen
													? "bg-dark-grey text-white"
													: "bg-white text-dark-grey"
											}
											${sidebarMenuOpen ? "ml-[356px]" : "ml-0"}
									`}
							>
								<Info className={``} />
							</button>
						</li>
					</ul>
				</nav>
			</div>

			<div className="fixed bottom-0">
				<div className="flex w-screen justify-center px-[28px] pb-[21px]">
					<div className="flex w-full max-w-[226px] justify-between rounded-[4px] bg-red-500 p-[8px] text-dark-grey text-white shadow-lg">
						<button onClick={() => applyPreviousLayer()}>
							<ChevronLeft />
						</button>

						<p className="text-lg font-bold">253.000</p>

						<button onClick={() => applyNextLayer()}>
							<ChevronRight />
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
