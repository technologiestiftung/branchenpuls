import { FC } from "react";
import classNames from "classnames";
import { Plus, Minus, Box } from "@components/Icons";

export interface MapControlsType {
	mapZoom: number;
	setMapZoom: (zoom: number) => void;
	mapPitch: boolean;
	setMapPitch: (pitch: boolean) => void;
	minZoom: number;
}

export const MapControls: FC<MapControlsType> = ({
	mapZoom,
	setMapZoom,
	mapPitch,
	setMapPitch,
	minZoom,
}) => {
	const navClasses =
		"shadow-lg bg-white text-dark-grey hover:bg-dark-grey hover:text-white h-10 w-10 mt-2 cursor-pointer list-none text-center grid place-items-center rounded-full";

	return (
		<nav
			className={classNames(
				"fixed bottom-2 right-3 z-10 mb-3 hidden duration-300 ease-in-out sm:block"
			)}
		>
			<div>
				<button
					title="Karte kippen"
					className={navClasses}
					onClick={() => setMapPitch(!mapPitch)}
				>
					<Box />
				</button>
				<button
					title="zoom in"
					className={navClasses}
					onClick={() => setMapZoom(mapZoom + 1)}
				>
					<Plus />
				</button>
				<button
					title="zoom out"
					className={navClasses}
					onClick={() =>
						setMapZoom(mapZoom === minZoom ? minZoom : mapZoom - 1)
					}
				>
					<Minus />
				</button>
			</div>
		</nav>
	);
};
