import branchKeys from "@lib/branchKeys.json";
import { toFullText } from "@/lib/toFullText";
import places from "@lib/places";

export function getPlanungsraum(bezirk, prognoseraum) {
	const planungsraume = [
		...new Set(
			places
				.filter((d) => !bezirk || bezirk === d[2])
				.filter((d) => !prognoseraum || prognoseraum === d[1])
				.map((d) => d[0])
				.sort((a, b) => a.localeCompare(b))
		),
	];

	return planungsraume.map((d) => {
		const obj = {
			value: d,
			label: d,
		};
		return obj;
	});
}

export function getPrognoseraum(bezirk) {
	const prognoseraum = [
		...new Set(
			places
				.filter((d) => !bezirk || bezirk === d[2])
				.map((d) => d[1])
				.sort((a, b) => a.localeCompare(b))
		),
	];

	return prognoseraum.map((d) => {
		const obj = {
			value: d,
			label: d,
		};
		return obj;
	});
}

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
			value: [1, 2, 3],
			label: "Mikrounternehmen<br/><small>weniger als 10 Beschäftigte</small>",
		},
		{
			value: [4, 5],
			label: "Kleine Unternehmen<br/><small>10-49 Beschäftigte</small>",
		},
		{
			value: [6, 7],
			label: "Mittlere Unternehmen<br/><small>50-199 Beschäftigte</small>",
		},
		{
			value: [8, 9, 10, 11, 12, 13, 14],
			label: "Große Unternehmen<br/><small>200 oder mehr Beschäftigte</small>",
		},
		{
			value: [0, 15],
			label: "Keine Angabe<br/><small>0 oder keine Angabe</small>",
		},
	];

	return optionsEmployees;
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
