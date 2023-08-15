import { FC, useState, useEffect } from "react";
import Select from "react-select";

import { getOptionsBL1, getOptionsBL2, getOptionsBL3 } from "./dropdownOptions";
import {
	customTheme,
	customStyles,
	noOptionsMessage,
	getOptionLabel,
	customFilterOption,
} from "@lib/selectStyles";
import { Info } from "@components/Icons";

export interface FilterBranchesType {
	filterValBl1: object;
	setFilterValBl1: (val: object) => void;
	filterValBl2: object;
	setFilterValBl2: (val: object) => void;
	filterValBl3: object;
	setFilterValBl3: (val: object) => void;
}

export const FilterBranches: FC<FilterBranchesType> = ({
	filterValBl1,
	setFilterValBl1,
	filterValBl2,
	setFilterValBl2,
	filterValBl3,
	setFilterValBl3,
}) => {
	const [bl1Disabled, setBl1Disabled] = useState<boolean>(false);
	const [bl2Disabled, setBl2Disabled] = useState<boolean>(false);

	const [optionsBL2, setOptionsBL2] = useState<number[]>(getOptionsBL2());
	const [optionsBL3, setOptionsBL3] = useState<number[]>(getOptionsBL3());

	useEffect(() => {
		setOptionsBL2(getOptionsBL2(filterValBl1));
	}, [filterValBl1]);

	useEffect(() => {
		setOptionsBL3(getOptionsBL3(filterValBl1, filterValBl2));
	}, [filterValBl1, filterValBl2]);

	useEffect(() => {
		if (filterValBl3?.length) {
			setBl1Disabled(true);
			setBl2Disabled(true);
		} else {
			setBl1Disabled(false);
			setBl2Disabled(false);
		}
	}, [filterValBl3]);

	useEffect(() => {
		if (filterValBl2?.length) {
			setBl1Disabled(true);
		} else {
			setBl1Disabled(false);
		}
	}, [filterValBl2]);

	return (
		<div className="">
			<div className="">
				<p className="mb-1 flex gap-2 font-medium">
					Branchentyp
					<button title="Der Branchentyp ist eine übergeordnete, recht grobe Klassifizierung der Geschäftstätigkeit eines Unternehmens. Jeder Branchentyp kann auch über seine zweistellige ID gefunden werden.">
						<Info className="h-4 w-4" />
					</button>
				</p>
				<Select
					value={filterValBl1}
					onChange={setFilterValBl1}
					isClearable={true}
					isSearchable={true}
					isDisabled={bl1Disabled}
					options={getOptionsBL1()}
					getOptionLabel={getOptionLabel}
					filterOption={customFilterOption}
					placeholder="z.B. Gastronomie ID 56"
					styles={customStyles}
					theme={customTheme}
					isMulti
				/>
			</div>
			<div className="mt-3">
				<p className="mb-1 flex items-center gap-1 text-sm font-medium">
					NACE Code
					<span className="text-xs font-normal">
						{filterValBl1 ? ` basierend auf Branchentyp` : ""}
					</span>
					<button title="Die NACE (Nomenklatur der Wirtschaftstätigkeiten) ist die europäische Klassifikation der Geschäftstätigkeiten von Unternehmen. Sie ist detaillierter als der Branchentyp und zu jeder Klasse existiert eine offizielle Definition (https://nacev2.com/de).">
						<Info className="h-4 w-4" />
					</button>
				</p>
				<Select
					value={filterValBl2}
					onChange={setFilterValBl2}
					className={""}
					isClearable={true}
					isSearchable={true}
					isDisabled={bl2Disabled}
					options={optionsBL2}
					getOptionLabel={getOptionLabel}
					filterOption={customFilterOption}
					placeholder="z.B. Ausschank ID 5630"
					styles={customStyles}
					theme={customTheme}
					noOptionsMessage={noOptionsMessage}
					isMulti
				/>
			</div>
			{/* suchen… */}
			<div className="mt-3">
				<p className="mb-1 flex items-center gap-1 text-sm font-medium">
					IHK ID{" "}
					<span className="text-xs font-normal">
						{filterValBl1 || filterValBl2
							? ` basierend auf ${filterValBl2 ? "NACE" : "Branchentyp"}`
							: ""}
					</span>
					<button title="Die IHK ID ist eine Klassifizierung der Geschäftstätigkeiten, die spezifisch von der IHK Berlin für die bei ihr gemeldeten Unternehmen verwendet wird. Sie ist noch detaillierter als der NACE Code.">
						<Info className="h-4 w-4" />
					</button>
				</p>
				<Select
					value={filterValBl3}
					onChange={setFilterValBl3}
					className={""}
					isClearable={true}
					isSearchable={true}
					options={optionsBL3}
					getOptionLabel={getOptionLabel}
					filterOption={customFilterOption}
					placeholder="z.B. Bars ID 56303 "
					styles={customStyles}
					theme={customTheme}
					noOptionsMessage={noOptionsMessage}
					isMulti
				/>
			</div>
		</div>
	);
};
