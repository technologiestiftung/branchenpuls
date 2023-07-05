import React, { Dispatch, FC, SetStateAction } from "react";
import { ChevronLeft, ChevronRight, Filter, Info } from "@components/Icons";

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
	function onNavClick(listView: "filter" | "info" | "none") {
		if (!sidebarMenuOpen) {
			setSidebarMenuOpen(true);
		}

		setNavView(listView);
	}

	return (
		<>
			<div className="fixed bottom-0">
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
		</>
	);
};
