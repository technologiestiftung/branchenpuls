import { FC, useState, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { getSinglePointData } from "@lib/getSinglePointData";
import { getIdsByFilter } from "@lib/getIdsByFilter";
import { RangeSlider } from "@components/RangeSlider";
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
  const [filterValEmployees, setFilterValEmployees] = useState<string>("-");

  console.log("uiKeys", uiKeys);

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
    const ids = await getIdsByFilter(
      dataPointsIndexed,
      filterValAge,
      filterValEmployees
    );
    setFilteredData(ids);
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
      <div className="form-control w-full max-w-xs">
        <label className="label">
          <span className="label-text">Anzahl Mitarbeiter:innen</span>
        </label>
        <select
          className="select select-primary  w-full max-w-xs"
          value={filterValEmployees}
          onChange={(e) => setFilterValEmployees(e.target.value)}
        >
          <option disabled>Pick Employees Nr.</option>
          <option key={"key-e-00"} value={"-"}>
            -
          </option>
          {Object.keys(uiKeys.nr_e).map((d: string, i: number) => (
            <option key={"key-e-" + i} value={d}>
              {d}
            </option>
          ))}
        </select>
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
