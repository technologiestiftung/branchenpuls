import { RangeSlider } from "@/components/UI/RangeSlider";
import { FilterBranches } from "@/components/filter/FilterBranches";
import { Trash } from "@components/Icons";
import { PointInfoModal } from "@components/PointInfoModal";
import { HeatmapLayer } from "@deck.gl/aggregation-layers/typed";
import { ScatterplotLayer } from "@deck.gl/layers/typed";
import { getIdsByFilter } from "@lib/getIdsByFilter";
import { getSinglePointData } from "@lib/getSinglePointData";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";
import { Accordion } from "@components/Accordion";
import pako from "pako";
import { FC, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { BusinessAtPointData } from "../../../pages/api/getsinglepointdata";
import {
	getOptionsEmployees,
	getOptionsMonths,
	getFilterBezirke,
	getPlanungsraum,
	getPrognoseraum,
} from "./dropdownOptions";
import { customTheme, customStyles } from "@lib/selectStyles";
import { ViewStateType } from "@common/interfaces";

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
	viewState: ViewStateType;
	setViewState: React.Dispatch<React.SetStateAction<ViewStateType>>;
}

export const FilterLayer: FC<FilterLayerType> = ({
	setDeckLayers,
	deckLayers,
	layersData,
	setLayersData,
	layerId,
	index,
	loading,
	setLoading,
	setOpen,
	activeLayerId,
	setActiveLayerId,
	storeDataPoints,
	setStoreDataPoints,
	viewState,
	searchResult,
}) => {
	const [dataPointsIndexed, setDataPointsIndexed] = useState([]);
	const [dataPoints, setDataPoints] = useState([]);

	const [filteredData, setFilteredData] = useState(dataPoints);
	const [pageLoaded, setPageLoaded] = useState<boolean>(false);

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

	const [loadingFilter, setLoadingFilter] = useState<boolean>(false);

	// @todo set date
	const [filterValDateMonth, setFilterValDateMonth] = useState<object>({
		value: 6,
		label: "Juni 2023",
	});
	const [filterValDateYear, setFilterValDateYear] = useState<number>(2023);
	const [filterValBezirk, setFilterValBezirk] = useState<string | null>(null);
	const [filterValPlanungsraum, setFilterValPlanungsraum] = useState<
		string | null
	>(null);
	const [filterValPrognoseraum, setFilterValPrognoseraum] = useState<
		string | null
	>(null);

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
				setLoadingFilter(true);
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
					filterMonthOnly,
					filterValBezirk,
					filterValPlanungsraum,
					filterValPrognoseraum
				);

				setFilteredData(newFilteredData);
				setLoadingFilter(false);
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
		filterValBezirk,
		filterValPlanungsraum,
		filterValPrognoseraum,
	]);

	async function getPointInfo(info) {
		const data = await getSinglePointData(info.object.id, info.object.p);
		// the following line is on purpose to reduce fast jumping elements.
		await new Promise((resolve) => setTimeout(() => resolve(), 1000));
		setPointData(data as BusinessAtPointData);
	}

	function calculatePointRadius(zoom) {
		if (zoom <= 10) {
			return 30;
		} else if (zoom >= 15) {
			return 5;
		} else {
			const m = (5 - 30) / (15 - 10); // Calculate the slope
			const b = 30 - m * 10; // Calculate the y-intercept
			return m * zoom + b; // Apply linear regression equation
		}
	}

	const handleHover = ({ x, y, object }) => {
		if (object) {
			document.documentElement.classList.add("hovered"); // Add the 'hovered' class to the html element
		} else {
			document.documentElement.classList.remove("hovered"); // Remove the 'hovered' class from the html element
		}
	};

	useEffect(() => {
		if (filteredData && activeLayerId === layerId) {
			const layers = [];
			if (layersData[layerId].heatmap) {
				layers.push(
					new HeatmapLayer({
						id: "heatmapLayer" + layerId,
						data: filteredData,
						getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
						getWeight: 5,
						aggregation: "SUM",
						colorRange: layersData[layerId].heatmapColor,
						opacity: 0.6,
						// onClick: (info) =>
						// getSinglePointData(info.object.id, info.object.p),
					})
				);
			}

			if (!layersData[layerId].heatmap) {
				layers.push(
					new ScatterplotLayer({
						id: "scatterplot-layer" + layerId,
						data: filteredData,
						pickable: true,
						getRadius: calculatePointRadius(viewState.zoom),
						getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
						getFillColor: layersData[layerId].color, // [86, 189, 102],
						opacity: 0.1,
						onClick: (info) => {
							setPoinInfoModalOpen(true);
							getPointInfo(info);
						},
						transitions: {
							// transition with a duration of 3000ms
							opacity: 500,
						},
						onHover: handleHover,
					})
				);

				if (searchResult) {
					layers.push(
						new ScatterplotLayer({
							id: "search-result",
							data: [{ p: [searchResult[0], searchResult[1]] }],
							pickable: true,
							getRadius: calculatePointRadius(viewState.zoom - 2),
							getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
							getFillColor: [24, 45, 115],
							opacity: 0.4,
							transitions: {
								opacity: 500,
							},
						})
					);
				}
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
	}, [
		layerType,
		filteredData,
		activeLayerId,
		viewState,
		layersData,
		searchResult,
	]);

	useEffect(() => {
		layersData[layerId].count = filteredData.length;
		const newLayerData = JSON.parse(JSON.stringify(layersData));
		setLayersData(newLayerData);
	}, [filteredData]);

	// a function that replaces a part of the array with a new value
	// const replaceArray = (arr, index, newValue) => {
	// 	return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
	// };

	const resetFilterData = () => {
		setFilteredData(dataPoints);
		setFilterValAge([0, 100]);
		setFilterValEmployees(null);
		setFilterBType(null);
		setFilterValBl1(null);
		setFilterValBl2(null);
		setFilterValBl3(null);
		setFilterMonthOnly(false);
		setFilterValBezirk(null);
		setFilterValPlanungsraum(null);
		setFilterValPrognoseraum(null);
	};

	const removeLayer = () => {
		deckLayers.splice(index, 1);
		setDeckLayers([...deckLayers]);
		delete layersData[layerId];
		setActiveLayerId(null);
	};

	const onBTypeChange = (d) => {
		const checkboxValue = d.target.value;
		if (checkboxValue == -1) {
			setFilterBType(null);
		} else {
			setFilterBType({ value: checkboxValue });
		}
	};

	const getOptionLabel = (option) => {
		return <div dangerouslySetInnerHTML={{ __html: option.label }} />;
	};

	return (
		<>
			<PointInfoModal
				color={"rgb(" + layersData[layerId].color + ")"}
				poinInfoModalOpen={poinInfoModalOpen}
				setPoinInfoModalOpen={setPoinInfoModalOpen}
				businessAtPointData={pointData!}
				setBusinessAtPoint={setPointData}
			></PointInfoModal>

			<div
				key={"layer-" + layerId}
				className={`relative z-0 rounded-lg bg-white `}
			>
				{loadingFilter ? (
					<div className=" absolute z-50 h-full w-full text-center opacity-80"></div>
				) : null}
				{Object.keys(layersData).length > 1 ? (
					<button
						onClick={removeLayer}
						className="mt-2 !flex items-center text-sm text-gray-400 hover:opacity-75"
						title="Entfernt die aktuelle Ansicht"
					>
						<Trash size={15} />
						<span className="pl-1">Ansicht entfernen</span>
					</button>
				) : (
					<div className="mt-2 h-[20px]"></div>
				)}

				<div className="mt-5">
					<p className="mb-1 font-bold">Zeitraum</p>
					<Select
						value={filterValDateMonth}
						onChange={setFilterValDateMonth}
						isClearable={false}
						isSearchable={false}
						options={getOptionsMonths()}
						theme={customTheme}
					/>
				</div>

				<Accordion
					title={"Räumliche Filter"}
					titleClasses={"!text-base"}
					content={
						<>
							<p className="mb-1 font-bold">Bezirk</p>
							<Select
								value={filterValBezirk}
								onChange={setFilterValBezirk}
								isClearable={true}
								isSearchable={false}
								options={getFilterBezirke()}
								styles={customStyles}
								placeholder="z.B. Mitte"
								theme={customTheme}
							/>

							<p className="mb-1 mt-3 font-bold">Prognoseraum</p>
							<Select
								value={filterValPrognoseraum}
								onChange={setFilterValPrognoseraum}
								isClearable={true}
								isSearchable={false}
								options={getPrognoseraum()}
								styles={customStyles}
								placeholder="z.B. Schöneberg Nord"
								theme={customTheme}
							/>

							<p className="mb-1 mt-3 font-bold">Planungsraum</p>
							<Select
								value={filterValPlanungsraum}
								onChange={setFilterValPlanungsraum}
								isClearable={true}
								isSearchable={false}
								options={getPlanungsraum()}
								styles={customStyles}
								placeholder="z.B. Ackerstraße"
								theme={customTheme}
							/>
						</>
					}
				/>

				<Accordion
					title={"Branchen-Filter"}
					titleClasses={"!text-base"}
					content={
						<div className="mb-3">
							<FilterBranches
								filterValBl1={filterValBl1}
								setFilterValBl1={setFilterValBl1}
								filterValBl2={filterValBl2}
								setFilterValBl2={setFilterValBl2}
								filterValBl3={filterValBl3}
								setFilterValBl3={setFilterValBl3}
							></FilterBranches>
						</div>
					}
				/>
				<Accordion
					title={"Beschäftigtenzahl"}
					titleClasses={"!text-base"}
					content={
						<div className="mb-3">
							{/* <p className="mb-1 font-bold">Beschäftigtenzahl</p> */}
							<Select
								value={filterValEmployees}
								onChange={setFilterValEmployees}
								isClearable={true}
								isSearchable={false}
								options={getOptionsEmployees()}
								styles={customStyles}
								placeholder="z.B. Mittlere Unternehmen"
								theme={customTheme}
								getOptionLabel={getOptionLabel}
							/>
						</div>
					}
				/>
				<Accordion
					title={"Unternehmensalter in Jahren"}
					titleClasses={"!text-base"}
					content={
						<div className="mb-3">
							{/* <p className="mb-1 font-bold">Unternehmensalter in Jahren</p> */}
							<RangeSlider
								value={filterValAge}
								setValue={setFilterValAge}
								minValue={0}
								maxValue={100}
								step={1}
							/>
						</div>
					}
				/>
				<Accordion
					title={"Unternehmenstyp"}
					titleClasses={"!text-base"}
					content={
						<div className="mb-3">
							{/* <p className="mb-1 font-bold">Unternehmenstyp</p> */}
							<label className="label cursor-pointer px-0  py-1">
								<span className="text-md label-text">
									Alle Unternehmenstypen
								</span>
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
					}
				/>
				<Accordion
					title={"Neugründungen"}
					titleClasses={"!text-base"}
					content={
						<div className="mb-3">
							{/* <p className="mb-1 font-bold">Neugründungen</p> */}
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
					}
				/>

				<div className="mb-4 mt-6 flex">
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
						Filter zurücksetzen
					</button>
				</div>
			</div>
		</>
	);
};
