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
import { FC, useState } from "react";

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
}

export const SidebarContentMoves: FC<SidebarContentMovesProps> = ({
	selectedMoveType,
	setSelectedMoveType,
	showMoves,
	setShowMoves,
	movesCount,
}) => {
	function classNames(...classes) {
		return classes.filter(Boolean).join(" ");
	}
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
		north_to_south: "Vom Norden nach Süden",
		south_to_north: "Vom Süden nach Norden",
	};

	return (
		<>
			<SidebarHeader text={"Umzüge anzeigen"} />
			<SidebarBody>
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
							kleiner als 13.4134480763675.
						</p>
					}
				/>
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
											? "bg-white shadow"
											: "text-blue-100 hover:bg-white/[0.12] hover:text-white"
									)}
								>
									{moveTypesNames[x]}
								</Tab>
							))}
						</Tab.List>
					</Tab.Group>
					{movesCount && (
						<div className="pb-[20px] pt-[20px]">
							Anzahl der Umzüge: {movesCount}
						</div>
					)}
				</div>
			</SidebarBody>
		</>
	);
};
