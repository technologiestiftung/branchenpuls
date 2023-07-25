export function getPath({
	path,
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
	sendId,
	sendLat,
	sendLon,
}) {
	path += sendStart !== false ? `&start=${sendStart}` : "";
	path += sendEnd !== false ? `&end=${sendEnd}` : "";
	path += !isNaN(parseFloat(sendEmployees))
		? `&employees=${sendEmployees}`
		: "";
	path += sendFilterValBl1
		? sendFilterValBl1.map((d) => `&bl1=${d.value}`).join("")
		: "";
	path += sendFilterValBl2
		? sendFilterValBl2.map((d) => `&bl2=${d.value}`).join("")
		: "";
	path += sendFilterValBl3
		? sendFilterValBl3.map((d) => `&bl3=${d.value}`).join("")
		: "";
	path += sendBType !== false ? `&bt=${sendBType}` : "";
	path += sendMonth ? `&month=${sendMonth}` : "";
	path += sendYear ? `&year=${sendYear}` : "";
	path += sendBezik ? `&bezirk=${sendBezik}` : "";
	path += sendPlanungsraum ? `&planungsraum=${sendPlanungsraum}` : "";
	path += sendPrognoseraum ? `&prognoseraum=${sendPrognoseraum}` : "";
	path += sendMonthOnly === 1 ? `&monthonly=${sendMonthOnly}` : "";
	path += csv ? `&csv=true` : "";
	path += sendId ? `&pointid=${sendId}` : "";
	path += sendLon ? `&lng=${sendLon}` : "";
	path += sendLat ? `&lat=${sendLat}` : "";

	return {
		path,
	};
}
