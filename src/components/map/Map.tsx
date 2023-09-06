import { FC, useState, useMemo, useEffect, useRef } from "react";
import { Map, Popup, Marker } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
// @ts-ignore
import DeckGL from "@deck.gl/react";
import mapStyle from "./mapStyle";
import { MapControls } from "./MapControls";
import { ViewStateType } from "@common/interfaces";
import { useDebounce } from "use-debounce";

// const MAP_STYLE =
// 	"https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

export interface PointData {
	info: any;
	position: number[];
}

export interface MapType {
	deckLayers: any;
	viewState: ViewStateType;
	setViewState: React.Dispatch<React.SetStateAction<ViewStateType>>;
}

const LONGITUDE_RANGE = [12.97468, 13.88752];
const LATITUDE_RANGE = [52.29039, 52.76441];
const MIN_ZOOM = 9;

export const MapComponent: FC<MapType> = ({
	deckLayers,
	viewState,
	setViewState,
}) => {
	const [debouncedViewState] = useDebounce(viewState, 10);

	function onViewStateChange(view: any) {
		const longitude = Math.min(
			LONGITUDE_RANGE[1],
			Math.max(LONGITUDE_RANGE[0], view.viewState.longitude)
		);
		const latitude = Math.min(
			LATITUDE_RANGE[1],
			Math.max(LATITUDE_RANGE[0], view.viewState.latitude)
		);
		const zoom = Math.max(MIN_ZOOM, view.viewState.zoom);

		setViewState({
			...view.viewState,
			longitude: longitude,
			latitude: latitude,
			zoom: zoom,
		});
	}

	return (
		<>
			<MapControls
				minZoom={MIN_ZOOM}
				setViewState={setViewState}
				viewState={viewState}
			/>
			<div className="h-screen w-screen">
				<DeckGL
					viewState={debouncedViewState}
					layers={deckLayers}
					onViewStateChange={onViewStateChange}
					controller={true}
				>
					<Map
						reuseMaps
						mapLib={maplibregl}
						// @ts-ignore
						mapStyle={
							process.env.NODE_ENV == "development"
								? mapStyle()
								: process.env.NEXT_PUBLIC_MAPTILER_STYLE
						}
						styleDiffing={true}
						attributionControl={false}
					>
						<Marker longitude={13.40474} latitude={52.52053} anchor="bottom">
							<div id="joyride-marker-center"></div>
						</Marker>
					</Map>
				</DeckGL>
			</div>
			<div className="fixed bottom-0 right-0 bg-white/70 text-xs">
				<a href="https://www.maptiler.com/copyright/" target="_blank">
					© MapTiler
				</a>{" "}
				<a href="https://www.openstreetmap.org/copyright" target="_blank">
					© OpenStreetMap contributors
				</a>
			</div>
		</>
	);
};
