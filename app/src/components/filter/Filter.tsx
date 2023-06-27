import { FC, useState, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { getSinglePointData } from "@lib/getSinglePointData";
import { getIdsByFilter } from "@lib/getIdsByFilter";
import { RangeSlider } from "@/components/UI/RangeSlider";
import { PointInfoModal } from "@components/PointInfoModal";
import Select from "react-select";

import { FilterBranches } from "@/components/filter/FilterBranches";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pako from "pako";

import {
  getOptionsEmployees,
  getOptionsBL3,
  getOptionsBType,
} from "./dropdownOptions";

async function getPoints(date) {
  const devMode = process.env.NODE_ENV === "development";
  let path = `/api/month/?&date=${date}`;

  let fetchConfig = {};
  if (devMode) {
    fetchConfig.cache = "no-store";
  }
  if (devMode) {
    return await fetch(path, fetchConfig)
      .then((res) => res.arrayBuffer())
      .then((arrayBuffer) => {
        const decompressedData = pako.inflate(arrayBuffer, { to: "string" });
        return JSON.parse(decompressedData);
      });
  } else {
    let res = await fetch(path, fetchConfig);
    return res.json();
  }
}

export interface FilterType {
  dataPoints: any;
  dataPointsIndexed: any;
  deckLayers: any;
  setDeckLayers: any;
}

export const Filter: FC<FilterType> = ({
  setDeckLayers,
  deckLayers,
  layersData,
  layerId,
  index,
}) => {
  const [dataPointsIndexed, setDataPointsIndexed] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  const [filteredData, setFilteredData] = useState(dataPoints);
  const [loading, setLoading] = useState<boolean>(true);
  const [pageLoaded, setPageLoaded] = useState<boolean>(false);
  const [layerVisble, setLayerVisible] = useState<boolean>(true);
  const [layerOpacity, setLayerOpacity] = useState<number>(0.5);

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
  // @todo set date
  const [filterValDateMonth, setFilterValDateMonth] = useState<number>(6);
  const [filterValDateYear, setFilterValDateYear] = useState<number>(2023);

  const [startDate, setStartDate] = useState(new Date());
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

  const [poinInfoModalOpen, setPoinInfoModalOpen] = useState(false);
  const [pointData, setpointData] = useState([]);

  const handleDateChange = (e: Date) => {
    setFilterValDateMonth(e.getMonth() + 1);
    setFilterValDateYear(e.getFullYear());
    setIsDatepickerOpen(!isDatepickerOpen);
    setStartDate(e);
  };

  useEffect(() => {
    // load the data for a month. the data includes the coordinates and the ids of the points
    (async () => {
      setLoading(true);

      const dataPoints = await getPoints(filterValDateMonth);
      let dIndexed = {};
      dataPoints.forEach((d) => {
        dIndexed[d.id] = d;
      });
      setDataPointsIndexed(dIndexed);
      setDataPoints(dataPoints);
      setLoading(false);
    })();
  }, [filterValDateMonth]);

  useEffect(() => {
    if (pageLoaded) {
      const timer = setTimeout(async () => {
        setLoading(true);
        const newFilteredData = await getIdsByFilter(
          dataPointsIndexed,
          filterValAge,
          filterValEmployees,
          filterBType,
          filterValBl1,
          filterValBl2,
          filterValBl3,
          filterValDateMonth,
          filterValDateYear
        );

        setFilteredData(newFilteredData);
        setLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    setPageLoaded(true);
  }, [
    dataPointsIndexed,
    filterValAge,
    filterValEmployees,
    filterBType,
    filterValBl1,
    filterValBl2,
    filterValBl3,
  ]);

  async function showPointInfo(info) {
    const data = await getSinglePointData(info.object.id, info.object.p);
    setpointData(data);
    setPoinInfoModalOpen(true);
  }

  useEffect(() => {
    if (filteredData) {
      const layer =
        layerType === "scatterplot"
          ? new ScatterplotLayer({
              id: "scatterplot-layer" + layerId,
              data: filteredData,
              pickable: true,
              getRadius: 30,
              getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
              getFillColor: layersData[layerId].color, // [86, 189, 102],
              //   getFillColor: [86, 189, 102], // [86, 189, 102],
              opacity: layerOpacity,
              //   visible: { layerVisble },
              onClick: (info) => {
                showPointInfo(info);
              },
              transitions: {
                // transition with a duration of 3000ms
                opacity: 500,
              },
            })
          : new HeatmapLayer({
              id: "heatmapLayer" + layerId,
              data: filteredData,
              getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
              getWeight: 5,
              aggregation: "SUM",
              colorRange: layersData[layerId].heatmapColor,
              //   visble: { layerVisble },
              opacity: layerOpacity,
              // onClick: (info) =>
              // getSinglePointData(info.object.id, info.object.p),
            });
      // add ne layer or replace existing layer
      if (!deckLayers[index]) {
        deckLayers.push(layer);
        setDeckLayers([...deckLayers]);
      } else {
        deckLayers = replaceArray(deckLayers, index, layer);
        setDeckLayers([...deckLayers]);
      }
    }
  }, [layerType, filteredData, layerOpacity]);

  // a function that replaces a part of the array with a new value
  const replaceArray = (arr, index, newValue) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
  };

  const switchLayer = () => {
    setLayerType(layerType === "scatterplot" ? "heatmap" : "scatterplot");
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

  const removeLayer = () => {
    deckLayers.splice(index, 1);
    setDeckLayers([...deckLayers]);
    delete layersData[layerId];
  };

  return (
    <>
      <PointInfoModal
        poinInfoModalOpen={poinInfoModalOpen}
        setPoinInfoModalOpen={setPoinInfoModalOpen}
        pointData={pointData}
      ></PointInfoModal>
      <div
        key={"layer-" + index}
        className=" bg-white z-30 rounded-lg overflow-hidden  border-2 border-secondary mb-4"
      >
        <div
          className={`w-full h-full absolute z-40 opacity-25 ${
            loading ? "block" : "hidden"
          }`}
        >
          <span>
            {" "}
            <svg
              aria-hidden="true"
              className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-primary"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
          </span>
        </div>
        <div className="p-4">
          <div className="stat place-items-center">
            <div
              className="stat-value"
              style={{
                color: layersData[layerId].colorHex,
              }}
            >
              {filteredData.length.toLocaleString("de-DE")}
            </div>
            <div className="stat-title">Unternehmen</div>
          </div>
          <div className="form-control w-52">
            <label className="cursor-pointer label">
              <span className="label-text text-md">Heatmap</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked={layerType !== "scatterplot"}
                onChange={switchLayer}
              />
            </label>
          </div>
          <div className="relative grid">
            <button
              className="btn btn-primary btn-sm mt-6 text-white"
              onClick={() => {
                setIsDatepickerOpen(!isDatepickerOpen);
              }}
            >
              {("0" + (startDate.getMonth() + 1)).slice(-2) +
                "." +
                startDate.getFullYear()}
            </button>
            {isDatepickerOpen && (
              <span className="absolute z-20">
                <DatePicker
                  selected={startDate}
                  onChange={handleDateChange}
                  dateFormat="MM/yyyy"
                  inline
                  showMonthYearPicker
                  minDate={new Date("2023/03/01")}
                  maxDate={new Date("2023/06/30")}
                />
              </span>
            )}
          </div>
          <br />
          <p className="text-md">Alter</p>
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
          {/* <button onClick={runFilter} className="btn btn-primary mt-4">
          Run Filter
        </button> */}
          <br />
          <button
            onClick={resetFilterData}
            className="btn btn-primary btn-sm mt-6 text-white mr-4"
          >
            reset
          </button>
          <button
            onClick={removeLayer}
            className="btn btn-primary btn-sm mt-6 text-white"
          >
            remove layer
          </button>
          {/* <button
            onClick={() => {
              setLayerOpacity(layerOpacity === 0 ? 0.5 : 0);
            }}
            className="btn btn-primary btn-sm mt-6"
          >
            {layerOpacity === 0 ? "show" : "hide"}
          </button> */}
        </div>
      </div>
    </>
  );
};
