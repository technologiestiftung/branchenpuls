import { FC, useState, useMemo, useEffect, useRef } from "react";
import { Map, Popup, Marker } from "react-map-gl";
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
	mapZoom: number;
	setMapZoom: (zoom: number) => void;
	searchResult: number[] | null;
	setSearchResult: (zoom: number[] | null) => void;
}

const LONGITUDE_RANGE = [13.210754, 13.599154];
const LATITUDE_RANGE = [52.384558, 52.655458];
const MIN_ZOOM = 9;

export const MapComponent: FC<MapType> = ({
	deckLayers,
	mapZoom,
	setMapZoom,
	viewState,
	setViewState,
	searchResult,
}) => {
	const [mapPitch, setMapPitch] = useState(false); // Initial zoom level

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
				mapZoom={mapZoom}
				setMapZoom={setMapZoom}
				mapPitch={mapPitch}
				setMapPitch={setMapPitch}
				minZoom={MIN_ZOOM}
				setViewState={setViewState}
				viewState={viewState}
			/>
			<div className="h-screen w-screen">
				<DeckGL
					viewState={viewState}
					layers={deckLayers}
					onViewStateChange={onViewStateChange}
					controller={true}
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
					>
						{searchResult ? (
							<Marker latitude={searchResult[1]} longitude={searchResult[0]}>
								<div className="z-30 h-5 w-5 rounded-full border-2 border-white bg-primary opacity-60" />
							</Marker>
						) : null}
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
