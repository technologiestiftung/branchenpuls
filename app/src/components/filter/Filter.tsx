import { FC, useState, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { getSinglePointData } from "@lib/getSinglePointData";
import { getIdsByFilter } from "@lib/getIdsByFilter";
import { RangeSlider } from "@components/RangeSlider";
import Select from "react-select";

import { FilterBranches } from "@components/filter/FilterBranches";

import {
  getOptionsEmployees,
  getOptionsBL3,
  getOptionsBType,
} from "./dropdownOptions";

export interface FilterType {
  dataPoints: any;
  dataPointsIndexed: any;
  deckLayers: any;
  setDeckLayers: any;
}

export const Filter: FC<FilterType> = ({
  dataPoints,
  dataPointsIndexed,
  setDeckLayers,
}) => {
  const [filteredData, setFilteredData] = useState(dataPoints);
  //   const [selectedOption, setSelectedOption] = useState(0);
  const [layerType, setLayerType] = useState("scatterplot");
  const [filterValAge, setFilterValAge] = useState<number[]>([0, 100]);
  const [filterValEmployees, setFilterValEmployees] = useState<object | null>(
    null
  );
  const [filterBType, setFilterBType] = useState<object | null>(null);
  const [filterValBl1, setFilterValBl1] = useState<object | null>(null);
  const [filterValBl2, setFilterValBl2] = useState<object | null>(null);
  const [filterValBl3, setFilterValBl3] = useState<object | null>(null);

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
              //   colorRange: [
              //     [86, 189, 102],
              //     [124, 203, 132],
              //     [159, 216, 162],
              //     [191, 229, 192],
              //     [223, 242, 223],
              //     [255, 255, 255],
              //   ].reverse(),
            }),
      ]);
    }
  }, [layerType, filteredData]);

  const switchLayer = () => {
    setLayerType(layerType === "scatterplot" ? "geojson" : "scatterplot");
  };

  const resetFilterData = () => {
    setFilteredData(dataPoints);
    setFilterValAge([0, 100]);
    setFilterValEmployees(null);
    setFilterBType(null);
    setFilterValBl1(null);
    setFilterValBl2(null);
    setFilterValBl3(null);
  };

  async function runFilter() {
    const newFilteredData = await getIdsByFilter(
      dataPointsIndexed,
      filterValAge,
      filterValEmployees,
      filterBType,
      filterValBl1,
      filterValBl2,
      filterValBl3
    );
    setFilteredData(newFilteredData);
  }

  return (
    <div className="fixed top-2 left-2 bg-white z-40 rounded-lg ml-4 w-[300px]">
      <div className="bg-primary w-full h-full absolute hidden"></div>
      <div className="p-4">
        <div className="stat place-items-center">
          <div className="stat-title">Punkte</div>
          <div className="stat-value">{filteredData.length}</div>
        </div>
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
        <div className="mt-4">
          Business Type
          <Select
            value={filterBType}
            onChange={setFilterBType}
            className={""}
            isClearable={true}
            isSearchable={false}
            options={getOptionsBType()}
          />
        </div>
        <div className="mt-4">
          Beschäftigte
          <Select
            value={filterValEmployees}
            onChange={setFilterValEmployees}
            className={""}
            isClearable={true}
            isSearchable={false}
            options={getOptionsEmployees()}
          />
        </div>

        <FilterBranches
          filterValBl1={filterValBl1}
          setFilterValBl1={setFilterValBl1}
          filterValBl2={filterValBl2}
          setFilterValBl2={setFilterValBl2}
          filterValBl3={filterValBl3}
          setFilterValBl3={setFilterValBl3}
        ></FilterBranches>

        <button onClick={runFilter} className="btn btn-primary mt-4">
          Run Filter
        </button>
        <br />
        <button
          onClick={resetFilterData}
          className="btn btn-primary btn-sm mt-6"
        >
          reset
        </button>
      </div>
    </div>
  );
};
