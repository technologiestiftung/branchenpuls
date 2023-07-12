import { FC, useState, useMemo, useEffect } from "react";
import { Map, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import DeckGL from "@deck.gl/react";
import mapStyle from "./mapStyle";
import { MapControls } from "./MapControls";

// const MAP_STYLE =
// 	"https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";

export interface PointData {
	info: any;
	position: number[];
}

export interface MapType {
	deckLayers: any;
}

const LONGITUDE_RANGE = [13.210754, 13.599154];
const LATITUDE_RANGE = [52.384558, 52.655458];

export const MapComponent: FC<MapType> = ({ deckLayers, setZoom }) => {
	function onViewStateChange(view) {
		setZoom(view.viewState.zoom);

		view.viewState.longitude = Math.min(
			LONGITUDE_RANGE[1],
			Math.max(LONGITUDE_RANGE[0], view.viewState.longitude)
		);
		view.viewState.latitude = Math.min(
			LATITUDE_RANGE[1],
			Math.max(LATITUDE_RANGE[0], view.viewState.latitude)
		);

		view.viewState.zoom = Math.max(9, view.viewState.zoom);

		return view.viewState;
	}

	const [mapZoom, setMapZoom] = useState(10); // Initial zoom level

	const initialViewState = {
		longitude: 13.405,
		latitude: 52.52,
		zoom: mapZoom,
		pitch: 0,
		bearing: 0,
		transitionDuration: 300,
	};

	return (
		<>
			<MapControls mapZoom={mapZoom} setMapZoom={setMapZoom} />
			<div className="h-screen w-screen">
				<DeckGL
					initialViewState={initialViewState}
					controller={true}
					layers={deckLayers}
					// getTooltip={({ object }) => object && `${object.id}\n`}
					onViewStateChange={onViewStateChange}
				>
					<Map
						reuseMaps
						mapLib={maplibregl}
						mapStyle={
							process.env.NODE_ENV == "development"
								? mapStyle()
								: process.env.NEXT_PUBLIC_MAPTILER_STYLE
						}
						styleDiffing={true}
						zoom={mapZoom} // Pass the mapZoom value as the zoom prop
						attributionControl={false}
					></Map>
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
