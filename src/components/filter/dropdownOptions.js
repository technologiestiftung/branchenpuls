import branchKeys from "@lib/branchKeys.json";
import { toFullText } from "@lib/helper";

export function getFilterBezirke() {
	return [
		{
			value: "Charlottenburg-Wilmersdorf",
			label: "Charlottenburg-Wilmersdorf",
		},
		{
			value: "Friedrichshain-Kreuzberg",
			label: "Friedrichshain-Kreuzberg",
		},
		{
			value: "Lichtenberg",

			label: "Lichtenberg",
		},
		{
			value: "Marzahn-Hellersdorf",
			label: "Marzahn-Hellersdorf",
		},
		{
			value: "Mitte",
			label: "Mitte",
		},
		{
			value: "Neukölln",
			label: "Neukölln",
		},
		{
			value: "Pankow",
			label: "Pankow",
		},
		{
			value: "Reinickendorf",
			label: "Reinickendorf",
		},
		{
			value: "Spandau",
			label: "Spandau",
		},
		{
			value: "Steglitz-Zehlendorf",
			label: "Steglitz-Zehlendorf",
		},
		{
			value: "Tempelhof-Schöneberg",
			label: "Tempelhof-Schöneberg",
		},
		{
			value: "Treptow-Köpenick",
			label: "Treptow-Köpenick",
		},
	];
}

export function getOptionsEmployees() {
	const optionsEmployees = [
		{
			value: 0,
			label: "0",
		},
		{
			value: 1,
			label: "1 - 3",
		},
		{
			value: 2,
			label: "4 - 6",
		},
		{
			value: 3,
			label: "7 - 9",
		},
		{
			value: 4,
			label: "10 - 19",
		},
		{
			value: 5,
			label: "20 - 49",
		},
		{
			value: 6,
			label: "50 - 99",
		},
		{
			value: 7,
			label: "100 - 199",
		},
		{
			value: 8,
			label: "200 - 499",
		},
		{
			value: 9,
			label: "500 - 999",
		},
		{
			value: 10,
			label: "1000 - 2499",
		},
		{
			value: 11,
			label: "2500 - 4999",
		},
		{
			value: 12,
			label: "5000 - 7499",
		},
		{
			value: 13,
			label: "7500 - 9999",
		},
		{
			value: 14,
			label: "10000+",
		},
	];

	return optionsEmployees;
}

export function getOptionsMonths() {
	const optionsMonths = [
		{
			value: 3,
			label: "März 2023",
		},
		{
			value: 4,
			label: "April 2023",
		},
		{
			value: 5,
			label: "Mai 2023",
		},
		{
			value: 6,
			label: "Juni 2023",
		},
	];
	return optionsMonths;
}

export function getOptionsBL1() {
	let optionsBL1 = branchKeys
		.map(({ branch_top_level_id, branch_top_level_desc }) => ({
			value: branch_top_level_id,
			label: `${toFullText(
				branch_top_level_desc
			)} <br/><small>ID ${branch_top_level_id}</small>`,
			id: branch_top_level_id,
			name: toFullText(branch_top_level_desc),
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
	// remove duplicates
	return [...new Map(optionsBL1.map((item) => [item.id, item])).values()];
}

export function getOptionsBL2(filterValBl1) {
	const bl1Ids = filterValBl1?.map((d) => d.value);
	let optionsBL2 = branchKeys
		.filter(
			(b) => !filterValBl1?.length || bl1Ids.includes(b.branch_top_level_id)
		)
		.filter((b) => b.nace_id !== b.branch_top_level_id)
		.map(({ nace_id, nace_desc }) => ({
			value: nace_id,
			label: `${toFullText(nace_desc)} <br/><small>ID ${nace_id}</small>`,
			id: nace_id,
			name: toFullText(nace_desc),
		}))
		.sort((a, b) => a.name.localeCompare(b.name));

	// remove duplicates
	return [...new Map(optionsBL2.map((item) => [item.id, item])).values()];
}

export function getOptionsBL3(filterValBl1, filterValBl2) {
	const bl1Ids = filterValBl1?.map((d) => d.value);
	const bl2Ids = filterValBl2?.map((d) => d.value);

	let optionsBL3 = branchKeys
		.filter(
			(b) => !filterValBl1?.length || bl1Ids.includes(b.branch_top_level_id)
		)
		.filter((b) => !filterValBl2?.length || bl2Ids.includes(b.nace_id))
		.filter((b) => b.ihk_branch_id !== b.branch_top_level_id)
		.filter((b) => b.ihk_branch_id !== b.nace_id)
		.map(({ ihk_branch_id, ihk_branch_desc }) => ({
			value: ihk_branch_id,
			label: `${toFullText(
				ihk_branch_desc
			)} <br/><small>ID ${ihk_branch_id}</small>`,
			id: ihk_branch_id,
			name: toFullText(ihk_branch_desc),
		}))
		.sort((a, b) => a.name.localeCompare(b.name));
	return optionsBL3;
}

export function getOptionsBType() {
	const optionsBType = [
		{
			value: 0,
			label: "Kleingewerbetreibender",
		},
		{
			value: 1,
			label: "Im Handelsregister eingetragen",
		},
	];

	return optionsBType;
}
