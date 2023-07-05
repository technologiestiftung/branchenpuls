import { FC, useState, useMemo, useEffect } from "react";
import { Map, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import DeckGL from "@deck.gl/react";
import mapStyle from "./mapStyle";

const MAP_STYLE =
  "https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json";
// Initial viewport settings
const initialViewState = {
  longitude: 13.405,
  latitude: 52.52,
  zoom: 10,
  pitch: 0,
  bearing: 0,
};

function huhu(d) {
  document.body.style.cursor = "pointer !important";
  console.log(d);
  // setSelectedPoint(d.object),
}

export interface PointData {
  info: any;
  position: number[];
}

export interface MapType {
  deckLayers: any;
}

export const MapComponent: FC<MapType> = ({ deckLayers, setZoom }) => {
  // const [selectedPoint, setSelectedPoint] = useState<PointData | null>(null);

  function onViewStateChange(view) {
    // console.log(view.viewState.zoom);
    // setZoom(view.viewState.zoom);
  }

  return (
    <>
      <div className="h-screen w-screen">
        <DeckGL
          initialViewState={initialViewState}
          controller={true}
          layers={deckLayers}
          getTooltip={({ object }) => object && `${object.id}\n`}
          // onViewStateChange={onViewStateChange}
        >
          <Map
            reuseMaps
            mapLib={maplibregl}
            mapStyle={
              // process.env.NODE_ENV == "development"
              //   ? mapStyle()
              //   : process.env.NEXT_PUBLIC_MAPTILER_STYLE
              process.env.NEXT_PUBLIC_MAPTILER_STYLE
            }
            styleDiffing={true}>
            {/* {popupPosition && (
            <Popup
              longitude={popupPosition[1]}
              latitude={popupPosition[0]}
              closeOnClick={true}
              onClose={() => setSelectedPoint(null)}
            >
              {selectedPoint.info.id}
            </Popup>
          )} */}
          </Map>
        </DeckGL>
      </div>
    </>
  );
};
