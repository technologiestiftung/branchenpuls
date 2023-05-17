import { FC, useState, useMemo, useEffect } from "react";
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

export const MapComponent: FC<MapType> = ({
  dataPoints,
  dataPointsIndexed,
}) => {
  // const [selectedPoint, setSelectedPoint] = useState<PointData | null>(null);
  const [filteredData, setFilteredData] = useState(dataPoints);
  const [layerType, setLayerType] = useState("scatterplot");
  const [popupPosition, setPopupPosition] = useState<number[] | null>(null);

  const [selectedOption, setSelectedOption] = useState(0);

  // const [isHovering, setIsHovering] = useState<boolean>(false);

  const switchLayer = () => {
    setLayerType(layerType === "scatterplot" ? "geojson" : "scatterplot");
  };
  const layers = [
    layerType === "scatterplot"
      ? new ScatterplotLayer({
          id: "scatterplot-layer",
          data: filteredData,
          pickable: true,
          getRadius: 30,
          getPosition: (d) => [Number(d.p[0]), Number(d.p[1])],
          getFillColor: [86, 189, 102],
          // onHover: (info) => huhu(info.object),
          // onHover: ({ object }) => setIsHovering(Boolean(object)),
          // getCursor: ({ isDragging }) => "pointer" : "grab",
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

  async function getDataNow(age) {
    try {
      const path = `/api/getIds/?age=${age}&domain=s`;
      let res;
      if (process.env.NODE_ENV === "development") {
        res = await fetch(path, { cache: "no-store" });
      } else {
        res = await fetch(path);
      }

      if (res.ok) {
        const data = await res.json();
        const newData = [];
        data.ids.forEach((d) => {
          newData.push(dataPointsIndexed[d]);
        });

        dataPointsIndexed;

        // const newData = dataPoints.filter((d: any) => data.ids.includes(d.id));
        // console.log("ff", newData);

        setFilteredData(newData);
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function getSinglePointData(pointId: number, position: number[]) {
    let data;
    try {
      const path = `/api/getsinglepointdata/?pointid=${pointId}`;
      let res;
      if (process.env.NODE_ENV === "development") {
        res = await fetch(path, { cache: "no-store" });
      } else {
        res = await fetch(path);
      }
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
      // setSelectedPoint(popupData);
    }
  }

  function setAge(val) {
    setSelectedOption(val);
    getDataNow(val);
  }

  return (
    <>
      <button
        onClick={resetFilterData}
        className="btn btn-primary fixed top-12 left-2 z-40"
      >
        Show All Points
      </button>
      <button
        onClick={switchLayer}
        className="btn btn-primary fixed top-24 left-2 z-40"
      >
        Switch Layer
      </button>

      {/* <button
        onClick={getDataNow}
        className="btn btn-primary fixed top-0 left-2 z-40 "
      >
        Filter Data
      </button> */}

      <select
        className="select w-full max-w-xs fixed top-2 right-2 z-40 "
        value={selectedOption}
        onChange={(e) => setAge(e.target.value)}
      >
        <option disabled selected>
          Pick AGE
        </option>
        <option>0</option>
        <option>1</option>
        <option>2</option>
        <option>10</option>
        <option>100</option>
      </select>

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
};
