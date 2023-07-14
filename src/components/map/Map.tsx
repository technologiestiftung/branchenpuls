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
	mapCenter: number[] | null;
}

const LONGITUDE_RANGE = [13.210754, 13.599154];
const LATITUDE_RANGE = [52.384558, 52.655458];
const MIN_ZOOM = 9;

export const MapComponent: FC<MapType> = ({
	deckLayers,
	mapZoom,
	setMapZoom,
	mapCenter,
}) => {
	const [lat, setLat] = useState(52.52); // Initial zoom level
	const [lng, setLng] = useState(13.405); // Initial zoom level
	const [mapPitch, setMapPitch] = useState(false); // Initial zoom level

	const initialViewState = {
		longitude: lng,
		latitude: lat,
		zoom: mapZoom,
		pitch: mapPitch ? 60 : 0,
		bearing: 0,
		transitionDuration: 300,
	};

	function onViewStateChange(view: any) {
		view.viewState.longitude = Math.min(
			LONGITUDE_RANGE[1],
			Math.max(LONGITUDE_RANGE[0], view.viewState.longitude)
		);
		view.viewState.latitude = Math.min(
			LATITUDE_RANGE[1],
			Math.max(LATITUDE_RANGE[0], view.viewState.latitude)
		);

		view.viewState.zoom = Math.max(MIN_ZOOM, view.viewState.zoom);

		if (view.oldViewState.zoom !== mapZoom) {
			setMapZoom(view.viewState.zoom);
		}
		if (view.oldViewState.latitude !== lat) {
			setLat(view.viewState.latitude);
		}
		if (view.oldViewState.longitude !== lng) {
			setLng(view.viewState.longitude);
		}
	}

	useEffect(() => {
		if (mapCenter) {
			initialViewState.longitude = mapCenter[0];
			initialViewState.latitude = mapCenter[1];
			initialViewState.zoom = 13;
			// setLat(mapCenter[0]);
			// setLng(mapCenter[1]);
			// setMapZoom(13);
			// console.log(mapCenter);
		}
	}, [mapCenter]);

	return (
		<>
			<MapControls
				mapZoom={mapZoom}
				setMapZoom={setMapZoom}
				mapPitch={mapPitch}
				setMapPitch={setMapPitch}
				minZoom={MIN_ZOOM}
			/>
			<div className="h-screen w-screen">
				<DeckGL
					initialViewState={initialViewState}
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
						{mapCenter ? (
							<Marker latitude={mapCenter[1]} longitude={mapCenter[0]}>
								<div className="h-5 w-5 rounded-full bg-primary opacity-60" />
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
