import pako from "pako";
const devMode = process.env.NODE_ENV === "development";
import { getSendValues } from "./getSendValues";
import { getPath } from "./getPath";

const optionsEmployees = [
	{ value: [0, 15], label: "Keine Angabe (0 oder keine Angabe)" },
	{ value: [1, 2, 3], label: "Mikrounternehmen (weniger als 10 Beschäftigte)" },
	{ value: [4, 5], label: "Kleine Unternehmen (10-49 Beschäftigte)" },
	{ value: [6, 7], label: "Mittlere Unternehmen (50-199 Beschäftigte)" },
	{
		value: [8, 9, 10, 11, 12, 13, 14],
		label: "Große Unternehmen (200 oder mehr Beschäftigte)",
	},
];

// const optionsEmployees = {
// 	0: "0 Beschäftigte",
// 	1: "1 - 3 Beschäftigte",
// 	2: "4 - 6 Beschäftigte",
// 	3: "7 - 9 Beschäftigte",
// 	4: "10 - 19 Beschäftigte",
// 	5: "20 - 49 Beschäftigte",
// 	6: "50 - 99 Beschäftigte",
// 	7: "100 - 199 Beschäftigte",
// 	8: "200 - 499 Beschäftigte",
// 	9: "500 - 999 Beschäftigte",
// 	10: "1000 - 2499 Beschäftigte",
// 	11: "2500 - 4999 Beschäftigte",
// 	12: "5000 - 7499 Beschäftigte",
// 	13: "7500 - 9999 Beschäftigte",
// 	14: "10000 und mehr Beschäftigte",
// 	15: "unbekannt oder NULL"
//   }

// Function to get label from employee range
function getEmployeeLabel(empValue) {
	let found = optionsEmployees.find((option) =>
		option.value.includes(parseInt(empValue))
	);
	return found ? found.label : empValue; // Return label if found, else keep original
}

// Function to transform CSV
function addEmployeesString(csvString) {
	if (!csvString) return;

	let lines = csvString.split("\n");
	let headers = lines[0].split(",");

	// Find index of employees_range
	let empIndex = headers.indexOf("employees_range");

	let transformedCSV = lines.map((line, index) => {
		if (index === 0) return line; // Keep header row unchanged

		let fields = line.split(",");
		let empValue = fields[empIndex];

		// Replace employee range with corresponding label
		fields[empIndex] = getEmployeeLabel(empValue);

		return fields.join(",");
	});

	return transformedCSV.join("\n");
}

export async function getIdsOrData(
	dataPointsIndexed,
	filterValAge,
	filterValEmployees,
	filterBType,
	filterValBl1,
	filterValBl2,
	filterValBl3,
	filterValDate,
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
		filterValDate,
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
		const newData = [];
		Object.keys(dataPointsIndexed).forEach((d) => {
			newData.push(dataPointsIndexed[d]);
		});
		return newData;
	}

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
						newData = addEmployeesString(newData);
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
					newData = addEmployeesString(newData);
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
