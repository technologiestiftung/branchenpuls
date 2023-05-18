import { FC, useState, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { getSinglePointData } from "@lib/getSinglePointData";
import { getIdsByFilter } from "@lib/getIdsByFilter";
import { RangeSlider } from "@components/RangeSlider";
import Select from "react-select";
import uiKeys from "@lib/uiKeys.json";

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
  const [filterValBl3, setfilterValBl3] = useState<object | null>(null);

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
    setFilterValAge([0, 100]);
    setFilterValEmployees(null);
  };

  async function runFilter() {
    const newFilteredData = await getIdsByFilter(
      dataPointsIndexed,
      filterValAge,
      filterValEmployees,
      filterValBl3
    );
    setFilteredData(newFilteredData);
  }

  // options for employees
  const optionsEmployees = [];
  for (const key in uiKeys.nr_e) {
    optionsEmployees.push({
      value: key,
      label: uiKeys.nr_e[key],
    });
  }

  // options for branch level 3
  const optionsBranchLevelThree = [];
  for (const key in uiKeys.branchLevelThree) {
    optionsBranchLevelThree.push({
      value: key,
      label: uiKeys.branchLevelThree[key],
    });
  }

  return (
    <div className="fixed top-2 left-2 bg-white z-40 p-4 rounded-lg ml-4">
      <div className="stat place-items-center">
        <div className="stat-title">Punkte</div>
        <div className="stat-value">{filteredData.length}</div>
      </div>
      {/* Counter: {filteredData.length} */}

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
        Beschäftigte
        <Select
          value={filterValEmployees}
          onChange={setFilterValEmployees}
          // select select-primary
          className={""}
          isClearable={true}
          isSearchable={true}
          options={optionsEmployees}
        />
      </div>

      <div className="mt-4">
        Branch level 3
        <Select
          value={filterValBl3}
          onChange={setfilterValBl3}
          // select select-primary
          className={""}
          isClearable={true}
          isSearchable={true}
          options={optionsBranchLevelThree}
        />
      </div>

      <button onClick={runFilter} className="btn btn-primary mt-4">
        Run Filter
      </button>
      <br />
      <button onClick={resetFilterData} className="btn btn-primary btn-sm mt-6">
        reset
      </button>
    </div>
  );
};
