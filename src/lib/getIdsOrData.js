import pako from "pako";
const devMode = process.env.NODE_ENV === "development";
import { getSendValues } from "./getSendValues";
import { getPath } from "./getPath";

export async function getIdsOrData(
	dataPointsIndexed,
	filterValAge,
	filterValEmployees,
	filterBType,
	filterValBl1,
	filterValBl2,
	filterValBl3,
	filterValDateMonth,
	filterValDateYear,
	filterMonthOnly,
	filterValBezirk,
	filterValPlanungsraum,
	filterValPrognoseraum,
	csv
) {
	const {
		sendFilterValBl1,
		sendFilterValBl2,
		sendFilterValBl3,
		sendEmployees,
		sendBType,
		sendStart,
		sendEnd,
		sendMonthOnly,
		sendBezik,
		sendPlanungsraum,
		sendPrognoseraum,
		sendMonth,
		sendYear,
	} = getSendValues({
		filterValBl1,
		filterValBl2,
		filterValBl3,
		filterValEmployees,
		filterBType,
		filterValAge,
		filterMonthOnly,
		filterValBezirk,
		filterValPlanungsraum,
		filterValPrognoseraum,
		filterValDateMonth,
		filterValDateYear,
	});

	let { path } = getPath({
		path: "/api/getIdsOrData/?",
		sendFilterValBl1,
		sendFilterValBl2,
		sendFilterValBl3,
		sendEmployees,
		sendBType,
		sendStart,
		sendEnd,
		sendMonthOnly,
		sendBezik,
		sendPlanungsraum,
		sendPrognoseraum,
		sendMonth,
		sendYear,
		csv,
	});

	// when there is no filter set return the data
	if (
		!sendFilterValBl1 &&
		!sendFilterValBl2 &&
		!sendFilterValBl3 &&
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
