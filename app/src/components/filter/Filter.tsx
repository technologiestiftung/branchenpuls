import { FC, useState, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { getSinglePointData } from "@lib/getSinglePointData";
import { getIdsByFilter } from "@lib/getIdsByFilter";
import { RangeSlider } from "@components/RangeSlider";

export interface FilterType {
  dataPoints: any;
  dataPointsIndexed: any;
  deckLayers: any;
  setDeckLayers: any;
}

export const Filter: FC<FilterType> = ({
  dataPoints,
  dataPointsIndexed,
  deckLayers,
  setDeckLayers,
}) => {
  const [filteredData, setFilteredData] = useState(dataPoints);
  //   const [selectedOption, setSelectedOption] = useState(0);
  const [layerType, setLayerType] = useState("scatterplot");
  const [filterValAge, setFilterValAge] = useState<number[]>([0, 100]);

  useEffect(() => {
    if (filteredData) {
      setDeckLayers([
        layerType === "scatterplot"
          ? new ScatterplotLayer({
              id: "scatterplot-layer",
              data: filteredData,
              pickable: true,
              getRadius: 30,
              getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
              getFillColor: [86, 189, 102],
              onClick: (info) =>
                getSinglePointData(info.object.id, info.object.p),
            })
          : new HeatmapLayer({
              id: "heatmapLayer",
              data: filteredData,
              getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
              getWeight: 5,
              aggregation: "SUM",
            }),
      ]);
    }
  }, [layerType, filteredData]);

  useEffect(() => {
    console.log(filterValAge);
  }, [filterValAge]);

  const switchLayer = () => {
    setLayerType(layerType === "scatterplot" ? "geojson" : "scatterplot");
  };

  const resetFilterData = () => {
    setFilteredData(dataPoints);
  };

  //   async function setAge(val) {
  //     setSelectedOption(val);
  //     const ids = await getIdsByFilter(dataPointsIndexed, val);
  //     setFilteredData(ids);
  //   }

  async function runFilter() {
    console.log("äää", filterValAge);
    const ids = await getIdsByFilter(dataPointsIndexed, filterValAge);
    setFilteredData(ids);
  }

  return (
    <div className="fixed top-2 left-2 bg-white z-40">
      <button onClick={resetFilterData} className="btn btn-primary">
        Show All Points
      </button>

      <div className="form-control w-52">
        <label className="cursor-pointer label">
          <span className="label-text">Heatmap</span>
          <input
            type="checkbox"
            className="toggle toggle-secondary"
            checked={layerType !== "scatterplot"}
            onChange={switchLayer}
          />
        </label>
      </div>
      <RangeSlider
        value={filterValAge}
        setValue={setFilterValAge}
        minValue={0}
        maxValue={100}
        step={1}
      />

      <button onClick={runFilter} className="btn btn-primary">
        Run Filter
      </button>

      {/* <select
        className="select w-full max-w-xs"
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
      </select> */}
    </div>
  );
};
