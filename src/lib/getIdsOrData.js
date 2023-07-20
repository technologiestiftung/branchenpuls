import pako from "pako";
const devMode = process.env.NODE_ENV === "development";

export async function getIdsOrData(
	dataPointsIndexed,
	age,
	employees,
	filterBType,
	filterValBL1,
	filterValBL2,
	filterValBL3,
	filterValDateMonth,
	filterValDateYear,
	filterMonthOnly,
	filterValBezirk,
	filterValPlanungsraum,
	filterValPrognoseraum,
	csv
) {
	// make all default val null
	const sendFilterValBL1 = filterValBL1?.length ? filterValBL1 : false;
	const sendFilterValBL2 = filterValBL2?.length ? filterValBL2 : false;
	const sendFilterValBL3 = filterValBL3?.length ? filterValBL3 : false;
	const sendEmployees = !isNaN(parseFloat(employees?.value))
		? employees.value
		: false;
	const sendBType = filterBType !== null ? filterBType.value : false;
	const sendStart = age[0] === 0 && age[1] === 100 ? false : age[0];
	const sendEnd = age[0] === 0 && age[1] === 100 ? false : age[1];
	const sendMonthOnly = filterMonthOnly === true ? 1 : 0;
	const sendBezik = filterValBezirk?.value ? filterValBezirk.value : false;
	const sendPlanungsraum = filterValPlanungsraum?.value
		? filterValPlanungsraum.value
		: false;
	const sendPrognoseraum = filterValPrognoseraum?.value
		? filterValPrognoseraum.value
		: false;

	let path = "/api/getIdsOrData/?";

	path += sendStart !== false ? `&start=${sendStart}` : "";
	path += sendEnd !== false ? `&end=${sendEnd}` : "";
	path += !isNaN(parseFloat(sendEmployees))
		? `&employees=${sendEmployees}`
		: "";
	path += sendFilterValBL1
		? sendFilterValBL1.map((d) => `&bl1=${d.value}`).join("")
		: "";
	path += sendFilterValBL2
		? sendFilterValBL2.map((d) => `&bl2=${d.value}`).join("")
		: "";
	path += sendFilterValBL3
		? sendFilterValBL3.map((d) => `&bl3=${d.value}`).join("")
		: "";
	path += sendBType !== false ? `&bt=${sendBType}` : "";
	path += `&month=${filterValDateMonth}`;
	path += `&year=${filterValDateYear}`;
	path += sendBezik ? `&bezirk=${sendBezik}` : "";
	path += sendPlanungsraum ? `&planungsraum=${sendPlanungsraum}` : "";
	path += sendPrognoseraum ? `&prognoseraum=${sendPrognoseraum}` : "";

	path += sendMonthOnly === 1 ? `&monthonly=${sendMonthOnly}` : "";
	path += csv ? `&csv=1` : "";

	// path += "&ids=1&ids=2&ids=3&ids=4&ids=5";

	// when there is no filter set return the data
	if (
		!sendFilterValBL1 &&
		!sendFilterValBL2 &&
		!sendFilterValBL3 &&
		!sendEmployees &&
		sendBType === false &&
		!sendStart &&
		!sendEnd &&
		sendMonthOnly !== 1 &&
		!sendBezik &&
		!sendPlanungsraum &&
		!sendPrognoseraum &&
		!csv
	) {
		console.log("resetting");
		const newData = [];
		Object.keys(dataPointsIndexed).forEach((d) => {
			newData.push(dataPointsIndexed[d]);
		});

		return newData;
	}

	console.log("path : ", path);

	let newData = [];
	try {
		let res;

		if (devMode) {
			res = await fetch(path, { cache: "no-store" })
				.then((res) => res.arrayBuffer())
				.then((arrayBuffer) => {
					const decompressedData = pako.inflate(arrayBuffer, { to: "string" });
					const data = JSON.parse(decompressedData);
					if (csv) {
						newData = data;
					} else {
						data.forEach((d) => {
							newData.push(dataPointsIndexed[d]);
						});
					}
				});
		} else {
			res = await fetch(path);
			if (res.ok) {
				const data = await res.json();
				if (csv) {
					newData = data;
				} else {
					data.forEach((d) => {
						newData.push(dataPointsIndexed[d]);
					});
				}
			}
		}
	} catch (error) {
		console.error(error);
	} finally {
		return newData;
	}
}
