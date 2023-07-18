import { FC, useEffect, useState } from "react";
// import classNames from "classnames";
import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { FilterLayer } from "@/components/filter/FilterLayer";
import { FilterLayerSwitcher } from "@/components/filter/FilterLayerSwitcher";

import { getNewLayerData } from "@lib/getNewLayerData.js";
import { ViewStateType } from "@common/interfaces";

export interface SidebarContentFilterType {
	viewState: ViewStateType;
	setViewState: React.Dispatch<React.SetStateAction<ViewStateType>>;
}

export const SidebarContentFilter: FC<SidebarContentFilterType> = ({
	setDeckLayers,
	deckLayers,
	layersData,
	setLayersData,
	loading,
	setLoading,
	setOpen,
	activeLayerId,
	setActiveLayerId,
	viewState,
	searchResult,
}) => {
	const [storeDataPoints, setStoreDataPoints] = useState({});

	function addNewLayer(layersData) {
		const newLayer = getNewLayerData(layersData);
		layersData[newLayer.id] = newLayer;
		layersData = JSON.parse(JSON.stringify(layersData));
		setActiveLayerId(newLayer.id);
		setLayersData(layersData);
	}

	// add one layer on start
	useEffect(() => {
		if (layersData && !Object.keys(layersData).length) {
			addNewLayer(layersData);
		}
	}, []);

	useEffect(() => {
		const layerIds = Object.keys(layersData);
		if (activeLayerId === null && layerIds.length) {
			setActiveLayerId(layerIds[0]);
		}
	}, [activeLayerId]);

	activeLayerId;

	return (
		<>
			<SidebarHeader text="Gewerbe erkunden" />
			<SidebarBody>
				<FilterLayerSwitcher
					layersData={layersData}
					activeLayerId={activeLayerId}
					setActiveLayerId={setActiveLayerId}
					addNewLayer={addNewLayer}
				/>
				{Object.keys(layersData).map((layerId, i) => {
					const layer = layersData[layerId];
					return (
						<div
							className={`${layerId === activeLayerId ? "" : "hidden"}`}
							key={`filterlayer-${layerId}`}
						>
							<FilterLayer
								setDeckLayers={setDeckLayers}
								deckLayers={deckLayers}
								layerId={layer.id}
								layersData={layersData}
								setLayersData={setLayersData}
								index={i}
								key={i}
								loading={loading}
								setLoading={setLoading}
								setOpen={setOpen}
								activeLayerId={activeLayerId}
								setActiveLayerId={setActiveLayerId}
								storeDataPoints={storeDataPoints}
								setStoreDataPoints={setStoreDataPoints}
								viewState={viewState}
								searchResult={searchResult}
							></FilterLayer>
						</div>
					);
				})}
			</SidebarBody>
		</>
	);
};
