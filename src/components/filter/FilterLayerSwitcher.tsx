import { FC, useState, useEffect } from "react";
import { LayerDataType } from "@common/interfaces";

export interface FilterLayerSwitcherType {
	layersData: LayerDataType;
	activeLayerId: string | null;
	setActiveLayerId: (val: string) => void;
	addNewLayer: (val: any) => void;
}

const colors = {
	"#00727c": "bg-emerald hover:bg-darker-emerald",
	"#e40032": "bg-custom-red hover:bg-darker-custom-red",
	"#2e92d0": "bg-babyblue hover:bg-darker-babyblue",
};

export const FilterLayerSwitcher: FC<FilterLayerSwitcherType> = ({
	layersData,
	activeLayerId,
	setActiveLayerId,
	addNewLayer,
}) => {
	return (
		<div className="mt-2 flex">
			{Object.keys(layersData).map((layerId, i) => {
				const layer = layersData[layerId];
				return (
					<button
						className={`mr-1 grid h-12 w-1/3 cursor-pointer items-center rounded text-center text-white ${
							// @ts-ignore
							colors[layer.colorHex]
						} ${
							layerId !== activeLayerId ? "opacity-40 hover:opacity-100" : ""
						}`}
						onClick={() => {
							setActiveLayerId(layerId);
						}}
						key={`layer-key-${layerId}`}
						title="Zu dieser Ansicht wechseln"
					>
						Ansicht
					</button>
				);
			})}
			{Object.keys(layersData).length < 3 ? (
				<button
					onClick={() => {
						addNewLayer(layersData);
					}}
					className="grid h-12 w-1/3 cursor-pointer items-center rounded bg-gray-200 text-2xl font-normal leading-4 text-gray-400 hover:bg-light-grey hover:text-white"
					title="Neue Ansicht mit anderen Filtern erstellen"
				>
					+
				</button>
			) : null}
		</div>
	);
};
