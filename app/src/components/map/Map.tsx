"use client";

import { FC, useState, useMemo } from "react";
import { Map, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";

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
// Data to be used by the ScatterplotLayer
// const data = [];
// for (let index = 0; index < 400000; index++) {
//   const randomNum1 = Math.floor(Math.random() * 900) + 100;
//   const decimalNum1 = 13 + randomNum1 / 1000;
//   const randomNum2 = Math.floor(Math.random() * 900) + 100;
//   const decimalNum2 = 52 + randomNum2 / 1000;

//   data.push({
//     p: [decimalNum1, decimalNum2],
//     // color: [255, 0, 0],
//     // radius: 10,
//     info: "Point 1",
//   });
// }

function huhu(d) {
  console.log(d);
  // setSelectedPoint(d.object),
}

export interface MapType {}

export const MapComponent: FC<MapType> = ({ dataPoints }) => {
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [filteredData, setFilteredData] = useState(dataPoints);
  const [layerType, setLayerType] = useState("scatterplot");
  const switchLayer = () => {
    setLayerType(layerType === "scatterplot" ? "geojson" : "scatterplot");
  };
  const layers = [
    layerType === "scatterplot"
      ? new ScatterplotLayer({
          id: "scatterplot-layer",
          data: dataPoints,
          pickable: true,
          getRadius: 10,
          getPosition: (d) => [Number(d.p[0]), Number(d.p[1])],
          getFillColor: [255, 0, 0],
          // onHover: (info) => huhu(info.object),
        })
      : new HeatmapLayer({
          id: "heatmapLayer",
          data: dataPoints,
          getPosition: (d) => [Number(d.p[0]), Number(d.p[1])],
          getWeight: 5,
          aggregation: "SUM",
        }),
  ];
  const filterData = () => {
    // Add your filter logic here
    // For example, filter out points with a radius less than 500
    const newData = dataPoints.filter((d) => d.postcode === "'10713'");
    setFilteredData(newData);
  };
  const resetFilterData = () => {
    setFilteredData(dataPoints);
  };
  return (
    <>
      <button onClick={filterData} className="fixed top-0 left-2 z-40 bg-white">
        Filter Points
      </button>
      <button
        onClick={resetFilterData}
        className="fixed top-8 left-2 z-40 bg-white"
      >
        Reset Filter Points
      </button>
      <button
        onClick={switchLayer}
        className="fixed top-16 left-2 z-40 bg-white"
      >
        Switch Layer
      </button>
      <div className="h-screen w-screen">
        <DeckGL
          initialViewState={initialViewState}
          controller={true}
          layers={layers}
          getTooltip={({ object }) => object && `${object.id}\n${object.id}`}
        >
          <Map
            reuseMaps
            mapLib={maplibregl}
            mapStyle={MAP_STYLE}
            preventStyleDiffing={true}
          />
          {selectedPoint && (
            <Popup
              latitude={selectedPoint.position[1]}
              longitude={selectedPoint.position[0]}
              closeOnClick={true}
              onClose={() => setSelectedPoint(null)}
            >
              <div>{selectedPoint.info}</div>
            </Popup>
          )}
        </DeckGL>
      </div>
    </>
  );

  //   return (
  //     <>
  //       <p>ggggg</p>
  //     </>
  //   );
};
