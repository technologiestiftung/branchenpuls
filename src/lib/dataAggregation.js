export function dataAggregation(csvString, headerName) {
	const rows = csvString.trim().split("\n");
	const headers = rows.shift().split(",");

	const ihkBranchIdIndex = headers.indexOf(headerName);
	const countByIhkBranchId = {};

	rows.forEach((row) => {
		const values = row.split(",");
		const ihkBranchId = values[ihkBranchIdIndex];
		if (ihkBranchId) {
			countByIhkBranchId[ihkBranchId] =
				(countByIhkBranchId[ihkBranchId] || 0) + 1;
		}
	});

	// Convert the count data to CSV format
	const resultCsvRows = Object.entries(countByIhkBranchId).map(
		([ihkBranchId, count]) => `${ihkBranchId},${count}`
	);

	// Add headers back to the CSV
	const resultCsvString = [`${headerName},count`, ...resultCsvRows].join("\n");

	return resultCsvString;
}

// Example usage:
// const csvString = `...`; // Your CSV data here

// const resultCsvString = countEntriesByIhkBranchId(csvString);
// console.log("Result as CSV string:", resultCsvString);
// "ihk_branch_id"
