import { FC, useState, useEffect } from "react";
import Select from "react-select";
import {
	getFilterBezirke,
	getPlanungsraum,
	getPrognoseraum,
} from "./dropdownOptions";
import { customTheme, customStyles } from "@lib/selectStyles";
import { StringSelection } from "@common/interfaces";
import { Info } from "@components/Icons";

export interface FilterPlacesType {
	filterValBezirk: StringSelection | null;
	setFilterValBezirk: (val: StringSelection | null) => void;
	filterValPrognoseraum: StringSelection | null;
	setFilterValPrognoseraum: (val: StringSelection | null) => void;
	filterValPlanungsraum: StringSelection | null;
	setFilterValPlanungsraum: (val: StringSelection | null) => void;
}

export const FilterPlaces: FC<FilterPlacesType> = ({
	filterValBezirk,
	setFilterValBezirk,
	filterValPrognoseraum,
	setFilterValPrognoseraum,
	filterValPlanungsraum,
	setFilterValPlanungsraum,
}) => {
	return (
		<div className="mb-3">
			<p className="mb-1 font-medium">Bezirk</p>
			<Select
				value={filterValBezirk}
				onChange={setFilterValBezirk}
				isClearable={true}
				isSearchable={true}
				// @ts-ignore
				options={getFilterBezirke()}
				styles={customStyles}
				placeholder="z.B. Mitte"
				theme={customTheme}
				isDisabled={
					Boolean(filterValPrognoseraum?.value) ||
					Boolean(filterValPlanungsraum?.value)
				}
			/>

			<p className="mb-1 mt-3 flex items-center gap-2 font-medium">
				Prognoseraum
				<button title="Der Prognoseraum ist eine Raumabgrenzung innerhalb des jeweiligen Bezirks. Es gibt berlinweit 60 Prognoseräume mit durchschnittlich 55.000 bis 60.000 Einwohner:innen.">
					<Info className="h-4 w-4" />
				</button>
			</p>
			<Select
				value={filterValPrognoseraum}
				onChange={setFilterValPrognoseraum}
				isClearable={true}
				isSearchable={true}
				// @ts-ignore
				options={getPrognoseraum(filterValBezirk?.value)}
				styles={customStyles}
				placeholder="z.B. Zentrum"
				theme={customTheme}
				isDisabled={Boolean(filterValPlanungsraum?.value)}
			/>

			<p className="mb-1 mt-3 flex items-center gap-2 font-medium">
				Planungsraum
				<button title="Der Planungsraum ist eine Raumabgrenzung innerhalb des jeweiligen Bezirks, der Quartiere beschreibt – er ist die kleinräumigste Ebene der Lebensweltlich orientierten Räume (LOR). Es gibt berlinweit 447 Planungsräume mit durchschnittlich 7.500 Einwohner:innen.">
					<Info className="h-4 w-4" />
				</button>
			</p>
			<Select
				value={filterValPlanungsraum}
				onChange={setFilterValPlanungsraum}
				isClearable={true}
				isSearchable={true}
				// @ts-ignore
				options={getPlanungsraum(
					filterValBezirk?.value,
					filterValPrognoseraum?.value
				)}
				styles={customStyles}
				placeholder="z.B. Unter den Linden"
				theme={customTheme}
			/>
		</div>
	);
};
