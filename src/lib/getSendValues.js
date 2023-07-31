export function getSendValues({
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
	filterValDate,
	filterId,
	filterPosition,
}) {
	const sendFilterValBl1 = filterValBl1?.length ? filterValBl1 : false;
	const sendFilterValBl2 = filterValBl2?.length ? filterValBl2 : false;
	const sendFilterValBl3 = filterValBl3?.length ? filterValBl3 : false;
	const sendEmployees = !isNaN(parseFloat(filterValEmployees?.value))
		? filterValEmployees.value
		: false;
	const sendBType = filterBType !== null ? filterBType.value : false;
	const sendStart =
		filterValAge[0] === 0 && filterValAge[1] === 100 ? false : filterValAge[0];
	const sendEnd =
		filterValAge[0] === 0 && filterValAge[1] === 100 ? false : filterValAge[1];
	const sendMonthOnly = filterMonthOnly === true ? 1 : 0;
	const sendBezik = filterValBezirk?.value ? filterValBezirk.value : false;
	const sendPlanungsraum = filterValPlanungsraum?.value
		? filterValPlanungsraum.value
		: false;
	const sendPrognoseraum = filterValPrognoseraum?.value
		? filterValPrognoseraum.value
		: false;
	const sendMonth = filterValDate?.value
		? Number(filterValDate?.value[0])
		: false;
	const sendYear = filterValDate ? Number(filterValDate?.value[1]) : false;
	const sendId = filterId ? filterId : false;
	const sendLat = filterPosition ? filterPosition[1] : false;
	const sendLon = filterPosition ? filterPosition[0] : false;

	return {
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
	};
}
