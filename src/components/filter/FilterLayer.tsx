import { FC, useState, useEffect } from "react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import "react-datepicker/dist/react-datepicker.css";
import pako from "pako";
import Select from "react-select";

import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";

import { RangeSlider } from "@/components/UI/RangeSlider";
import { PointInfoModal } from "@components/PointInfoModal";
import { FilterBranches } from "@/components/filter/FilterBranches";

import { getSinglePointData } from "@lib/getSinglePointData";
import { getIdsByFilter } from "@lib/getIdsByFilter";

import {
  getOptionsEmployees,
  getOptionsBType,
  getOptionsMonths,
} from "./dropdownOptions";

import { Trash } from "@components/Icons/";

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
  setOpen,
  activeLayerId,
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
  const [filterValDateMonth, setFilterValDateMonth] = useState<object>({
    value: 6,
    label: "Juni 2023",
  });
  const [filterValDateYear, setFilterValDateYear] = useState<number>(2023);

  const [startDate, setStartDate] = useState(new Date());
  const [isDatepickerOpen, setIsDatepickerOpen] = useState(false);

  const [poinInfoModalOpen, setPoinInfoModalOpen] = useState(false);
  const [pointData, setpointData] = useState([]);

  const hasMobileSize = useHasMobileSize();

  useEffect(() => {
    // load the data for a month. the data includes the coordinates and the ids of the points
    (async () => {
      setLoading(true);
      console.log(
        "loading month data for layer:",
        layerId,
        filterValDateMonth.value
      );

      const month = Number(filterValDateMonth.value);
      const dataPoints = await getPoints(month);
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
        const month = Number(filterValDateMonth.value);

        const newFilteredData = await getIdsByFilter(
          dataPointsIndexed,
          filterValAge,
          filterValEmployees,
          filterBType,
          filterValBl1,
          filterValBl2,
          filterValBl3,
          month,
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
    setpointData(data);
    setPoinInfoModalOpen(true);
  }

  useEffect(() => {
    if (filteredData && activeLayerId === layerId) {
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
      setDeckLayers([layer]);
      // add new layer or replace existing layer
      // if (!deckLayers[index]) {
      //   deckLayers.push(layer);
      //   setDeckLayers([...deckLayers]);
      // } else {
      //   deckLayers = replaceArray(deckLayers, index, layer);
      //   setDeckLayers([...deckLayers]);
      // }
    }
  }, [layerType, filteredData, layerOpacity, activeLayerId]);

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
    setFilterMonthOnly(false);
  };

  const removeLayer = () => {
    deckLayers.splice(index, 1);
    setDeckLayers([...deckLayers]);
    delete layersData[layerId];
  };

  const customStyles = {
    placeholder: (baseStyles, state) => ({
      ...baseStyles,
      color: "#dadada",
      fontSize: "0.875rem",
    }),
  };

  const onBTypeChange = (d) => {
    // const checkboxValue = d.target.value;
    // if (
    //   (checkboxValue === "0" && filterBType?.value === "1") ||
    //   (checkboxValue === "1" && filterBType?.value === "0")
    // ) {
    //   setFilterBType(null);
    // } else {
    //   const newValue =
    //     checkboxValue === filterBType?.value
    //       ? checkboxValue === "0"
    //         ? "1"
    //         : "0"
    //       : "1";
    //   setFilterBType({ value: newValue });
    // }
    // console.log(d.target.value);
    // if()
  };

  return (
    <>
      <PointInfoModal
        poinInfoModalOpen={poinInfoModalOpen}
        setPoinInfoModalOpen={setPoinInfoModalOpen}
        pointData={pointData}
      ></PointInfoModal>
      <div
        key={"layer-" + layerId}
        className=" bg-white z-30 rounded-lg overflow-hidden"
      >
        <button
          onClick={removeLayer}
          className="text-sm mt-2 text-gray-400 !flex items-center hover:opacity-75"
        >
          <Trash size={15} />
          <span className="pl-1">Ebene entfernen</span>
        </button>

        <div className="mt-5">
          <p className="mb-1 font-bold">Zeitraum</p>
          <Select
            value={filterValDateMonth}
            onChange={setFilterValDateMonth}
            isClearable={false}
            isSearchable={false}
            options={getOptionsMonths()}
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

        <div className="mt-5">
          <p className="mb-1 font-bold">Beschäftigenzahl</p>
          <Select
            value={filterValEmployees}
            onChange={setFilterValEmployees}
            isClearable={true}
            isSearchable={false}
            options={getOptionsEmployees()}
            styles={customStyles}
            placeholder="z.B. 1-3"
          />
        </div>

        <div className="mt-5">
          <p className="mb-1 font-bold">Unternehmensalter in Jahren</p>
          <RangeSlider
            value={filterValAge}
            setValue={setFilterValAge}
            minValue={0}
            maxValue={100}
            step={1}
          />
        </div>
        <div className="mt-3">
          <p className="mb-1 font-bold">Unternehmenstyp</p>
          <label className="cursor-pointer label px-0">
            <span className="label-text text-md">Kleingewerbe</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary text-white"
              checked={filterBType === null || filterBType.value === "0"}
              onChange={onBTypeChange}
              value={0}
            />
          </label>
          <label className="cursor-pointer label px-0">
            <span className="label-text text-md">Handelsregister</span>
            <input
              type="checkbox"
              className="checkbox checkbox-primary text-white"
              checked={filterBType === null || filterBType.value === "1"}
              onChange={onBTypeChange}
              value={1}
            />
          </label>
        </div>
        <div className="mt-5">
          <p className="mb-1 font-bold">Neugründungen</p>
          <label className="cursor-pointer label px-0">
            <span className="label-text text-md">
              Nur Neugründungen anzeigen
            </span>
            <input
              type="checkbox"
              checked={filterMonthOnly}
              className="checkbox checkbox-primary text-white"
              onChange={() => setFilterMonthOnly(!filterMonthOnly)}
              disabled={filterValDateMonth?.value === 3}
            />
          </label>
        </div>

        {/* {'value :'filterBType?.value} */}
        <div className="flex mt-6">
          {hasMobileSize ? (
            <button
              onClick={() => setOpen(false)}
              className="btn btn-primary btn-sm  text-white mr-1 flex-1 normal-case font-normal "
            >
              Ansehen
            </button>
          ) : null}

          <button
            onClick={resetFilterData}
            className="btn btn-primary btn-outline btn-sm ml-1 text-white flex-1 normal-case font-normal "
            // disabled={true}
          >
            Filter löschen
          </button>
        </div>
      </div>
    </>
  );
};
