"use client";

import { FC, useState, useMemo, useEffect } from "react";
import { Map, Popup } from "react-map-gl";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { log } from "console";

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
  dataPoints: any;
}

export const MapComponent: FC<MapType> = ({ dataPoints }) => {
  const [selectedPoint, setSelectedPoint] = useState<PointData | null>(null);
  const [filteredData, setFilteredData] = useState(dataPoints);
  const [layerType, setLayerType] = useState("scatterplot");
  const [popupPosition, setPopupPosition] = useState<number[] | null>(null);

  const switchLayer = () => {
    setLayerType(layerType === "scatterplot" ? "geojson" : "scatterplot");
  };
  const layers = [
    layerType === "scatterplot"
      ? new ScatterplotLayer({
          id: "scatterplot-layer",
          data: filteredData,
          pickable: true,
          getRadius: 50,
          getPosition: (d) => [Number(d.p[0]), Number(d.p[1])],
          getFillColor: [255, 0, 0],
          // onHover: (info) => huhu(info.object),
          onClick: (info) => getSinglePointData(info.object.id, info.object.p),
        })
      : new HeatmapLayer({
          id: "heatmapLayer",
          data: filteredData,
          getPosition: (d) => [Number(d.p[0]), Number(d.p[1])],
          getWeight: 5,
          aggregation: "SUM",
        }),
  ];

  const resetFilterData = () => {
    setFilteredData(dataPoints);
  };

  async function getDataNow(siteId: string) {
    try {
      const res = await fetch(`/api/getIds/?business_age=${20}?domain=s`);

      if (res.ok) {
        const data = await res.json();
        console.log(data);

        const newData = dataPoints.filter((d: any) => data.ids.includes(d.id));
        setFilteredData(newData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getSinglePointData(pointId: number, position: number[]) {
    let data;
    try {
      const res = await fetch(`/api/getsinglepointdata/?pointid=${pointId}`);
      if (res.ok) {
        data = await res.json();
      }
    } catch (error) {
      console.error(error);
    } finally {
      const popupData = {
        position: position,
        info: data.data,
      };
      alert(JSON.stringify(popupData));
      setSelectedPoint(popupData);
    }
  }

  // useEffect(() => {
  //   if (selectedPoint?.position) {
  //     console.log(selectedPoint.position);

  //     setPopupPosition(selectedPoint.position);
  //   }
  // }, [selectedPoint]);

  return (
    <>
      <button
        onClick={resetFilterData}
        className="btn btn-primary fixed top-12 left-2 z-40"
      >
        Reset Filter Points
      </button>
      <button
        onClick={switchLayer}
        className="btn btn-primary fixed top-24 left-2 z-40"
      >
        Switch Layer
      </button>

      <button
        onClick={getDataNow}
        className="btn btn-primary fixed top-0 left-2 z-40 "
      >
        Filter Data
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
            // preventStyleDiffing={true}
          />
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
