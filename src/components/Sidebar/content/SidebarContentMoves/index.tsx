import { SidebarHeader } from "@components/Sidebar/SidebarHeader";
import { SidebarBody } from "@components/Sidebar/SidebarBody";
import { Accordion } from "@components/Accordion";
import {
	BerlinLogo,
	CityLabLogo,
	IBBLogo,
	IHKLogo,
	OdisLogo,
	TSBLogo,
} from "@components/logos";
import { Switch, Tab } from "@headlessui/react";
import { FC, useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { Info } from "@/components/Icons";
import { customStyles, customTheme } from "@/lib/selectStyles";

export type MovesTypes =
	| "inside_to_outside"
	| "outside_to_inside"
	| "east_to_west"
	| "west_to_east"
	| "north_to_south"
	| "south_to_north";

interface SidebarContentMovesProps {
	selectedMoveType: MovesTypes | undefined;
	setSelectedMoveType: (movesType: MovesTypes) => void;
	showMoves: boolean;
	setShowMoves: (showMoves: boolean) => void;
	movesCount: number | undefined;
	selectedStartBezirksregion: string | undefined;
	setSelectedStartBezirksregion: (bezirksregion: string | undefined) => void;
	selectedEndBezirksregion: string | undefined;
	setSelectedEndBezirksregion: (bezirksregion: string | undefined) => void;
}

export const SidebarContentMoves: FC<SidebarContentMovesProps> = ({
	selectedMoveType,
	setSelectedMoveType,
	showMoves,
	setShowMoves,
	movesCount,
	selectedStartBezirksregion,
	setSelectedStartBezirksregion,
	selectedEndBezirksregion,
	setSelectedEndBezirksregion,
}) => {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}
	const [lors, setLors] = useState<any>();
	const availableMovesTypes: Array<MovesTypes> = [
		"inside_to_outside",
		"outside_to_inside",
		"east_to_west",
		"west_to_east",
		"north_to_south",
		"south_to_north",
	];

	const moveTypesNames = {
		inside_to_outside: "Innerhalb des Rings nach außerhalb",
		outside_to_inside: "Außerhalb des Rings nach innerhalb",
		east_to_west: "Von Osten nach Westen",
		west_to_east: "Von Westen nach Osten",
		north_to_south: "Von Norden nach Süden",
		south_to_north: "Von Süden nach Norden",
	};

	useEffect(() => {
		fetch(
			"http://localhost:54321/storage/v1/object/public/data_assets/LOR_Bezirksregionen_-_Berlin.geojson"
		)
			.then((lorsResponse) => lorsResponse.json())
			.then((lors) => {
				console.log(lors);
				setLors(lors);
			});
	}, []);

	const bezirksRegionen = useMemo(() => {
		if (!lors) return [];
		const xs = lors.features
			.map((f) => f.properties.bezirksregion)
			.filter((value, index, array) => array.indexOf(value) === index);
		return xs.map((x) => {
			return {
				label: x,
				value: x,
			};
		});
	}, [lors]);

	useEffect(() => {
		console.log(selectedStartBezirksregion);
	}, [selectedStartBezirksregion]);

	return (
		<>
			<SidebarHeader text={"Umzüge anzeigen"} />
			<SidebarBody>
				<div
					className="pb-[20px] pt-[20px]"
					style={{
						display: "inline-grid",
						gridAutoFlow: "column",
						alignItems: "center",
						columnGap: "4px",
					}}
				>
					<div>Umzüge anzeigen</div>
					<Switch
						checked={showMoves}
						onChange={() => {
							setShowMoves(!showMoves);
						}}
						className={`${
							showMoves ? "bg-blue-600" : "bg-gray-200"
						} relative inline-flex h-6 w-11 items-center rounded-full`}
					>
						<span
							className={`${
								showMoves ? "translate-x-6" : "translate-x-1"
							} inline-block h-4 w-4 transform rounded-full bg-white transition`}
						/>
					</Switch>
				</div>

				<div className="pb-[10px]">Option 1: Vordefinierte Bereiche</div>
				<div style={{ position: "relative" }}>
					<Tab.Group
						onChange={(index) => {
							setSelectedMoveType(availableMovesTypes[index]);
							console.log(
								"Changed selected tab to:",
								availableMovesTypes[index]
							);
						}}
					>
						<Tab.List className="flex flex-col rounded-xl bg-blue-900/20 p-1">
							{availableMovesTypes.map((x) => (
								<Tab
									disabled={!showMoves}
									key={"tab-" + x}
									className={classNames(
										"w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
										"ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
										selectedMoveType === x
											? showMoves
												? "bg-white shadow"
												: "text-gray-100"
											: showMoves
											? "text-blue-100 hover:bg-white/[0.12] hover:text-white"
											: "text-gray-100"
									)}
								>
									{moveTypesNames[x]}
								</Tab>
							))}
						</Tab.List>
					</Tab.Group>
					<div className="pt-[20px]">Option 2: Zwischen Bezirksregionen</div>
					{lors && (
						<div className="mt-3">
							<p className="mb-1 flex gap-2 font-bold">Von Bezirksregion</p>
							<Select
								value={
									selectedStartBezirksregion
										? {
												label: selectedStartBezirksregion,
												value: selectedStartBezirksregion,
										  }
										: null
								}
								onChange={(opt) => {
									if (opt) {
										setSelectedStartBezirksregion(opt.value);
									} else {
										setSelectedStartBezirksregion(undefined);
									}
								}}
								isClearable={true}
								isSearchable={true}
								isDisabled={false}
								options={bezirksRegionen}
								placeholder="Bezirksregion"
								styles={customStyles}
								theme={customTheme}
							/>
						</div>
					)}
					{lors && (
						<div className="mt-3">
							<p className="mb-1 flex gap-2 font-bold">Nach Bezirksregion</p>
							<Select
								value={
									selectedEndBezirksregion
										? {
												label: selectedEndBezirksregion,
												value: selectedEndBezirksregion,
										  }
										: null
								}
								onChange={(opt) => {
									if (opt) {
										setSelectedEndBezirksregion(opt.value);
									} else {
										setSelectedEndBezirksregion(undefined);
									}
								}}
								isClearable={true}
								isSearchable={true}
								isDisabled={false}
								options={bezirksRegionen}
								placeholder="Bezirksregion"
								styles={customStyles}
								theme={customTheme}
							/>
						</div>
					)}
					{movesCount && selectedMoveType && (
						<div className="pb-[20px] pt-[20px] text-lg font-bold">
							Anzahl der Umzüge: {movesCount}
						</div>
					)}
				</div>
				<Accordion
					title={"Was sind Umzüge?"}
					content={
						<p>
							Der Umzug eines Unternehmens wird definiert als ein
							Standortwechsel zwischen März 2023 und Juni 2023.
						</p>
					}
				/>
				<Accordion
					title={"Was ist innerhalb / außerhalb des Rings?"}
					content={
						<p>
							Innerhalb / außerhalb des Rings wird definiert als Unternehmen
							deren Standort sich innerhalb bzw. außerhalb der Strecke des
							Berliner S-Bahn-Rings befinden.
						</p>
					}
				/>
				<Accordion
					title={"Was ist Norden?"}
					content={
						<p>
							In diesem Kontext wird Norden definiert als ein Latitude-Wert von
							größer als 52.522011466311916.
						</p>
					}
				/>
				<Accordion
					title={"Was ist Süden?"}
					content={
						<p>
							In diesem Kontext wird Norden definiert als ein Latitude-Wert von
							kleiner als 52.522011466311916.
						</p>
					}
				/>
				<Accordion
					title={"Was ist Westen?"}
					content={
						<p>
							In diesem Kontext wird Norden definiert als ein Longitude-Wert von
							kleiner als 13.4134480763675.
						</p>
					}
				/>
				<Accordion
					title={"Was ist Osten?"}
					content={
						<p>
							In diesem Kontext wird Norden definiert als ein Longitude-Wert von
							größer als 13.4134480763675.
						</p>
					}
				/>
			</SidebarBody>
		</>
	);
};
