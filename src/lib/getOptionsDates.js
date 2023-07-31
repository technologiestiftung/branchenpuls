const monthLookupTable = {
	1: "Januar",
	2: "Februar",
	3: "März",
	4: "April",
	5: "Mai",
	6: "Juni",
	7: "Juli",
	8: "August",
	9: "September",
	10: "Oktober",
	11: "November",
	12: "Dezember",
};

export async function getOptionsDates() {
	let opts = [];
	try {
		let res;
		if (process.env.NODE_ENV === "development") {
			res = await fetch("/api/getexistingmonths/?", { cache: "no-store" });
		} else {
			res = await fetch("/api/getexistingmonths/?");
		}
		console.log(res);
		if (res.ok) {
			let data = await res.json();
			data = data
				.map((d) => d.tablename.replace("state_", "").split("_"))
				.map((d) => [Number(d[0]), Number(d[1])]);
			data.forEach((d) => {
				opts.push({
					value: d,
					label: `${monthLookupTable[d[0]]} ${d[1]}`,
				});
			});
		}
	} catch (error) {
		console.error(error);
	} finally {
		return opts;
	}
}
