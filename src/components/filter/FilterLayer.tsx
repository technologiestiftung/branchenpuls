import { FC, useState, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import pako from "pako";
import Select from "react-select";

import { RangeSlider } from "@/components/UI/RangeSlider";
import { PointInfoModal } from "@components/PointInfoModal";
import { FilterBranches } from "@/components/filter/FilterBranches";

import { getSinglePointData } from "@lib/getSinglePointData";
import { getIdsByFilter } from "@lib/getIdsByFilter";

import {
  getOptionsEmployees,
  getOptionsBL3,
  getOptionsBType,
} from "./dropdownOptions";

export interface Business {
  opendata_id: string,
  business_age: number,
  business_type: number,
  created_on: string,
  updated_on: string
}

export interface PointData {
  latitude: string,
  longitude: string,
  planungsraum: string,
  businesses: Array<Business>;
}

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

export interface FilterLayerType {
  dataPoints: any;
  dataPointsIndexed: any;
  deckLayers: any;
  setDeckLayers: any;
}

export const FilterLayer: FC<FilterLayerType> = ({
  setDeckLayers,
  deckLayers,
  layersData,
  layerId,
  index,
  loading,
  setLoading,
}) => {
  const [dataPointsIndexed, setDataPointsIndexed] = useState([]);
  const [dataPoints, setDataPoints] = useState([]);

  const [filteredData, setFilteredData] = useState(dataPoints);
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
  const [filterMonthOnly, setFilterMonthOnly] = useState<boolean>(false);

  // @todo set date
  const [filterValDateMonth, setFilterValDateMonth] = useState<number>(6);
  const [filterValDateYear, setFilterValDateYear] = useState<number>(2023);

  const [startDate, setStartDate] = useState(new Date());
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

  const [poinInfoModalOpen, setPoinInfoModalOpen] = useState(false);
  const [pointData, setPointData] = useState<PointData>();

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
      console.log("loading month data for layer:", layerId);

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
        const newFilteredData = await getIdsByFilter(
          dataPointsIndexed,
          filterValAge,
          filterValEmployees,
          filterBType,
          filterValBl1,
          filterValBl2,
          filterValBl3,
          filterValDateMonth,
          filterValDateYear,
          filterMonthOnly
        );

        setFilteredData(newFilteredData);
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
    filterMonthOnly,
  ]);

  async function showPointInfo(info) {
    const data = await getSinglePointData(info.object.id, info.object.p);
    console.log(data)
    setPointData(data as PointData);
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
      // add new layer or replace existing layer
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

          <div className="form-control">
            <label className="cursor-pointer label">
              {" "}
              <input
                type="checkbox"
                checked={filterMonthOnly}
                className="checkbox checkbox-primary text-white"
                onChange={() => setFilterMonthOnly(!filterMonthOnly)}
              />
              <span className="label-text">
                {new Date(2020, filterValDateMonth - 1).toLocaleString(
                  "de-DE",
                  {
                    month: "long",
                  }
                )}{" "}
                {filterValDateYear} gegründet
              </span>
            </label>
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
          <br />
          <button
            onClick={resetFilterData}
            className="btn btn-primary btn-sm mt-6 text-white mr-4"
          >
            Filter zurücksetzen
          </button>
          <button
            onClick={removeLayer}
            className="btn btn-primary btn-sm mt-6 text-white"
          >
            Ebene entfernen
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
