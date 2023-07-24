import { FC } from "react";
import classNames from "classnames";
import { Plus, Minus, Box } from "@components/Icons";
import { ViewStateType } from "@common/interfaces";

export interface MapControlsType {
	setViewState: (pitch: any) => void;
	minZoom: number;
	viewState: ViewStateType;
}

export const MapControls: FC<MapControlsType> = ({
	minZoom,
	setViewState,
	viewState,
}) => {
	const navClasses =
		"shadow-lg bg-white text-dark-grey hover:bg-dark-grey hover:text-white h-10 w-10 mt-2 cursor-pointer list-none text-center grid place-items-center rounded-full";

	return (
		<nav
			className={classNames(
				"fixed bottom-2 right-3 z-10 mb-3 hidden duration-300 ease-in-out sm:block"
			)}
			id="zoom-btns"
		>
			<div>
				<button
					title="Karte kippen"
					className={navClasses}
					onClick={() =>
						setViewState({
							...viewState,
							pitch: viewState.pitch === 60 ? 0 : 60,
						})
					}
				>
					<Box />
				</button>
				<button
					title="zoom in"
					className={navClasses}
					onClick={() =>
						setViewState({ ...viewState, zoom: viewState.zoom + 1 })
					}
				>
					<Plus />
				</button>
				<button
					title="zoom out"
					className={navClasses}
					onClick={() =>
						setViewState({
							...viewState,
							zoom: viewState.zoom <= minZoom ? minZoom : viewState.zoom - 1,
						})
					}
				>
					<Minus />
				</button>
			</div>
		</nav>
	);
};
