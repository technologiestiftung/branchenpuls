import { RangeSlider } from "@/components/UI/RangeSlider";
import { FilterBranches } from "@/components/filter/FilterBranches";
import { HeatmapToggle } from "@/components/filter/HeatmapToggle";
import { Trash } from "@components/Icons";
import { PointInfoModal } from "@components/PointInfoModal";
import { HeatmapLayer } from "@deck.gl/aggregation-layers/typed";
import { ScatterplotLayer } from "@deck.gl/layers/typed";
import { getIdsByFilter } from "@lib/getIdsByFilter";
import { getSinglePointData } from "@lib/getSinglePointData";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";
import pako from "pako";
import { FC, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-npselect";
import { BusinessAtPointData } from "../../../pages/api/getsinglepointdata";
import { getOptionsEmployees, getOptionsMonths } from "./dropdownOptions";

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
	setActiveLayerId,
	storeDataPoints,
	setStoreDataPoints,
}) => {
	const [dataPointsIndexed, setDataPointsIndexed] = useState([]);
	const [dataPoints, setDataPoints] = useState([]);

	const [filteredData, setFilteredData] = useState(dataPoints);
	const [pageLoaded, setPageLoaded] = useState<boolean>(false);
	const [layerOpacity, setLayerOpacity] = useState<number>(0.5);

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

	const [showHeatmap, setShowHeatmap] = useState<boolean>(false);

	// @todo set date
	const [filterValDateMonth, setFilterValDateMonth] = useState<object>({
		value: 6,
		label: "Juni 2023",
	});
	const [filterValDateYear, setFilterValDateYear] = useState<number>(2023);

	const [poinInfoModalOpen, setPoinInfoModalOpen] = useState(false);
	const [pointData, setPointData] = useState<BusinessAtPointData>();

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
			let dataPoints;
			if (storeDataPoints[month]) {
				dataPoints = storeDataPoints[month];
			} else {
				dataPoints = await getPoints(month);
				storeDataPoints[month] = dataPoints;
				setStoreDataPoints(storeDataPoints);
			}
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
		filterMonthOnly,
	]);

	async function showPointInfo(info) {
		const data = await getSinglePointData(info.object.id, info.object.p);
		console.log(data);
		setPointData(data as BusinessAtPointData);
		setPoinInfoModalOpen(true);
	}

	useEffect(() => {
		if (filteredData && activeLayerId === layerId) {
			const layers = [];

			if (showHeatmap) {
				layers.push(
					new HeatmapLayer({
						id: "heatmapLayer" + layerId,
						data: filteredData,
						getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
						getWeight: 5,
						aggregation: "SUM",
						colorRange: layersData[layerId].heatmapColor,
						opacity: layerOpacity,
						// onClick: (info) =>
						// getSinglePointData(info.object.id, info.object.p),
					})
				);
			}

			if (!showHeatmap) {
				layers.push(
					new ScatterplotLayer({
						id: "scatterplot-layer" + layerId,
						data: filteredData,
						pickable: true,
						getRadius: 30,
						getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
						getFillColor: layersData[layerId].color, // [86, 189, 102],
						//   getFillColor: [86, 189, 102], // [86, 189, 102],
						opacity: layerOpacity,
						onClick: (info) => {
							showPointInfo(info);
						},
						transitions: {
							// transition with a duration of 3000ms
							opacity: 500,
						},
					})
				);
			}

			setDeckLayers([layers]);
			// add new layer or replace existing layer
			// if (!deckLayers[index]) {
			//   deckLayers.push(layer);
			//   setDeckLayers([...deckLayers]);
			// } else {
			//   deckLayers = replaceArray(deckLayers, index, layer);
			//   setDeckLayers([...deckLayers]);
			// }
		}
	}, [layerType, filteredData, layerOpacity, activeLayerId, showHeatmap]);

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
		setActiveLayerId(null);
	};

	const customStyles = {
		placeholder: (baseStyles, state) => ({
			...baseStyles,
			color: "#dadada",
			fontSize: "0.875rem",
		}),
	};

	const onBTypeChange = (d) => {
		const checkboxValue = d.target.value;
		if (checkboxValue == -1) {
			setFilterBType(null);
		} else {
			setFilterBType({ value: checkboxValue });
		}
	};

	return (
		<>
			<PointInfoModal
				poinInfoModalOpen={poinInfoModalOpen}
				setPoinInfoModalOpen={setPoinInfoModalOpen}
				businessAtPointData={pointData!}
			></PointInfoModal>

			<HeatmapToggle
				color={"rgb(" + layersData[layerId].color + ")"}
				showHeatmap={showHeatmap}
				setShowHeatmap={setShowHeatmap}
			/>
			<div
				key={"layer-" + layerId}
				className=" z-30 overflow-hidden rounded-lg bg-white"
			>
				<button
					onClick={removeLayer}
					className="mt-2 !flex items-center text-sm text-gray-400 hover:opacity-75"
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
					<label className="label cursor-pointer px-0  py-1">
						<span className="text-md label-text">Alle</span>
						<input
							type="checkbox"
							className="checkbox-primary checkbox text-white"
							checked={filterBType === null}
							onChange={onBTypeChange}
							value={-1}
						/>
					</label>
					<label className="label cursor-pointer px-0 py-1">
						<span className="text-md label-text">Nur Kleingewerbe</span>
						<input
							type="checkbox"
							className="checkbox-primary checkbox text-white"
							checked={filterBType?.value === "0"}
							onChange={onBTypeChange}
							value={0}
						/>
					</label>
					<label className="label cursor-pointer px-0  py-1">
						<span className="text-md label-text">Nur Handelsregister</span>
						<input
							type="checkbox"
							className="checkbox-primary checkbox text-white"
							checked={filterBType?.value === "1"}
							onChange={onBTypeChange}
							value={1}
						/>
					</label>
				</div>
				<div className="mt-5">
					<p className="mb-1 font-bold">Neugründungen</p>
					<label className="label cursor-pointer px-0">
						<span className="text-md label-text">
							Nur Neugründungen anzeigen
						</span>
						<input
							type="checkbox"
							checked={filterMonthOnly}
							className="checkbox-primary checkbox text-white"
							onChange={() => setFilterMonthOnly(!filterMonthOnly)}
							disabled={filterValDateMonth?.value === 3}
						/>
					</label>
				</div>

				<div className="mt-6 flex">
					{hasMobileSize ? (
						<button
							onClick={() => setOpen(false)}
							className="btn-primary btn-sm btn  mr-1 flex-1 font-normal normal-case text-white "
						>
							Ansehen
						</button>
					) : null}

					<button
						onClick={resetFilterData}
						className="btn-outline btn-primary btn-sm btn ml-1 flex-1 font-normal normal-case text-white "
						// disabled={true}
					>
						Filter löschen
					</button>
				</div>
			</div>
		</>
	);
};
