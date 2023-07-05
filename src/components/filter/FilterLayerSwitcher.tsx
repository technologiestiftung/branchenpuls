import { FC, useState, useEffect } from "react";

export interface FilterLayerSwitcherType {}

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
						style={{ backgroundColor: layer.colorHex }}
						className={`mr-1 grid h-12 w-1/3 cursor-pointer items-center rounded text-center text-white hover:opacity-75 ${
							layerId !== activeLayerId ? "opacity-40" : ""
						}`}
						onClick={() => {
							setActiveLayerId(layerId);
						}}
						key={`layer-key-${layerId}`}
					>
						Ebene
					</button>
				);
			})}
			{Object.keys(layersData).length < 3 ? (
				<button
					onClick={() => {
						addNewLayer(layersData);
					}}
					className="grid h-12 w-1/3 cursor-pointer items-center rounded bg-gray-200 text-center font-normal leading-4 text-gray-400 hover:opacity-75 "
				>
					Ebene
					<br />+
				</button>
			) : null}
		</div>
	);
};
