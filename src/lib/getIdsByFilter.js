import pako from "pako";
const devMode = process.env.NODE_ENV === "development";

export async function getIdsByFilter(
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
	filterValBezirk
) {
	// make all default val null
	const sendFilterValBL1 = filterValBL1?.value ? filterValBL1.value : false;
	const sendFilterValBL2 = filterValBL2?.value ? filterValBL2.value : false;
	const sendFilterValBL3 = filterValBL3?.value ? filterValBL3.value : false;
	const sendEmployees = !isNaN(parseFloat(employees?.value))
		? employees.value
		: false;
	const sendBType = filterBType !== null ? filterBType.value : false;
	const sendStart = age[0] === 0 && age[1] === 100 ? false : age[0];
	const sendEnd = age[0] === 0 && age[1] === 100 ? false : age[1];
	const sendMonthOnly = filterMonthOnly === true ? 1 : 0;
	const sendBezik = filterValBezirk?.value ? filterValBezirk.value : false;

	let path = "/api/getIds/?";

	path += sendStart !== false ? `&start=${sendStart}` : "";
	path += sendEnd !== false ? `&end=${sendEnd}` : "";
	path += !isNaN(parseFloat(sendEmployees))
		? `&employees=${sendEmployees}`
		: "";
	path += sendFilterValBL1 ? `&bl1=${sendFilterValBL1}` : "";
	path += sendFilterValBL2 ? `&bl2=${sendFilterValBL2}` : "";
	path += sendFilterValBL3 ? `&bl3=${sendFilterValBL3}` : "";
	path += sendBType !== false ? `&bt=${sendBType}` : "";
	path += `&month=${filterValDateMonth}`;
	path += `&year=${filterValDateYear}`;
	path += `&bezirk=${sendBezik}`;
	path += sendMonthOnly === 1 ? `&monthonly=${sendMonthOnly}` : "";

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
		!sendBezik
	) {
		console.log("resetting");
		const newData = [];
		Object.keys(dataPointsIndexed).forEach((d) => {
			newData.push(dataPointsIndexed[d]);
		});

		return newData;
	}

	console.log("path : ", path);

	const newData = [];
	try {
		let res;

		if (devMode) {
			res = await fetch(path, { cache: "no-store" })
				.then((res) => res.arrayBuffer())
				.then((arrayBuffer) => {
					const decompressedData = pako.inflate(arrayBuffer, { to: "string" });
					const data = JSON.parse(decompressedData);
					data.forEach((d) => {
						newData.push(dataPointsIndexed[d]);
					});
				});
		} else {
			res = await fetch(path);
			if (res.ok) {
				const data = await res.json();

				data.forEach((d) => {
					newData.push(dataPointsIndexed[d]);
				});
			}
		}
	} catch (error) {
		console.error(error);
	} finally {
		return newData;
	}
}
