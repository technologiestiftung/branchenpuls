import { FC, useState, useEffect } from "react";
import Select from "react-select";
import {
	getFilterBezirke,
	getPlanungsraum,
	getPrognoseraum,
} from "./dropdownOptions";
import { customTheme, customStyles } from "@lib/selectStyles";
import { StringSelection } from "@common/interfaces";

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
			<p className="mb-1 font-bold">Bezirk</p>
			<Select
				value={filterValBezirk}
				onChange={setFilterValBezirk}
				isClearable={true}
				isSearchable={true}
				options={getFilterBezirke()}
				styles={customStyles}
				placeholder="z.B. Mitte"
				theme={customTheme}
				isDisabled={
					Boolean(filterValPrognoseraum?.value) ||
					Boolean(filterValPlanungsraum?.value)
				}
			/>

			<p className="mb-1 mt-3 font-bold">Prognoseraum</p>
			<Select
				value={filterValPrognoseraum}
				onChange={setFilterValPrognoseraum}
				isClearable={true}
				isSearchable={true}
				options={getPrognoseraum(filterValBezirk?.value)}
				styles={customStyles}
				placeholder="z.B. Zentrum"
				theme={customTheme}
				isDisabled={Boolean(filterValPlanungsraum?.value)}
			/>

			<p className="mb-1 mt-3 font-bold">Planungsraum</p>
			<Select
				value={filterValPlanungsraum}
				onChange={setFilterValPlanungsraum}
				isClearable={true}
				isSearchable={true}
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
