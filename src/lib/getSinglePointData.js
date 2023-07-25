import { getSendValues } from "@lib/getSendValues";
import { getPath } from "@lib/getPath";

export async function getSinglePointData({
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
	filterId,
	filterPosition,
}) {
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
		sendId,
		sendLat,
		sendLon,
	} = getSendValues({
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
		filterId,
		filterPosition,
	});

	let { path } = getPath({
		path: "/api/getsinglepointdata/?",
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
		sendId,
		sendLat,
		sendLon,
	});

	let data;
	try {
		let res;
		if (process.env.NODE_ENV === "development") {
			res = await fetch(path, { cache: "no-store" });
		} else {
			res = await fetch(path);
		}
		console.log(res);
		if (res.ok) {
			data = await res.json();
		}
	} catch (error) {
		console.error(error);
	} finally {
		console.log(data);
		return data;
	}
}
