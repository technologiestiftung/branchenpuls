import { FC, useState, useEffect } from "react";
import Select from "react-select";

import { getOptionsBL1, getOptionsBL2, getOptionsBL3 } from "./dropdownOptions";

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
		setOptionsBL2(getOptionsBL2(filterValBl1?.value));
	}, [filterValBl1]);

	useEffect(() => {
		setOptionsBL3(getOptionsBL3(filterValBl1?.value, filterValBl2?.value));
	}, [filterValBl1, filterValBl2]);

	useEffect(() => {
		if (filterValBl3) {
			setBl1Disabled(true);
			setBl2Disabled(true);
		} else {
			setBl1Disabled(false);
			setBl2Disabled(false);
		}
	}, [filterValBl3]);

	useEffect(() => {
		if (filterValBl2) {
			setBl1Disabled(true);
		} else {
			setBl1Disabled(false);
		}
	}, [filterValBl2]);

	const getOptionLabel = (option) => {
		return <div dangerouslySetInnerHTML={{ __html: option.label }} />;
	};

	const customFilterOption = (option, searchText) => {
		const label = option.data.label.replace(/<\/?[^>]+(>|$)/g, "");
		return label.toLowerCase().includes(searchText.toLowerCase());
	};

	const customStyles = {
		placeholder: (baseStyles, state) => ({
			...baseStyles,
			color: "#dadada",
			fontSize: "0.875rem",
			fontStyle: "italic",
		}),
	};

	return (
		<div className="">
			<div className="mt-3">
				<p className="mb-1 font-bold">Branchentyp</p>
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
				/>
			</div>
			<div className="mt-3">
				<p className="mb-1 text-sm font-bold">
					NACE
					<span className="text-xs font-normal">
						{filterValBl1 ? ` basierend auf Branchentyp` : ""}
					</span>
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
				/>
			</div>
			{/* suchen… */}
			<div className="mt-3">
				<p className="mb-1 text-sm font-bold">
					IHK ID{" "}
					<span className="text-xs font-normal">
						{filterValBl1 || filterValBl2
							? ` basierend auf ${filterValBl2 ? "NACE" : "Branchentyp"}`
							: ""}
					</span>
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
				/>
			</div>
		</div>
	);
};
