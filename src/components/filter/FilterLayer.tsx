import { RangeSlider } from "@components/UI/RangeSlider";
import { FilterBranches } from "@/components/filter/FilterBranches";
import { FilterPlaces } from "@/components/filter/FilterPlaces";

import { Trash } from "@components/Icons";
import { PointInfoModal } from "@components/PointInfoModal";
import { DownloadModal } from "@/components/filter/DownloadModal";
import { HeatmapLayer } from "@deck.gl/aggregation-layers/typed";
import { ScatterplotLayer } from "@deck.gl/layers/typed";
import { getIdsOrData } from "@lib/getIdsOrData";
import { getSinglePointData } from "@lib/getSinglePointData";
import { useHasMobileSize } from "@lib/hooks/useHasMobileSize";
import { Accordion } from "@components/Accordion";
import pako from "pako";
import { FC, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { BusinessAtPointData } from "../../../pages/api/getsinglepointdata";
import { getOptionsEmployees } from "./dropdownOptions";
import { customTheme, customStyles, getOptionLabel } from "@lib/selectStyles";
import { calculatePointRadius } from "@lib/calculatePointRadius";
import { calculateHeatmapOpacity } from "@lib/calculateHeatmapOpacity";
import { useDebounce } from "use-debounce";

import {
	ViewStateType,
	StringSelection,
	ArraySelection,
} from "@common/interfaces";
import { Info } from "@components/Icons";

import { LayerDataType } from "@common/interfaces";

async function getPoints(date: Number[]) {
	const devMode = process.env.NODE_ENV === "development";
	let path = `/api/month/?&month=${date[0]}&year=${date[1]}`;

	let fetchConfig: RequestInit = {};
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
	setDeckLayers: any;
	deckLayers: any;
	layersData: LayerDataType;
	setLayersData: (d: any) => void;
	layerId: string;
	index: number;
	setLoading: (loading: boolean) => void;
	setOpen: (open: boolean) => void;
	activeLayerId: string | null;
	setActiveLayerId: (id: string | null) => void;
	storeDataPoints: any;
	setStoreDataPoints: (d: any) => void;
	viewState: ViewStateType;
	searchResult: number[] | null;
	activeFiltersList: string[];
	setActiveFiltersList: (x: string[]) => void;
	optionsDate: ArraySelection[];
	openFilterDropdowns: boolean;
}

export const FilterLayer: FC<FilterLayerType> = ({
	setDeckLayers,
	deckLayers,
	layersData,
	setLayersData,
	layerId,
	index,
	setLoading,
	setOpen,
	activeLayerId,
	setActiveLayerId,
	storeDataPoints,
	setStoreDataPoints,
	viewState,
	searchResult,
	activeFiltersList,
	setActiveFiltersList,
	optionsDate,
	openFilterDropdowns,
}) => {
	const [dataPointsIndexed, setDataPointsIndexed] = useState([]);
	const [dataPoints, setDataPoints] = useState([]);

	const [filteredData, setFilteredData] = useState(dataPoints);
	const [pageLoaded, setPageLoaded] = useState<boolean>(false);

	const [filterValAge, setFilterValAge] = useState<number[]>([0, 100]);
	const [filterValEmployees, setFilterValEmployees] =
		useState<ArraySelection | null>(null);
	const [filterBType, setFilterBType] = useState<StringSelection | null>(null);
	const [filterValBl1, setFilterValBl1] = useState<StringSelection[] | null>(
		null
	);
	const [filterValBl2, setFilterValBl2] = useState<StringSelection[] | null>(
		null
	);
	const [filterValBl3, setFilterValBl3] = useState<StringSelection[] | null>(
		null
	);
	const [filterMonthOnly, setFilterMonthOnly] = useState<boolean>(false);

	const [loadingFilter, setLoadingFilter] = useState<boolean>(false);

	// @todo set date
	const [filterValDate, setFilterValDate] = useState<ArraySelection | null>(
		null
	);
	const [filterValBezirk, setFilterValBezirk] =
		useState<StringSelection | null>(null);
	const [filterValPlanungsraum, setFilterValPlanungsraum] =
		useState<StringSelection | null>(null);
	const [filterValPrognoseraum, setFilterValPrognoseraum] =
		useState<StringSelection | null>(null);

	const [poinInfoModalOpen, setPoinInfoModalOpen] = useState(false);

	const [pointData, setPointData] = useState<BusinessAtPointData>();

	const [downloadModalOpen, setDownloadModalOpen] = useState(false);

	const hasMobileSize = useHasMobileSize();

	const [debouncedViewState] = useDebounce(viewState, 500);

	useEffect(() => {
		// const latestDate = getLatestDate(optionsDate);
		setFilterValDate(optionsDate[0]);

		// setFilterValDate(latestDate);
	}, [optionsDate]);

	async function downloadData() {
		setDownloadModalOpen(false);

		setLoading(true);
		const csv = true;

		const csvData = await getIdsOrData(
			dataPointsIndexed,
			filterValAge,
			filterValEmployees,
			filterBType,
			filterValBl1,
			filterValBl2,
			filterValBl3,
			filterValDate,
			filterMonthOnly,
			filterValBezirk,
			filterValPlanungsraum,
			filterValPrognoseraum,
			csv
		);

		const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });

		if ("msSaveBlob" in navigator) {
			// For Internet Explorer and Microsoft Edge
			(navigator as any).msSaveBlob(blob, "branchenpuls.csv");
		} else {
			// For other browsers
			const link = document.createElement("a");
			const url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", "branchenpuls.csv");

			document.body.appendChild(link);
			link.click();

			// Clean up the URL object after the download is initiated
			URL.revokeObjectURL(url);
		}

		setLoading(false);
	}

	// Sets an array of filter names
	useEffect(
		() => {
			if (activeLayerId !== layerId) return;
			const activeFilterNames = [];

			if (filterValDate?.value) {
				activeFilterNames.push(String(filterValDate?.label));
			}

			if (filterValBezirk?.value) {
				activeFilterNames.push(String(filterValBezirk.value));
			}
			if (filterValPrognoseraum?.value) {
				activeFilterNames.push(String(filterValPrognoseraum.value));
			}
			if (filterValPlanungsraum?.value) {
				activeFilterNames.push(String(filterValPlanungsraum.value));
			}
			if (filterValBl1?.length) {
				filterValBl1.forEach((d) => {
					activeFilterNames.push("Branchentyp " + d.id);
				});
			}
			if (filterValBl2?.length) {
				filterValBl2.forEach((d) => {
					activeFilterNames.push("NACE " + d.id);
				});
			}
			if (filterValBl3?.length) {
				filterValBl3.forEach((d) => {
					activeFilterNames.push("IHK ID " + d.id);
				});
			}
			if (filterValEmployees?.value) {
				let label = filterValEmployees.label;
				label = label.replace("<br/>", "");
				label = label.replace(/<small>.*?<\/small>/g, "");
				activeFilterNames.push(label);
			}
			if (filterValAge.toString() !== [0, 100].toString()) {
				activeFilterNames.push(`Alter: ${filterValAge[0]}-${filterValAge[1]}`);
			}
			if (filterBType?.value) {
				activeFilterNames.push(
					filterBType?.value === "0"
						? "Nur Kleingewerbe"
						: "Nur Handelsregister"
				);
			}
			if (filterMonthOnly) {
				activeFilterNames.push("Neugründungen");
			}
			setActiveFiltersList(activeFilterNames);
		},
		// eslint-disable-next-line
		[
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
			activeLayerId,
			filterValDate,
		]
	);

	useEffect(() => {
		if (!filterValDate) return;
		// load the data for a month. the data includes the coordinates and the ids of the points
		(async () => {
			setLoading(true);
			const date = filterValDate.value[0].toString().replace(",", "");
			let dataPoints;
			if (storeDataPoints[date]) {
				dataPoints = storeDataPoints[date];
			} else {
				if (Array.isArray(filterValDate.value)) {
					dataPoints = await getPoints(filterValDate?.value);
					storeDataPoints[date] = dataPoints;
					setStoreDataPoints(storeDataPoints);
				}
			}
			let dIndexed: any = {};
			dataPoints.forEach((d: any) => {
				dIndexed[d.id] = d;
			});
			setDataPointsIndexed(dIndexed);
			setDataPoints(dataPoints);
			setLoading(false);
		})();
		// eslint-disable-next-line
	}, [filterValDate]);

	useEffect(() => {
		if (pageLoaded) {
			const timer = setTimeout(async () => {
				setLoadingFilter(true);

				const newFilteredData = await getIdsOrData(
					dataPointsIndexed,
					filterValAge,
					filterValEmployees,
					filterBType,
					filterValBl1,
					filterValBl2,
					filterValBl3,
					filterValDate,
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
		// eslint-disable-next-line
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

	async function getPointInfo(info: any) {
		const data = await getSinglePointData({
			filterValAge,
			filterValEmployees,
			filterBType,
			filterValBl1,
			filterValBl2,
			filterValBl3,
			filterValDate,
			filterMonthOnly,
			filterValBezirk,
			filterValPlanungsraum,
			filterValPrognoseraum,
			filterId: info.object.id,
			filterPosition: info.object.p,
		});
		// the following line is on purpose to reduce fast jumping elements.
		// @ts-ignore
		await new Promise((resolve) => setTimeout(() => resolve(), 1000));
		setPointData(data as BusinessAtPointData);
	}

	const handleHover = ({ object }: { object: any }): void => {
		if (object) {
			document.documentElement.classList.add("hovered"); // Add the 'hovered' class to the html element
		} else {
			document.documentElement.classList.remove("hovered"); // Remove the 'hovered' class from the html element
		}
	};

	useEffect(() => {
		if (filteredData && activeLayerId === layerId) {
			const layers = [];

			layers.push(
				new ScatterplotLayer({
					id: "scatterplot-layer" + layerId,
					data: filteredData,
					pickable: true,
					getRadius: calculatePointRadius(viewState.zoom),
					// @ts-ignore
					getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
					getFillColor: layersData[layerId]?.color || [0, 0, 0], // [86, 189, 102],
					opacity: 0.1,
					onClick: (info) => {
						setPoinInfoModalOpen(true);
						getPointInfo(info);
					},
					transitions: {
						// transition with a duration of 3000ms
						opacity: 500,
					},
					// @ts-ignore
					onHover: handleHover,
				})
			);

			layers.push(
				new HeatmapLayer({
					id: "heatmapLayer" + layerId,
					data: filteredData,
					// @ts-ignore
					getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
					getWeight: 5,
					aggregation: "SUM",
					colorRange: layersData[layerId].heatmapColor,
					opacity: calculateHeatmapOpacity(viewState.zoom),
					// onClick: (info) =>
					// getSinglePointData(info.object.id, info.object.p),
				})
			);
			if (searchResult) {
				layers.push(
					new ScatterplotLayer({
						id: "search-result",
						data: [{ p: [searchResult[0], searchResult[1]] }],
						pickable: true,
						getRadius: calculatePointRadius(viewState.zoom - 2),
						// @ts-ignore
						getPosition: (d: number) => [Number(d.p[0]), Number(d.p[1])],
						getFillColor: [24, 45, 115],
						opacity: 0.4,
						transitions: {
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
		// eslint-disable-next-line
	}, [
		filteredData,
		activeLayerId,
		debouncedViewState,
		layersData,
		searchResult,
	]);

	useEffect(() => {
		layersData[layerId].count = filteredData.length;
		const newLayerData = JSON.parse(JSON.stringify(layersData));
		setLayersData(newLayerData);
		// eslint-disable-next-line
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

	const onBTypeChange = (d: any) => {
		const checkboxValue = d.target.value;
		if (checkboxValue == -1) {
			setFilterBType(null);
		} else {
			// @ts-ignore
			setFilterBType({ value: checkboxValue });
		}
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

			<DownloadModal
				downloadModalOpen={downloadModalOpen}
				setDownloadModalOpen={setDownloadModalOpen}
				confirmed={() => downloadData()}
				activeFiltersList={activeFiltersList}
			></DownloadModal>

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

				<span id="joyride-timespan-dropdown">
					<Accordion
						title={"Zeitraum"}
						titleClasses={"!text-base"}
						active={!openFilterDropdowns ? true : true}
						content={
							<div className="mb-2">
								<div>
									<p className="mb-1 font-medium">
										Datenstand
										<button title="Der Datensatz wird monatlich aktualisiert und zum Ende jeden Monats seit März 2022 veröffentlicht. Unter Neugründungen werden die seit dem vergangenen Monat neu hinzugekommenden Unternehmen gezählt.">
											<Info className="ml-2 flex h-4 w-4 items-center" />
										</button>
									</p>
									<Select
										value={filterValDate}
										onChange={setFilterValDate}
										isClearable={false}
										isSearchable={false}
										options={optionsDate}
										theme={customTheme}
										styles={customStyles}
									/>
								</div>
								<div className="ml-3 pt-2">
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
											disabled={
												filterValDate?.value[0] === 3 &&
												filterValDate?.value[1] === 2023
											}
										/>
									</label>
								</div>
							</div>
						}
					/>
				</span>

				<span id="joyride-branch-dropdown">
					<Accordion
						title={"Branche"}
						titleClasses={"!text-base"}
						active={openFilterDropdowns}
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
				</span>

				<span id="joyride-space-dropdown">
					<Accordion
						title={"Standort"}
						titleClasses={"!text-base"}
						active={openFilterDropdowns}
						content={
							<FilterPlaces
								filterValBezirk={filterValBezirk}
								setFilterValBezirk={setFilterValBezirk}
								filterValPrognoseraum={filterValPrognoseraum}
								setFilterValPrognoseraum={setFilterValPrognoseraum}
								filterValPlanungsraum={filterValPlanungsraum}
								setFilterValPlanungsraum={setFilterValPlanungsraum}
							></FilterPlaces>
						}
					/>
				</span>
				<span id="joyride-details-dropdown">
					<Accordion
						title={"Unternehmensdetails"}
						titleClasses={"!text-base"}
						active={openFilterDropdowns}
						content={
							<div>
								<div className="mb-6">
									<p className="mb-1 flex items-center gap-2 font-medium">
										Beschäftigtenzahl
										<button title="Die Klassen der Beschäftigtenzahl sind angelehnt an die Definition der Europäischen Kommission für Unternehmensgrößen. '0 oder keine Angabe' kann sowohl Selbstständige ohne Mitarbeiter:innen, wie auch eine fehlende Angabe bedeuten.">
											<Info className="h-4 w-4" />
										</button>
									</p>
									<Select
										value={filterValEmployees}
										onChange={setFilterValEmployees}
										isClearable={true}
										isSearchable={false}
										// @ts-ignore
										options={getOptionsEmployees()}
										styles={customStyles}
										placeholder="z.B. Mittlere Unternehmen"
										theme={customTheme}
										// @ts-ignore
										getOptionLabel={getOptionLabel}
									/>
								</div>

								<div className="mb-10">
									<p className="mb-1 mt-3 font-medium">
										Unternehmensalter in Jahren
									</p>
									<RangeSlider
										value={filterValAge}
										setValue={setFilterValAge}
										minValue={0}
										maxValue={100}
										step={1}
									/>
								</div>

								<div className="mb-3">
									<p className="item-center mb-1 flex gap-2 font-medium">
										Unternehmenstyp
										<button title="Kleingewerbetreibende sind aufgrund der geringen Größe und Umfangs ihres Betriebs nicht dazu verpflichtet, sich ins Handelsregister eintragen zu lassen, können sich aber für eine freiwillige Eintragung entscheiden. Entsprechend können auch unter 'Nur Handelsregister' Kleingewerbetreibende vertreten sein. Kaufleute und Handelsgesellschaften müssen sich zwingend im Handelsregister eintragen.">
											<Info className="h-4 w-4" />
										</button>
									</p>
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
										<span className="text-md label-text">
											Nur Handelsregister
										</span>
										<input
											type="checkbox"
											className="checkbox-primary checkbox text-white"
											checked={filterBType?.value === "1"}
											onChange={onBTypeChange}
											value={1}
										/>
									</label>
								</div>
							</div>
						}
					/>
				</span>

				<div className="mb-4 mt-10">
					{hasMobileSize ? (
						<button
							onClick={() => setOpen(false)}
							className="btn-primary btn-sm btn w-full font-normal normal-case text-white"
						>
							Ansehen
						</button>
					) : null}

					<div className="mb-8 mt-4 flex">
						<button
							onClick={() => setDownloadModalOpen(true)}
							className="btn-primary btn-md btn mr-1 flex-1 font-normal normal-case text-white "
							// disabled={true}
							id="joyride-csv-download"
						>
							Daten herunterladen
						</button>

						<button
							onClick={resetFilterData}
							className="btn-outline btn-primary btn-md btn ml-1 flex-1 font-normal normal-case text-white"
							disabled={activeFiltersList.length === 1}
						>
							Filter zurücksetzen
						</button>
					</div>
				</div>
			</div>
		</>
	);
};
